import React, { useState } from 'react';
import Stage from './Stage';
import Display from './Display';
import Button from './Button';

import {
  StyledTetris,
  StyledTetrisWrapper,
} from '../components/styles/StyledTetris';

import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';
import { createStage } from '../helpers';

const KEYS = {
  LEFT_ARROW: 37,
  RIGHT_ARROW: 39,
  DOWN_ARROW: 40,
};

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer] = usePlayer();
  const [stage, setStage] = useStage();

  const movePlayer = (dir) => {
    updatePlayerPos({ x: dir, y: 0 });
  };

  const startGame = () => {
    setStage(createStage());
    resetPlayer();
  };

  const drop = () => {
    updatePlayerPos({ x: 0, y: 1, collided: false });
  };

  const dropPlayer = () => {
    drop();
  };

  const move = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === KEYS.LEFT_ARROW) movePlayer(-1);
      else if (keyCode === KEYS.RIGHT_ARROW) movePlayer(1);
      else if (keyCode === KEYS.DOWN_ARROW) dropPlayer();
    }
  };

  return (
    <StyledTetrisWrapper role='button' tabIndex='0' onKeyDown={(e) => move(e)}>
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text='Game Over' />
          ) : (
            <div>
              <Display text='Score' />
              <Display text='Rows' />
              <Display text='Level' />
              <Button onClick={startGame} />
            </div>
          )}
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
