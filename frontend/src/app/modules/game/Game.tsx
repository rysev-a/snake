import { Component } from 'inferno';
import Engine from './Engine';
import { gameConfig, gameInitialState } from './config';
import next from './next';
import './game.css';

class Game extends Component {
  canvas: any;
  engine: any;
  constructor(props) {
    super(props);
    this.canvas = null;
  }

  componentDidMount() {
    this.startGame();
  }

  startGame = () => {
    this.engine = new Engine(gameConfig, gameInitialState, this.canvas);
    this.engine.run(next);
  };

  render() {
    return (
      <div className="game-container">
        <div className="game-canvas-container">
          <canvas
            width={gameConfig.areaSize * gameConfig.scale}
            height={gameConfig.areaSize * gameConfig.scale}
            className="game-plot"
            id="game-canvas"
            ref={ref => (this.canvas = ref)}
          />
        </div>
      </div>
    );
  }
}

export default Game;
