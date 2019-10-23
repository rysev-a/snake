import { GameState, GameConfig } from '../Engine';
import getNextMoveDirection from './snake/direction';
import moveSnakeBlock from './snake/move-block';
import getSnakeTail from './snake/tail';
import eatApples from './apple';
import { gameConfig } from '../config';

const next = (state: GameState, config: GameConfig, keyPressed) => {
  const prevMoveDirection = state.moveDirection;
  const nextMoveDirection = getNextMoveDirection(prevMoveDirection, keyPressed);

  const snakePosition = moveSnakeBlock({
    position: state.snakePosition,
    moveDirection: state.moveDirection,
    size: config.areaSize,
  });

  const movedSnakeTail = getSnakeTail(state, config, prevMoveDirection);

  const { apples, snakeTail } = eatApples(
    { ...state, snakeTail: movedSnakeTail },
    gameConfig
  );

  return {
    ...state,
    moveDirection: nextMoveDirection,
    snakePosition,
    snakeTail,
    apples,
  };
};

export default next;
