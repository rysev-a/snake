type moveDirectionType = 'top' | 'bottom' | 'right' | 'left';

export interface GameState {
  snakePosition: {
    x: number;
    y: number;
  };

  snakeTail: any[];
  moveDirection: moveDirectionType;
}

export interface GameConfig {
  areaSize: number;
  snakeLength: number;
  scale: number;
  speed: number;
}

interface SnakeBlock {
  x: number;
  y: number;
  moveDirection: moveDirectionType;
}

class Engine {
  gameState: GameState;
  gameConfig: GameConfig;
  canvas: any;
  context: any;
  next: any;
  prevTime: any;
  keyPressed: {
    a: boolean;
    s: boolean;
    d: boolean;
    w: boolean;
  };
  constructor(gameConfig: GameConfig, gameState: GameState, canvas) {
    this.gameConfig = gameConfig;
    this.gameState = gameState;
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    this.keyPressed = {
      a: false,
      s: false,
      d: false,
      w: false,
    };
  }

  run(next) {
    this.next = next;
    window.requestAnimationFrame(currentTime => {
      this.step(currentTime);
    });
    this.initKeyController();
  }

  step(currentTime) {
    if (!this.prevTime) {
      this.prevTime = currentTime;
    }

    const timeDelta = currentTime - this.prevTime;

    if (timeDelta > this.gameConfig.speed) {
      this.gameState = this.next(
        this.gameState,
        this.gameConfig,
        this.keyPressed
      );
      this.renderCanvas();
      this.prevTime = currentTime;
    }

    window.requestAnimationFrame(currentTime => {
      this.step(currentTime);
    });
  }

  renderCanvas() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.renderSnakeHead();
    this.renderSnakeTail();
  }

  renderSnakeHead() {
    this.context.beginPath();
    this.context.rect(
      this.gameState.snakePosition.x * this.gameConfig.scale,
      (this.gameConfig.areaSize - this.gameState.snakePosition.y - 1) *
        this.gameConfig.scale,
      this.gameConfig.scale,
      this.gameConfig.scale
    );
    this.context.stroke();
  }

  renderSnakeTail() {
    const { scale, areaSize: size } = this.gameConfig;

    this.gameState.snakeTail.map((block: SnakeBlock) => {
      this.context.beginPath();

      this.context.rect(
        block.x * scale,
        (size - block.y - 1) * scale,
        scale,
        scale
      );
      this.context.stroke();
    });
  }

  initKeyController() {
    const allowKeys = ['a', 's', 'd', 'w'];

    window.onkeydown = e => {
      if (allowKeys.indexOf(e.key) !== -1) {
        this.keyPressed[e.key] = true;
      }
    };

    window.onkeyup = e => {
      if (allowKeys.indexOf(e.key) !== -1) {
        this.keyPressed[e.key] = false;
      }
    };
  }
}

export default Engine;
