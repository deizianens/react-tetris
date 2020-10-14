import { useEffect, useState, useCallback } from 'react';

const POINTS = {
  ONE_ROW_CLEARED: 40,
  TWO_ROWS_CLEARED: 100,
  THREE_ROWS_CLEARED: 300,
  FOUR_ROWS_CLEARED: 1200,
};

export const useGameStatus = (rowsCleared) => {
  const [score, setScore] = useState(0);
  const [rows, setRows] = useState(0);
  const [level, setLevel] = useState(0);

  const linePoints = [
    POINTS.ONE_ROW_CLEARED,
    POINTS.TWO_ROWS_CLEARED,
    POINTS.THREE_ROWS_CLEARED,
    POINTS.FOUR_ROWS_CLEARED,
  ];

  const calcScore = useCallback(() => {
    if (rowsCleared > 0) {
      setScore((prev) => prev + linePoints[rowsCleared - 1] * (level + 1));
      setRows((prev) => prev + rowsCleared);
    }
  }, [level, linePoints, rowsCleared]);

  useEffect(() => {
    calcScore();
  }, [calcScore, rowsCleared, score]);

  return [score, setScore, rows, setRows, level, setLevel];
};
