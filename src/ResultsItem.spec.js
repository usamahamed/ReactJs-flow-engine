import React from 'react';
import { shallow } from 'enzyme'

import ResultsItem from './ResultsItem';

describe('ResultsItem', () => {
  let resultsItem;

  it('renders the prop label', () => {
    expect(shallow(<ResultsItem label='a label' />)).toIncludeText('a label');
  });

  describe('when the passed prop is true', () => {
    beforeEach(() => { resultsItem = shallow(<ResultsItem passed />) });

    it('displays a li tag containing the string passed', () => {
      expect(resultsItem).toIncludeText('passed');
    });

    it('displays a li tag with the class .ResultsItem--passed', () => {
      expect(resultsItem).toHaveClassName('ResultsItem--passed');
    });
  });

  describe('when the passed prop is true', () => {
    beforeEach(() => { resultsItem = shallow(<ResultsItem passed={false} />) });

    it('displays a li tag containing the string failed', () => {
      expect(resultsItem).toIncludeText('failed');
    });

    it('displays a li tag with the class .ResultsItem--failed', () => {
      expect(resultsItem).toHaveClassName('ResultsItem--failed');
    });
  });
});
