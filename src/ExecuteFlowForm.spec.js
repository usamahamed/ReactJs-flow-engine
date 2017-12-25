import React from 'react';
import { shallow } from 'enzyme';

import ExecuteFlowForm from './ExecuteFlowForm';
import Field from './Field';

describe('ExecuteFlowForm', () => {
  let executeFlowForm;

  describe('contains Field for', () => {
    beforeEach(() => {
      executeFlowForm = shallow(<ExecuteFlowForm />);
    });

    it('testingObject', () => {
      expect(executeFlowForm.containsMatchingElement(
        <Field name='testingObject' label='Object'>
          <textarea name="testingObject" defaultValue="" />
        </Field>
      )).toBeTruthy();
    })
  });

  describe('onSubmit', () => {
    let onExecuteFlowMock, jsonString;
    beforeEach(() => { onExecuteFlowMock = jest.fn(); });

    describe('when the json string is valid', () => {
      beforeEach(() => {
        jsonString = '{"foo":"bar"}';
        executeFlowForm = shallow(<ExecuteFlowForm onExecuteFlow={onExecuteFlowMock} />);
        executeFlowForm.instance().objectText = { value: jsonString };
        executeFlowForm.find('form').simulate('submit', { preventDefault: () => {} });
      });

      it('calls the onExecuteFlow prop passing the parsed JSON coming from the testingObject field', () => {
        expect(onExecuteFlowMock).toHaveBeenCalledWith({ foo: 'bar' });
      });

      it('resets the errorMessage state back to null', () => {
        expect(executeFlowForm).toHaveState('errorMessage', null);
      });
    });

    describe('when the json string is not valid', () => {
      beforeEach(() => {
        jsonString = '';
        executeFlowForm = shallow(<ExecuteFlowForm onExecuteFlow={onExecuteFlowMock} />);
        executeFlowForm.instance().objectText = { value: jsonString };
        executeFlowForm.find('form').simulate('submit', { preventDefault: () => {} });
      });

      it('does not call the onExecuteFlow prop', () => {
        expect(onExecuteFlowMock).not.toHaveBeenCalled();
      });

      it('sets the errorMessage state', () => {
        expect(executeFlowForm.state('errorMessage'))
          .toContain('It seems the testing JSON object you provided is invalid');
      });
    });
  });
});
