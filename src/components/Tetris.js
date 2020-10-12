import React from 'react';
import Stage from './Stage';
import Display from './Display';
import Button from './Button';

const Tetris = () => {
  return (
    <div>
      <Stage />
      <aside>
        <Display>Score</Display>
        <Display>Score</Display>
        <Display>Score</Display>
        <Button></Button>
      </aside>
    </div>
  );
};

export default Tetris;
