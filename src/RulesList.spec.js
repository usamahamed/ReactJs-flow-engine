import React from 'react';
import { shallow } from 'enzyme';

import RulesList from './RulesList';

describe('RulesList', () => {
  let rules, rulesList, onRemoveClickMock;

  beforeEach(() => {
    rules = [{ title: 'a', id: '1' }, { title: 'b', id: '2'}];
    onRemoveClickMock = jest.fn();
    rulesList = shallow(<RulesList rules={rules} onRemoveClick={onRemoveClickMock} />);
  });

  it('renders a li element for each rule in its rules prop', () => {
    expect(rulesList.containsMatchingElement(
      <li>
        <span>a</span>
        <div>
          <button>&times;</button>
        </div>
      </li>
    )).toBeTruthy();
    expect(rulesList.containsMatchingElement(
      <li>
        <span>a</span>
        <div>
          <button>&times;</button>
        </div>
      </li>
    )).toBeTruthy();
  });

  describe('when clicking on the remove link', () => {
    beforeEach(() => {
      rulesList.find('#remove-rule-1').simulate('click');
    });

    it('calls the onRemoveClick prop passing the rules id as its parameter', () => {
      expect(onRemoveClickMock).toHaveBeenCalledWith("1");
    });
  });
});
