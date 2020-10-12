import React from 'react';
import { shallow } from 'enzyme';
import Tetris from '../Tetris';
import Stage from '../Stage';
import Display from '../Display';
import Button from '../Button';

describe('Tetris', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Tetris />);
  });

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('renders components correctly', () => {
    expect(wrapper.find(Stage).at(0).exists()).toBeTruthy();
    expect(wrapper.find(Display).at(0).exists()).toBeTruthy();
    expect(wrapper.find(Display).at(1).exists()).toBeTruthy();
    expect(wrapper.find(Display).at(2).exists()).toBeTruthy();
    expect(wrapper.find(Button).at(0).exists()).toBeTruthy();
  });
});
