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

export default moveSnakeBlock;
