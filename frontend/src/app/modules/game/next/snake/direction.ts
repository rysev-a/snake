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

export default getNextMoveDirection;
