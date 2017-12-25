import React, { Component } from 'react';

import ValidatorMessage from './ValidatorMessage';

import CreateRuleForm from './CreateRuleForm';
import RulesList from './RulesList';
import FlowExecutor from './FlowExecutor';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = { flow: [], error: null };
    this.addRuleToFlow = this.addRuleToFlow.bind(this);
    this.removeRuleFromFlow = this.removeRuleFromFlow.bind(this);
    this.validateFlowCycle = this.validateFlowCycle.bind(this);
  }

  addRuleToFlow(rule) {
    this.setState({
      flow: [...this.state.flow, rule],
      error: null
    });
  }

  removeRuleFromFlow(ruleId) {
    this.setState({
      flow: this.state.flow.filter(({ id }) => id !== ruleId)
    });
  }

  validateFlowCycle(newRule) {
    const { valid, message } = this.props.flowValidator([...this.state.flow, newRule]);
    if(!valid) {
      this.setState({ error: message });
    }
    return valid;
  }

  render() {
    return (
      <div className="App">
        <h1>Flow Engine</h1>
        <CreateRuleForm
          onCreateRule={this.addRuleToFlow}
          ruleValidator={this.validateFlowCycle}
          ruleErrorMessage={<ValidatorMessage message={this.state.error} />}
        />
        <RulesList rules={this.state.flow} onRemoveClick={this.removeRuleFromFlow} />
        <FlowExecutor engine={this.props.flowEngine(this.state.flow)} />
      </div>
    );
  }
}

export default App;
