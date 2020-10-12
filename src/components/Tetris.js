import React from 'react';

import Stage from './Stage';
import Display from './Display';
import Button from './Button';
import { createStage } from '../helpers';
import {
  StyledTetris,
  StyledTetrisWrapper,
} from '../components/styles/StyledTetris';

const Tetris = () => {
  return (
    <StyledTetrisWrapper>
      <StyledTetris>
        <Stage stage={createStage()} />
        <aside>
          <Display text='Score' />
          <Display text='Rows' />
          <Display text='Level' />
          <Button />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
