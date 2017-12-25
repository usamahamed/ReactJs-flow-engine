import React from 'react';

import ResultsItem from './ResultsItem';

import './ResultsList.css';

const ResultsList = ({ results }) => (
  <div className='ResultsList flex-grid-thirds'>
    <div className='ResultsList-header col1'>
      <strong>Results</strong>
    </div>
    <div className='col2'>
      <ul className='ResultsList-items'>
        { results.map(({rule, passed}) =>
          <ResultsItem
            key={`result-rule-${rule.id}`}
            label={rule.title}
            passed={passed}
          />
        )}
      </ul>
      <div className='ResultsList-footer'>
        { results.length > 0 && "END." }
      </div>
    </div>
  </div>
);

export default ResultsList;
