import React from 'react';
import { shallow } from 'enzyme';
import Stage from '../Stage';
import Cell from '../Cell';

describe('Stage', () => {
  let wrapper;
  let stage = [
    [
      [0, 'clear'],
      [0, 'clear'],
      [0, 'clear'],
    ],
    [
      [0, 'clear'],
      [0, 'clear'],
      [0, 'clear'],
    ],
  ];

  beforeEach(() => {
    wrapper = shallow(<Stage stage={stage} />);
  });

  it('renders stage without crashing', () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('creates a stage with the right amount of cells', () => {
    expect(wrapper.find(Cell)).toHaveLength(6);
  });
});
