export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

export const createStage = () =>
  Array.from(Array(STAGE_WIDTH), () =>
    new Array(STAGE_HEIGHT).fill([0, 'clear'])
  );
