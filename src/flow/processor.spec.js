import flowProcessor from './processor';

describe('Flow Processor', () => {
  let flow, processor, evaluator, testingObject, firstRule, secondRule;

  describe('follows the idIfTrue if the rule\'s body returns true', () => {
    beforeEach(() => {
      firstRule = {
        id: 1,
        title: "First Rule",
        body: "body of the first rule",
        idIfTrue: 2,
        idIfFalse: null
      };
      secondRule = {
        id: 2,
        title: "Last Rule",
        body: "body of the last rule",
        idIfTrue: null,
        idIfFalse: null
      };
      flow = [ firstRule, secondRule];
      evaluator = jest.fn();
      evaluator.mockReturnValueOnce(true).mockReturnValueOnce(false);
      testingObject = { foo: 'bar' };
      processor = flowProcessor(evaluator)(flow)(testingObject);
    });

    it('yields the current rule for the each executed rule', () => {
      expect(processor.next().value.currentRule).toEqual(firstRule);
      expect(processor.next().value.currentRule).toEqual(secondRule);
      expect(processor.next().value).toBeUndefined();
    });

    it('yields true or false depending on the evaluated rule\'s body', () => {
      expect(processor.next().value.passed).toBeTruthy();
      expect(processor.next().value.passed).toBeFalsy();
      expect(processor.next().value).toBeUndefined();
    });

    it('calls the evaluator function passing each evaluated rule and the testingObject', () => {
      processor.next();
      expect(evaluator).toHaveBeenCalledWith(firstRule, testingObject);
      processor.next();
      expect(evaluator).toHaveBeenCalledWith(secondRule, testingObject);
    });
  });

  describe('follows the idIfFalse if the rule\'s body returns false', () => {
    beforeEach(() => {
      firstRule = {
        id: 1,
        title: "First Rule",
        body: "body of the first rule",
        idIfTrue: null,
        idIfFalse: 2
      };
      secondRule = {
        id: 2,
        title: "Last Rule",
        body: "body of the last rule",
        idIfTrue: null,
        idIfFalse: null
      };
      flow = [ firstRule, secondRule];
      evaluator = jest.fn();
      evaluator.mockReturnValueOnce(false).mockReturnValueOnce(false);
      testingObject = { foo: 'bar' };
      processor = flowProcessor(evaluator)(flow)(testingObject);
    });

    it('yields the current rule for the each executed rule', () => {
      expect(processor.next().value.currentRule).toEqual(firstRule);
      expect(processor.next().value.currentRule).toEqual(secondRule);
      expect(processor.next().value).toBeUndefined();
    });

    it('yields true or false depending on the evaluated rule\'s body', () => {
      expect(processor.next().value.passed).toBeFalsy();
      expect(processor.next().value.passed).toBeFalsy();
      expect(processor.next().value).toBeUndefined();
    });
  });

  describe('when the flow is empty', () => {
    beforeEach(() => {
      processor = flowProcessor(() => {})([])({});
    });

    it('it yields undefined', () => {
      expect(processor.next().value).toBeUndefined();
    });
  });
});
