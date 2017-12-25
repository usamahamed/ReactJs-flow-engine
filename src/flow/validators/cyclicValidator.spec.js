import cyclicValidator from './cyclicValidator';

describe('cyclicValidator', () => {
  let flow;

  describe('when the flow contains a cycle', () => {
    beforeEach(() => {
      flow = [
        { id: 1, idIfTrue: 2, idIfFalse: null },
        { id: 2, idIfTrue: 3, idIfFalse: null },
        { id: 3, idIfTrue: null, idIfFalse: 1 }
      ];
    });

    it('returns false', () => {
      expect(flow).not.toBeValidWith(cyclicValidator);
    });
  });

  describe('when the flow has no cycles', () => {
    beforeEach(() => {
      flow = [
        { id: 1, idIfTrue: 2, idIfFalse: null },
        { id: 2, idIfTrue: 3, idIfFalse: null },
        { id: 3, idIfTrue: null, idIfFalse: null }
      ];
    });

    it('returns true', () => {
      expect(flow).toBeValidWith(cyclicValidator);
    });
  });

  describe('when the flow is empty', () => {
    it('returns true', () => {
      expect([]).toBeValidWith(cyclicValidator);
    });
  });

  describe('when the flow has only one rule', () => {
    beforeEach(() => {
      flow = [
        { id: 1, idIfTrue: 2, idIfFalse: null }
      ];
    });

    it('returns true', () => {
      expect(flow).toBeValidWith(cyclicValidator);
    });
  });
});
