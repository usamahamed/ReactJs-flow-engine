import React from 'react';
import { shallow } from 'enzyme';

import FlowExecutor from './FlowExecutor';
import ResultsList from './ResultsList';
import ExecuteFlowForm from './ExecuteFlowForm';
import ValidatorMessage from './ValidatorMessage';

function* engineMock(testingObject) {
  yield({ currentRule: `first-rule-${testingObject}`, passed: true });
  yield({ currentRule: `second-rule-${testingObject}`, passed: false });
}

function* brokenEngine(testingObject) {
  yield 'it is a trap';
  throw Error('kaputt');
}

describe('FlowExecutor', () => {
  let flowExecutor, onExecuteFlow;

  beforeEach(() => {
    flowExecutor = shallow(<FlowExecutor engine={engineMock} />);
    onExecuteFlow = flowExecutor.instance().onExecuteFlow;
  });

  it('contains a ExecuteFlowForm component', () => {
    expect(flowExecutor).toContainReact(<ExecuteFlowForm onExecuteFlow={onExecuteFlow} />);
  });

  it('contains a ResultsList component', () => {
    expect(flowExecutor).toContainReact(<ResultsList results={[]} />);
  });

  describe('when the error state is not empty', () => {
    it('renders a ValidatorMessage passing the error state', () => {
      flowExecutor.setState({ error: 'kaputt'});
      expect(flowExecutor).toContainReact(<ValidatorMessage message='kaputt' />);
    });
  });

  describe('onExecuteFlow', () => {
    beforeEach(() => { onExecuteFlow('testing'); });

    it('calls the engine passing the testingObject and stores the results in its results state', () => {
      expect(flowExecutor).toHaveState('results', [
        { rule: 'first-rule-testing', passed: true },
        { rule: 'second-rule-testing', passed: false }
      ])
    });

    describe('if the engine throws an error', () => {
      beforeEach(() => {
        flowExecutor = shallow(<FlowExecutor engine={brokenEngine} />);
        flowExecutor.instance().onExecuteFlow();
      });

      it('sets the error state', () => {
        expect(flowExecutor).toHaveState('error', 'kaputt');
      });
    });
  });
});
