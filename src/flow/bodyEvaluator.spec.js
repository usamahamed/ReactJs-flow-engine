import bodyEvaluator from './bodyEvaluator';

describe('bodyEvaluator', () => {
  const testingObject = { foo: 'bar' };
  let rule;

  it('evaluates the body string into a function and calls it passing the testingObject', () => {
    rule = {
      title: 'A rule',
      body: "function(obj) { return obj.foo === 'bar' }"
    };
    expect(bodyEvaluator(rule, testingObject)).toBeTruthy();
  });

  it('trhow an error in case the body cannot be evaluated', () => {
    rule = {
      title: 'A rule',
      body: "function() { baaaad function }"
    };
    expect(() => bodyEvaluator(rule, testingObject)).toThrow();
  });
});
