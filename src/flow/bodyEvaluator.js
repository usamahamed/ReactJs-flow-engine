import createFunction from './createFunction';

export default (rule, testingObject) => {
  try {
    return createFunction(rule.body)(testingObject);
  } catch (_error) {
     throw new Error(`
       Could not evaluate Rule ${rule.title}
       with the body ${rule.body}
       and testingObject ${JSON.stringify(testingObject)}`
     );
  }
};
