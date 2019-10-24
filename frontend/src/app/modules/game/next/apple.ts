import { GameState, Apple, GameConfig } from '../Engine';
import moveSnakeBlock from './snake/move-block';
import mathMod from 'ramda/es/mathMod';

const newApplePosition = (gameConfig: GameConfig) => {
  return {
    x: Math.floor(Math.random() * gameConfig.areaSize),
    y: Math.floor(Math.random() * gameConfig.areaSize),
  };
};

const checkIsAppleUnderSnake = (apple: Apple, gameState: GameState) => {
  return [...gameState.snakeTail, gameState.snakePosition].some(block => {
    return block.x === apple.x && block.y === apple.y;
  });
};

const generateNewApple = (gameState: GameState, gameConfig: GameConfig) => {
  let apple = newApplePosition(gameConfig);
  while (checkIsAppleUnderSnake(newApplePosition(gameConfig), gameState)) {
    apple = newApplePosition(gameConfig);
  }
  return apple;
};

const lastTailBlocPositionkWillBe = lastTailBlock => {
  return {
    left: {
      x: lastTailBlock.x + 1,
      y: lastTailBlock.y,
    },
    right: {
      x: lastTailBlock.x - 1,
      y: lastTailBlock.y,
    },
    top: {
      x: lastTailBlock.x,
      y: lastTailBlock.y - 1,
    },
    bottom: {
      x: lastTailBlock.x,
      y: lastTailBlock.y + 1,
    },
  }[lastTailBlock.moveDirection];
};

const eatApples = (gameState: GameState, gameConfig: GameConfig) => {
  const eatingApple = gameState.apples.find((apple: Apple) => {
    return (
      apple.x === gameState.snakePosition.x &&
      apple.y === gameState.snakePosition.y
    );
  });
  if (eatingApple) {
    let apples = gameState.apples.filter((apple: Apple) => {
      return !(
        apple.x === gameState.snakePosition.x &&
        apple.y === gameState.snakePosition.y
      );
    });
    const lastSnakeTailBlock =
      gameState.snakeTail[gameState.snakeTail.length - 1];

    const snakeNewBlockTail = moveSnakeBlock({
      position: {
        x: lastTailBlocPositionkWillBe(lastSnakeTailBlock).x,
        y: lastTailBlocPositionkWillBe(lastSnakeTailBlock).y,
      },
      moveDirection: lastSnakeTailBlock.moveDirection,
      size: gameConfig.areaSize,
    });
    const snakeTail = [...gameState.snakeTail, snakeNewBlockTail];
    apples = [...apples, generateNewApple(gameState, gameConfig)];
    return { apples, snakeTail };
  }
  return gameState;
};

export default eatApples;
