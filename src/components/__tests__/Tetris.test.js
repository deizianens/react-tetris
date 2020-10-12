import React from 'react';
import { shallow } from 'enzyme';
import Tetris from '../Tetris';

describe('Tetris', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Tetris />);
    expect(wrapper.exists()).toBeTruthy();
  });
});
