import React, { PureComponent } from 'react';

import Field from './Field';

import './ExecuteFlowForm.css';

const promisedJSONparse = (json) => new Promise((resolve, reject) => {
  try {
    resolve(JSON.parse(json))
  } catch (e) {
    reject(e)
  }
});

class ExecuteFlowForm extends PureComponent {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
    this.executeFlow = this.executeFlow.bind(this);
    this.errorOnExecuteFlow = this.errorOnExecuteFlow.bind(this);
    this.state = { errorMessage: null }
  }

  executeFlow(testingObject) {
    this.props.onExecuteFlow(testingObject);
    this.setState({ errorMessage: null });
  }

  errorOnExecuteFlow(error) {
    this.setState({
      errorMessage: `It seems the testing JSON object you provided is invalid. -- ${error.message}`
    });
  }

  onSubmit(event) {
    event.preventDefault();
    promisedJSONparse(this.objectText.value)
    .then(this.executeFlow, this.errorOnExecuteFlow);
  }

  render() {
    return (
      <form action="#" onSubmit={this.onSubmit}>
        <Field name="testingObject" label="Object" errorMessage={this.state.errorMessage}>
          <textarea
            className='col3 Field-input'
            rows='5'
            name="testingObject"
            placeholder={`
              // a cool JSON string here, like:
              {"foo": "bar"}
            `}
            defaultValue=""
            ref={(textarea) => this.objectText = textarea}
          />
        </Field>
        <Field name="execute" label="">
          <div className="ExecuteFlowForm-submit-container">
            <input className='ExecuteFlowForm-submit col2' type="submit" value="Execute flow" />
          </div>
        </Field>
      </form>
    );
  }
}

export default ExecuteFlowForm;
