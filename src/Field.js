import React from 'react';

import ValidatorMessage from './ValidatorMessage';

import './Field.css';

const Field = ({ name, label, children, errorMessage, ...inputProps }) => (
  <div className='Field flex-grid-thirds'>
    <label htmlFor={name} className='col1'>
      <strong>{label !== undefined ? label : name}</strong>
    </label>
    <div className='col2'>
      {children || <input className='Field-input col3' type="text" name={name} {...inputProps} />}
      {errorMessage && <ValidatorMessage message={errorMessage} />}
    </div>
  </div>
);

export default Field;
