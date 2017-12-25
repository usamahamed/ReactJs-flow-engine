import React from 'react';
import { shallow } from 'enzyme';

import ValidatorMessage from './ValidatorMessage';

import CreateRuleForm from './CreateRuleForm';
import RulesList from './RulesList';
import FlowExecutor from './FlowExecutor';
import App from './App';

describe('App', () => {
  let app, addRuleToFlow, removeRuleFromFlow, flowEngine, ruleValidator;

  beforeEach(() => {
    flowEngine = () => {};
    app = shallow(<App flowEngine={flowEngine} />);
    addRuleToFlow = app.instance().addRuleToFlow;
    ruleValidator = app.instance().validateFlowCycle;
    removeRuleFromFlow = app.instance().removeRuleFromFlow;
  });

  describe('addRuleToFlow', () => {
    it('adds a new rule to its flow state', () => {
      addRuleToFlow('I am a rule');
      expect(app).toHaveState('flow', ['I am a rule']);
    });
  });

  describe('removeRuleFromFlow', () => {
    it('well... removes a rule from the flow state', () => {
      addRuleToFlow({ id: 1 });
      addRuleToFlow({ id: 2 });
      removeRuleFromFlow(2);
      expect(app).toHaveState('flow', [{ id: 1 }]);
    });
  });

  it('contains a CreateRuleForm component', () => {
    expect(app).toContainReact(
      <CreateRuleForm
        onCreateRule={addRuleToFlow}
        ruleValidator={ruleValidator}
        ruleErrorMessage={<ValidatorMessage message={null} />}
      />
    );
  });

  it('contains a RulesList component', () => {
    expect(app).toContainReact(
      <RulesList rules={[]} onRemoveClick={removeRuleFromFlow} />
    );
  });

  it('contains a FlowExecutor component', () => {
    expect(app).toContainReact(
      <FlowExecutor engine={flowEngine([])} />
    );
  });
});

describe('App', () => {
  describe('validateFlowCycle', () => {
    let flowValidator, app;

    describe('when the flowValidator returns { valid: true }', () => {
      beforeEach(() => {
        flowValidator = () => ({ valid: true });
        app = shallow(<App flowValidator={flowValidator} flowEngine={() => {}} />);
      });

      it('returns true', () => {
        expect(app.instance().validateFlowCycle()).toBeTruthy();
      });

      it('sets the error state to null', () => {
        expect(app).toHaveState('error', null);
      });
    });

    describe('when the flowValidator returns { valid: false }', () => {
      beforeEach(() => {
        flowValidator = () => ({ valid: false, message: 'a error message' });
        app = shallow(<App flowValidator={flowValidator} flowEngine={() => {}} />);
      });

      it('returns false', () => {
        expect(app.instance().validateFlowCycle()).toBeFalsy();
      });

      it('sets the error state to the message coming from the validator', () => {
        app.instance().validateFlowCycle();
        expect(app).toHaveState('error', 'a error message');
      });
    });
  });
});
