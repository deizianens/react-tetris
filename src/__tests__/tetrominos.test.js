import { TETROMINOS, randomTetromino } from '../tetrominos';

describe('Tetrominos', () => {
  it('returns a valid tetromino', () => {
    let tetromino = randomTetromino();
    let result = Object.values(TETROMINOS).includes(tetromino);

    expect(result).toBe(true);
  });
});
