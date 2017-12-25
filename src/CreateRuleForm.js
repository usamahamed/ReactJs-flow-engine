import React, { PureComponent } from 'react';

import createFunction from './flow/createFunction';

import Field from './Field';
import ErrorMessages from './ErrorMessages';

import './CreateRuleForm.css';

const isEmpty = (string) => string.trim().length === 0;

class CreateRuleForm extends PureComponent {
  constructor(props) {
    super();
    this.state = {
      rule: {
        id: '',
        title: '',
        body: '',
        idIfTrue: '',
        idIfFalse: ''
      },
      errors: {}
    };
    this.onCreateRule = this.onCreateRule.bind(this);
    this.createRule = this.createRule.bind(this);
    this.onFieldChange = this.onFieldChange.bind(this);
    this.noEmptyFields = this.noEmptyFields.bind(this);
    this.bodyValidator = this.bodyValidator.bind(this);
    this.reset = this.reset.bind(this);
  }

  noEmptyFields(newRule) {
    const emptyFieldsErrors = ['id', 'title'].reduce((errors, attribute) => {
      if (isEmpty(this.state.rule[attribute])) {
        errors = { ...errors, [attribute]: 'Cannot be empty' }
      }
      return errors;
    }, {});
    this.setState({ errors: emptyFieldsErrors });
    return Object.keys(emptyFieldsErrors).length === 0;
  }

  bodyValidator(newRule) {
    try {
      createFunction(newRule.body);
    } catch (_error) {
      this.setState({
        errors: { body: 'is not a valid javascript function' }
      });
      return false;
    }
    return true;
  }

  onCreateRule(event) {
    event.preventDefault();
    return this.noEmptyFields(this.state.rule) &&
      this.bodyValidator(this.state.rule) &&
      this.props.ruleValidator(this.state.rule) &&
      this.createRule();
  }

  createRule() {
    this.props.onCreateRule(this.state.rule);
    this.reset();
  }

  reset() {
    this.form.reset();
    this.setState({
        rule: {
          id: '',
          title: '',
          body: '',
          idIfTrue: '',
          idIfFalse: ''
        },
        errors: {}
    });
  }

  onFieldChange(event) {
    this.setState({
      rule: {
        ...this.state.rule,
        [event.target.name]: event.target.value
      }
    });
  }

  render() {
    return (
      <div>
        <h2>1. Create flow</h2>
        <div className='section'>
          <form action="#" onSubmit={this.onCreateRule} ref={(form) => { this.form = form; }}>
            <fieldset className='CreateRuleForm-fieldset'>
              <legend>New Rule</legend>

              <Field name="title" placeholder="A nice title" onChange={this.onFieldChange} />
              <Field name="id" placeholder="ex. 1" onChange={this.onFieldChange} />
              <Field name="body">
                <textarea
                  className="Field-input col3"
                  rows="5"
                  name="body"
                  placeholder={`
                    // a nice an clean javascript function here, like:
                    function(obj) {
                      return obj.foo === 'bar';
                    }
                  `}
                  defaultValue=""
                  onChange={this.onFieldChange}
                />
              </Field>
              <Field name="idIfTrue" label="Id if it passes" placeholder="ex. 2" onChange={this.onFieldChange} />
              <Field name="idIfFalse" label="Id if it fails" placeholder="ex. 3" onChange={this.onFieldChange} />
              <Field name="create" label="" errorMessage={this.props.ruleErrorMessage}>
                <div className="CreateRuleForm-submit-container">
                  <input className='CreateRuleForm-submit col2' type="submit" name="create" value="Add new rule" />
                </div>
                <ErrorMessages attributesErrors={this.state.errors} />
              </Field>
            </fieldset>
          </form>
        </div>
      </div>
    );
  }
}

export default CreateRuleForm;
