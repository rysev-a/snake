import { expect } from 'chai';
import getNextMoveDirection from '../direction';

describe('Snake direction', () => {
  it('Change snake direction top left', () => {
    const prevMoveDirection = 'top';
    const keyPressed = { a: true };
    expect(getNextMoveDirection(prevMoveDirection, keyPressed)).to.equal(
      'left'
    );
  });

  it('Change snake direction to right', () => {
    const prevMoveDirection = 'top';
    const keyPressed = { d: true };
    expect(getNextMoveDirection(prevMoveDirection, keyPressed)).to.equal(
      'right'
    );
  });

  it('Not change snake direction, if already top', () => {
    const prevMoveDirection = 'top';
    const keyPressed = { w: true };
    expect(getNextMoveDirection(prevMoveDirection, keyPressed)).to.equal('top');
  });

  it('Not change snake direction to bottom from top', () => {
    const prevMoveDirection = 'top';
    const keyPressed = { s: true };
    expect(getNextMoveDirection(prevMoveDirection, keyPressed)).to.equal('top');
  });
});
