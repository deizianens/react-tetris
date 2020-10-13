import { useState, useEffect } from 'react';

import { createStage } from '../helpers';

export const useStage = (player, resetPlayer) => {
  const [stage, setStage] = useState(createStage());

  useEffect(() => {
    const updateStage = (prevStage) => {
      const newStage = prevStage.map((row) => {
        row.map((cell) => (cell[1] === 'clear' ? [0, 'clear'] : cell));
      });

      //draw the tetromino
      player.tetromine.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            newStage[y + player.pos.y][x + player.pos.x] = [
              value,
              `${player.collided ? 'merged' : 'clear'}`,
            ];
          }
        });
      });
    };

    setStage((prev) => updateStage(prev));
  }, []);

  return [stage, setStage];
};
