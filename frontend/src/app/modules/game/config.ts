import { GameConfig, GameState } from './Engine';

export const gameConfig: GameConfig = {
  areaSize: 100,
  scale: 10,
  speed: 100,
};

export const gameInitialState: GameState = {
  snakePosition: {
    x: 2,
    y: 9,
  },
  moveDirection: 'left',
  snakeTail: [
    { x: 3, y: 9, moveDirection: 'left' },
    { x: 4, y: 9, moveDirection: 'left' },
    { x: 5, y: 9, moveDirection: 'left' },
    { x: 6, y: 9, moveDirection: 'left' },
  ],
};
