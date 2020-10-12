import React from 'react';

import Stage from './Stage';
import Display from './Display';
import Button from './Button';
import { createStage } from '../helpers';

const Tetris = () => {
  return (
    <div>
      <Stage stage={createStage()} />
      <aside>
        <Display text='Score' />
        <Display text='Rows' />
        <Display text='Level' />
        <Button />
      </aside>
    </div>
  );
};

export default Tetris;
