import { GameState, GameConfig } from '../Engine';

const moveSnakeBlock = ({ position, moveDirection, size }) => {
  if (moveDirection === 'right') {
    const x = position.x + 1;
    return {
      ...position,
      x: x > size - 1 ? 0 : x,
    };
  }

  if (moveDirection === 'left') {
    const x = position.x - 1;
    return {
      ...position,
      x: x < 0 ? size - 1 : x,
    };
  }

  if (moveDirection === 'top') {
    const y = position.y + 1;

    return {
      x: position.x,
      y: y > size - 1 ? 0 : y,
    };
  }

  if (moveDirection === 'bottom') {
    const y = position.y - 1;

    return {
      ...position,
      y: y < 0 ? size - 1 : y,
    };
  }
};

const getNextMoveDirection = (moveDirection, keyPressed) => {
  if (keyPressed.w && moveDirection !== 'bottom') {
    return 'top';
  }

  if (keyPressed.s && moveDirection !== 'top') {
    return 'bottom';
  }

  if (keyPressed.d && moveDirection !== 'left') {
    return 'right';
  }

  if (keyPressed.a && moveDirection !== 'right') {
    return 'left';
  }

  return moveDirection;
};

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
