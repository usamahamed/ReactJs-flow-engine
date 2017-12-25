import React from 'react';
import { shallow } from 'enzyme';

import CreateRuleForm from './CreateRuleForm';
import Field from './Field';
import ErrorMessages from './ErrorMessages';

describe('CreateRuleForm', () => {
  let createRuleForm, onFieldChange;

  describe('contain Fields for', () => {
    beforeEach(() => {
      createRuleForm = shallow(<CreateRuleForm />);
      onFieldChange = createRuleForm.instance().onFieldChange;
    });

    ['title', 'id', 'idIfTrue', 'idIfFalse'].forEach(attributeName =>
      it(attributeName, () => {
        expect(createRuleForm.containsMatchingElement(
          <Field name={attributeName} onChange={onFieldChange} />
        )).toBeTruthy();
      })
    );

    it('body', () => {
      expect(createRuleForm.containsMatchingElement(
        <Field name='body'>
          <textarea name="body" defaultValue="" onChange={onFieldChange} />
        </Field>
      )).toBeTruthy();
    })
  });

  describe('renders ErrorMessages component', () => {
    expect(shallow(<CreateRuleForm />)).toContainReact(
      <ErrorMessages attributesErrors={{}} />
    );
  });

  describe('onFieldChange', () => {
    it('sets rule state with event target name and value', () => {
      onFieldChange({ target: { name: 'foo', value: 'bar' } });
      expect(createRuleForm.state().rule.foo).toEqual('bar');
    });
  });

  describe('onCreateRule', () => {
    let event, onCreateRule, onCreateRuleMock, formMock;

    beforeEach(() => {
      event = { preventDefault: jest.fn() };
      formMock = { reset: jest.fn() };
      onCreateRuleMock = jest.fn();
    });

    describe('when noEmptyFields returns true', () => {
      let noEmptyFields, bodyValidator;

      beforeEach(() => {
        noEmptyFields = () => true;
      });

      describe('and the body validator returns true', () => {
        beforeEach(() => {
          bodyValidator = () => true;
        });

        describe('and ruleValidator returns true', () => {
          beforeEach(() => {
            createRuleForm = shallow(
              <CreateRuleForm
                onCreateRule={onCreateRuleMock}
                ruleValidator={() => true}
              />);
            createRuleForm.instance().form = formMock;
            createRuleForm.instance().noEmptyFields = noEmptyFields;
            createRuleForm.instance().bodyValidator = bodyValidator;
            onCreateRule = createRuleForm.instance().onCreateRule;
            onCreateRule(event);
          });

          it('resets the form', () => {
            expect(formMock.reset).toHaveBeenCalled();
          });

          it('calls the onCreateRule prop passing a new rule to it', () => {
            expect(onCreateRuleMock).toHaveBeenCalledWith({
              title: '',
              id: '',
              idIfTrue: '',
              idIfFalse: '',
              body: ''
            });
          });
        });

        describe('and ruleValidator returns false', () => {
          beforeEach(() => {
            createRuleForm = shallow(
              <CreateRuleForm
                onCreateRule={onCreateRuleMock}
                ruleValidator={() => false}
              />);
            createRuleForm.instance().form = formMock;
            createRuleForm.instance().noEmptyFields = noEmptyFields;
            onCreateRule = createRuleForm.instance().onCreateRule;
            onCreateRule(event);
          });

          it('does not reset the form', () => {
            expect(formMock.reset).not.toHaveBeenCalled();
          });

          it('does not call the onCreateRule prop', () => {
            expect(onCreateRuleMock).not.toHaveBeenCalled();
          });
        });
      });

      describe('and the body validator returns false', () => {
        beforeEach(() => {
          bodyValidator = () => false;
          createRuleForm = shallow(
            <CreateRuleForm
              onCreateRule={onCreateRuleMock}
              ruleValidator={() => {}}
            />);
          createRuleForm.instance().form = formMock;
          createRuleForm.instance().noEmptyFields = noEmptyFields;
          createRuleForm.instance().bodyValidator = bodyValidator;
          onCreateRule = createRuleForm.instance().onCreateRule;
          onCreateRule(event);
        });

        it('does not reset the form', () => {
          expect(formMock.reset).not.toHaveBeenCalled();
        });

        it('does not call the onCreateRule prop', () => {
          expect(onCreateRuleMock).not.toHaveBeenCalled();
        });

        it('does not call the onCreateRule prop', () => {
          expect(onCreateRuleMock).not.toHaveBeenCalled();
        });
      });
    });

    describe('when noEmptyFields returns false', () => {
      let noEmptyFields, ruleValidator, reset, bodyValidator;

      beforeEach(() => {
        noEmptyFields = () => false;
        ruleValidator = jest.fn();
        bodyValidator = jest.fn();
        reset = jest.fn();
        createRuleForm = shallow(
          <CreateRuleForm
            onCreateRule={onCreateRuleMock}
            ruleValidator={ruleValidator}
          />);
        createRuleForm.instance().form = formMock;
        createRuleForm.instance().noEmptyFields = noEmptyFields;
        createRuleForm.instance().bodyValidator = bodyValidator;
        createRuleForm.instance().reset = reset;

        onCreateRule(event);
      });

      it('does not reset the bodyValidator', () => {
        expect(bodyValidator).not.toHaveBeenCalled();
      });

      it('does not call ruleValidator', () => {
        expect(onCreateRuleMock).not.toHaveBeenCalled();
      });

      it('does not call onCreateRule', () => {
        expect(ruleValidator).not.toHaveBeenCalled();
      });

      it('does not reset the component', () => {
        expect(reset).not.toHaveBeenCalled();
      });
    });
  });

  describe('reset', () => {
    let formMock, createRuleForm;

    beforeEach(() => {
      formMock = { reset: jest.fn() };
      createRuleForm = shallow(<CreateRuleForm />);
      createRuleForm.instance().form = formMock;
      createRuleForm.instance().reset();
    });

    it('resets the form', () => {
      expect(formMock.reset).toHaveBeenCalled();
    });

    it('resets the rule state', () => {
      expect(createRuleForm).toHaveState('rule', {
        id: '',
        title: '',
        body: '',
        idIfTrue: '',
        idIfFalse: '',
      })
    });
  });

  describe('noEmptyFields', () => {
    let createRuleForm, noEmptyFieldsReturn;

    beforeEach(() => {
      createRuleForm = shallow(<CreateRuleForm />);
    });

    describe('when rule.id is empty', () => {
      beforeEach(() => {
        noEmptyFieldsReturn = createRuleForm.instance().noEmptyFields({ id: '' })
      });

      it('adds id to the error state', () => {
        expect(createRuleForm.state().errors.id).toEqual('Cannot be empty');
      });

      it('returns false', () => {
        expect(noEmptyFieldsReturn).toBeFalsy();
      });
    });

    describe('when rule.title is empty', () => {
      beforeEach(() => {
        noEmptyFieldsReturn = createRuleForm.instance().noEmptyFields({ title: '' })
      });

      it('adds id to the error state', () => {
        expect(createRuleForm.state().errors.title).toEqual('Cannot be empty');
      });

      it('returns false', () => {
        expect(noEmptyFieldsReturn).toBeFalsy();
      });
    });
  });

  describe('noEmptyFields', () => {
    let createRuleForm, bodyValidator;

    beforeEach(() => {
      createRuleForm = shallow(<CreateRuleForm />);
      bodyValidator = createRuleForm.instance().bodyValidator
    });

    describe('when rule.body is not valid', () => {
      it('adds body to the error state', () => {
        bodyValidator({ body: '' });
        expect(createRuleForm.state().errors.body)
          .toEqual('is not a valid javascript function');
      });

      it('returns false', () => {
        expect(bodyValidator()).toBeFalsy();
      });
    });

    describe('when rule.body is valid', () => {
      it('returns true', () => {
        expect(bodyValidator({
          body: 'function(obj) { return obj.foo == "bar"; }'
        })).toBeTruthy();
      });
    });
  });
});
