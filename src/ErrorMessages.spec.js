import React from 'react';
import { shallow } from 'enzyme';

import ValidatorMessage from './ValidatorMessage';

import ErrorMessages from './ErrorMessages';

describe('ErrorMessages', () => {
  it('renders a list of ValidatorMessage for each key in the attributesErrors prop', () => {
    const attributesErrors = {
      foo: 'cannot be blank',
      bar: 'cannot be foo'
    };
    const errorMessages = shallow(<ErrorMessages attributesErrors={attributesErrors} />);

    expect(errorMessages).toContainReact(<ValidatorMessage message="foo: cannot be blank" />);
    expect(errorMessages).toContainReact(<ValidatorMessage message="bar: cannot be foo" />);
  });
});
