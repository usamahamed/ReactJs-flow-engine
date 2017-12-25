import React from 'react';

import './ValidatorMessage.css';

const ValidatorMessage = ({ message }) => (
  message &&
    <span className='ValidatorMessage'>
      {message}
    </span>
);

export default ValidatorMessage;
