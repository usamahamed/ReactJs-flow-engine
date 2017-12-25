import React, { PureComponent } from 'react';

import ResultsList from './ResultsList';
import ExecuteFlowForm from './ExecuteFlowForm';
import ValidatorMessage from './ValidatorMessage';

class FlowExecutor extends PureComponent {
  constructor() {
    super();
    this.state = { results: [], error: null };
    this.onExecuteFlow = this.onExecuteFlow.bind(this);
  }

  onExecuteFlow(testingObject) {
    let results = [];
    try {
      for(let { currentRule, passed } of this.props.engine(testingObject)) {
        results = [ ...results, { rule: currentRule, passed } ];
      }
      this.setState({ results, error: null });
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  render() {
    return (
      <div>
        <h2>3. Execute flow</h2>
        <div className='section'>
          <ExecuteFlowForm onExecuteFlow={this.onExecuteFlow} />
          <ResultsList results={this.state.results} />
          { this.state.error && <ValidatorMessage message={this.state.error} /> }
        </div>
      </div>
    );
  }
}

export default FlowExecutor;
