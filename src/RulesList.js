import React from 'react';

import './RulesList.css';

const RulesList = ({ rules, onRemoveClick }) => (
  <div>
    <h2>2. Rules list</h2>
    <div className='section'>
      <ul className='RulesList'>
        { rules.map(({id, title}) =>
          <li key={`rule-${id}`} className='RulesList-item'>
            <span className='RulesList-item-title'>{title}</span>
            <div className='RulesList-delete-container'>
              <button
                className='RulesList-delete'
                id={`remove-rule-${id}`}
                onClick={() => onRemoveClick(id)}
              >
                &times;
              </button>
            </div>
          </li>)
        }
      </ul>
    </div>
  </div>
);

export default RulesList;
