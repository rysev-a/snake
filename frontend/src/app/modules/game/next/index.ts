import { GameState, GameConfig } from '../Engine';
import getNextMoveDirection from './snake/direction';
import moveSnakeBlock from './snake/move-block';
import getSnakeTail from './snake/tail';

const next = (state: GameState, config: GameConfig, keyPressed) => {
  const prevMoveDirection = state.moveDirection;
  const nextMoveDirection = getNextMoveDirection(prevMoveDirection, keyPressed);

  const snakePosition = moveSnakeBlock({
    position: state.snakePosition,
    moveDirection: state.moveDirection,
    size: config.areaSize,
  });

  const snakeTail = getSnakeTail(state, config, prevMoveDirection);

  return {
    ...state,
    moveDirection: nextMoveDirection,
    snakePosition,
    snakeTail,
  };
};

export default next;
