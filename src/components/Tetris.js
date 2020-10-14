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
import { useInterval } from '../hooks/useInterval';
import { useGameStatus } from '../hooks/useGameStatus';

import { createStage, checkCollision } from '../helpers';

const KEYS = {
  LEFT_ARROW: 37,
  RIGHT_ARROW: 39,
  DOWN_ARROW: 40,
  UP_ARROW: 38,
};

const LEVEL_UP = 10;

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(
    rowsCleared
  );

  const getLevelSpeed = () => 1000 / (level + 1) + 200;

  const movePlayer = (dir) => {
    if (!checkCollision(player, stage, { x: dir, y: 0 }))
      updatePlayerPos({ x: dir, y: 0 });
  };

  const startGame = () => {
    setStage(createStage());
    setDropTime(1000);
    resetPlayer();
    setGameOver(false);
    setScore(0);
    setRows(0);
  };

  const drop = () => {
    if (rows > (level + 1) * LEVEL_UP) {
      setLevel((prev) => prev + 1);
      setDropTime(getLevelSpeed());
    }

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

  const keyUp = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === KEYS.DOWN_ARROW) {
        setDropTime(getLevelSpeed());
      }
    }
  };

  const dropPlayer = () => {
    setDropTime(null);
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

  useInterval(() => {
    drop();
  }, dropTime);

  return (
    <StyledTetrisWrapper
      role='button'
      tabIndex='0'
      onKeyDown={(e) => move(e)}
      onKeyUp={keyUp}
    >
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text='Game Over' />
          ) : (
            <div>
              <Display text={`Score: ${score}`} />
              <Display text={`Rows: ${rows}`} />
              <Display text={`Level: ${level}`} />
              <Button callback={startGame} />
            </div>
          )}
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
