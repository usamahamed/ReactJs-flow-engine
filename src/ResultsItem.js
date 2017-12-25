import React from 'react';

import './ResultsItem.css';

const ResultsList = ({ label, passed }) => (
  <li className={`ResultsItem ResultsItem--${passed ? 'passed' : 'failed'}`}>
    {label} { passed ? 'passed' : 'failed' }
  </li>
);

export default ResultsList;
