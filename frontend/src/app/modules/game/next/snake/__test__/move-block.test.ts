import { expect } from 'chai';
import moveSnakeBlock from '../move-block';

describe('Move block', () => {
  it('should move block to right', () => {
    const prevPosition = {
      x: 0,
      y: 0,
    };

    const moveDirection = 'right';
    const areaSize = '10';

    expect(
      moveSnakeBlock({ position: prevPosition, moveDirection, size: areaSize })
    ).to.deep.equal({
      x: 1,
      y: 0,
    });
  });
});
