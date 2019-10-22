import { GameConfig, GameState } from '../../Engine';
import moveSnakeBlock from './move-block';

const getSnakeTail = (
  state: GameState,
  config: GameConfig,
  prevMoveDirection
) => {
  const snakeTailData = state.snakeTail.reduce(
    (acc, snakeBlock) => {
      const position = moveSnakeBlock({
        position: { x: snakeBlock.x, y: snakeBlock.y },
        moveDirection: snakeBlock.moveDirection,
        size: config.areaSize,
      });

      const nextSnakeBlock = {
        ...snakeBlock,
        ...position,
        moveDirection: acc.prevMoveDirection,
      };

      return {
        newStakeTail: [...acc.newStakeTail, nextSnakeBlock],
        prevMoveDirection: snakeBlock.moveDirection,
      };
    },
    { newStakeTail: [], prevMoveDirection }
  );

  return snakeTailData.newStakeTail;
};

export default getSnakeTail;
