import React from 'react';

import ValidatorMessage from './ValidatorMessage';

const ErrorMessages = ({ attributesErrors }) => (
  <ul>
    {Object.keys(attributesErrors).map(attribute => (
      <li key={`error-${attribute}`}>
        <ValidatorMessage message={`${attribute}: ${attributesErrors[attribute]}`} />
      </li>
    ))}
  </ul>
);

export default ErrorMessages;
