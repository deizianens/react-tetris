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
import { createStage, checkCollision } from '../helpers';

const KEYS = {
  LEFT_ARROW: 37,
  RIGHT_ARROW: 39,
  DOWN_ARROW: 40,
  UP_ARROW: 38,
};

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage] = useStage(player, resetPlayer);

  const movePlayer = (dir) => {
    if (!checkCollision(player, stage, { x: dir, y: 0 }))
      updatePlayerPos({ x: dir, y: 0 });
  };

  const startGame = () => {
    setStage(createStage());
    resetPlayer();
    setGameOver(false);
  };

  const drop = () => {
    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      if (player.pos.y < 1) {
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  const dropPlayer = () => {
    drop();
  };

  const move = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === KEYS.LEFT_ARROW) movePlayer(-1);
      else if (keyCode === KEYS.RIGHT_ARROW) movePlayer(1);
      else if (keyCode === KEYS.DOWN_ARROW) dropPlayer();
      else if (keyCode === KEYS.UP_ARROW) playerRotate(stage, 1);
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
              <Button callback={startGame} />
            </div>
          )}
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
