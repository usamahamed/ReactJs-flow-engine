import validator from '../../validators';

// The cyclicValidator (what a great name by the way), visits each rule
// recursively. Starting at the rules corresponding to "idIfTrue" and proceeding
// to the rules "idIfFalse".
// It's worth noting that the current algorithm is not optimised for performance
// but for simplicity. For large flows this might be a concern.
export default (flow) => {
  if(flow.length === 0) { return validator(true); }

  const pickRule = (id) =>
    flow.find(rule => rule.id === id) || null;

  const visitRule = (currentRule, visitedIds) => {
    if(currentRule === null) { return validator(true); }

    const { id, title, idIfTrue, idIfFalse } = currentRule;

    if(visitedIds.indexOf(id) !== -1) {
      return validator(
        false,
        `The rule "${title}" with id "${id}" is part of a cycle in the flow.`
      );
    }

    // This is meant to shortcut the recursive execution
    // if one side of the three (flow) is invalid we don't need to investigate
    // the other side
    const validSoFar = visitRule(pickRule(idIfTrue), [...visitedIds, id]);
    if(!validSoFar.valid) { return validSoFar; }
    return visitRule(pickRule(idIfFalse), [...visitedIds, id]);
  };

  const validSoFar = visitRule(pickRule(flow[0].idIfTrue), [flow[0].id]);
  if(!validSoFar.valid) { return validSoFar; }
  return visitRule(pickRule(flow[0].idIfFalse), [flow[0].id]);
};
