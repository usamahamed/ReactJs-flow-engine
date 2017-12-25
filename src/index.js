import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import flowEngine, { validators } from './flow';

import './index.css';

ReactDOM.render(
  <App flowEngine={flowEngine} flowValidator={validators.cyclicValidator} />,
  document.getElementById('root')
);
