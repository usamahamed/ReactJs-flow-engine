import React from 'react';
import { shallow } from 'enzyme';

import ValidatorMessage from './ValidatorMessage';

import Field from './Field';

describe('Field', () => {
  describe('when the prop label is present', () => {
    it('renders it', () => {
      expect(
        shallow(<Field label="Hello there" />)
      ).toHaveText("Hello there");
    });
  });

  describe('when the prop name is present', () => {
    describe('and the prop label is not available', () => {
      it('renders it', () => {
        expect(
          shallow(<Field name="name prop" />)
        ).toHaveText("name prop");
      });
    });

    describe('and the prop label is also available', () => {
      it('renders the label instead', () => {
        const field = shallow(<Field label="Hello there" name="I'm invisible" />);
        expect(field).toHaveText("Hello there");
        expect(field).not.toHaveText("I'm invisible");
      });
    });

    describe('and the prop errorMessage is present', () => {
      it('renders a ValidatorMessage for it', () => {
        const field = shallow(<Field errorMessage='Oh noes, error.' />);
        expect(field).toContainReact(
          <ValidatorMessage message='Oh noes, error.' />
        );
      });
    });

    describe('when children are passed', () => {
      it('renders it', () => {
        const field = shallow(<Field><p>children</p></Field>);
        expect(field).toContainReact(<p>children</p>);
      });
    });

    describe('when no children is passed', () => {
      it('renders an input passing down the prop name and anything else different than name, children and label', () => {
        const field = shallow(<Field name="attributeName" placeholder="just holding place" />);
        expect(field.containsMatchingElement(
          <input type="text" name="attributeName" placeholder="just holding place" />
        )).toBeTruthy();
      });
    });
  });
});
