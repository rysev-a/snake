(function($fsx){
// default/app/App.jsx
$fsx.f[0] =
function(module,exports){
Object.defineProperty(exports, '__esModule', { value: true });
const Inferno = $fsx.r(29);
var createComponentVNode = Inferno.createComponentVNode;
var createVNode = Inferno.createVNode;
$fsx.r(17);
$fsx.r(34);
$fsx.r(16);
const inferno_router_1 = $fsx.r(26);
const inferno = $fsx.r(29);
const inferno_mobx_1 = $fsx.r(23);
const history_1 = $fsx.r(1);
const store_1 = $fsx.r(2);
const Header_1 = $fsx.r(3);
const Home_1 = $fsx.r(4);
const Game_1 = $fsx.r(5);
inferno.render(createComponentVNode(2, inferno_mobx_1.Provider, {
    'store': store_1.default,
    'children': createComponentVNode(2, inferno_router_1.Router, {
        'history': history_1.default,
        'children': createVNode(1, 'main', null, [
            createComponentVNode(2, Header_1.default),
            createComponentVNode(2, inferno_router_1.Route, {
                'path': '/',
                'exact': true,
                'component': Home_1.default
            }),
            createComponentVNode(2, inferno_router_1.Route, {
                'path': '/game',
                'component': Game_1.default
            })
        ], 4)
    })
}), document.getElementById('app'));
}
// default/app/core/history.js
$fsx.f[1] =
function(module,exports){
Object.defineProperty(exports, '__esModule', { value: true });
const Inferno = $fsx.r(29);
const history_1 = $fsx.r(19);
const history = history_1.createBrowserHistory();
exports.default = history;
}
// default/app/core/store.js
$fsx.f[2] =
function(module,exports){
Object.defineProperty(exports, '__esModule', { value: true });
const Inferno = $fsx.r(29);
class ApplicationStore {
    constructor() {
    }
}
const store = new ApplicationStore();
exports.default = store;
}
// default/app/components/Header.jsx
$fsx.f[3] =
function(module,exports){
Object.defineProperty(exports, '__esModule', { value: true });
const Inferno = $fsx.r(29);
var createComponentVNode = Inferno.createComponentVNode;
var createVNode = Inferno.createVNode;
const inferno_router_1 = $fsx.r(26);
const Header = () => createVNode(1, 'div', 'container', createVNode(1, 'nav', 'navbar-menu', [
    createComponentVNode(2, inferno_router_1.Link, {
        'to': '/',
        'className': 'navbar-item',
        'children': 'Home'
    }),
    createComponentVNode(2, inferno_router_1.Link, {
        'to': '/game',
        'className': 'navbar-item',
        'children': 'Game'
    })
], 4), 2);
exports.default = Header;
}
// default/app/pages/Home.jsx
$fsx.f[4] =
function(module,exports){
Object.defineProperty(exports, '__esModule', { value: true });
const Inferno = $fsx.r(29);
var createVNode = Inferno.createVNode;
const HomePage = () => createVNode(1, 'div', 'container', createVNode(1, 'h1', 'title', 'Home page', 16), 2);
exports.default = HomePage;
}
// default/app/pages/Game.jsx
$fsx.f[5] =
function(module,exports){
Object.defineProperty(exports, '__esModule', { value: true });
const Inferno = $fsx.r(29);
var createComponentVNode = Inferno.createComponentVNode;
var createVNode = Inferno.createVNode;
const Game_1 = $fsx.r(6);
const GamePage = () => createVNode(1, 'div', 'container', [
    createVNode(1, 'h1', 'title', 'Game', 16),
    createComponentVNode(2, Game_1.default)
], 4);
exports.default = GamePage;
}
// default/app/modules/game/Game.jsx
$fsx.f[6] =
function(module,exports){
Object.defineProperty(exports, '__esModule', { value: true });
const Inferno = $fsx.r(29);
var createVNode = Inferno.createVNode;
const inferno_1 = $fsx.r(29);
const Engine_1 = $fsx.r(7);
const config_1 = $fsx.r(8);
const next_1 = $fsx.r(9);
$fsx.r(14);
class Game extends inferno_1.Component {
    constructor(props) {
        super(props);
        this.startGame = () => {
            this.engine = new Engine_1.default(config_1.gameConfig, config_1.gameInitialState, this.canvas);
            this.engine.run(next_1.default);
        };
        this.canvas = null;
    }
    componentDidMount() {
        this.startGame();
    }
    render() {
        return createVNode(1, 'div', 'game-container', createVNode(1, 'div', 'game-canvas-container', createVNode(1, 'canvas', 'game-plot', null, 1, {
            'width': config_1.gameConfig.areaSize * config_1.gameConfig.scale,
            'height': config_1.gameConfig.areaSize * config_1.gameConfig.scale,
            'id': 'game-canvas'
        }, null, ref => this.canvas = ref), 2), 2);
    }
}
exports.default = Game;
}
// default/app/modules/game/Engine.js
$fsx.f[7] =
function(module,exports){
Object.defineProperty(exports, '__esModule', { value: true });
const Inferno = $fsx.r(29);
class Engine {
    constructor(gameConfig, gameState, canvas) {
        this.gameConfig = gameConfig;
        this.gameState = gameState;
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
        this.keyPressed = {
            a: false,
            s: false,
            d: false,
            w: false
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
            this.gameState = this.next(this.gameState, this.gameConfig, this.keyPressed);
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
        this.renderApples();
    }
    renderApples() {
        this.gameState.apples.map(apple => {
            this.context.beginPath();
            this.context.rect(apple.x * this.gameConfig.scale, (this.gameConfig.areaSize - apple.y - 1) * this.gameConfig.scale, this.gameConfig.scale, this.gameConfig.scale);
            this.context.stroke();
        });
    }
    renderSnakeHead() {
        this.context.beginPath();
        this.context.rect(this.gameState.snakePosition.x * this.gameConfig.scale, (this.gameConfig.areaSize - this.gameState.snakePosition.y - 1) * this.gameConfig.scale, this.gameConfig.scale, this.gameConfig.scale);
        this.context.stroke();
    }
    renderSnakeTail() {
        const {
            scale,
            areaSize: size
        } = this.gameConfig;
        this.gameState.snakeTail.map(block => {
            this.context.beginPath();
            this.context.rect(block.x * scale, (size - block.y - 1) * scale, scale, scale);
            this.context.stroke();
        });
    }
    initKeyController() {
        const allowKeys = [
            'a',
            's',
            'd',
            'w'
        ];
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
exports.default = Engine;
}
// default/app/modules/game/config.js
$fsx.f[8] =
function(module,exports){
Object.defineProperty(exports, '__esModule', { value: true });
const Inferno = $fsx.r(29);
exports.gameConfig = {
    areaSize: 10,
    scale: 20,
    speed: 100
};
exports.gameInitialState = {
    snakePosition: {
        x: 2,
        y: 9
    },
    moveDirection: 'left',
    snakeTail: [
        {
            x: 3,
            y: 9,
            moveDirection: 'left'
        },
        {
            x: 4,
            y: 9,
            moveDirection: 'left'
        },
        {
            x: 5,
            y: 9,
            moveDirection: 'left'
        },
        {
            x: 6,
            y: 9,
            moveDirection: 'left'
        }
    ],
    apples: [{
            x: 0,
            y: 0
        }]
};
}
// default/app/modules/game/next/index.js
$fsx.f[9] =
function(module,exports){
Object.defineProperty(exports, '__esModule', { value: true });
const Inferno = $fsx.r(29);
const direction_1 = $fsx.r(10);
const move_block_1 = $fsx.r(11);
const tail_1 = $fsx.r(12);
const apple_1 = $fsx.r(13);
const config_1 = $fsx.r(8);
const next = (state, config, keyPressed) => {
    const prevMoveDirection = state.moveDirection;
    const nextMoveDirection = direction_1.default(prevMoveDirection, keyPressed);
    const snakePosition = move_block_1.default({
        position: state.snakePosition,
        moveDirection: state.moveDirection,
        size: config.areaSize
    });
    const movedSnakeTail = tail_1.default(state, config, prevMoveDirection);
    const {apples, snakeTail} = apple_1.default({
        ...state,
        snakeTail: movedSnakeTail
    }, config_1.gameConfig);
    return {
        ...state,
        moveDirection: nextMoveDirection,
        snakePosition,
        snakeTail,
        apples
    };
};
exports.default = next;
}
// default/app/modules/game/next/snake/direction.js
$fsx.f[10] =
function(module,exports){
Object.defineProperty(exports, '__esModule', { value: true });
const Inferno = $fsx.r(29);
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
exports.default = getNextMoveDirection;
}
// default/app/modules/game/next/snake/move-block.js
$fsx.f[11] =
function(module,exports){
Object.defineProperty(exports, '__esModule', { value: true });
const Inferno = $fsx.r(29);
const moveSnakeBlock = ({position, moveDirection, size}) => {
    if (moveDirection === 'right') {
        const x = position.x + 1;
        return {
            ...position,
            x: x > size - 1 ? 0 : x
        };
    }
    if (moveDirection === 'left') {
        const x = position.x - 1;
        return {
            ...position,
            x: x < 0 ? size - 1 : x
        };
    }
    if (moveDirection === 'top') {
        const y = position.y + 1;
        return {
            x: position.x,
            y: y > size - 1 ? 0 : y
        };
    }
    if (moveDirection === 'bottom') {
        const y = position.y - 1;
        return {
            ...position,
            y: y < 0 ? size - 1 : y
        };
    }
};
exports.default = moveSnakeBlock;
}
// default/app/modules/game/next/snake/tail.js
$fsx.f[12] =
function(module,exports){
Object.defineProperty(exports, '__esModule', { value: true });
const Inferno = $fsx.r(29);
const move_block_1 = $fsx.r(11);
const getSnakeTail = (state, config, prevMoveDirection) => {
    const snakeTailData = state.snakeTail.reduce((acc, snakeBlock) => {
        const position = move_block_1.default({
            position: {
                x: snakeBlock.x,
                y: snakeBlock.y
            },
            moveDirection: snakeBlock.moveDirection,
            size: config.areaSize
        });
        const nextSnakeBlock = {
            ...snakeBlock,
            ...position,
            moveDirection: acc.prevMoveDirection
        };
        return {
            newStakeTail: [
                ...acc.newStakeTail,
                nextSnakeBlock
            ],
            prevMoveDirection: snakeBlock.moveDirection
        };
    }, {
        newStakeTail: [],
        prevMoveDirection
    });
    return snakeTailData.newStakeTail;
};
exports.default = getSnakeTail;
}
// default/app/modules/game/next/apple.js
$fsx.f[13] =
function(module,exports){
Object.defineProperty(exports, '__esModule', { value: true });
const Inferno = $fsx.r(29);
const move_block_1 = $fsx.r(11);
const newApplePosition = gameConfig => {
    return {
        x: Math.floor(Math.random() * gameConfig.areaSize),
        y: Math.floor(Math.random() * gameConfig.areaSize)
    };
};
const checkIsAppleUnderSnake = (apple, gameState) => {
    return [
        ...gameState.snakeTail,
        gameState.snakePosition
    ].some(block => {
        return block.x === apple.x && block.y === apple.y;
    });
};
const generateNewApple = (gameState, gameConfig) => {
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
            y: lastTailBlock.y
        },
        right: {
            x: lastTailBlock.x - 1,
            y: lastTailBlock.y
        },
        top: {
            x: lastTailBlock.x,
            y: lastTailBlock.y - 1
        },
        bottom: {
            x: lastTailBlock.x,
            y: lastTailBlock.y + 1
        }
    }[lastTailBlock.moveDirection];
};
const eatApples = (gameState, gameConfig) => {
    const eatingApple = gameState.apples.find(apple => {
        return apple.x === gameState.snakePosition.x && apple.y === gameState.snakePosition.y;
    });
    if (eatingApple) {
        let apples = gameState.apples.filter(apple => {
            return !(apple.x === gameState.snakePosition.x && apple.y === gameState.snakePosition.y);
        });
        const lastSnakeTailBlock = gameState.snakeTail[gameState.snakeTail.length - 1];
        const snakeNewBlockTail = move_block_1.default({
            position: {
                x: lastTailBlocPositionkWillBe(lastSnakeTailBlock).x,
                y: lastTailBlocPositionkWillBe(lastSnakeTailBlock).y
            },
            moveDirection: lastSnakeTailBlock.moveDirection,
            size: gameConfig.areaSize
        });
        const snakeTail = [
            ...gameState.snakeTail,
            snakeNewBlockTail
        ];
        apples = [
            ...apples,
            generateNewApple(gameState, gameConfig)
        ];
        return {
            apples,
            snakeTail
        };
    }
    return gameState;
};
exports.default = eatApples;
}
// default/app/modules/game/game.css
$fsx.f[14] =
function(){
$fsx.r(18)('default/app/modules/game/game.css', '.game-plot {\n  border: 1px solid black;\n}\n');
}
// default/app/core/hmr.js
$fsx.f[15] =
function(){
const Inferno = $fsx.r(29);
const customizedHMRPlugin = {
    hmrUpdate: ({type, path, content, dependants}) => {
        if (type === 'js') {
            FuseBox.flush(file => {
                if (/core/.test(file) || /history/.test(file)) {
                    return false;
                }
                return true;
            });
            FuseBox.dynamic(path, content);
            $fsx.r(FuseBox.mainFile);
            return true;
        }
    }
};
let alreadyRegistered = false;
if (!window.hmrRegistered) {
    window.hmrRegistered = true;
    FuseBox.addPlugin(customizedHMRPlugin);
}
}
// @fortawesome/fontawesome-free/css/all.css
$fsx.f[16] =
function(){
$fsx.r(18)('@fortawesome/fontawesome-free/css/all.css', '/*!\n * Font Awesome Free 5.9.0 by @fontawesome - https://fontawesome.com\n * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)\n */\n.fa,\n.fas,\n.far,\n.fal,\n.fab {\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  display: inline-block;\n  font-style: normal;\n  font-variant: normal;\n  text-rendering: auto;\n  line-height: 1; }\n\n.fa-lg {\n  font-size: 1.33333em;\n  line-height: 0.75em;\n  vertical-align: -.0667em; }\n\n.fa-xs {\n  font-size: .75em; }\n\n.fa-sm {\n  font-size: .875em; }\n\n.fa-1x {\n  font-size: 1em; }\n\n.fa-2x {\n  font-size: 2em; }\n\n.fa-3x {\n  font-size: 3em; }\n\n.fa-4x {\n  font-size: 4em; }\n\n.fa-5x {\n  font-size: 5em; }\n\n.fa-6x {\n  font-size: 6em; }\n\n.fa-7x {\n  font-size: 7em; }\n\n.fa-8x {\n  font-size: 8em; }\n\n.fa-9x {\n  font-size: 9em; }\n\n.fa-10x {\n  font-size: 10em; }\n\n.fa-fw {\n  text-align: center;\n  width: 1.25em; }\n\n.fa-ul {\n  list-style-type: none;\n  margin-left: 2.5em;\n  padding-left: 0; }\n  .fa-ul > li {\n    position: relative; }\n\n.fa-li {\n  left: -2em;\n  position: absolute;\n  text-align: center;\n  width: 2em;\n  line-height: inherit; }\n\n.fa-border {\n  border: solid 0.08em #eee;\n  border-radius: .1em;\n  padding: .2em .25em .15em; }\n\n.fa-pull-left {\n  float: left; }\n\n.fa-pull-right {\n  float: right; }\n\n.fa.fa-pull-left,\n.fas.fa-pull-left,\n.far.fa-pull-left,\n.fal.fa-pull-left,\n.fab.fa-pull-left {\n  margin-right: .3em; }\n\n.fa.fa-pull-right,\n.fas.fa-pull-right,\n.far.fa-pull-right,\n.fal.fa-pull-right,\n.fab.fa-pull-right {\n  margin-left: .3em; }\n\n.fa-spin {\n  -webkit-animation: fa-spin 2s infinite linear;\n          animation: fa-spin 2s infinite linear; }\n\n.fa-pulse {\n  -webkit-animation: fa-spin 1s infinite steps(8);\n          animation: fa-spin 1s infinite steps(8); }\n\n@-webkit-keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg); }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg); } }\n\n@keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg); }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg); } }\n\n.fa-rotate-90 {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=1)";\n  -webkit-transform: rotate(90deg);\n          transform: rotate(90deg); }\n\n.fa-rotate-180 {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=2)";\n  -webkit-transform: rotate(180deg);\n          transform: rotate(180deg); }\n\n.fa-rotate-270 {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=3)";\n  -webkit-transform: rotate(270deg);\n          transform: rotate(270deg); }\n\n.fa-flip-horizontal {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=0, mirror=1)";\n  -webkit-transform: scale(-1, 1);\n          transform: scale(-1, 1); }\n\n.fa-flip-vertical {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1)";\n  -webkit-transform: scale(1, -1);\n          transform: scale(1, -1); }\n\n.fa-flip-both, .fa-flip-horizontal.fa-flip-vertical {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1)";\n  -webkit-transform: scale(-1, -1);\n          transform: scale(-1, -1); }\n\n:root .fa-rotate-90,\n:root .fa-rotate-180,\n:root .fa-rotate-270,\n:root .fa-flip-horizontal,\n:root .fa-flip-vertical,\n:root .fa-flip-both {\n  -webkit-filter: none;\n          filter: none; }\n\n.fa-stack {\n  display: inline-block;\n  height: 2em;\n  line-height: 2em;\n  position: relative;\n  vertical-align: middle;\n  width: 2.5em; }\n\n.fa-stack-1x,\n.fa-stack-2x {\n  left: 0;\n  position: absolute;\n  text-align: center;\n  width: 100%; }\n\n.fa-stack-1x {\n  line-height: inherit; }\n\n.fa-stack-2x {\n  font-size: 2em; }\n\n.fa-inverse {\n  color: #fff; }\n\n/* Font Awesome uses the Unicode Private Use Area (PUA) to ensure screen\nreaders do not read off random characters that represent icons */\n.fa-500px:before {\n  content: "\\f26e"; }\n\n.fa-accessible-icon:before {\n  content: "\\f368"; }\n\n.fa-accusoft:before {\n  content: "\\f369"; }\n\n.fa-acquisitions-incorporated:before {\n  content: "\\f6af"; }\n\n.fa-ad:before {\n  content: "\\f641"; }\n\n.fa-address-book:before {\n  content: "\\f2b9"; }\n\n.fa-address-card:before {\n  content: "\\f2bb"; }\n\n.fa-adjust:before {\n  content: "\\f042"; }\n\n.fa-adn:before {\n  content: "\\f170"; }\n\n.fa-adobe:before {\n  content: "\\f778"; }\n\n.fa-adversal:before {\n  content: "\\f36a"; }\n\n.fa-affiliatetheme:before {\n  content: "\\f36b"; }\n\n.fa-air-freshener:before {\n  content: "\\f5d0"; }\n\n.fa-airbnb:before {\n  content: "\\f834"; }\n\n.fa-algolia:before {\n  content: "\\f36c"; }\n\n.fa-align-center:before {\n  content: "\\f037"; }\n\n.fa-align-justify:before {\n  content: "\\f039"; }\n\n.fa-align-left:before {\n  content: "\\f036"; }\n\n.fa-align-right:before {\n  content: "\\f038"; }\n\n.fa-alipay:before {\n  content: "\\f642"; }\n\n.fa-allergies:before {\n  content: "\\f461"; }\n\n.fa-amazon:before {\n  content: "\\f270"; }\n\n.fa-amazon-pay:before {\n  content: "\\f42c"; }\n\n.fa-ambulance:before {\n  content: "\\f0f9"; }\n\n.fa-american-sign-language-interpreting:before {\n  content: "\\f2a3"; }\n\n.fa-amilia:before {\n  content: "\\f36d"; }\n\n.fa-anchor:before {\n  content: "\\f13d"; }\n\n.fa-android:before {\n  content: "\\f17b"; }\n\n.fa-angellist:before {\n  content: "\\f209"; }\n\n.fa-angle-double-down:before {\n  content: "\\f103"; }\n\n.fa-angle-double-left:before {\n  content: "\\f100"; }\n\n.fa-angle-double-right:before {\n  content: "\\f101"; }\n\n.fa-angle-double-up:before {\n  content: "\\f102"; }\n\n.fa-angle-down:before {\n  content: "\\f107"; }\n\n.fa-angle-left:before {\n  content: "\\f104"; }\n\n.fa-angle-right:before {\n  content: "\\f105"; }\n\n.fa-angle-up:before {\n  content: "\\f106"; }\n\n.fa-angry:before {\n  content: "\\f556"; }\n\n.fa-angrycreative:before {\n  content: "\\f36e"; }\n\n.fa-angular:before {\n  content: "\\f420"; }\n\n.fa-ankh:before {\n  content: "\\f644"; }\n\n.fa-app-store:before {\n  content: "\\f36f"; }\n\n.fa-app-store-ios:before {\n  content: "\\f370"; }\n\n.fa-apper:before {\n  content: "\\f371"; }\n\n.fa-apple:before {\n  content: "\\f179"; }\n\n.fa-apple-alt:before {\n  content: "\\f5d1"; }\n\n.fa-apple-pay:before {\n  content: "\\f415"; }\n\n.fa-archive:before {\n  content: "\\f187"; }\n\n.fa-archway:before {\n  content: "\\f557"; }\n\n.fa-arrow-alt-circle-down:before {\n  content: "\\f358"; }\n\n.fa-arrow-alt-circle-left:before {\n  content: "\\f359"; }\n\n.fa-arrow-alt-circle-right:before {\n  content: "\\f35a"; }\n\n.fa-arrow-alt-circle-up:before {\n  content: "\\f35b"; }\n\n.fa-arrow-circle-down:before {\n  content: "\\f0ab"; }\n\n.fa-arrow-circle-left:before {\n  content: "\\f0a8"; }\n\n.fa-arrow-circle-right:before {\n  content: "\\f0a9"; }\n\n.fa-arrow-circle-up:before {\n  content: "\\f0aa"; }\n\n.fa-arrow-down:before {\n  content: "\\f063"; }\n\n.fa-arrow-left:before {\n  content: "\\f060"; }\n\n.fa-arrow-right:before {\n  content: "\\f061"; }\n\n.fa-arrow-up:before {\n  content: "\\f062"; }\n\n.fa-arrows-alt:before {\n  content: "\\f0b2"; }\n\n.fa-arrows-alt-h:before {\n  content: "\\f337"; }\n\n.fa-arrows-alt-v:before {\n  content: "\\f338"; }\n\n.fa-artstation:before {\n  content: "\\f77a"; }\n\n.fa-assistive-listening-systems:before {\n  content: "\\f2a2"; }\n\n.fa-asterisk:before {\n  content: "\\f069"; }\n\n.fa-asymmetrik:before {\n  content: "\\f372"; }\n\n.fa-at:before {\n  content: "\\f1fa"; }\n\n.fa-atlas:before {\n  content: "\\f558"; }\n\n.fa-atlassian:before {\n  content: "\\f77b"; }\n\n.fa-atom:before {\n  content: "\\f5d2"; }\n\n.fa-audible:before {\n  content: "\\f373"; }\n\n.fa-audio-description:before {\n  content: "\\f29e"; }\n\n.fa-autoprefixer:before {\n  content: "\\f41c"; }\n\n.fa-avianex:before {\n  content: "\\f374"; }\n\n.fa-aviato:before {\n  content: "\\f421"; }\n\n.fa-award:before {\n  content: "\\f559"; }\n\n.fa-aws:before {\n  content: "\\f375"; }\n\n.fa-baby:before {\n  content: "\\f77c"; }\n\n.fa-baby-carriage:before {\n  content: "\\f77d"; }\n\n.fa-backspace:before {\n  content: "\\f55a"; }\n\n.fa-backward:before {\n  content: "\\f04a"; }\n\n.fa-bacon:before {\n  content: "\\f7e5"; }\n\n.fa-balance-scale:before {\n  content: "\\f24e"; }\n\n.fa-balance-scale-left:before {\n  content: "\\f515"; }\n\n.fa-balance-scale-right:before {\n  content: "\\f516"; }\n\n.fa-ban:before {\n  content: "\\f05e"; }\n\n.fa-band-aid:before {\n  content: "\\f462"; }\n\n.fa-bandcamp:before {\n  content: "\\f2d5"; }\n\n.fa-barcode:before {\n  content: "\\f02a"; }\n\n.fa-bars:before {\n  content: "\\f0c9"; }\n\n.fa-baseball-ball:before {\n  content: "\\f433"; }\n\n.fa-basketball-ball:before {\n  content: "\\f434"; }\n\n.fa-bath:before {\n  content: "\\f2cd"; }\n\n.fa-battery-empty:before {\n  content: "\\f244"; }\n\n.fa-battery-full:before {\n  content: "\\f240"; }\n\n.fa-battery-half:before {\n  content: "\\f242"; }\n\n.fa-battery-quarter:before {\n  content: "\\f243"; }\n\n.fa-battery-three-quarters:before {\n  content: "\\f241"; }\n\n.fa-battle-net:before {\n  content: "\\f835"; }\n\n.fa-bed:before {\n  content: "\\f236"; }\n\n.fa-beer:before {\n  content: "\\f0fc"; }\n\n.fa-behance:before {\n  content: "\\f1b4"; }\n\n.fa-behance-square:before {\n  content: "\\f1b5"; }\n\n.fa-bell:before {\n  content: "\\f0f3"; }\n\n.fa-bell-slash:before {\n  content: "\\f1f6"; }\n\n.fa-bezier-curve:before {\n  content: "\\f55b"; }\n\n.fa-bible:before {\n  content: "\\f647"; }\n\n.fa-bicycle:before {\n  content: "\\f206"; }\n\n.fa-biking:before {\n  content: "\\f84a"; }\n\n.fa-bimobject:before {\n  content: "\\f378"; }\n\n.fa-binoculars:before {\n  content: "\\f1e5"; }\n\n.fa-biohazard:before {\n  content: "\\f780"; }\n\n.fa-birthday-cake:before {\n  content: "\\f1fd"; }\n\n.fa-bitbucket:before {\n  content: "\\f171"; }\n\n.fa-bitcoin:before {\n  content: "\\f379"; }\n\n.fa-bity:before {\n  content: "\\f37a"; }\n\n.fa-black-tie:before {\n  content: "\\f27e"; }\n\n.fa-blackberry:before {\n  content: "\\f37b"; }\n\n.fa-blender:before {\n  content: "\\f517"; }\n\n.fa-blender-phone:before {\n  content: "\\f6b6"; }\n\n.fa-blind:before {\n  content: "\\f29d"; }\n\n.fa-blog:before {\n  content: "\\f781"; }\n\n.fa-blogger:before {\n  content: "\\f37c"; }\n\n.fa-blogger-b:before {\n  content: "\\f37d"; }\n\n.fa-bluetooth:before {\n  content: "\\f293"; }\n\n.fa-bluetooth-b:before {\n  content: "\\f294"; }\n\n.fa-bold:before {\n  content: "\\f032"; }\n\n.fa-bolt:before {\n  content: "\\f0e7"; }\n\n.fa-bomb:before {\n  content: "\\f1e2"; }\n\n.fa-bone:before {\n  content: "\\f5d7"; }\n\n.fa-bong:before {\n  content: "\\f55c"; }\n\n.fa-book:before {\n  content: "\\f02d"; }\n\n.fa-book-dead:before {\n  content: "\\f6b7"; }\n\n.fa-book-medical:before {\n  content: "\\f7e6"; }\n\n.fa-book-open:before {\n  content: "\\f518"; }\n\n.fa-book-reader:before {\n  content: "\\f5da"; }\n\n.fa-bookmark:before {\n  content: "\\f02e"; }\n\n.fa-bootstrap:before {\n  content: "\\f836"; }\n\n.fa-border-all:before {\n  content: "\\f84c"; }\n\n.fa-border-none:before {\n  content: "\\f850"; }\n\n.fa-border-style:before {\n  content: "\\f853"; }\n\n.fa-bowling-ball:before {\n  content: "\\f436"; }\n\n.fa-box:before {\n  content: "\\f466"; }\n\n.fa-box-open:before {\n  content: "\\f49e"; }\n\n.fa-boxes:before {\n  content: "\\f468"; }\n\n.fa-braille:before {\n  content: "\\f2a1"; }\n\n.fa-brain:before {\n  content: "\\f5dc"; }\n\n.fa-bread-slice:before {\n  content: "\\f7ec"; }\n\n.fa-briefcase:before {\n  content: "\\f0b1"; }\n\n.fa-briefcase-medical:before {\n  content: "\\f469"; }\n\n.fa-broadcast-tower:before {\n  content: "\\f519"; }\n\n.fa-broom:before {\n  content: "\\f51a"; }\n\n.fa-brush:before {\n  content: "\\f55d"; }\n\n.fa-btc:before {\n  content: "\\f15a"; }\n\n.fa-buffer:before {\n  content: "\\f837"; }\n\n.fa-bug:before {\n  content: "\\f188"; }\n\n.fa-building:before {\n  content: "\\f1ad"; }\n\n.fa-bullhorn:before {\n  content: "\\f0a1"; }\n\n.fa-bullseye:before {\n  content: "\\f140"; }\n\n.fa-burn:before {\n  content: "\\f46a"; }\n\n.fa-buromobelexperte:before {\n  content: "\\f37f"; }\n\n.fa-bus:before {\n  content: "\\f207"; }\n\n.fa-bus-alt:before {\n  content: "\\f55e"; }\n\n.fa-business-time:before {\n  content: "\\f64a"; }\n\n.fa-buysellads:before {\n  content: "\\f20d"; }\n\n.fa-calculator:before {\n  content: "\\f1ec"; }\n\n.fa-calendar:before {\n  content: "\\f133"; }\n\n.fa-calendar-alt:before {\n  content: "\\f073"; }\n\n.fa-calendar-check:before {\n  content: "\\f274"; }\n\n.fa-calendar-day:before {\n  content: "\\f783"; }\n\n.fa-calendar-minus:before {\n  content: "\\f272"; }\n\n.fa-calendar-plus:before {\n  content: "\\f271"; }\n\n.fa-calendar-times:before {\n  content: "\\f273"; }\n\n.fa-calendar-week:before {\n  content: "\\f784"; }\n\n.fa-camera:before {\n  content: "\\f030"; }\n\n.fa-camera-retro:before {\n  content: "\\f083"; }\n\n.fa-campground:before {\n  content: "\\f6bb"; }\n\n.fa-canadian-maple-leaf:before {\n  content: "\\f785"; }\n\n.fa-candy-cane:before {\n  content: "\\f786"; }\n\n.fa-cannabis:before {\n  content: "\\f55f"; }\n\n.fa-capsules:before {\n  content: "\\f46b"; }\n\n.fa-car:before {\n  content: "\\f1b9"; }\n\n.fa-car-alt:before {\n  content: "\\f5de"; }\n\n.fa-car-battery:before {\n  content: "\\f5df"; }\n\n.fa-car-crash:before {\n  content: "\\f5e1"; }\n\n.fa-car-side:before {\n  content: "\\f5e4"; }\n\n.fa-caret-down:before {\n  content: "\\f0d7"; }\n\n.fa-caret-left:before {\n  content: "\\f0d9"; }\n\n.fa-caret-right:before {\n  content: "\\f0da"; }\n\n.fa-caret-square-down:before {\n  content: "\\f150"; }\n\n.fa-caret-square-left:before {\n  content: "\\f191"; }\n\n.fa-caret-square-right:before {\n  content: "\\f152"; }\n\n.fa-caret-square-up:before {\n  content: "\\f151"; }\n\n.fa-caret-up:before {\n  content: "\\f0d8"; }\n\n.fa-carrot:before {\n  content: "\\f787"; }\n\n.fa-cart-arrow-down:before {\n  content: "\\f218"; }\n\n.fa-cart-plus:before {\n  content: "\\f217"; }\n\n.fa-cash-register:before {\n  content: "\\f788"; }\n\n.fa-cat:before {\n  content: "\\f6be"; }\n\n.fa-cc-amazon-pay:before {\n  content: "\\f42d"; }\n\n.fa-cc-amex:before {\n  content: "\\f1f3"; }\n\n.fa-cc-apple-pay:before {\n  content: "\\f416"; }\n\n.fa-cc-diners-club:before {\n  content: "\\f24c"; }\n\n.fa-cc-discover:before {\n  content: "\\f1f2"; }\n\n.fa-cc-jcb:before {\n  content: "\\f24b"; }\n\n.fa-cc-mastercard:before {\n  content: "\\f1f1"; }\n\n.fa-cc-paypal:before {\n  content: "\\f1f4"; }\n\n.fa-cc-stripe:before {\n  content: "\\f1f5"; }\n\n.fa-cc-visa:before {\n  content: "\\f1f0"; }\n\n.fa-centercode:before {\n  content: "\\f380"; }\n\n.fa-centos:before {\n  content: "\\f789"; }\n\n.fa-certificate:before {\n  content: "\\f0a3"; }\n\n.fa-chair:before {\n  content: "\\f6c0"; }\n\n.fa-chalkboard:before {\n  content: "\\f51b"; }\n\n.fa-chalkboard-teacher:before {\n  content: "\\f51c"; }\n\n.fa-charging-station:before {\n  content: "\\f5e7"; }\n\n.fa-chart-area:before {\n  content: "\\f1fe"; }\n\n.fa-chart-bar:before {\n  content: "\\f080"; }\n\n.fa-chart-line:before {\n  content: "\\f201"; }\n\n.fa-chart-pie:before {\n  content: "\\f200"; }\n\n.fa-check:before {\n  content: "\\f00c"; }\n\n.fa-check-circle:before {\n  content: "\\f058"; }\n\n.fa-check-double:before {\n  content: "\\f560"; }\n\n.fa-check-square:before {\n  content: "\\f14a"; }\n\n.fa-cheese:before {\n  content: "\\f7ef"; }\n\n.fa-chess:before {\n  content: "\\f439"; }\n\n.fa-chess-bishop:before {\n  content: "\\f43a"; }\n\n.fa-chess-board:before {\n  content: "\\f43c"; }\n\n.fa-chess-king:before {\n  content: "\\f43f"; }\n\n.fa-chess-knight:before {\n  content: "\\f441"; }\n\n.fa-chess-pawn:before {\n  content: "\\f443"; }\n\n.fa-chess-queen:before {\n  content: "\\f445"; }\n\n.fa-chess-rook:before {\n  content: "\\f447"; }\n\n.fa-chevron-circle-down:before {\n  content: "\\f13a"; }\n\n.fa-chevron-circle-left:before {\n  content: "\\f137"; }\n\n.fa-chevron-circle-right:before {\n  content: "\\f138"; }\n\n.fa-chevron-circle-up:before {\n  content: "\\f139"; }\n\n.fa-chevron-down:before {\n  content: "\\f078"; }\n\n.fa-chevron-left:before {\n  content: "\\f053"; }\n\n.fa-chevron-right:before {\n  content: "\\f054"; }\n\n.fa-chevron-up:before {\n  content: "\\f077"; }\n\n.fa-child:before {\n  content: "\\f1ae"; }\n\n.fa-chrome:before {\n  content: "\\f268"; }\n\n.fa-chromecast:before {\n  content: "\\f838"; }\n\n.fa-church:before {\n  content: "\\f51d"; }\n\n.fa-circle:before {\n  content: "\\f111"; }\n\n.fa-circle-notch:before {\n  content: "\\f1ce"; }\n\n.fa-city:before {\n  content: "\\f64f"; }\n\n.fa-clinic-medical:before {\n  content: "\\f7f2"; }\n\n.fa-clipboard:before {\n  content: "\\f328"; }\n\n.fa-clipboard-check:before {\n  content: "\\f46c"; }\n\n.fa-clipboard-list:before {\n  content: "\\f46d"; }\n\n.fa-clock:before {\n  content: "\\f017"; }\n\n.fa-clone:before {\n  content: "\\f24d"; }\n\n.fa-closed-captioning:before {\n  content: "\\f20a"; }\n\n.fa-cloud:before {\n  content: "\\f0c2"; }\n\n.fa-cloud-download-alt:before {\n  content: "\\f381"; }\n\n.fa-cloud-meatball:before {\n  content: "\\f73b"; }\n\n.fa-cloud-moon:before {\n  content: "\\f6c3"; }\n\n.fa-cloud-moon-rain:before {\n  content: "\\f73c"; }\n\n.fa-cloud-rain:before {\n  content: "\\f73d"; }\n\n.fa-cloud-showers-heavy:before {\n  content: "\\f740"; }\n\n.fa-cloud-sun:before {\n  content: "\\f6c4"; }\n\n.fa-cloud-sun-rain:before {\n  content: "\\f743"; }\n\n.fa-cloud-upload-alt:before {\n  content: "\\f382"; }\n\n.fa-cloudscale:before {\n  content: "\\f383"; }\n\n.fa-cloudsmith:before {\n  content: "\\f384"; }\n\n.fa-cloudversify:before {\n  content: "\\f385"; }\n\n.fa-cocktail:before {\n  content: "\\f561"; }\n\n.fa-code:before {\n  content: "\\f121"; }\n\n.fa-code-branch:before {\n  content: "\\f126"; }\n\n.fa-codepen:before {\n  content: "\\f1cb"; }\n\n.fa-codiepie:before {\n  content: "\\f284"; }\n\n.fa-coffee:before {\n  content: "\\f0f4"; }\n\n.fa-cog:before {\n  content: "\\f013"; }\n\n.fa-cogs:before {\n  content: "\\f085"; }\n\n.fa-coins:before {\n  content: "\\f51e"; }\n\n.fa-columns:before {\n  content: "\\f0db"; }\n\n.fa-comment:before {\n  content: "\\f075"; }\n\n.fa-comment-alt:before {\n  content: "\\f27a"; }\n\n.fa-comment-dollar:before {\n  content: "\\f651"; }\n\n.fa-comment-dots:before {\n  content: "\\f4ad"; }\n\n.fa-comment-medical:before {\n  content: "\\f7f5"; }\n\n.fa-comment-slash:before {\n  content: "\\f4b3"; }\n\n.fa-comments:before {\n  content: "\\f086"; }\n\n.fa-comments-dollar:before {\n  content: "\\f653"; }\n\n.fa-compact-disc:before {\n  content: "\\f51f"; }\n\n.fa-compass:before {\n  content: "\\f14e"; }\n\n.fa-compress:before {\n  content: "\\f066"; }\n\n.fa-compress-arrows-alt:before {\n  content: "\\f78c"; }\n\n.fa-concierge-bell:before {\n  content: "\\f562"; }\n\n.fa-confluence:before {\n  content: "\\f78d"; }\n\n.fa-connectdevelop:before {\n  content: "\\f20e"; }\n\n.fa-contao:before {\n  content: "\\f26d"; }\n\n.fa-cookie:before {\n  content: "\\f563"; }\n\n.fa-cookie-bite:before {\n  content: "\\f564"; }\n\n.fa-copy:before {\n  content: "\\f0c5"; }\n\n.fa-copyright:before {\n  content: "\\f1f9"; }\n\n.fa-couch:before {\n  content: "\\f4b8"; }\n\n.fa-cpanel:before {\n  content: "\\f388"; }\n\n.fa-creative-commons:before {\n  content: "\\f25e"; }\n\n.fa-creative-commons-by:before {\n  content: "\\f4e7"; }\n\n.fa-creative-commons-nc:before {\n  content: "\\f4e8"; }\n\n.fa-creative-commons-nc-eu:before {\n  content: "\\f4e9"; }\n\n.fa-creative-commons-nc-jp:before {\n  content: "\\f4ea"; }\n\n.fa-creative-commons-nd:before {\n  content: "\\f4eb"; }\n\n.fa-creative-commons-pd:before {\n  content: "\\f4ec"; }\n\n.fa-creative-commons-pd-alt:before {\n  content: "\\f4ed"; }\n\n.fa-creative-commons-remix:before {\n  content: "\\f4ee"; }\n\n.fa-creative-commons-sa:before {\n  content: "\\f4ef"; }\n\n.fa-creative-commons-sampling:before {\n  content: "\\f4f0"; }\n\n.fa-creative-commons-sampling-plus:before {\n  content: "\\f4f1"; }\n\n.fa-creative-commons-share:before {\n  content: "\\f4f2"; }\n\n.fa-creative-commons-zero:before {\n  content: "\\f4f3"; }\n\n.fa-credit-card:before {\n  content: "\\f09d"; }\n\n.fa-critical-role:before {\n  content: "\\f6c9"; }\n\n.fa-crop:before {\n  content: "\\f125"; }\n\n.fa-crop-alt:before {\n  content: "\\f565"; }\n\n.fa-cross:before {\n  content: "\\f654"; }\n\n.fa-crosshairs:before {\n  content: "\\f05b"; }\n\n.fa-crow:before {\n  content: "\\f520"; }\n\n.fa-crown:before {\n  content: "\\f521"; }\n\n.fa-crutch:before {\n  content: "\\f7f7"; }\n\n.fa-css3:before {\n  content: "\\f13c"; }\n\n.fa-css3-alt:before {\n  content: "\\f38b"; }\n\n.fa-cube:before {\n  content: "\\f1b2"; }\n\n.fa-cubes:before {\n  content: "\\f1b3"; }\n\n.fa-cut:before {\n  content: "\\f0c4"; }\n\n.fa-cuttlefish:before {\n  content: "\\f38c"; }\n\n.fa-d-and-d:before {\n  content: "\\f38d"; }\n\n.fa-d-and-d-beyond:before {\n  content: "\\f6ca"; }\n\n.fa-dashcube:before {\n  content: "\\f210"; }\n\n.fa-database:before {\n  content: "\\f1c0"; }\n\n.fa-deaf:before {\n  content: "\\f2a4"; }\n\n.fa-delicious:before {\n  content: "\\f1a5"; }\n\n.fa-democrat:before {\n  content: "\\f747"; }\n\n.fa-deploydog:before {\n  content: "\\f38e"; }\n\n.fa-deskpro:before {\n  content: "\\f38f"; }\n\n.fa-desktop:before {\n  content: "\\f108"; }\n\n.fa-dev:before {\n  content: "\\f6cc"; }\n\n.fa-deviantart:before {\n  content: "\\f1bd"; }\n\n.fa-dharmachakra:before {\n  content: "\\f655"; }\n\n.fa-dhl:before {\n  content: "\\f790"; }\n\n.fa-diagnoses:before {\n  content: "\\f470"; }\n\n.fa-diaspora:before {\n  content: "\\f791"; }\n\n.fa-dice:before {\n  content: "\\f522"; }\n\n.fa-dice-d20:before {\n  content: "\\f6cf"; }\n\n.fa-dice-d6:before {\n  content: "\\f6d1"; }\n\n.fa-dice-five:before {\n  content: "\\f523"; }\n\n.fa-dice-four:before {\n  content: "\\f524"; }\n\n.fa-dice-one:before {\n  content: "\\f525"; }\n\n.fa-dice-six:before {\n  content: "\\f526"; }\n\n.fa-dice-three:before {\n  content: "\\f527"; }\n\n.fa-dice-two:before {\n  content: "\\f528"; }\n\n.fa-digg:before {\n  content: "\\f1a6"; }\n\n.fa-digital-ocean:before {\n  content: "\\f391"; }\n\n.fa-digital-tachograph:before {\n  content: "\\f566"; }\n\n.fa-directions:before {\n  content: "\\f5eb"; }\n\n.fa-discord:before {\n  content: "\\f392"; }\n\n.fa-discourse:before {\n  content: "\\f393"; }\n\n.fa-divide:before {\n  content: "\\f529"; }\n\n.fa-dizzy:before {\n  content: "\\f567"; }\n\n.fa-dna:before {\n  content: "\\f471"; }\n\n.fa-dochub:before {\n  content: "\\f394"; }\n\n.fa-docker:before {\n  content: "\\f395"; }\n\n.fa-dog:before {\n  content: "\\f6d3"; }\n\n.fa-dollar-sign:before {\n  content: "\\f155"; }\n\n.fa-dolly:before {\n  content: "\\f472"; }\n\n.fa-dolly-flatbed:before {\n  content: "\\f474"; }\n\n.fa-donate:before {\n  content: "\\f4b9"; }\n\n.fa-door-closed:before {\n  content: "\\f52a"; }\n\n.fa-door-open:before {\n  content: "\\f52b"; }\n\n.fa-dot-circle:before {\n  content: "\\f192"; }\n\n.fa-dove:before {\n  content: "\\f4ba"; }\n\n.fa-download:before {\n  content: "\\f019"; }\n\n.fa-draft2digital:before {\n  content: "\\f396"; }\n\n.fa-drafting-compass:before {\n  content: "\\f568"; }\n\n.fa-dragon:before {\n  content: "\\f6d5"; }\n\n.fa-draw-polygon:before {\n  content: "\\f5ee"; }\n\n.fa-dribbble:before {\n  content: "\\f17d"; }\n\n.fa-dribbble-square:before {\n  content: "\\f397"; }\n\n.fa-dropbox:before {\n  content: "\\f16b"; }\n\n.fa-drum:before {\n  content: "\\f569"; }\n\n.fa-drum-steelpan:before {\n  content: "\\f56a"; }\n\n.fa-drumstick-bite:before {\n  content: "\\f6d7"; }\n\n.fa-drupal:before {\n  content: "\\f1a9"; }\n\n.fa-dumbbell:before {\n  content: "\\f44b"; }\n\n.fa-dumpster:before {\n  content: "\\f793"; }\n\n.fa-dumpster-fire:before {\n  content: "\\f794"; }\n\n.fa-dungeon:before {\n  content: "\\f6d9"; }\n\n.fa-dyalog:before {\n  content: "\\f399"; }\n\n.fa-earlybirds:before {\n  content: "\\f39a"; }\n\n.fa-ebay:before {\n  content: "\\f4f4"; }\n\n.fa-edge:before {\n  content: "\\f282"; }\n\n.fa-edit:before {\n  content: "\\f044"; }\n\n.fa-egg:before {\n  content: "\\f7fb"; }\n\n.fa-eject:before {\n  content: "\\f052"; }\n\n.fa-elementor:before {\n  content: "\\f430"; }\n\n.fa-ellipsis-h:before {\n  content: "\\f141"; }\n\n.fa-ellipsis-v:before {\n  content: "\\f142"; }\n\n.fa-ello:before {\n  content: "\\f5f1"; }\n\n.fa-ember:before {\n  content: "\\f423"; }\n\n.fa-empire:before {\n  content: "\\f1d1"; }\n\n.fa-envelope:before {\n  content: "\\f0e0"; }\n\n.fa-envelope-open:before {\n  content: "\\f2b6"; }\n\n.fa-envelope-open-text:before {\n  content: "\\f658"; }\n\n.fa-envelope-square:before {\n  content: "\\f199"; }\n\n.fa-envira:before {\n  content: "\\f299"; }\n\n.fa-equals:before {\n  content: "\\f52c"; }\n\n.fa-eraser:before {\n  content: "\\f12d"; }\n\n.fa-erlang:before {\n  content: "\\f39d"; }\n\n.fa-ethereum:before {\n  content: "\\f42e"; }\n\n.fa-ethernet:before {\n  content: "\\f796"; }\n\n.fa-etsy:before {\n  content: "\\f2d7"; }\n\n.fa-euro-sign:before {\n  content: "\\f153"; }\n\n.fa-evernote:before {\n  content: "\\f839"; }\n\n.fa-exchange-alt:before {\n  content: "\\f362"; }\n\n.fa-exclamation:before {\n  content: "\\f12a"; }\n\n.fa-exclamation-circle:before {\n  content: "\\f06a"; }\n\n.fa-exclamation-triangle:before {\n  content: "\\f071"; }\n\n.fa-expand:before {\n  content: "\\f065"; }\n\n.fa-expand-arrows-alt:before {\n  content: "\\f31e"; }\n\n.fa-expeditedssl:before {\n  content: "\\f23e"; }\n\n.fa-external-link-alt:before {\n  content: "\\f35d"; }\n\n.fa-external-link-square-alt:before {\n  content: "\\f360"; }\n\n.fa-eye:before {\n  content: "\\f06e"; }\n\n.fa-eye-dropper:before {\n  content: "\\f1fb"; }\n\n.fa-eye-slash:before {\n  content: "\\f070"; }\n\n.fa-facebook:before {\n  content: "\\f09a"; }\n\n.fa-facebook-f:before {\n  content: "\\f39e"; }\n\n.fa-facebook-messenger:before {\n  content: "\\f39f"; }\n\n.fa-facebook-square:before {\n  content: "\\f082"; }\n\n.fa-fan:before {\n  content: "\\f863"; }\n\n.fa-fantasy-flight-games:before {\n  content: "\\f6dc"; }\n\n.fa-fast-backward:before {\n  content: "\\f049"; }\n\n.fa-fast-forward:before {\n  content: "\\f050"; }\n\n.fa-fax:before {\n  content: "\\f1ac"; }\n\n.fa-feather:before {\n  content: "\\f52d"; }\n\n.fa-feather-alt:before {\n  content: "\\f56b"; }\n\n.fa-fedex:before {\n  content: "\\f797"; }\n\n.fa-fedora:before {\n  content: "\\f798"; }\n\n.fa-female:before {\n  content: "\\f182"; }\n\n.fa-fighter-jet:before {\n  content: "\\f0fb"; }\n\n.fa-figma:before {\n  content: "\\f799"; }\n\n.fa-file:before {\n  content: "\\f15b"; }\n\n.fa-file-alt:before {\n  content: "\\f15c"; }\n\n.fa-file-archive:before {\n  content: "\\f1c6"; }\n\n.fa-file-audio:before {\n  content: "\\f1c7"; }\n\n.fa-file-code:before {\n  content: "\\f1c9"; }\n\n.fa-file-contract:before {\n  content: "\\f56c"; }\n\n.fa-file-csv:before {\n  content: "\\f6dd"; }\n\n.fa-file-download:before {\n  content: "\\f56d"; }\n\n.fa-file-excel:before {\n  content: "\\f1c3"; }\n\n.fa-file-export:before {\n  content: "\\f56e"; }\n\n.fa-file-image:before {\n  content: "\\f1c5"; }\n\n.fa-file-import:before {\n  content: "\\f56f"; }\n\n.fa-file-invoice:before {\n  content: "\\f570"; }\n\n.fa-file-invoice-dollar:before {\n  content: "\\f571"; }\n\n.fa-file-medical:before {\n  content: "\\f477"; }\n\n.fa-file-medical-alt:before {\n  content: "\\f478"; }\n\n.fa-file-pdf:before {\n  content: "\\f1c1"; }\n\n.fa-file-powerpoint:before {\n  content: "\\f1c4"; }\n\n.fa-file-prescription:before {\n  content: "\\f572"; }\n\n.fa-file-signature:before {\n  content: "\\f573"; }\n\n.fa-file-upload:before {\n  content: "\\f574"; }\n\n.fa-file-video:before {\n  content: "\\f1c8"; }\n\n.fa-file-word:before {\n  content: "\\f1c2"; }\n\n.fa-fill:before {\n  content: "\\f575"; }\n\n.fa-fill-drip:before {\n  content: "\\f576"; }\n\n.fa-film:before {\n  content: "\\f008"; }\n\n.fa-filter:before {\n  content: "\\f0b0"; }\n\n.fa-fingerprint:before {\n  content: "\\f577"; }\n\n.fa-fire:before {\n  content: "\\f06d"; }\n\n.fa-fire-alt:before {\n  content: "\\f7e4"; }\n\n.fa-fire-extinguisher:before {\n  content: "\\f134"; }\n\n.fa-firefox:before {\n  content: "\\f269"; }\n\n.fa-first-aid:before {\n  content: "\\f479"; }\n\n.fa-first-order:before {\n  content: "\\f2b0"; }\n\n.fa-first-order-alt:before {\n  content: "\\f50a"; }\n\n.fa-firstdraft:before {\n  content: "\\f3a1"; }\n\n.fa-fish:before {\n  content: "\\f578"; }\n\n.fa-fist-raised:before {\n  content: "\\f6de"; }\n\n.fa-flag:before {\n  content: "\\f024"; }\n\n.fa-flag-checkered:before {\n  content: "\\f11e"; }\n\n.fa-flag-usa:before {\n  content: "\\f74d"; }\n\n.fa-flask:before {\n  content: "\\f0c3"; }\n\n.fa-flickr:before {\n  content: "\\f16e"; }\n\n.fa-flipboard:before {\n  content: "\\f44d"; }\n\n.fa-flushed:before {\n  content: "\\f579"; }\n\n.fa-fly:before {\n  content: "\\f417"; }\n\n.fa-folder:before {\n  content: "\\f07b"; }\n\n.fa-folder-minus:before {\n  content: "\\f65d"; }\n\n.fa-folder-open:before {\n  content: "\\f07c"; }\n\n.fa-folder-plus:before {\n  content: "\\f65e"; }\n\n.fa-font:before {\n  content: "\\f031"; }\n\n.fa-font-awesome:before {\n  content: "\\f2b4"; }\n\n.fa-font-awesome-alt:before {\n  content: "\\f35c"; }\n\n.fa-font-awesome-flag:before {\n  content: "\\f425"; }\n\n.fa-font-awesome-logo-full:before {\n  content: "\\f4e6"; }\n\n.fa-fonticons:before {\n  content: "\\f280"; }\n\n.fa-fonticons-fi:before {\n  content: "\\f3a2"; }\n\n.fa-football-ball:before {\n  content: "\\f44e"; }\n\n.fa-fort-awesome:before {\n  content: "\\f286"; }\n\n.fa-fort-awesome-alt:before {\n  content: "\\f3a3"; }\n\n.fa-forumbee:before {\n  content: "\\f211"; }\n\n.fa-forward:before {\n  content: "\\f04e"; }\n\n.fa-foursquare:before {\n  content: "\\f180"; }\n\n.fa-free-code-camp:before {\n  content: "\\f2c5"; }\n\n.fa-freebsd:before {\n  content: "\\f3a4"; }\n\n.fa-frog:before {\n  content: "\\f52e"; }\n\n.fa-frown:before {\n  content: "\\f119"; }\n\n.fa-frown-open:before {\n  content: "\\f57a"; }\n\n.fa-fulcrum:before {\n  content: "\\f50b"; }\n\n.fa-funnel-dollar:before {\n  content: "\\f662"; }\n\n.fa-futbol:before {\n  content: "\\f1e3"; }\n\n.fa-galactic-republic:before {\n  content: "\\f50c"; }\n\n.fa-galactic-senate:before {\n  content: "\\f50d"; }\n\n.fa-gamepad:before {\n  content: "\\f11b"; }\n\n.fa-gas-pump:before {\n  content: "\\f52f"; }\n\n.fa-gavel:before {\n  content: "\\f0e3"; }\n\n.fa-gem:before {\n  content: "\\f3a5"; }\n\n.fa-genderless:before {\n  content: "\\f22d"; }\n\n.fa-get-pocket:before {\n  content: "\\f265"; }\n\n.fa-gg:before {\n  content: "\\f260"; }\n\n.fa-gg-circle:before {\n  content: "\\f261"; }\n\n.fa-ghost:before {\n  content: "\\f6e2"; }\n\n.fa-gift:before {\n  content: "\\f06b"; }\n\n.fa-gifts:before {\n  content: "\\f79c"; }\n\n.fa-git:before {\n  content: "\\f1d3"; }\n\n.fa-git-alt:before {\n  content: "\\f841"; }\n\n.fa-git-square:before {\n  content: "\\f1d2"; }\n\n.fa-github:before {\n  content: "\\f09b"; }\n\n.fa-github-alt:before {\n  content: "\\f113"; }\n\n.fa-github-square:before {\n  content: "\\f092"; }\n\n.fa-gitkraken:before {\n  content: "\\f3a6"; }\n\n.fa-gitlab:before {\n  content: "\\f296"; }\n\n.fa-gitter:before {\n  content: "\\f426"; }\n\n.fa-glass-cheers:before {\n  content: "\\f79f"; }\n\n.fa-glass-martini:before {\n  content: "\\f000"; }\n\n.fa-glass-martini-alt:before {\n  content: "\\f57b"; }\n\n.fa-glass-whiskey:before {\n  content: "\\f7a0"; }\n\n.fa-glasses:before {\n  content: "\\f530"; }\n\n.fa-glide:before {\n  content: "\\f2a5"; }\n\n.fa-glide-g:before {\n  content: "\\f2a6"; }\n\n.fa-globe:before {\n  content: "\\f0ac"; }\n\n.fa-globe-africa:before {\n  content: "\\f57c"; }\n\n.fa-globe-americas:before {\n  content: "\\f57d"; }\n\n.fa-globe-asia:before {\n  content: "\\f57e"; }\n\n.fa-globe-europe:before {\n  content: "\\f7a2"; }\n\n.fa-gofore:before {\n  content: "\\f3a7"; }\n\n.fa-golf-ball:before {\n  content: "\\f450"; }\n\n.fa-goodreads:before {\n  content: "\\f3a8"; }\n\n.fa-goodreads-g:before {\n  content: "\\f3a9"; }\n\n.fa-google:before {\n  content: "\\f1a0"; }\n\n.fa-google-drive:before {\n  content: "\\f3aa"; }\n\n.fa-google-play:before {\n  content: "\\f3ab"; }\n\n.fa-google-plus:before {\n  content: "\\f2b3"; }\n\n.fa-google-plus-g:before {\n  content: "\\f0d5"; }\n\n.fa-google-plus-square:before {\n  content: "\\f0d4"; }\n\n.fa-google-wallet:before {\n  content: "\\f1ee"; }\n\n.fa-gopuram:before {\n  content: "\\f664"; }\n\n.fa-graduation-cap:before {\n  content: "\\f19d"; }\n\n.fa-gratipay:before {\n  content: "\\f184"; }\n\n.fa-grav:before {\n  content: "\\f2d6"; }\n\n.fa-greater-than:before {\n  content: "\\f531"; }\n\n.fa-greater-than-equal:before {\n  content: "\\f532"; }\n\n.fa-grimace:before {\n  content: "\\f57f"; }\n\n.fa-grin:before {\n  content: "\\f580"; }\n\n.fa-grin-alt:before {\n  content: "\\f581"; }\n\n.fa-grin-beam:before {\n  content: "\\f582"; }\n\n.fa-grin-beam-sweat:before {\n  content: "\\f583"; }\n\n.fa-grin-hearts:before {\n  content: "\\f584"; }\n\n.fa-grin-squint:before {\n  content: "\\f585"; }\n\n.fa-grin-squint-tears:before {\n  content: "\\f586"; }\n\n.fa-grin-stars:before {\n  content: "\\f587"; }\n\n.fa-grin-tears:before {\n  content: "\\f588"; }\n\n.fa-grin-tongue:before {\n  content: "\\f589"; }\n\n.fa-grin-tongue-squint:before {\n  content: "\\f58a"; }\n\n.fa-grin-tongue-wink:before {\n  content: "\\f58b"; }\n\n.fa-grin-wink:before {\n  content: "\\f58c"; }\n\n.fa-grip-horizontal:before {\n  content: "\\f58d"; }\n\n.fa-grip-lines:before {\n  content: "\\f7a4"; }\n\n.fa-grip-lines-vertical:before {\n  content: "\\f7a5"; }\n\n.fa-grip-vertical:before {\n  content: "\\f58e"; }\n\n.fa-gripfire:before {\n  content: "\\f3ac"; }\n\n.fa-grunt:before {\n  content: "\\f3ad"; }\n\n.fa-guitar:before {\n  content: "\\f7a6"; }\n\n.fa-gulp:before {\n  content: "\\f3ae"; }\n\n.fa-h-square:before {\n  content: "\\f0fd"; }\n\n.fa-hacker-news:before {\n  content: "\\f1d4"; }\n\n.fa-hacker-news-square:before {\n  content: "\\f3af"; }\n\n.fa-hackerrank:before {\n  content: "\\f5f7"; }\n\n.fa-hamburger:before {\n  content: "\\f805"; }\n\n.fa-hammer:before {\n  content: "\\f6e3"; }\n\n.fa-hamsa:before {\n  content: "\\f665"; }\n\n.fa-hand-holding:before {\n  content: "\\f4bd"; }\n\n.fa-hand-holding-heart:before {\n  content: "\\f4be"; }\n\n.fa-hand-holding-usd:before {\n  content: "\\f4c0"; }\n\n.fa-hand-lizard:before {\n  content: "\\f258"; }\n\n.fa-hand-middle-finger:before {\n  content: "\\f806"; }\n\n.fa-hand-paper:before {\n  content: "\\f256"; }\n\n.fa-hand-peace:before {\n  content: "\\f25b"; }\n\n.fa-hand-point-down:before {\n  content: "\\f0a7"; }\n\n.fa-hand-point-left:before {\n  content: "\\f0a5"; }\n\n.fa-hand-point-right:before {\n  content: "\\f0a4"; }\n\n.fa-hand-point-up:before {\n  content: "\\f0a6"; }\n\n.fa-hand-pointer:before {\n  content: "\\f25a"; }\n\n.fa-hand-rock:before {\n  content: "\\f255"; }\n\n.fa-hand-scissors:before {\n  content: "\\f257"; }\n\n.fa-hand-spock:before {\n  content: "\\f259"; }\n\n.fa-hands:before {\n  content: "\\f4c2"; }\n\n.fa-hands-helping:before {\n  content: "\\f4c4"; }\n\n.fa-handshake:before {\n  content: "\\f2b5"; }\n\n.fa-hanukiah:before {\n  content: "\\f6e6"; }\n\n.fa-hard-hat:before {\n  content: "\\f807"; }\n\n.fa-hashtag:before {\n  content: "\\f292"; }\n\n.fa-hat-wizard:before {\n  content: "\\f6e8"; }\n\n.fa-haykal:before {\n  content: "\\f666"; }\n\n.fa-hdd:before {\n  content: "\\f0a0"; }\n\n.fa-heading:before {\n  content: "\\f1dc"; }\n\n.fa-headphones:before {\n  content: "\\f025"; }\n\n.fa-headphones-alt:before {\n  content: "\\f58f"; }\n\n.fa-headset:before {\n  content: "\\f590"; }\n\n.fa-heart:before {\n  content: "\\f004"; }\n\n.fa-heart-broken:before {\n  content: "\\f7a9"; }\n\n.fa-heartbeat:before {\n  content: "\\f21e"; }\n\n.fa-helicopter:before {\n  content: "\\f533"; }\n\n.fa-highlighter:before {\n  content: "\\f591"; }\n\n.fa-hiking:before {\n  content: "\\f6ec"; }\n\n.fa-hippo:before {\n  content: "\\f6ed"; }\n\n.fa-hips:before {\n  content: "\\f452"; }\n\n.fa-hire-a-helper:before {\n  content: "\\f3b0"; }\n\n.fa-history:before {\n  content: "\\f1da"; }\n\n.fa-hockey-puck:before {\n  content: "\\f453"; }\n\n.fa-holly-berry:before {\n  content: "\\f7aa"; }\n\n.fa-home:before {\n  content: "\\f015"; }\n\n.fa-hooli:before {\n  content: "\\f427"; }\n\n.fa-hornbill:before {\n  content: "\\f592"; }\n\n.fa-horse:before {\n  content: "\\f6f0"; }\n\n.fa-horse-head:before {\n  content: "\\f7ab"; }\n\n.fa-hospital:before {\n  content: "\\f0f8"; }\n\n.fa-hospital-alt:before {\n  content: "\\f47d"; }\n\n.fa-hospital-symbol:before {\n  content: "\\f47e"; }\n\n.fa-hot-tub:before {\n  content: "\\f593"; }\n\n.fa-hotdog:before {\n  content: "\\f80f"; }\n\n.fa-hotel:before {\n  content: "\\f594"; }\n\n.fa-hotjar:before {\n  content: "\\f3b1"; }\n\n.fa-hourglass:before {\n  content: "\\f254"; }\n\n.fa-hourglass-end:before {\n  content: "\\f253"; }\n\n.fa-hourglass-half:before {\n  content: "\\f252"; }\n\n.fa-hourglass-start:before {\n  content: "\\f251"; }\n\n.fa-house-damage:before {\n  content: "\\f6f1"; }\n\n.fa-houzz:before {\n  content: "\\f27c"; }\n\n.fa-hryvnia:before {\n  content: "\\f6f2"; }\n\n.fa-html5:before {\n  content: "\\f13b"; }\n\n.fa-hubspot:before {\n  content: "\\f3b2"; }\n\n.fa-i-cursor:before {\n  content: "\\f246"; }\n\n.fa-ice-cream:before {\n  content: "\\f810"; }\n\n.fa-icicles:before {\n  content: "\\f7ad"; }\n\n.fa-icons:before {\n  content: "\\f86d"; }\n\n.fa-id-badge:before {\n  content: "\\f2c1"; }\n\n.fa-id-card:before {\n  content: "\\f2c2"; }\n\n.fa-id-card-alt:before {\n  content: "\\f47f"; }\n\n.fa-igloo:before {\n  content: "\\f7ae"; }\n\n.fa-image:before {\n  content: "\\f03e"; }\n\n.fa-images:before {\n  content: "\\f302"; }\n\n.fa-imdb:before {\n  content: "\\f2d8"; }\n\n.fa-inbox:before {\n  content: "\\f01c"; }\n\n.fa-indent:before {\n  content: "\\f03c"; }\n\n.fa-industry:before {\n  content: "\\f275"; }\n\n.fa-infinity:before {\n  content: "\\f534"; }\n\n.fa-info:before {\n  content: "\\f129"; }\n\n.fa-info-circle:before {\n  content: "\\f05a"; }\n\n.fa-instagram:before {\n  content: "\\f16d"; }\n\n.fa-intercom:before {\n  content: "\\f7af"; }\n\n.fa-internet-explorer:before {\n  content: "\\f26b"; }\n\n.fa-invision:before {\n  content: "\\f7b0"; }\n\n.fa-ioxhost:before {\n  content: "\\f208"; }\n\n.fa-italic:before {\n  content: "\\f033"; }\n\n.fa-itch-io:before {\n  content: "\\f83a"; }\n\n.fa-itunes:before {\n  content: "\\f3b4"; }\n\n.fa-itunes-note:before {\n  content: "\\f3b5"; }\n\n.fa-java:before {\n  content: "\\f4e4"; }\n\n.fa-jedi:before {\n  content: "\\f669"; }\n\n.fa-jedi-order:before {\n  content: "\\f50e"; }\n\n.fa-jenkins:before {\n  content: "\\f3b6"; }\n\n.fa-jira:before {\n  content: "\\f7b1"; }\n\n.fa-joget:before {\n  content: "\\f3b7"; }\n\n.fa-joint:before {\n  content: "\\f595"; }\n\n.fa-joomla:before {\n  content: "\\f1aa"; }\n\n.fa-journal-whills:before {\n  content: "\\f66a"; }\n\n.fa-js:before {\n  content: "\\f3b8"; }\n\n.fa-js-square:before {\n  content: "\\f3b9"; }\n\n.fa-jsfiddle:before {\n  content: "\\f1cc"; }\n\n.fa-kaaba:before {\n  content: "\\f66b"; }\n\n.fa-kaggle:before {\n  content: "\\f5fa"; }\n\n.fa-key:before {\n  content: "\\f084"; }\n\n.fa-keybase:before {\n  content: "\\f4f5"; }\n\n.fa-keyboard:before {\n  content: "\\f11c"; }\n\n.fa-keycdn:before {\n  content: "\\f3ba"; }\n\n.fa-khanda:before {\n  content: "\\f66d"; }\n\n.fa-kickstarter:before {\n  content: "\\f3bb"; }\n\n.fa-kickstarter-k:before {\n  content: "\\f3bc"; }\n\n.fa-kiss:before {\n  content: "\\f596"; }\n\n.fa-kiss-beam:before {\n  content: "\\f597"; }\n\n.fa-kiss-wink-heart:before {\n  content: "\\f598"; }\n\n.fa-kiwi-bird:before {\n  content: "\\f535"; }\n\n.fa-korvue:before {\n  content: "\\f42f"; }\n\n.fa-landmark:before {\n  content: "\\f66f"; }\n\n.fa-language:before {\n  content: "\\f1ab"; }\n\n.fa-laptop:before {\n  content: "\\f109"; }\n\n.fa-laptop-code:before {\n  content: "\\f5fc"; }\n\n.fa-laptop-medical:before {\n  content: "\\f812"; }\n\n.fa-laravel:before {\n  content: "\\f3bd"; }\n\n.fa-lastfm:before {\n  content: "\\f202"; }\n\n.fa-lastfm-square:before {\n  content: "\\f203"; }\n\n.fa-laugh:before {\n  content: "\\f599"; }\n\n.fa-laugh-beam:before {\n  content: "\\f59a"; }\n\n.fa-laugh-squint:before {\n  content: "\\f59b"; }\n\n.fa-laugh-wink:before {\n  content: "\\f59c"; }\n\n.fa-layer-group:before {\n  content: "\\f5fd"; }\n\n.fa-leaf:before {\n  content: "\\f06c"; }\n\n.fa-leanpub:before {\n  content: "\\f212"; }\n\n.fa-lemon:before {\n  content: "\\f094"; }\n\n.fa-less:before {\n  content: "\\f41d"; }\n\n.fa-less-than:before {\n  content: "\\f536"; }\n\n.fa-less-than-equal:before {\n  content: "\\f537"; }\n\n.fa-level-down-alt:before {\n  content: "\\f3be"; }\n\n.fa-level-up-alt:before {\n  content: "\\f3bf"; }\n\n.fa-life-ring:before {\n  content: "\\f1cd"; }\n\n.fa-lightbulb:before {\n  content: "\\f0eb"; }\n\n.fa-line:before {\n  content: "\\f3c0"; }\n\n.fa-link:before {\n  content: "\\f0c1"; }\n\n.fa-linkedin:before {\n  content: "\\f08c"; }\n\n.fa-linkedin-in:before {\n  content: "\\f0e1"; }\n\n.fa-linode:before {\n  content: "\\f2b8"; }\n\n.fa-linux:before {\n  content: "\\f17c"; }\n\n.fa-lira-sign:before {\n  content: "\\f195"; }\n\n.fa-list:before {\n  content: "\\f03a"; }\n\n.fa-list-alt:before {\n  content: "\\f022"; }\n\n.fa-list-ol:before {\n  content: "\\f0cb"; }\n\n.fa-list-ul:before {\n  content: "\\f0ca"; }\n\n.fa-location-arrow:before {\n  content: "\\f124"; }\n\n.fa-lock:before {\n  content: "\\f023"; }\n\n.fa-lock-open:before {\n  content: "\\f3c1"; }\n\n.fa-long-arrow-alt-down:before {\n  content: "\\f309"; }\n\n.fa-long-arrow-alt-left:before {\n  content: "\\f30a"; }\n\n.fa-long-arrow-alt-right:before {\n  content: "\\f30b"; }\n\n.fa-long-arrow-alt-up:before {\n  content: "\\f30c"; }\n\n.fa-low-vision:before {\n  content: "\\f2a8"; }\n\n.fa-luggage-cart:before {\n  content: "\\f59d"; }\n\n.fa-lyft:before {\n  content: "\\f3c3"; }\n\n.fa-magento:before {\n  content: "\\f3c4"; }\n\n.fa-magic:before {\n  content: "\\f0d0"; }\n\n.fa-magnet:before {\n  content: "\\f076"; }\n\n.fa-mail-bulk:before {\n  content: "\\f674"; }\n\n.fa-mailchimp:before {\n  content: "\\f59e"; }\n\n.fa-male:before {\n  content: "\\f183"; }\n\n.fa-mandalorian:before {\n  content: "\\f50f"; }\n\n.fa-map:before {\n  content: "\\f279"; }\n\n.fa-map-marked:before {\n  content: "\\f59f"; }\n\n.fa-map-marked-alt:before {\n  content: "\\f5a0"; }\n\n.fa-map-marker:before {\n  content: "\\f041"; }\n\n.fa-map-marker-alt:before {\n  content: "\\f3c5"; }\n\n.fa-map-pin:before {\n  content: "\\f276"; }\n\n.fa-map-signs:before {\n  content: "\\f277"; }\n\n.fa-markdown:before {\n  content: "\\f60f"; }\n\n.fa-marker:before {\n  content: "\\f5a1"; }\n\n.fa-mars:before {\n  content: "\\f222"; }\n\n.fa-mars-double:before {\n  content: "\\f227"; }\n\n.fa-mars-stroke:before {\n  content: "\\f229"; }\n\n.fa-mars-stroke-h:before {\n  content: "\\f22b"; }\n\n.fa-mars-stroke-v:before {\n  content: "\\f22a"; }\n\n.fa-mask:before {\n  content: "\\f6fa"; }\n\n.fa-mastodon:before {\n  content: "\\f4f6"; }\n\n.fa-maxcdn:before {\n  content: "\\f136"; }\n\n.fa-medal:before {\n  content: "\\f5a2"; }\n\n.fa-medapps:before {\n  content: "\\f3c6"; }\n\n.fa-medium:before {\n  content: "\\f23a"; }\n\n.fa-medium-m:before {\n  content: "\\f3c7"; }\n\n.fa-medkit:before {\n  content: "\\f0fa"; }\n\n.fa-medrt:before {\n  content: "\\f3c8"; }\n\n.fa-meetup:before {\n  content: "\\f2e0"; }\n\n.fa-megaport:before {\n  content: "\\f5a3"; }\n\n.fa-meh:before {\n  content: "\\f11a"; }\n\n.fa-meh-blank:before {\n  content: "\\f5a4"; }\n\n.fa-meh-rolling-eyes:before {\n  content: "\\f5a5"; }\n\n.fa-memory:before {\n  content: "\\f538"; }\n\n.fa-mendeley:before {\n  content: "\\f7b3"; }\n\n.fa-menorah:before {\n  content: "\\f676"; }\n\n.fa-mercury:before {\n  content: "\\f223"; }\n\n.fa-meteor:before {\n  content: "\\f753"; }\n\n.fa-microchip:before {\n  content: "\\f2db"; }\n\n.fa-microphone:before {\n  content: "\\f130"; }\n\n.fa-microphone-alt:before {\n  content: "\\f3c9"; }\n\n.fa-microphone-alt-slash:before {\n  content: "\\f539"; }\n\n.fa-microphone-slash:before {\n  content: "\\f131"; }\n\n.fa-microscope:before {\n  content: "\\f610"; }\n\n.fa-microsoft:before {\n  content: "\\f3ca"; }\n\n.fa-minus:before {\n  content: "\\f068"; }\n\n.fa-minus-circle:before {\n  content: "\\f056"; }\n\n.fa-minus-square:before {\n  content: "\\f146"; }\n\n.fa-mitten:before {\n  content: "\\f7b5"; }\n\n.fa-mix:before {\n  content: "\\f3cb"; }\n\n.fa-mixcloud:before {\n  content: "\\f289"; }\n\n.fa-mizuni:before {\n  content: "\\f3cc"; }\n\n.fa-mobile:before {\n  content: "\\f10b"; }\n\n.fa-mobile-alt:before {\n  content: "\\f3cd"; }\n\n.fa-modx:before {\n  content: "\\f285"; }\n\n.fa-monero:before {\n  content: "\\f3d0"; }\n\n.fa-money-bill:before {\n  content: "\\f0d6"; }\n\n.fa-money-bill-alt:before {\n  content: "\\f3d1"; }\n\n.fa-money-bill-wave:before {\n  content: "\\f53a"; }\n\n.fa-money-bill-wave-alt:before {\n  content: "\\f53b"; }\n\n.fa-money-check:before {\n  content: "\\f53c"; }\n\n.fa-money-check-alt:before {\n  content: "\\f53d"; }\n\n.fa-monument:before {\n  content: "\\f5a6"; }\n\n.fa-moon:before {\n  content: "\\f186"; }\n\n.fa-mortar-pestle:before {\n  content: "\\f5a7"; }\n\n.fa-mosque:before {\n  content: "\\f678"; }\n\n.fa-motorcycle:before {\n  content: "\\f21c"; }\n\n.fa-mountain:before {\n  content: "\\f6fc"; }\n\n.fa-mouse-pointer:before {\n  content: "\\f245"; }\n\n.fa-mug-hot:before {\n  content: "\\f7b6"; }\n\n.fa-music:before {\n  content: "\\f001"; }\n\n.fa-napster:before {\n  content: "\\f3d2"; }\n\n.fa-neos:before {\n  content: "\\f612"; }\n\n.fa-network-wired:before {\n  content: "\\f6ff"; }\n\n.fa-neuter:before {\n  content: "\\f22c"; }\n\n.fa-newspaper:before {\n  content: "\\f1ea"; }\n\n.fa-nimblr:before {\n  content: "\\f5a8"; }\n\n.fa-node:before {\n  content: "\\f419"; }\n\n.fa-node-js:before {\n  content: "\\f3d3"; }\n\n.fa-not-equal:before {\n  content: "\\f53e"; }\n\n.fa-notes-medical:before {\n  content: "\\f481"; }\n\n.fa-npm:before {\n  content: "\\f3d4"; }\n\n.fa-ns8:before {\n  content: "\\f3d5"; }\n\n.fa-nutritionix:before {\n  content: "\\f3d6"; }\n\n.fa-object-group:before {\n  content: "\\f247"; }\n\n.fa-object-ungroup:before {\n  content: "\\f248"; }\n\n.fa-odnoklassniki:before {\n  content: "\\f263"; }\n\n.fa-odnoklassniki-square:before {\n  content: "\\f264"; }\n\n.fa-oil-can:before {\n  content: "\\f613"; }\n\n.fa-old-republic:before {\n  content: "\\f510"; }\n\n.fa-om:before {\n  content: "\\f679"; }\n\n.fa-opencart:before {\n  content: "\\f23d"; }\n\n.fa-openid:before {\n  content: "\\f19b"; }\n\n.fa-opera:before {\n  content: "\\f26a"; }\n\n.fa-optin-monster:before {\n  content: "\\f23c"; }\n\n.fa-osi:before {\n  content: "\\f41a"; }\n\n.fa-otter:before {\n  content: "\\f700"; }\n\n.fa-outdent:before {\n  content: "\\f03b"; }\n\n.fa-page4:before {\n  content: "\\f3d7"; }\n\n.fa-pagelines:before {\n  content: "\\f18c"; }\n\n.fa-pager:before {\n  content: "\\f815"; }\n\n.fa-paint-brush:before {\n  content: "\\f1fc"; }\n\n.fa-paint-roller:before {\n  content: "\\f5aa"; }\n\n.fa-palette:before {\n  content: "\\f53f"; }\n\n.fa-palfed:before {\n  content: "\\f3d8"; }\n\n.fa-pallet:before {\n  content: "\\f482"; }\n\n.fa-paper-plane:before {\n  content: "\\f1d8"; }\n\n.fa-paperclip:before {\n  content: "\\f0c6"; }\n\n.fa-parachute-box:before {\n  content: "\\f4cd"; }\n\n.fa-paragraph:before {\n  content: "\\f1dd"; }\n\n.fa-parking:before {\n  content: "\\f540"; }\n\n.fa-passport:before {\n  content: "\\f5ab"; }\n\n.fa-pastafarianism:before {\n  content: "\\f67b"; }\n\n.fa-paste:before {\n  content: "\\f0ea"; }\n\n.fa-patreon:before {\n  content: "\\f3d9"; }\n\n.fa-pause:before {\n  content: "\\f04c"; }\n\n.fa-pause-circle:before {\n  content: "\\f28b"; }\n\n.fa-paw:before {\n  content: "\\f1b0"; }\n\n.fa-paypal:before {\n  content: "\\f1ed"; }\n\n.fa-peace:before {\n  content: "\\f67c"; }\n\n.fa-pen:before {\n  content: "\\f304"; }\n\n.fa-pen-alt:before {\n  content: "\\f305"; }\n\n.fa-pen-fancy:before {\n  content: "\\f5ac"; }\n\n.fa-pen-nib:before {\n  content: "\\f5ad"; }\n\n.fa-pen-square:before {\n  content: "\\f14b"; }\n\n.fa-pencil-alt:before {\n  content: "\\f303"; }\n\n.fa-pencil-ruler:before {\n  content: "\\f5ae"; }\n\n.fa-penny-arcade:before {\n  content: "\\f704"; }\n\n.fa-people-carry:before {\n  content: "\\f4ce"; }\n\n.fa-pepper-hot:before {\n  content: "\\f816"; }\n\n.fa-percent:before {\n  content: "\\f295"; }\n\n.fa-percentage:before {\n  content: "\\f541"; }\n\n.fa-periscope:before {\n  content: "\\f3da"; }\n\n.fa-person-booth:before {\n  content: "\\f756"; }\n\n.fa-phabricator:before {\n  content: "\\f3db"; }\n\n.fa-phoenix-framework:before {\n  content: "\\f3dc"; }\n\n.fa-phoenix-squadron:before {\n  content: "\\f511"; }\n\n.fa-phone:before {\n  content: "\\f095"; }\n\n.fa-phone-alt:before {\n  content: "\\f879"; }\n\n.fa-phone-slash:before {\n  content: "\\f3dd"; }\n\n.fa-phone-square:before {\n  content: "\\f098"; }\n\n.fa-phone-square-alt:before {\n  content: "\\f87b"; }\n\n.fa-phone-volume:before {\n  content: "\\f2a0"; }\n\n.fa-photo-video:before {\n  content: "\\f87c"; }\n\n.fa-php:before {\n  content: "\\f457"; }\n\n.fa-pied-piper:before {\n  content: "\\f2ae"; }\n\n.fa-pied-piper-alt:before {\n  content: "\\f1a8"; }\n\n.fa-pied-piper-hat:before {\n  content: "\\f4e5"; }\n\n.fa-pied-piper-pp:before {\n  content: "\\f1a7"; }\n\n.fa-piggy-bank:before {\n  content: "\\f4d3"; }\n\n.fa-pills:before {\n  content: "\\f484"; }\n\n.fa-pinterest:before {\n  content: "\\f0d2"; }\n\n.fa-pinterest-p:before {\n  content: "\\f231"; }\n\n.fa-pinterest-square:before {\n  content: "\\f0d3"; }\n\n.fa-pizza-slice:before {\n  content: "\\f818"; }\n\n.fa-place-of-worship:before {\n  content: "\\f67f"; }\n\n.fa-plane:before {\n  content: "\\f072"; }\n\n.fa-plane-arrival:before {\n  content: "\\f5af"; }\n\n.fa-plane-departure:before {\n  content: "\\f5b0"; }\n\n.fa-play:before {\n  content: "\\f04b"; }\n\n.fa-play-circle:before {\n  content: "\\f144"; }\n\n.fa-playstation:before {\n  content: "\\f3df"; }\n\n.fa-plug:before {\n  content: "\\f1e6"; }\n\n.fa-plus:before {\n  content: "\\f067"; }\n\n.fa-plus-circle:before {\n  content: "\\f055"; }\n\n.fa-plus-square:before {\n  content: "\\f0fe"; }\n\n.fa-podcast:before {\n  content: "\\f2ce"; }\n\n.fa-poll:before {\n  content: "\\f681"; }\n\n.fa-poll-h:before {\n  content: "\\f682"; }\n\n.fa-poo:before {\n  content: "\\f2fe"; }\n\n.fa-poo-storm:before {\n  content: "\\f75a"; }\n\n.fa-poop:before {\n  content: "\\f619"; }\n\n.fa-portrait:before {\n  content: "\\f3e0"; }\n\n.fa-pound-sign:before {\n  content: "\\f154"; }\n\n.fa-power-off:before {\n  content: "\\f011"; }\n\n.fa-pray:before {\n  content: "\\f683"; }\n\n.fa-praying-hands:before {\n  content: "\\f684"; }\n\n.fa-prescription:before {\n  content: "\\f5b1"; }\n\n.fa-prescription-bottle:before {\n  content: "\\f485"; }\n\n.fa-prescription-bottle-alt:before {\n  content: "\\f486"; }\n\n.fa-print:before {\n  content: "\\f02f"; }\n\n.fa-procedures:before {\n  content: "\\f487"; }\n\n.fa-product-hunt:before {\n  content: "\\f288"; }\n\n.fa-project-diagram:before {\n  content: "\\f542"; }\n\n.fa-pushed:before {\n  content: "\\f3e1"; }\n\n.fa-puzzle-piece:before {\n  content: "\\f12e"; }\n\n.fa-python:before {\n  content: "\\f3e2"; }\n\n.fa-qq:before {\n  content: "\\f1d6"; }\n\n.fa-qrcode:before {\n  content: "\\f029"; }\n\n.fa-question:before {\n  content: "\\f128"; }\n\n.fa-question-circle:before {\n  content: "\\f059"; }\n\n.fa-quidditch:before {\n  content: "\\f458"; }\n\n.fa-quinscape:before {\n  content: "\\f459"; }\n\n.fa-quora:before {\n  content: "\\f2c4"; }\n\n.fa-quote-left:before {\n  content: "\\f10d"; }\n\n.fa-quote-right:before {\n  content: "\\f10e"; }\n\n.fa-quran:before {\n  content: "\\f687"; }\n\n.fa-r-project:before {\n  content: "\\f4f7"; }\n\n.fa-radiation:before {\n  content: "\\f7b9"; }\n\n.fa-radiation-alt:before {\n  content: "\\f7ba"; }\n\n.fa-rainbow:before {\n  content: "\\f75b"; }\n\n.fa-random:before {\n  content: "\\f074"; }\n\n.fa-raspberry-pi:before {\n  content: "\\f7bb"; }\n\n.fa-ravelry:before {\n  content: "\\f2d9"; }\n\n.fa-react:before {\n  content: "\\f41b"; }\n\n.fa-reacteurope:before {\n  content: "\\f75d"; }\n\n.fa-readme:before {\n  content: "\\f4d5"; }\n\n.fa-rebel:before {\n  content: "\\f1d0"; }\n\n.fa-receipt:before {\n  content: "\\f543"; }\n\n.fa-recycle:before {\n  content: "\\f1b8"; }\n\n.fa-red-river:before {\n  content: "\\f3e3"; }\n\n.fa-reddit:before {\n  content: "\\f1a1"; }\n\n.fa-reddit-alien:before {\n  content: "\\f281"; }\n\n.fa-reddit-square:before {\n  content: "\\f1a2"; }\n\n.fa-redhat:before {\n  content: "\\f7bc"; }\n\n.fa-redo:before {\n  content: "\\f01e"; }\n\n.fa-redo-alt:before {\n  content: "\\f2f9"; }\n\n.fa-registered:before {\n  content: "\\f25d"; }\n\n.fa-remove-format:before {\n  content: "\\f87d"; }\n\n.fa-renren:before {\n  content: "\\f18b"; }\n\n.fa-reply:before {\n  content: "\\f3e5"; }\n\n.fa-reply-all:before {\n  content: "\\f122"; }\n\n.fa-replyd:before {\n  content: "\\f3e6"; }\n\n.fa-republican:before {\n  content: "\\f75e"; }\n\n.fa-researchgate:before {\n  content: "\\f4f8"; }\n\n.fa-resolving:before {\n  content: "\\f3e7"; }\n\n.fa-restroom:before {\n  content: "\\f7bd"; }\n\n.fa-retweet:before {\n  content: "\\f079"; }\n\n.fa-rev:before {\n  content: "\\f5b2"; }\n\n.fa-ribbon:before {\n  content: "\\f4d6"; }\n\n.fa-ring:before {\n  content: "\\f70b"; }\n\n.fa-road:before {\n  content: "\\f018"; }\n\n.fa-robot:before {\n  content: "\\f544"; }\n\n.fa-rocket:before {\n  content: "\\f135"; }\n\n.fa-rocketchat:before {\n  content: "\\f3e8"; }\n\n.fa-rockrms:before {\n  content: "\\f3e9"; }\n\n.fa-route:before {\n  content: "\\f4d7"; }\n\n.fa-rss:before {\n  content: "\\f09e"; }\n\n.fa-rss-square:before {\n  content: "\\f143"; }\n\n.fa-ruble-sign:before {\n  content: "\\f158"; }\n\n.fa-ruler:before {\n  content: "\\f545"; }\n\n.fa-ruler-combined:before {\n  content: "\\f546"; }\n\n.fa-ruler-horizontal:before {\n  content: "\\f547"; }\n\n.fa-ruler-vertical:before {\n  content: "\\f548"; }\n\n.fa-running:before {\n  content: "\\f70c"; }\n\n.fa-rupee-sign:before {\n  content: "\\f156"; }\n\n.fa-sad-cry:before {\n  content: "\\f5b3"; }\n\n.fa-sad-tear:before {\n  content: "\\f5b4"; }\n\n.fa-safari:before {\n  content: "\\f267"; }\n\n.fa-salesforce:before {\n  content: "\\f83b"; }\n\n.fa-sass:before {\n  content: "\\f41e"; }\n\n.fa-satellite:before {\n  content: "\\f7bf"; }\n\n.fa-satellite-dish:before {\n  content: "\\f7c0"; }\n\n.fa-save:before {\n  content: "\\f0c7"; }\n\n.fa-schlix:before {\n  content: "\\f3ea"; }\n\n.fa-school:before {\n  content: "\\f549"; }\n\n.fa-screwdriver:before {\n  content: "\\f54a"; }\n\n.fa-scribd:before {\n  content: "\\f28a"; }\n\n.fa-scroll:before {\n  content: "\\f70e"; }\n\n.fa-sd-card:before {\n  content: "\\f7c2"; }\n\n.fa-search:before {\n  content: "\\f002"; }\n\n.fa-search-dollar:before {\n  content: "\\f688"; }\n\n.fa-search-location:before {\n  content: "\\f689"; }\n\n.fa-search-minus:before {\n  content: "\\f010"; }\n\n.fa-search-plus:before {\n  content: "\\f00e"; }\n\n.fa-searchengin:before {\n  content: "\\f3eb"; }\n\n.fa-seedling:before {\n  content: "\\f4d8"; }\n\n.fa-sellcast:before {\n  content: "\\f2da"; }\n\n.fa-sellsy:before {\n  content: "\\f213"; }\n\n.fa-server:before {\n  content: "\\f233"; }\n\n.fa-servicestack:before {\n  content: "\\f3ec"; }\n\n.fa-shapes:before {\n  content: "\\f61f"; }\n\n.fa-share:before {\n  content: "\\f064"; }\n\n.fa-share-alt:before {\n  content: "\\f1e0"; }\n\n.fa-share-alt-square:before {\n  content: "\\f1e1"; }\n\n.fa-share-square:before {\n  content: "\\f14d"; }\n\n.fa-shekel-sign:before {\n  content: "\\f20b"; }\n\n.fa-shield-alt:before {\n  content: "\\f3ed"; }\n\n.fa-ship:before {\n  content: "\\f21a"; }\n\n.fa-shipping-fast:before {\n  content: "\\f48b"; }\n\n.fa-shirtsinbulk:before {\n  content: "\\f214"; }\n\n.fa-shoe-prints:before {\n  content: "\\f54b"; }\n\n.fa-shopping-bag:before {\n  content: "\\f290"; }\n\n.fa-shopping-basket:before {\n  content: "\\f291"; }\n\n.fa-shopping-cart:before {\n  content: "\\f07a"; }\n\n.fa-shopware:before {\n  content: "\\f5b5"; }\n\n.fa-shower:before {\n  content: "\\f2cc"; }\n\n.fa-shuttle-van:before {\n  content: "\\f5b6"; }\n\n.fa-sign:before {\n  content: "\\f4d9"; }\n\n.fa-sign-in-alt:before {\n  content: "\\f2f6"; }\n\n.fa-sign-language:before {\n  content: "\\f2a7"; }\n\n.fa-sign-out-alt:before {\n  content: "\\f2f5"; }\n\n.fa-signal:before {\n  content: "\\f012"; }\n\n.fa-signature:before {\n  content: "\\f5b7"; }\n\n.fa-sim-card:before {\n  content: "\\f7c4"; }\n\n.fa-simplybuilt:before {\n  content: "\\f215"; }\n\n.fa-sistrix:before {\n  content: "\\f3ee"; }\n\n.fa-sitemap:before {\n  content: "\\f0e8"; }\n\n.fa-sith:before {\n  content: "\\f512"; }\n\n.fa-skating:before {\n  content: "\\f7c5"; }\n\n.fa-sketch:before {\n  content: "\\f7c6"; }\n\n.fa-skiing:before {\n  content: "\\f7c9"; }\n\n.fa-skiing-nordic:before {\n  content: "\\f7ca"; }\n\n.fa-skull:before {\n  content: "\\f54c"; }\n\n.fa-skull-crossbones:before {\n  content: "\\f714"; }\n\n.fa-skyatlas:before {\n  content: "\\f216"; }\n\n.fa-skype:before {\n  content: "\\f17e"; }\n\n.fa-slack:before {\n  content: "\\f198"; }\n\n.fa-slack-hash:before {\n  content: "\\f3ef"; }\n\n.fa-slash:before {\n  content: "\\f715"; }\n\n.fa-sleigh:before {\n  content: "\\f7cc"; }\n\n.fa-sliders-h:before {\n  content: "\\f1de"; }\n\n.fa-slideshare:before {\n  content: "\\f1e7"; }\n\n.fa-smile:before {\n  content: "\\f118"; }\n\n.fa-smile-beam:before {\n  content: "\\f5b8"; }\n\n.fa-smile-wink:before {\n  content: "\\f4da"; }\n\n.fa-smog:before {\n  content: "\\f75f"; }\n\n.fa-smoking:before {\n  content: "\\f48d"; }\n\n.fa-smoking-ban:before {\n  content: "\\f54d"; }\n\n.fa-sms:before {\n  content: "\\f7cd"; }\n\n.fa-snapchat:before {\n  content: "\\f2ab"; }\n\n.fa-snapchat-ghost:before {\n  content: "\\f2ac"; }\n\n.fa-snapchat-square:before {\n  content: "\\f2ad"; }\n\n.fa-snowboarding:before {\n  content: "\\f7ce"; }\n\n.fa-snowflake:before {\n  content: "\\f2dc"; }\n\n.fa-snowman:before {\n  content: "\\f7d0"; }\n\n.fa-snowplow:before {\n  content: "\\f7d2"; }\n\n.fa-socks:before {\n  content: "\\f696"; }\n\n.fa-solar-panel:before {\n  content: "\\f5ba"; }\n\n.fa-sort:before {\n  content: "\\f0dc"; }\n\n.fa-sort-alpha-down:before {\n  content: "\\f15d"; }\n\n.fa-sort-alpha-down-alt:before {\n  content: "\\f881"; }\n\n.fa-sort-alpha-up:before {\n  content: "\\f15e"; }\n\n.fa-sort-alpha-up-alt:before {\n  content: "\\f882"; }\n\n.fa-sort-amount-down:before {\n  content: "\\f160"; }\n\n.fa-sort-amount-down-alt:before {\n  content: "\\f884"; }\n\n.fa-sort-amount-up:before {\n  content: "\\f161"; }\n\n.fa-sort-amount-up-alt:before {\n  content: "\\f885"; }\n\n.fa-sort-down:before {\n  content: "\\f0dd"; }\n\n.fa-sort-numeric-down:before {\n  content: "\\f162"; }\n\n.fa-sort-numeric-down-alt:before {\n  content: "\\f886"; }\n\n.fa-sort-numeric-up:before {\n  content: "\\f163"; }\n\n.fa-sort-numeric-up-alt:before {\n  content: "\\f887"; }\n\n.fa-sort-up:before {\n  content: "\\f0de"; }\n\n.fa-soundcloud:before {\n  content: "\\f1be"; }\n\n.fa-sourcetree:before {\n  content: "\\f7d3"; }\n\n.fa-spa:before {\n  content: "\\f5bb"; }\n\n.fa-space-shuttle:before {\n  content: "\\f197"; }\n\n.fa-speakap:before {\n  content: "\\f3f3"; }\n\n.fa-speaker-deck:before {\n  content: "\\f83c"; }\n\n.fa-spell-check:before {\n  content: "\\f891"; }\n\n.fa-spider:before {\n  content: "\\f717"; }\n\n.fa-spinner:before {\n  content: "\\f110"; }\n\n.fa-splotch:before {\n  content: "\\f5bc"; }\n\n.fa-spotify:before {\n  content: "\\f1bc"; }\n\n.fa-spray-can:before {\n  content: "\\f5bd"; }\n\n.fa-square:before {\n  content: "\\f0c8"; }\n\n.fa-square-full:before {\n  content: "\\f45c"; }\n\n.fa-square-root-alt:before {\n  content: "\\f698"; }\n\n.fa-squarespace:before {\n  content: "\\f5be"; }\n\n.fa-stack-exchange:before {\n  content: "\\f18d"; }\n\n.fa-stack-overflow:before {\n  content: "\\f16c"; }\n\n.fa-stackpath:before {\n  content: "\\f842"; }\n\n.fa-stamp:before {\n  content: "\\f5bf"; }\n\n.fa-star:before {\n  content: "\\f005"; }\n\n.fa-star-and-crescent:before {\n  content: "\\f699"; }\n\n.fa-star-half:before {\n  content: "\\f089"; }\n\n.fa-star-half-alt:before {\n  content: "\\f5c0"; }\n\n.fa-star-of-david:before {\n  content: "\\f69a"; }\n\n.fa-star-of-life:before {\n  content: "\\f621"; }\n\n.fa-staylinked:before {\n  content: "\\f3f5"; }\n\n.fa-steam:before {\n  content: "\\f1b6"; }\n\n.fa-steam-square:before {\n  content: "\\f1b7"; }\n\n.fa-steam-symbol:before {\n  content: "\\f3f6"; }\n\n.fa-step-backward:before {\n  content: "\\f048"; }\n\n.fa-step-forward:before {\n  content: "\\f051"; }\n\n.fa-stethoscope:before {\n  content: "\\f0f1"; }\n\n.fa-sticker-mule:before {\n  content: "\\f3f7"; }\n\n.fa-sticky-note:before {\n  content: "\\f249"; }\n\n.fa-stop:before {\n  content: "\\f04d"; }\n\n.fa-stop-circle:before {\n  content: "\\f28d"; }\n\n.fa-stopwatch:before {\n  content: "\\f2f2"; }\n\n.fa-store:before {\n  content: "\\f54e"; }\n\n.fa-store-alt:before {\n  content: "\\f54f"; }\n\n.fa-strava:before {\n  content: "\\f428"; }\n\n.fa-stream:before {\n  content: "\\f550"; }\n\n.fa-street-view:before {\n  content: "\\f21d"; }\n\n.fa-strikethrough:before {\n  content: "\\f0cc"; }\n\n.fa-stripe:before {\n  content: "\\f429"; }\n\n.fa-stripe-s:before {\n  content: "\\f42a"; }\n\n.fa-stroopwafel:before {\n  content: "\\f551"; }\n\n.fa-studiovinari:before {\n  content: "\\f3f8"; }\n\n.fa-stumbleupon:before {\n  content: "\\f1a4"; }\n\n.fa-stumbleupon-circle:before {\n  content: "\\f1a3"; }\n\n.fa-subscript:before {\n  content: "\\f12c"; }\n\n.fa-subway:before {\n  content: "\\f239"; }\n\n.fa-suitcase:before {\n  content: "\\f0f2"; }\n\n.fa-suitcase-rolling:before {\n  content: "\\f5c1"; }\n\n.fa-sun:before {\n  content: "\\f185"; }\n\n.fa-superpowers:before {\n  content: "\\f2dd"; }\n\n.fa-superscript:before {\n  content: "\\f12b"; }\n\n.fa-supple:before {\n  content: "\\f3f9"; }\n\n.fa-surprise:before {\n  content: "\\f5c2"; }\n\n.fa-suse:before {\n  content: "\\f7d6"; }\n\n.fa-swatchbook:before {\n  content: "\\f5c3"; }\n\n.fa-swimmer:before {\n  content: "\\f5c4"; }\n\n.fa-swimming-pool:before {\n  content: "\\f5c5"; }\n\n.fa-symfony:before {\n  content: "\\f83d"; }\n\n.fa-synagogue:before {\n  content: "\\f69b"; }\n\n.fa-sync:before {\n  content: "\\f021"; }\n\n.fa-sync-alt:before {\n  content: "\\f2f1"; }\n\n.fa-syringe:before {\n  content: "\\f48e"; }\n\n.fa-table:before {\n  content: "\\f0ce"; }\n\n.fa-table-tennis:before {\n  content: "\\f45d"; }\n\n.fa-tablet:before {\n  content: "\\f10a"; }\n\n.fa-tablet-alt:before {\n  content: "\\f3fa"; }\n\n.fa-tablets:before {\n  content: "\\f490"; }\n\n.fa-tachometer-alt:before {\n  content: "\\f3fd"; }\n\n.fa-tag:before {\n  content: "\\f02b"; }\n\n.fa-tags:before {\n  content: "\\f02c"; }\n\n.fa-tape:before {\n  content: "\\f4db"; }\n\n.fa-tasks:before {\n  content: "\\f0ae"; }\n\n.fa-taxi:before {\n  content: "\\f1ba"; }\n\n.fa-teamspeak:before {\n  content: "\\f4f9"; }\n\n.fa-teeth:before {\n  content: "\\f62e"; }\n\n.fa-teeth-open:before {\n  content: "\\f62f"; }\n\n.fa-telegram:before {\n  content: "\\f2c6"; }\n\n.fa-telegram-plane:before {\n  content: "\\f3fe"; }\n\n.fa-temperature-high:before {\n  content: "\\f769"; }\n\n.fa-temperature-low:before {\n  content: "\\f76b"; }\n\n.fa-tencent-weibo:before {\n  content: "\\f1d5"; }\n\n.fa-tenge:before {\n  content: "\\f7d7"; }\n\n.fa-terminal:before {\n  content: "\\f120"; }\n\n.fa-text-height:before {\n  content: "\\f034"; }\n\n.fa-text-width:before {\n  content: "\\f035"; }\n\n.fa-th:before {\n  content: "\\f00a"; }\n\n.fa-th-large:before {\n  content: "\\f009"; }\n\n.fa-th-list:before {\n  content: "\\f00b"; }\n\n.fa-the-red-yeti:before {\n  content: "\\f69d"; }\n\n.fa-theater-masks:before {\n  content: "\\f630"; }\n\n.fa-themeco:before {\n  content: "\\f5c6"; }\n\n.fa-themeisle:before {\n  content: "\\f2b2"; }\n\n.fa-thermometer:before {\n  content: "\\f491"; }\n\n.fa-thermometer-empty:before {\n  content: "\\f2cb"; }\n\n.fa-thermometer-full:before {\n  content: "\\f2c7"; }\n\n.fa-thermometer-half:before {\n  content: "\\f2c9"; }\n\n.fa-thermometer-quarter:before {\n  content: "\\f2ca"; }\n\n.fa-thermometer-three-quarters:before {\n  content: "\\f2c8"; }\n\n.fa-think-peaks:before {\n  content: "\\f731"; }\n\n.fa-thumbs-down:before {\n  content: "\\f165"; }\n\n.fa-thumbs-up:before {\n  content: "\\f164"; }\n\n.fa-thumbtack:before {\n  content: "\\f08d"; }\n\n.fa-ticket-alt:before {\n  content: "\\f3ff"; }\n\n.fa-times:before {\n  content: "\\f00d"; }\n\n.fa-times-circle:before {\n  content: "\\f057"; }\n\n.fa-tint:before {\n  content: "\\f043"; }\n\n.fa-tint-slash:before {\n  content: "\\f5c7"; }\n\n.fa-tired:before {\n  content: "\\f5c8"; }\n\n.fa-toggle-off:before {\n  content: "\\f204"; }\n\n.fa-toggle-on:before {\n  content: "\\f205"; }\n\n.fa-toilet:before {\n  content: "\\f7d8"; }\n\n.fa-toilet-paper:before {\n  content: "\\f71e"; }\n\n.fa-toolbox:before {\n  content: "\\f552"; }\n\n.fa-tools:before {\n  content: "\\f7d9"; }\n\n.fa-tooth:before {\n  content: "\\f5c9"; }\n\n.fa-torah:before {\n  content: "\\f6a0"; }\n\n.fa-torii-gate:before {\n  content: "\\f6a1"; }\n\n.fa-tractor:before {\n  content: "\\f722"; }\n\n.fa-trade-federation:before {\n  content: "\\f513"; }\n\n.fa-trademark:before {\n  content: "\\f25c"; }\n\n.fa-traffic-light:before {\n  content: "\\f637"; }\n\n.fa-train:before {\n  content: "\\f238"; }\n\n.fa-tram:before {\n  content: "\\f7da"; }\n\n.fa-transgender:before {\n  content: "\\f224"; }\n\n.fa-transgender-alt:before {\n  content: "\\f225"; }\n\n.fa-trash:before {\n  content: "\\f1f8"; }\n\n.fa-trash-alt:before {\n  content: "\\f2ed"; }\n\n.fa-trash-restore:before {\n  content: "\\f829"; }\n\n.fa-trash-restore-alt:before {\n  content: "\\f82a"; }\n\n.fa-tree:before {\n  content: "\\f1bb"; }\n\n.fa-trello:before {\n  content: "\\f181"; }\n\n.fa-tripadvisor:before {\n  content: "\\f262"; }\n\n.fa-trophy:before {\n  content: "\\f091"; }\n\n.fa-truck:before {\n  content: "\\f0d1"; }\n\n.fa-truck-loading:before {\n  content: "\\f4de"; }\n\n.fa-truck-monster:before {\n  content: "\\f63b"; }\n\n.fa-truck-moving:before {\n  content: "\\f4df"; }\n\n.fa-truck-pickup:before {\n  content: "\\f63c"; }\n\n.fa-tshirt:before {\n  content: "\\f553"; }\n\n.fa-tty:before {\n  content: "\\f1e4"; }\n\n.fa-tumblr:before {\n  content: "\\f173"; }\n\n.fa-tumblr-square:before {\n  content: "\\f174"; }\n\n.fa-tv:before {\n  content: "\\f26c"; }\n\n.fa-twitch:before {\n  content: "\\f1e8"; }\n\n.fa-twitter:before {\n  content: "\\f099"; }\n\n.fa-twitter-square:before {\n  content: "\\f081"; }\n\n.fa-typo3:before {\n  content: "\\f42b"; }\n\n.fa-uber:before {\n  content: "\\f402"; }\n\n.fa-ubuntu:before {\n  content: "\\f7df"; }\n\n.fa-uikit:before {\n  content: "\\f403"; }\n\n.fa-umbrella:before {\n  content: "\\f0e9"; }\n\n.fa-umbrella-beach:before {\n  content: "\\f5ca"; }\n\n.fa-underline:before {\n  content: "\\f0cd"; }\n\n.fa-undo:before {\n  content: "\\f0e2"; }\n\n.fa-undo-alt:before {\n  content: "\\f2ea"; }\n\n.fa-uniregistry:before {\n  content: "\\f404"; }\n\n.fa-universal-access:before {\n  content: "\\f29a"; }\n\n.fa-university:before {\n  content: "\\f19c"; }\n\n.fa-unlink:before {\n  content: "\\f127"; }\n\n.fa-unlock:before {\n  content: "\\f09c"; }\n\n.fa-unlock-alt:before {\n  content: "\\f13e"; }\n\n.fa-untappd:before {\n  content: "\\f405"; }\n\n.fa-upload:before {\n  content: "\\f093"; }\n\n.fa-ups:before {\n  content: "\\f7e0"; }\n\n.fa-usb:before {\n  content: "\\f287"; }\n\n.fa-user:before {\n  content: "\\f007"; }\n\n.fa-user-alt:before {\n  content: "\\f406"; }\n\n.fa-user-alt-slash:before {\n  content: "\\f4fa"; }\n\n.fa-user-astronaut:before {\n  content: "\\f4fb"; }\n\n.fa-user-check:before {\n  content: "\\f4fc"; }\n\n.fa-user-circle:before {\n  content: "\\f2bd"; }\n\n.fa-user-clock:before {\n  content: "\\f4fd"; }\n\n.fa-user-cog:before {\n  content: "\\f4fe"; }\n\n.fa-user-edit:before {\n  content: "\\f4ff"; }\n\n.fa-user-friends:before {\n  content: "\\f500"; }\n\n.fa-user-graduate:before {\n  content: "\\f501"; }\n\n.fa-user-injured:before {\n  content: "\\f728"; }\n\n.fa-user-lock:before {\n  content: "\\f502"; }\n\n.fa-user-md:before {\n  content: "\\f0f0"; }\n\n.fa-user-minus:before {\n  content: "\\f503"; }\n\n.fa-user-ninja:before {\n  content: "\\f504"; }\n\n.fa-user-nurse:before {\n  content: "\\f82f"; }\n\n.fa-user-plus:before {\n  content: "\\f234"; }\n\n.fa-user-secret:before {\n  content: "\\f21b"; }\n\n.fa-user-shield:before {\n  content: "\\f505"; }\n\n.fa-user-slash:before {\n  content: "\\f506"; }\n\n.fa-user-tag:before {\n  content: "\\f507"; }\n\n.fa-user-tie:before {\n  content: "\\f508"; }\n\n.fa-user-times:before {\n  content: "\\f235"; }\n\n.fa-users:before {\n  content: "\\f0c0"; }\n\n.fa-users-cog:before {\n  content: "\\f509"; }\n\n.fa-usps:before {\n  content: "\\f7e1"; }\n\n.fa-ussunnah:before {\n  content: "\\f407"; }\n\n.fa-utensil-spoon:before {\n  content: "\\f2e5"; }\n\n.fa-utensils:before {\n  content: "\\f2e7"; }\n\n.fa-vaadin:before {\n  content: "\\f408"; }\n\n.fa-vector-square:before {\n  content: "\\f5cb"; }\n\n.fa-venus:before {\n  content: "\\f221"; }\n\n.fa-venus-double:before {\n  content: "\\f226"; }\n\n.fa-venus-mars:before {\n  content: "\\f228"; }\n\n.fa-viacoin:before {\n  content: "\\f237"; }\n\n.fa-viadeo:before {\n  content: "\\f2a9"; }\n\n.fa-viadeo-square:before {\n  content: "\\f2aa"; }\n\n.fa-vial:before {\n  content: "\\f492"; }\n\n.fa-vials:before {\n  content: "\\f493"; }\n\n.fa-viber:before {\n  content: "\\f409"; }\n\n.fa-video:before {\n  content: "\\f03d"; }\n\n.fa-video-slash:before {\n  content: "\\f4e2"; }\n\n.fa-vihara:before {\n  content: "\\f6a7"; }\n\n.fa-vimeo:before {\n  content: "\\f40a"; }\n\n.fa-vimeo-square:before {\n  content: "\\f194"; }\n\n.fa-vimeo-v:before {\n  content: "\\f27d"; }\n\n.fa-vine:before {\n  content: "\\f1ca"; }\n\n.fa-vk:before {\n  content: "\\f189"; }\n\n.fa-vnv:before {\n  content: "\\f40b"; }\n\n.fa-voicemail:before {\n  content: "\\f897"; }\n\n.fa-volleyball-ball:before {\n  content: "\\f45f"; }\n\n.fa-volume-down:before {\n  content: "\\f027"; }\n\n.fa-volume-mute:before {\n  content: "\\f6a9"; }\n\n.fa-volume-off:before {\n  content: "\\f026"; }\n\n.fa-volume-up:before {\n  content: "\\f028"; }\n\n.fa-vote-yea:before {\n  content: "\\f772"; }\n\n.fa-vr-cardboard:before {\n  content: "\\f729"; }\n\n.fa-vuejs:before {\n  content: "\\f41f"; }\n\n.fa-walking:before {\n  content: "\\f554"; }\n\n.fa-wallet:before {\n  content: "\\f555"; }\n\n.fa-warehouse:before {\n  content: "\\f494"; }\n\n.fa-water:before {\n  content: "\\f773"; }\n\n.fa-wave-square:before {\n  content: "\\f83e"; }\n\n.fa-waze:before {\n  content: "\\f83f"; }\n\n.fa-weebly:before {\n  content: "\\f5cc"; }\n\n.fa-weibo:before {\n  content: "\\f18a"; }\n\n.fa-weight:before {\n  content: "\\f496"; }\n\n.fa-weight-hanging:before {\n  content: "\\f5cd"; }\n\n.fa-weixin:before {\n  content: "\\f1d7"; }\n\n.fa-whatsapp:before {\n  content: "\\f232"; }\n\n.fa-whatsapp-square:before {\n  content: "\\f40c"; }\n\n.fa-wheelchair:before {\n  content: "\\f193"; }\n\n.fa-whmcs:before {\n  content: "\\f40d"; }\n\n.fa-wifi:before {\n  content: "\\f1eb"; }\n\n.fa-wikipedia-w:before {\n  content: "\\f266"; }\n\n.fa-wind:before {\n  content: "\\f72e"; }\n\n.fa-window-close:before {\n  content: "\\f410"; }\n\n.fa-window-maximize:before {\n  content: "\\f2d0"; }\n\n.fa-window-minimize:before {\n  content: "\\f2d1"; }\n\n.fa-window-restore:before {\n  content: "\\f2d2"; }\n\n.fa-windows:before {\n  content: "\\f17a"; }\n\n.fa-wine-bottle:before {\n  content: "\\f72f"; }\n\n.fa-wine-glass:before {\n  content: "\\f4e3"; }\n\n.fa-wine-glass-alt:before {\n  content: "\\f5ce"; }\n\n.fa-wix:before {\n  content: "\\f5cf"; }\n\n.fa-wizards-of-the-coast:before {\n  content: "\\f730"; }\n\n.fa-wolf-pack-battalion:before {\n  content: "\\f514"; }\n\n.fa-won-sign:before {\n  content: "\\f159"; }\n\n.fa-wordpress:before {\n  content: "\\f19a"; }\n\n.fa-wordpress-simple:before {\n  content: "\\f411"; }\n\n.fa-wpbeginner:before {\n  content: "\\f297"; }\n\n.fa-wpexplorer:before {\n  content: "\\f2de"; }\n\n.fa-wpforms:before {\n  content: "\\f298"; }\n\n.fa-wpressr:before {\n  content: "\\f3e4"; }\n\n.fa-wrench:before {\n  content: "\\f0ad"; }\n\n.fa-x-ray:before {\n  content: "\\f497"; }\n\n.fa-xbox:before {\n  content: "\\f412"; }\n\n.fa-xing:before {\n  content: "\\f168"; }\n\n.fa-xing-square:before {\n  content: "\\f169"; }\n\n.fa-y-combinator:before {\n  content: "\\f23b"; }\n\n.fa-yahoo:before {\n  content: "\\f19e"; }\n\n.fa-yammer:before {\n  content: "\\f840"; }\n\n.fa-yandex:before {\n  content: "\\f413"; }\n\n.fa-yandex-international:before {\n  content: "\\f414"; }\n\n.fa-yarn:before {\n  content: "\\f7e3"; }\n\n.fa-yelp:before {\n  content: "\\f1e9"; }\n\n.fa-yen-sign:before {\n  content: "\\f157"; }\n\n.fa-yin-yang:before {\n  content: "\\f6ad"; }\n\n.fa-yoast:before {\n  content: "\\f2b1"; }\n\n.fa-youtube:before {\n  content: "\\f167"; }\n\n.fa-youtube-square:before {\n  content: "\\f431"; }\n\n.fa-zhihu:before {\n  content: "\\f63f"; }\n\n.sr-only {\n  border: 0;\n  clip: rect(0, 0, 0, 0);\n  height: 1px;\n  margin: -1px;\n  overflow: hidden;\n  padding: 0;\n  position: absolute;\n  width: 1px; }\n\n.sr-only-focusable:active, .sr-only-focusable:focus {\n  clip: auto;\n  height: auto;\n  margin: 0;\n  overflow: visible;\n  position: static;\n  width: auto; }\n@font-face {\n  font-family: \'Font Awesome 5 Brands\';\n  font-style: normal;\n  font-weight: normal;\n  font-display: auto;\n  src: url("/css-resources/504204804.eot");\n  src: url("/css-resources/504204804.eot") format("embedded-opentype"), url("/css-resources/_773874668.woff2") format("woff2"), url("/css-resources/_1548984354.woff") format("woff"), url("/css-resources/504219360.ttf") format("truetype"), url("/css-resources/504218462.svg") format("svg"); }\n\n.fab {\n  font-family: \'Font Awesome 5 Brands\'; }\n@font-face {\n  font-family: \'Font Awesome 5 Free\';\n  font-style: normal;\n  font-weight: 400;\n  font-display: auto;\n  src: url("/css-resources/48664330.eot");\n  src: url("/css-resources/48664330.eot") format("embedded-opentype"), url("/css-resources/_461605990.woff2") format("woff2"), url("/css-resources/1509130136.woff") format("woff"), url("/css-resources/48678886.ttf") format("truetype"), url("/css-resources/48677988.svg") format("svg"); }\n\n.far {\n  font-family: \'Font Awesome 5 Free\';\n  font-weight: 400; }\n@font-face {\n  font-family: \'Font Awesome 5 Free\';\n  font-style: normal;\n  font-weight: 900;\n  font-display: auto;\n  src: url("/css-resources/_1767211490.eot");\n  src: url("/css-resources/_1767211490.eot") format("embedded-opentype"), url("/css-resources/_1761546834.woff2") format("woff2"), url("/css-resources/1051554564.woff") format("woff"), url("/css-resources/_1767196934.ttf") format("truetype"), url("/css-resources/_1767197832.svg") format("svg"); }\n\n.fa,\n.fas {\n  font-family: \'Font Awesome 5 Free\';\n  font-weight: 900; }\n');
}
// bulma/css/bulma.min.css
$fsx.f[17] =
function(){
$fsx.r(18)('bulma/css/bulma.min.css', '/*! bulma.io v0.7.5 | MIT License | github.com/jgthms/bulma */@-webkit-keyframes spinAround{from{-webkit-transform:rotate(0);transform:rotate(0)}to{-webkit-transform:rotate(359deg);transform:rotate(359deg)}}@keyframes spinAround{from{-webkit-transform:rotate(0);transform:rotate(0)}to{-webkit-transform:rotate(359deg);transform:rotate(359deg)}}.breadcrumb,.button,.delete,.file,.is-unselectable,.modal-close,.pagination-ellipsis,.pagination-link,.pagination-next,.pagination-previous,.tabs{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.navbar-link:not(.is-arrowless)::after,.select:not(.is-multiple):not(.is-loading)::after{border:3px solid transparent;border-radius:2px;border-right:0;border-top:0;content:" ";display:block;height:.625em;margin-top:-.4375em;pointer-events:none;position:absolute;top:50%;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);-webkit-transform-origin:center;transform-origin:center;width:.625em}.block:not(:last-child),.box:not(:last-child),.breadcrumb:not(:last-child),.content:not(:last-child),.highlight:not(:last-child),.level:not(:last-child),.list:not(:last-child),.message:not(:last-child),.notification:not(:last-child),.progress:not(:last-child),.subtitle:not(:last-child),.table-container:not(:last-child),.table:not(:last-child),.tabs:not(:last-child),.title:not(:last-child){margin-bottom:1.5rem}.delete,.modal-close{-moz-appearance:none;-webkit-appearance:none;background-color:rgba(10,10,10,.2);border:none;border-radius:290486px;cursor:pointer;pointer-events:auto;display:inline-block;flex-grow:0;flex-shrink:0;font-size:0;height:20px;max-height:20px;max-width:20px;min-height:20px;min-width:20px;outline:0;position:relative;vertical-align:top;width:20px}.delete::after,.delete::before,.modal-close::after,.modal-close::before{background-color:#fff;content:"";display:block;left:50%;position:absolute;top:50%;-webkit-transform:translateX(-50%) translateY(-50%) rotate(45deg);transform:translateX(-50%) translateY(-50%) rotate(45deg);-webkit-transform-origin:center center;transform-origin:center center}.delete::before,.modal-close::before{height:2px;width:50%}.delete::after,.modal-close::after{height:50%;width:2px}.delete:focus,.delete:hover,.modal-close:focus,.modal-close:hover{background-color:rgba(10,10,10,.3)}.delete:active,.modal-close:active{background-color:rgba(10,10,10,.4)}.is-small.delete,.is-small.modal-close{height:16px;max-height:16px;max-width:16px;min-height:16px;min-width:16px;width:16px}.is-medium.delete,.is-medium.modal-close{height:24px;max-height:24px;max-width:24px;min-height:24px;min-width:24px;width:24px}.is-large.delete,.is-large.modal-close{height:32px;max-height:32px;max-width:32px;min-height:32px;min-width:32px;width:32px}.button.is-loading::after,.control.is-loading::after,.loader,.select.is-loading::after{-webkit-animation:spinAround .5s infinite linear;animation:spinAround .5s infinite linear;border:2px solid #dbdbdb;border-radius:290486px;border-right-color:transparent;border-top-color:transparent;content:"";display:block;height:1em;position:relative;width:1em}.hero-video,.image.is-16by9 .has-ratio,.image.is-16by9 img,.image.is-1by1 .has-ratio,.image.is-1by1 img,.image.is-1by2 .has-ratio,.image.is-1by2 img,.image.is-1by3 .has-ratio,.image.is-1by3 img,.image.is-2by1 .has-ratio,.image.is-2by1 img,.image.is-2by3 .has-ratio,.image.is-2by3 img,.image.is-3by1 .has-ratio,.image.is-3by1 img,.image.is-3by2 .has-ratio,.image.is-3by2 img,.image.is-3by4 .has-ratio,.image.is-3by4 img,.image.is-3by5 .has-ratio,.image.is-3by5 img,.image.is-4by3 .has-ratio,.image.is-4by3 img,.image.is-4by5 .has-ratio,.image.is-4by5 img,.image.is-5by3 .has-ratio,.image.is-5by3 img,.image.is-5by4 .has-ratio,.image.is-5by4 img,.image.is-9by16 .has-ratio,.image.is-9by16 img,.image.is-square .has-ratio,.image.is-square img,.is-overlay,.modal,.modal-background{bottom:0;left:0;position:absolute;right:0;top:0}.button,.file-cta,.file-name,.input,.pagination-ellipsis,.pagination-link,.pagination-next,.pagination-previous,.select select,.textarea{-moz-appearance:none;-webkit-appearance:none;align-items:center;border:1px solid transparent;border-radius:4px;box-shadow:none;display:inline-flex;font-size:1rem;height:2.25em;justify-content:flex-start;line-height:1.5;padding-bottom:calc(.375em - 1px);padding-left:calc(.625em - 1px);padding-right:calc(.625em - 1px);padding-top:calc(.375em - 1px);position:relative;vertical-align:top}.button:active,.button:focus,.file-cta:active,.file-cta:focus,.file-name:active,.file-name:focus,.input:active,.input:focus,.is-active.button,.is-active.file-cta,.is-active.file-name,.is-active.input,.is-active.pagination-ellipsis,.is-active.pagination-link,.is-active.pagination-next,.is-active.pagination-previous,.is-active.textarea,.is-focused.button,.is-focused.file-cta,.is-focused.file-name,.is-focused.input,.is-focused.pagination-ellipsis,.is-focused.pagination-link,.is-focused.pagination-next,.is-focused.pagination-previous,.is-focused.textarea,.pagination-ellipsis:active,.pagination-ellipsis:focus,.pagination-link:active,.pagination-link:focus,.pagination-next:active,.pagination-next:focus,.pagination-previous:active,.pagination-previous:focus,.select select.is-active,.select select.is-focused,.select select:active,.select select:focus,.textarea:active,.textarea:focus{outline:0}.button[disabled],.file-cta[disabled],.file-name[disabled],.input[disabled],.pagination-ellipsis[disabled],.pagination-link[disabled],.pagination-next[disabled],.pagination-previous[disabled],.select fieldset[disabled] select,.select select[disabled],.textarea[disabled],fieldset[disabled] .button,fieldset[disabled] .file-cta,fieldset[disabled] .file-name,fieldset[disabled] .input,fieldset[disabled] .pagination-ellipsis,fieldset[disabled] .pagination-link,fieldset[disabled] .pagination-next,fieldset[disabled] .pagination-previous,fieldset[disabled] .select select,fieldset[disabled] .textarea{cursor:not-allowed}/*! minireset.css v0.0.4 | MIT License | github.com/jgthms/minireset.css */blockquote,body,dd,dl,dt,fieldset,figure,h1,h2,h3,h4,h5,h6,hr,html,iframe,legend,li,ol,p,pre,textarea,ul{margin:0;padding:0}h1,h2,h3,h4,h5,h6{font-size:100%;font-weight:400}ul{list-style:none}button,input,select,textarea{margin:0}html{box-sizing:border-box}*,::after,::before{box-sizing:inherit}embed,iframe,img,object,video{height:auto;max-width:100%}audio{max-width:100%}iframe{border:0}table{border-collapse:collapse;border-spacing:0}td,th{padding:0}td:not([align]),th:not([align]){text-align:left}html{background-color:#fff;font-size:16px;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;min-width:300px;overflow-x:hidden;overflow-y:scroll;text-rendering:optimizeLegibility;-webkit-text-size-adjust:100%;-moz-text-size-adjust:100%;-ms-text-size-adjust:100%;text-size-adjust:100%}article,aside,figure,footer,header,hgroup,section{display:block}body,button,input,select,textarea{font-family:BlinkMacSystemFont,-apple-system,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Fira Sans","Droid Sans","Helvetica Neue",Helvetica,Arial,sans-serif}code,pre{-moz-osx-font-smoothing:auto;-webkit-font-smoothing:auto;font-family:monospace}body{color:#4a4a4a;font-size:1em;font-weight:400;line-height:1.5}a{color:#3273dc;cursor:pointer;text-decoration:none}a strong{color:currentColor}a:hover{color:#363636}code{background-color:#f5f5f5;color:#ff3860;font-size:.875em;font-weight:400;padding:.25em .5em .25em}hr{background-color:#f5f5f5;border:none;display:block;height:2px;margin:1.5rem 0}img{height:auto;max-width:100%}input[type=checkbox],input[type=radio]{vertical-align:baseline}small{font-size:.875em}span{font-style:inherit;font-weight:inherit}strong{color:#363636;font-weight:700}fieldset{border:none}pre{-webkit-overflow-scrolling:touch;background-color:#f5f5f5;color:#4a4a4a;font-size:.875em;overflow-x:auto;padding:1.25rem 1.5rem;white-space:pre;word-wrap:normal}pre code{background-color:transparent;color:currentColor;font-size:1em;padding:0}table td,table th{vertical-align:top}table td:not([align]),table th:not([align]){text-align:left}table th{color:#363636}.is-clearfix::after{clear:both;content:" ";display:table}.is-pulled-left{float:left!important}.is-pulled-right{float:right!important}.is-clipped{overflow:hidden!important}.is-size-1{font-size:3rem!important}.is-size-2{font-size:2.5rem!important}.is-size-3{font-size:2rem!important}.is-size-4{font-size:1.5rem!important}.is-size-5{font-size:1.25rem!important}.is-size-6{font-size:1rem!important}.is-size-7{font-size:.75rem!important}@media screen and (max-width:768px){.is-size-1-mobile{font-size:3rem!important}.is-size-2-mobile{font-size:2.5rem!important}.is-size-3-mobile{font-size:2rem!important}.is-size-4-mobile{font-size:1.5rem!important}.is-size-5-mobile{font-size:1.25rem!important}.is-size-6-mobile{font-size:1rem!important}.is-size-7-mobile{font-size:.75rem!important}}@media screen and (min-width:769px),print{.is-size-1-tablet{font-size:3rem!important}.is-size-2-tablet{font-size:2.5rem!important}.is-size-3-tablet{font-size:2rem!important}.is-size-4-tablet{font-size:1.5rem!important}.is-size-5-tablet{font-size:1.25rem!important}.is-size-6-tablet{font-size:1rem!important}.is-size-7-tablet{font-size:.75rem!important}}@media screen and (max-width:1023px){.is-size-1-touch{font-size:3rem!important}.is-size-2-touch{font-size:2.5rem!important}.is-size-3-touch{font-size:2rem!important}.is-size-4-touch{font-size:1.5rem!important}.is-size-5-touch{font-size:1.25rem!important}.is-size-6-touch{font-size:1rem!important}.is-size-7-touch{font-size:.75rem!important}}@media screen and (min-width:1024px){.is-size-1-desktop{font-size:3rem!important}.is-size-2-desktop{font-size:2.5rem!important}.is-size-3-desktop{font-size:2rem!important}.is-size-4-desktop{font-size:1.5rem!important}.is-size-5-desktop{font-size:1.25rem!important}.is-size-6-desktop{font-size:1rem!important}.is-size-7-desktop{font-size:.75rem!important}}@media screen and (min-width:1216px){.is-size-1-widescreen{font-size:3rem!important}.is-size-2-widescreen{font-size:2.5rem!important}.is-size-3-widescreen{font-size:2rem!important}.is-size-4-widescreen{font-size:1.5rem!important}.is-size-5-widescreen{font-size:1.25rem!important}.is-size-6-widescreen{font-size:1rem!important}.is-size-7-widescreen{font-size:.75rem!important}}@media screen and (min-width:1408px){.is-size-1-fullhd{font-size:3rem!important}.is-size-2-fullhd{font-size:2.5rem!important}.is-size-3-fullhd{font-size:2rem!important}.is-size-4-fullhd{font-size:1.5rem!important}.is-size-5-fullhd{font-size:1.25rem!important}.is-size-6-fullhd{font-size:1rem!important}.is-size-7-fullhd{font-size:.75rem!important}}.has-text-centered{text-align:center!important}.has-text-justified{text-align:justify!important}.has-text-left{text-align:left!important}.has-text-right{text-align:right!important}@media screen and (max-width:768px){.has-text-centered-mobile{text-align:center!important}}@media screen and (min-width:769px),print{.has-text-centered-tablet{text-align:center!important}}@media screen and (min-width:769px) and (max-width:1023px){.has-text-centered-tablet-only{text-align:center!important}}@media screen and (max-width:1023px){.has-text-centered-touch{text-align:center!important}}@media screen and (min-width:1024px){.has-text-centered-desktop{text-align:center!important}}@media screen and (min-width:1024px) and (max-width:1215px){.has-text-centered-desktop-only{text-align:center!important}}@media screen and (min-width:1216px){.has-text-centered-widescreen{text-align:center!important}}@media screen and (min-width:1216px) and (max-width:1407px){.has-text-centered-widescreen-only{text-align:center!important}}@media screen and (min-width:1408px){.has-text-centered-fullhd{text-align:center!important}}@media screen and (max-width:768px){.has-text-justified-mobile{text-align:justify!important}}@media screen and (min-width:769px),print{.has-text-justified-tablet{text-align:justify!important}}@media screen and (min-width:769px) and (max-width:1023px){.has-text-justified-tablet-only{text-align:justify!important}}@media screen and (max-width:1023px){.has-text-justified-touch{text-align:justify!important}}@media screen and (min-width:1024px){.has-text-justified-desktop{text-align:justify!important}}@media screen and (min-width:1024px) and (max-width:1215px){.has-text-justified-desktop-only{text-align:justify!important}}@media screen and (min-width:1216px){.has-text-justified-widescreen{text-align:justify!important}}@media screen and (min-width:1216px) and (max-width:1407px){.has-text-justified-widescreen-only{text-align:justify!important}}@media screen and (min-width:1408px){.has-text-justified-fullhd{text-align:justify!important}}@media screen and (max-width:768px){.has-text-left-mobile{text-align:left!important}}@media screen and (min-width:769px),print{.has-text-left-tablet{text-align:left!important}}@media screen and (min-width:769px) and (max-width:1023px){.has-text-left-tablet-only{text-align:left!important}}@media screen and (max-width:1023px){.has-text-left-touch{text-align:left!important}}@media screen and (min-width:1024px){.has-text-left-desktop{text-align:left!important}}@media screen and (min-width:1024px) and (max-width:1215px){.has-text-left-desktop-only{text-align:left!important}}@media screen and (min-width:1216px){.has-text-left-widescreen{text-align:left!important}}@media screen and (min-width:1216px) and (max-width:1407px){.has-text-left-widescreen-only{text-align:left!important}}@media screen and (min-width:1408px){.has-text-left-fullhd{text-align:left!important}}@media screen and (max-width:768px){.has-text-right-mobile{text-align:right!important}}@media screen and (min-width:769px),print{.has-text-right-tablet{text-align:right!important}}@media screen and (min-width:769px) and (max-width:1023px){.has-text-right-tablet-only{text-align:right!important}}@media screen and (max-width:1023px){.has-text-right-touch{text-align:right!important}}@media screen and (min-width:1024px){.has-text-right-desktop{text-align:right!important}}@media screen and (min-width:1024px) and (max-width:1215px){.has-text-right-desktop-only{text-align:right!important}}@media screen and (min-width:1216px){.has-text-right-widescreen{text-align:right!important}}@media screen and (min-width:1216px) and (max-width:1407px){.has-text-right-widescreen-only{text-align:right!important}}@media screen and (min-width:1408px){.has-text-right-fullhd{text-align:right!important}}.is-capitalized{text-transform:capitalize!important}.is-lowercase{text-transform:lowercase!important}.is-uppercase{text-transform:uppercase!important}.is-italic{font-style:italic!important}.has-text-white{color:#fff!important}a.has-text-white:focus,a.has-text-white:hover{color:#e6e6e6!important}.has-background-white{background-color:#fff!important}.has-text-black{color:#0a0a0a!important}a.has-text-black:focus,a.has-text-black:hover{color:#000!important}.has-background-black{background-color:#0a0a0a!important}.has-text-light{color:#f5f5f5!important}a.has-text-light:focus,a.has-text-light:hover{color:#dbdbdb!important}.has-background-light{background-color:#f5f5f5!important}.has-text-dark{color:#363636!important}a.has-text-dark:focus,a.has-text-dark:hover{color:#1c1c1c!important}.has-background-dark{background-color:#363636!important}.has-text-primary{color:#00d1b2!important}a.has-text-primary:focus,a.has-text-primary:hover{color:#009e86!important}.has-background-primary{background-color:#00d1b2!important}.has-text-link{color:#3273dc!important}a.has-text-link:focus,a.has-text-link:hover{color:#205bbc!important}.has-background-link{background-color:#3273dc!important}.has-text-info{color:#209cee!important}a.has-text-info:focus,a.has-text-info:hover{color:#0f81cc!important}.has-background-info{background-color:#209cee!important}.has-text-success{color:#23d160!important}a.has-text-success:focus,a.has-text-success:hover{color:#1ca64c!important}.has-background-success{background-color:#23d160!important}.has-text-warning{color:#ffdd57!important}a.has-text-warning:focus,a.has-text-warning:hover{color:#ffd324!important}.has-background-warning{background-color:#ffdd57!important}.has-text-danger{color:#ff3860!important}a.has-text-danger:focus,a.has-text-danger:hover{color:#ff0537!important}.has-background-danger{background-color:#ff3860!important}.has-text-black-bis{color:#121212!important}.has-background-black-bis{background-color:#121212!important}.has-text-black-ter{color:#242424!important}.has-background-black-ter{background-color:#242424!important}.has-text-grey-darker{color:#363636!important}.has-background-grey-darker{background-color:#363636!important}.has-text-grey-dark{color:#4a4a4a!important}.has-background-grey-dark{background-color:#4a4a4a!important}.has-text-grey{color:#7a7a7a!important}.has-background-grey{background-color:#7a7a7a!important}.has-text-grey-light{color:#b5b5b5!important}.has-background-grey-light{background-color:#b5b5b5!important}.has-text-grey-lighter{color:#dbdbdb!important}.has-background-grey-lighter{background-color:#dbdbdb!important}.has-text-white-ter{color:#f5f5f5!important}.has-background-white-ter{background-color:#f5f5f5!important}.has-text-white-bis{color:#fafafa!important}.has-background-white-bis{background-color:#fafafa!important}.has-text-weight-light{font-weight:300!important}.has-text-weight-normal{font-weight:400!important}.has-text-weight-medium{font-weight:500!important}.has-text-weight-semibold{font-weight:600!important}.has-text-weight-bold{font-weight:700!important}.is-family-primary{font-family:BlinkMacSystemFont,-apple-system,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Fira Sans","Droid Sans","Helvetica Neue",Helvetica,Arial,sans-serif!important}.is-family-secondary{font-family:BlinkMacSystemFont,-apple-system,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Fira Sans","Droid Sans","Helvetica Neue",Helvetica,Arial,sans-serif!important}.is-family-sans-serif{font-family:BlinkMacSystemFont,-apple-system,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Fira Sans","Droid Sans","Helvetica Neue",Helvetica,Arial,sans-serif!important}.is-family-monospace{font-family:monospace!important}.is-family-code{font-family:monospace!important}.is-block{display:block!important}@media screen and (max-width:768px){.is-block-mobile{display:block!important}}@media screen and (min-width:769px),print{.is-block-tablet{display:block!important}}@media screen and (min-width:769px) and (max-width:1023px){.is-block-tablet-only{display:block!important}}@media screen and (max-width:1023px){.is-block-touch{display:block!important}}@media screen and (min-width:1024px){.is-block-desktop{display:block!important}}@media screen and (min-width:1024px) and (max-width:1215px){.is-block-desktop-only{display:block!important}}@media screen and (min-width:1216px){.is-block-widescreen{display:block!important}}@media screen and (min-width:1216px) and (max-width:1407px){.is-block-widescreen-only{display:block!important}}@media screen and (min-width:1408px){.is-block-fullhd{display:block!important}}.is-flex{display:flex!important}@media screen and (max-width:768px){.is-flex-mobile{display:flex!important}}@media screen and (min-width:769px),print{.is-flex-tablet{display:flex!important}}@media screen and (min-width:769px) and (max-width:1023px){.is-flex-tablet-only{display:flex!important}}@media screen and (max-width:1023px){.is-flex-touch{display:flex!important}}@media screen and (min-width:1024px){.is-flex-desktop{display:flex!important}}@media screen and (min-width:1024px) and (max-width:1215px){.is-flex-desktop-only{display:flex!important}}@media screen and (min-width:1216px){.is-flex-widescreen{display:flex!important}}@media screen and (min-width:1216px) and (max-width:1407px){.is-flex-widescreen-only{display:flex!important}}@media screen and (min-width:1408px){.is-flex-fullhd{display:flex!important}}.is-inline{display:inline!important}@media screen and (max-width:768px){.is-inline-mobile{display:inline!important}}@media screen and (min-width:769px),print{.is-inline-tablet{display:inline!important}}@media screen and (min-width:769px) and (max-width:1023px){.is-inline-tablet-only{display:inline!important}}@media screen and (max-width:1023px){.is-inline-touch{display:inline!important}}@media screen and (min-width:1024px){.is-inline-desktop{display:inline!important}}@media screen and (min-width:1024px) and (max-width:1215px){.is-inline-desktop-only{display:inline!important}}@media screen and (min-width:1216px){.is-inline-widescreen{display:inline!important}}@media screen and (min-width:1216px) and (max-width:1407px){.is-inline-widescreen-only{display:inline!important}}@media screen and (min-width:1408px){.is-inline-fullhd{display:inline!important}}.is-inline-block{display:inline-block!important}@media screen and (max-width:768px){.is-inline-block-mobile{display:inline-block!important}}@media screen and (min-width:769px),print{.is-inline-block-tablet{display:inline-block!important}}@media screen and (min-width:769px) and (max-width:1023px){.is-inline-block-tablet-only{display:inline-block!important}}@media screen and (max-width:1023px){.is-inline-block-touch{display:inline-block!important}}@media screen and (min-width:1024px){.is-inline-block-desktop{display:inline-block!important}}@media screen and (min-width:1024px) and (max-width:1215px){.is-inline-block-desktop-only{display:inline-block!important}}@media screen and (min-width:1216px){.is-inline-block-widescreen{display:inline-block!important}}@media screen and (min-width:1216px) and (max-width:1407px){.is-inline-block-widescreen-only{display:inline-block!important}}@media screen and (min-width:1408px){.is-inline-block-fullhd{display:inline-block!important}}.is-inline-flex{display:inline-flex!important}@media screen and (max-width:768px){.is-inline-flex-mobile{display:inline-flex!important}}@media screen and (min-width:769px),print{.is-inline-flex-tablet{display:inline-flex!important}}@media screen and (min-width:769px) and (max-width:1023px){.is-inline-flex-tablet-only{display:inline-flex!important}}@media screen and (max-width:1023px){.is-inline-flex-touch{display:inline-flex!important}}@media screen and (min-width:1024px){.is-inline-flex-desktop{display:inline-flex!important}}@media screen and (min-width:1024px) and (max-width:1215px){.is-inline-flex-desktop-only{display:inline-flex!important}}@media screen and (min-width:1216px){.is-inline-flex-widescreen{display:inline-flex!important}}@media screen and (min-width:1216px) and (max-width:1407px){.is-inline-flex-widescreen-only{display:inline-flex!important}}@media screen and (min-width:1408px){.is-inline-flex-fullhd{display:inline-flex!important}}.is-hidden{display:none!important}.is-sr-only{border:none!important;clip:rect(0,0,0,0)!important;height:.01em!important;overflow:hidden!important;padding:0!important;position:absolute!important;white-space:nowrap!important;width:.01em!important}@media screen and (max-width:768px){.is-hidden-mobile{display:none!important}}@media screen and (min-width:769px),print{.is-hidden-tablet{display:none!important}}@media screen and (min-width:769px) and (max-width:1023px){.is-hidden-tablet-only{display:none!important}}@media screen and (max-width:1023px){.is-hidden-touch{display:none!important}}@media screen and (min-width:1024px){.is-hidden-desktop{display:none!important}}@media screen and (min-width:1024px) and (max-width:1215px){.is-hidden-desktop-only{display:none!important}}@media screen and (min-width:1216px){.is-hidden-widescreen{display:none!important}}@media screen and (min-width:1216px) and (max-width:1407px){.is-hidden-widescreen-only{display:none!important}}@media screen and (min-width:1408px){.is-hidden-fullhd{display:none!important}}.is-invisible{visibility:hidden!important}@media screen and (max-width:768px){.is-invisible-mobile{visibility:hidden!important}}@media screen and (min-width:769px),print{.is-invisible-tablet{visibility:hidden!important}}@media screen and (min-width:769px) and (max-width:1023px){.is-invisible-tablet-only{visibility:hidden!important}}@media screen and (max-width:1023px){.is-invisible-touch{visibility:hidden!important}}@media screen and (min-width:1024px){.is-invisible-desktop{visibility:hidden!important}}@media screen and (min-width:1024px) and (max-width:1215px){.is-invisible-desktop-only{visibility:hidden!important}}@media screen and (min-width:1216px){.is-invisible-widescreen{visibility:hidden!important}}@media screen and (min-width:1216px) and (max-width:1407px){.is-invisible-widescreen-only{visibility:hidden!important}}@media screen and (min-width:1408px){.is-invisible-fullhd{visibility:hidden!important}}.is-marginless{margin:0!important}.is-paddingless{padding:0!important}.is-radiusless{border-radius:0!important}.is-shadowless{box-shadow:none!important}.is-relative{position:relative!important}.box{background-color:#fff;border-radius:6px;box-shadow:0 2px 3px rgba(10,10,10,.1),0 0 0 1px rgba(10,10,10,.1);color:#4a4a4a;display:block;padding:1.25rem}a.box:focus,a.box:hover{box-shadow:0 2px 3px rgba(10,10,10,.1),0 0 0 1px #3273dc}a.box:active{box-shadow:inset 0 1px 2px rgba(10,10,10,.2),0 0 0 1px #3273dc}.button{background-color:#fff;border-color:#dbdbdb;border-width:1px;color:#363636;cursor:pointer;justify-content:center;padding-bottom:calc(.375em - 1px);padding-left:.75em;padding-right:.75em;padding-top:calc(.375em - 1px);text-align:center;white-space:nowrap}.button strong{color:inherit}.button .icon,.button .icon.is-large,.button .icon.is-medium,.button .icon.is-small{height:1.5em;width:1.5em}.button .icon:first-child:not(:last-child){margin-left:calc(-.375em - 1px);margin-right:.1875em}.button .icon:last-child:not(:first-child){margin-left:.1875em;margin-right:calc(-.375em - 1px)}.button .icon:first-child:last-child{margin-left:calc(-.375em - 1px);margin-right:calc(-.375em - 1px)}.button.is-hovered,.button:hover{border-color:#b5b5b5;color:#363636}.button.is-focused,.button:focus{border-color:#3273dc;color:#363636}.button.is-focused:not(:active),.button:focus:not(:active){box-shadow:0 0 0 .125em rgba(50,115,220,.25)}.button.is-active,.button:active{border-color:#4a4a4a;color:#363636}.button.is-text{background-color:transparent;border-color:transparent;color:#4a4a4a;text-decoration:underline}.button.is-text.is-focused,.button.is-text.is-hovered,.button.is-text:focus,.button.is-text:hover{background-color:#f5f5f5;color:#363636}.button.is-text.is-active,.button.is-text:active{background-color:#e8e8e8;color:#363636}.button.is-text[disabled],fieldset[disabled] .button.is-text{background-color:transparent;border-color:transparent;box-shadow:none}.button.is-white{background-color:#fff;border-color:transparent;color:#0a0a0a}.button.is-white.is-hovered,.button.is-white:hover{background-color:#f9f9f9;border-color:transparent;color:#0a0a0a}.button.is-white.is-focused,.button.is-white:focus{border-color:transparent;color:#0a0a0a}.button.is-white.is-focused:not(:active),.button.is-white:focus:not(:active){box-shadow:0 0 0 .125em rgba(255,255,255,.25)}.button.is-white.is-active,.button.is-white:active{background-color:#f2f2f2;border-color:transparent;color:#0a0a0a}.button.is-white[disabled],fieldset[disabled] .button.is-white{background-color:#fff;border-color:transparent;box-shadow:none}.button.is-white.is-inverted{background-color:#0a0a0a;color:#fff}.button.is-white.is-inverted.is-hovered,.button.is-white.is-inverted:hover{background-color:#000}.button.is-white.is-inverted[disabled],fieldset[disabled] .button.is-white.is-inverted{background-color:#0a0a0a;border-color:transparent;box-shadow:none;color:#fff}.button.is-white.is-loading::after{border-color:transparent transparent #0a0a0a #0a0a0a!important}.button.is-white.is-outlined{background-color:transparent;border-color:#fff;color:#fff}.button.is-white.is-outlined.is-focused,.button.is-white.is-outlined.is-hovered,.button.is-white.is-outlined:focus,.button.is-white.is-outlined:hover{background-color:#fff;border-color:#fff;color:#0a0a0a}.button.is-white.is-outlined.is-loading::after{border-color:transparent transparent #fff #fff!important}.button.is-white.is-outlined.is-loading.is-focused::after,.button.is-white.is-outlined.is-loading.is-hovered::after,.button.is-white.is-outlined.is-loading:focus::after,.button.is-white.is-outlined.is-loading:hover::after{border-color:transparent transparent #0a0a0a #0a0a0a!important}.button.is-white.is-outlined[disabled],fieldset[disabled] .button.is-white.is-outlined{background-color:transparent;border-color:#fff;box-shadow:none;color:#fff}.button.is-white.is-inverted.is-outlined{background-color:transparent;border-color:#0a0a0a;color:#0a0a0a}.button.is-white.is-inverted.is-outlined.is-focused,.button.is-white.is-inverted.is-outlined.is-hovered,.button.is-white.is-inverted.is-outlined:focus,.button.is-white.is-inverted.is-outlined:hover{background-color:#0a0a0a;color:#fff}.button.is-white.is-inverted.is-outlined.is-loading.is-focused::after,.button.is-white.is-inverted.is-outlined.is-loading.is-hovered::after,.button.is-white.is-inverted.is-outlined.is-loading:focus::after,.button.is-white.is-inverted.is-outlined.is-loading:hover::after{border-color:transparent transparent #fff #fff!important}.button.is-white.is-inverted.is-outlined[disabled],fieldset[disabled] .button.is-white.is-inverted.is-outlined{background-color:transparent;border-color:#0a0a0a;box-shadow:none;color:#0a0a0a}.button.is-black{background-color:#0a0a0a;border-color:transparent;color:#fff}.button.is-black.is-hovered,.button.is-black:hover{background-color:#040404;border-color:transparent;color:#fff}.button.is-black.is-focused,.button.is-black:focus{border-color:transparent;color:#fff}.button.is-black.is-focused:not(:active),.button.is-black:focus:not(:active){box-shadow:0 0 0 .125em rgba(10,10,10,.25)}.button.is-black.is-active,.button.is-black:active{background-color:#000;border-color:transparent;color:#fff}.button.is-black[disabled],fieldset[disabled] .button.is-black{background-color:#0a0a0a;border-color:transparent;box-shadow:none}.button.is-black.is-inverted{background-color:#fff;color:#0a0a0a}.button.is-black.is-inverted.is-hovered,.button.is-black.is-inverted:hover{background-color:#f2f2f2}.button.is-black.is-inverted[disabled],fieldset[disabled] .button.is-black.is-inverted{background-color:#fff;border-color:transparent;box-shadow:none;color:#0a0a0a}.button.is-black.is-loading::after{border-color:transparent transparent #fff #fff!important}.button.is-black.is-outlined{background-color:transparent;border-color:#0a0a0a;color:#0a0a0a}.button.is-black.is-outlined.is-focused,.button.is-black.is-outlined.is-hovered,.button.is-black.is-outlined:focus,.button.is-black.is-outlined:hover{background-color:#0a0a0a;border-color:#0a0a0a;color:#fff}.button.is-black.is-outlined.is-loading::after{border-color:transparent transparent #0a0a0a #0a0a0a!important}.button.is-black.is-outlined.is-loading.is-focused::after,.button.is-black.is-outlined.is-loading.is-hovered::after,.button.is-black.is-outlined.is-loading:focus::after,.button.is-black.is-outlined.is-loading:hover::after{border-color:transparent transparent #fff #fff!important}.button.is-black.is-outlined[disabled],fieldset[disabled] .button.is-black.is-outlined{background-color:transparent;border-color:#0a0a0a;box-shadow:none;color:#0a0a0a}.button.is-black.is-inverted.is-outlined{background-color:transparent;border-color:#fff;color:#fff}.button.is-black.is-inverted.is-outlined.is-focused,.button.is-black.is-inverted.is-outlined.is-hovered,.button.is-black.is-inverted.is-outlined:focus,.button.is-black.is-inverted.is-outlined:hover{background-color:#fff;color:#0a0a0a}.button.is-black.is-inverted.is-outlined.is-loading.is-focused::after,.button.is-black.is-inverted.is-outlined.is-loading.is-hovered::after,.button.is-black.is-inverted.is-outlined.is-loading:focus::after,.button.is-black.is-inverted.is-outlined.is-loading:hover::after{border-color:transparent transparent #0a0a0a #0a0a0a!important}.button.is-black.is-inverted.is-outlined[disabled],fieldset[disabled] .button.is-black.is-inverted.is-outlined{background-color:transparent;border-color:#fff;box-shadow:none;color:#fff}.button.is-light{background-color:#f5f5f5;border-color:transparent;color:#363636}.button.is-light.is-hovered,.button.is-light:hover{background-color:#eee;border-color:transparent;color:#363636}.button.is-light.is-focused,.button.is-light:focus{border-color:transparent;color:#363636}.button.is-light.is-focused:not(:active),.button.is-light:focus:not(:active){box-shadow:0 0 0 .125em rgba(245,245,245,.25)}.button.is-light.is-active,.button.is-light:active{background-color:#e8e8e8;border-color:transparent;color:#363636}.button.is-light[disabled],fieldset[disabled] .button.is-light{background-color:#f5f5f5;border-color:transparent;box-shadow:none}.button.is-light.is-inverted{background-color:#363636;color:#f5f5f5}.button.is-light.is-inverted.is-hovered,.button.is-light.is-inverted:hover{background-color:#292929}.button.is-light.is-inverted[disabled],fieldset[disabled] .button.is-light.is-inverted{background-color:#363636;border-color:transparent;box-shadow:none;color:#f5f5f5}.button.is-light.is-loading::after{border-color:transparent transparent #363636 #363636!important}.button.is-light.is-outlined{background-color:transparent;border-color:#f5f5f5;color:#f5f5f5}.button.is-light.is-outlined.is-focused,.button.is-light.is-outlined.is-hovered,.button.is-light.is-outlined:focus,.button.is-light.is-outlined:hover{background-color:#f5f5f5;border-color:#f5f5f5;color:#363636}.button.is-light.is-outlined.is-loading::after{border-color:transparent transparent #f5f5f5 #f5f5f5!important}.button.is-light.is-outlined.is-loading.is-focused::after,.button.is-light.is-outlined.is-loading.is-hovered::after,.button.is-light.is-outlined.is-loading:focus::after,.button.is-light.is-outlined.is-loading:hover::after{border-color:transparent transparent #363636 #363636!important}.button.is-light.is-outlined[disabled],fieldset[disabled] .button.is-light.is-outlined{background-color:transparent;border-color:#f5f5f5;box-shadow:none;color:#f5f5f5}.button.is-light.is-inverted.is-outlined{background-color:transparent;border-color:#363636;color:#363636}.button.is-light.is-inverted.is-outlined.is-focused,.button.is-light.is-inverted.is-outlined.is-hovered,.button.is-light.is-inverted.is-outlined:focus,.button.is-light.is-inverted.is-outlined:hover{background-color:#363636;color:#f5f5f5}.button.is-light.is-inverted.is-outlined.is-loading.is-focused::after,.button.is-light.is-inverted.is-outlined.is-loading.is-hovered::after,.button.is-light.is-inverted.is-outlined.is-loading:focus::after,.button.is-light.is-inverted.is-outlined.is-loading:hover::after{border-color:transparent transparent #f5f5f5 #f5f5f5!important}.button.is-light.is-inverted.is-outlined[disabled],fieldset[disabled] .button.is-light.is-inverted.is-outlined{background-color:transparent;border-color:#363636;box-shadow:none;color:#363636}.button.is-dark{background-color:#363636;border-color:transparent;color:#f5f5f5}.button.is-dark.is-hovered,.button.is-dark:hover{background-color:#2f2f2f;border-color:transparent;color:#f5f5f5}.button.is-dark.is-focused,.button.is-dark:focus{border-color:transparent;color:#f5f5f5}.button.is-dark.is-focused:not(:active),.button.is-dark:focus:not(:active){box-shadow:0 0 0 .125em rgba(54,54,54,.25)}.button.is-dark.is-active,.button.is-dark:active{background-color:#292929;border-color:transparent;color:#f5f5f5}.button.is-dark[disabled],fieldset[disabled] .button.is-dark{background-color:#363636;border-color:transparent;box-shadow:none}.button.is-dark.is-inverted{background-color:#f5f5f5;color:#363636}.button.is-dark.is-inverted.is-hovered,.button.is-dark.is-inverted:hover{background-color:#e8e8e8}.button.is-dark.is-inverted[disabled],fieldset[disabled] .button.is-dark.is-inverted{background-color:#f5f5f5;border-color:transparent;box-shadow:none;color:#363636}.button.is-dark.is-loading::after{border-color:transparent transparent #f5f5f5 #f5f5f5!important}.button.is-dark.is-outlined{background-color:transparent;border-color:#363636;color:#363636}.button.is-dark.is-outlined.is-focused,.button.is-dark.is-outlined.is-hovered,.button.is-dark.is-outlined:focus,.button.is-dark.is-outlined:hover{background-color:#363636;border-color:#363636;color:#f5f5f5}.button.is-dark.is-outlined.is-loading::after{border-color:transparent transparent #363636 #363636!important}.button.is-dark.is-outlined.is-loading.is-focused::after,.button.is-dark.is-outlined.is-loading.is-hovered::after,.button.is-dark.is-outlined.is-loading:focus::after,.button.is-dark.is-outlined.is-loading:hover::after{border-color:transparent transparent #f5f5f5 #f5f5f5!important}.button.is-dark.is-outlined[disabled],fieldset[disabled] .button.is-dark.is-outlined{background-color:transparent;border-color:#363636;box-shadow:none;color:#363636}.button.is-dark.is-inverted.is-outlined{background-color:transparent;border-color:#f5f5f5;color:#f5f5f5}.button.is-dark.is-inverted.is-outlined.is-focused,.button.is-dark.is-inverted.is-outlined.is-hovered,.button.is-dark.is-inverted.is-outlined:focus,.button.is-dark.is-inverted.is-outlined:hover{background-color:#f5f5f5;color:#363636}.button.is-dark.is-inverted.is-outlined.is-loading.is-focused::after,.button.is-dark.is-inverted.is-outlined.is-loading.is-hovered::after,.button.is-dark.is-inverted.is-outlined.is-loading:focus::after,.button.is-dark.is-inverted.is-outlined.is-loading:hover::after{border-color:transparent transparent #363636 #363636!important}.button.is-dark.is-inverted.is-outlined[disabled],fieldset[disabled] .button.is-dark.is-inverted.is-outlined{background-color:transparent;border-color:#f5f5f5;box-shadow:none;color:#f5f5f5}.button.is-primary{background-color:#00d1b2;border-color:transparent;color:#fff}.button.is-primary.is-hovered,.button.is-primary:hover{background-color:#00c4a7;border-color:transparent;color:#fff}.button.is-primary.is-focused,.button.is-primary:focus{border-color:transparent;color:#fff}.button.is-primary.is-focused:not(:active),.button.is-primary:focus:not(:active){box-shadow:0 0 0 .125em rgba(0,209,178,.25)}.button.is-primary.is-active,.button.is-primary:active{background-color:#00b89c;border-color:transparent;color:#fff}.button.is-primary[disabled],fieldset[disabled] .button.is-primary{background-color:#00d1b2;border-color:transparent;box-shadow:none}.button.is-primary.is-inverted{background-color:#fff;color:#00d1b2}.button.is-primary.is-inverted.is-hovered,.button.is-primary.is-inverted:hover{background-color:#f2f2f2}.button.is-primary.is-inverted[disabled],fieldset[disabled] .button.is-primary.is-inverted{background-color:#fff;border-color:transparent;box-shadow:none;color:#00d1b2}.button.is-primary.is-loading::after{border-color:transparent transparent #fff #fff!important}.button.is-primary.is-outlined{background-color:transparent;border-color:#00d1b2;color:#00d1b2}.button.is-primary.is-outlined.is-focused,.button.is-primary.is-outlined.is-hovered,.button.is-primary.is-outlined:focus,.button.is-primary.is-outlined:hover{background-color:#00d1b2;border-color:#00d1b2;color:#fff}.button.is-primary.is-outlined.is-loading::after{border-color:transparent transparent #00d1b2 #00d1b2!important}.button.is-primary.is-outlined.is-loading.is-focused::after,.button.is-primary.is-outlined.is-loading.is-hovered::after,.button.is-primary.is-outlined.is-loading:focus::after,.button.is-primary.is-outlined.is-loading:hover::after{border-color:transparent transparent #fff #fff!important}.button.is-primary.is-outlined[disabled],fieldset[disabled] .button.is-primary.is-outlined{background-color:transparent;border-color:#00d1b2;box-shadow:none;color:#00d1b2}.button.is-primary.is-inverted.is-outlined{background-color:transparent;border-color:#fff;color:#fff}.button.is-primary.is-inverted.is-outlined.is-focused,.button.is-primary.is-inverted.is-outlined.is-hovered,.button.is-primary.is-inverted.is-outlined:focus,.button.is-primary.is-inverted.is-outlined:hover{background-color:#fff;color:#00d1b2}.button.is-primary.is-inverted.is-outlined.is-loading.is-focused::after,.button.is-primary.is-inverted.is-outlined.is-loading.is-hovered::after,.button.is-primary.is-inverted.is-outlined.is-loading:focus::after,.button.is-primary.is-inverted.is-outlined.is-loading:hover::after{border-color:transparent transparent #00d1b2 #00d1b2!important}.button.is-primary.is-inverted.is-outlined[disabled],fieldset[disabled] .button.is-primary.is-inverted.is-outlined{background-color:transparent;border-color:#fff;box-shadow:none;color:#fff}.button.is-link{background-color:#3273dc;border-color:transparent;color:#fff}.button.is-link.is-hovered,.button.is-link:hover{background-color:#276cda;border-color:transparent;color:#fff}.button.is-link.is-focused,.button.is-link:focus{border-color:transparent;color:#fff}.button.is-link.is-focused:not(:active),.button.is-link:focus:not(:active){box-shadow:0 0 0 .125em rgba(50,115,220,.25)}.button.is-link.is-active,.button.is-link:active{background-color:#2366d1;border-color:transparent;color:#fff}.button.is-link[disabled],fieldset[disabled] .button.is-link{background-color:#3273dc;border-color:transparent;box-shadow:none}.button.is-link.is-inverted{background-color:#fff;color:#3273dc}.button.is-link.is-inverted.is-hovered,.button.is-link.is-inverted:hover{background-color:#f2f2f2}.button.is-link.is-inverted[disabled],fieldset[disabled] .button.is-link.is-inverted{background-color:#fff;border-color:transparent;box-shadow:none;color:#3273dc}.button.is-link.is-loading::after{border-color:transparent transparent #fff #fff!important}.button.is-link.is-outlined{background-color:transparent;border-color:#3273dc;color:#3273dc}.button.is-link.is-outlined.is-focused,.button.is-link.is-outlined.is-hovered,.button.is-link.is-outlined:focus,.button.is-link.is-outlined:hover{background-color:#3273dc;border-color:#3273dc;color:#fff}.button.is-link.is-outlined.is-loading::after{border-color:transparent transparent #3273dc #3273dc!important}.button.is-link.is-outlined.is-loading.is-focused::after,.button.is-link.is-outlined.is-loading.is-hovered::after,.button.is-link.is-outlined.is-loading:focus::after,.button.is-link.is-outlined.is-loading:hover::after{border-color:transparent transparent #fff #fff!important}.button.is-link.is-outlined[disabled],fieldset[disabled] .button.is-link.is-outlined{background-color:transparent;border-color:#3273dc;box-shadow:none;color:#3273dc}.button.is-link.is-inverted.is-outlined{background-color:transparent;border-color:#fff;color:#fff}.button.is-link.is-inverted.is-outlined.is-focused,.button.is-link.is-inverted.is-outlined.is-hovered,.button.is-link.is-inverted.is-outlined:focus,.button.is-link.is-inverted.is-outlined:hover{background-color:#fff;color:#3273dc}.button.is-link.is-inverted.is-outlined.is-loading.is-focused::after,.button.is-link.is-inverted.is-outlined.is-loading.is-hovered::after,.button.is-link.is-inverted.is-outlined.is-loading:focus::after,.button.is-link.is-inverted.is-outlined.is-loading:hover::after{border-color:transparent transparent #3273dc #3273dc!important}.button.is-link.is-inverted.is-outlined[disabled],fieldset[disabled] .button.is-link.is-inverted.is-outlined{background-color:transparent;border-color:#fff;box-shadow:none;color:#fff}.button.is-info{background-color:#209cee;border-color:transparent;color:#fff}.button.is-info.is-hovered,.button.is-info:hover{background-color:#1496ed;border-color:transparent;color:#fff}.button.is-info.is-focused,.button.is-info:focus{border-color:transparent;color:#fff}.button.is-info.is-focused:not(:active),.button.is-info:focus:not(:active){box-shadow:0 0 0 .125em rgba(32,156,238,.25)}.button.is-info.is-active,.button.is-info:active{background-color:#118fe4;border-color:transparent;color:#fff}.button.is-info[disabled],fieldset[disabled] .button.is-info{background-color:#209cee;border-color:transparent;box-shadow:none}.button.is-info.is-inverted{background-color:#fff;color:#209cee}.button.is-info.is-inverted.is-hovered,.button.is-info.is-inverted:hover{background-color:#f2f2f2}.button.is-info.is-inverted[disabled],fieldset[disabled] .button.is-info.is-inverted{background-color:#fff;border-color:transparent;box-shadow:none;color:#209cee}.button.is-info.is-loading::after{border-color:transparent transparent #fff #fff!important}.button.is-info.is-outlined{background-color:transparent;border-color:#209cee;color:#209cee}.button.is-info.is-outlined.is-focused,.button.is-info.is-outlined.is-hovered,.button.is-info.is-outlined:focus,.button.is-info.is-outlined:hover{background-color:#209cee;border-color:#209cee;color:#fff}.button.is-info.is-outlined.is-loading::after{border-color:transparent transparent #209cee #209cee!important}.button.is-info.is-outlined.is-loading.is-focused::after,.button.is-info.is-outlined.is-loading.is-hovered::after,.button.is-info.is-outlined.is-loading:focus::after,.button.is-info.is-outlined.is-loading:hover::after{border-color:transparent transparent #fff #fff!important}.button.is-info.is-outlined[disabled],fieldset[disabled] .button.is-info.is-outlined{background-color:transparent;border-color:#209cee;box-shadow:none;color:#209cee}.button.is-info.is-inverted.is-outlined{background-color:transparent;border-color:#fff;color:#fff}.button.is-info.is-inverted.is-outlined.is-focused,.button.is-info.is-inverted.is-outlined.is-hovered,.button.is-info.is-inverted.is-outlined:focus,.button.is-info.is-inverted.is-outlined:hover{background-color:#fff;color:#209cee}.button.is-info.is-inverted.is-outlined.is-loading.is-focused::after,.button.is-info.is-inverted.is-outlined.is-loading.is-hovered::after,.button.is-info.is-inverted.is-outlined.is-loading:focus::after,.button.is-info.is-inverted.is-outlined.is-loading:hover::after{border-color:transparent transparent #209cee #209cee!important}.button.is-info.is-inverted.is-outlined[disabled],fieldset[disabled] .button.is-info.is-inverted.is-outlined{background-color:transparent;border-color:#fff;box-shadow:none;color:#fff}.button.is-success{background-color:#23d160;border-color:transparent;color:#fff}.button.is-success.is-hovered,.button.is-success:hover{background-color:#22c65b;border-color:transparent;color:#fff}.button.is-success.is-focused,.button.is-success:focus{border-color:transparent;color:#fff}.button.is-success.is-focused:not(:active),.button.is-success:focus:not(:active){box-shadow:0 0 0 .125em rgba(35,209,96,.25)}.button.is-success.is-active,.button.is-success:active{background-color:#20bc56;border-color:transparent;color:#fff}.button.is-success[disabled],fieldset[disabled] .button.is-success{background-color:#23d160;border-color:transparent;box-shadow:none}.button.is-success.is-inverted{background-color:#fff;color:#23d160}.button.is-success.is-inverted.is-hovered,.button.is-success.is-inverted:hover{background-color:#f2f2f2}.button.is-success.is-inverted[disabled],fieldset[disabled] .button.is-success.is-inverted{background-color:#fff;border-color:transparent;box-shadow:none;color:#23d160}.button.is-success.is-loading::after{border-color:transparent transparent #fff #fff!important}.button.is-success.is-outlined{background-color:transparent;border-color:#23d160;color:#23d160}.button.is-success.is-outlined.is-focused,.button.is-success.is-outlined.is-hovered,.button.is-success.is-outlined:focus,.button.is-success.is-outlined:hover{background-color:#23d160;border-color:#23d160;color:#fff}.button.is-success.is-outlined.is-loading::after{border-color:transparent transparent #23d160 #23d160!important}.button.is-success.is-outlined.is-loading.is-focused::after,.button.is-success.is-outlined.is-loading.is-hovered::after,.button.is-success.is-outlined.is-loading:focus::after,.button.is-success.is-outlined.is-loading:hover::after{border-color:transparent transparent #fff #fff!important}.button.is-success.is-outlined[disabled],fieldset[disabled] .button.is-success.is-outlined{background-color:transparent;border-color:#23d160;box-shadow:none;color:#23d160}.button.is-success.is-inverted.is-outlined{background-color:transparent;border-color:#fff;color:#fff}.button.is-success.is-inverted.is-outlined.is-focused,.button.is-success.is-inverted.is-outlined.is-hovered,.button.is-success.is-inverted.is-outlined:focus,.button.is-success.is-inverted.is-outlined:hover{background-color:#fff;color:#23d160}.button.is-success.is-inverted.is-outlined.is-loading.is-focused::after,.button.is-success.is-inverted.is-outlined.is-loading.is-hovered::after,.button.is-success.is-inverted.is-outlined.is-loading:focus::after,.button.is-success.is-inverted.is-outlined.is-loading:hover::after{border-color:transparent transparent #23d160 #23d160!important}.button.is-success.is-inverted.is-outlined[disabled],fieldset[disabled] .button.is-success.is-inverted.is-outlined{background-color:transparent;border-color:#fff;box-shadow:none;color:#fff}.button.is-warning{background-color:#ffdd57;border-color:transparent;color:rgba(0,0,0,.7)}.button.is-warning.is-hovered,.button.is-warning:hover{background-color:#ffdb4a;border-color:transparent;color:rgba(0,0,0,.7)}.button.is-warning.is-focused,.button.is-warning:focus{border-color:transparent;color:rgba(0,0,0,.7)}.button.is-warning.is-focused:not(:active),.button.is-warning:focus:not(:active){box-shadow:0 0 0 .125em rgba(255,221,87,.25)}.button.is-warning.is-active,.button.is-warning:active{background-color:#ffd83d;border-color:transparent;color:rgba(0,0,0,.7)}.button.is-warning[disabled],fieldset[disabled] .button.is-warning{background-color:#ffdd57;border-color:transparent;box-shadow:none}.button.is-warning.is-inverted{background-color:rgba(0,0,0,.7);color:#ffdd57}.button.is-warning.is-inverted.is-hovered,.button.is-warning.is-inverted:hover{background-color:rgba(0,0,0,.7)}.button.is-warning.is-inverted[disabled],fieldset[disabled] .button.is-warning.is-inverted{background-color:rgba(0,0,0,.7);border-color:transparent;box-shadow:none;color:#ffdd57}.button.is-warning.is-loading::after{border-color:transparent transparent rgba(0,0,0,.7) rgba(0,0,0,.7)!important}.button.is-warning.is-outlined{background-color:transparent;border-color:#ffdd57;color:#ffdd57}.button.is-warning.is-outlined.is-focused,.button.is-warning.is-outlined.is-hovered,.button.is-warning.is-outlined:focus,.button.is-warning.is-outlined:hover{background-color:#ffdd57;border-color:#ffdd57;color:rgba(0,0,0,.7)}.button.is-warning.is-outlined.is-loading::after{border-color:transparent transparent #ffdd57 #ffdd57!important}.button.is-warning.is-outlined.is-loading.is-focused::after,.button.is-warning.is-outlined.is-loading.is-hovered::after,.button.is-warning.is-outlined.is-loading:focus::after,.button.is-warning.is-outlined.is-loading:hover::after{border-color:transparent transparent rgba(0,0,0,.7) rgba(0,0,0,.7)!important}.button.is-warning.is-outlined[disabled],fieldset[disabled] .button.is-warning.is-outlined{background-color:transparent;border-color:#ffdd57;box-shadow:none;color:#ffdd57}.button.is-warning.is-inverted.is-outlined{background-color:transparent;border-color:rgba(0,0,0,.7);color:rgba(0,0,0,.7)}.button.is-warning.is-inverted.is-outlined.is-focused,.button.is-warning.is-inverted.is-outlined.is-hovered,.button.is-warning.is-inverted.is-outlined:focus,.button.is-warning.is-inverted.is-outlined:hover{background-color:rgba(0,0,0,.7);color:#ffdd57}.button.is-warning.is-inverted.is-outlined.is-loading.is-focused::after,.button.is-warning.is-inverted.is-outlined.is-loading.is-hovered::after,.button.is-warning.is-inverted.is-outlined.is-loading:focus::after,.button.is-warning.is-inverted.is-outlined.is-loading:hover::after{border-color:transparent transparent #ffdd57 #ffdd57!important}.button.is-warning.is-inverted.is-outlined[disabled],fieldset[disabled] .button.is-warning.is-inverted.is-outlined{background-color:transparent;border-color:rgba(0,0,0,.7);box-shadow:none;color:rgba(0,0,0,.7)}.button.is-danger{background-color:#ff3860;border-color:transparent;color:#fff}.button.is-danger.is-hovered,.button.is-danger:hover{background-color:#ff2b56;border-color:transparent;color:#fff}.button.is-danger.is-focused,.button.is-danger:focus{border-color:transparent;color:#fff}.button.is-danger.is-focused:not(:active),.button.is-danger:focus:not(:active){box-shadow:0 0 0 .125em rgba(255,56,96,.25)}.button.is-danger.is-active,.button.is-danger:active{background-color:#ff1f4b;border-color:transparent;color:#fff}.button.is-danger[disabled],fieldset[disabled] .button.is-danger{background-color:#ff3860;border-color:transparent;box-shadow:none}.button.is-danger.is-inverted{background-color:#fff;color:#ff3860}.button.is-danger.is-inverted.is-hovered,.button.is-danger.is-inverted:hover{background-color:#f2f2f2}.button.is-danger.is-inverted[disabled],fieldset[disabled] .button.is-danger.is-inverted{background-color:#fff;border-color:transparent;box-shadow:none;color:#ff3860}.button.is-danger.is-loading::after{border-color:transparent transparent #fff #fff!important}.button.is-danger.is-outlined{background-color:transparent;border-color:#ff3860;color:#ff3860}.button.is-danger.is-outlined.is-focused,.button.is-danger.is-outlined.is-hovered,.button.is-danger.is-outlined:focus,.button.is-danger.is-outlined:hover{background-color:#ff3860;border-color:#ff3860;color:#fff}.button.is-danger.is-outlined.is-loading::after{border-color:transparent transparent #ff3860 #ff3860!important}.button.is-danger.is-outlined.is-loading.is-focused::after,.button.is-danger.is-outlined.is-loading.is-hovered::after,.button.is-danger.is-outlined.is-loading:focus::after,.button.is-danger.is-outlined.is-loading:hover::after{border-color:transparent transparent #fff #fff!important}.button.is-danger.is-outlined[disabled],fieldset[disabled] .button.is-danger.is-outlined{background-color:transparent;border-color:#ff3860;box-shadow:none;color:#ff3860}.button.is-danger.is-inverted.is-outlined{background-color:transparent;border-color:#fff;color:#fff}.button.is-danger.is-inverted.is-outlined.is-focused,.button.is-danger.is-inverted.is-outlined.is-hovered,.button.is-danger.is-inverted.is-outlined:focus,.button.is-danger.is-inverted.is-outlined:hover{background-color:#fff;color:#ff3860}.button.is-danger.is-inverted.is-outlined.is-loading.is-focused::after,.button.is-danger.is-inverted.is-outlined.is-loading.is-hovered::after,.button.is-danger.is-inverted.is-outlined.is-loading:focus::after,.button.is-danger.is-inverted.is-outlined.is-loading:hover::after{border-color:transparent transparent #ff3860 #ff3860!important}.button.is-danger.is-inverted.is-outlined[disabled],fieldset[disabled] .button.is-danger.is-inverted.is-outlined{background-color:transparent;border-color:#fff;box-shadow:none;color:#fff}.button.is-small{border-radius:2px;font-size:.75rem}.button.is-normal{font-size:1rem}.button.is-medium{font-size:1.25rem}.button.is-large{font-size:1.5rem}.button[disabled],fieldset[disabled] .button{background-color:#fff;border-color:#dbdbdb;box-shadow:none;opacity:.5}.button.is-fullwidth{display:flex;width:100%}.button.is-loading{color:transparent!important;pointer-events:none}.button.is-loading::after{position:absolute;left:calc(50% - (1em / 2));top:calc(50% - (1em / 2));position:absolute!important}.button.is-static{background-color:#f5f5f5;border-color:#dbdbdb;color:#7a7a7a;box-shadow:none;pointer-events:none}.button.is-rounded{border-radius:290486px;padding-left:1em;padding-right:1em}.buttons{align-items:center;display:flex;flex-wrap:wrap;justify-content:flex-start}.buttons .button{margin-bottom:.5rem}.buttons .button:not(:last-child):not(.is-fullwidth){margin-right:.5rem}.buttons:last-child{margin-bottom:-.5rem}.buttons:not(:last-child){margin-bottom:1rem}.buttons.are-small .button:not(.is-normal):not(.is-medium):not(.is-large){border-radius:2px;font-size:.75rem}.buttons.are-medium .button:not(.is-small):not(.is-normal):not(.is-large){font-size:1.25rem}.buttons.are-large .button:not(.is-small):not(.is-normal):not(.is-medium){font-size:1.5rem}.buttons.has-addons .button:not(:first-child){border-bottom-left-radius:0;border-top-left-radius:0}.buttons.has-addons .button:not(:last-child){border-bottom-right-radius:0;border-top-right-radius:0;margin-right:-1px}.buttons.has-addons .button:last-child{margin-right:0}.buttons.has-addons .button.is-hovered,.buttons.has-addons .button:hover{z-index:2}.buttons.has-addons .button.is-active,.buttons.has-addons .button.is-focused,.buttons.has-addons .button.is-selected,.buttons.has-addons .button:active,.buttons.has-addons .button:focus{z-index:3}.buttons.has-addons .button.is-active:hover,.buttons.has-addons .button.is-focused:hover,.buttons.has-addons .button.is-selected:hover,.buttons.has-addons .button:active:hover,.buttons.has-addons .button:focus:hover{z-index:4}.buttons.has-addons .button.is-expanded{flex-grow:1;flex-shrink:1}.buttons.is-centered{justify-content:center}.buttons.is-centered:not(.has-addons) .button:not(.is-fullwidth){margin-left:.25rem;margin-right:.25rem}.buttons.is-right{justify-content:flex-end}.buttons.is-right:not(.has-addons) .button:not(.is-fullwidth){margin-left:.25rem;margin-right:.25rem}.container{flex-grow:1;margin:0 auto;position:relative;width:auto}@media screen and (min-width:1024px){.container{max-width:960px}.container.is-fluid{margin-left:32px;margin-right:32px;max-width:none}}@media screen and (max-width:1215px){.container.is-widescreen{max-width:1152px}}@media screen and (max-width:1407px){.container.is-fullhd{max-width:1344px}}@media screen and (min-width:1216px){.container{max-width:1152px}}@media screen and (min-width:1408px){.container{max-width:1344px}}.content li+li{margin-top:.25em}.content blockquote:not(:last-child),.content dl:not(:last-child),.content ol:not(:last-child),.content p:not(:last-child),.content pre:not(:last-child),.content table:not(:last-child),.content ul:not(:last-child){margin-bottom:1em}.content h1,.content h2,.content h3,.content h4,.content h5,.content h6{color:#363636;font-weight:600;line-height:1.125}.content h1{font-size:2em;margin-bottom:.5em}.content h1:not(:first-child){margin-top:1em}.content h2{font-size:1.75em;margin-bottom:.5714em}.content h2:not(:first-child){margin-top:1.1428em}.content h3{font-size:1.5em;margin-bottom:.6666em}.content h3:not(:first-child){margin-top:1.3333em}.content h4{font-size:1.25em;margin-bottom:.8em}.content h5{font-size:1.125em;margin-bottom:.8888em}.content h6{font-size:1em;margin-bottom:1em}.content blockquote{background-color:#f5f5f5;border-left:5px solid #dbdbdb;padding:1.25em 1.5em}.content ol{list-style-position:outside;margin-left:2em;margin-top:1em}.content ol:not([type]){list-style-type:decimal}.content ol:not([type]).is-lower-alpha{list-style-type:lower-alpha}.content ol:not([type]).is-lower-roman{list-style-type:lower-roman}.content ol:not([type]).is-upper-alpha{list-style-type:upper-alpha}.content ol:not([type]).is-upper-roman{list-style-type:upper-roman}.content ul{list-style:disc outside;margin-left:2em;margin-top:1em}.content ul ul{list-style-type:circle;margin-top:.5em}.content ul ul ul{list-style-type:square}.content dd{margin-left:2em}.content figure{margin-left:2em;margin-right:2em;text-align:center}.content figure:not(:first-child){margin-top:2em}.content figure:not(:last-child){margin-bottom:2em}.content figure img{display:inline-block}.content figure figcaption{font-style:italic}.content pre{-webkit-overflow-scrolling:touch;overflow-x:auto;padding:1.25em 1.5em;white-space:pre;word-wrap:normal}.content sub,.content sup{font-size:75%}.content table{width:100%}.content table td,.content table th{border:1px solid #dbdbdb;border-width:0 0 1px;padding:.5em .75em;vertical-align:top}.content table th{color:#363636}.content table th:not([align]){text-align:left}.content table thead td,.content table thead th{border-width:0 0 2px;color:#363636}.content table tfoot td,.content table tfoot th{border-width:2px 0 0;color:#363636}.content table tbody tr:last-child td,.content table tbody tr:last-child th{border-bottom-width:0}.content .tabs li+li{margin-top:0}.content.is-small{font-size:.75rem}.content.is-medium{font-size:1.25rem}.content.is-large{font-size:1.5rem}.icon{align-items:center;display:inline-flex;justify-content:center;height:1.5rem;width:1.5rem}.icon.is-small{height:1rem;width:1rem}.icon.is-medium{height:2rem;width:2rem}.icon.is-large{height:3rem;width:3rem}.image{display:block;position:relative}.image img{display:block;height:auto;width:100%}.image img.is-rounded{border-radius:290486px}.image.is-16by9 .has-ratio,.image.is-16by9 img,.image.is-1by1 .has-ratio,.image.is-1by1 img,.image.is-1by2 .has-ratio,.image.is-1by2 img,.image.is-1by3 .has-ratio,.image.is-1by3 img,.image.is-2by1 .has-ratio,.image.is-2by1 img,.image.is-2by3 .has-ratio,.image.is-2by3 img,.image.is-3by1 .has-ratio,.image.is-3by1 img,.image.is-3by2 .has-ratio,.image.is-3by2 img,.image.is-3by4 .has-ratio,.image.is-3by4 img,.image.is-3by5 .has-ratio,.image.is-3by5 img,.image.is-4by3 .has-ratio,.image.is-4by3 img,.image.is-4by5 .has-ratio,.image.is-4by5 img,.image.is-5by3 .has-ratio,.image.is-5by3 img,.image.is-5by4 .has-ratio,.image.is-5by4 img,.image.is-9by16 .has-ratio,.image.is-9by16 img,.image.is-square .has-ratio,.image.is-square img{height:100%;width:100%}.image.is-1by1,.image.is-square{padding-top:100%}.image.is-5by4{padding-top:80%}.image.is-4by3{padding-top:75%}.image.is-3by2{padding-top:66.6666%}.image.is-5by3{padding-top:60%}.image.is-16by9{padding-top:56.25%}.image.is-2by1{padding-top:50%}.image.is-3by1{padding-top:33.3333%}.image.is-4by5{padding-top:125%}.image.is-3by4{padding-top:133.3333%}.image.is-2by3{padding-top:150%}.image.is-3by5{padding-top:166.6666%}.image.is-9by16{padding-top:177.7777%}.image.is-1by2{padding-top:200%}.image.is-1by3{padding-top:300%}.image.is-16x16{height:16px;width:16px}.image.is-24x24{height:24px;width:24px}.image.is-32x32{height:32px;width:32px}.image.is-48x48{height:48px;width:48px}.image.is-64x64{height:64px;width:64px}.image.is-96x96{height:96px;width:96px}.image.is-128x128{height:128px;width:128px}.notification{background-color:#f5f5f5;border-radius:4px;padding:1.25rem 2.5rem 1.25rem 1.5rem;position:relative}.notification a:not(.button):not(.dropdown-item){color:currentColor;text-decoration:underline}.notification strong{color:currentColor}.notification code,.notification pre{background:#fff}.notification pre code{background:0 0}.notification>.delete{position:absolute;right:.5rem;top:.5rem}.notification .content,.notification .subtitle,.notification .title{color:currentColor}.notification.is-white{background-color:#fff;color:#0a0a0a}.notification.is-black{background-color:#0a0a0a;color:#fff}.notification.is-light{background-color:#f5f5f5;color:#363636}.notification.is-dark{background-color:#363636;color:#f5f5f5}.notification.is-primary{background-color:#00d1b2;color:#fff}.notification.is-link{background-color:#3273dc;color:#fff}.notification.is-info{background-color:#209cee;color:#fff}.notification.is-success{background-color:#23d160;color:#fff}.notification.is-warning{background-color:#ffdd57;color:rgba(0,0,0,.7)}.notification.is-danger{background-color:#ff3860;color:#fff}.progress{-moz-appearance:none;-webkit-appearance:none;border:none;border-radius:290486px;display:block;height:1rem;overflow:hidden;padding:0;width:100%}.progress::-webkit-progress-bar{background-color:#dbdbdb}.progress::-webkit-progress-value{background-color:#4a4a4a}.progress::-moz-progress-bar{background-color:#4a4a4a}.progress::-ms-fill{background-color:#4a4a4a;border:none}.progress.is-white::-webkit-progress-value{background-color:#fff}.progress.is-white::-moz-progress-bar{background-color:#fff}.progress.is-white::-ms-fill{background-color:#fff}.progress.is-white:indeterminate{background-image:linear-gradient(to right,#fff 30%,#dbdbdb 30%)}.progress.is-black::-webkit-progress-value{background-color:#0a0a0a}.progress.is-black::-moz-progress-bar{background-color:#0a0a0a}.progress.is-black::-ms-fill{background-color:#0a0a0a}.progress.is-black:indeterminate{background-image:linear-gradient(to right,#0a0a0a 30%,#dbdbdb 30%)}.progress.is-light::-webkit-progress-value{background-color:#f5f5f5}.progress.is-light::-moz-progress-bar{background-color:#f5f5f5}.progress.is-light::-ms-fill{background-color:#f5f5f5}.progress.is-light:indeterminate{background-image:linear-gradient(to right,#f5f5f5 30%,#dbdbdb 30%)}.progress.is-dark::-webkit-progress-value{background-color:#363636}.progress.is-dark::-moz-progress-bar{background-color:#363636}.progress.is-dark::-ms-fill{background-color:#363636}.progress.is-dark:indeterminate{background-image:linear-gradient(to right,#363636 30%,#dbdbdb 30%)}.progress.is-primary::-webkit-progress-value{background-color:#00d1b2}.progress.is-primary::-moz-progress-bar{background-color:#00d1b2}.progress.is-primary::-ms-fill{background-color:#00d1b2}.progress.is-primary:indeterminate{background-image:linear-gradient(to right,#00d1b2 30%,#dbdbdb 30%)}.progress.is-link::-webkit-progress-value{background-color:#3273dc}.progress.is-link::-moz-progress-bar{background-color:#3273dc}.progress.is-link::-ms-fill{background-color:#3273dc}.progress.is-link:indeterminate{background-image:linear-gradient(to right,#3273dc 30%,#dbdbdb 30%)}.progress.is-info::-webkit-progress-value{background-color:#209cee}.progress.is-info::-moz-progress-bar{background-color:#209cee}.progress.is-info::-ms-fill{background-color:#209cee}.progress.is-info:indeterminate{background-image:linear-gradient(to right,#209cee 30%,#dbdbdb 30%)}.progress.is-success::-webkit-progress-value{background-color:#23d160}.progress.is-success::-moz-progress-bar{background-color:#23d160}.progress.is-success::-ms-fill{background-color:#23d160}.progress.is-success:indeterminate{background-image:linear-gradient(to right,#23d160 30%,#dbdbdb 30%)}.progress.is-warning::-webkit-progress-value{background-color:#ffdd57}.progress.is-warning::-moz-progress-bar{background-color:#ffdd57}.progress.is-warning::-ms-fill{background-color:#ffdd57}.progress.is-warning:indeterminate{background-image:linear-gradient(to right,#ffdd57 30%,#dbdbdb 30%)}.progress.is-danger::-webkit-progress-value{background-color:#ff3860}.progress.is-danger::-moz-progress-bar{background-color:#ff3860}.progress.is-danger::-ms-fill{background-color:#ff3860}.progress.is-danger:indeterminate{background-image:linear-gradient(to right,#ff3860 30%,#dbdbdb 30%)}.progress:indeterminate{-webkit-animation-duration:1.5s;animation-duration:1.5s;-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite;-webkit-animation-name:moveIndeterminate;animation-name:moveIndeterminate;-webkit-animation-timing-function:linear;animation-timing-function:linear;background-color:#dbdbdb;background-image:linear-gradient(to right,#4a4a4a 30%,#dbdbdb 30%);background-position:top left;background-repeat:no-repeat;background-size:150% 150%}.progress:indeterminate::-webkit-progress-bar{background-color:transparent}.progress:indeterminate::-moz-progress-bar{background-color:transparent}.progress.is-small{height:.75rem}.progress.is-medium{height:1.25rem}.progress.is-large{height:1.5rem}@-webkit-keyframes moveIndeterminate{from{background-position:200% 0}to{background-position:-200% 0}}@keyframes moveIndeterminate{from{background-position:200% 0}to{background-position:-200% 0}}.table{background-color:#fff;color:#363636}.table td,.table th{border:1px solid #dbdbdb;border-width:0 0 1px;padding:.5em .75em;vertical-align:top}.table td.is-white,.table th.is-white{background-color:#fff;border-color:#fff;color:#0a0a0a}.table td.is-black,.table th.is-black{background-color:#0a0a0a;border-color:#0a0a0a;color:#fff}.table td.is-light,.table th.is-light{background-color:#f5f5f5;border-color:#f5f5f5;color:#363636}.table td.is-dark,.table th.is-dark{background-color:#363636;border-color:#363636;color:#f5f5f5}.table td.is-primary,.table th.is-primary{background-color:#00d1b2;border-color:#00d1b2;color:#fff}.table td.is-link,.table th.is-link{background-color:#3273dc;border-color:#3273dc;color:#fff}.table td.is-info,.table th.is-info{background-color:#209cee;border-color:#209cee;color:#fff}.table td.is-success,.table th.is-success{background-color:#23d160;border-color:#23d160;color:#fff}.table td.is-warning,.table th.is-warning{background-color:#ffdd57;border-color:#ffdd57;color:rgba(0,0,0,.7)}.table td.is-danger,.table th.is-danger{background-color:#ff3860;border-color:#ff3860;color:#fff}.table td.is-narrow,.table th.is-narrow{white-space:nowrap;width:1%}.table td.is-selected,.table th.is-selected{background-color:#00d1b2;color:#fff}.table td.is-selected a,.table td.is-selected strong,.table th.is-selected a,.table th.is-selected strong{color:currentColor}.table th{color:#363636}.table th:not([align]){text-align:left}.table tr.is-selected{background-color:#00d1b2;color:#fff}.table tr.is-selected a,.table tr.is-selected strong{color:currentColor}.table tr.is-selected td,.table tr.is-selected th{border-color:#fff;color:currentColor}.table thead{background-color:transparent}.table thead td,.table thead th{border-width:0 0 2px;color:#363636}.table tfoot{background-color:transparent}.table tfoot td,.table tfoot th{border-width:2px 0 0;color:#363636}.table tbody{background-color:transparent}.table tbody tr:last-child td,.table tbody tr:last-child th{border-bottom-width:0}.table.is-bordered td,.table.is-bordered th{border-width:1px}.table.is-bordered tr:last-child td,.table.is-bordered tr:last-child th{border-bottom-width:1px}.table.is-fullwidth{width:100%}.table.is-hoverable tbody tr:not(.is-selected):hover{background-color:#fafafa}.table.is-hoverable.is-striped tbody tr:not(.is-selected):hover{background-color:#fafafa}.table.is-hoverable.is-striped tbody tr:not(.is-selected):hover:nth-child(even){background-color:#f5f5f5}.table.is-narrow td,.table.is-narrow th{padding:.25em .5em}.table.is-striped tbody tr:not(.is-selected):nth-child(even){background-color:#fafafa}.table-container{-webkit-overflow-scrolling:touch;overflow:auto;overflow-y:hidden;max-width:100%}.tags{align-items:center;display:flex;flex-wrap:wrap;justify-content:flex-start}.tags .tag{margin-bottom:.5rem}.tags .tag:not(:last-child){margin-right:.5rem}.tags:last-child{margin-bottom:-.5rem}.tags:not(:last-child){margin-bottom:1rem}.tags.are-medium .tag:not(.is-normal):not(.is-large){font-size:1rem}.tags.are-large .tag:not(.is-normal):not(.is-medium){font-size:1.25rem}.tags.is-centered{justify-content:center}.tags.is-centered .tag{margin-right:.25rem;margin-left:.25rem}.tags.is-right{justify-content:flex-end}.tags.is-right .tag:not(:first-child){margin-left:.5rem}.tags.is-right .tag:not(:last-child){margin-right:0}.tags.has-addons .tag{margin-right:0}.tags.has-addons .tag:not(:first-child){margin-left:0;border-bottom-left-radius:0;border-top-left-radius:0}.tags.has-addons .tag:not(:last-child){border-bottom-right-radius:0;border-top-right-radius:0}.tag:not(body){align-items:center;background-color:#f5f5f5;border-radius:4px;color:#4a4a4a;display:inline-flex;font-size:.75rem;height:2em;justify-content:center;line-height:1.5;padding-left:.75em;padding-right:.75em;white-space:nowrap}.tag:not(body) .delete{margin-left:.25rem;margin-right:-.375rem}.tag:not(body).is-white{background-color:#fff;color:#0a0a0a}.tag:not(body).is-black{background-color:#0a0a0a;color:#fff}.tag:not(body).is-light{background-color:#f5f5f5;color:#363636}.tag:not(body).is-dark{background-color:#363636;color:#f5f5f5}.tag:not(body).is-primary{background-color:#00d1b2;color:#fff}.tag:not(body).is-link{background-color:#3273dc;color:#fff}.tag:not(body).is-info{background-color:#209cee;color:#fff}.tag:not(body).is-success{background-color:#23d160;color:#fff}.tag:not(body).is-warning{background-color:#ffdd57;color:rgba(0,0,0,.7)}.tag:not(body).is-danger{background-color:#ff3860;color:#fff}.tag:not(body).is-normal{font-size:.75rem}.tag:not(body).is-medium{font-size:1rem}.tag:not(body).is-large{font-size:1.25rem}.tag:not(body) .icon:first-child:not(:last-child){margin-left:-.375em;margin-right:.1875em}.tag:not(body) .icon:last-child:not(:first-child){margin-left:.1875em;margin-right:-.375em}.tag:not(body) .icon:first-child:last-child{margin-left:-.375em;margin-right:-.375em}.tag:not(body).is-delete{margin-left:1px;padding:0;position:relative;width:2em}.tag:not(body).is-delete::after,.tag:not(body).is-delete::before{background-color:currentColor;content:"";display:block;left:50%;position:absolute;top:50%;-webkit-transform:translateX(-50%) translateY(-50%) rotate(45deg);transform:translateX(-50%) translateY(-50%) rotate(45deg);-webkit-transform-origin:center center;transform-origin:center center}.tag:not(body).is-delete::before{height:1px;width:50%}.tag:not(body).is-delete::after{height:50%;width:1px}.tag:not(body).is-delete:focus,.tag:not(body).is-delete:hover{background-color:#e8e8e8}.tag:not(body).is-delete:active{background-color:#dbdbdb}.tag:not(body).is-rounded{border-radius:290486px}a.tag:hover{text-decoration:underline}.subtitle,.title{word-break:break-word}.subtitle em,.subtitle span,.title em,.title span{font-weight:inherit}.subtitle sub,.title sub{font-size:.75em}.subtitle sup,.title sup{font-size:.75em}.subtitle .tag,.title .tag{vertical-align:middle}.title{color:#363636;font-size:2rem;font-weight:600;line-height:1.125}.title strong{color:inherit;font-weight:inherit}.title+.highlight{margin-top:-.75rem}.title:not(.is-spaced)+.subtitle{margin-top:-1.25rem}.title.is-1{font-size:3rem}.title.is-2{font-size:2.5rem}.title.is-3{font-size:2rem}.title.is-4{font-size:1.5rem}.title.is-5{font-size:1.25rem}.title.is-6{font-size:1rem}.title.is-7{font-size:.75rem}.subtitle{color:#4a4a4a;font-size:1.25rem;font-weight:400;line-height:1.25}.subtitle strong{color:#363636;font-weight:600}.subtitle:not(.is-spaced)+.title{margin-top:-1.25rem}.subtitle.is-1{font-size:3rem}.subtitle.is-2{font-size:2.5rem}.subtitle.is-3{font-size:2rem}.subtitle.is-4{font-size:1.5rem}.subtitle.is-5{font-size:1.25rem}.subtitle.is-6{font-size:1rem}.subtitle.is-7{font-size:.75rem}.heading{display:block;font-size:11px;letter-spacing:1px;margin-bottom:5px;text-transform:uppercase}.highlight{font-weight:400;max-width:100%;overflow:hidden;padding:0}.highlight pre{overflow:auto;max-width:100%}.number{align-items:center;background-color:#f5f5f5;border-radius:290486px;display:inline-flex;font-size:1.25rem;height:2em;justify-content:center;margin-right:1.5rem;min-width:2.5em;padding:.25rem .5rem;text-align:center;vertical-align:top}.input,.select select,.textarea{background-color:#fff;border-color:#dbdbdb;border-radius:4px;color:#363636}.input::-moz-placeholder,.select select::-moz-placeholder,.textarea::-moz-placeholder{color:rgba(54,54,54,.3)}.input::-webkit-input-placeholder,.select select::-webkit-input-placeholder,.textarea::-webkit-input-placeholder{color:rgba(54,54,54,.3)}.input:-moz-placeholder,.select select:-moz-placeholder,.textarea:-moz-placeholder{color:rgba(54,54,54,.3)}.input:-ms-input-placeholder,.select select:-ms-input-placeholder,.textarea:-ms-input-placeholder{color:rgba(54,54,54,.3)}.input:hover,.is-hovered.input,.is-hovered.textarea,.select select.is-hovered,.select select:hover,.textarea:hover{border-color:#b5b5b5}.input:active,.input:focus,.is-active.input,.is-active.textarea,.is-focused.input,.is-focused.textarea,.select select.is-active,.select select.is-focused,.select select:active,.select select:focus,.textarea:active,.textarea:focus{border-color:#3273dc;box-shadow:0 0 0 .125em rgba(50,115,220,.25)}.input[disabled],.select fieldset[disabled] select,.select select[disabled],.textarea[disabled],fieldset[disabled] .input,fieldset[disabled] .select select,fieldset[disabled] .textarea{background-color:#f5f5f5;border-color:#f5f5f5;box-shadow:none;color:#7a7a7a}.input[disabled]::-moz-placeholder,.select fieldset[disabled] select::-moz-placeholder,.select select[disabled]::-moz-placeholder,.textarea[disabled]::-moz-placeholder,fieldset[disabled] .input::-moz-placeholder,fieldset[disabled] .select select::-moz-placeholder,fieldset[disabled] .textarea::-moz-placeholder{color:rgba(122,122,122,.3)}.input[disabled]::-webkit-input-placeholder,.select fieldset[disabled] select::-webkit-input-placeholder,.select select[disabled]::-webkit-input-placeholder,.textarea[disabled]::-webkit-input-placeholder,fieldset[disabled] .input::-webkit-input-placeholder,fieldset[disabled] .select select::-webkit-input-placeholder,fieldset[disabled] .textarea::-webkit-input-placeholder{color:rgba(122,122,122,.3)}.input[disabled]:-moz-placeholder,.select fieldset[disabled] select:-moz-placeholder,.select select[disabled]:-moz-placeholder,.textarea[disabled]:-moz-placeholder,fieldset[disabled] .input:-moz-placeholder,fieldset[disabled] .select select:-moz-placeholder,fieldset[disabled] .textarea:-moz-placeholder{color:rgba(122,122,122,.3)}.input[disabled]:-ms-input-placeholder,.select fieldset[disabled] select:-ms-input-placeholder,.select select[disabled]:-ms-input-placeholder,.textarea[disabled]:-ms-input-placeholder,fieldset[disabled] .input:-ms-input-placeholder,fieldset[disabled] .select select:-ms-input-placeholder,fieldset[disabled] .textarea:-ms-input-placeholder{color:rgba(122,122,122,.3)}.input,.textarea{box-shadow:inset 0 1px 2px rgba(10,10,10,.1);max-width:100%;width:100%}.input[readonly],.textarea[readonly]{box-shadow:none}.is-white.input,.is-white.textarea{border-color:#fff}.is-white.input:active,.is-white.input:focus,.is-white.is-active.input,.is-white.is-active.textarea,.is-white.is-focused.input,.is-white.is-focused.textarea,.is-white.textarea:active,.is-white.textarea:focus{box-shadow:0 0 0 .125em rgba(255,255,255,.25)}.is-black.input,.is-black.textarea{border-color:#0a0a0a}.is-black.input:active,.is-black.input:focus,.is-black.is-active.input,.is-black.is-active.textarea,.is-black.is-focused.input,.is-black.is-focused.textarea,.is-black.textarea:active,.is-black.textarea:focus{box-shadow:0 0 0 .125em rgba(10,10,10,.25)}.is-light.input,.is-light.textarea{border-color:#f5f5f5}.is-light.input:active,.is-light.input:focus,.is-light.is-active.input,.is-light.is-active.textarea,.is-light.is-focused.input,.is-light.is-focused.textarea,.is-light.textarea:active,.is-light.textarea:focus{box-shadow:0 0 0 .125em rgba(245,245,245,.25)}.is-dark.input,.is-dark.textarea{border-color:#363636}.is-dark.input:active,.is-dark.input:focus,.is-dark.is-active.input,.is-dark.is-active.textarea,.is-dark.is-focused.input,.is-dark.is-focused.textarea,.is-dark.textarea:active,.is-dark.textarea:focus{box-shadow:0 0 0 .125em rgba(54,54,54,.25)}.is-primary.input,.is-primary.textarea{border-color:#00d1b2}.is-primary.input:active,.is-primary.input:focus,.is-primary.is-active.input,.is-primary.is-active.textarea,.is-primary.is-focused.input,.is-primary.is-focused.textarea,.is-primary.textarea:active,.is-primary.textarea:focus{box-shadow:0 0 0 .125em rgba(0,209,178,.25)}.is-link.input,.is-link.textarea{border-color:#3273dc}.is-link.input:active,.is-link.input:focus,.is-link.is-active.input,.is-link.is-active.textarea,.is-link.is-focused.input,.is-link.is-focused.textarea,.is-link.textarea:active,.is-link.textarea:focus{box-shadow:0 0 0 .125em rgba(50,115,220,.25)}.is-info.input,.is-info.textarea{border-color:#209cee}.is-info.input:active,.is-info.input:focus,.is-info.is-active.input,.is-info.is-active.textarea,.is-info.is-focused.input,.is-info.is-focused.textarea,.is-info.textarea:active,.is-info.textarea:focus{box-shadow:0 0 0 .125em rgba(32,156,238,.25)}.is-success.input,.is-success.textarea{border-color:#23d160}.is-success.input:active,.is-success.input:focus,.is-success.is-active.input,.is-success.is-active.textarea,.is-success.is-focused.input,.is-success.is-focused.textarea,.is-success.textarea:active,.is-success.textarea:focus{box-shadow:0 0 0 .125em rgba(35,209,96,.25)}.is-warning.input,.is-warning.textarea{border-color:#ffdd57}.is-warning.input:active,.is-warning.input:focus,.is-warning.is-active.input,.is-warning.is-active.textarea,.is-warning.is-focused.input,.is-warning.is-focused.textarea,.is-warning.textarea:active,.is-warning.textarea:focus{box-shadow:0 0 0 .125em rgba(255,221,87,.25)}.is-danger.input,.is-danger.textarea{border-color:#ff3860}.is-danger.input:active,.is-danger.input:focus,.is-danger.is-active.input,.is-danger.is-active.textarea,.is-danger.is-focused.input,.is-danger.is-focused.textarea,.is-danger.textarea:active,.is-danger.textarea:focus{box-shadow:0 0 0 .125em rgba(255,56,96,.25)}.is-small.input,.is-small.textarea{border-radius:2px;font-size:.75rem}.is-medium.input,.is-medium.textarea{font-size:1.25rem}.is-large.input,.is-large.textarea{font-size:1.5rem}.is-fullwidth.input,.is-fullwidth.textarea{display:block;width:100%}.is-inline.input,.is-inline.textarea{display:inline;width:auto}.input.is-rounded{border-radius:290486px;padding-left:1em;padding-right:1em}.input.is-static{background-color:transparent;border-color:transparent;box-shadow:none;padding-left:0;padding-right:0}.textarea{display:block;max-width:100%;min-width:100%;padding:.625em;resize:vertical}.textarea:not([rows]){max-height:600px;min-height:120px}.textarea[rows]{height:initial}.textarea.has-fixed-size{resize:none}.checkbox,.radio{cursor:pointer;display:inline-block;line-height:1.25;position:relative}.checkbox input,.radio input{cursor:pointer}.checkbox:hover,.radio:hover{color:#363636}.checkbox[disabled],.radio[disabled],fieldset[disabled] .checkbox,fieldset[disabled] .radio{color:#7a7a7a;cursor:not-allowed}.radio+.radio{margin-left:.5em}.select{display:inline-block;max-width:100%;position:relative;vertical-align:top}.select:not(.is-multiple){height:2.25em}.select:not(.is-multiple):not(.is-loading)::after{border-color:#3273dc;right:1.125em;z-index:4}.select.is-rounded select{border-radius:290486px;padding-left:1em}.select select{cursor:pointer;display:block;font-size:1em;max-width:100%;outline:0}.select select::-ms-expand{display:none}.select select[disabled]:hover,fieldset[disabled] .select select:hover{border-color:#f5f5f5}.select select:not([multiple]){padding-right:2.5em}.select select[multiple]{height:auto;padding:0}.select select[multiple] option{padding:.5em 1em}.select:not(.is-multiple):not(.is-loading):hover::after{border-color:#363636}.select.is-white:not(:hover)::after{border-color:#fff}.select.is-white select{border-color:#fff}.select.is-white select.is-hovered,.select.is-white select:hover{border-color:#f2f2f2}.select.is-white select.is-active,.select.is-white select.is-focused,.select.is-white select:active,.select.is-white select:focus{box-shadow:0 0 0 .125em rgba(255,255,255,.25)}.select.is-black:not(:hover)::after{border-color:#0a0a0a}.select.is-black select{border-color:#0a0a0a}.select.is-black select.is-hovered,.select.is-black select:hover{border-color:#000}.select.is-black select.is-active,.select.is-black select.is-focused,.select.is-black select:active,.select.is-black select:focus{box-shadow:0 0 0 .125em rgba(10,10,10,.25)}.select.is-light:not(:hover)::after{border-color:#f5f5f5}.select.is-light select{border-color:#f5f5f5}.select.is-light select.is-hovered,.select.is-light select:hover{border-color:#e8e8e8}.select.is-light select.is-active,.select.is-light select.is-focused,.select.is-light select:active,.select.is-light select:focus{box-shadow:0 0 0 .125em rgba(245,245,245,.25)}.select.is-dark:not(:hover)::after{border-color:#363636}.select.is-dark select{border-color:#363636}.select.is-dark select.is-hovered,.select.is-dark select:hover{border-color:#292929}.select.is-dark select.is-active,.select.is-dark select.is-focused,.select.is-dark select:active,.select.is-dark select:focus{box-shadow:0 0 0 .125em rgba(54,54,54,.25)}.select.is-primary:not(:hover)::after{border-color:#00d1b2}.select.is-primary select{border-color:#00d1b2}.select.is-primary select.is-hovered,.select.is-primary select:hover{border-color:#00b89c}.select.is-primary select.is-active,.select.is-primary select.is-focused,.select.is-primary select:active,.select.is-primary select:focus{box-shadow:0 0 0 .125em rgba(0,209,178,.25)}.select.is-link:not(:hover)::after{border-color:#3273dc}.select.is-link select{border-color:#3273dc}.select.is-link select.is-hovered,.select.is-link select:hover{border-color:#2366d1}.select.is-link select.is-active,.select.is-link select.is-focused,.select.is-link select:active,.select.is-link select:focus{box-shadow:0 0 0 .125em rgba(50,115,220,.25)}.select.is-info:not(:hover)::after{border-color:#209cee}.select.is-info select{border-color:#209cee}.select.is-info select.is-hovered,.select.is-info select:hover{border-color:#118fe4}.select.is-info select.is-active,.select.is-info select.is-focused,.select.is-info select:active,.select.is-info select:focus{box-shadow:0 0 0 .125em rgba(32,156,238,.25)}.select.is-success:not(:hover)::after{border-color:#23d160}.select.is-success select{border-color:#23d160}.select.is-success select.is-hovered,.select.is-success select:hover{border-color:#20bc56}.select.is-success select.is-active,.select.is-success select.is-focused,.select.is-success select:active,.select.is-success select:focus{box-shadow:0 0 0 .125em rgba(35,209,96,.25)}.select.is-warning:not(:hover)::after{border-color:#ffdd57}.select.is-warning select{border-color:#ffdd57}.select.is-warning select.is-hovered,.select.is-warning select:hover{border-color:#ffd83d}.select.is-warning select.is-active,.select.is-warning select.is-focused,.select.is-warning select:active,.select.is-warning select:focus{box-shadow:0 0 0 .125em rgba(255,221,87,.25)}.select.is-danger:not(:hover)::after{border-color:#ff3860}.select.is-danger select{border-color:#ff3860}.select.is-danger select.is-hovered,.select.is-danger select:hover{border-color:#ff1f4b}.select.is-danger select.is-active,.select.is-danger select.is-focused,.select.is-danger select:active,.select.is-danger select:focus{box-shadow:0 0 0 .125em rgba(255,56,96,.25)}.select.is-small{border-radius:2px;font-size:.75rem}.select.is-medium{font-size:1.25rem}.select.is-large{font-size:1.5rem}.select.is-disabled::after{border-color:#7a7a7a}.select.is-fullwidth{width:100%}.select.is-fullwidth select{width:100%}.select.is-loading::after{margin-top:0;position:absolute;right:.625em;top:.625em;-webkit-transform:none;transform:none}.select.is-loading.is-small:after{font-size:.75rem}.select.is-loading.is-medium:after{font-size:1.25rem}.select.is-loading.is-large:after{font-size:1.5rem}.file{align-items:stretch;display:flex;justify-content:flex-start;position:relative}.file.is-white .file-cta{background-color:#fff;border-color:transparent;color:#0a0a0a}.file.is-white.is-hovered .file-cta,.file.is-white:hover .file-cta{background-color:#f9f9f9;border-color:transparent;color:#0a0a0a}.file.is-white.is-focused .file-cta,.file.is-white:focus .file-cta{border-color:transparent;box-shadow:0 0 .5em rgba(255,255,255,.25);color:#0a0a0a}.file.is-white.is-active .file-cta,.file.is-white:active .file-cta{background-color:#f2f2f2;border-color:transparent;color:#0a0a0a}.file.is-black .file-cta{background-color:#0a0a0a;border-color:transparent;color:#fff}.file.is-black.is-hovered .file-cta,.file.is-black:hover .file-cta{background-color:#040404;border-color:transparent;color:#fff}.file.is-black.is-focused .file-cta,.file.is-black:focus .file-cta{border-color:transparent;box-shadow:0 0 .5em rgba(10,10,10,.25);color:#fff}.file.is-black.is-active .file-cta,.file.is-black:active .file-cta{background-color:#000;border-color:transparent;color:#fff}.file.is-light .file-cta{background-color:#f5f5f5;border-color:transparent;color:#363636}.file.is-light.is-hovered .file-cta,.file.is-light:hover .file-cta{background-color:#eee;border-color:transparent;color:#363636}.file.is-light.is-focused .file-cta,.file.is-light:focus .file-cta{border-color:transparent;box-shadow:0 0 .5em rgba(245,245,245,.25);color:#363636}.file.is-light.is-active .file-cta,.file.is-light:active .file-cta{background-color:#e8e8e8;border-color:transparent;color:#363636}.file.is-dark .file-cta{background-color:#363636;border-color:transparent;color:#f5f5f5}.file.is-dark.is-hovered .file-cta,.file.is-dark:hover .file-cta{background-color:#2f2f2f;border-color:transparent;color:#f5f5f5}.file.is-dark.is-focused .file-cta,.file.is-dark:focus .file-cta{border-color:transparent;box-shadow:0 0 .5em rgba(54,54,54,.25);color:#f5f5f5}.file.is-dark.is-active .file-cta,.file.is-dark:active .file-cta{background-color:#292929;border-color:transparent;color:#f5f5f5}.file.is-primary .file-cta{background-color:#00d1b2;border-color:transparent;color:#fff}.file.is-primary.is-hovered .file-cta,.file.is-primary:hover .file-cta{background-color:#00c4a7;border-color:transparent;color:#fff}.file.is-primary.is-focused .file-cta,.file.is-primary:focus .file-cta{border-color:transparent;box-shadow:0 0 .5em rgba(0,209,178,.25);color:#fff}.file.is-primary.is-active .file-cta,.file.is-primary:active .file-cta{background-color:#00b89c;border-color:transparent;color:#fff}.file.is-link .file-cta{background-color:#3273dc;border-color:transparent;color:#fff}.file.is-link.is-hovered .file-cta,.file.is-link:hover .file-cta{background-color:#276cda;border-color:transparent;color:#fff}.file.is-link.is-focused .file-cta,.file.is-link:focus .file-cta{border-color:transparent;box-shadow:0 0 .5em rgba(50,115,220,.25);color:#fff}.file.is-link.is-active .file-cta,.file.is-link:active .file-cta{background-color:#2366d1;border-color:transparent;color:#fff}.file.is-info .file-cta{background-color:#209cee;border-color:transparent;color:#fff}.file.is-info.is-hovered .file-cta,.file.is-info:hover .file-cta{background-color:#1496ed;border-color:transparent;color:#fff}.file.is-info.is-focused .file-cta,.file.is-info:focus .file-cta{border-color:transparent;box-shadow:0 0 .5em rgba(32,156,238,.25);color:#fff}.file.is-info.is-active .file-cta,.file.is-info:active .file-cta{background-color:#118fe4;border-color:transparent;color:#fff}.file.is-success .file-cta{background-color:#23d160;border-color:transparent;color:#fff}.file.is-success.is-hovered .file-cta,.file.is-success:hover .file-cta{background-color:#22c65b;border-color:transparent;color:#fff}.file.is-success.is-focused .file-cta,.file.is-success:focus .file-cta{border-color:transparent;box-shadow:0 0 .5em rgba(35,209,96,.25);color:#fff}.file.is-success.is-active .file-cta,.file.is-success:active .file-cta{background-color:#20bc56;border-color:transparent;color:#fff}.file.is-warning .file-cta{background-color:#ffdd57;border-color:transparent;color:rgba(0,0,0,.7)}.file.is-warning.is-hovered .file-cta,.file.is-warning:hover .file-cta{background-color:#ffdb4a;border-color:transparent;color:rgba(0,0,0,.7)}.file.is-warning.is-focused .file-cta,.file.is-warning:focus .file-cta{border-color:transparent;box-shadow:0 0 .5em rgba(255,221,87,.25);color:rgba(0,0,0,.7)}.file.is-warning.is-active .file-cta,.file.is-warning:active .file-cta{background-color:#ffd83d;border-color:transparent;color:rgba(0,0,0,.7)}.file.is-danger .file-cta{background-color:#ff3860;border-color:transparent;color:#fff}.file.is-danger.is-hovered .file-cta,.file.is-danger:hover .file-cta{background-color:#ff2b56;border-color:transparent;color:#fff}.file.is-danger.is-focused .file-cta,.file.is-danger:focus .file-cta{border-color:transparent;box-shadow:0 0 .5em rgba(255,56,96,.25);color:#fff}.file.is-danger.is-active .file-cta,.file.is-danger:active .file-cta{background-color:#ff1f4b;border-color:transparent;color:#fff}.file.is-small{font-size:.75rem}.file.is-medium{font-size:1.25rem}.file.is-medium .file-icon .fa{font-size:21px}.file.is-large{font-size:1.5rem}.file.is-large .file-icon .fa{font-size:28px}.file.has-name .file-cta{border-bottom-right-radius:0;border-top-right-radius:0}.file.has-name .file-name{border-bottom-left-radius:0;border-top-left-radius:0}.file.has-name.is-empty .file-cta{border-radius:4px}.file.has-name.is-empty .file-name{display:none}.file.is-boxed .file-label{flex-direction:column}.file.is-boxed .file-cta{flex-direction:column;height:auto;padding:1em 3em}.file.is-boxed .file-name{border-width:0 1px 1px}.file.is-boxed .file-icon{height:1.5em;width:1.5em}.file.is-boxed .file-icon .fa{font-size:21px}.file.is-boxed.is-small .file-icon .fa{font-size:14px}.file.is-boxed.is-medium .file-icon .fa{font-size:28px}.file.is-boxed.is-large .file-icon .fa{font-size:35px}.file.is-boxed.has-name .file-cta{border-radius:4px 4px 0 0}.file.is-boxed.has-name .file-name{border-radius:0 0 4px 4px;border-width:0 1px 1px}.file.is-centered{justify-content:center}.file.is-fullwidth .file-label{width:100%}.file.is-fullwidth .file-name{flex-grow:1;max-width:none}.file.is-right{justify-content:flex-end}.file.is-right .file-cta{border-radius:0 4px 4px 0}.file.is-right .file-name{border-radius:4px 0 0 4px;border-width:1px 0 1px 1px;order:-1}.file-label{align-items:stretch;display:flex;cursor:pointer;justify-content:flex-start;overflow:hidden;position:relative}.file-label:hover .file-cta{background-color:#eee;color:#363636}.file-label:hover .file-name{border-color:#d5d5d5}.file-label:active .file-cta{background-color:#e8e8e8;color:#363636}.file-label:active .file-name{border-color:#cfcfcf}.file-input{height:100%;left:0;opacity:0;outline:0;position:absolute;top:0;width:100%}.file-cta,.file-name{border-color:#dbdbdb;border-radius:4px;font-size:1em;padding-left:1em;padding-right:1em;white-space:nowrap}.file-cta{background-color:#f5f5f5;color:#4a4a4a}.file-name{border-color:#dbdbdb;border-style:solid;border-width:1px 1px 1px 0;display:block;max-width:16em;overflow:hidden;text-align:left;text-overflow:ellipsis}.file-icon{align-items:center;display:flex;height:1em;justify-content:center;margin-right:.5em;width:1em}.file-icon .fa{font-size:14px}.label{color:#363636;display:block;font-size:1rem;font-weight:700}.label:not(:last-child){margin-bottom:.5em}.label.is-small{font-size:.75rem}.label.is-medium{font-size:1.25rem}.label.is-large{font-size:1.5rem}.help{display:block;font-size:.75rem;margin-top:.25rem}.help.is-white{color:#fff}.help.is-black{color:#0a0a0a}.help.is-light{color:#f5f5f5}.help.is-dark{color:#363636}.help.is-primary{color:#00d1b2}.help.is-link{color:#3273dc}.help.is-info{color:#209cee}.help.is-success{color:#23d160}.help.is-warning{color:#ffdd57}.help.is-danger{color:#ff3860}.field:not(:last-child){margin-bottom:.75rem}.field.has-addons{display:flex;justify-content:flex-start}.field.has-addons .control:not(:last-child){margin-right:-1px}.field.has-addons .control:not(:first-child):not(:last-child) .button,.field.has-addons .control:not(:first-child):not(:last-child) .input,.field.has-addons .control:not(:first-child):not(:last-child) .select select{border-radius:0}.field.has-addons .control:first-child:not(:only-child) .button,.field.has-addons .control:first-child:not(:only-child) .input,.field.has-addons .control:first-child:not(:only-child) .select select{border-bottom-right-radius:0;border-top-right-radius:0}.field.has-addons .control:last-child:not(:only-child) .button,.field.has-addons .control:last-child:not(:only-child) .input,.field.has-addons .control:last-child:not(:only-child) .select select{border-bottom-left-radius:0;border-top-left-radius:0}.field.has-addons .control .button:not([disabled]).is-hovered,.field.has-addons .control .button:not([disabled]):hover,.field.has-addons .control .input:not([disabled]).is-hovered,.field.has-addons .control .input:not([disabled]):hover,.field.has-addons .control .select select:not([disabled]).is-hovered,.field.has-addons .control .select select:not([disabled]):hover{z-index:2}.field.has-addons .control .button:not([disabled]).is-active,.field.has-addons .control .button:not([disabled]).is-focused,.field.has-addons .control .button:not([disabled]):active,.field.has-addons .control .button:not([disabled]):focus,.field.has-addons .control .input:not([disabled]).is-active,.field.has-addons .control .input:not([disabled]).is-focused,.field.has-addons .control .input:not([disabled]):active,.field.has-addons .control .input:not([disabled]):focus,.field.has-addons .control .select select:not([disabled]).is-active,.field.has-addons .control .select select:not([disabled]).is-focused,.field.has-addons .control .select select:not([disabled]):active,.field.has-addons .control .select select:not([disabled]):focus{z-index:3}.field.has-addons .control .button:not([disabled]).is-active:hover,.field.has-addons .control .button:not([disabled]).is-focused:hover,.field.has-addons .control .button:not([disabled]):active:hover,.field.has-addons .control .button:not([disabled]):focus:hover,.field.has-addons .control .input:not([disabled]).is-active:hover,.field.has-addons .control .input:not([disabled]).is-focused:hover,.field.has-addons .control .input:not([disabled]):active:hover,.field.has-addons .control .input:not([disabled]):focus:hover,.field.has-addons .control .select select:not([disabled]).is-active:hover,.field.has-addons .control .select select:not([disabled]).is-focused:hover,.field.has-addons .control .select select:not([disabled]):active:hover,.field.has-addons .control .select select:not([disabled]):focus:hover{z-index:4}.field.has-addons .control.is-expanded{flex-grow:1;flex-shrink:1}.field.has-addons.has-addons-centered{justify-content:center}.field.has-addons.has-addons-right{justify-content:flex-end}.field.has-addons.has-addons-fullwidth .control{flex-grow:1;flex-shrink:0}.field.is-grouped{display:flex;justify-content:flex-start}.field.is-grouped>.control{flex-shrink:0}.field.is-grouped>.control:not(:last-child){margin-bottom:0;margin-right:.75rem}.field.is-grouped>.control.is-expanded{flex-grow:1;flex-shrink:1}.field.is-grouped.is-grouped-centered{justify-content:center}.field.is-grouped.is-grouped-right{justify-content:flex-end}.field.is-grouped.is-grouped-multiline{flex-wrap:wrap}.field.is-grouped.is-grouped-multiline>.control:last-child,.field.is-grouped.is-grouped-multiline>.control:not(:last-child){margin-bottom:.75rem}.field.is-grouped.is-grouped-multiline:last-child{margin-bottom:-.75rem}.field.is-grouped.is-grouped-multiline:not(:last-child){margin-bottom:0}@media screen and (min-width:769px),print{.field.is-horizontal{display:flex}}.field-label .label{font-size:inherit}@media screen and (max-width:768px){.field-label{margin-bottom:.5rem}}@media screen and (min-width:769px),print{.field-label{flex-basis:0;flex-grow:1;flex-shrink:0;margin-right:1.5rem;text-align:right}.field-label.is-small{font-size:.75rem;padding-top:.375em}.field-label.is-normal{padding-top:.375em}.field-label.is-medium{font-size:1.25rem;padding-top:.375em}.field-label.is-large{font-size:1.5rem;padding-top:.375em}}.field-body .field .field{margin-bottom:0}@media screen and (min-width:769px),print{.field-body{display:flex;flex-basis:0;flex-grow:5;flex-shrink:1}.field-body .field{margin-bottom:0}.field-body>.field{flex-shrink:1}.field-body>.field:not(.is-narrow){flex-grow:1}.field-body>.field:not(:last-child){margin-right:.75rem}}.control{box-sizing:border-box;clear:both;font-size:1rem;position:relative;text-align:left}.control.has-icons-left .input:focus~.icon,.control.has-icons-left .select:focus~.icon,.control.has-icons-right .input:focus~.icon,.control.has-icons-right .select:focus~.icon{color:#7a7a7a}.control.has-icons-left .input.is-small~.icon,.control.has-icons-left .select.is-small~.icon,.control.has-icons-right .input.is-small~.icon,.control.has-icons-right .select.is-small~.icon{font-size:.75rem}.control.has-icons-left .input.is-medium~.icon,.control.has-icons-left .select.is-medium~.icon,.control.has-icons-right .input.is-medium~.icon,.control.has-icons-right .select.is-medium~.icon{font-size:1.25rem}.control.has-icons-left .input.is-large~.icon,.control.has-icons-left .select.is-large~.icon,.control.has-icons-right .input.is-large~.icon,.control.has-icons-right .select.is-large~.icon{font-size:1.5rem}.control.has-icons-left .icon,.control.has-icons-right .icon{color:#dbdbdb;height:2.25em;pointer-events:none;position:absolute;top:0;width:2.25em;z-index:4}.control.has-icons-left .input,.control.has-icons-left .select select{padding-left:2.25em}.control.has-icons-left .icon.is-left{left:0}.control.has-icons-right .input,.control.has-icons-right .select select{padding-right:2.25em}.control.has-icons-right .icon.is-right{right:0}.control.is-loading::after{position:absolute!important;right:.625em;top:.625em;z-index:4}.control.is-loading.is-small:after{font-size:.75rem}.control.is-loading.is-medium:after{font-size:1.25rem}.control.is-loading.is-large:after{font-size:1.5rem}.breadcrumb{font-size:1rem;white-space:nowrap}.breadcrumb a{align-items:center;color:#3273dc;display:flex;justify-content:center;padding:0 .75em}.breadcrumb a:hover{color:#363636}.breadcrumb li{align-items:center;display:flex}.breadcrumb li:first-child a{padding-left:0}.breadcrumb li.is-active a{color:#363636;cursor:default;pointer-events:none}.breadcrumb li+li::before{color:#b5b5b5;content:"\\0002f"}.breadcrumb ol,.breadcrumb ul{align-items:flex-start;display:flex;flex-wrap:wrap;justify-content:flex-start}.breadcrumb .icon:first-child{margin-right:.5em}.breadcrumb .icon:last-child{margin-left:.5em}.breadcrumb.is-centered ol,.breadcrumb.is-centered ul{justify-content:center}.breadcrumb.is-right ol,.breadcrumb.is-right ul{justify-content:flex-end}.breadcrumb.is-small{font-size:.75rem}.breadcrumb.is-medium{font-size:1.25rem}.breadcrumb.is-large{font-size:1.5rem}.breadcrumb.has-arrow-separator li+li::before{content:"\\02192"}.breadcrumb.has-bullet-separator li+li::before{content:"\\02022"}.breadcrumb.has-dot-separator li+li::before{content:"\\000b7"}.breadcrumb.has-succeeds-separator li+li::before{content:"\\0227B"}.card{background-color:#fff;box-shadow:0 2px 3px rgba(10,10,10,.1),0 0 0 1px rgba(10,10,10,.1);color:#4a4a4a;max-width:100%;position:relative}.card-header{background-color:transparent;align-items:stretch;box-shadow:0 1px 2px rgba(10,10,10,.1);display:flex}.card-header-title{align-items:center;color:#363636;display:flex;flex-grow:1;font-weight:700;padding:.75rem}.card-header-title.is-centered{justify-content:center}.card-header-icon{align-items:center;cursor:pointer;display:flex;justify-content:center;padding:.75rem}.card-image{display:block;position:relative}.card-content{background-color:transparent;padding:1.5rem}.card-footer{background-color:transparent;border-top:1px solid #dbdbdb;align-items:stretch;display:flex}.card-footer-item{align-items:center;display:flex;flex-basis:0;flex-grow:1;flex-shrink:0;justify-content:center;padding:.75rem}.card-footer-item:not(:last-child){border-right:1px solid #dbdbdb}.card .media:not(:last-child){margin-bottom:1.5rem}.dropdown{display:inline-flex;position:relative;vertical-align:top}.dropdown.is-active .dropdown-menu,.dropdown.is-hoverable:hover .dropdown-menu{display:block}.dropdown.is-right .dropdown-menu{left:auto;right:0}.dropdown.is-up .dropdown-menu{bottom:100%;padding-bottom:4px;padding-top:initial;top:auto}.dropdown-menu{display:none;left:0;min-width:12rem;padding-top:4px;position:absolute;top:100%;z-index:20}.dropdown-content{background-color:#fff;border-radius:4px;box-shadow:0 2px 3px rgba(10,10,10,.1),0 0 0 1px rgba(10,10,10,.1);padding-bottom:.5rem;padding-top:.5rem}.dropdown-item{color:#4a4a4a;display:block;font-size:.875rem;line-height:1.5;padding:.375rem 1rem;position:relative}a.dropdown-item,button.dropdown-item{padding-right:3rem;text-align:left;white-space:nowrap;width:100%}a.dropdown-item:hover,button.dropdown-item:hover{background-color:#f5f5f5;color:#0a0a0a}a.dropdown-item.is-active,button.dropdown-item.is-active{background-color:#3273dc;color:#fff}.dropdown-divider{background-color:#dbdbdb;border:none;display:block;height:1px;margin:.5rem 0}.level{align-items:center;justify-content:space-between}.level code{border-radius:4px}.level img{display:inline-block;vertical-align:top}.level.is-mobile{display:flex}.level.is-mobile .level-left,.level.is-mobile .level-right{display:flex}.level.is-mobile .level-left+.level-right{margin-top:0}.level.is-mobile .level-item:not(:last-child){margin-bottom:0;margin-right:.75rem}.level.is-mobile .level-item:not(.is-narrow){flex-grow:1}@media screen and (min-width:769px),print{.level{display:flex}.level>.level-item:not(.is-narrow){flex-grow:1}}.level-item{align-items:center;display:flex;flex-basis:auto;flex-grow:0;flex-shrink:0;justify-content:center}.level-item .subtitle,.level-item .title{margin-bottom:0}@media screen and (max-width:768px){.level-item:not(:last-child){margin-bottom:.75rem}}.level-left,.level-right{flex-basis:auto;flex-grow:0;flex-shrink:0}.level-left .level-item.is-flexible,.level-right .level-item.is-flexible{flex-grow:1}@media screen and (min-width:769px),print{.level-left .level-item:not(:last-child),.level-right .level-item:not(:last-child){margin-right:.75rem}}.level-left{align-items:center;justify-content:flex-start}@media screen and (max-width:768px){.level-left+.level-right{margin-top:1.5rem}}@media screen and (min-width:769px),print{.level-left{display:flex}}.level-right{align-items:center;justify-content:flex-end}@media screen and (min-width:769px),print{.level-right{display:flex}}.list{background-color:#fff;border-radius:4px;box-shadow:0 2px 3px rgba(10,10,10,.1),0 0 0 1px rgba(10,10,10,.1)}.list-item{display:block;padding:.5em 1em}.list-item:not(a){color:#4a4a4a}.list-item:first-child{border-top-left-radius:4px;border-top-right-radius:4px}.list-item:last-child{border-bottom-left-radius:4px;border-bottom-right-radius:4px}.list-item:not(:last-child){border-bottom:1px solid #dbdbdb}.list-item.is-active{background-color:#3273dc;color:#fff}a.list-item{background-color:#f5f5f5;cursor:pointer}.media{align-items:flex-start;display:flex;text-align:left}.media .content:not(:last-child){margin-bottom:.75rem}.media .media{border-top:1px solid rgba(219,219,219,.5);display:flex;padding-top:.75rem}.media .media .content:not(:last-child),.media .media .control:not(:last-child){margin-bottom:.5rem}.media .media .media{padding-top:.5rem}.media .media .media+.media{margin-top:.5rem}.media+.media{border-top:1px solid rgba(219,219,219,.5);margin-top:1rem;padding-top:1rem}.media.is-large+.media{margin-top:1.5rem;padding-top:1.5rem}.media-left,.media-right{flex-basis:auto;flex-grow:0;flex-shrink:0}.media-left{margin-right:1rem}.media-right{margin-left:1rem}.media-content{flex-basis:auto;flex-grow:1;flex-shrink:1;text-align:left}@media screen and (max-width:768px){.media-content{overflow-x:auto}}.menu{font-size:1rem}.menu.is-small{font-size:.75rem}.menu.is-medium{font-size:1.25rem}.menu.is-large{font-size:1.5rem}.menu-list{line-height:1.25}.menu-list a{border-radius:2px;color:#4a4a4a;display:block;padding:.5em .75em}.menu-list a:hover{background-color:#f5f5f5;color:#363636}.menu-list a.is-active{background-color:#3273dc;color:#fff}.menu-list li ul{border-left:1px solid #dbdbdb;margin:.75em;padding-left:.75em}.menu-label{color:#7a7a7a;font-size:.75em;letter-spacing:.1em;text-transform:uppercase}.menu-label:not(:first-child){margin-top:1em}.menu-label:not(:last-child){margin-bottom:1em}.message{background-color:#f5f5f5;border-radius:4px;font-size:1rem}.message strong{color:currentColor}.message a:not(.button):not(.tag):not(.dropdown-item){color:currentColor;text-decoration:underline}.message.is-small{font-size:.75rem}.message.is-medium{font-size:1.25rem}.message.is-large{font-size:1.5rem}.message.is-white{background-color:#fff}.message.is-white .message-header{background-color:#fff;color:#0a0a0a}.message.is-white .message-body{border-color:#fff;color:#4d4d4d}.message.is-black{background-color:#fafafa}.message.is-black .message-header{background-color:#0a0a0a;color:#fff}.message.is-black .message-body{border-color:#0a0a0a;color:#090909}.message.is-light{background-color:#fafafa}.message.is-light .message-header{background-color:#f5f5f5;color:#363636}.message.is-light .message-body{border-color:#f5f5f5;color:#505050}.message.is-dark{background-color:#fafafa}.message.is-dark .message-header{background-color:#363636;color:#f5f5f5}.message.is-dark .message-body{border-color:#363636;color:#2a2a2a}.message.is-primary{background-color:#f5fffd}.message.is-primary .message-header{background-color:#00d1b2;color:#fff}.message.is-primary .message-body{border-color:#00d1b2;color:#021310}.message.is-link{background-color:#f6f9fe}.message.is-link .message-header{background-color:#3273dc;color:#fff}.message.is-link .message-body{border-color:#3273dc;color:#22509a}.message.is-info{background-color:#f6fbfe}.message.is-info .message-header{background-color:#209cee;color:#fff}.message.is-info .message-body{border-color:#209cee;color:#12537e}.message.is-success{background-color:#f6fef9}.message.is-success .message-header{background-color:#23d160;color:#fff}.message.is-success .message-body{border-color:#23d160;color:#0e301a}.message.is-warning{background-color:#fffdf5}.message.is-warning .message-header{background-color:#ffdd57;color:rgba(0,0,0,.7)}.message.is-warning .message-body{border-color:#ffdd57;color:#3b3108}.message.is-danger{background-color:#fff5f7}.message.is-danger .message-header{background-color:#ff3860;color:#fff}.message.is-danger .message-body{border-color:#ff3860;color:#cd0930}.message-header{align-items:center;background-color:#4a4a4a;border-radius:4px 4px 0 0;color:#fff;display:flex;font-weight:700;justify-content:space-between;line-height:1.25;padding:.75em 1em;position:relative}.message-header .delete{flex-grow:0;flex-shrink:0;margin-left:.75em}.message-header+.message-body{border-width:0;border-top-left-radius:0;border-top-right-radius:0}.message-body{border-color:#dbdbdb;border-radius:4px;border-style:solid;border-width:0 0 0 4px;color:#4a4a4a;padding:1.25em 1.5em}.message-body code,.message-body pre{background-color:#fff}.message-body pre code{background-color:transparent}.modal{align-items:center;display:none;flex-direction:column;justify-content:center;overflow:hidden;position:fixed;z-index:40}.modal.is-active{display:flex}.modal-background{background-color:rgba(10,10,10,.86)}.modal-card,.modal-content{margin:0 20px;max-height:calc(100vh - 160px);overflow:auto;position:relative;width:100%}@media screen and (min-width:769px),print{.modal-card,.modal-content{margin:0 auto;max-height:calc(100vh - 40px);width:640px}}.modal-close{background:0 0;height:40px;position:fixed;right:20px;top:20px;width:40px}.modal-card{display:flex;flex-direction:column;max-height:calc(100vh - 40px);overflow:hidden;-ms-overflow-y:visible}.modal-card-foot,.modal-card-head{align-items:center;background-color:#f5f5f5;display:flex;flex-shrink:0;justify-content:flex-start;padding:20px;position:relative}.modal-card-head{border-bottom:1px solid #dbdbdb;border-top-left-radius:6px;border-top-right-radius:6px}.modal-card-title{color:#363636;flex-grow:1;flex-shrink:0;font-size:1.5rem;line-height:1}.modal-card-foot{border-bottom-left-radius:6px;border-bottom-right-radius:6px;border-top:1px solid #dbdbdb}.modal-card-foot .button:not(:last-child){margin-right:.5em}.modal-card-body{-webkit-overflow-scrolling:touch;background-color:#fff;flex-grow:1;flex-shrink:1;overflow:auto;padding:20px}.navbar{background-color:#fff;min-height:3.25rem;position:relative;z-index:30}.navbar.is-white{background-color:#fff;color:#0a0a0a}.navbar.is-white .navbar-brand .navbar-link,.navbar.is-white .navbar-brand>.navbar-item{color:#0a0a0a}.navbar.is-white .navbar-brand .navbar-link.is-active,.navbar.is-white .navbar-brand .navbar-link:focus,.navbar.is-white .navbar-brand .navbar-link:hover,.navbar.is-white .navbar-brand>a.navbar-item.is-active,.navbar.is-white .navbar-brand>a.navbar-item:focus,.navbar.is-white .navbar-brand>a.navbar-item:hover{background-color:#f2f2f2;color:#0a0a0a}.navbar.is-white .navbar-brand .navbar-link::after{border-color:#0a0a0a}.navbar.is-white .navbar-burger{color:#0a0a0a}@media screen and (min-width:1024px){.navbar.is-white .navbar-end .navbar-link,.navbar.is-white .navbar-end>.navbar-item,.navbar.is-white .navbar-start .navbar-link,.navbar.is-white .navbar-start>.navbar-item{color:#0a0a0a}.navbar.is-white .navbar-end .navbar-link.is-active,.navbar.is-white .navbar-end .navbar-link:focus,.navbar.is-white .navbar-end .navbar-link:hover,.navbar.is-white .navbar-end>a.navbar-item.is-active,.navbar.is-white .navbar-end>a.navbar-item:focus,.navbar.is-white .navbar-end>a.navbar-item:hover,.navbar.is-white .navbar-start .navbar-link.is-active,.navbar.is-white .navbar-start .navbar-link:focus,.navbar.is-white .navbar-start .navbar-link:hover,.navbar.is-white .navbar-start>a.navbar-item.is-active,.navbar.is-white .navbar-start>a.navbar-item:focus,.navbar.is-white .navbar-start>a.navbar-item:hover{background-color:#f2f2f2;color:#0a0a0a}.navbar.is-white .navbar-end .navbar-link::after,.navbar.is-white .navbar-start .navbar-link::after{border-color:#0a0a0a}.navbar.is-white .navbar-item.has-dropdown.is-active .navbar-link,.navbar.is-white .navbar-item.has-dropdown:focus .navbar-link,.navbar.is-white .navbar-item.has-dropdown:hover .navbar-link{background-color:#f2f2f2;color:#0a0a0a}.navbar.is-white .navbar-dropdown a.navbar-item.is-active{background-color:#fff;color:#0a0a0a}}.navbar.is-black{background-color:#0a0a0a;color:#fff}.navbar.is-black .navbar-brand .navbar-link,.navbar.is-black .navbar-brand>.navbar-item{color:#fff}.navbar.is-black .navbar-brand .navbar-link.is-active,.navbar.is-black .navbar-brand .navbar-link:focus,.navbar.is-black .navbar-brand .navbar-link:hover,.navbar.is-black .navbar-brand>a.navbar-item.is-active,.navbar.is-black .navbar-brand>a.navbar-item:focus,.navbar.is-black .navbar-brand>a.navbar-item:hover{background-color:#000;color:#fff}.navbar.is-black .navbar-brand .navbar-link::after{border-color:#fff}.navbar.is-black .navbar-burger{color:#fff}@media screen and (min-width:1024px){.navbar.is-black .navbar-end .navbar-link,.navbar.is-black .navbar-end>.navbar-item,.navbar.is-black .navbar-start .navbar-link,.navbar.is-black .navbar-start>.navbar-item{color:#fff}.navbar.is-black .navbar-end .navbar-link.is-active,.navbar.is-black .navbar-end .navbar-link:focus,.navbar.is-black .navbar-end .navbar-link:hover,.navbar.is-black .navbar-end>a.navbar-item.is-active,.navbar.is-black .navbar-end>a.navbar-item:focus,.navbar.is-black .navbar-end>a.navbar-item:hover,.navbar.is-black .navbar-start .navbar-link.is-active,.navbar.is-black .navbar-start .navbar-link:focus,.navbar.is-black .navbar-start .navbar-link:hover,.navbar.is-black .navbar-start>a.navbar-item.is-active,.navbar.is-black .navbar-start>a.navbar-item:focus,.navbar.is-black .navbar-start>a.navbar-item:hover{background-color:#000;color:#fff}.navbar.is-black .navbar-end .navbar-link::after,.navbar.is-black .navbar-start .navbar-link::after{border-color:#fff}.navbar.is-black .navbar-item.has-dropdown.is-active .navbar-link,.navbar.is-black .navbar-item.has-dropdown:focus .navbar-link,.navbar.is-black .navbar-item.has-dropdown:hover .navbar-link{background-color:#000;color:#fff}.navbar.is-black .navbar-dropdown a.navbar-item.is-active{background-color:#0a0a0a;color:#fff}}.navbar.is-light{background-color:#f5f5f5;color:#363636}.navbar.is-light .navbar-brand .navbar-link,.navbar.is-light .navbar-brand>.navbar-item{color:#363636}.navbar.is-light .navbar-brand .navbar-link.is-active,.navbar.is-light .navbar-brand .navbar-link:focus,.navbar.is-light .navbar-brand .navbar-link:hover,.navbar.is-light .navbar-brand>a.navbar-item.is-active,.navbar.is-light .navbar-brand>a.navbar-item:focus,.navbar.is-light .navbar-brand>a.navbar-item:hover{background-color:#e8e8e8;color:#363636}.navbar.is-light .navbar-brand .navbar-link::after{border-color:#363636}.navbar.is-light .navbar-burger{color:#363636}@media screen and (min-width:1024px){.navbar.is-light .navbar-end .navbar-link,.navbar.is-light .navbar-end>.navbar-item,.navbar.is-light .navbar-start .navbar-link,.navbar.is-light .navbar-start>.navbar-item{color:#363636}.navbar.is-light .navbar-end .navbar-link.is-active,.navbar.is-light .navbar-end .navbar-link:focus,.navbar.is-light .navbar-end .navbar-link:hover,.navbar.is-light .navbar-end>a.navbar-item.is-active,.navbar.is-light .navbar-end>a.navbar-item:focus,.navbar.is-light .navbar-end>a.navbar-item:hover,.navbar.is-light .navbar-start .navbar-link.is-active,.navbar.is-light .navbar-start .navbar-link:focus,.navbar.is-light .navbar-start .navbar-link:hover,.navbar.is-light .navbar-start>a.navbar-item.is-active,.navbar.is-light .navbar-start>a.navbar-item:focus,.navbar.is-light .navbar-start>a.navbar-item:hover{background-color:#e8e8e8;color:#363636}.navbar.is-light .navbar-end .navbar-link::after,.navbar.is-light .navbar-start .navbar-link::after{border-color:#363636}.navbar.is-light .navbar-item.has-dropdown.is-active .navbar-link,.navbar.is-light .navbar-item.has-dropdown:focus .navbar-link,.navbar.is-light .navbar-item.has-dropdown:hover .navbar-link{background-color:#e8e8e8;color:#363636}.navbar.is-light .navbar-dropdown a.navbar-item.is-active{background-color:#f5f5f5;color:#363636}}.navbar.is-dark{background-color:#363636;color:#f5f5f5}.navbar.is-dark .navbar-brand .navbar-link,.navbar.is-dark .navbar-brand>.navbar-item{color:#f5f5f5}.navbar.is-dark .navbar-brand .navbar-link.is-active,.navbar.is-dark .navbar-brand .navbar-link:focus,.navbar.is-dark .navbar-brand .navbar-link:hover,.navbar.is-dark .navbar-brand>a.navbar-item.is-active,.navbar.is-dark .navbar-brand>a.navbar-item:focus,.navbar.is-dark .navbar-brand>a.navbar-item:hover{background-color:#292929;color:#f5f5f5}.navbar.is-dark .navbar-brand .navbar-link::after{border-color:#f5f5f5}.navbar.is-dark .navbar-burger{color:#f5f5f5}@media screen and (min-width:1024px){.navbar.is-dark .navbar-end .navbar-link,.navbar.is-dark .navbar-end>.navbar-item,.navbar.is-dark .navbar-start .navbar-link,.navbar.is-dark .navbar-start>.navbar-item{color:#f5f5f5}.navbar.is-dark .navbar-end .navbar-link.is-active,.navbar.is-dark .navbar-end .navbar-link:focus,.navbar.is-dark .navbar-end .navbar-link:hover,.navbar.is-dark .navbar-end>a.navbar-item.is-active,.navbar.is-dark .navbar-end>a.navbar-item:focus,.navbar.is-dark .navbar-end>a.navbar-item:hover,.navbar.is-dark .navbar-start .navbar-link.is-active,.navbar.is-dark .navbar-start .navbar-link:focus,.navbar.is-dark .navbar-start .navbar-link:hover,.navbar.is-dark .navbar-start>a.navbar-item.is-active,.navbar.is-dark .navbar-start>a.navbar-item:focus,.navbar.is-dark .navbar-start>a.navbar-item:hover{background-color:#292929;color:#f5f5f5}.navbar.is-dark .navbar-end .navbar-link::after,.navbar.is-dark .navbar-start .navbar-link::after{border-color:#f5f5f5}.navbar.is-dark .navbar-item.has-dropdown.is-active .navbar-link,.navbar.is-dark .navbar-item.has-dropdown:focus .navbar-link,.navbar.is-dark .navbar-item.has-dropdown:hover .navbar-link{background-color:#292929;color:#f5f5f5}.navbar.is-dark .navbar-dropdown a.navbar-item.is-active{background-color:#363636;color:#f5f5f5}}.navbar.is-primary{background-color:#00d1b2;color:#fff}.navbar.is-primary .navbar-brand .navbar-link,.navbar.is-primary .navbar-brand>.navbar-item{color:#fff}.navbar.is-primary .navbar-brand .navbar-link.is-active,.navbar.is-primary .navbar-brand .navbar-link:focus,.navbar.is-primary .navbar-brand .navbar-link:hover,.navbar.is-primary .navbar-brand>a.navbar-item.is-active,.navbar.is-primary .navbar-brand>a.navbar-item:focus,.navbar.is-primary .navbar-brand>a.navbar-item:hover{background-color:#00b89c;color:#fff}.navbar.is-primary .navbar-brand .navbar-link::after{border-color:#fff}.navbar.is-primary .navbar-burger{color:#fff}@media screen and (min-width:1024px){.navbar.is-primary .navbar-end .navbar-link,.navbar.is-primary .navbar-end>.navbar-item,.navbar.is-primary .navbar-start .navbar-link,.navbar.is-primary .navbar-start>.navbar-item{color:#fff}.navbar.is-primary .navbar-end .navbar-link.is-active,.navbar.is-primary .navbar-end .navbar-link:focus,.navbar.is-primary .navbar-end .navbar-link:hover,.navbar.is-primary .navbar-end>a.navbar-item.is-active,.navbar.is-primary .navbar-end>a.navbar-item:focus,.navbar.is-primary .navbar-end>a.navbar-item:hover,.navbar.is-primary .navbar-start .navbar-link.is-active,.navbar.is-primary .navbar-start .navbar-link:focus,.navbar.is-primary .navbar-start .navbar-link:hover,.navbar.is-primary .navbar-start>a.navbar-item.is-active,.navbar.is-primary .navbar-start>a.navbar-item:focus,.navbar.is-primary .navbar-start>a.navbar-item:hover{background-color:#00b89c;color:#fff}.navbar.is-primary .navbar-end .navbar-link::after,.navbar.is-primary .navbar-start .navbar-link::after{border-color:#fff}.navbar.is-primary .navbar-item.has-dropdown.is-active .navbar-link,.navbar.is-primary .navbar-item.has-dropdown:focus .navbar-link,.navbar.is-primary .navbar-item.has-dropdown:hover .navbar-link{background-color:#00b89c;color:#fff}.navbar.is-primary .navbar-dropdown a.navbar-item.is-active{background-color:#00d1b2;color:#fff}}.navbar.is-link{background-color:#3273dc;color:#fff}.navbar.is-link .navbar-brand .navbar-link,.navbar.is-link .navbar-brand>.navbar-item{color:#fff}.navbar.is-link .navbar-brand .navbar-link.is-active,.navbar.is-link .navbar-brand .navbar-link:focus,.navbar.is-link .navbar-brand .navbar-link:hover,.navbar.is-link .navbar-brand>a.navbar-item.is-active,.navbar.is-link .navbar-brand>a.navbar-item:focus,.navbar.is-link .navbar-brand>a.navbar-item:hover{background-color:#2366d1;color:#fff}.navbar.is-link .navbar-brand .navbar-link::after{border-color:#fff}.navbar.is-link .navbar-burger{color:#fff}@media screen and (min-width:1024px){.navbar.is-link .navbar-end .navbar-link,.navbar.is-link .navbar-end>.navbar-item,.navbar.is-link .navbar-start .navbar-link,.navbar.is-link .navbar-start>.navbar-item{color:#fff}.navbar.is-link .navbar-end .navbar-link.is-active,.navbar.is-link .navbar-end .navbar-link:focus,.navbar.is-link .navbar-end .navbar-link:hover,.navbar.is-link .navbar-end>a.navbar-item.is-active,.navbar.is-link .navbar-end>a.navbar-item:focus,.navbar.is-link .navbar-end>a.navbar-item:hover,.navbar.is-link .navbar-start .navbar-link.is-active,.navbar.is-link .navbar-start .navbar-link:focus,.navbar.is-link .navbar-start .navbar-link:hover,.navbar.is-link .navbar-start>a.navbar-item.is-active,.navbar.is-link .navbar-start>a.navbar-item:focus,.navbar.is-link .navbar-start>a.navbar-item:hover{background-color:#2366d1;color:#fff}.navbar.is-link .navbar-end .navbar-link::after,.navbar.is-link .navbar-start .navbar-link::after{border-color:#fff}.navbar.is-link .navbar-item.has-dropdown.is-active .navbar-link,.navbar.is-link .navbar-item.has-dropdown:focus .navbar-link,.navbar.is-link .navbar-item.has-dropdown:hover .navbar-link{background-color:#2366d1;color:#fff}.navbar.is-link .navbar-dropdown a.navbar-item.is-active{background-color:#3273dc;color:#fff}}.navbar.is-info{background-color:#209cee;color:#fff}.navbar.is-info .navbar-brand .navbar-link,.navbar.is-info .navbar-brand>.navbar-item{color:#fff}.navbar.is-info .navbar-brand .navbar-link.is-active,.navbar.is-info .navbar-brand .navbar-link:focus,.navbar.is-info .navbar-brand .navbar-link:hover,.navbar.is-info .navbar-brand>a.navbar-item.is-active,.navbar.is-info .navbar-brand>a.navbar-item:focus,.navbar.is-info .navbar-brand>a.navbar-item:hover{background-color:#118fe4;color:#fff}.navbar.is-info .navbar-brand .navbar-link::after{border-color:#fff}.navbar.is-info .navbar-burger{color:#fff}@media screen and (min-width:1024px){.navbar.is-info .navbar-end .navbar-link,.navbar.is-info .navbar-end>.navbar-item,.navbar.is-info .navbar-start .navbar-link,.navbar.is-info .navbar-start>.navbar-item{color:#fff}.navbar.is-info .navbar-end .navbar-link.is-active,.navbar.is-info .navbar-end .navbar-link:focus,.navbar.is-info .navbar-end .navbar-link:hover,.navbar.is-info .navbar-end>a.navbar-item.is-active,.navbar.is-info .navbar-end>a.navbar-item:focus,.navbar.is-info .navbar-end>a.navbar-item:hover,.navbar.is-info .navbar-start .navbar-link.is-active,.navbar.is-info .navbar-start .navbar-link:focus,.navbar.is-info .navbar-start .navbar-link:hover,.navbar.is-info .navbar-start>a.navbar-item.is-active,.navbar.is-info .navbar-start>a.navbar-item:focus,.navbar.is-info .navbar-start>a.navbar-item:hover{background-color:#118fe4;color:#fff}.navbar.is-info .navbar-end .navbar-link::after,.navbar.is-info .navbar-start .navbar-link::after{border-color:#fff}.navbar.is-info .navbar-item.has-dropdown.is-active .navbar-link,.navbar.is-info .navbar-item.has-dropdown:focus .navbar-link,.navbar.is-info .navbar-item.has-dropdown:hover .navbar-link{background-color:#118fe4;color:#fff}.navbar.is-info .navbar-dropdown a.navbar-item.is-active{background-color:#209cee;color:#fff}}.navbar.is-success{background-color:#23d160;color:#fff}.navbar.is-success .navbar-brand .navbar-link,.navbar.is-success .navbar-brand>.navbar-item{color:#fff}.navbar.is-success .navbar-brand .navbar-link.is-active,.navbar.is-success .navbar-brand .navbar-link:focus,.navbar.is-success .navbar-brand .navbar-link:hover,.navbar.is-success .navbar-brand>a.navbar-item.is-active,.navbar.is-success .navbar-brand>a.navbar-item:focus,.navbar.is-success .navbar-brand>a.navbar-item:hover{background-color:#20bc56;color:#fff}.navbar.is-success .navbar-brand .navbar-link::after{border-color:#fff}.navbar.is-success .navbar-burger{color:#fff}@media screen and (min-width:1024px){.navbar.is-success .navbar-end .navbar-link,.navbar.is-success .navbar-end>.navbar-item,.navbar.is-success .navbar-start .navbar-link,.navbar.is-success .navbar-start>.navbar-item{color:#fff}.navbar.is-success .navbar-end .navbar-link.is-active,.navbar.is-success .navbar-end .navbar-link:focus,.navbar.is-success .navbar-end .navbar-link:hover,.navbar.is-success .navbar-end>a.navbar-item.is-active,.navbar.is-success .navbar-end>a.navbar-item:focus,.navbar.is-success .navbar-end>a.navbar-item:hover,.navbar.is-success .navbar-start .navbar-link.is-active,.navbar.is-success .navbar-start .navbar-link:focus,.navbar.is-success .navbar-start .navbar-link:hover,.navbar.is-success .navbar-start>a.navbar-item.is-active,.navbar.is-success .navbar-start>a.navbar-item:focus,.navbar.is-success .navbar-start>a.navbar-item:hover{background-color:#20bc56;color:#fff}.navbar.is-success .navbar-end .navbar-link::after,.navbar.is-success .navbar-start .navbar-link::after{border-color:#fff}.navbar.is-success .navbar-item.has-dropdown.is-active .navbar-link,.navbar.is-success .navbar-item.has-dropdown:focus .navbar-link,.navbar.is-success .navbar-item.has-dropdown:hover .navbar-link{background-color:#20bc56;color:#fff}.navbar.is-success .navbar-dropdown a.navbar-item.is-active{background-color:#23d160;color:#fff}}.navbar.is-warning{background-color:#ffdd57;color:rgba(0,0,0,.7)}.navbar.is-warning .navbar-brand .navbar-link,.navbar.is-warning .navbar-brand>.navbar-item{color:rgba(0,0,0,.7)}.navbar.is-warning .navbar-brand .navbar-link.is-active,.navbar.is-warning .navbar-brand .navbar-link:focus,.navbar.is-warning .navbar-brand .navbar-link:hover,.navbar.is-warning .navbar-brand>a.navbar-item.is-active,.navbar.is-warning .navbar-brand>a.navbar-item:focus,.navbar.is-warning .navbar-brand>a.navbar-item:hover{background-color:#ffd83d;color:rgba(0,0,0,.7)}.navbar.is-warning .navbar-brand .navbar-link::after{border-color:rgba(0,0,0,.7)}.navbar.is-warning .navbar-burger{color:rgba(0,0,0,.7)}@media screen and (min-width:1024px){.navbar.is-warning .navbar-end .navbar-link,.navbar.is-warning .navbar-end>.navbar-item,.navbar.is-warning .navbar-start .navbar-link,.navbar.is-warning .navbar-start>.navbar-item{color:rgba(0,0,0,.7)}.navbar.is-warning .navbar-end .navbar-link.is-active,.navbar.is-warning .navbar-end .navbar-link:focus,.navbar.is-warning .navbar-end .navbar-link:hover,.navbar.is-warning .navbar-end>a.navbar-item.is-active,.navbar.is-warning .navbar-end>a.navbar-item:focus,.navbar.is-warning .navbar-end>a.navbar-item:hover,.navbar.is-warning .navbar-start .navbar-link.is-active,.navbar.is-warning .navbar-start .navbar-link:focus,.navbar.is-warning .navbar-start .navbar-link:hover,.navbar.is-warning .navbar-start>a.navbar-item.is-active,.navbar.is-warning .navbar-start>a.navbar-item:focus,.navbar.is-warning .navbar-start>a.navbar-item:hover{background-color:#ffd83d;color:rgba(0,0,0,.7)}.navbar.is-warning .navbar-end .navbar-link::after,.navbar.is-warning .navbar-start .navbar-link::after{border-color:rgba(0,0,0,.7)}.navbar.is-warning .navbar-item.has-dropdown.is-active .navbar-link,.navbar.is-warning .navbar-item.has-dropdown:focus .navbar-link,.navbar.is-warning .navbar-item.has-dropdown:hover .navbar-link{background-color:#ffd83d;color:rgba(0,0,0,.7)}.navbar.is-warning .navbar-dropdown a.navbar-item.is-active{background-color:#ffdd57;color:rgba(0,0,0,.7)}}.navbar.is-danger{background-color:#ff3860;color:#fff}.navbar.is-danger .navbar-brand .navbar-link,.navbar.is-danger .navbar-brand>.navbar-item{color:#fff}.navbar.is-danger .navbar-brand .navbar-link.is-active,.navbar.is-danger .navbar-brand .navbar-link:focus,.navbar.is-danger .navbar-brand .navbar-link:hover,.navbar.is-danger .navbar-brand>a.navbar-item.is-active,.navbar.is-danger .navbar-brand>a.navbar-item:focus,.navbar.is-danger .navbar-brand>a.navbar-item:hover{background-color:#ff1f4b;color:#fff}.navbar.is-danger .navbar-brand .navbar-link::after{border-color:#fff}.navbar.is-danger .navbar-burger{color:#fff}@media screen and (min-width:1024px){.navbar.is-danger .navbar-end .navbar-link,.navbar.is-danger .navbar-end>.navbar-item,.navbar.is-danger .navbar-start .navbar-link,.navbar.is-danger .navbar-start>.navbar-item{color:#fff}.navbar.is-danger .navbar-end .navbar-link.is-active,.navbar.is-danger .navbar-end .navbar-link:focus,.navbar.is-danger .navbar-end .navbar-link:hover,.navbar.is-danger .navbar-end>a.navbar-item.is-active,.navbar.is-danger .navbar-end>a.navbar-item:focus,.navbar.is-danger .navbar-end>a.navbar-item:hover,.navbar.is-danger .navbar-start .navbar-link.is-active,.navbar.is-danger .navbar-start .navbar-link:focus,.navbar.is-danger .navbar-start .navbar-link:hover,.navbar.is-danger .navbar-start>a.navbar-item.is-active,.navbar.is-danger .navbar-start>a.navbar-item:focus,.navbar.is-danger .navbar-start>a.navbar-item:hover{background-color:#ff1f4b;color:#fff}.navbar.is-danger .navbar-end .navbar-link::after,.navbar.is-danger .navbar-start .navbar-link::after{border-color:#fff}.navbar.is-danger .navbar-item.has-dropdown.is-active .navbar-link,.navbar.is-danger .navbar-item.has-dropdown:focus .navbar-link,.navbar.is-danger .navbar-item.has-dropdown:hover .navbar-link{background-color:#ff1f4b;color:#fff}.navbar.is-danger .navbar-dropdown a.navbar-item.is-active{background-color:#ff3860;color:#fff}}.navbar>.container{align-items:stretch;display:flex;min-height:3.25rem;width:100%}.navbar.has-shadow{box-shadow:0 2px 0 0 #f5f5f5}.navbar.is-fixed-bottom,.navbar.is-fixed-top{left:0;position:fixed;right:0;z-index:30}.navbar.is-fixed-bottom{bottom:0}.navbar.is-fixed-bottom.has-shadow{box-shadow:0 -2px 0 0 #f5f5f5}.navbar.is-fixed-top{top:0}body.has-navbar-fixed-top,html.has-navbar-fixed-top{padding-top:3.25rem}body.has-navbar-fixed-bottom,html.has-navbar-fixed-bottom{padding-bottom:3.25rem}.navbar-brand,.navbar-tabs{align-items:stretch;display:flex;flex-shrink:0;min-height:3.25rem}.navbar-brand a.navbar-item:focus,.navbar-brand a.navbar-item:hover{background-color:transparent}.navbar-tabs{-webkit-overflow-scrolling:touch;max-width:100vw;overflow-x:auto;overflow-y:hidden}.navbar-burger{color:#4a4a4a;cursor:pointer;display:block;height:3.25rem;position:relative;width:3.25rem;margin-left:auto}.navbar-burger span{background-color:currentColor;display:block;height:1px;left:calc(50% - 8px);position:absolute;-webkit-transform-origin:center;transform-origin:center;transition-duration:86ms;transition-property:background-color,opacity,-webkit-transform;transition-property:background-color,opacity,transform;transition-property:background-color,opacity,transform,-webkit-transform;transition-timing-function:ease-out;width:16px}.navbar-burger span:nth-child(1){top:calc(50% - 6px)}.navbar-burger span:nth-child(2){top:calc(50% - 1px)}.navbar-burger span:nth-child(3){top:calc(50% + 4px)}.navbar-burger:hover{background-color:rgba(0,0,0,.05)}.navbar-burger.is-active span:nth-child(1){-webkit-transform:translateY(5px) rotate(45deg);transform:translateY(5px) rotate(45deg)}.navbar-burger.is-active span:nth-child(2){opacity:0}.navbar-burger.is-active span:nth-child(3){-webkit-transform:translateY(-5px) rotate(-45deg);transform:translateY(-5px) rotate(-45deg)}.navbar-menu{display:none}.navbar-item,.navbar-link{color:#4a4a4a;display:block;line-height:1.5;padding:.5rem .75rem;position:relative}.navbar-item .icon:only-child,.navbar-link .icon:only-child{margin-left:-.25rem;margin-right:-.25rem}.navbar-link,a.navbar-item{cursor:pointer}.navbar-link.is-active,.navbar-link:focus,.navbar-link:focus-within,.navbar-link:hover,a.navbar-item.is-active,a.navbar-item:focus,a.navbar-item:focus-within,a.navbar-item:hover{background-color:#fafafa;color:#3273dc}.navbar-item{display:block;flex-grow:0;flex-shrink:0}.navbar-item img{max-height:1.75rem}.navbar-item.has-dropdown{padding:0}.navbar-item.is-expanded{flex-grow:1;flex-shrink:1}.navbar-item.is-tab{border-bottom:1px solid transparent;min-height:3.25rem;padding-bottom:calc(.5rem - 1px)}.navbar-item.is-tab:focus,.navbar-item.is-tab:hover{background-color:transparent;border-bottom-color:#3273dc}.navbar-item.is-tab.is-active{background-color:transparent;border-bottom-color:#3273dc;border-bottom-style:solid;border-bottom-width:3px;color:#3273dc;padding-bottom:calc(.5rem - 3px)}.navbar-content{flex-grow:1;flex-shrink:1}.navbar-link:not(.is-arrowless){padding-right:2.5em}.navbar-link:not(.is-arrowless)::after{border-color:#3273dc;margin-top:-.375em;right:1.125em}.navbar-dropdown{font-size:.875rem;padding-bottom:.5rem;padding-top:.5rem}.navbar-dropdown .navbar-item{padding-left:1.5rem;padding-right:1.5rem}.navbar-divider{background-color:#f5f5f5;border:none;display:none;height:2px;margin:.5rem 0}@media screen and (max-width:1023px){.navbar>.container{display:block}.navbar-brand .navbar-item,.navbar-tabs .navbar-item{align-items:center;display:flex}.navbar-link::after{display:none}.navbar-menu{background-color:#fff;box-shadow:0 8px 16px rgba(10,10,10,.1);padding:.5rem 0}.navbar-menu.is-active{display:block}.navbar.is-fixed-bottom-touch,.navbar.is-fixed-top-touch{left:0;position:fixed;right:0;z-index:30}.navbar.is-fixed-bottom-touch{bottom:0}.navbar.is-fixed-bottom-touch.has-shadow{box-shadow:0 -2px 3px rgba(10,10,10,.1)}.navbar.is-fixed-top-touch{top:0}.navbar.is-fixed-top .navbar-menu,.navbar.is-fixed-top-touch .navbar-menu{-webkit-overflow-scrolling:touch;max-height:calc(100vh - 3.25rem);overflow:auto}body.has-navbar-fixed-top-touch,html.has-navbar-fixed-top-touch{padding-top:3.25rem}body.has-navbar-fixed-bottom-touch,html.has-navbar-fixed-bottom-touch{padding-bottom:3.25rem}}@media screen and (min-width:1024px){.navbar,.navbar-end,.navbar-menu,.navbar-start{align-items:stretch;display:flex}.navbar{min-height:3.25rem}.navbar.is-spaced{padding:1rem 2rem}.navbar.is-spaced .navbar-end,.navbar.is-spaced .navbar-start{align-items:center}.navbar.is-spaced .navbar-link,.navbar.is-spaced a.navbar-item{border-radius:4px}.navbar.is-transparent .navbar-link.is-active,.navbar.is-transparent .navbar-link:focus,.navbar.is-transparent .navbar-link:hover,.navbar.is-transparent a.navbar-item.is-active,.navbar.is-transparent a.navbar-item:focus,.navbar.is-transparent a.navbar-item:hover{background-color:transparent!important}.navbar.is-transparent .navbar-item.has-dropdown.is-active .navbar-link,.navbar.is-transparent .navbar-item.has-dropdown.is-hoverable:focus .navbar-link,.navbar.is-transparent .navbar-item.has-dropdown.is-hoverable:focus-within .navbar-link,.navbar.is-transparent .navbar-item.has-dropdown.is-hoverable:hover .navbar-link{background-color:transparent!important}.navbar.is-transparent .navbar-dropdown a.navbar-item:focus,.navbar.is-transparent .navbar-dropdown a.navbar-item:hover{background-color:#f5f5f5;color:#0a0a0a}.navbar.is-transparent .navbar-dropdown a.navbar-item.is-active{background-color:#f5f5f5;color:#3273dc}.navbar-burger{display:none}.navbar-item,.navbar-link{align-items:center;display:flex}.navbar-item{display:flex}.navbar-item.has-dropdown{align-items:stretch}.navbar-item.has-dropdown-up .navbar-link::after{-webkit-transform:rotate(135deg) translate(.25em,-.25em);transform:rotate(135deg) translate(.25em,-.25em)}.navbar-item.has-dropdown-up .navbar-dropdown{border-bottom:2px solid #dbdbdb;border-radius:6px 6px 0 0;border-top:none;bottom:100%;box-shadow:0 -8px 8px rgba(10,10,10,.1);top:auto}.navbar-item.is-active .navbar-dropdown,.navbar-item.is-hoverable:focus .navbar-dropdown,.navbar-item.is-hoverable:focus-within .navbar-dropdown,.navbar-item.is-hoverable:hover .navbar-dropdown{display:block}.navbar-item.is-active .navbar-dropdown.is-boxed,.navbar-item.is-hoverable:focus .navbar-dropdown.is-boxed,.navbar-item.is-hoverable:focus-within .navbar-dropdown.is-boxed,.navbar-item.is-hoverable:hover .navbar-dropdown.is-boxed,.navbar.is-spaced .navbar-item.is-active .navbar-dropdown,.navbar.is-spaced .navbar-item.is-hoverable:focus .navbar-dropdown,.navbar.is-spaced .navbar-item.is-hoverable:focus-within .navbar-dropdown,.navbar.is-spaced .navbar-item.is-hoverable:hover .navbar-dropdown{opacity:1;pointer-events:auto;-webkit-transform:translateY(0);transform:translateY(0)}.navbar-menu{flex-grow:1;flex-shrink:0}.navbar-start{justify-content:flex-start;margin-right:auto}.navbar-end{justify-content:flex-end;margin-left:auto}.navbar-dropdown{background-color:#fff;border-bottom-left-radius:6px;border-bottom-right-radius:6px;border-top:2px solid #dbdbdb;box-shadow:0 8px 8px rgba(10,10,10,.1);display:none;font-size:.875rem;left:0;min-width:100%;position:absolute;top:100%;z-index:20}.navbar-dropdown .navbar-item{padding:.375rem 1rem;white-space:nowrap}.navbar-dropdown a.navbar-item{padding-right:3rem}.navbar-dropdown a.navbar-item:focus,.navbar-dropdown a.navbar-item:hover{background-color:#f5f5f5;color:#0a0a0a}.navbar-dropdown a.navbar-item.is-active{background-color:#f5f5f5;color:#3273dc}.navbar-dropdown.is-boxed,.navbar.is-spaced .navbar-dropdown{border-radius:6px;border-top:none;box-shadow:0 8px 8px rgba(10,10,10,.1),0 0 0 1px rgba(10,10,10,.1);display:block;opacity:0;pointer-events:none;top:calc(100% + (-4px));-webkit-transform:translateY(-5px);transform:translateY(-5px);transition-duration:86ms;transition-property:opacity,-webkit-transform;transition-property:opacity,transform;transition-property:opacity,transform,-webkit-transform}.navbar-dropdown.is-right{left:auto;right:0}.navbar-divider{display:block}.container>.navbar .navbar-brand,.navbar>.container .navbar-brand{margin-left:-.75rem}.container>.navbar .navbar-menu,.navbar>.container .navbar-menu{margin-right:-.75rem}.navbar.is-fixed-bottom-desktop,.navbar.is-fixed-top-desktop{left:0;position:fixed;right:0;z-index:30}.navbar.is-fixed-bottom-desktop{bottom:0}.navbar.is-fixed-bottom-desktop.has-shadow{box-shadow:0 -2px 3px rgba(10,10,10,.1)}.navbar.is-fixed-top-desktop{top:0}body.has-navbar-fixed-top-desktop,html.has-navbar-fixed-top-desktop{padding-top:3.25rem}body.has-navbar-fixed-bottom-desktop,html.has-navbar-fixed-bottom-desktop{padding-bottom:3.25rem}body.has-spaced-navbar-fixed-top,html.has-spaced-navbar-fixed-top{padding-top:5.25rem}body.has-spaced-navbar-fixed-bottom,html.has-spaced-navbar-fixed-bottom{padding-bottom:5.25rem}.navbar-link.is-active,a.navbar-item.is-active{color:#0a0a0a}.navbar-link.is-active:not(:focus):not(:hover),a.navbar-item.is-active:not(:focus):not(:hover){background-color:transparent}.navbar-item.has-dropdown.is-active .navbar-link,.navbar-item.has-dropdown:focus .navbar-link,.navbar-item.has-dropdown:hover .navbar-link{background-color:#fafafa}}.hero.is-fullheight-with-navbar{min-height:calc(100vh - 3.25rem)}.pagination{font-size:1rem;margin:-.25rem}.pagination.is-small{font-size:.75rem}.pagination.is-medium{font-size:1.25rem}.pagination.is-large{font-size:1.5rem}.pagination.is-rounded .pagination-next,.pagination.is-rounded .pagination-previous{padding-left:1em;padding-right:1em;border-radius:290486px}.pagination.is-rounded .pagination-link{border-radius:290486px}.pagination,.pagination-list{align-items:center;display:flex;justify-content:center;text-align:center}.pagination-ellipsis,.pagination-link,.pagination-next,.pagination-previous{font-size:1em;justify-content:center;margin:.25rem;padding-left:.5em;padding-right:.5em;text-align:center}.pagination-link,.pagination-next,.pagination-previous{border-color:#dbdbdb;color:#363636;min-width:2.25em}.pagination-link:hover,.pagination-next:hover,.pagination-previous:hover{border-color:#b5b5b5;color:#363636}.pagination-link:focus,.pagination-next:focus,.pagination-previous:focus{border-color:#3273dc}.pagination-link:active,.pagination-next:active,.pagination-previous:active{box-shadow:inset 0 1px 2px rgba(10,10,10,.2)}.pagination-link[disabled],.pagination-next[disabled],.pagination-previous[disabled]{background-color:#dbdbdb;border-color:#dbdbdb;box-shadow:none;color:#7a7a7a;opacity:.5}.pagination-next,.pagination-previous{padding-left:.75em;padding-right:.75em;white-space:nowrap}.pagination-link.is-current{background-color:#3273dc;border-color:#3273dc;color:#fff}.pagination-ellipsis{color:#b5b5b5;pointer-events:none}.pagination-list{flex-wrap:wrap}@media screen and (max-width:768px){.pagination{flex-wrap:wrap}.pagination-next,.pagination-previous{flex-grow:1;flex-shrink:1}.pagination-list li{flex-grow:1;flex-shrink:1}}@media screen and (min-width:769px),print{.pagination-list{flex-grow:1;flex-shrink:1;justify-content:flex-start;order:1}.pagination-previous{order:2}.pagination-next{order:3}.pagination{justify-content:space-between}.pagination.is-centered .pagination-previous{order:1}.pagination.is-centered .pagination-list{justify-content:center;order:2}.pagination.is-centered .pagination-next{order:3}.pagination.is-right .pagination-previous{order:1}.pagination.is-right .pagination-next{order:2}.pagination.is-right .pagination-list{justify-content:flex-end;order:3}}.panel{font-size:1rem}.panel:not(:last-child){margin-bottom:1.5rem}.panel-block,.panel-heading,.panel-tabs{border-bottom:1px solid #dbdbdb;border-left:1px solid #dbdbdb;border-right:1px solid #dbdbdb}.panel-block:first-child,.panel-heading:first-child,.panel-tabs:first-child{border-top:1px solid #dbdbdb}.panel-heading{background-color:#f5f5f5;border-radius:4px 4px 0 0;color:#363636;font-size:1.25em;font-weight:300;line-height:1.25;padding:.5em .75em}.panel-tabs{align-items:flex-end;display:flex;font-size:.875em;justify-content:center}.panel-tabs a{border-bottom:1px solid #dbdbdb;margin-bottom:-1px;padding:.5em}.panel-tabs a.is-active{border-bottom-color:#4a4a4a;color:#363636}.panel-list a{color:#4a4a4a}.panel-list a:hover{color:#3273dc}.panel-block{align-items:center;color:#363636;display:flex;justify-content:flex-start;padding:.5em .75em}.panel-block input[type=checkbox]{margin-right:.75em}.panel-block>.control{flex-grow:1;flex-shrink:1;width:100%}.panel-block.is-wrapped{flex-wrap:wrap}.panel-block.is-active{border-left-color:#3273dc;color:#363636}.panel-block.is-active .panel-icon{color:#3273dc}a.panel-block,label.panel-block{cursor:pointer}a.panel-block:hover,label.panel-block:hover{background-color:#f5f5f5}.panel-icon{display:inline-block;font-size:14px;height:1em;line-height:1em;text-align:center;vertical-align:top;width:1em;color:#7a7a7a;margin-right:.75em}.panel-icon .fa{font-size:inherit;line-height:inherit}.tabs{-webkit-overflow-scrolling:touch;align-items:stretch;display:flex;font-size:1rem;justify-content:space-between;overflow:hidden;overflow-x:auto;white-space:nowrap}.tabs a{align-items:center;border-bottom-color:#dbdbdb;border-bottom-style:solid;border-bottom-width:1px;color:#4a4a4a;display:flex;justify-content:center;margin-bottom:-1px;padding:.5em 1em;vertical-align:top}.tabs a:hover{border-bottom-color:#363636;color:#363636}.tabs li{display:block}.tabs li.is-active a{border-bottom-color:#3273dc;color:#3273dc}.tabs ul{align-items:center;border-bottom-color:#dbdbdb;border-bottom-style:solid;border-bottom-width:1px;display:flex;flex-grow:1;flex-shrink:0;justify-content:flex-start}.tabs ul.is-left{padding-right:.75em}.tabs ul.is-center{flex:none;justify-content:center;padding-left:.75em;padding-right:.75em}.tabs ul.is-right{justify-content:flex-end;padding-left:.75em}.tabs .icon:first-child{margin-right:.5em}.tabs .icon:last-child{margin-left:.5em}.tabs.is-centered ul{justify-content:center}.tabs.is-right ul{justify-content:flex-end}.tabs.is-boxed a{border:1px solid transparent;border-radius:4px 4px 0 0}.tabs.is-boxed a:hover{background-color:#f5f5f5;border-bottom-color:#dbdbdb}.tabs.is-boxed li.is-active a{background-color:#fff;border-color:#dbdbdb;border-bottom-color:transparent!important}.tabs.is-fullwidth li{flex-grow:1;flex-shrink:0}.tabs.is-toggle a{border-color:#dbdbdb;border-style:solid;border-width:1px;margin-bottom:0;position:relative}.tabs.is-toggle a:hover{background-color:#f5f5f5;border-color:#b5b5b5;z-index:2}.tabs.is-toggle li+li{margin-left:-1px}.tabs.is-toggle li:first-child a{border-radius:4px 0 0 4px}.tabs.is-toggle li:last-child a{border-radius:0 4px 4px 0}.tabs.is-toggle li.is-active a{background-color:#3273dc;border-color:#3273dc;color:#fff;z-index:1}.tabs.is-toggle ul{border-bottom:none}.tabs.is-toggle.is-toggle-rounded li:first-child a{border-bottom-left-radius:290486px;border-top-left-radius:290486px;padding-left:1.25em}.tabs.is-toggle.is-toggle-rounded li:last-child a{border-bottom-right-radius:290486px;border-top-right-radius:290486px;padding-right:1.25em}.tabs.is-small{font-size:.75rem}.tabs.is-medium{font-size:1.25rem}.tabs.is-large{font-size:1.5rem}.column{display:block;flex-basis:0;flex-grow:1;flex-shrink:1;padding:.75rem}.columns.is-mobile>.column.is-narrow{flex:none}.columns.is-mobile>.column.is-full{flex:none;width:100%}.columns.is-mobile>.column.is-three-quarters{flex:none;width:75%}.columns.is-mobile>.column.is-two-thirds{flex:none;width:66.6666%}.columns.is-mobile>.column.is-half{flex:none;width:50%}.columns.is-mobile>.column.is-one-third{flex:none;width:33.3333%}.columns.is-mobile>.column.is-one-quarter{flex:none;width:25%}.columns.is-mobile>.column.is-one-fifth{flex:none;width:20%}.columns.is-mobile>.column.is-two-fifths{flex:none;width:40%}.columns.is-mobile>.column.is-three-fifths{flex:none;width:60%}.columns.is-mobile>.column.is-four-fifths{flex:none;width:80%}.columns.is-mobile>.column.is-offset-three-quarters{margin-left:75%}.columns.is-mobile>.column.is-offset-two-thirds{margin-left:66.6666%}.columns.is-mobile>.column.is-offset-half{margin-left:50%}.columns.is-mobile>.column.is-offset-one-third{margin-left:33.3333%}.columns.is-mobile>.column.is-offset-one-quarter{margin-left:25%}.columns.is-mobile>.column.is-offset-one-fifth{margin-left:20%}.columns.is-mobile>.column.is-offset-two-fifths{margin-left:40%}.columns.is-mobile>.column.is-offset-three-fifths{margin-left:60%}.columns.is-mobile>.column.is-offset-four-fifths{margin-left:80%}.columns.is-mobile>.column.is-0{flex:none;width:0%}.columns.is-mobile>.column.is-offset-0{margin-left:0}.columns.is-mobile>.column.is-1{flex:none;width:8.33333%}.columns.is-mobile>.column.is-offset-1{margin-left:8.33333%}.columns.is-mobile>.column.is-2{flex:none;width:16.66667%}.columns.is-mobile>.column.is-offset-2{margin-left:16.66667%}.columns.is-mobile>.column.is-3{flex:none;width:25%}.columns.is-mobile>.column.is-offset-3{margin-left:25%}.columns.is-mobile>.column.is-4{flex:none;width:33.33333%}.columns.is-mobile>.column.is-offset-4{margin-left:33.33333%}.columns.is-mobile>.column.is-5{flex:none;width:41.66667%}.columns.is-mobile>.column.is-offset-5{margin-left:41.66667%}.columns.is-mobile>.column.is-6{flex:none;width:50%}.columns.is-mobile>.column.is-offset-6{margin-left:50%}.columns.is-mobile>.column.is-7{flex:none;width:58.33333%}.columns.is-mobile>.column.is-offset-7{margin-left:58.33333%}.columns.is-mobile>.column.is-8{flex:none;width:66.66667%}.columns.is-mobile>.column.is-offset-8{margin-left:66.66667%}.columns.is-mobile>.column.is-9{flex:none;width:75%}.columns.is-mobile>.column.is-offset-9{margin-left:75%}.columns.is-mobile>.column.is-10{flex:none;width:83.33333%}.columns.is-mobile>.column.is-offset-10{margin-left:83.33333%}.columns.is-mobile>.column.is-11{flex:none;width:91.66667%}.columns.is-mobile>.column.is-offset-11{margin-left:91.66667%}.columns.is-mobile>.column.is-12{flex:none;width:100%}.columns.is-mobile>.column.is-offset-12{margin-left:100%}@media screen and (max-width:768px){.column.is-narrow-mobile{flex:none}.column.is-full-mobile{flex:none;width:100%}.column.is-three-quarters-mobile{flex:none;width:75%}.column.is-two-thirds-mobile{flex:none;width:66.6666%}.column.is-half-mobile{flex:none;width:50%}.column.is-one-third-mobile{flex:none;width:33.3333%}.column.is-one-quarter-mobile{flex:none;width:25%}.column.is-one-fifth-mobile{flex:none;width:20%}.column.is-two-fifths-mobile{flex:none;width:40%}.column.is-three-fifths-mobile{flex:none;width:60%}.column.is-four-fifths-mobile{flex:none;width:80%}.column.is-offset-three-quarters-mobile{margin-left:75%}.column.is-offset-two-thirds-mobile{margin-left:66.6666%}.column.is-offset-half-mobile{margin-left:50%}.column.is-offset-one-third-mobile{margin-left:33.3333%}.column.is-offset-one-quarter-mobile{margin-left:25%}.column.is-offset-one-fifth-mobile{margin-left:20%}.column.is-offset-two-fifths-mobile{margin-left:40%}.column.is-offset-three-fifths-mobile{margin-left:60%}.column.is-offset-four-fifths-mobile{margin-left:80%}.column.is-0-mobile{flex:none;width:0%}.column.is-offset-0-mobile{margin-left:0}.column.is-1-mobile{flex:none;width:8.33333%}.column.is-offset-1-mobile{margin-left:8.33333%}.column.is-2-mobile{flex:none;width:16.66667%}.column.is-offset-2-mobile{margin-left:16.66667%}.column.is-3-mobile{flex:none;width:25%}.column.is-offset-3-mobile{margin-left:25%}.column.is-4-mobile{flex:none;width:33.33333%}.column.is-offset-4-mobile{margin-left:33.33333%}.column.is-5-mobile{flex:none;width:41.66667%}.column.is-offset-5-mobile{margin-left:41.66667%}.column.is-6-mobile{flex:none;width:50%}.column.is-offset-6-mobile{margin-left:50%}.column.is-7-mobile{flex:none;width:58.33333%}.column.is-offset-7-mobile{margin-left:58.33333%}.column.is-8-mobile{flex:none;width:66.66667%}.column.is-offset-8-mobile{margin-left:66.66667%}.column.is-9-mobile{flex:none;width:75%}.column.is-offset-9-mobile{margin-left:75%}.column.is-10-mobile{flex:none;width:83.33333%}.column.is-offset-10-mobile{margin-left:83.33333%}.column.is-11-mobile{flex:none;width:91.66667%}.column.is-offset-11-mobile{margin-left:91.66667%}.column.is-12-mobile{flex:none;width:100%}.column.is-offset-12-mobile{margin-left:100%}}@media screen and (min-width:769px),print{.column.is-narrow,.column.is-narrow-tablet{flex:none}.column.is-full,.column.is-full-tablet{flex:none;width:100%}.column.is-three-quarters,.column.is-three-quarters-tablet{flex:none;width:75%}.column.is-two-thirds,.column.is-two-thirds-tablet{flex:none;width:66.6666%}.column.is-half,.column.is-half-tablet{flex:none;width:50%}.column.is-one-third,.column.is-one-third-tablet{flex:none;width:33.3333%}.column.is-one-quarter,.column.is-one-quarter-tablet{flex:none;width:25%}.column.is-one-fifth,.column.is-one-fifth-tablet{flex:none;width:20%}.column.is-two-fifths,.column.is-two-fifths-tablet{flex:none;width:40%}.column.is-three-fifths,.column.is-three-fifths-tablet{flex:none;width:60%}.column.is-four-fifths,.column.is-four-fifths-tablet{flex:none;width:80%}.column.is-offset-three-quarters,.column.is-offset-three-quarters-tablet{margin-left:75%}.column.is-offset-two-thirds,.column.is-offset-two-thirds-tablet{margin-left:66.6666%}.column.is-offset-half,.column.is-offset-half-tablet{margin-left:50%}.column.is-offset-one-third,.column.is-offset-one-third-tablet{margin-left:33.3333%}.column.is-offset-one-quarter,.column.is-offset-one-quarter-tablet{margin-left:25%}.column.is-offset-one-fifth,.column.is-offset-one-fifth-tablet{margin-left:20%}.column.is-offset-two-fifths,.column.is-offset-two-fifths-tablet{margin-left:40%}.column.is-offset-three-fifths,.column.is-offset-three-fifths-tablet{margin-left:60%}.column.is-offset-four-fifths,.column.is-offset-four-fifths-tablet{margin-left:80%}.column.is-0,.column.is-0-tablet{flex:none;width:0%}.column.is-offset-0,.column.is-offset-0-tablet{margin-left:0}.column.is-1,.column.is-1-tablet{flex:none;width:8.33333%}.column.is-offset-1,.column.is-offset-1-tablet{margin-left:8.33333%}.column.is-2,.column.is-2-tablet{flex:none;width:16.66667%}.column.is-offset-2,.column.is-offset-2-tablet{margin-left:16.66667%}.column.is-3,.column.is-3-tablet{flex:none;width:25%}.column.is-offset-3,.column.is-offset-3-tablet{margin-left:25%}.column.is-4,.column.is-4-tablet{flex:none;width:33.33333%}.column.is-offset-4,.column.is-offset-4-tablet{margin-left:33.33333%}.column.is-5,.column.is-5-tablet{flex:none;width:41.66667%}.column.is-offset-5,.column.is-offset-5-tablet{margin-left:41.66667%}.column.is-6,.column.is-6-tablet{flex:none;width:50%}.column.is-offset-6,.column.is-offset-6-tablet{margin-left:50%}.column.is-7,.column.is-7-tablet{flex:none;width:58.33333%}.column.is-offset-7,.column.is-offset-7-tablet{margin-left:58.33333%}.column.is-8,.column.is-8-tablet{flex:none;width:66.66667%}.column.is-offset-8,.column.is-offset-8-tablet{margin-left:66.66667%}.column.is-9,.column.is-9-tablet{flex:none;width:75%}.column.is-offset-9,.column.is-offset-9-tablet{margin-left:75%}.column.is-10,.column.is-10-tablet{flex:none;width:83.33333%}.column.is-offset-10,.column.is-offset-10-tablet{margin-left:83.33333%}.column.is-11,.column.is-11-tablet{flex:none;width:91.66667%}.column.is-offset-11,.column.is-offset-11-tablet{margin-left:91.66667%}.column.is-12,.column.is-12-tablet{flex:none;width:100%}.column.is-offset-12,.column.is-offset-12-tablet{margin-left:100%}}@media screen and (max-width:1023px){.column.is-narrow-touch{flex:none}.column.is-full-touch{flex:none;width:100%}.column.is-three-quarters-touch{flex:none;width:75%}.column.is-two-thirds-touch{flex:none;width:66.6666%}.column.is-half-touch{flex:none;width:50%}.column.is-one-third-touch{flex:none;width:33.3333%}.column.is-one-quarter-touch{flex:none;width:25%}.column.is-one-fifth-touch{flex:none;width:20%}.column.is-two-fifths-touch{flex:none;width:40%}.column.is-three-fifths-touch{flex:none;width:60%}.column.is-four-fifths-touch{flex:none;width:80%}.column.is-offset-three-quarters-touch{margin-left:75%}.column.is-offset-two-thirds-touch{margin-left:66.6666%}.column.is-offset-half-touch{margin-left:50%}.column.is-offset-one-third-touch{margin-left:33.3333%}.column.is-offset-one-quarter-touch{margin-left:25%}.column.is-offset-one-fifth-touch{margin-left:20%}.column.is-offset-two-fifths-touch{margin-left:40%}.column.is-offset-three-fifths-touch{margin-left:60%}.column.is-offset-four-fifths-touch{margin-left:80%}.column.is-0-touch{flex:none;width:0%}.column.is-offset-0-touch{margin-left:0}.column.is-1-touch{flex:none;width:8.33333%}.column.is-offset-1-touch{margin-left:8.33333%}.column.is-2-touch{flex:none;width:16.66667%}.column.is-offset-2-touch{margin-left:16.66667%}.column.is-3-touch{flex:none;width:25%}.column.is-offset-3-touch{margin-left:25%}.column.is-4-touch{flex:none;width:33.33333%}.column.is-offset-4-touch{margin-left:33.33333%}.column.is-5-touch{flex:none;width:41.66667%}.column.is-offset-5-touch{margin-left:41.66667%}.column.is-6-touch{flex:none;width:50%}.column.is-offset-6-touch{margin-left:50%}.column.is-7-touch{flex:none;width:58.33333%}.column.is-offset-7-touch{margin-left:58.33333%}.column.is-8-touch{flex:none;width:66.66667%}.column.is-offset-8-touch{margin-left:66.66667%}.column.is-9-touch{flex:none;width:75%}.column.is-offset-9-touch{margin-left:75%}.column.is-10-touch{flex:none;width:83.33333%}.column.is-offset-10-touch{margin-left:83.33333%}.column.is-11-touch{flex:none;width:91.66667%}.column.is-offset-11-touch{margin-left:91.66667%}.column.is-12-touch{flex:none;width:100%}.column.is-offset-12-touch{margin-left:100%}}@media screen and (min-width:1024px){.column.is-narrow-desktop{flex:none}.column.is-full-desktop{flex:none;width:100%}.column.is-three-quarters-desktop{flex:none;width:75%}.column.is-two-thirds-desktop{flex:none;width:66.6666%}.column.is-half-desktop{flex:none;width:50%}.column.is-one-third-desktop{flex:none;width:33.3333%}.column.is-one-quarter-desktop{flex:none;width:25%}.column.is-one-fifth-desktop{flex:none;width:20%}.column.is-two-fifths-desktop{flex:none;width:40%}.column.is-three-fifths-desktop{flex:none;width:60%}.column.is-four-fifths-desktop{flex:none;width:80%}.column.is-offset-three-quarters-desktop{margin-left:75%}.column.is-offset-two-thirds-desktop{margin-left:66.6666%}.column.is-offset-half-desktop{margin-left:50%}.column.is-offset-one-third-desktop{margin-left:33.3333%}.column.is-offset-one-quarter-desktop{margin-left:25%}.column.is-offset-one-fifth-desktop{margin-left:20%}.column.is-offset-two-fifths-desktop{margin-left:40%}.column.is-offset-three-fifths-desktop{margin-left:60%}.column.is-offset-four-fifths-desktop{margin-left:80%}.column.is-0-desktop{flex:none;width:0%}.column.is-offset-0-desktop{margin-left:0}.column.is-1-desktop{flex:none;width:8.33333%}.column.is-offset-1-desktop{margin-left:8.33333%}.column.is-2-desktop{flex:none;width:16.66667%}.column.is-offset-2-desktop{margin-left:16.66667%}.column.is-3-desktop{flex:none;width:25%}.column.is-offset-3-desktop{margin-left:25%}.column.is-4-desktop{flex:none;width:33.33333%}.column.is-offset-4-desktop{margin-left:33.33333%}.column.is-5-desktop{flex:none;width:41.66667%}.column.is-offset-5-desktop{margin-left:41.66667%}.column.is-6-desktop{flex:none;width:50%}.column.is-offset-6-desktop{margin-left:50%}.column.is-7-desktop{flex:none;width:58.33333%}.column.is-offset-7-desktop{margin-left:58.33333%}.column.is-8-desktop{flex:none;width:66.66667%}.column.is-offset-8-desktop{margin-left:66.66667%}.column.is-9-desktop{flex:none;width:75%}.column.is-offset-9-desktop{margin-left:75%}.column.is-10-desktop{flex:none;width:83.33333%}.column.is-offset-10-desktop{margin-left:83.33333%}.column.is-11-desktop{flex:none;width:91.66667%}.column.is-offset-11-desktop{margin-left:91.66667%}.column.is-12-desktop{flex:none;width:100%}.column.is-offset-12-desktop{margin-left:100%}}@media screen and (min-width:1216px){.column.is-narrow-widescreen{flex:none}.column.is-full-widescreen{flex:none;width:100%}.column.is-three-quarters-widescreen{flex:none;width:75%}.column.is-two-thirds-widescreen{flex:none;width:66.6666%}.column.is-half-widescreen{flex:none;width:50%}.column.is-one-third-widescreen{flex:none;width:33.3333%}.column.is-one-quarter-widescreen{flex:none;width:25%}.column.is-one-fifth-widescreen{flex:none;width:20%}.column.is-two-fifths-widescreen{flex:none;width:40%}.column.is-three-fifths-widescreen{flex:none;width:60%}.column.is-four-fifths-widescreen{flex:none;width:80%}.column.is-offset-three-quarters-widescreen{margin-left:75%}.column.is-offset-two-thirds-widescreen{margin-left:66.6666%}.column.is-offset-half-widescreen{margin-left:50%}.column.is-offset-one-third-widescreen{margin-left:33.3333%}.column.is-offset-one-quarter-widescreen{margin-left:25%}.column.is-offset-one-fifth-widescreen{margin-left:20%}.column.is-offset-two-fifths-widescreen{margin-left:40%}.column.is-offset-three-fifths-widescreen{margin-left:60%}.column.is-offset-four-fifths-widescreen{margin-left:80%}.column.is-0-widescreen{flex:none;width:0%}.column.is-offset-0-widescreen{margin-left:0}.column.is-1-widescreen{flex:none;width:8.33333%}.column.is-offset-1-widescreen{margin-left:8.33333%}.column.is-2-widescreen{flex:none;width:16.66667%}.column.is-offset-2-widescreen{margin-left:16.66667%}.column.is-3-widescreen{flex:none;width:25%}.column.is-offset-3-widescreen{margin-left:25%}.column.is-4-widescreen{flex:none;width:33.33333%}.column.is-offset-4-widescreen{margin-left:33.33333%}.column.is-5-widescreen{flex:none;width:41.66667%}.column.is-offset-5-widescreen{margin-left:41.66667%}.column.is-6-widescreen{flex:none;width:50%}.column.is-offset-6-widescreen{margin-left:50%}.column.is-7-widescreen{flex:none;width:58.33333%}.column.is-offset-7-widescreen{margin-left:58.33333%}.column.is-8-widescreen{flex:none;width:66.66667%}.column.is-offset-8-widescreen{margin-left:66.66667%}.column.is-9-widescreen{flex:none;width:75%}.column.is-offset-9-widescreen{margin-left:75%}.column.is-10-widescreen{flex:none;width:83.33333%}.column.is-offset-10-widescreen{margin-left:83.33333%}.column.is-11-widescreen{flex:none;width:91.66667%}.column.is-offset-11-widescreen{margin-left:91.66667%}.column.is-12-widescreen{flex:none;width:100%}.column.is-offset-12-widescreen{margin-left:100%}}@media screen and (min-width:1408px){.column.is-narrow-fullhd{flex:none}.column.is-full-fullhd{flex:none;width:100%}.column.is-three-quarters-fullhd{flex:none;width:75%}.column.is-two-thirds-fullhd{flex:none;width:66.6666%}.column.is-half-fullhd{flex:none;width:50%}.column.is-one-third-fullhd{flex:none;width:33.3333%}.column.is-one-quarter-fullhd{flex:none;width:25%}.column.is-one-fifth-fullhd{flex:none;width:20%}.column.is-two-fifths-fullhd{flex:none;width:40%}.column.is-three-fifths-fullhd{flex:none;width:60%}.column.is-four-fifths-fullhd{flex:none;width:80%}.column.is-offset-three-quarters-fullhd{margin-left:75%}.column.is-offset-two-thirds-fullhd{margin-left:66.6666%}.column.is-offset-half-fullhd{margin-left:50%}.column.is-offset-one-third-fullhd{margin-left:33.3333%}.column.is-offset-one-quarter-fullhd{margin-left:25%}.column.is-offset-one-fifth-fullhd{margin-left:20%}.column.is-offset-two-fifths-fullhd{margin-left:40%}.column.is-offset-three-fifths-fullhd{margin-left:60%}.column.is-offset-four-fifths-fullhd{margin-left:80%}.column.is-0-fullhd{flex:none;width:0%}.column.is-offset-0-fullhd{margin-left:0}.column.is-1-fullhd{flex:none;width:8.33333%}.column.is-offset-1-fullhd{margin-left:8.33333%}.column.is-2-fullhd{flex:none;width:16.66667%}.column.is-offset-2-fullhd{margin-left:16.66667%}.column.is-3-fullhd{flex:none;width:25%}.column.is-offset-3-fullhd{margin-left:25%}.column.is-4-fullhd{flex:none;width:33.33333%}.column.is-offset-4-fullhd{margin-left:33.33333%}.column.is-5-fullhd{flex:none;width:41.66667%}.column.is-offset-5-fullhd{margin-left:41.66667%}.column.is-6-fullhd{flex:none;width:50%}.column.is-offset-6-fullhd{margin-left:50%}.column.is-7-fullhd{flex:none;width:58.33333%}.column.is-offset-7-fullhd{margin-left:58.33333%}.column.is-8-fullhd{flex:none;width:66.66667%}.column.is-offset-8-fullhd{margin-left:66.66667%}.column.is-9-fullhd{flex:none;width:75%}.column.is-offset-9-fullhd{margin-left:75%}.column.is-10-fullhd{flex:none;width:83.33333%}.column.is-offset-10-fullhd{margin-left:83.33333%}.column.is-11-fullhd{flex:none;width:91.66667%}.column.is-offset-11-fullhd{margin-left:91.66667%}.column.is-12-fullhd{flex:none;width:100%}.column.is-offset-12-fullhd{margin-left:100%}}.columns{margin-left:-.75rem;margin-right:-.75rem;margin-top:-.75rem}.columns:last-child{margin-bottom:-.75rem}.columns:not(:last-child){margin-bottom:calc(1.5rem - .75rem)}.columns.is-centered{justify-content:center}.columns.is-gapless{margin-left:0;margin-right:0;margin-top:0}.columns.is-gapless>.column{margin:0;padding:0!important}.columns.is-gapless:not(:last-child){margin-bottom:1.5rem}.columns.is-gapless:last-child{margin-bottom:0}.columns.is-mobile{display:flex}.columns.is-multiline{flex-wrap:wrap}.columns.is-vcentered{align-items:center}@media screen and (min-width:769px),print{.columns:not(.is-desktop){display:flex}}@media screen and (min-width:1024px){.columns.is-desktop{display:flex}}.columns.is-variable{--columnGap:0.75rem;margin-left:calc(-1 * var(--columnGap));margin-right:calc(-1 * var(--columnGap))}.columns.is-variable .column{padding-left:var(--columnGap);padding-right:var(--columnGap)}.columns.is-variable.is-0{--columnGap:0rem}@media screen and (max-width:768px){.columns.is-variable.is-0-mobile{--columnGap:0rem}}@media screen and (min-width:769px),print{.columns.is-variable.is-0-tablet{--columnGap:0rem}}@media screen and (min-width:769px) and (max-width:1023px){.columns.is-variable.is-0-tablet-only{--columnGap:0rem}}@media screen and (max-width:1023px){.columns.is-variable.is-0-touch{--columnGap:0rem}}@media screen and (min-width:1024px){.columns.is-variable.is-0-desktop{--columnGap:0rem}}@media screen and (min-width:1024px) and (max-width:1215px){.columns.is-variable.is-0-desktop-only{--columnGap:0rem}}@media screen and (min-width:1216px){.columns.is-variable.is-0-widescreen{--columnGap:0rem}}@media screen and (min-width:1216px) and (max-width:1407px){.columns.is-variable.is-0-widescreen-only{--columnGap:0rem}}@media screen and (min-width:1408px){.columns.is-variable.is-0-fullhd{--columnGap:0rem}}.columns.is-variable.is-1{--columnGap:0.25rem}@media screen and (max-width:768px){.columns.is-variable.is-1-mobile{--columnGap:0.25rem}}@media screen and (min-width:769px),print{.columns.is-variable.is-1-tablet{--columnGap:0.25rem}}@media screen and (min-width:769px) and (max-width:1023px){.columns.is-variable.is-1-tablet-only{--columnGap:0.25rem}}@media screen and (max-width:1023px){.columns.is-variable.is-1-touch{--columnGap:0.25rem}}@media screen and (min-width:1024px){.columns.is-variable.is-1-desktop{--columnGap:0.25rem}}@media screen and (min-width:1024px) and (max-width:1215px){.columns.is-variable.is-1-desktop-only{--columnGap:0.25rem}}@media screen and (min-width:1216px){.columns.is-variable.is-1-widescreen{--columnGap:0.25rem}}@media screen and (min-width:1216px) and (max-width:1407px){.columns.is-variable.is-1-widescreen-only{--columnGap:0.25rem}}@media screen and (min-width:1408px){.columns.is-variable.is-1-fullhd{--columnGap:0.25rem}}.columns.is-variable.is-2{--columnGap:0.5rem}@media screen and (max-width:768px){.columns.is-variable.is-2-mobile{--columnGap:0.5rem}}@media screen and (min-width:769px),print{.columns.is-variable.is-2-tablet{--columnGap:0.5rem}}@media screen and (min-width:769px) and (max-width:1023px){.columns.is-variable.is-2-tablet-only{--columnGap:0.5rem}}@media screen and (max-width:1023px){.columns.is-variable.is-2-touch{--columnGap:0.5rem}}@media screen and (min-width:1024px){.columns.is-variable.is-2-desktop{--columnGap:0.5rem}}@media screen and (min-width:1024px) and (max-width:1215px){.columns.is-variable.is-2-desktop-only{--columnGap:0.5rem}}@media screen and (min-width:1216px){.columns.is-variable.is-2-widescreen{--columnGap:0.5rem}}@media screen and (min-width:1216px) and (max-width:1407px){.columns.is-variable.is-2-widescreen-only{--columnGap:0.5rem}}@media screen and (min-width:1408px){.columns.is-variable.is-2-fullhd{--columnGap:0.5rem}}.columns.is-variable.is-3{--columnGap:0.75rem}@media screen and (max-width:768px){.columns.is-variable.is-3-mobile{--columnGap:0.75rem}}@media screen and (min-width:769px),print{.columns.is-variable.is-3-tablet{--columnGap:0.75rem}}@media screen and (min-width:769px) and (max-width:1023px){.columns.is-variable.is-3-tablet-only{--columnGap:0.75rem}}@media screen and (max-width:1023px){.columns.is-variable.is-3-touch{--columnGap:0.75rem}}@media screen and (min-width:1024px){.columns.is-variable.is-3-desktop{--columnGap:0.75rem}}@media screen and (min-width:1024px) and (max-width:1215px){.columns.is-variable.is-3-desktop-only{--columnGap:0.75rem}}@media screen and (min-width:1216px){.columns.is-variable.is-3-widescreen{--columnGap:0.75rem}}@media screen and (min-width:1216px) and (max-width:1407px){.columns.is-variable.is-3-widescreen-only{--columnGap:0.75rem}}@media screen and (min-width:1408px){.columns.is-variable.is-3-fullhd{--columnGap:0.75rem}}.columns.is-variable.is-4{--columnGap:1rem}@media screen and (max-width:768px){.columns.is-variable.is-4-mobile{--columnGap:1rem}}@media screen and (min-width:769px),print{.columns.is-variable.is-4-tablet{--columnGap:1rem}}@media screen and (min-width:769px) and (max-width:1023px){.columns.is-variable.is-4-tablet-only{--columnGap:1rem}}@media screen and (max-width:1023px){.columns.is-variable.is-4-touch{--columnGap:1rem}}@media screen and (min-width:1024px){.columns.is-variable.is-4-desktop{--columnGap:1rem}}@media screen and (min-width:1024px) and (max-width:1215px){.columns.is-variable.is-4-desktop-only{--columnGap:1rem}}@media screen and (min-width:1216px){.columns.is-variable.is-4-widescreen{--columnGap:1rem}}@media screen and (min-width:1216px) and (max-width:1407px){.columns.is-variable.is-4-widescreen-only{--columnGap:1rem}}@media screen and (min-width:1408px){.columns.is-variable.is-4-fullhd{--columnGap:1rem}}.columns.is-variable.is-5{--columnGap:1.25rem}@media screen and (max-width:768px){.columns.is-variable.is-5-mobile{--columnGap:1.25rem}}@media screen and (min-width:769px),print{.columns.is-variable.is-5-tablet{--columnGap:1.25rem}}@media screen and (min-width:769px) and (max-width:1023px){.columns.is-variable.is-5-tablet-only{--columnGap:1.25rem}}@media screen and (max-width:1023px){.columns.is-variable.is-5-touch{--columnGap:1.25rem}}@media screen and (min-width:1024px){.columns.is-variable.is-5-desktop{--columnGap:1.25rem}}@media screen and (min-width:1024px) and (max-width:1215px){.columns.is-variable.is-5-desktop-only{--columnGap:1.25rem}}@media screen and (min-width:1216px){.columns.is-variable.is-5-widescreen{--columnGap:1.25rem}}@media screen and (min-width:1216px) and (max-width:1407px){.columns.is-variable.is-5-widescreen-only{--columnGap:1.25rem}}@media screen and (min-width:1408px){.columns.is-variable.is-5-fullhd{--columnGap:1.25rem}}.columns.is-variable.is-6{--columnGap:1.5rem}@media screen and (max-width:768px){.columns.is-variable.is-6-mobile{--columnGap:1.5rem}}@media screen and (min-width:769px),print{.columns.is-variable.is-6-tablet{--columnGap:1.5rem}}@media screen and (min-width:769px) and (max-width:1023px){.columns.is-variable.is-6-tablet-only{--columnGap:1.5rem}}@media screen and (max-width:1023px){.columns.is-variable.is-6-touch{--columnGap:1.5rem}}@media screen and (min-width:1024px){.columns.is-variable.is-6-desktop{--columnGap:1.5rem}}@media screen and (min-width:1024px) and (max-width:1215px){.columns.is-variable.is-6-desktop-only{--columnGap:1.5rem}}@media screen and (min-width:1216px){.columns.is-variable.is-6-widescreen{--columnGap:1.5rem}}@media screen and (min-width:1216px) and (max-width:1407px){.columns.is-variable.is-6-widescreen-only{--columnGap:1.5rem}}@media screen and (min-width:1408px){.columns.is-variable.is-6-fullhd{--columnGap:1.5rem}}.columns.is-variable.is-7{--columnGap:1.75rem}@media screen and (max-width:768px){.columns.is-variable.is-7-mobile{--columnGap:1.75rem}}@media screen and (min-width:769px),print{.columns.is-variable.is-7-tablet{--columnGap:1.75rem}}@media screen and (min-width:769px) and (max-width:1023px){.columns.is-variable.is-7-tablet-only{--columnGap:1.75rem}}@media screen and (max-width:1023px){.columns.is-variable.is-7-touch{--columnGap:1.75rem}}@media screen and (min-width:1024px){.columns.is-variable.is-7-desktop{--columnGap:1.75rem}}@media screen and (min-width:1024px) and (max-width:1215px){.columns.is-variable.is-7-desktop-only{--columnGap:1.75rem}}@media screen and (min-width:1216px){.columns.is-variable.is-7-widescreen{--columnGap:1.75rem}}@media screen and (min-width:1216px) and (max-width:1407px){.columns.is-variable.is-7-widescreen-only{--columnGap:1.75rem}}@media screen and (min-width:1408px){.columns.is-variable.is-7-fullhd{--columnGap:1.75rem}}.columns.is-variable.is-8{--columnGap:2rem}@media screen and (max-width:768px){.columns.is-variable.is-8-mobile{--columnGap:2rem}}@media screen and (min-width:769px),print{.columns.is-variable.is-8-tablet{--columnGap:2rem}}@media screen and (min-width:769px) and (max-width:1023px){.columns.is-variable.is-8-tablet-only{--columnGap:2rem}}@media screen and (max-width:1023px){.columns.is-variable.is-8-touch{--columnGap:2rem}}@media screen and (min-width:1024px){.columns.is-variable.is-8-desktop{--columnGap:2rem}}@media screen and (min-width:1024px) and (max-width:1215px){.columns.is-variable.is-8-desktop-only{--columnGap:2rem}}@media screen and (min-width:1216px){.columns.is-variable.is-8-widescreen{--columnGap:2rem}}@media screen and (min-width:1216px) and (max-width:1407px){.columns.is-variable.is-8-widescreen-only{--columnGap:2rem}}@media screen and (min-width:1408px){.columns.is-variable.is-8-fullhd{--columnGap:2rem}}.tile{align-items:stretch;display:block;flex-basis:0;flex-grow:1;flex-shrink:1;min-height:-webkit-min-content;min-height:-moz-min-content;min-height:min-content}.tile.is-ancestor{margin-left:-.75rem;margin-right:-.75rem;margin-top:-.75rem}.tile.is-ancestor:last-child{margin-bottom:-.75rem}.tile.is-ancestor:not(:last-child){margin-bottom:.75rem}.tile.is-child{margin:0!important}.tile.is-parent{padding:.75rem}.tile.is-vertical{flex-direction:column}.tile.is-vertical>.tile.is-child:not(:last-child){margin-bottom:1.5rem!important}@media screen and (min-width:769px),print{.tile:not(.is-child){display:flex}.tile.is-1{flex:none;width:8.33333%}.tile.is-2{flex:none;width:16.66667%}.tile.is-3{flex:none;width:25%}.tile.is-4{flex:none;width:33.33333%}.tile.is-5{flex:none;width:41.66667%}.tile.is-6{flex:none;width:50%}.tile.is-7{flex:none;width:58.33333%}.tile.is-8{flex:none;width:66.66667%}.tile.is-9{flex:none;width:75%}.tile.is-10{flex:none;width:83.33333%}.tile.is-11{flex:none;width:91.66667%}.tile.is-12{flex:none;width:100%}}.hero{align-items:stretch;display:flex;flex-direction:column;justify-content:space-between}.hero .navbar{background:0 0}.hero .tabs ul{border-bottom:none}.hero.is-white{background-color:#fff;color:#0a0a0a}.hero.is-white a:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),.hero.is-white strong{color:inherit}.hero.is-white .title{color:#0a0a0a}.hero.is-white .subtitle{color:rgba(10,10,10,.9)}.hero.is-white .subtitle a:not(.button),.hero.is-white .subtitle strong{color:#0a0a0a}@media screen and (max-width:1023px){.hero.is-white .navbar-menu{background-color:#fff}}.hero.is-white .navbar-item,.hero.is-white .navbar-link{color:rgba(10,10,10,.7)}.hero.is-white .navbar-link.is-active,.hero.is-white .navbar-link:hover,.hero.is-white a.navbar-item.is-active,.hero.is-white a.navbar-item:hover{background-color:#f2f2f2;color:#0a0a0a}.hero.is-white .tabs a{color:#0a0a0a;opacity:.9}.hero.is-white .tabs a:hover{opacity:1}.hero.is-white .tabs li.is-active a{opacity:1}.hero.is-white .tabs.is-boxed a,.hero.is-white .tabs.is-toggle a{color:#0a0a0a}.hero.is-white .tabs.is-boxed a:hover,.hero.is-white .tabs.is-toggle a:hover{background-color:rgba(10,10,10,.1)}.hero.is-white .tabs.is-boxed li.is-active a,.hero.is-white .tabs.is-boxed li.is-active a:hover,.hero.is-white .tabs.is-toggle li.is-active a,.hero.is-white .tabs.is-toggle li.is-active a:hover{background-color:#0a0a0a;border-color:#0a0a0a;color:#fff}.hero.is-white.is-bold{background-image:linear-gradient(141deg,#e6e6e6 0,#fff 71%,#fff 100%)}@media screen and (max-width:768px){.hero.is-white.is-bold .navbar-menu{background-image:linear-gradient(141deg,#e6e6e6 0,#fff 71%,#fff 100%)}}.hero.is-black{background-color:#0a0a0a;color:#fff}.hero.is-black a:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),.hero.is-black strong{color:inherit}.hero.is-black .title{color:#fff}.hero.is-black .subtitle{color:rgba(255,255,255,.9)}.hero.is-black .subtitle a:not(.button),.hero.is-black .subtitle strong{color:#fff}@media screen and (max-width:1023px){.hero.is-black .navbar-menu{background-color:#0a0a0a}}.hero.is-black .navbar-item,.hero.is-black .navbar-link{color:rgba(255,255,255,.7)}.hero.is-black .navbar-link.is-active,.hero.is-black .navbar-link:hover,.hero.is-black a.navbar-item.is-active,.hero.is-black a.navbar-item:hover{background-color:#000;color:#fff}.hero.is-black .tabs a{color:#fff;opacity:.9}.hero.is-black .tabs a:hover{opacity:1}.hero.is-black .tabs li.is-active a{opacity:1}.hero.is-black .tabs.is-boxed a,.hero.is-black .tabs.is-toggle a{color:#fff}.hero.is-black .tabs.is-boxed a:hover,.hero.is-black .tabs.is-toggle a:hover{background-color:rgba(10,10,10,.1)}.hero.is-black .tabs.is-boxed li.is-active a,.hero.is-black .tabs.is-boxed li.is-active a:hover,.hero.is-black .tabs.is-toggle li.is-active a,.hero.is-black .tabs.is-toggle li.is-active a:hover{background-color:#fff;border-color:#fff;color:#0a0a0a}.hero.is-black.is-bold{background-image:linear-gradient(141deg,#000 0,#0a0a0a 71%,#181616 100%)}@media screen and (max-width:768px){.hero.is-black.is-bold .navbar-menu{background-image:linear-gradient(141deg,#000 0,#0a0a0a 71%,#181616 100%)}}.hero.is-light{background-color:#f5f5f5;color:#363636}.hero.is-light a:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),.hero.is-light strong{color:inherit}.hero.is-light .title{color:#363636}.hero.is-light .subtitle{color:rgba(54,54,54,.9)}.hero.is-light .subtitle a:not(.button),.hero.is-light .subtitle strong{color:#363636}@media screen and (max-width:1023px){.hero.is-light .navbar-menu{background-color:#f5f5f5}}.hero.is-light .navbar-item,.hero.is-light .navbar-link{color:rgba(54,54,54,.7)}.hero.is-light .navbar-link.is-active,.hero.is-light .navbar-link:hover,.hero.is-light a.navbar-item.is-active,.hero.is-light a.navbar-item:hover{background-color:#e8e8e8;color:#363636}.hero.is-light .tabs a{color:#363636;opacity:.9}.hero.is-light .tabs a:hover{opacity:1}.hero.is-light .tabs li.is-active a{opacity:1}.hero.is-light .tabs.is-boxed a,.hero.is-light .tabs.is-toggle a{color:#363636}.hero.is-light .tabs.is-boxed a:hover,.hero.is-light .tabs.is-toggle a:hover{background-color:rgba(10,10,10,.1)}.hero.is-light .tabs.is-boxed li.is-active a,.hero.is-light .tabs.is-boxed li.is-active a:hover,.hero.is-light .tabs.is-toggle li.is-active a,.hero.is-light .tabs.is-toggle li.is-active a:hover{background-color:#363636;border-color:#363636;color:#f5f5f5}.hero.is-light.is-bold{background-image:linear-gradient(141deg,#dfd8d9 0,#f5f5f5 71%,#fff 100%)}@media screen and (max-width:768px){.hero.is-light.is-bold .navbar-menu{background-image:linear-gradient(141deg,#dfd8d9 0,#f5f5f5 71%,#fff 100%)}}.hero.is-dark{background-color:#363636;color:#f5f5f5}.hero.is-dark a:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),.hero.is-dark strong{color:inherit}.hero.is-dark .title{color:#f5f5f5}.hero.is-dark .subtitle{color:rgba(245,245,245,.9)}.hero.is-dark .subtitle a:not(.button),.hero.is-dark .subtitle strong{color:#f5f5f5}@media screen and (max-width:1023px){.hero.is-dark .navbar-menu{background-color:#363636}}.hero.is-dark .navbar-item,.hero.is-dark .navbar-link{color:rgba(245,245,245,.7)}.hero.is-dark .navbar-link.is-active,.hero.is-dark .navbar-link:hover,.hero.is-dark a.navbar-item.is-active,.hero.is-dark a.navbar-item:hover{background-color:#292929;color:#f5f5f5}.hero.is-dark .tabs a{color:#f5f5f5;opacity:.9}.hero.is-dark .tabs a:hover{opacity:1}.hero.is-dark .tabs li.is-active a{opacity:1}.hero.is-dark .tabs.is-boxed a,.hero.is-dark .tabs.is-toggle a{color:#f5f5f5}.hero.is-dark .tabs.is-boxed a:hover,.hero.is-dark .tabs.is-toggle a:hover{background-color:rgba(10,10,10,.1)}.hero.is-dark .tabs.is-boxed li.is-active a,.hero.is-dark .tabs.is-boxed li.is-active a:hover,.hero.is-dark .tabs.is-toggle li.is-active a,.hero.is-dark .tabs.is-toggle li.is-active a:hover{background-color:#f5f5f5;border-color:#f5f5f5;color:#363636}.hero.is-dark.is-bold{background-image:linear-gradient(141deg,#1f191a 0,#363636 71%,#46403f 100%)}@media screen and (max-width:768px){.hero.is-dark.is-bold .navbar-menu{background-image:linear-gradient(141deg,#1f191a 0,#363636 71%,#46403f 100%)}}.hero.is-primary{background-color:#00d1b2;color:#fff}.hero.is-primary a:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),.hero.is-primary strong{color:inherit}.hero.is-primary .title{color:#fff}.hero.is-primary .subtitle{color:rgba(255,255,255,.9)}.hero.is-primary .subtitle a:not(.button),.hero.is-primary .subtitle strong{color:#fff}@media screen and (max-width:1023px){.hero.is-primary .navbar-menu{background-color:#00d1b2}}.hero.is-primary .navbar-item,.hero.is-primary .navbar-link{color:rgba(255,255,255,.7)}.hero.is-primary .navbar-link.is-active,.hero.is-primary .navbar-link:hover,.hero.is-primary a.navbar-item.is-active,.hero.is-primary a.navbar-item:hover{background-color:#00b89c;color:#fff}.hero.is-primary .tabs a{color:#fff;opacity:.9}.hero.is-primary .tabs a:hover{opacity:1}.hero.is-primary .tabs li.is-active a{opacity:1}.hero.is-primary .tabs.is-boxed a,.hero.is-primary .tabs.is-toggle a{color:#fff}.hero.is-primary .tabs.is-boxed a:hover,.hero.is-primary .tabs.is-toggle a:hover{background-color:rgba(10,10,10,.1)}.hero.is-primary .tabs.is-boxed li.is-active a,.hero.is-primary .tabs.is-boxed li.is-active a:hover,.hero.is-primary .tabs.is-toggle li.is-active a,.hero.is-primary .tabs.is-toggle li.is-active a:hover{background-color:#fff;border-color:#fff;color:#00d1b2}.hero.is-primary.is-bold{background-image:linear-gradient(141deg,#009e6c 0,#00d1b2 71%,#00e7eb 100%)}@media screen and (max-width:768px){.hero.is-primary.is-bold .navbar-menu{background-image:linear-gradient(141deg,#009e6c 0,#00d1b2 71%,#00e7eb 100%)}}.hero.is-link{background-color:#3273dc;color:#fff}.hero.is-link a:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),.hero.is-link strong{color:inherit}.hero.is-link .title{color:#fff}.hero.is-link .subtitle{color:rgba(255,255,255,.9)}.hero.is-link .subtitle a:not(.button),.hero.is-link .subtitle strong{color:#fff}@media screen and (max-width:1023px){.hero.is-link .navbar-menu{background-color:#3273dc}}.hero.is-link .navbar-item,.hero.is-link .navbar-link{color:rgba(255,255,255,.7)}.hero.is-link .navbar-link.is-active,.hero.is-link .navbar-link:hover,.hero.is-link a.navbar-item.is-active,.hero.is-link a.navbar-item:hover{background-color:#2366d1;color:#fff}.hero.is-link .tabs a{color:#fff;opacity:.9}.hero.is-link .tabs a:hover{opacity:1}.hero.is-link .tabs li.is-active a{opacity:1}.hero.is-link .tabs.is-boxed a,.hero.is-link .tabs.is-toggle a{color:#fff}.hero.is-link .tabs.is-boxed a:hover,.hero.is-link .tabs.is-toggle a:hover{background-color:rgba(10,10,10,.1)}.hero.is-link .tabs.is-boxed li.is-active a,.hero.is-link .tabs.is-boxed li.is-active a:hover,.hero.is-link .tabs.is-toggle li.is-active a,.hero.is-link .tabs.is-toggle li.is-active a:hover{background-color:#fff;border-color:#fff;color:#3273dc}.hero.is-link.is-bold{background-image:linear-gradient(141deg,#1577c6 0,#3273dc 71%,#4366e5 100%)}@media screen and (max-width:768px){.hero.is-link.is-bold .navbar-menu{background-image:linear-gradient(141deg,#1577c6 0,#3273dc 71%,#4366e5 100%)}}.hero.is-info{background-color:#209cee;color:#fff}.hero.is-info a:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),.hero.is-info strong{color:inherit}.hero.is-info .title{color:#fff}.hero.is-info .subtitle{color:rgba(255,255,255,.9)}.hero.is-info .subtitle a:not(.button),.hero.is-info .subtitle strong{color:#fff}@media screen and (max-width:1023px){.hero.is-info .navbar-menu{background-color:#209cee}}.hero.is-info .navbar-item,.hero.is-info .navbar-link{color:rgba(255,255,255,.7)}.hero.is-info .navbar-link.is-active,.hero.is-info .navbar-link:hover,.hero.is-info a.navbar-item.is-active,.hero.is-info a.navbar-item:hover{background-color:#118fe4;color:#fff}.hero.is-info .tabs a{color:#fff;opacity:.9}.hero.is-info .tabs a:hover{opacity:1}.hero.is-info .tabs li.is-active a{opacity:1}.hero.is-info .tabs.is-boxed a,.hero.is-info .tabs.is-toggle a{color:#fff}.hero.is-info .tabs.is-boxed a:hover,.hero.is-info .tabs.is-toggle a:hover{background-color:rgba(10,10,10,.1)}.hero.is-info .tabs.is-boxed li.is-active a,.hero.is-info .tabs.is-boxed li.is-active a:hover,.hero.is-info .tabs.is-toggle li.is-active a,.hero.is-info .tabs.is-toggle li.is-active a:hover{background-color:#fff;border-color:#fff;color:#209cee}.hero.is-info.is-bold{background-image:linear-gradient(141deg,#04a6d7 0,#209cee 71%,#3287f5 100%)}@media screen and (max-width:768px){.hero.is-info.is-bold .navbar-menu{background-image:linear-gradient(141deg,#04a6d7 0,#209cee 71%,#3287f5 100%)}}.hero.is-success{background-color:#23d160;color:#fff}.hero.is-success a:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),.hero.is-success strong{color:inherit}.hero.is-success .title{color:#fff}.hero.is-success .subtitle{color:rgba(255,255,255,.9)}.hero.is-success .subtitle a:not(.button),.hero.is-success .subtitle strong{color:#fff}@media screen and (max-width:1023px){.hero.is-success .navbar-menu{background-color:#23d160}}.hero.is-success .navbar-item,.hero.is-success .navbar-link{color:rgba(255,255,255,.7)}.hero.is-success .navbar-link.is-active,.hero.is-success .navbar-link:hover,.hero.is-success a.navbar-item.is-active,.hero.is-success a.navbar-item:hover{background-color:#20bc56;color:#fff}.hero.is-success .tabs a{color:#fff;opacity:.9}.hero.is-success .tabs a:hover{opacity:1}.hero.is-success .tabs li.is-active a{opacity:1}.hero.is-success .tabs.is-boxed a,.hero.is-success .tabs.is-toggle a{color:#fff}.hero.is-success .tabs.is-boxed a:hover,.hero.is-success .tabs.is-toggle a:hover{background-color:rgba(10,10,10,.1)}.hero.is-success .tabs.is-boxed li.is-active a,.hero.is-success .tabs.is-boxed li.is-active a:hover,.hero.is-success .tabs.is-toggle li.is-active a,.hero.is-success .tabs.is-toggle li.is-active a:hover{background-color:#fff;border-color:#fff;color:#23d160}.hero.is-success.is-bold{background-image:linear-gradient(141deg,#12af2f 0,#23d160 71%,#2ce28a 100%)}@media screen and (max-width:768px){.hero.is-success.is-bold .navbar-menu{background-image:linear-gradient(141deg,#12af2f 0,#23d160 71%,#2ce28a 100%)}}.hero.is-warning{background-color:#ffdd57;color:rgba(0,0,0,.7)}.hero.is-warning a:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),.hero.is-warning strong{color:inherit}.hero.is-warning .title{color:rgba(0,0,0,.7)}.hero.is-warning .subtitle{color:rgba(0,0,0,.9)}.hero.is-warning .subtitle a:not(.button),.hero.is-warning .subtitle strong{color:rgba(0,0,0,.7)}@media screen and (max-width:1023px){.hero.is-warning .navbar-menu{background-color:#ffdd57}}.hero.is-warning .navbar-item,.hero.is-warning .navbar-link{color:rgba(0,0,0,.7)}.hero.is-warning .navbar-link.is-active,.hero.is-warning .navbar-link:hover,.hero.is-warning a.navbar-item.is-active,.hero.is-warning a.navbar-item:hover{background-color:#ffd83d;color:rgba(0,0,0,.7)}.hero.is-warning .tabs a{color:rgba(0,0,0,.7);opacity:.9}.hero.is-warning .tabs a:hover{opacity:1}.hero.is-warning .tabs li.is-active a{opacity:1}.hero.is-warning .tabs.is-boxed a,.hero.is-warning .tabs.is-toggle a{color:rgba(0,0,0,.7)}.hero.is-warning .tabs.is-boxed a:hover,.hero.is-warning .tabs.is-toggle a:hover{background-color:rgba(10,10,10,.1)}.hero.is-warning .tabs.is-boxed li.is-active a,.hero.is-warning .tabs.is-boxed li.is-active a:hover,.hero.is-warning .tabs.is-toggle li.is-active a,.hero.is-warning .tabs.is-toggle li.is-active a:hover{background-color:rgba(0,0,0,.7);border-color:rgba(0,0,0,.7);color:#ffdd57}.hero.is-warning.is-bold{background-image:linear-gradient(141deg,#ffaf24 0,#ffdd57 71%,#fffa70 100%)}@media screen and (max-width:768px){.hero.is-warning.is-bold .navbar-menu{background-image:linear-gradient(141deg,#ffaf24 0,#ffdd57 71%,#fffa70 100%)}}.hero.is-danger{background-color:#ff3860;color:#fff}.hero.is-danger a:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),.hero.is-danger strong{color:inherit}.hero.is-danger .title{color:#fff}.hero.is-danger .subtitle{color:rgba(255,255,255,.9)}.hero.is-danger .subtitle a:not(.button),.hero.is-danger .subtitle strong{color:#fff}@media screen and (max-width:1023px){.hero.is-danger .navbar-menu{background-color:#ff3860}}.hero.is-danger .navbar-item,.hero.is-danger .navbar-link{color:rgba(255,255,255,.7)}.hero.is-danger .navbar-link.is-active,.hero.is-danger .navbar-link:hover,.hero.is-danger a.navbar-item.is-active,.hero.is-danger a.navbar-item:hover{background-color:#ff1f4b;color:#fff}.hero.is-danger .tabs a{color:#fff;opacity:.9}.hero.is-danger .tabs a:hover{opacity:1}.hero.is-danger .tabs li.is-active a{opacity:1}.hero.is-danger .tabs.is-boxed a,.hero.is-danger .tabs.is-toggle a{color:#fff}.hero.is-danger .tabs.is-boxed a:hover,.hero.is-danger .tabs.is-toggle a:hover{background-color:rgba(10,10,10,.1)}.hero.is-danger .tabs.is-boxed li.is-active a,.hero.is-danger .tabs.is-boxed li.is-active a:hover,.hero.is-danger .tabs.is-toggle li.is-active a,.hero.is-danger .tabs.is-toggle li.is-active a:hover{background-color:#fff;border-color:#fff;color:#ff3860}.hero.is-danger.is-bold{background-image:linear-gradient(141deg,#ff0561 0,#ff3860 71%,#ff5257 100%)}@media screen and (max-width:768px){.hero.is-danger.is-bold .navbar-menu{background-image:linear-gradient(141deg,#ff0561 0,#ff3860 71%,#ff5257 100%)}}.hero.is-small .hero-body{padding-bottom:1.5rem;padding-top:1.5rem}@media screen and (min-width:769px),print{.hero.is-medium .hero-body{padding-bottom:9rem;padding-top:9rem}}@media screen and (min-width:769px),print{.hero.is-large .hero-body{padding-bottom:18rem;padding-top:18rem}}.hero.is-fullheight .hero-body,.hero.is-fullheight-with-navbar .hero-body,.hero.is-halfheight .hero-body{align-items:center;display:flex}.hero.is-fullheight .hero-body>.container,.hero.is-fullheight-with-navbar .hero-body>.container,.hero.is-halfheight .hero-body>.container{flex-grow:1;flex-shrink:1}.hero.is-halfheight{min-height:50vh}.hero.is-fullheight{min-height:100vh}.hero-video{overflow:hidden}.hero-video video{left:50%;min-height:100%;min-width:100%;position:absolute;top:50%;-webkit-transform:translate3d(-50%,-50%,0);transform:translate3d(-50%,-50%,0)}.hero-video.is-transparent{opacity:.3}@media screen and (max-width:768px){.hero-video{display:none}}.hero-buttons{margin-top:1.5rem}@media screen and (max-width:768px){.hero-buttons .button{display:flex}.hero-buttons .button:not(:last-child){margin-bottom:.75rem}}@media screen and (min-width:769px),print{.hero-buttons{display:flex;justify-content:center}.hero-buttons .button:not(:last-child){margin-right:1.5rem}}.hero-foot,.hero-head{flex-grow:0;flex-shrink:0}.hero-body{flex-grow:1;flex-shrink:0;padding:3rem 1.5rem}.section{padding:3rem 1.5rem}@media screen and (min-width:1024px){.section.is-medium{padding:9rem 1.5rem}.section.is-large{padding:18rem 1.5rem}}.footer{background-color:#fafafa;padding:3rem 1.5rem 6rem}');
}
// fuse-box-css/index.js
$fsx.f[18] =
function(module,exports){
var __filename = "index.js";
var runningInBrowser = true || 'browser' === 'electron';
var cssHandler = function (__filename, contents) {
    if (runningInBrowser) {
        var styleId = __filename.replace(/[\.\/]+/g, '-');
        if (styleId.charAt(0) === '-')
            styleId = styleId.substring(1);
        var exists = document.getElementById(styleId);
        if (!exists) {
            var s = document.createElement(contents ? 'style' : 'link');
            s.id = styleId;
            s.type = 'text/css';
            if (contents) {
                s.innerHTML = contents;
            } else {
                s.rel = 'stylesheet';
                s.href = __filename;
            }
            document.getElementsByTagName('head')[0].appendChild(s);
        } else {
            if (contents) {
                exists.innerHTML = contents;
            }
        }
    }
};
if (typeof FuseBox !== 'undefined' && runningInBrowser) {
    FuseBox.on('async', function (name) {
        if (/\.css$/.test(name)) {
            cssHandler(name);
            return false;
        }
    });
}
module.exports = cssHandler;
}
// history/index.js
$fsx.f[19] =
function(module,exports){
module.exports = $fsx.r(20);
}
// history/cjs/history.min.js
$fsx.f[20] =
function(module,exports){
function _interopDefault(n) {
    return n && 'object' == typeof n && 'default' in n ? n.default : n;
}
Object.defineProperty(exports, '__esModule', { value: !0 });
var resolvePathname = _interopDefault($fsx.r(38)), valueEqual = _interopDefault($fsx.r(41));
$fsx.r(40);
var invariant = _interopDefault($fsx.r(39));
function _extends() {
    return (_extends = Object.assign || function (n) {
        for (var t = 1; t < arguments.length; t++) {
            var e = arguments[t];
            for (var a in e)
                Object.prototype.hasOwnProperty.call(e, a) && (n[a] = e[a]);
        }
        return n;
    }).apply(this, arguments);
}
function addLeadingSlash(n) {
    return '/' === n.charAt(0) ? n : '/' + n;
}
function stripLeadingSlash(n) {
    return '/' === n.charAt(0) ? n.substr(1) : n;
}
function hasBasename(n, t) {
    return new RegExp('^' + t + '(\\/|\\?|#|$)', 'i').test(n);
}
function stripBasename(n, t) {
    return hasBasename(n, t) ? n.substr(t.length) : n;
}
function stripTrailingSlash(n) {
    return '/' === n.charAt(n.length - 1) ? n.slice(0, -1) : n;
}
function parsePath(n) {
    var t = n || '/', e = '', a = '', o = t.indexOf('#');
    -1 !== o && (a = t.substr(o), t = t.substr(0, o));
    var r = t.indexOf('?');
    return -1 !== r && (e = t.substr(r), t = t.substr(0, r)), {
        pathname: t,
        search: '?' === e ? '' : e,
        hash: '#' === a ? '' : a
    };
}
function createPath(n) {
    var t = n.pathname, e = n.search, a = n.hash, o = t || '/';
    return e && '?' !== e && (o += '?' === e.charAt(0) ? e : '?' + e), a && '#' !== a && (o += '#' === a.charAt(0) ? a : '#' + a), o;
}
function createLocation(n, t, e, a) {
    var o;
    'string' == typeof n ? (o = parsePath(n)).state = t : (void 0 === (o = _extends({}, n)).pathname && (o.pathname = ''), o.search ? '?' !== o.search.charAt(0) && (o.search = '?' + o.search) : o.search = '', o.hash ? '#' !== o.hash.charAt(0) && (o.hash = '#' + o.hash) : o.hash = '', void 0 !== t && void 0 === o.state && (o.state = t));
    try {
        o.pathname = decodeURI(o.pathname);
    } catch (n) {
        throw n instanceof URIError ? new URIError('Pathname "' + o.pathname + '" could not be decoded. This is likely caused by an invalid percent-encoding.') : n;
    }
    return e && (o.key = e), a ? o.pathname ? '/' !== o.pathname.charAt(0) && (o.pathname = resolvePathname(o.pathname, a.pathname)) : o.pathname = a.pathname : o.pathname || (o.pathname = '/'), o;
}
function locationsAreEqual(n, t) {
    return n.pathname === t.pathname && n.search === t.search && n.hash === t.hash && n.key === t.key && valueEqual(n.state, t.state);
}
function createTransitionManager() {
    var r = null;
    var a = [];
    return {
        setPrompt: function (n) {
            return r = n, function () {
                r === n && (r = null);
            };
        },
        confirmTransitionTo: function (n, t, e, a) {
            if (null != r) {
                var o = 'function' == typeof r ? r(n, t) : r;
                'string' == typeof o ? 'function' == typeof e ? e(o, a) : a(!0) : a(!1 !== o);
            } else
                a(!0);
        },
        appendListener: function (n) {
            var t = !0;
            function e() {
                t && n.apply(void 0, arguments);
            }
            return a.push(e), function () {
                t = !1, a = a.filter(function (n) {
                    return n !== e;
                });
            };
        },
        notifyListeners: function () {
            for (var n = arguments.length, t = new Array(n), e = 0; e < n; e++)
                t[e] = arguments[e];
            a.forEach(function (n) {
                return n.apply(void 0, t);
            });
        }
    };
}
var canUseDOM = !('undefined' == 'object' || !window.document || !window.document.createElement);
function getConfirmation(n, t) {
    t(window.confirm(n));
}
function supportsHistory() {
    var n = window.navigator.userAgent;
    return (-1 === n.indexOf('Android 2.') && -1 === n.indexOf('Android 4.0') || -1 === n.indexOf('Mobile Safari') || -1 !== n.indexOf('Chrome') || -1 !== n.indexOf('Windows Phone')) && (window.history && 'pushState' in window.history);
}
function supportsPopStateOnHashChange() {
    return -1 === window.navigator.userAgent.indexOf('Trident');
}
function supportsGoWithoutReloadUsingHash() {
    return -1 === window.navigator.userAgent.indexOf('Firefox');
}
function isExtraneousPopstateEvent(n) {
    void 0 === n.state && navigator.userAgent.indexOf('CriOS');
}
var PopStateEvent = 'popstate', HashChangeEvent = 'hashchange';
function getHistoryState() {
    try {
        return window.history.state || {};
    } catch (n) {
        return {};
    }
}
function createBrowserHistory(n) {
    void 0 === n && (n = {}), canUseDOM || invariant(!1);
    var c = window.history, s = supportsHistory(), t = !supportsPopStateOnHashChange(), e = n, a = e.forceRefresh, h = void 0 !== a && a, o = e.getUserConfirmation, u = void 0 === o ? getConfirmation : o, r = e.keyLength, i = void 0 === r ? 6 : r, f = n.basename ? stripTrailingSlash(addLeadingSlash(n.basename)) : '';
    function l(n) {
        var t = n || {}, e = t.key, a = t.state, o = window.location, r = o.pathname + o.search + o.hash;
        return f && (r = stripBasename(r, f)), createLocation(r, a, e);
    }
    function d() {
        return Math.random().toString(36).substr(2, i);
    }
    var v = createTransitionManager();
    function p(n) {
        _extends(T, n), T.length = c.length, v.notifyListeners(T.location, T.action);
    }
    function g(n) {
        isExtraneousPopstateEvent(n) || w(l(n.state));
    }
    function P() {
        w(l(getHistoryState()));
    }
    var m = !1;
    function w(t) {
        if (m)
            m = !1, p();
        else {
            v.confirmTransitionTo(t, 'POP', u, function (n) {
                n ? p({
                    action: 'POP',
                    location: t
                }) : function (n) {
                    var t = T.location, e = H.indexOf(t.key);
                    -1 === e && (e = 0);
                    var a = H.indexOf(n.key);
                    -1 === a && (a = 0);
                    var o = e - a;
                    o && (m = !0, L(o));
                }(t);
            });
        }
    }
    var y = l(getHistoryState()), H = [y.key];
    function x(n) {
        return f + createPath(n);
    }
    function L(n) {
        c.go(n);
    }
    var O = 0;
    function E(n) {
        1 === (O += n) && 1 === n ? (window.addEventListener(PopStateEvent, g), t && window.addEventListener(HashChangeEvent, P)) : 0 === O && (window.removeEventListener(PopStateEvent, g), t && window.removeEventListener(HashChangeEvent, P));
    }
    var S = !1;
    var T = {
        length: c.length,
        action: 'POP',
        location: y,
        createHref: x,
        push: function (n, t) {
            var i = createLocation(n, t, d(), T.location);
            v.confirmTransitionTo(i, 'PUSH', u, function (n) {
                if (n) {
                    var t = x(i), e = i.key, a = i.state;
                    if (s)
                        if (c.pushState({
                                key: e,
                                state: a
                            }, null, t), h)
                            window.location.href = t;
                        else {
                            var o = H.indexOf(T.location.key), r = H.slice(0, -1 === o ? 0 : o + 1);
                            r.push(i.key), H = r, p({
                                action: 'PUSH',
                                location: i
                            });
                        }
                    else
                        window.location.href = t;
                }
            });
        },
        replace: function (n, t) {
            var r = 'REPLACE', i = createLocation(n, t, d(), T.location);
            v.confirmTransitionTo(i, r, u, function (n) {
                if (n) {
                    var t = x(i), e = i.key, a = i.state;
                    if (s)
                        if (c.replaceState({
                                key: e,
                                state: a
                            }, null, t), h)
                            window.location.replace(t);
                        else {
                            var o = H.indexOf(T.location.key);
                            -1 !== o && (H[o] = i.key), p({
                                action: r,
                                location: i
                            });
                        }
                    else
                        window.location.replace(t);
                }
            });
        },
        go: L,
        goBack: function () {
            L(-1);
        },
        goForward: function () {
            L(1);
        },
        block: function (n) {
            void 0 === n && (n = !1);
            var t = v.setPrompt(n);
            return S || (E(1), S = !0), function () {
                return S && (S = !1, E(-1)), t();
            };
        },
        listen: function (n) {
            var t = v.appendListener(n);
            return E(1), function () {
                E(-1), t();
            };
        }
    };
    return T;
}
var HashChangeEvent$1 = 'hashchange', HashPathCoders = {
        hashbang: {
            encodePath: function (n) {
                return '!' === n.charAt(0) ? n : '!/' + stripLeadingSlash(n);
            },
            decodePath: function (n) {
                return '!' === n.charAt(0) ? n.substr(1) : n;
            }
        },
        noslash: {
            encodePath: stripLeadingSlash,
            decodePath: addLeadingSlash
        },
        slash: {
            encodePath: addLeadingSlash,
            decodePath: addLeadingSlash
        }
    };
function getHashPath() {
    var n = window.location.href, t = n.indexOf('#');
    return -1 === t ? '' : n.substring(t + 1);
}
function pushHashPath(n) {
    window.location.hash = n;
}
function replaceHashPath(n) {
    var t = window.location.href.indexOf('#');
    window.location.replace(window.location.href.slice(0, 0 <= t ? t : 0) + '#' + n);
}
function createHashHistory(n) {
    void 0 === n && (n = {}), canUseDOM || invariant(!1);
    var t = window.history, e = (supportsGoWithoutReloadUsingHash(), n), a = e.getUserConfirmation, i = void 0 === a ? getConfirmation : a, o = e.hashType, r = void 0 === o ? 'slash' : o, c = n.basename ? stripTrailingSlash(addLeadingSlash(n.basename)) : '', s = HashPathCoders[r], h = s.encodePath, u = s.decodePath;
    function f() {
        var n = u(getHashPath());
        return c && (n = stripBasename(n, c)), createLocation(n);
    }
    var l = createTransitionManager();
    function d(n) {
        _extends(E, n), E.length = t.length, l.notifyListeners(E.location, E.action);
    }
    var v = !1, p = null;
    function g() {
        var n = getHashPath(), t = h(n);
        if (n !== t)
            replaceHashPath(t);
        else {
            var e = f(), a = E.location;
            if (!v && locationsAreEqual(a, e))
                return;
            if (p === createPath(e))
                return;
            p = null, function (t) {
                if (v)
                    v = !1, d();
                else {
                    l.confirmTransitionTo(t, 'POP', i, function (n) {
                        n ? d({
                            action: 'POP',
                            location: t
                        }) : function (n) {
                            var t = E.location, e = y.lastIndexOf(createPath(t));
                            -1 === e && (e = 0);
                            var a = y.lastIndexOf(createPath(n));
                            -1 === a && (a = 0);
                            var o = e - a;
                            o && (v = !0, H(o));
                        }(t);
                    });
                }
            }(e);
        }
    }
    var P = getHashPath(), m = h(P);
    P !== m && replaceHashPath(m);
    var w = f(), y = [createPath(w)];
    function H(n) {
        t.go(n);
    }
    var x = 0;
    function L(n) {
        1 === (x += n) && 1 === n ? window.addEventListener(HashChangeEvent$1, g) : 0 === x && window.removeEventListener(HashChangeEvent$1, g);
    }
    var O = !1;
    var E = {
        length: t.length,
        action: 'POP',
        location: w,
        createHref: function (n) {
            return '#' + h(c + createPath(n));
        },
        push: function (n, t) {
            var r = createLocation(n, void 0, void 0, E.location);
            l.confirmTransitionTo(r, 'PUSH', i, function (n) {
                if (n) {
                    var t = createPath(r), e = h(c + t);
                    if (getHashPath() !== e) {
                        p = t, pushHashPath(e);
                        var a = y.lastIndexOf(createPath(E.location)), o = y.slice(0, -1 === a ? 0 : a + 1);
                        o.push(t), y = o, d({
                            action: 'PUSH',
                            location: r
                        });
                    } else
                        d();
                }
            });
        },
        replace: function (n, t) {
            var o = 'REPLACE', r = createLocation(n, void 0, void 0, E.location);
            l.confirmTransitionTo(r, o, i, function (n) {
                if (n) {
                    var t = createPath(r), e = h(c + t);
                    getHashPath() !== e && (p = t, replaceHashPath(e));
                    var a = y.indexOf(createPath(E.location));
                    -1 !== a && (y[a] = t), d({
                        action: o,
                        location: r
                    });
                }
            });
        },
        go: H,
        goBack: function () {
            H(-1);
        },
        goForward: function () {
            H(1);
        },
        block: function (n) {
            void 0 === n && (n = !1);
            var t = l.setPrompt(n);
            return O || (L(1), O = !0), function () {
                return O && (O = !1, L(-1)), t();
            };
        },
        listen: function (n) {
            var t = l.appendListener(n);
            return L(1), function () {
                L(-1), t();
            };
        }
    };
    return E;
}
function clamp(n, t, e) {
    return Math.min(Math.max(n, t), e);
}
function createMemoryHistory(n) {
    void 0 === n && (n = {});
    var t = n, o = t.getUserConfirmation, e = t.initialEntries, a = void 0 === e ? ['/'] : e, r = t.initialIndex, i = void 0 === r ? 0 : r, c = t.keyLength, s = void 0 === c ? 6 : c, h = createTransitionManager();
    function u(n) {
        _extends(g, n), g.length = g.entries.length, h.notifyListeners(g.location, g.action);
    }
    function f() {
        return Math.random().toString(36).substr(2, s);
    }
    var l = clamp(i, 0, a.length - 1), d = a.map(function (n) {
            return createLocation(n, void 0, 'string' == typeof n ? f() : n.key || f());
        }), v = createPath;
    function p(n) {
        var t = clamp(g.index + n, 0, g.entries.length - 1), e = g.entries[t];
        h.confirmTransitionTo(e, 'POP', o, function (n) {
            n ? u({
                action: 'POP',
                location: e,
                index: t
            }) : u();
        });
    }
    var g = {
        length: d.length,
        action: 'POP',
        location: d[l],
        index: l,
        entries: d,
        createHref: v,
        push: function (n, t) {
            var a = createLocation(n, t, f(), g.location);
            h.confirmTransitionTo(a, 'PUSH', o, function (n) {
                if (n) {
                    var t = g.index + 1, e = g.entries.slice(0);
                    e.length > t ? e.splice(t, e.length - t, a) : e.push(a), u({
                        action: 'PUSH',
                        location: a,
                        index: t,
                        entries: e
                    });
                }
            });
        },
        replace: function (n, t) {
            var e = 'REPLACE', a = createLocation(n, t, f(), g.location);
            h.confirmTransitionTo(a, e, o, function (n) {
                n && (g.entries[g.index] = a, u({
                    action: e,
                    location: a
                }));
            });
        },
        go: p,
        goBack: function () {
            p(-1);
        },
        goForward: function () {
            p(1);
        },
        canGo: function (n) {
            var t = g.index + n;
            return 0 <= t && t < g.entries.length;
        },
        block: function (n) {
            return void 0 === n && (n = !1), h.setPrompt(n);
        },
        listen: function (n) {
            return h.appendListener(n);
        }
    };
    return g;
}
exports.createBrowserHistory = createBrowserHistory, exports.createHashHistory = createHashHistory, exports.createMemoryHistory = createMemoryHistory, exports.createLocation = createLocation, exports.locationsAreEqual = locationsAreEqual, exports.parsePath = parsePath, exports.createPath = createPath;
}
// history/cjs/history.js
$fsx.f[21] =
function(module,exports){
Object.defineProperty(exports, '__esModule', { value: true });
function _interopDefault(ex) {
    return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex;
}
var resolvePathname = _interopDefault($fsx.r(38));
var valueEqual = _interopDefault($fsx.r(41));
var warning = _interopDefault($fsx.r(40));
var invariant = _interopDefault($fsx.r(39));
function _extends() {
    _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    };
    return _extends.apply(this, arguments);
}
function addLeadingSlash(path) {
    return path.charAt(0) === '/' ? path : '/' + path;
}
function stripLeadingSlash(path) {
    return path.charAt(0) === '/' ? path.substr(1) : path;
}
function hasBasename(path, prefix) {
    return new RegExp('^' + prefix + '(\\/|\\?|#|$)', 'i').test(path);
}
function stripBasename(path, prefix) {
    return hasBasename(path, prefix) ? path.substr(prefix.length) : path;
}
function stripTrailingSlash(path) {
    return path.charAt(path.length - 1) === '/' ? path.slice(0, -1) : path;
}
function parsePath(path) {
    var pathname = path || '/';
    var search = '';
    var hash = '';
    var hashIndex = pathname.indexOf('#');
    if (hashIndex !== -1) {
        hash = pathname.substr(hashIndex);
        pathname = pathname.substr(0, hashIndex);
    }
    var searchIndex = pathname.indexOf('?');
    if (searchIndex !== -1) {
        search = pathname.substr(searchIndex);
        pathname = pathname.substr(0, searchIndex);
    }
    return {
        pathname: pathname,
        search: search === '?' ? '' : search,
        hash: hash === '#' ? '' : hash
    };
}
function createPath(location) {
    var pathname = location.pathname, search = location.search, hash = location.hash;
    var path = pathname || '/';
    if (search && search !== '?')
        path += search.charAt(0) === '?' ? search : '?' + search;
    if (hash && hash !== '#')
        path += hash.charAt(0) === '#' ? hash : '#' + hash;
    return path;
}
function createLocation(path, state, key, currentLocation) {
    var location;
    if (typeof path === 'string') {
        location = parsePath(path);
        location.state = state;
    } else {
        location = _extends({}, path);
        if (location.pathname === undefined)
            location.pathname = '';
        if (location.search) {
            if (location.search.charAt(0) !== '?')
                location.search = '?' + location.search;
        } else {
            location.search = '';
        }
        if (location.hash) {
            if (location.hash.charAt(0) !== '#')
                location.hash = '#' + location.hash;
        } else {
            location.hash = '';
        }
        if (state !== undefined && location.state === undefined)
            location.state = state;
    }
    try {
        location.pathname = decodeURI(location.pathname);
    } catch (e) {
        if (e instanceof URIError) {
            throw new URIError('Pathname "' + location.pathname + '" could not be decoded. ' + 'This is likely caused by an invalid percent-encoding.');
        } else {
            throw e;
        }
    }
    if (key)
        location.key = key;
    if (currentLocation) {
        if (!location.pathname) {
            location.pathname = currentLocation.pathname;
        } else if (location.pathname.charAt(0) !== '/') {
            location.pathname = resolvePathname(location.pathname, currentLocation.pathname);
        }
    } else {
        if (!location.pathname) {
            location.pathname = '/';
        }
    }
    return location;
}
function locationsAreEqual(a, b) {
    return a.pathname === b.pathname && a.search === b.search && a.hash === b.hash && a.key === b.key && valueEqual(a.state, b.state);
}
function createTransitionManager() {
    var prompt = null;
    function setPrompt(nextPrompt) {
        warning(prompt == null, 'A history supports only one prompt at a time');
        prompt = nextPrompt;
        return function () {
            if (prompt === nextPrompt)
                prompt = null;
        };
    }
    function confirmTransitionTo(location, action, getUserConfirmation, callback) {
        if (prompt != null) {
            var result = typeof prompt === 'function' ? prompt(location, action) : prompt;
            if (typeof result === 'string') {
                if (typeof getUserConfirmation === 'function') {
                    getUserConfirmation(result, callback);
                } else {
                    warning(false, 'A history needs a getUserConfirmation function in order to use a prompt message');
                    callback(true);
                }
            } else {
                callback(result !== false);
            }
        } else {
            callback(true);
        }
    }
    var listeners = [];
    function appendListener(fn) {
        var isActive = true;
        function listener() {
            if (isActive)
                fn.apply(void 0, arguments);
        }
        listeners.push(listener);
        return function () {
            isActive = false;
            listeners = listeners.filter(function (item) {
                return item !== listener;
            });
        };
    }
    function notifyListeners() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }
        listeners.forEach(function (listener) {
            return listener.apply(void 0, args);
        });
    }
    return {
        setPrompt: setPrompt,
        confirmTransitionTo: confirmTransitionTo,
        appendListener: appendListener,
        notifyListeners: notifyListeners
    };
}
var canUseDOM = !!('object' !== 'undefined' && window.document && window.document.createElement);
function getConfirmation(message, callback) {
    callback(window.confirm(message));
}
function supportsHistory() {
    var ua = window.navigator.userAgent;
    if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1)
        return false;
    return window.history && 'pushState' in window.history;
}
function supportsPopStateOnHashChange() {
    return window.navigator.userAgent.indexOf('Trident') === -1;
}
function supportsGoWithoutReloadUsingHash() {
    return window.navigator.userAgent.indexOf('Firefox') === -1;
}
function isExtraneousPopstateEvent(event) {
    event.state === undefined && navigator.userAgent.indexOf('CriOS') === -1;
}
var PopStateEvent = 'popstate';
var HashChangeEvent = 'hashchange';
function getHistoryState() {
    try {
        return window.history.state || {};
    } catch (e) {
        return {};
    }
}
function createBrowserHistory(props) {
    if (props === void 0) {
        props = {};
    }
    !canUseDOM ? invariant(false, 'Browser history needs a DOM') : void 0;
    var globalHistory = window.history;
    var canUseHistory = supportsHistory();
    var needsHashChangeListener = !supportsPopStateOnHashChange();
    var _props = props, _props$forceRefresh = _props.forceRefresh, forceRefresh = _props$forceRefresh === void 0 ? false : _props$forceRefresh, _props$getUserConfirm = _props.getUserConfirmation, getUserConfirmation = _props$getUserConfirm === void 0 ? getConfirmation : _props$getUserConfirm, _props$keyLength = _props.keyLength, keyLength = _props$keyLength === void 0 ? 6 : _props$keyLength;
    var basename = props.basename ? stripTrailingSlash(addLeadingSlash(props.basename)) : '';
    function getDOMLocation(historyState) {
        var _ref = historyState || {}, key = _ref.key, state = _ref.state;
        var _window$location = window.location, pathname = _window$location.pathname, search = _window$location.search, hash = _window$location.hash;
        var path = pathname + search + hash;
        warning(!basename || hasBasename(path, basename), 'You are attempting to use a basename on a page whose URL path does not begin ' + 'with the basename. Expected path "' + path + '" to begin with "' + basename + '".');
        if (basename)
            path = stripBasename(path, basename);
        return createLocation(path, state, key);
    }
    function createKey() {
        return Math.random().toString(36).substr(2, keyLength);
    }
    var transitionManager = createTransitionManager();
    function setState(nextState) {
        _extends(history, nextState);
        history.length = globalHistory.length;
        transitionManager.notifyListeners(history.location, history.action);
    }
    function handlePopState(event) {
        if (isExtraneousPopstateEvent(event))
            return;
        handlePop(getDOMLocation(event.state));
    }
    function handleHashChange() {
        handlePop(getDOMLocation(getHistoryState()));
    }
    var forceNextPop = false;
    function handlePop(location) {
        if (forceNextPop) {
            forceNextPop = false;
            setState();
        } else {
            var action = 'POP';
            transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
                if (ok) {
                    setState({
                        action: action,
                        location: location
                    });
                } else {
                    revertPop(location);
                }
            });
        }
    }
    function revertPop(fromLocation) {
        var toLocation = history.location;
        var toIndex = allKeys.indexOf(toLocation.key);
        if (toIndex === -1)
            toIndex = 0;
        var fromIndex = allKeys.indexOf(fromLocation.key);
        if (fromIndex === -1)
            fromIndex = 0;
        var delta = toIndex - fromIndex;
        if (delta) {
            forceNextPop = true;
            go(delta);
        }
    }
    var initialLocation = getDOMLocation(getHistoryState());
    var allKeys = [initialLocation.key];
    function createHref(location) {
        return basename + createPath(location);
    }
    function push(path, state) {
        warning(!(typeof path === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to push when the 1st ' + 'argument is a location-like object that already has state; it is ignored');
        var action = 'PUSH';
        var location = createLocation(path, state, createKey(), history.location);
        transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
            if (!ok)
                return;
            var href = createHref(location);
            var key = location.key, state = location.state;
            if (canUseHistory) {
                globalHistory.pushState({
                    key: key,
                    state: state
                }, null, href);
                if (forceRefresh) {
                    window.location.href = href;
                } else {
                    var prevIndex = allKeys.indexOf(history.location.key);
                    var nextKeys = allKeys.slice(0, prevIndex === -1 ? 0 : prevIndex + 1);
                    nextKeys.push(location.key);
                    allKeys = nextKeys;
                    setState({
                        action: action,
                        location: location
                    });
                }
            } else {
                warning(state === undefined, 'Browser history cannot push state in browsers that do not support HTML5 history');
                window.location.href = href;
            }
        });
    }
    function replace(path, state) {
        warning(!(typeof path === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to replace when the 1st ' + 'argument is a location-like object that already has state; it is ignored');
        var action = 'REPLACE';
        var location = createLocation(path, state, createKey(), history.location);
        transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
            if (!ok)
                return;
            var href = createHref(location);
            var key = location.key, state = location.state;
            if (canUseHistory) {
                globalHistory.replaceState({
                    key: key,
                    state: state
                }, null, href);
                if (forceRefresh) {
                    window.location.replace(href);
                } else {
                    var prevIndex = allKeys.indexOf(history.location.key);
                    if (prevIndex !== -1)
                        allKeys[prevIndex] = location.key;
                    setState({
                        action: action,
                        location: location
                    });
                }
            } else {
                warning(state === undefined, 'Browser history cannot replace state in browsers that do not support HTML5 history');
                window.location.replace(href);
            }
        });
    }
    function go(n) {
        globalHistory.go(n);
    }
    function goBack() {
        go(-1);
    }
    function goForward() {
        go(1);
    }
    var listenerCount = 0;
    function checkDOMListeners(delta) {
        listenerCount += delta;
        if (listenerCount === 1 && delta === 1) {
            window.addEventListener(PopStateEvent, handlePopState);
            if (needsHashChangeListener)
                window.addEventListener(HashChangeEvent, handleHashChange);
        } else if (listenerCount === 0) {
            window.removeEventListener(PopStateEvent, handlePopState);
            if (needsHashChangeListener)
                window.removeEventListener(HashChangeEvent, handleHashChange);
        }
    }
    var isBlocked = false;
    function block(prompt) {
        if (prompt === void 0) {
            prompt = false;
        }
        var unblock = transitionManager.setPrompt(prompt);
        if (!isBlocked) {
            checkDOMListeners(1);
            isBlocked = true;
        }
        return function () {
            if (isBlocked) {
                isBlocked = false;
                checkDOMListeners(-1);
            }
            return unblock();
        };
    }
    function listen(listener) {
        var unlisten = transitionManager.appendListener(listener);
        checkDOMListeners(1);
        return function () {
            checkDOMListeners(-1);
            unlisten();
        };
    }
    var history = {
        length: globalHistory.length,
        action: 'POP',
        location: initialLocation,
        createHref: createHref,
        push: push,
        replace: replace,
        go: go,
        goBack: goBack,
        goForward: goForward,
        block: block,
        listen: listen
    };
    return history;
}
var HashChangeEvent$1 = 'hashchange';
var HashPathCoders = {
    hashbang: {
        encodePath: function encodePath(path) {
            return path.charAt(0) === '!' ? path : '!/' + stripLeadingSlash(path);
        },
        decodePath: function decodePath(path) {
            return path.charAt(0) === '!' ? path.substr(1) : path;
        }
    },
    noslash: {
        encodePath: stripLeadingSlash,
        decodePath: addLeadingSlash
    },
    slash: {
        encodePath: addLeadingSlash,
        decodePath: addLeadingSlash
    }
};
function getHashPath() {
    var href = window.location.href;
    var hashIndex = href.indexOf('#');
    return hashIndex === -1 ? '' : href.substring(hashIndex + 1);
}
function pushHashPath(path) {
    window.location.hash = path;
}
function replaceHashPath(path) {
    var hashIndex = window.location.href.indexOf('#');
    window.location.replace(window.location.href.slice(0, hashIndex >= 0 ? hashIndex : 0) + '#' + path);
}
function createHashHistory(props) {
    if (props === void 0) {
        props = {};
    }
    !canUseDOM ? invariant(false, 'Hash history needs a DOM') : void 0;
    var globalHistory = window.history;
    var canGoWithoutReload = supportsGoWithoutReloadUsingHash();
    var _props = props, _props$getUserConfirm = _props.getUserConfirmation, getUserConfirmation = _props$getUserConfirm === void 0 ? getConfirmation : _props$getUserConfirm, _props$hashType = _props.hashType, hashType = _props$hashType === void 0 ? 'slash' : _props$hashType;
    var basename = props.basename ? stripTrailingSlash(addLeadingSlash(props.basename)) : '';
    var _HashPathCoders$hashT = HashPathCoders[hashType], encodePath = _HashPathCoders$hashT.encodePath, decodePath = _HashPathCoders$hashT.decodePath;
    function getDOMLocation() {
        var path = decodePath(getHashPath());
        warning(!basename || hasBasename(path, basename), 'You are attempting to use a basename on a page whose URL path does not begin ' + 'with the basename. Expected path "' + path + '" to begin with "' + basename + '".');
        if (basename)
            path = stripBasename(path, basename);
        return createLocation(path);
    }
    var transitionManager = createTransitionManager();
    function setState(nextState) {
        _extends(history, nextState);
        history.length = globalHistory.length;
        transitionManager.notifyListeners(history.location, history.action);
    }
    var forceNextPop = false;
    var ignorePath = null;
    function handleHashChange() {
        var path = getHashPath();
        var encodedPath = encodePath(path);
        if (path !== encodedPath) {
            replaceHashPath(encodedPath);
        } else {
            var location = getDOMLocation();
            var prevLocation = history.location;
            if (!forceNextPop && locationsAreEqual(prevLocation, location))
                return;
            if (ignorePath === createPath(location))
                return;
            ignorePath = null;
            handlePop(location);
        }
    }
    function handlePop(location) {
        if (forceNextPop) {
            forceNextPop = false;
            setState();
        } else {
            var action = 'POP';
            transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
                if (ok) {
                    setState({
                        action: action,
                        location: location
                    });
                } else {
                    revertPop(location);
                }
            });
        }
    }
    function revertPop(fromLocation) {
        var toLocation = history.location;
        var toIndex = allPaths.lastIndexOf(createPath(toLocation));
        if (toIndex === -1)
            toIndex = 0;
        var fromIndex = allPaths.lastIndexOf(createPath(fromLocation));
        if (fromIndex === -1)
            fromIndex = 0;
        var delta = toIndex - fromIndex;
        if (delta) {
            forceNextPop = true;
            go(delta);
        }
    }
    var path = getHashPath();
    var encodedPath = encodePath(path);
    if (path !== encodedPath)
        replaceHashPath(encodedPath);
    var initialLocation = getDOMLocation();
    var allPaths = [createPath(initialLocation)];
    function createHref(location) {
        return '#' + encodePath(basename + createPath(location));
    }
    function push(path, state) {
        warning(state === undefined, 'Hash history cannot push state; it is ignored');
        var action = 'PUSH';
        var location = createLocation(path, undefined, undefined, history.location);
        transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
            if (!ok)
                return;
            var path = createPath(location);
            var encodedPath = encodePath(basename + path);
            var hashChanged = getHashPath() !== encodedPath;
            if (hashChanged) {
                ignorePath = path;
                pushHashPath(encodedPath);
                var prevIndex = allPaths.lastIndexOf(createPath(history.location));
                var nextPaths = allPaths.slice(0, prevIndex === -1 ? 0 : prevIndex + 1);
                nextPaths.push(path);
                allPaths = nextPaths;
                setState({
                    action: action,
                    location: location
                });
            } else {
                warning(false, 'Hash history cannot PUSH the same path; a new entry will not be added to the history stack');
                setState();
            }
        });
    }
    function replace(path, state) {
        warning(state === undefined, 'Hash history cannot replace state; it is ignored');
        var action = 'REPLACE';
        var location = createLocation(path, undefined, undefined, history.location);
        transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
            if (!ok)
                return;
            var path = createPath(location);
            var encodedPath = encodePath(basename + path);
            var hashChanged = getHashPath() !== encodedPath;
            if (hashChanged) {
                ignorePath = path;
                replaceHashPath(encodedPath);
            }
            var prevIndex = allPaths.indexOf(createPath(history.location));
            if (prevIndex !== -1)
                allPaths[prevIndex] = path;
            setState({
                action: action,
                location: location
            });
        });
    }
    function go(n) {
        warning(canGoWithoutReload, 'Hash history go(n) causes a full page reload in this browser');
        globalHistory.go(n);
    }
    function goBack() {
        go(-1);
    }
    function goForward() {
        go(1);
    }
    var listenerCount = 0;
    function checkDOMListeners(delta) {
        listenerCount += delta;
        if (listenerCount === 1 && delta === 1) {
            window.addEventListener(HashChangeEvent$1, handleHashChange);
        } else if (listenerCount === 0) {
            window.removeEventListener(HashChangeEvent$1, handleHashChange);
        }
    }
    var isBlocked = false;
    function block(prompt) {
        if (prompt === void 0) {
            prompt = false;
        }
        var unblock = transitionManager.setPrompt(prompt);
        if (!isBlocked) {
            checkDOMListeners(1);
            isBlocked = true;
        }
        return function () {
            if (isBlocked) {
                isBlocked = false;
                checkDOMListeners(-1);
            }
            return unblock();
        };
    }
    function listen(listener) {
        var unlisten = transitionManager.appendListener(listener);
        checkDOMListeners(1);
        return function () {
            checkDOMListeners(-1);
            unlisten();
        };
    }
    var history = {
        length: globalHistory.length,
        action: 'POP',
        location: initialLocation,
        createHref: createHref,
        push: push,
        replace: replace,
        go: go,
        goBack: goBack,
        goForward: goForward,
        block: block,
        listen: listen
    };
    return history;
}
function clamp(n, lowerBound, upperBound) {
    return Math.min(Math.max(n, lowerBound), upperBound);
}
function createMemoryHistory(props) {
    if (props === void 0) {
        props = {};
    }
    var _props = props, getUserConfirmation = _props.getUserConfirmation, _props$initialEntries = _props.initialEntries, initialEntries = _props$initialEntries === void 0 ? ['/'] : _props$initialEntries, _props$initialIndex = _props.initialIndex, initialIndex = _props$initialIndex === void 0 ? 0 : _props$initialIndex, _props$keyLength = _props.keyLength, keyLength = _props$keyLength === void 0 ? 6 : _props$keyLength;
    var transitionManager = createTransitionManager();
    function setState(nextState) {
        _extends(history, nextState);
        history.length = history.entries.length;
        transitionManager.notifyListeners(history.location, history.action);
    }
    function createKey() {
        return Math.random().toString(36).substr(2, keyLength);
    }
    var index = clamp(initialIndex, 0, initialEntries.length - 1);
    var entries = initialEntries.map(function (entry) {
        return typeof entry === 'string' ? createLocation(entry, undefined, createKey()) : createLocation(entry, undefined, entry.key || createKey());
    });
    var createHref = createPath;
    function push(path, state) {
        warning(!(typeof path === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to push when the 1st ' + 'argument is a location-like object that already has state; it is ignored');
        var action = 'PUSH';
        var location = createLocation(path, state, createKey(), history.location);
        transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
            if (!ok)
                return;
            var prevIndex = history.index;
            var nextIndex = prevIndex + 1;
            var nextEntries = history.entries.slice(0);
            if (nextEntries.length > nextIndex) {
                nextEntries.splice(nextIndex, nextEntries.length - nextIndex, location);
            } else {
                nextEntries.push(location);
            }
            setState({
                action: action,
                location: location,
                index: nextIndex,
                entries: nextEntries
            });
        });
    }
    function replace(path, state) {
        warning(!(typeof path === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to replace when the 1st ' + 'argument is a location-like object that already has state; it is ignored');
        var action = 'REPLACE';
        var location = createLocation(path, state, createKey(), history.location);
        transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
            if (!ok)
                return;
            history.entries[history.index] = location;
            setState({
                action: action,
                location: location
            });
        });
    }
    function go(n) {
        var nextIndex = clamp(history.index + n, 0, history.entries.length - 1);
        var action = 'POP';
        var location = history.entries[nextIndex];
        transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
            if (ok) {
                setState({
                    action: action,
                    location: location,
                    index: nextIndex
                });
            } else {
                setState();
            }
        });
    }
    function goBack() {
        go(-1);
    }
    function goForward() {
        go(1);
    }
    function canGo(n) {
        var nextIndex = history.index + n;
        return nextIndex >= 0 && nextIndex < history.entries.length;
    }
    function block(prompt) {
        if (prompt === void 0) {
            prompt = false;
        }
        return transitionManager.setPrompt(prompt);
    }
    function listen(listener) {
        return transitionManager.appendListener(listener);
    }
    var history = {
        length: entries.length,
        action: 'POP',
        location: entries[index],
        index: index,
        entries: entries,
        createHref: createHref,
        push: push,
        replace: replace,
        go: go,
        goBack: goBack,
        goForward: goForward,
        canGo: canGo,
        block: block,
        listen: listen
    };
    return history;
}
exports.createBrowserHistory = createBrowserHistory;
exports.createHashHistory = createHashHistory;
exports.createMemoryHistory = createMemoryHistory;
exports.createLocation = createLocation;
exports.locationsAreEqual = locationsAreEqual;
exports.parsePath = parsePath;
exports.createPath = createPath;
}
// hoist-non-inferno-statics/index.js
$fsx.f[22] =
function(module,exports){
var INFERNO_STATICS = {
    childContextTypes: true,
    contextTypes: true,
    defaultProps: true,
    displayName: true,
    getDefaultProps: true,
    propTypes: true,
    type: true
};
var KNOWN_STATICS = {
    name: true,
    length: true,
    prototype: true,
    caller: true,
    arguments: true,
    arity: true
};
var isGetOwnPropertySymbolsAvailable = typeof Object.getOwnPropertySymbols === 'function';
function hoistNonReactStatics(targetComponent, sourceComponent, customStatics) {
    if (typeof sourceComponent !== 'string') {
        var keys = Object.getOwnPropertyNames(sourceComponent);
        if (isGetOwnPropertySymbolsAvailable) {
            keys = keys.concat(Object.getOwnPropertySymbols(sourceComponent));
        }
        for (var i = 0; i < keys.length; ++i) {
            if (!INFERNO_STATICS[keys[i]] && !KNOWN_STATICS[keys[i]] && (!customStatics || !customStatics[keys[i]])) {
                try {
                    targetComponent[keys[i]] = sourceComponent[keys[i]];
                } catch (error) {
                }
            }
        }
    }
    return targetComponent;
}
;
module.exports = hoistNonReactStatics;
module.exports.default = module.exports;
}
// inferno-mobx/index.js
$fsx.f[23] =
function(module,exports){
module.exports = $fsx.r(24);
}
// inferno-mobx/dist/index.cjs.min.js
$fsx.f[24] =
function(module,exports){
function e(e) {
    return e && 'object' == typeof e && 'default' in e ? e.default : e;
}
Object.defineProperty(exports, '__esModule', { value: !0 });
var u = $fsx.r(33), a = $fsx.r(29), r = e($fsx.r(22)), t = function () {
        this.listeners = [];
    };
function o(e) {
    console.error(e);
}
function c(e) {
    return !(e.prototype && e.prototype.render);
}
t.prototype.on = function (t) {
    var n = this;
    return this.listeners.push(t), function () {
        var e = n.listeners.indexOf(t);
        -1 !== e && n.listeners.splice(e, 1);
    };
};
var f = !(t.prototype.emit = function (e) {
        for (var t = this.listeners, n = 0, r = t.length; n < r; ++n)
            t[n](e);
    }), l = !1, i = !1, n = new t();
function s(e) {
    var t = e.$LI.dom;
    n.emit({
        component: e,
        event: 'render',
        node: t,
        renderTime: e.__$mobRenderEnd - e.__$mobRenderStart,
        totalTime: Date.now() - e.__$mobRenderStart
    });
}
function p() {
    f ? (f = !1, n.listeners.length = 0) : (f = !0, o('Do not turn trackComponents on in production, its expensive. For tracking dom nodes you need inferno-compat.'));
}
function d(e) {
    l = e;
}
var m = new t();
function h(e, t, n) {
    var r = e[t], o = b[t], i = r ? !0 === n ? function () {
            o.apply(this, arguments), r.apply(this, arguments);
        } : function () {
            r.apply(this, arguments), o.apply(this, arguments);
        } : o;
    e[t] = i;
}
function v(e, t) {
    if (null == e || null == t || 'object' != typeof e || 'object' != typeof t)
        return e !== t;
    var n, r = Object.keys(e);
    if (r.length !== Object.keys(t).length)
        return !0;
    for (var o = r.length - 1; 0 <= o; o--)
        if (t[n = r[o]] !== e[n])
            return !0;
    return !1;
}
var b = {
    componentWillMount: function () {
        var n = this;
        if (!0 !== l) {
            var e = this.displayName || this.name || this.constructor && (this.constructor.displayName || this.constructor.name) || '<component>', r = !1;
            c.call(this, 'props'), c.call(this, 'state');
            var t = this, o = this.render.bind(this), i = function () {
                    return o(t.props, t.state, t.context);
                }, s = null, p = !1, a = function () {
                    var t;
                    p = !1;
                    var e = null;
                    if (s.track(function () {
                            f && (n.__$mobRenderStart = Date.now());
                            try {
                                e = u._allowStateChanges(!1, i);
                            } catch (e) {
                                t = e;
                            }
                            f && (n.__$mobRenderEnd = Date.now());
                        }), t)
                        throw m.emit(t), t;
                    return e;
                };
            this.render = function () {
                return (s = new u.Reaction(e + '.render()', function () {
                    p || (p = !0, 'function' == typeof n.componentWillReact && n.componentWillReact(), r || n.forceUpdate());
                })).reactComponent = n, a.$mobx = s, (n.render = a)();
            };
        }
        function c(e) {
            var t = this[e], n = u.createAtom('reactive ' + e);
            Object.defineProperty(this, e, {
                configurable: !0,
                enumerable: !0,
                get: function () {
                    return n.reportObserved(), t;
                },
                set: function (e) {
                    v(t, e) ? (t = e, r = !0, n.reportChanged(), r = !1) : t = e;
                }
            });
        }
    },
    componentWillUnmount: function () {
        if (!0 !== l && (this.render.$mobx && this.render.$mobx.dispose(), f)) {
            var e = this.$LI.dom;
            n.emit({
                component: this,
                event: 'destroy',
                node: e
            });
        }
    },
    componentDidMount: function () {
        f && s(this);
    },
    componentDidUpdate: function () {
        f && s(this);
    },
    shouldComponentUpdate: function (e, t) {
        return l && o('[mobx-react] It seems that a re-rendering of a React component is triggered while in static (server-side) mode. Please make sure components are rendered only once server-side.'), this.state !== t || v(this.props, e);
    }
};
function y(t, e) {
    var n;
    if ('string' == typeof t)
        throw new Error('Store names should be provided as array');
    if (Array.isArray(t))
        return i || (i = !0, o('Mobx observer: Using observer to inject stores is deprecated since 4.0. Use `@inject("store1", "store2") @observer ComponentClass` or `inject("store1", "store2")(observer(componentClass))` instead of `@observer(["store1", "store2"]) ComponentClass`')), e ? w.apply(null, t)(y(e)) : function (e) {
            return y(t, e);
        };
    var r = t;
    if (!0 === r.isMobxInjector && o('Mobx observer: You are trying to use \'observer\' on a component that already has \'inject\'. Please apply \'observer\' before applying \'inject\''), !('function' != typeof r || r.prototype && r.prototype.render))
        return y(((n = function (e) {
            function t() {
                e.apply(this, arguments);
            }
            return e && (t.__proto__ = e), ((t.prototype = Object.create(e && e.prototype)).constructor = t).prototype.render = function (e, t, n) {
                return r(e, n);
            }, t;
        }(a.Component)).displayName = r.displayName || r.name, n.defaultProps = r.defaultProps, n));
    if (!r)
        throw new Error('Please pass a valid component to \'observer\'');
    return x(r.prototype || r), r.isMobXReactObserver = !0, r;
}
function x(e) {
    h(e, 'componentWillMount', !0), h(e, 'componentDidMount', !1), h(e, 'componentWillUnmount', !1), h(e, 'componentDidUpdate', !1), e.shouldComponentUpdate || (e.shouldComponentUpdate = b.shouldComponentUpdate);
}
var _ = y(function (e) {
    return (0, e.children)();
});
_.displayName = 'Observer';
var g = {
    isMobxInjector: {
        configurable: !0,
        enumerable: !0,
        value: !0,
        writable: !0
    }
};
function j(s, p, e) {
    var t = 'inject-' + (p.displayName || p.name || p.constructor && p.constructor.name || 'Unknown');
    e && (t += '-with-' + e);
    var n = function (n) {
        function e(e, t) {
            n.call(this, e, t), this.storeRef = this.storeRef.bind(this);
        }
        return n && (e.__proto__ = n), ((e.prototype = Object.create(n && n.prototype)).constructor = e).prototype.storeRef = function (e) {
            this.wrappedInstance = e;
        }, e.prototype.render = function (e, t, n) {
            var r, o = {};
            for (r in e)
                o[r] = e[r];
            var i = s(n.mobxStores || {}, o, n) || {};
            for (r in i)
                o[r] = i[r];
            return a.createComponentVNode(2, p, o, null, c(p) ? null : this.storeRef);
        }, e;
    }(a.Component);
    return n.displayName = t, n.isMobxInjector = !1, r(n, p), n.wrappedComponent = p, Object.defineProperties(n, g), n;
}
function C(i) {
    return function (e, t) {
        for (var n = 0, r = i.length; n < r; ++n) {
            var o = i[n];
            o in t || (t[o] = e[o]);
        }
        return t;
    };
}
function w() {
    var n, e = arguments;
    if ('function' == typeof arguments[0])
        return n = arguments[0], function (e) {
            var t = j(n, e);
            return t.isMobxInjector = !1, (t = y(t)).isMobxInjector = !0, t;
        };
    for (var t = [], r = 0; r < arguments.length; ++r)
        t.push(e[r]);
    return n = C(t), function (e) {
        return j(n, e, t.join('-'));
    };
}
var R = {
        children: !0,
        key: !0,
        ref: !0
    }, M = function (e) {
        function t() {
            e.apply(this, arguments);
        }
        return e && (t.__proto__ = e), ((t.prototype = Object.create(e && e.prototype)).constructor = t).prototype.render = function (e) {
            return e.children;
        }, t.prototype.getChildContext = function () {
            var e = {}, t = this.props, n = this.context.mobxStores;
            if (n)
                for (var r in n)
                    e[r] = n[r];
            for (var o in t)
                void 0 === R[o] && 'suppressChangedStoreWarning' !== o && (e[o] = t[o]);
            return { mobxStores: e };
        }, t;
    }(a.Component), O = function (e) {
        return m.on(e);
    };
exports.EventEmitter = t, exports.Observer = _, exports.Provider = M, exports.errorsReporter = m, exports.inject = w, exports.observer = y, exports.onError = O, exports.renderReporter = n, exports.trackComponents = p, exports.useStaticRendering = d;
}
// inferno-mobx/dist/index.cjs.js
$fsx.f[25] =
function(module,exports){
Object.defineProperty(exports, '__esModule', { value: true });
function _interopDefault(ex) {
    return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex;
}
var mobx = $fsx.r(33);
var inferno = $fsx.r(29);
var hoistNonReactStatics = _interopDefault($fsx.r(22));
var EventEmitter = function EventEmitter() {
    this.listeners = [];
};
EventEmitter.prototype.on = function on(cb) {
    var this$1 = this;
    this.listeners.push(cb);
    return function () {
        var index = this$1.listeners.indexOf(cb);
        if (index !== -1) {
            this$1.listeners.splice(index, 1);
        }
    };
};
EventEmitter.prototype.emit = function emit(data) {
    var listeners = this.listeners;
    for (var i = 0, len = listeners.length; i < len; ++i) {
        listeners[i](data);
    }
};
function warning(message) {
    console.error(message);
}
function isStateless(component) {
    return !(component.prototype && component.prototype.render);
}
var isDevtoolsEnabled = false;
var isUsingStaticRendering = false;
var warnedAboutObserverInjectDeprecation = false;
var renderReporter = new EventEmitter();
function reportRendering(component) {
    var node = component.$LI.dom;
    renderReporter.emit({
        component: component,
        event: 'render',
        node: node,
        renderTime: component.__$mobRenderEnd - component.__$mobRenderStart,
        totalTime: Date.now() - component.__$mobRenderStart
    });
}
function trackComponents() {
    if (!isDevtoolsEnabled) {
        isDevtoolsEnabled = true;
        warning('Do not turn trackComponents on in production, its expensive. For tracking dom nodes you need inferno-compat.');
    } else {
        isDevtoolsEnabled = false;
        renderReporter.listeners.length = 0;
    }
}
function useStaticRendering(useStatic) {
    isUsingStaticRendering = useStatic;
}
var errorsReporter = new EventEmitter();
function patch(target, funcName, runMixinFirst) {
    var base = target[funcName];
    var mixinFunc = reactiveMixin[funcName];
    var f = !base ? mixinFunc : runMixinFirst === true ? function () {
        mixinFunc.apply(this, arguments);
        base.apply(this, arguments);
    } : function () {
        base.apply(this, arguments);
        mixinFunc.apply(this, arguments);
    };
    target[funcName] = f;
}
function isObjectShallowModified(prev, next) {
    if (null == prev || null == next || typeof prev !== 'object' || typeof next !== 'object') {
        return prev !== next;
    }
    var keys = Object.keys(prev);
    if (keys.length !== Object.keys(next).length) {
        return true;
    }
    var key;
    for (var i = keys.length - 1; i >= 0; i--) {
        key = keys[i];
        if (next[key] !== prev[key]) {
            return true;
        }
    }
    return false;
}
var reactiveMixin = {
    componentWillMount: function componentWillMount() {
        var this$1 = this;
        if (isUsingStaticRendering === true) {
            return;
        }
        var initialName = this.displayName || this.name || this.constructor && (this.constructor.displayName || this.constructor.name) || '<component>';
        var skipRender = false;
        function makePropertyObservableReference(propName) {
            var valueHolder = this[propName];
            var atom = mobx.createAtom('reactive ' + propName);
            Object.defineProperty(this, propName, {
                configurable: true,
                enumerable: true,
                get: function get() {
                    atom.reportObserved();
                    return valueHolder;
                },
                set: function set(v) {
                    if (isObjectShallowModified(valueHolder, v)) {
                        valueHolder = v;
                        skipRender = true;
                        atom.reportChanged();
                        skipRender = false;
                    } else {
                        valueHolder = v;
                    }
                }
            });
        }
        makePropertyObservableReference.call(this, 'props');
        makePropertyObservableReference.call(this, 'state');
        var me = this;
        var render = this.render.bind(this);
        var baseRender = function () {
            return render(me.props, me.state, me.context);
        };
        var reaction = null;
        var isRenderingPending = false;
        var initialRender = function () {
            reaction = new mobx.Reaction(initialName + '.render()', function () {
                if (!isRenderingPending) {
                    isRenderingPending = true;
                    if (typeof this$1.componentWillReact === 'function') {
                        this$1.componentWillReact();
                    }
                    if (!skipRender) {
                        this$1.forceUpdate();
                    }
                }
            });
            reaction.reactComponent = this$1;
            reactiveRender.$mobx = reaction;
            this$1.render = reactiveRender;
            return reactiveRender();
        };
        var reactiveRender = function () {
            isRenderingPending = false;
            var exception;
            var rendering = null;
            reaction.track(function () {
                if (isDevtoolsEnabled) {
                    this$1.__$mobRenderStart = Date.now();
                }
                try {
                    rendering = mobx._allowStateChanges(false, baseRender);
                } catch (e) {
                    exception = e;
                }
                if (isDevtoolsEnabled) {
                    this$1.__$mobRenderEnd = Date.now();
                }
            });
            if (exception) {
                errorsReporter.emit(exception);
                throw exception;
            }
            return rendering;
        };
        this.render = initialRender;
    },
    componentWillUnmount: function componentWillUnmount() {
        if (isUsingStaticRendering === true) {
            return;
        }
        if (this.render.$mobx) {
            this.render.$mobx.dispose();
        }
        if (isDevtoolsEnabled) {
            var node = this.$LI.dom;
            renderReporter.emit({
                component: this,
                event: 'destroy',
                node: node
            });
        }
    },
    componentDidMount: function componentDidMount() {
        if (isDevtoolsEnabled) {
            reportRendering(this);
        }
    },
    componentDidUpdate: function componentDidUpdate() {
        if (isDevtoolsEnabled) {
            reportRendering(this);
        }
    },
    shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
        if (isUsingStaticRendering) {
            warning('[mobx-react] It seems that a re-rendering of a React component is triggered while in static (server-side) mode. Please make sure components are rendered only once server-side.');
        }
        if (this.state !== nextState) {
            return true;
        }
        return isObjectShallowModified(this.props, nextProps);
    }
};
function observer(arg1, arg2) {
    var _a;
    if (typeof arg1 === 'string') {
        throw new Error('Store names should be provided as array');
    }
    if (Array.isArray(arg1)) {
        if (!warnedAboutObserverInjectDeprecation) {
            warnedAboutObserverInjectDeprecation = true;
            warning('Mobx observer: Using observer to inject stores is deprecated since 4.0. Use `@inject("store1", "store2") @observer ComponentClass` or `inject("store1", "store2")(observer(componentClass))` instead of `@observer(["store1", "store2"]) ComponentClass`');
        }
        if (!arg2) {
            return function (componentClass) {
                return observer(arg1, componentClass);
            };
        } else {
            return inject.apply(null, arg1)(observer(arg2));
        }
    }
    var component = arg1;
    if (component.isMobxInjector === true) {
        warning('Mobx observer: You are trying to use \'observer\' on a component that already has \'inject\'. Please apply \'observer\' before applying \'inject\'');
    }
    if (typeof component === 'function' && (!component.prototype || !component.prototype.render)) {
        return observer((_a = function (Component) {
            function _a() {
                Component.apply(this, arguments);
            }
            if (Component)
                _a.__proto__ = Component;
            _a.prototype = Object.create(Component && Component.prototype);
            _a.prototype.constructor = _a;
            _a.prototype.render = function render(props, _state, context) {
                return component(props, context);
            };
            return _a;
        }(inferno.Component), _a.displayName = component.displayName || component.name, _a.defaultProps = component.defaultProps, _a));
    }
    if (!component) {
        throw new Error('Please pass a valid component to \'observer\'');
    }
    var target = component.prototype || component;
    mixinLifecycleEvents(target);
    component.isMobXReactObserver = true;
    return component;
}
function mixinLifecycleEvents(target) {
    patch(target, 'componentWillMount', true);
    patch(target, 'componentDidMount', false);
    patch(target, 'componentWillUnmount', false);
    patch(target, 'componentDidUpdate', false);
    if (!target.shouldComponentUpdate) {
        target.shouldComponentUpdate = reactiveMixin.shouldComponentUpdate;
    }
}
var Observer = observer(function (ref) {
    var children = ref.children;
    return children();
});
Observer.displayName = 'Observer';
var proxiedInjectorProps = {
    isMobxInjector: {
        configurable: true,
        enumerable: true,
        value: true,
        writable: true
    }
};
function createStoreInjector(grabStoresFn, component, injectNames) {
    var displayName = 'inject-' + (component.displayName || component.name || component.constructor && component.constructor.name || 'Unknown');
    if (injectNames) {
        displayName += '-with-' + injectNames;
    }
    var Injector = function (Component) {
        function Injector(props, context) {
            Component.call(this, props, context);
            this.storeRef = this.storeRef.bind(this);
        }
        if (Component)
            Injector.__proto__ = Component;
        Injector.prototype = Object.create(Component && Component.prototype);
        Injector.prototype.constructor = Injector;
        Injector.prototype.storeRef = function storeRef(instance) {
            this.wrappedInstance = instance;
        };
        Injector.prototype.render = function render(props, _state, context) {
            var newProps = {};
            var key;
            for (key in props) {
                newProps[key] = props[key];
            }
            var additionalProps = grabStoresFn(context.mobxStores || {}, newProps, context) || {};
            for (key in additionalProps) {
                newProps[key] = additionalProps[key];
            }
            return inferno.createComponentVNode(2, component, newProps, null, isStateless(component) ? null : this.storeRef);
        };
        return Injector;
    }(inferno.Component);
    Injector.displayName = displayName;
    Injector.isMobxInjector = false;
    hoistNonReactStatics(Injector, component);
    Injector.wrappedComponent = component;
    Object.defineProperties(Injector, proxiedInjectorProps);
    return Injector;
}
function grabStoresByName(storeNames) {
    return function (baseStores, nextProps) {
        for (var i = 0, len = storeNames.length; i < len; ++i) {
            var storeName = storeNames[i];
            if (!(storeName in nextProps)) {
                {
                    if (!(storeName in baseStores)) {
                        throw new Error('MobX injector: Store \'' + storeName + '\' is not available! Make sure it is provided by some Provider');
                    }
                }
                nextProps[storeName] = baseStores[storeName];
            }
        }
        return nextProps;
    };
}
function inject() {
    var arguments$1 = arguments;
    var grabStoresFn;
    if (typeof arguments[0] === 'function') {
        grabStoresFn = arguments[0];
        return function (componentClass) {
            var injected = createStoreInjector(grabStoresFn, componentClass);
            injected.isMobxInjector = false;
            injected = observer(injected);
            injected.isMobxInjector = true;
            return injected;
        };
    } else {
        var storeNames = [];
        for (var i = 0; i < arguments.length; ++i) {
            storeNames.push(arguments$1[i]);
        }
        grabStoresFn = grabStoresByName(storeNames);
        return function (componentClass) {
            return createStoreInjector(grabStoresFn, componentClass, storeNames.join('-'));
        };
    }
}
var specialKeys = {
    children: true,
    key: true,
    ref: true
};
var Provider = function (Component) {
    function Provider() {
        Component.apply(this, arguments);
    }
    if (Component)
        Provider.__proto__ = Component;
    Provider.prototype = Object.create(Component && Component.prototype);
    Provider.prototype.constructor = Provider;
    Provider.prototype.render = function render(props) {
        return props.children;
    };
    Provider.prototype.getChildContext = function getChildContext() {
        var stores = {};
        var props = this.props;
        var baseStores = this.context.mobxStores;
        if (baseStores) {
            for (var key in baseStores) {
                stores[key] = baseStores[key];
            }
        }
        for (var key$1 in props) {
            if (specialKeys[key$1] === void 0 && key$1 !== 'suppressChangedStoreWarning') {
                stores[key$1] = props[key$1];
            }
        }
        return { mobxStores: stores };
    };
    return Provider;
}(inferno.Component);
{
    Provider.prototype.componentWillReceiveProps = function (nextProps) {
        if (Object.keys(nextProps).length !== Object.keys(this.props).length) {
            warning('MobX Provider: The set of provided stores has changed. Please avoid changing stores as the change might not propagate to all children');
        }
        if (!nextProps.suppressChangedStoreWarning) {
            for (var key in nextProps) {
                if (specialKeys[key] === void 0 && this.props[key] !== nextProps[key]) {
                    warning('MobX Provider: Provided store \'' + key + '\' has changed. Please avoid replacing stores as the change might not propagate to all children');
                }
            }
        }
    };
}
var onError = function (fn) {
    return errorsReporter.on(fn);
};
exports.EventEmitter = EventEmitter;
exports.Observer = Observer;
exports.Provider = Provider;
exports.errorsReporter = errorsReporter;
exports.inject = inject;
exports.observer = observer;
exports.onError = onError;
exports.renderReporter = renderReporter;
exports.trackComponents = trackComponents;
exports.useStaticRendering = useStaticRendering;
}
// inferno-router/index.js
$fsx.f[26] =
function(module,exports){
module.exports = $fsx.r(27);
}
// inferno-router/dist/index.cjs.min.js
$fsx.f[27] =
function(module,exports){
function t(t) {
    return t && 'object' == typeof t && 'default' in t ? t.default : t;
}
Object.defineProperty(exports, '__esModule', { value: !0 });
var f = $fsx.r(29), r = $fsx.r(19), c = t($fsx.r(35)), e = t($fsx.r(22)), a = Array.isArray;
function s(t) {
    return o(t) || !1 === t || n(t) || i(t);
}
function o(t) {
    return null === t;
}
function n(t) {
    return !0 === t;
}
function i(t) {
    return void 0 === t;
}
function m(t, e) {
    var o = {};
    if (t)
        for (var r in t)
            o[r] = t[r];
    if (e)
        for (var n in e)
            o[n] = e[n];
    return o;
}
function p(t, e, o, r, n, i, c, a) {
    if (!t) {
        var s;
        if (void 0 === e)
            s = new Error('Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.');
        else {
            var p = [
                    o,
                    r,
                    n,
                    i,
                    c,
                    a
                ], u = 0;
            (s = new Error(e.replace(/%s/g, function () {
                return p[u++];
            }))).name = 'Invariant Violation';
        }
        throw s.framesToPop = 1, s;
    }
}
var u = function (o) {
    function t(t, e) {
        o.call(this, t, e), this.state = { match: this.computeMatch(t.history.location.pathname) };
    }
    return o && (t.__proto__ = o), ((t.prototype = Object.create(o && o.prototype)).constructor = t).prototype.getChildContext = function () {
        var t = m(this.context.router, null);
        return t.history = this.props.history, t.route = {
            location: t.history.location,
            match: this.state.match
        }, { router: t };
    }, t.prototype.computeMatch = function (t) {
        return {
            isExact: '/' === t,
            params: {},
            path: '/',
            url: '/'
        };
    }, t.prototype.componentWillMount = function () {
        var t = this, e = this.props.history;
        this.unlisten = e.listen(function () {
            t.setState({ match: t.computeMatch(e.location.pathname) });
        });
    }, t.prototype.componentWillUnmount = function () {
        this.unlisten();
    }, t.prototype.render = function (t) {
        return t.children;
    }, t;
}(f.Component);
function h(t, e) {
    var o = {};
    for (var r in t)
        Object.prototype.hasOwnProperty.call(t, r) && -1 === e.indexOf(r) && (o[r] = t[r]);
    return o;
}
function l(t) {
    return '/' === t.charAt(0) ? t : '/' + t;
}
var y = function () {
    }, d = function (t) {
        function e() {
            var n = this;
            t.apply(this, arguments), this.createHref = function (t) {
                return l(n.props.basename + b(t));
            }, this.handlePush = function (t) {
                var e = n.props, o = e.basename, r = e.context;
                r.action = 'PUSH', r.location = x(o, _(t)), r.url = b(r.location);
            }, this.handleReplace = function (t) {
                var e = n.props, o = e.basename, r = e.context;
                r.action = 'REPLACE', r.location = x(o, _(t)), r.url = b(r.location);
            }, this.handleListen = function () {
                return y;
            }, this.handleBlock = function () {
                return y;
            };
        }
        return t && (e.__proto__ = t), ((e.prototype = Object.create(t && t.prototype)).constructor = e).prototype.getChildContext = function () {
            return { router: { staticContext: this.props.context } };
        }, e.prototype.render = function (t) {
            var e = t.basename, o = (t.context, t.location), r = h(t, [
                    'basename',
                    'context',
                    'location'
                ]);
            return f.createComponentVNode(4, u, m(r, {
                history: {
                    action: 'POP',
                    block: this.handleBlock,
                    createHref: this.createHref,
                    go: g('go'),
                    goBack: g('goBack'),
                    goForward: g('goForward'),
                    listen: this.handleListen,
                    location: C(e, _(o)),
                    push: this.handlePush,
                    replace: this.handleReplace
                }
            }));
        }, e;
    }(f.Component);
function v(t) {
    var e = t.pathname;
    void 0 === e && (e = '/');
    var o = t.search, r = t.hash;
    return {
        hash: '#' === (r || '') ? '' : r,
        pathname: e,
        search: '?' === (o || '') ? '' : o
    };
}
function x(t, e) {
    return t ? m(e, { pathname: l(t) + e.pathname }) : e;
}
function C(t, e) {
    if (!t)
        return e;
    var o = l(t);
    return 0 !== e.pathname.indexOf(o) ? e : m(e, { pathname: e.pathname.substr(o.length) });
}
function _(t) {
    return 'string' == typeof t ? r.parsePath(t) : v(t);
}
function b(t) {
    return 'string' == typeof t ? t : r.createPath(t);
}
function g(t) {
    return function () {
        p(!1, 'You cannot %s with <StaticRouter>', t);
    };
}
d.defaultProps = {
    basename: '',
    location: '/'
};
var k = function (o) {
        function t(t, e) {
            o.call(this, t, e), this.history = r.createBrowserHistory(t);
        }
        return o && (t.__proto__ = o), ((t.prototype = Object.create(o && o.prototype)).constructor = t).prototype.render = function () {
            return f.createComponentVNode(4, u, {
                children: this.props.children,
                history: this.history
            });
        }, t;
    }(f.Component), O = function (o) {
        function t(t, e) {
            o.call(this, t, e), this.history = r.createHashHistory(t);
        }
        return o && (t.__proto__ = o), ((t.prototype = Object.create(o && o.prototype)).constructor = t).prototype.render = function () {
            return f.createComponentVNode(4, u, {
                children: this.props.children,
                history: this.history
            });
        }, t;
    }(f.Component), R = function (o) {
        function t(t, e) {
            o.call(this, t, e), this.history = r.createMemoryHistory(t);
        }
        return o && (t.__proto__ = o), ((t.prototype = Object.create(o && o.prototype)).constructor = t).prototype.render = function () {
            return f.createComponentVNode(4, u, {
                children: this.props.children,
                history: this.history
            });
        }, t;
    }(f.Component), w = {}, N = 10000, P = 0, j = function (t, e) {
        var o = '' + e.end + e.strict + e.sensitive, r = w[o] || (w[o] = {});
        if (r[t])
            return r[t];
        var n = [], i = {
                re: c(t, n, e),
                keys: n
            };
        return P < N && (r[t] = i, P++), i;
    };
function M(t, e) {
    'string' == typeof e && (e = { path: e });
    var o = e.path;
    void 0 === o && (o = '/');
    var r = e.exact;
    void 0 === r && (r = !1);
    var n = e.strict;
    void 0 === n && (n = !1);
    var i = e.sensitive;
    void 0 === i && (i = !1);
    var c = j(o, {
            end: r,
            strict: n,
            sensitive: i
        }), a = c.re, s = c.keys, p = a.exec(t);
    if (!p)
        return null;
    var u = p[0], h = p.slice(1), l = t === u;
    return r && !l ? null : {
        isExact: l,
        params: s.reduce(function (t, e, o) {
            return t[e.name] = h[o], t;
        }, {}),
        path: o,
        url: '/' === o && '' === u ? '/' : u
    };
}
var V = function (o) {
    function t(t, e) {
        o.call(this, t, e), this.state = { match: this.computeMatch(t, e.router) };
    }
    return o && (t.__proto__ = o), ((t.prototype = Object.create(o && o.prototype)).constructor = t).prototype.getChildContext = function () {
        var t = m(this.context.router, null);
        return t.route = {
            location: this.props.location || this.context.router.route.location,
            match: this.state.match
        }, { router: t };
    }, t.prototype.computeMatch = function (t, e) {
        var o = t.computedMatch, r = t.location, n = t.path, i = t.strict, c = t.exact, a = t.sensitive;
        if (o)
            return o;
        var s = e.route, p = (r || s.location).pathname;
        return n ? M(p, {
            path: n,
            strict: i,
            exact: c,
            sensitive: a
        }) : s.match;
    }, t.prototype.componentWillReceiveProps = function (t, e) {
        this.setState({ match: this.computeMatch(t, e.router) });
    }, t.prototype.render = function () {
        var t = this.state.match, e = this.props, o = e.children, r = e.component, n = e.render, i = this.context.router, c = i.history, a = i.route, s = i.staticContext, p = {
                match: t,
                location: this.props.location || a.location,
                history: c,
                staticContext: s
            };
        return r ? t ? f.createComponentVNode(2, r, p) : null : n ? t ? n(p, this.context) : null : 'function' == typeof o ? o(p) : o;
    }, t;
}(f.Component);
function S(t, e, o) {
    var r = t.path, n = t.exact, i = t.strict, c = t.sensitive, a = t.from, s = r || a;
    return s ? M(o.pathname, {
        path: s,
        exact: n,
        strict: i,
        sensitive: c
    }) : e.match;
}
function H(t, e, o) {
    var r, n;
    if (a(t))
        for (var i = 0; i < t.length; ++i) {
            if (n = t[i], a(n)) {
                var c = H(n, e, o);
                r = c.match, n = c._child;
            } else
                r = S(n.props, e, o);
            if (r)
                break;
        }
    else
        r = S(t.props, e, o), n = t;
    return {
        match: r,
        _child: n
    };
}
var E = function (t) {
    function e() {
        t.apply(this, arguments);
    }
    return t && (e.__proto__ = t), ((e.prototype = Object.create(t && t.prototype)).constructor = e).prototype.render = function () {
        var t = this.context.router.route, e = this.props.children, o = this.props.location || t.location;
        if (s(e))
            return null;
        var r = H(e, t, o), n = r.match, i = r._child;
        return n ? f.createComponentVNode(i.flags, i.type, m(i.props, {
            location: o,
            computedMatch: n
        })) : null;
    }, e;
}(f.Component);
function L(t, e) {
    var o = {};
    for (var r in t)
        Object.prototype.hasOwnProperty.call(t, r) && -1 === e.indexOf(r) && (o[r] = t[r]);
    return o;
}
var W = function (t) {
    return Boolean(t.metaKey || t.altKey || t.ctrlKey || t.shiftKey);
};
function A(t, e) {
    var o = t.props, r = t.context;
    if (o.onClick && o.onClick(e), !e.defaultPrevented && 0 === e.button && !o.target && !W(e)) {
        e.preventDefault();
        var n = r.router.history, i = o.replace;
        void 0 === i && (i = !1);
        var c = o.to;
        i ? n.replace(c) : n.push(c);
    }
}
function B(t, e) {
    t.replace;
    var o = t.children, r = t.className, n = t.to;
    void 0 === n && (n = '');
    var i = t.innerRef, c = L(t, [
            'replace',
            'children',
            'className',
            'to',
            'innerRef'
        ]);
    p(e.router, 'You should not use <Link> outside a <Router>');
    var a = e.router.history.createHref('string' == typeof n ? { pathname: n } : n), s = m(c, null);
    return s.href = a, s.onClick = f.linkEvent({
        context: e,
        props: t
    }, A), f.createVNode(1, 'a', r, o, 0, s, null, i);
}
function q(t, e) {
    var o = {};
    for (var r in t)
        Object.prototype.hasOwnProperty.call(t, r) && -1 === e.indexOf(r) && (o[r] = t[r]);
    return o;
}
function Y(t) {
    return t;
}
function K(t) {
    var n = t.to, e = t.exact, o = t.strict, i = t.onClick, r = t.location, c = t.activeClassName;
    void 0 === c && (c = 'active');
    var a = t.className, s = t.activeStyle, p = t.style, u = t.isActive, h = t.ariaCurrent;
    void 0 === h && (h = 'true');
    var l = q(t, [
        'to',
        'exact',
        'strict',
        'onClick',
        'location',
        'activeClassName',
        'className',
        'activeStyle',
        'style',
        'isActive',
        'ariaCurrent'
    ]);
    return f.createComponentVNode(4, V, {
        children: function (t) {
            var e = t.location, o = t.match, r = !!(u ? u(o, e) : o);
            return f.createComponentVNode(8, B, m({
                'aria-current': r && h,
                className: r ? [
                    a,
                    c
                ].filter(Y).join(' ') : a,
                onClick: i,
                style: r ? m(p, s) : p,
                to: n
            }, l));
        },
        exact: e,
        location: r,
        path: 'object' == typeof n ? n.pathname : n,
        strict: o
    });
}
var U = function (t) {
        function e() {
            t.apply(this, arguments);
        }
        return t && (e.__proto__ = t), ((e.prototype = Object.create(t && t.prototype)).constructor = e).prototype.enable = function (t) {
            this.unblock && this.unblock(), this.unblock = this.context.router.history.block(t);
        }, e.prototype.disable = function () {
            this.unblock && (this.unblock(), this.unblock = null);
        }, e.prototype.componentWillMount = function () {
            p(this.context.router, 'You should not use <Prompt> outside a <Router>'), this.props.when && this.enable(this.props.message);
        }, e.prototype.componentWillReceiveProps = function (t) {
            t.when ? this.props.when && this.props.message === t.message || this.enable(t.message) : this.disable();
        }, e.prototype.componentWillUnmount = function () {
            this.disable();
        }, e.prototype.render = function () {
            return null;
        }, e;
    }(f.Component), D = function (t) {
        function e() {
            t.apply(this, arguments);
        }
        return t && (e.__proto__ = t), ((e.prototype = Object.create(t && t.prototype)).constructor = e).prototype.isStatic = function () {
            return this.context.router && this.context.router.staticContext;
        }, e.prototype.componentWillMount = function () {
            p(this.context.router, 'You should not use <Redirect> outside a <Router>'), this.isStatic() && this.perform();
        }, e.prototype.componentDidMount = function () {
            this.isStatic() || this.perform();
        }, e.prototype.componentDidUpdate = function (t) {
            var e = r.createLocation(t.to), o = r.createLocation(this.props.to);
            r.locationsAreEqual(e, o) ? console.error('You tried to redirect to the same route you\'re currently on: "' + o.pathname + o.search + '"') : this.perform();
        }, e.prototype.perform = function () {
            var t = this.context.router.history, e = this.props, o = e.push;
            void 0 === o && (o = !1);
            var r = e.to;
            o ? t.push(r) : t.replace(r);
        }, e.prototype.render = function () {
            return null;
        }, e;
    }(f.Component);
function F(t, e) {
    var o = {};
    for (var r in t)
        Object.prototype.hasOwnProperty.call(t, r) && -1 === e.indexOf(r) && (o[r] = t[r]);
    return o;
}
function I(r) {
    function t(t) {
        var e = t.wrappedComponentRef, o = F(t, ['wrappedComponentRef']);
        return f.createComponentVNode(4, V, {
            render: function (t) {
                return f.createComponentVNode(2, r, m(o, t), null, e);
            }
        });
    }
    return t.displayName = 'withRouter(' + (r.displayName || r.name) + ')', t.WrappedComponent = r, e(t, r);
}
exports.BrowserRouter = k, exports.HashRouter = O, exports.Link = B, exports.MemoryRouter = R, exports.NavLink = K, exports.Prompt = U, exports.Redirect = D, exports.Route = V, exports.Router = u, exports.StaticRouter = d, exports.Switch = E, exports.matchPath = M, exports.withRouter = I;
}
// inferno-router/dist/index.cjs.js
$fsx.f[28] =
function(module,exports){
Object.defineProperty(exports, '__esModule', { value: true });
function _interopDefault(ex) {
    return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex;
}
var inferno = $fsx.r(29);
var history = $fsx.r(19);
var pathToRegexp = _interopDefault($fsx.r(35));
var hoistNonReactStatics = _interopDefault($fsx.r(22));
var isArray = Array.isArray;
function isInvalid(o) {
    return isNull(o) || o === false || isTrue(o) || isUndefined(o);
}
function isFunction(o) {
    return typeof o === 'function';
}
function isNull(o) {
    return o === null;
}
function isTrue(o) {
    return o === true;
}
function isUndefined(o) {
    return o === void 0;
}
function combineFrom(first, second) {
    var out = {};
    if (first) {
        for (var key in first) {
            out[key] = first[key];
        }
    }
    if (second) {
        for (var key$1 in second) {
            out[key$1] = second[key$1];
        }
    }
    return out;
}
function warning(condition, message) {
    if (!condition) {
        console.error(message);
    }
}
function invariant(condition, format, a, b, c, d, e, f) {
    if (!condition) {
        var error;
        if (format === undefined) {
            error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
        } else {
            var args = [
                a,
                b,
                c,
                d,
                e,
                f
            ];
            var argIndex = 0;
            error = new Error(format.replace(/%s/g, function () {
                return args[argIndex++];
            }));
            error.name = 'Invariant Violation';
        }
        error.framesToPop = 1;
        throw error;
    }
}
var Router = function (Component) {
    function Router(props, context) {
        Component.call(this, props, context);
        this.state = { match: this.computeMatch(props.history.location.pathname) };
    }
    if (Component)
        Router.__proto__ = Component;
    Router.prototype = Object.create(Component && Component.prototype);
    Router.prototype.constructor = Router;
    Router.prototype.getChildContext = function getChildContext() {
        var childContext = combineFrom(this.context.router, null);
        childContext.history = this.props.history;
        childContext.route = {
            location: childContext.history.location,
            match: this.state.match
        };
        return { router: childContext };
    };
    Router.prototype.computeMatch = function computeMatch(pathname) {
        return {
            isExact: pathname === '/',
            params: {},
            path: '/',
            url: '/'
        };
    };
    Router.prototype.componentWillMount = function componentWillMount() {
        var this$1 = this;
        var ref = this.props;
        var history = ref.history;
        this.unlisten = history.listen(function () {
            this$1.setState({ match: this$1.computeMatch(history.location.pathname) });
        });
    };
    Router.prototype.componentWillUnmount = function componentWillUnmount() {
        this.unlisten();
    };
    Router.prototype.render = function render(props) {
        return props.children;
    };
    return Router;
}(inferno.Component);
{
    Router.prototype.componentWillReceiveProps = function (nextProps) {
        warning(this.props.history === nextProps.history, 'You cannot change <Router history>');
    };
}
function objectWithoutProperties(obj, exclude) {
    var target = {};
    for (var k in obj)
        if (Object.prototype.hasOwnProperty.call(obj, k) && exclude.indexOf(k) === -1)
            target[k] = obj[k];
    return target;
}
function addLeadingSlash(path) {
    return path.charAt(0) === '/' ? path : '/' + path;
}
var noop = function () {
};
var StaticRouter = function (Component) {
    function StaticRouter() {
        var this$1 = this;
        Component.apply(this, arguments);
        this.createHref = function (path) {
            return addLeadingSlash(this$1.props.basename + createURL(path));
        };
        this.handlePush = function (location) {
            var ref = this$1.props;
            var basename = ref.basename;
            var context = ref.context;
            context.action = 'PUSH';
            context.location = addBasename(basename, createLocation(location));
            context.url = createURL(context.location);
        };
        this.handleReplace = function (location) {
            var ref = this$1.props;
            var basename = ref.basename;
            var context = ref.context;
            context.action = 'REPLACE';
            context.location = addBasename(basename, createLocation(location));
            context.url = createURL(context.location);
        };
        this.handleListen = function () {
            return noop;
        };
        this.handleBlock = function () {
            return noop;
        };
    }
    if (Component)
        StaticRouter.__proto__ = Component;
    StaticRouter.prototype = Object.create(Component && Component.prototype);
    StaticRouter.prototype.constructor = StaticRouter;
    StaticRouter.prototype.getChildContext = function getChildContext() {
        return { router: { staticContext: this.props.context } };
    };
    StaticRouter.prototype.render = function render(ref) {
        var basename = ref.basename;
        var context = ref.context;
        var location = ref.location;
        var rest = objectWithoutProperties(ref, [
            'basename',
            'context',
            'location'
        ]);
        var props = rest;
        return inferno.createComponentVNode(4, Router, combineFrom(props, {
            history: {
                action: 'POP',
                block: this.handleBlock,
                createHref: this.createHref,
                go: staticHandler('go'),
                goBack: staticHandler('goBack'),
                goForward: staticHandler('goForward'),
                listen: this.handleListen,
                location: stripBasename(basename, createLocation(location)),
                push: this.handlePush,
                replace: this.handleReplace
            }
        }));
    };
    return StaticRouter;
}(inferno.Component);
StaticRouter.defaultProps = {
    basename: '',
    location: '/'
};
{
    StaticRouter.prototype.componentWillMount = function () {
        warning(!this.props.history, '<StaticRouter> ignores the history prop. To use a custom history, ' + 'use `import { Router }` instead of `import { StaticRouter as Router }`.');
    };
}
function normalizeLocation(ref) {
    var pathname = ref.pathname;
    if (pathname === void 0)
        pathname = '/';
    var search = ref.search;
    var hash = ref.hash;
    return {
        hash: (hash || '') === '#' ? '' : hash,
        pathname: pathname,
        search: (search || '') === '?' ? '' : search
    };
}
function addBasename(basename, location) {
    if (!basename) {
        return location;
    }
    return combineFrom(location, { pathname: addLeadingSlash(basename) + location.pathname });
}
function stripBasename(basename, location) {
    if (!basename) {
        return location;
    }
    var base = addLeadingSlash(basename);
    if (location.pathname.indexOf(base) !== 0) {
        return location;
    }
    return combineFrom(location, { pathname: location.pathname.substr(base.length) });
}
function createLocation(location) {
    return typeof location === 'string' ? history.parsePath(location) : normalizeLocation(location);
}
function createURL(location) {
    return typeof location === 'string' ? location : history.createPath(location);
}
function staticHandler(methodName) {
    return function () {
        invariant(false, 'You cannot %s with <StaticRouter>', methodName);
    };
}
var BrowserRouter = function (Component) {
    function BrowserRouter(props, context) {
        Component.call(this, props, context);
        this.history = history.createBrowserHistory(props);
    }
    if (Component)
        BrowserRouter.__proto__ = Component;
    BrowserRouter.prototype = Object.create(Component && Component.prototype);
    BrowserRouter.prototype.constructor = BrowserRouter;
    BrowserRouter.prototype.render = function render() {
        return inferno.createComponentVNode(4, Router, {
            children: this.props.children,
            history: this.history
        });
    };
    return BrowserRouter;
}(inferno.Component);
{
    BrowserRouter.prototype.componentWillMount = function () {
        warning(!this.props.history, '<BrowserRouter> ignores the history prop. To use a custom history, ' + 'use `import { Router }` instead of `import { BrowserRouter as Router }`.');
    };
}
var HashRouter = function (Component) {
    function HashRouter(props, context) {
        Component.call(this, props, context);
        this.history = history.createHashHistory(props);
    }
    if (Component)
        HashRouter.__proto__ = Component;
    HashRouter.prototype = Object.create(Component && Component.prototype);
    HashRouter.prototype.constructor = HashRouter;
    HashRouter.prototype.render = function render() {
        return inferno.createComponentVNode(4, Router, {
            children: this.props.children,
            history: this.history
        });
    };
    return HashRouter;
}(inferno.Component);
{
    HashRouter.prototype.componentWillMount = function () {
        warning(!this.props.history, '<HashRouter> ignores the history prop. To use a custom history, ' + 'use `import { Router }` instead of `import { HashRouter as Router }`.');
    };
}
var MemoryRouter = function (Component) {
    function MemoryRouter(props, context) {
        Component.call(this, props, context);
        this.history = history.createMemoryHistory(props);
    }
    if (Component)
        MemoryRouter.__proto__ = Component;
    MemoryRouter.prototype = Object.create(Component && Component.prototype);
    MemoryRouter.prototype.constructor = MemoryRouter;
    MemoryRouter.prototype.render = function render() {
        return inferno.createComponentVNode(4, Router, {
            children: this.props.children,
            history: this.history
        });
    };
    return MemoryRouter;
}(inferno.Component);
{
    MemoryRouter.prototype.componentWillMount = function () {
        warning(!this.props.history, '<MemoryRouter> ignores the history prop. To use a custom history, ' + 'use `import { Router }` instead of `import { MemoryRouter as Router }`.');
    };
}
var patternCache = {};
var cacheLimit = 10000;
var cacheCount = 0;
var compilePath = function (pattern, options) {
    var cacheKey = '' + options.end + options.strict + options.sensitive;
    var cache = patternCache[cacheKey] || (patternCache[cacheKey] = {});
    if (cache[pattern]) {
        return cache[pattern];
    }
    var keys = [];
    var re = pathToRegexp(pattern, keys, options);
    var compiledPattern = {
        re: re,
        keys: keys
    };
    if (cacheCount < cacheLimit) {
        cache[pattern] = compiledPattern;
        cacheCount++;
    }
    return compiledPattern;
};
function matchPath(pathname, options) {
    if (typeof options === 'string') {
        options = { path: options };
    }
    var path = options.path;
    if (path === void 0)
        path = '/';
    var exact = options.exact;
    if (exact === void 0)
        exact = false;
    var strict = options.strict;
    if (strict === void 0)
        strict = false;
    var sensitive = options.sensitive;
    if (sensitive === void 0)
        sensitive = false;
    var ref = compilePath(path, {
        end: exact,
        strict: strict,
        sensitive: sensitive
    });
    var re = ref.re;
    var keys = ref.keys;
    var match = re.exec(pathname);
    if (!match) {
        return null;
    }
    var url = match[0];
    var values = match.slice(1);
    var isExact = pathname === url;
    if (exact && !isExact) {
        return null;
    }
    return {
        isExact: isExact,
        params: keys.reduce(function (memo, key, index) {
            memo[key.name] = values[index];
            return memo;
        }, {}),
        path: path,
        url: path === '/' && url === '' ? '/' : url
    };
}
var Route = function (Component) {
    function Route(props, context) {
        Component.call(this, props, context);
        this.state = { match: this.computeMatch(props, context.router) };
    }
    if (Component)
        Route.__proto__ = Component;
    Route.prototype = Object.create(Component && Component.prototype);
    Route.prototype.constructor = Route;
    Route.prototype.getChildContext = function getChildContext() {
        var childContext = combineFrom(this.context.router, null);
        childContext.route = {
            location: this.props.location || this.context.router.route.location,
            match: this.state.match
        };
        return { router: childContext };
    };
    Route.prototype.computeMatch = function computeMatch(ref, router) {
        var computedMatch = ref.computedMatch;
        var location = ref.location;
        var path = ref.path;
        var strict = ref.strict;
        var exact = ref.exact;
        var sensitive = ref.sensitive;
        if (computedMatch) {
            return computedMatch;
        }
        {
            invariant(router, 'You should not use <Route> or withRouter() outside a <Router>');
        }
        var route = router.route;
        var pathname = (location || route.location).pathname;
        return path ? matchPath(pathname, {
            path: path,
            strict: strict,
            exact: exact,
            sensitive: sensitive
        }) : route.match;
    };
    Route.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps, nextContext) {
        {
            warning(!(nextProps.location && !this.props.location), '<Route> elements should not change from uncontrolled to controlled (or vice versa). You initially used no "location" prop and then provided one on a subsequent render.');
            warning(!(!nextProps.location && this.props.location), '<Route> elements should not change from controlled to uncontrolled (or vice versa). You provided a "location" prop initially but omitted it on a subsequent render.');
        }
        this.setState({ match: this.computeMatch(nextProps, nextContext.router) });
    };
    Route.prototype.render = function render() {
        var ref = this.state;
        var match = ref.match;
        var ref$1 = this.props;
        var children = ref$1.children;
        var component = ref$1.component;
        var render = ref$1.render;
        var ref$2 = this.context.router;
        var history = ref$2.history;
        var route = ref$2.route;
        var staticContext = ref$2.staticContext;
        var location = this.props.location || route.location;
        var props = {
            match: match,
            location: location,
            history: history,
            staticContext: staticContext
        };
        if (component) {
            {
                if (!isFunction(component)) {
                    throw new Error('Inferno error: <Route /> - \'component\' property must be prototype of class or functional component, not vNode.');
                }
            }
            return match ? inferno.createComponentVNode(2, component, props) : null;
        }
        if (render) {
            return match ? render(props, this.context) : null;
        }
        if (typeof children === 'function') {
            return children(props);
        }
        return children;
    };
    return Route;
}(inferno.Component);
{
    Route.prototype.componentWillMount = function () {
        warning(!(this.props.component && this.props.render), 'You should not use <Route component> and <Route render> in the same route; <Route render> will be ignored');
        warning(!(this.props.component && this.props.children), 'You should not use <Route component> and <Route children> in the same route; <Route children> will be ignored');
        warning(!(this.props.render && this.props.children), 'You should not use <Route render> and <Route children> in the same route; <Route children> will be ignored');
    };
}
function getMatch(ref, route, location) {
    var path = ref.path;
    var exact = ref.exact;
    var strict = ref.strict;
    var sensitive = ref.sensitive;
    var from = ref.from;
    var pathProp = path || from;
    return pathProp ? matchPath(location.pathname, {
        path: pathProp,
        exact: exact,
        strict: strict,
        sensitive: sensitive
    }) : route.match;
}
function extractMatchFromChildren(children, route, location) {
    var match;
    var _child;
    if (isArray(children)) {
        for (var i = 0; i < children.length; ++i) {
            _child = children[i];
            if (isArray(_child)) {
                var nestedMatch = extractMatchFromChildren(_child, route, location);
                match = nestedMatch.match;
                _child = nestedMatch._child;
            } else {
                match = getMatch(_child.props, route, location);
            }
            if (match) {
                break;
            }
        }
    } else {
        match = getMatch(children.props, route, location);
        _child = children;
    }
    return {
        match: match,
        _child: _child
    };
}
var Switch = function (Component) {
    function Switch() {
        Component.apply(this, arguments);
    }
    if (Component)
        Switch.__proto__ = Component;
    Switch.prototype = Object.create(Component && Component.prototype);
    Switch.prototype.constructor = Switch;
    Switch.prototype.render = function render() {
        var ref = this.context.router;
        var route = ref.route;
        var ref$1 = this.props;
        var children = ref$1.children;
        var location = this.props.location || route.location;
        if (isInvalid(children)) {
            return null;
        }
        var ref$2 = extractMatchFromChildren(children, route, location);
        var match = ref$2.match;
        var _child = ref$2._child;
        if (match) {
            return inferno.createComponentVNode(_child.flags, _child.type, combineFrom(_child.props, {
                location: location,
                computedMatch: match
            }));
        }
        return null;
    };
    return Switch;
}(inferno.Component);
{
    Switch.prototype.componentWillMount = function () {
        invariant(this.context.router, 'You should not use <Switch> outside a <Router>');
    };
    Switch.prototype.componentWillReceiveProps = function (nextProps) {
        warning(!(nextProps.location && !this.props.location), '<Switch> elements should not change from uncontrolled to controlled (or vice versa). You initially used no "location" prop and then provided one on a subsequent render.');
        warning(!(!nextProps.location && this.props.location), '<Switch> elements should not change from controlled to uncontrolled (or vice versa). You provided a "location" prop initially but omitted it on a subsequent render.');
    };
}
function objectWithoutProperties$1(obj, exclude) {
    var target = {};
    for (var k in obj)
        if (Object.prototype.hasOwnProperty.call(obj, k) && exclude.indexOf(k) === -1)
            target[k] = obj[k];
    return target;
}
var isModifiedEvent = function (event) {
    return Boolean(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
};
function handleClick(ref, event) {
    var props = ref.props;
    var context = ref.context;
    if (props.onClick) {
        props.onClick(event);
    }
    if (!event.defaultPrevented && event.button === 0 && !props.target && !isModifiedEvent(event)) {
        event.preventDefault();
        var ref$1 = context.router;
        var history = ref$1.history;
        var replace = props.replace;
        if (replace === void 0)
            replace = false;
        var to = props.to;
        if (replace) {
            history.replace(to);
        } else {
            history.push(to);
        }
    }
}
function Link(props, context) {
    var replace = props.replace;
    var children = props.children;
    var className = props.className;
    var to = props.to;
    if (to === void 0)
        to = '';
    var innerRef = props.innerRef;
    var rest$1 = objectWithoutProperties$1(props, [
        'replace',
        'children',
        'className',
        'to',
        'innerRef'
    ]);
    var rest = rest$1;
    invariant(context.router, 'You should not use <Link> outside a <Router>');
    var href = context.router.history.createHref(typeof to === 'string' ? { pathname: to } : to);
    var newProps = combineFrom(rest, null);
    newProps.href = href;
    newProps.onClick = inferno.linkEvent({
        context: context,
        props: props
    }, handleClick);
    return inferno.createVNode(1, 'a', className, children, 0, newProps, null, innerRef);
}
function objectWithoutProperties$2(obj, exclude) {
    var target = {};
    for (var k in obj)
        if (Object.prototype.hasOwnProperty.call(obj, k) && exclude.indexOf(k) === -1)
            target[k] = obj[k];
    return target;
}
function filter(i) {
    return i;
}
function NavLink(ref) {
    var to = ref.to;
    var exact = ref.exact;
    var strict = ref.strict;
    var onClick = ref.onClick;
    var linkLocation = ref.location;
    var activeClassName = ref.activeClassName;
    if (activeClassName === void 0)
        activeClassName = 'active';
    var className = ref.className;
    var activeStyle = ref.activeStyle;
    var style = ref.style;
    var getIsActive = ref.isActive;
    var ariaCurrent = ref.ariaCurrent;
    if (ariaCurrent === void 0)
        ariaCurrent = 'true';
    var rest$1 = objectWithoutProperties$2(ref, [
        'to',
        'exact',
        'strict',
        'onClick',
        'location',
        'activeClassName',
        'className',
        'activeStyle',
        'style',
        'isActive',
        'ariaCurrent'
    ]);
    var rest = rest$1;
    function linkComponent(ref) {
        var location = ref.location;
        var match = ref.match;
        var isActive = !!(getIsActive ? getIsActive(match, location) : match);
        return inferno.createComponentVNode(8, Link, combineFrom({
            'aria-current': isActive && ariaCurrent,
            className: isActive ? [
                className,
                activeClassName
            ].filter(filter).join(' ') : className,
            onClick: onClick,
            style: isActive ? combineFrom(style, activeStyle) : style,
            to: to
        }, rest));
    }
    return inferno.createComponentVNode(4, Route, {
        children: linkComponent,
        exact: exact,
        location: linkLocation,
        path: typeof to === 'object' ? to.pathname : to,
        strict: strict
    });
}
var Prompt = function (Component) {
    function Prompt() {
        Component.apply(this, arguments);
    }
    if (Component)
        Prompt.__proto__ = Component;
    Prompt.prototype = Object.create(Component && Component.prototype);
    Prompt.prototype.constructor = Prompt;
    Prompt.prototype.enable = function enable(message) {
        if (this.unblock) {
            this.unblock();
        }
        this.unblock = this.context.router.history.block(message);
    };
    Prompt.prototype.disable = function disable() {
        if (this.unblock) {
            this.unblock();
            this.unblock = null;
        }
    };
    Prompt.prototype.componentWillMount = function componentWillMount() {
        invariant(this.context.router, 'You should not use <Prompt> outside a <Router>');
        if (this.props.when) {
            this.enable(this.props.message);
        }
    };
    Prompt.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if (nextProps.when) {
            if (!this.props.when || this.props.message !== nextProps.message) {
                this.enable(nextProps.message);
            }
        } else {
            this.disable();
        }
    };
    Prompt.prototype.componentWillUnmount = function componentWillUnmount() {
        this.disable();
    };
    Prompt.prototype.render = function render() {
        return null;
    };
    return Prompt;
}(inferno.Component);
var Redirect = function (Component) {
    function Redirect() {
        Component.apply(this, arguments);
    }
    if (Component)
        Redirect.__proto__ = Component;
    Redirect.prototype = Object.create(Component && Component.prototype);
    Redirect.prototype.constructor = Redirect;
    Redirect.prototype.isStatic = function isStatic() {
        return this.context.router && this.context.router.staticContext;
    };
    Redirect.prototype.componentWillMount = function componentWillMount() {
        invariant(this.context.router, 'You should not use <Redirect> outside a <Router>');
        if (this.isStatic()) {
            this.perform();
        }
    };
    Redirect.prototype.componentDidMount = function componentDidMount() {
        if (!this.isStatic()) {
            this.perform();
        }
    };
    Redirect.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
        var prevTo = history.createLocation(prevProps.to);
        var nextTo = history.createLocation(this.props.to);
        if (history.locationsAreEqual(prevTo, nextTo)) {
            console.error('You tried to redirect to the same route you\'re currently on: "' + nextTo.pathname + nextTo.search + '"');
            return;
        }
        this.perform();
    };
    Redirect.prototype.perform = function perform() {
        var ref = this.context.router;
        var history = ref.history;
        var ref$1 = this.props;
        var push = ref$1.push;
        if (push === void 0)
            push = false;
        var to = ref$1.to;
        if (push) {
            history.push(to);
        } else {
            history.replace(to);
        }
    };
    Redirect.prototype.render = function render() {
        return null;
    };
    return Redirect;
}(inferno.Component);
function objectWithoutProperties$3(obj, exclude) {
    var target = {};
    for (var k in obj)
        if (Object.prototype.hasOwnProperty.call(obj, k) && exclude.indexOf(k) === -1)
            target[k] = obj[k];
    return target;
}
function withRouter(Com) {
    var C = function (props) {
        var wrappedComponentRef = props.wrappedComponentRef;
        var rest = objectWithoutProperties$3(props, ['wrappedComponentRef']);
        var remainingProps = rest;
        return inferno.createComponentVNode(4, Route, {
            render: function render(routeComponentProps) {
                return inferno.createComponentVNode(2, Com, combineFrom(remainingProps, routeComponentProps), null, wrappedComponentRef);
            }
        });
    };
    C.displayName = 'withRouter(' + (Com.displayName || Com.name) + ')';
    C.WrappedComponent = Com;
    return hoistNonReactStatics(C, Com);
}
exports.BrowserRouter = BrowserRouter;
exports.HashRouter = HashRouter;
exports.Link = Link;
exports.MemoryRouter = MemoryRouter;
exports.NavLink = NavLink;
exports.Prompt = Prompt;
exports.Redirect = Redirect;
exports.Route = Route;
exports.Router = Router;
exports.StaticRouter = StaticRouter;
exports.Switch = Switch;
exports.matchPath = matchPath;
exports.withRouter = withRouter;
}
// inferno/index.js
$fsx.f[29] =
function(module,exports){
module.exports = $fsx.r(30);
}
// inferno/dist/index.cjs.min.js
$fsx.f[30] =
function(module,exports){
Object.defineProperty(exports, '__esModule', { value: !0 });
var f = Array.isArray;
function d(e) {
    var n = typeof e;
    return 'string' == n || 'number' == n;
}
function b(e) {
    return m(e) || g(e);
}
function p(e) {
    return g(e) || !1 === e || n(e) || m(e);
}
function h(e) {
    return 'function' == typeof e;
}
function v(e) {
    return 'string' == typeof e;
}
function i(e) {
    return 'number' == typeof e;
}
function g(e) {
    return null === e;
}
function n(e) {
    return !0 === e;
}
function m(e) {
    return void 0 === e;
}
function a(e) {
    return 'object' == typeof e;
}
function y(e, n) {
    var t = {};
    if (e)
        for (var r in e)
            t[r] = e[r];
    if (n)
        for (var o in n)
            t[o] = n[o];
    return t;
}
var x = {}, t = '$F';
function s(e) {
    return e.substr(2).toLowerCase();
}
function u(e, n) {
    e.appendChild(n);
}
function k(e, n, t) {
    g(t) ? u(e, n) : e.insertBefore(n, t);
}
function $(e, n) {
    return n ? document.createElementNS('http://www.w3.org/2000/svg', e) : document.createElement(e);
}
function c(e, n, t) {
    e.replaceChild(n, t);
}
function C(e, n) {
    e.removeChild(n);
}
function w(e) {
    for (var n; void 0 !== (n = e.shift());)
        n();
}
function U(e, n) {
    for (var t, r; e;) {
        if (2033 & (t = e.flags))
            return e.dom;
        r = e.children, e = 8192 & t ? 2 === e.childFlags ? r : r[n ? 0 : r.length - 1] : 4 & t ? r.$LI : r;
    }
    return null;
}
function F(e, n) {
    var t = e.flags;
    if (2033 & t)
        C(n, e.dom);
    else {
        var r = e.children;
        if (4 & t)
            F(r.$LI, n);
        else if (8 & t)
            F(r, n);
        else if (8192 & t)
            if (2 === e.childFlags)
                F(r, n);
            else
                for (var o = 0, l = r.length; o < l; ++o)
                    F(r[o], n);
    }
}
function V(e, n, t) {
    var r = e.flags;
    if (2033 & r)
        k(n, e.dom, t);
    else {
        var o = e.children;
        if (4 & r)
            V(o.$LI, n, t);
        else if (8 & r)
            V(o, n, t);
        else if (8192 & r)
            if (2 === e.childFlags)
                V(o, n, t);
            else
                for (var l = 0, a = o.length; l < a; ++l)
                    V(o[l], n, t);
    }
}
function P(e, n, t) {
    return e.constructor.getDerivedStateFromProps ? y(t, e.constructor.getDerivedStateFromProps(n, t)) : t;
}
var N = { v: !1 }, S = {
        componentComparator: null,
        createVNode: null,
        renderComplete: null
    };
function M(e, n) {
    e.textContent = n;
}
function L(e, n) {
    return e && n && a(e) && a(n) && e.event === n.event && e.data === n.data;
}
var I = '$';
function B(e, n, t, r, o, l, a, i) {
    this.childFlags = e, this.children = n, this.className = t, this.dom = null, this.flags = r, this.key = void 0 === o ? null : o, this.props = void 0 === l ? null : l, this.ref = void 0 === a ? null : a, this.type = i;
}
function o(e, n, t, r, o, l, a, i) {
    var s = void 0 === o ? 1 : o, u = new B(s, r, t, e, a, l, i, n), c = S.createVNode;
    return h(c) && c(u), 0 === s && O(u, u.children), u;
}
function e(e, n, t, r, o) {
    0 != (2 & e) && (n.prototype && n.prototype.render ? e = 4 : n.render ? (e = 32776, n = n.render) : e = 8);
    var l = n.defaultProps;
    if (!b(l))
        for (var a in (t = t || {}, l))
            m(t[a]) && (t[a] = l[a]);
    if (0 < (8 & e) && 0 == (32768 & e)) {
        var i = n.defaultHooks;
        if (!b(i))
            if (o)
                for (var s in i)
                    m(o[s]) && (o[s] = i[s]);
            else
                o = i;
    }
    var u = new B(1, null, null, e, r, t, o, n), c = S.createVNode;
    return h(c) && c(u), u;
}
function _(e, n) {
    return new B(1, b(e) ? '' : e, null, 16, n, null, null, null);
}
function D(e, n, t) {
    var r = o(8192, 8192, null, e, n, null, t, null);
    switch (r.childFlags) {
    case 1:
        r.children = E(), r.childFlags = 2;
        break;
    case 16:
        r.children = [_(e)], r.childFlags = 4;
    }
    return r;
}
function r(e) {
    var n = e.props;
    if (n) {
        var t = e.flags;
        481 & t && (void 0 !== n.children && b(e.children) && O(e, n.children), void 0 !== n.className && (e.className = n.className || null, n.className = void 0)), void 0 !== n.key && (e.key = n.key, n.key = void 0), void 0 !== n.ref && (e.ref = 8 & t ? y(e.ref, n.ref) : n.ref, n.ref = void 0);
    }
    return e;
}
function l(e) {
    var n, t = e.children, r = e.childFlags;
    if (2 === r)
        n = A(t);
    else if (12 & r) {
        n = [];
        for (var o = 0, l = t.length; o < l; ++o)
            n.push(A(t[o]));
    }
    return D(n, r, e.key);
}
function A(e) {
    var n = -16385 & e.flags, t = e.props;
    if (14 & n && !g(t)) {
        var r = t;
        for (var o in (t = {}, r))
            t[o] = r[o];
    }
    return 0 == (8192 & n) ? new B(e.childFlags, e.children, e.className, n, e.key, t, e.ref, e.type) : l(e);
}
function E() {
    return _('', null);
}
function T(e, n) {
    return o(1024, 1024, null, e, 0, null, p(e) ? null : e.key, n);
}
function W(e, n, t, r) {
    for (var o = e.length; t < o; t++) {
        var l = e[t];
        if (!p(l)) {
            var a = r + I + t;
            if (f(l))
                W(l, n, 0, a);
            else {
                if (d(l))
                    l = _(l, a);
                else {
                    var i = l.key, s = v(i) && i[0] === I;
                    (81920 & l.flags || s) && (l = A(l)), l.flags |= 65536, s ? i.substring(0, r.length) !== r && (l.key = r + i) : g(i) ? l.key = a : l.key = r + i;
                }
                n.push(l);
            }
        }
    }
}
function R(e) {
    switch (e) {
    case 'svg':
        return 32;
    case 'input':
        return 64;
    case 'select':
        return 256;
    case 'textarea':
        return 128;
    case t:
        return 8192;
    default:
        return 1;
    }
}
function O(e, n) {
    var t, r = 1;
    if (p(n))
        t = n;
    else if (d(n))
        r = 16, t = n;
    else if (f(n)) {
        for (var o = n.length, l = 0; l < o; ++l) {
            var a = n[l];
            if (p(a) || f(a)) {
                t = t || n.slice(0, l), W(n, t, l, '');
                break;
            }
            if (d(a))
                (t = t || n.slice(0, l)).push(_(a, I + l));
            else {
                var i = a.key, s = 0 < (81920 & a.flags), u = g(i), c = v(i) && i[0] === I;
                s || u || c ? (t = t || n.slice(0, l), (s || c) && (a = A(a)), (u || c) && (a.key = I + l), t.push(a)) : t && t.push(a), a.flags |= 65536;
            }
        }
        r = 0 === (t = t || n).length ? 1 : 8;
    } else
        (t = n).flags |= 65536, 81920 & n.flags && (t = A(n)), r = 2;
    return e.children = t, e.childFlags = r, e;
}
function j(e, n) {
    return h(n) ? {
        data: e,
        event: n
    } : null;
}
var H = 'http://www.w3.org/1999/xlink', Q = 'http://www.w3.org/XML/1998/namespace', X = {
        'xlink:actuate': H,
        'xlink:arcrole': H,
        'xlink:href': H,
        'xlink:role': H,
        'xlink:show': H,
        'xlink:title': H,
        'xlink:type': H,
        'xml:base': Q,
        'xml:lang': Q,
        'xml:space': Q
    };
function G(e) {
    return {
        onClick: e,
        onDblClick: e,
        onFocusIn: e,
        onFocusOut: e,
        onKeyDown: e,
        onKeyPress: e,
        onKeyUp: e,
        onMouseDown: e,
        onMouseMove: e,
        onMouseUp: e,
        onSubmit: e,
        onTouchEnd: e,
        onTouchMove: e,
        onTouchStart: e
    };
}
var K = G(0), q = G(null), z = G(!0);
function J(e, n, t) {
    var r = t.$EV;
    n ? (0 === K[e] && (q[e] = te(e)), (r = r || (t.$EV = G(null)))[e] || ++K[e], r[e] = n) : r && r[e] && (0 == --K[e] && (document.removeEventListener(s(e), q[e]), q[e] = null), r[e] = null);
}
function Y(e, n, t, r, o) {
    for (var l = n; !g(l);) {
        if (t && l.disabled)
            return;
        var a = l.$EV;
        if (a) {
            var i = a[r];
            if (i && (o.dom = l, i.event ? i.event(i.data, e) : i(e), e.cancelBubble))
                return;
        }
        l = l.parentNode;
    }
}
function Z() {
    this.cancelBubble = !0, this.immediatePropagationStopped || this.stopImmediatePropagation();
}
function ee() {
    return this.defaultPrevented;
}
function ne() {
    return this.cancelBubble;
}
function te(r) {
    function e(e) {
        var n = 'onClick' === r || 'onDblClick' === r;
        if (n && 0 !== e.button)
            e.stopPropagation();
        else {
            e.isDefaultPrevented = ee, e.isPropagationStopped = ne, e.stopPropagation = Z;
            var t = { dom: document };
            Object.defineProperty(e, 'currentTarget', {
                configurable: !0,
                get: function () {
                    return t.dom;
                }
            }), Y(e, e.target, n, r, t);
        }
    }
    return document.addEventListener(s(r), e), e;
}
function re(e, n) {
    var t = document.createElement('i');
    return t.innerHTML = n, t.innerHTML === e.innerHTML;
}
function oe(e, n, t) {
    if (e[n]) {
        var r = e[n];
        r.event ? r.event(r.data, t) : r(t);
    } else {
        var o = n.toLowerCase();
        e[o] && e[o](t);
    }
}
function le(i, s) {
    function e(e) {
        var n = this.$V;
        if (n) {
            var t = n.props || x, r = n.dom;
            if (v(i))
                oe(t, i, e);
            else
                for (var o = 0; o < i.length; ++o)
                    oe(t, i[o], e);
            if (h(s)) {
                var l = this.$V, a = l.props || x;
                s(a, r, !1, l);
            }
        }
    }
    return Object.defineProperty(e, 'wrapped', {
        configurable: !1,
        enumerable: !1,
        value: !0,
        writable: !1
    }), e;
}
function ae(e, n, t) {
    var r = '$' + n, o = e[r];
    o && o[1].wrapped || (o && (e.removeEventListener.apply(e, o), e[r] = null), h(t) && (e.addEventListener(n, t), e[r] = [
        n,
        t
    ]));
}
function ie(e) {
    return 'checkbox' === e || 'radio' === e;
}
var se = le('onInput', de), ue = le([
        'onClick',
        'onChange'
    ], de);
function ce(e) {
    e.stopPropagation();
}
function fe(e, n) {
    ie(n.type) ? (ae(e, 'change', ue), ae(e, 'click', ce)) : ae(e, 'input', se);
}
function de(e, n) {
    var t = e.type, r = e.value, o = e.checked, l = e.multiple, a = e.defaultValue, i = !b(r);
    t && t !== n.type && n.setAttribute('type', t), b(l) || l === n.multiple || (n.multiple = l), b(a) || i || (n.defaultValue = a + ''), ie(t) ? (i && (n.value = r), b(o) || (n.checked = o)) : i && n.value !== r ? (n.defaultValue = r, n.value = r) : b(o) || (n.checked = o);
}
function pe(e, n) {
    if ('option' === e.type)
        ve(e, n);
    else {
        var t = e.children, r = e.flags;
        if (4 & r)
            pe(t.$LI, n);
        else if (8 & r)
            pe(t, n);
        else if (2 === e.childFlags)
            pe(t, n);
        else if (12 & e.childFlags)
            for (var o = 0, l = t.length; o < l; ++o)
                pe(t[o], n);
    }
}
function ve(e, n) {
    var t = e.props || x, r = e.dom;
    r.value = t.value, t.value === n || f(n) && -1 !== n.indexOf(t.value) ? r.selected = !0 : b(n) && b(t.selected) || (r.selected = t.selected || !1);
}
ce.wrapped = !0;
var he = le('onChange', me);
function ge(e) {
    ae(e, 'change', he);
}
function me(e, n, t, r) {
    var o = Boolean(e.multiple);
    b(e.multiple) || o === n.multiple || (n.multiple = o);
    var l = e.selectedIndex;
    if (-1 === l && (n.selectedIndex = -1), 1 !== r.childFlags) {
        var a = e.value;
        i(l) && -1 < l && n.options[l] && (a = n.options[l].value), t && b(a) && (a = e.defaultValue), pe(r, a);
    }
}
var ye, ke, $e = le('onInput', Ce), be = le('onChange');
function xe(e, n) {
    ae(e, 'input', $e), n.onChange && ae(e, 'change', be);
}
function Ce(e, n, t) {
    var r = e.value, o = n.value;
    if (b(r)) {
        if (t) {
            var l = e.defaultValue;
            b(l) || l === o || (n.defaultValue = l, n.value = l);
        }
    } else
        o !== r && (n.defaultValue = r, n.value = r);
}
function we(e, n, t, r, o, l) {
    64 & e ? de(r, t) : 256 & e ? me(r, t, o, n) : 128 & e && Ce(r, t, o), l && (t.$V = n);
}
function Fe(e, n, t) {
    64 & e ? fe(n, t) : 256 & e ? ge(n) : 128 & e && xe(n, t);
}
function Pe(e) {
    return e.type && ie(e.type) ? !b(e.checked) : !b(e.value);
}
function Ne() {
    return { current: null };
}
function Se(e) {
    return { render: e };
}
function Ue(e) {
    e && (h(e) ? e(null) : e.current && (e.current = null));
}
function Ve(e, n, t) {
    e && (h(e) || void 0 !== e.current) && t.push(function () {
        h(e) ? e(n) : void 0 !== e.current && (e.current = n);
    });
}
function Me(e, n) {
    Le(e), n && F(e, n);
}
function Le(e) {
    var n, t = e.flags, r = e.children;
    if (481 & t) {
        n = e.ref;
        var o = e.props;
        Ue(n);
        var l = e.childFlags;
        if (!g(o))
            for (var a = Object.keys(o), i = 0, s = a.length; i < s; i++) {
                var u = a[i];
                z[u] && J(u, null, e.dom);
            }
        12 & l ? Ie(r) : 2 === l && Le(r);
    } else
        r && (4 & t ? (h(r.componentWillUnmount) && r.componentWillUnmount(), Ue(e.ref), r.$UN = !0, Le(r.$LI)) : 8 & t ? (!b(n = e.ref) && h(n.onComponentWillUnmount) && n.onComponentWillUnmount(U(e, !0), e.props || x), Le(r)) : 1024 & t ? Me(r, e.ref) : 8192 & t && 12 & e.childFlags && Ie(r));
}
function Ie(e) {
    for (var n = 0, t = e.length; n < t; ++n)
        Le(e[n]);
}
function Be(e) {
    e.textContent = '';
}
function _e(e, n, t) {
    Ie(t), 8192 & n.flags ? F(n, e) : Be(e);
}
function De(n, t) {
    return function (e) {
        n(t.data, e);
    };
}
function Ae(e, n, t, r) {
    var o = s(e);
    if (a(t) && !g(t)) {
        var l = t.event;
        L(n, t) || ae(r, o, De(l, t));
    } else
        ae(r, o, t);
}
function Ee(e, n, t) {
    if (b(n))
        t.removeAttribute('style');
    else {
        var r, o, l = t.style;
        if (v(n))
            l.cssText = n;
        else if (b(e) || v(e))
            for (r in n)
                o = n[r], l.setProperty(r, o);
        else {
            for (r in n)
                (o = n[r]) !== e[r] && l.setProperty(r, o);
            for (r in e)
                b(n[r]) && l.removeProperty(r);
        }
    }
}
function Te(e, n, t, r, o, l, a) {
    switch (e) {
    case 'children':
    case 'childrenType':
    case 'className':
    case 'defaultValue':
    case 'key':
    case 'multiple':
    case 'ref':
    case 'selectedIndex':
        break;
    case 'autoFocus':
        r.autofocus = !!t;
        break;
    case 'allowfullscreen':
    case 'autoplay':
    case 'capture':
    case 'checked':
    case 'controls':
    case 'default':
    case 'disabled':
    case 'hidden':
    case 'indeterminate':
    case 'loop':
    case 'muted':
    case 'novalidate':
    case 'open':
    case 'readOnly':
    case 'required':
    case 'reversed':
    case 'scoped':
    case 'seamless':
    case 'selected':
        r[e] = !!t;
        break;
    case 'defaultChecked':
    case 'value':
    case 'volume':
        if (l && 'value' === e)
            break;
        var i = b(t) ? '' : t;
        r[e] !== i && (r[e] = i);
        break;
    case 'style':
        Ee(n, t, r);
        break;
    case 'dangerouslySetInnerHTML':
        var s = n && n.__html || '', u = t && t.__html || '';
        s !== u && (b(u) || re(r, u) || (g(a) || (12 & a.childFlags ? Ie(a.children) : 2 === a.childFlags && Le(a.children), a.children = null, a.childFlags = 1), r.innerHTML = u));
        break;
    default:
        z[e] ? L(n, t) || J(e, t, r) : 111 === e.charCodeAt(0) && 110 === e.charCodeAt(1) ? Ae(e, n, t, r) : b(t) ? r.removeAttribute(e) : o && X[e] ? r.setAttributeNS(X[e], e, t) : r.setAttribute(e, t);
    }
}
function We(e, n, t, r, o) {
    var l = !1, a = 0 < (448 & n);
    for (var i in (a && (l = Pe(t)) && Fe(n, r, t), t))
        Te(i, null, t[i], r, o, l, null);
    a && we(n, e, r, t, !0, l);
}
function Re(e, n, t) {
    var r = je(e.render(n, e.state, t)), o = t;
    return h(e.getChildContext) && (o = y(t, e.getChildContext())), e.$CX = o, r;
}
function Oe(e, n, t, r, o, l) {
    var a = new n(t, r), i = a.$N = Boolean(n.getDerivedStateFromProps || a.getSnapshotBeforeUpdate);
    if (a.$SVG = o, a.$L = l, (e.children = a).$BS = !1, a.context = r, a.props === x && (a.props = t), i)
        a.state = P(a, t, a.state);
    else if (h(a.componentWillMount)) {
        a.$BR = !0, a.componentWillMount();
        var s = a.$PS;
        if (!g(s)) {
            var u = a.state;
            if (g(u))
                a.state = s;
            else
                for (var c in s)
                    u[c] = s[c];
            a.$PS = null;
        }
        a.$BR = !1;
    }
    return a.$LI = Re(a, t, r), a;
}
function je(e) {
    return p(e) ? e = E() : d(e) ? e = _(e, null) : f(e) ? e = D(e, 0, null) : 16384 & e.flags && (e = A(e)), e;
}
function He(e, n, t, r, o, l) {
    var a = e.flags |= 16384;
    481 & a ? Ke(e, n, t, r, o, l) : 4 & a ? ze(e, n, t, r, o, l) : 8 & a ? Je(e, n, t, r, o, l) : 512 & a || 16 & a ? Ge(e, n, o) : 8192 & a ? Xe(e, n, t, r, o, l) : 1024 & a && Qe(e, t, n, o, l);
}
function Qe(e, n, t, r, o) {
    He(e.children, e.ref, n, !1, null, o);
    var l = E();
    Ge(l, t, r), e.dom = l.dom;
}
function Xe(e, n, t, r, o, l) {
    var a = e.children, i = e.childFlags;
    12 & i && 0 === a.length && (i = e.childFlags = 2, a = e.children = E()), 2 === i ? He(a, n, o, r, o, l) : qe(a, n, t, r, o, l);
}
function Ge(e, n, t) {
    var r = e.dom = document.createTextNode(e.children);
    g(n) || k(n, r, t);
}
function Ke(e, n, t, r, o, l) {
    var a = e.flags, i = e.props, s = e.className, u = e.ref, c = e.children, f = e.childFlags;
    r = r || 0 < (32 & a);
    var d = $(e.type, r);
    if (e.dom = d, b(s) || '' === s || (r ? d.setAttribute('class', s) : d.className = s), 16 === f)
        M(d, c);
    else if (1 !== f) {
        var p = r && 'foreignObject' !== e.type;
        2 === f ? (16384 & c.flags && (e.children = c = A(c)), He(c, d, t, p, null, l)) : 8 !== f && 4 !== f || qe(c, d, t, p, null, l);
    }
    g(n) || k(n, d, o), g(i) || We(e, a, i, d, r), Ve(u, d, l);
}
function qe(e, n, t, r, o, l) {
    for (var a = 0, i = e.length; a < i; ++a) {
        var s = e[a];
        16384 & s.flags && (e[a] = s = A(s)), He(s, n, t, r, o, l);
    }
}
function ze(e, n, t, r, o, l) {
    var a = Oe(e, e.type, e.props || x, t, r, l);
    He(a.$LI, n, a.$CX, r, o, l), Ze(e.ref, a, l);
}
function Je(e, n, t, r, o, l) {
    var a = e.type, i = e.props || x, s = e.ref, u = je(32768 & e.flags ? a(i, s, t) : a(i, t));
    He(e.children = u, n, t, r, o, l), nn(i, s, e, l);
}
function Ye(e) {
    return function () {
        e.componentDidMount();
    };
}
function Ze(e, n, t) {
    Ve(e, n, t), h(n.componentDidMount) && t.push(Ye(n));
}
function en(e, n, t) {
    return function () {
        e.onComponentDidMount(U(n, !0), t);
    };
}
function nn(e, n, t, r) {
    b(n) || (h(n.onComponentWillMount) && n.onComponentWillMount(e), h(n.onComponentDidMount) && r.push(en(n, t, e)));
}
function tn(e, n, t, r, o, l) {
    Le(e), 0 != (n.flags & e.flags & 2033) ? (He(n, null, r, o, null, l), c(t, n.dom, e.dom)) : (He(n, t, r, o, U(e, !0), l), F(e, t));
}
function rn(e, n, t, r, o, l, a) {
    var i = n.flags |= 16384;
    e.flags !== i || e.type !== n.type || e.key !== n.key || 0 != (2048 & i) ? 16384 & e.flags ? tn(e, n, t, r, o, a) : He(n, t, r, o, l, a) : 481 & i ? un(e, n, r, o, i, a) : 4 & i ? vn(e, n, t, r, o, l, a) : 8 & i ? hn(e, n, t, r, o, l, a) : 16 & i ? gn(e, n) : 512 & i ? n.dom = e.dom : 8192 & i ? an(e, n, t, r, o, a) : sn(e, n, r, a);
}
function on(e, n, t) {
    e !== n && ('' !== e ? t.firstChild.nodeValue = n : M(t, n));
}
function ln(e, n) {
    e.textContent !== n && (e.textContent = n);
}
function an(e, n, t, r, o, l) {
    var a = e.children, i = n.children, s = e.childFlags, u = n.childFlags, c = null;
    12 & u && 0 === i.length && (u = n.childFlags = 2, i = n.children = E());
    var f = 0 != (2 & u);
    if (12 & s) {
        var d = a.length;
        (8 & s && 8 & u || f || !f && i.length > d) && (c = U(a[d - 1], !1).nextSibling);
    }
    fn(s, u, a, i, t, r, o, c, e, l);
}
function sn(e, n, t, r) {
    var o = e.ref, l = n.ref, a = n.children;
    if (fn(e.childFlags, n.childFlags, e.children, a, o, t, !1, null, e, r), n.dom = e.dom, o !== l && !p(a)) {
        var i = a.dom;
        C(o, i), u(l, i);
    }
}
function un(e, n, t, r, o, l) {
    var a, i = e.dom, s = e.props, u = n.props, c = !1, f = !1;
    if (n.dom = i, r = r || 0 < (32 & o), s !== u) {
        var d = s || x;
        if ((a = u || x) !== x)
            for (var p in ((c = 0 < (448 & o)) && (f = Pe(a)), a)) {
                var v = d[p], h = a[p];
                v !== h && Te(p, v, h, i, r, f, e);
            }
        if (d !== x)
            for (var g in d)
                b(a[g]) && !b(d[g]) && Te(g, d[g], null, i, r, f, e);
    }
    var m = n.children, y = n.className;
    e.className !== y && (b(y) ? i.removeAttribute('class') : r ? i.setAttribute('class', y) : i.className = y), 4096 & o ? ln(i, m) : fn(e.childFlags, n.childFlags, e.children, m, i, t, r && 'foreignObject' !== n.type, null, e, l), c && we(o, n, i, a, !1, f);
    var k = n.ref, $ = e.ref;
    $ !== k && (Ue($), Ve(k, i, l));
}
function cn(e, n, t, r, o, l) {
    Le(e), qe(n, t, r, o, U(e, !0), l), F(e, t);
}
function fn(e, n, t, r, o, l, a, i, s, u) {
    switch (e) {
    case 2:
        switch (n) {
        case 2:
            rn(t, r, o, l, a, i, u);
            break;
        case 1:
            Me(t, o);
            break;
        case 16:
            Le(t), M(o, r);
            break;
        default:
            cn(t, r, o, l, a, u);
        }
        break;
    case 1:
        switch (n) {
        case 2:
            He(r, o, l, a, i, u);
            break;
        case 1:
            break;
        case 16:
            M(o, r);
            break;
        default:
            qe(r, o, l, a, i, u);
        }
        break;
    case 16:
        switch (n) {
        case 16:
            on(t, r, o);
            break;
        case 2:
            Be(o), He(r, o, l, a, i, u);
            break;
        case 1:
            Be(o);
            break;
        default:
            Be(o), qe(r, o, l, a, i, u);
        }
        break;
    default:
        switch (n) {
        case 16:
            Ie(t), M(o, r);
            break;
        case 2:
            _e(o, s, t), He(r, o, l, a, i, u);
            break;
        case 1:
            _e(o, s, t);
            break;
        default:
            var c = 0 | t.length, f = 0 | r.length;
            0 == c ? 0 < f && qe(r, o, l, a, i, u) : 0 == f ? _e(o, s, t) : 8 === n && 8 === e ? yn(t, r, o, l, a, c, f, i, s, u) : mn(t, r, o, l, a, c, f, i, u);
        }
    }
}
function dn(e, n, t, r, o) {
    o.push(function () {
        e.componentDidUpdate(n, t, r);
    });
}
function pn(e, n, t, r, o, l, a, i, s) {
    var u = e.state, c = e.props, f = Boolean(e.$N), d = h(e.shouldComponentUpdate);
    if (f && (n = P(e, t, n !== u ? y(u, n) : n)), a || !d || d && e.shouldComponentUpdate(t, n, o)) {
        !f && h(e.componentWillUpdate) && e.componentWillUpdate(t, n, o), e.props = t, e.state = n, e.context = o;
        var p = null, v = Re(e, t, o);
        f && h(e.getSnapshotBeforeUpdate) && (p = e.getSnapshotBeforeUpdate(c, u)), rn(e.$LI, v, r, e.$CX, l, i, s), e.$LI = v, h(e.componentDidUpdate) && dn(e, c, u, p, s);
    } else
        e.props = t, e.state = n, e.context = o;
}
function vn(e, n, t, r, o, l, a) {
    var i = n.children = e.children;
    if (!g(i)) {
        i.$L = a;
        var s = n.props || x, u = n.ref, c = e.ref, f = i.state;
        if (!i.$N) {
            if (h(i.componentWillReceiveProps)) {
                if (i.$BR = !0, i.componentWillReceiveProps(s, r), i.$UN)
                    return;
                i.$BR = !1;
            }
            g(i.$PS) || (f = y(f, i.$PS), i.$PS = null);
        }
        pn(i, f, s, t, r, o, !1, l, a), c !== u && (Ue(c), Ve(u, i, a));
    }
}
function hn(e, n, t, r, o, l, a) {
    var i = !0, s = n.props || x, u = n.ref, c = e.props, f = !b(u), d = e.children;
    if (f && h(u.onComponentShouldUpdate) && (i = u.onComponentShouldUpdate(c, s)), !1 !== i) {
        f && h(u.onComponentWillUpdate) && u.onComponentWillUpdate(c, s);
        var p = n.type, v = je(32768 & n.flags ? p(s, u, r) : p(s, r));
        rn(d, v, t, r, o, l, a), n.children = v, f && h(u.onComponentDidUpdate) && u.onComponentDidUpdate(c, s);
    } else
        n.children = d;
}
function gn(e, n) {
    var t = n.children, r = e.dom;
    t !== e.children && (r.nodeValue = t), n.dom = r;
}
function mn(e, n, t, r, o, l, a, i, s) {
    for (var u, c, f = a < l ? a : l, d = 0; d < f; ++d)
        u = n[d], c = e[d], 16384 & u.flags && (u = n[d] = A(u)), rn(c, u, t, r, o, i, s), e[d] = u;
    if (l < a)
        for (d = f; d < a; ++d)
            16384 & (u = n[d]).flags && (u = n[d] = A(u)), He(u, t, r, o, i, s);
    else if (a < l)
        for (d = f; d < l; ++d)
            Me(e[d], t);
}
function yn(e, n, t, r, o, l, a, i, s, u) {
    var c, f, d = l - 1, p = a - 1, v = 0, h = 0, g = e[h], m = n[h];
    e: {
        for (; g.key === m.key;) {
            if (16384 & m.flags && (n[h] = m = A(m)), rn(g, m, t, r, o, i, u), e[h] = m, d < ++h || p < h)
                break e;
            g = e[h], m = n[h];
        }
        for (g = e[d], m = n[p]; g.key === m.key;) {
            if (16384 & m.flags && (n[p] = m = A(m)), rn(g, m, t, r, o, i, u), e[d] = m, p--, --d < h || p < h)
                break e;
            g = e[d], m = n[p];
        }
    }
    if (d < h) {
        if (h <= p)
            for (f = (c = p + 1) < a ? U(n[c], !0) : i; h <= p;)
                16384 & (m = n[h]).flags && (n[h] = m = A(m)), ++h, He(m, t, r, o, f, u);
    } else if (p < h)
        for (; h <= d;)
            Me(e[h++], t);
    else {
        var y = h, k = h, $ = d - h + 1, b = p - h + 1, x = new Int32Array(b - v + 1);
        v = 2 + b;
        var C = $ === l, w = !1, F = 0, P = 0;
        if (a < 4 || ($ | b) < 32)
            for (v = y; v <= d; ++v)
                if (g = e[v], P < b) {
                    for (h = k; h <= p; h++)
                        if (m = n[h], g.key === m.key) {
                            if (x[h - k] = v + 1, C)
                                for (C = !1; y < v;)
                                    Me(e[y++], t);
                            h < F ? w = !0 : F = h, 16384 & m.flags && (n[h] = m = A(m)), rn(g, m, t, r, o, i, u), ++P;
                            break;
                        }
                    !C && p < h && Me(g, t);
                } else
                    C || Me(g, t);
        else {
            var N = {};
            for (v = k; v <= p; ++v)
                N[n[v].key] = v;
            for (v = y; v <= d; ++v)
                if (g = e[v], P < b)
                    if (void 0 !== (h = N[g.key])) {
                        if (C)
                            for (C = !1; y < v;)
                                Me(e[y++], t);
                        m = n[h], x[h - k] = v + 1, h < F ? w = !0 : F = h, 16384 & m.flags && (n[h] = m = A(m)), rn(g, m, t, r, o, i, u), ++P;
                    } else
                        C || Me(g, t);
                else
                    C || Me(g, t);
        }
        if (C)
            _e(t, s, e), qe(n, t, r, o, i, u);
        else if (w) {
            var S = $n(x);
            for (h = S.length - 1, v = b - 1; 0 <= v; v--)
                0 === x[v] ? (16384 & (m = n[F = v + k]).flags && (n[F] = m = A(m)), He(m, t, r, o, (c = F + 1) < a ? U(n[c], !0) : i, u)) : h < 0 || v !== S[h] ? V(m = n[F = v + k], t, (c = F + 1) < a ? U(n[c], !0) : i) : h--;
        } else if (P !== b)
            for (v = b - 1; 0 <= v; v--)
                0 === x[v] && (16384 & (m = n[F = v + k]).flags && (n[F] = m = A(m)), He(m, t, r, o, (c = F + 1) < a ? U(n[c], !0) : i, u));
    }
}
var kn = 0;
function $n(e) {
    var n = 0, t = 0, r = 0, o = 0, l = 0, a = 0, i = 0, s = e.length;
    for (kn < s && (ye = new Int32Array(kn = s), ke = new Int32Array(s)); t < s; ++t)
        if (0 !== (n = e[t])) {
            if (e[r = ye[o]] < n) {
                ke[t] = r, ye[++o] = t;
                continue;
            }
            for (l = 0, a = o; l < a;)
                e[ye[i = l + a >> 1]] < n ? l = i + 1 : a = i;
            n < e[ye[l]] && (0 < l && (ke[t] = ye[l - 1]), ye[l] = t);
        }
    l = t = o + 1;
    var u = new Int32Array(l);
    for (a = ye[l - 1]; 0 < l--;)
        u[l] = a, a = ke[a];
    for (; 0 < t--;)
        ye[t] = 0;
    return u;
}
var bn = 'undefined' != typeof document, xn = null;
function Cn(e, n, t, r) {
    var o = [], l = n.$V;
    N.v = !0, b(l) ? b(e) || (16384 & e.flags && (e = A(e)), He(e, n, r, !1, null, o), l = n.$V = e) : b(e) ? (Me(l, n), n.$V = null) : (16384 & e.flags && (e = A(e)), rn(l, e, n, r, !1, null, o), l = n.$V = e), 0 < o.length && w(o), N.v = !1, h(t) && t(), h(S.renderComplete) && S.renderComplete(l, n);
}
function wn(e, n, t, r) {
    void 0 === t && (t = null), void 0 === r && (r = x), Cn(e, n, t, r);
}
function Fn(o) {
    return function (e, n, t, r) {
        wn(n, o = o || e, t, r);
    };
}
bn && (xn = document.body, Node.prototype.$EV = null, Node.prototype.$V = null);
var Pn = [], Nn = 'undefined' != typeof Promise ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout.bind(window), Sn = !1;
function Un(e, n, t, r) {
    var o = e.$PS;
    if (h(n) && (n = n(o ? y(e.state, o) : e.state, e.props, e.context)), b(o))
        e.$PS = n;
    else
        for (var l in n)
            o[l] = n[l];
    if (e.$BR)
        h(t) && e.$L.push(t.bind(e));
    else {
        if (!N.v && 0 === Pn.length)
            return void Ln(e, r, t);
        if (-1 === Pn.indexOf(e) && Pn.push(e), Sn || (Sn = !0, Nn(Mn)), h(t)) {
            var a = e.$QU;
            (a = a || (e.$QU = [])).push(t);
        }
    }
}
function Vn(e) {
    for (var n = e.$QU, t = 0, r = n.length; t < r; ++t)
        n[t].call(e);
    e.$QU = null;
}
function Mn() {
    var e;
    for (Sn = !1; e = Pn.pop();)
        Ln(e, !1, e.$QU ? Vn.bind(null, e) : null);
}
function Ln(e, n, t) {
    if (!e.$UN) {
        if (n || !e.$BR) {
            var r = e.$PS;
            e.$PS = null;
            var o = [];
            N.v = !0, pn(e, y(e.state, r), e.props, U(e.$LI, !0).parentNode, e.context, e.$SVG, n, null, o), 0 < o.length && w(o), N.v = !1;
        } else
            e.state = e.$PS, e.$PS = null;
        h(t) && t.call(e);
    }
}
var In = function (e, n) {
    this.state = null, this.$BR = !1, this.$BS = !0, this.$PS = null, this.$LI = null, this.$UN = !1, this.$CX = null, this.$QU = null, this.$N = !1, this.$L = null, this.$SVG = !1, this.props = e || x, this.context = n || x;
};
In.prototype.forceUpdate = function (e) {
    this.$UN || Un(this, {}, e, !0);
}, In.prototype.setState = function (e, n) {
    this.$UN || this.$BS || Un(this, e, n, !1);
}, In.prototype.render = function (e, n, t) {
    return null;
};
var Bn = '7.1.13';
exports.Component = In, exports.EMPTY_OBJ = x, exports.Fragment = t, exports._CI = Oe, exports._HI = je, exports._M = He, exports._MCCC = Ze, exports._ME = Ke, exports._MFCC = nn, exports._MP = We, exports._MR = Ve, exports._MT = Ge, exports.__render = Cn, exports.createComponentVNode = e, exports.createFragment = D, exports.createPortal = T, exports.createRef = Ne, exports.createRenderer = Fn, exports.createTextVNode = _, exports.createVNode = o, exports.directClone = A, exports.findDOMfromVNode = U, exports.forwardRef = Se, exports.getFlagsForElementVnode = R, exports.linkEvent = j, exports.normalizeProps = r, exports.options = S, exports.render = wn, exports.rerender = Mn, exports.version = Bn;
}
// inferno/dist/index.cjs.js
$fsx.f[31] =
function(module,exports){
Object.defineProperty(exports, '__esModule', { value: true });
var ERROR_MSG = 'a runtime error occured! Use Inferno in development environment to find the error.';
var isArray = Array.isArray;
function isStringOrNumber(o) {
    var type = typeof o;
    return type === 'string' || type === 'number';
}
function isNullOrUndef(o) {
    return isUndefined(o) || isNull(o);
}
function isInvalid(o) {
    return isNull(o) || o === false || isTrue(o) || isUndefined(o);
}
function isFunction(o) {
    return typeof o === 'function';
}
function isString(o) {
    return typeof o === 'string';
}
function isNumber(o) {
    return typeof o === 'number';
}
function isNull(o) {
    return o === null;
}
function isTrue(o) {
    return o === true;
}
function isUndefined(o) {
    return o === void 0;
}
function isObject(o) {
    return typeof o === 'object';
}
function throwError(message) {
    if (!message) {
        message = ERROR_MSG;
    }
    throw new Error('Inferno Error: ' + message);
}
function warning(message) {
    console.error(message);
}
function combineFrom(first, second) {
    var out = {};
    if (first) {
        for (var key in first) {
            out[key] = first[key];
        }
    }
    if (second) {
        for (var key$1 in second) {
            out[key$1] = second[key$1];
        }
    }
    return out;
}
var EMPTY_OBJ = {};
var Fragment = '$F';
{
    Object.freeze(EMPTY_OBJ);
}
function normalizeEventName(name) {
    return name.substr(2).toLowerCase();
}
function appendChild(parentDOM, dom) {
    parentDOM.appendChild(dom);
}
function insertOrAppend(parentDOM, newNode, nextNode) {
    if (isNull(nextNode)) {
        appendChild(parentDOM, newNode);
    } else {
        parentDOM.insertBefore(newNode, nextNode);
    }
}
function documentCreateElement(tag, isSVG) {
    if (isSVG) {
        return document.createElementNS('http://www.w3.org/2000/svg', tag);
    }
    return document.createElement(tag);
}
function replaceChild(parentDOM, newDom, lastDom) {
    parentDOM.replaceChild(newDom, lastDom);
}
function removeChild(parentDOM, childNode) {
    parentDOM.removeChild(childNode);
}
function callAll(arrayFn) {
    var listener;
    while ((listener = arrayFn.shift()) !== undefined) {
        listener();
    }
}
function findDOMfromVNode(vNode, start) {
    var flags;
    var children;
    while (vNode) {
        flags = vNode.flags;
        if (flags & 2033) {
            return vNode.dom;
        }
        children = vNode.children;
        if (flags & 8192) {
            vNode = vNode.childFlags === 2 ? children : children[start ? 0 : children.length - 1];
        } else if (flags & 4) {
            vNode = children.$LI;
        } else {
            vNode = children;
        }
    }
    return null;
}
function removeVNodeDOM(vNode, parentDOM) {
    var flags = vNode.flags;
    if (flags & 2033) {
        removeChild(parentDOM, vNode.dom);
    } else {
        var children = vNode.children;
        if (flags & 4) {
            removeVNodeDOM(children.$LI, parentDOM);
        } else if (flags & 8) {
            removeVNodeDOM(children, parentDOM);
        } else if (flags & 8192) {
            if (vNode.childFlags === 2) {
                removeVNodeDOM(children, parentDOM);
            } else {
                for (var i = 0, len = children.length; i < len; ++i) {
                    removeVNodeDOM(children[i], parentDOM);
                }
            }
        }
    }
}
function moveVNodeDOM(vNode, parentDOM, nextNode) {
    var flags = vNode.flags;
    if (flags & 2033) {
        insertOrAppend(parentDOM, vNode.dom, nextNode);
    } else {
        var children = vNode.children;
        if (flags & 4) {
            moveVNodeDOM(children.$LI, parentDOM, nextNode);
        } else if (flags & 8) {
            moveVNodeDOM(children, parentDOM, nextNode);
        } else if (flags & 8192) {
            if (vNode.childFlags === 2) {
                moveVNodeDOM(children, parentDOM, nextNode);
            } else {
                for (var i = 0, len = children.length; i < len; ++i) {
                    moveVNodeDOM(children[i], parentDOM, nextNode);
                }
            }
        }
    }
}
function getComponentName(instance) {
    return instance.name || instance.displayName || instance.constructor.name || (instance.toString().match(/^function\s*([^\s(]+)/) || [])[1];
}
function createDerivedState(instance, nextProps, state) {
    if (instance.constructor.getDerivedStateFromProps) {
        return combineFrom(state, instance.constructor.getDerivedStateFromProps(nextProps, state));
    }
    return state;
}
var renderCheck = { v: false };
var options = {
    componentComparator: null,
    createVNode: null,
    renderComplete: null
};
function setTextContent(dom, children) {
    dom.textContent = children;
}
function isSameLinkEvent(lastValue, nextValue) {
    return lastValue && nextValue && isObject(lastValue) && isObject(nextValue) && lastValue.event === nextValue.event && lastValue.data === nextValue.data;
}
function getTagName(input) {
    var tagName;
    if (isArray(input)) {
        var arrayText = input.length > 3 ? input.slice(0, 3).toString() + ',...' : input.toString();
        tagName = 'Array(' + arrayText + ')';
    } else if (isStringOrNumber(input)) {
        tagName = 'Text(' + input + ')';
    } else if (isInvalid(input)) {
        tagName = 'InvalidVNode(' + input + ')';
    } else {
        var flags = input.flags;
        if (flags & 481) {
            tagName = '<' + input.type + (input.className ? ' class="' + input.className + '"' : '') + '>';
        } else if (flags & 16) {
            tagName = 'Text(' + input.children + ')';
        } else if (flags & 1024) {
            tagName = 'Portal*';
        } else {
            tagName = '<' + getComponentName(input.type) + ' />';
        }
    }
    return '>> ' + tagName + '\n';
}
function DEV_ValidateKeys(vNodeTree, forceKeyed) {
    var foundKeys = {};
    for (var i = 0, len = vNodeTree.length; i < len; ++i) {
        var childNode = vNodeTree[i];
        if (isArray(childNode)) {
            return 'Encountered ARRAY in mount, array must be flattened, or normalize used. Location: \n' + getTagName(childNode);
        }
        if (isInvalid(childNode)) {
            if (forceKeyed) {
                return 'Encountered invalid node when preparing to keyed algorithm. Location: \n' + getTagName(childNode);
            } else if (Object.keys(foundKeys).length !== 0) {
                return 'Encountered invalid node with mixed keys. Location: \n' + getTagName(childNode);
            }
            continue;
        }
        if (typeof childNode === 'object') {
            if (childNode.isValidated) {
                continue;
            }
            childNode.isValidated = true;
        }
        var key = childNode.key;
        if (!isNullOrUndef(key) && !isStringOrNumber(key)) {
            return 'Encountered child vNode where key property is not string or number. Location: \n' + getTagName(childNode);
        }
        var children = childNode.children;
        var childFlags = childNode.childFlags;
        if (!isInvalid(children)) {
            var val = void 0;
            if (childFlags & 12) {
                val = DEV_ValidateKeys(children, (childFlags & 8) !== 0);
            } else if (childFlags === 2) {
                val = DEV_ValidateKeys([children], false);
            }
            if (val) {
                val += getTagName(childNode);
                return val;
            }
        }
        if (forceKeyed && isNullOrUndef(key)) {
            return 'Encountered child without key during keyed algorithm. If this error points to Array make sure children is flat list. Location: \n' + getTagName(childNode);
        } else if (!forceKeyed && isNullOrUndef(key)) {
            if (Object.keys(foundKeys).length !== 0) {
                return 'Encountered children with key missing. Location: \n' + getTagName(childNode);
            }
            continue;
        }
        if (foundKeys[key]) {
            return 'Encountered two children with same key: {' + key + '}. Location: \n' + getTagName(childNode);
        }
        foundKeys[key] = true;
    }
}
function validateVNodeElementChildren(vNode) {
    {
        if (vNode.childFlags === 1) {
            return;
        }
        if (vNode.flags & 64) {
            throwError('input elements can\'t have children.');
        }
        if (vNode.flags & 128) {
            throwError('textarea elements can\'t have children.');
        }
        if (vNode.flags & 481) {
            var voidTypes = {
                area: true,
                base: true,
                br: true,
                col: true,
                command: true,
                embed: true,
                hr: true,
                img: true,
                input: true,
                keygen: true,
                link: true,
                meta: true,
                param: true,
                source: true,
                track: true,
                wbr: true
            };
            var tag = vNode.type.toLowerCase();
            if (tag === 'media') {
                throwError('media elements can\'t have children.');
            }
            if (voidTypes[tag]) {
                throwError(tag + ' elements can\'t have children.');
            }
        }
    }
}
function validateKeys(vNode) {
    {
        if (vNode.isValidated === false && vNode.children && vNode.flags & 481) {
            var error = DEV_ValidateKeys(Array.isArray(vNode.children) ? vNode.children : [vNode.children], (vNode.childFlags & 8) > 0);
            if (error) {
                throwError(error + getTagName(vNode));
            }
        }
        vNode.isValidated = true;
    }
}
function throwIfObjectIsNotVNode(input) {
    if (!isNumber(input.flags)) {
        throwError('normalization received an object that\'s not a valid VNode, you should stringify it first or fix createVNode flags. Object: "' + JSON.stringify(input) + '".');
    }
}
var keyPrefix = '$';
function V(childFlags, children, className, flags, key, props, ref, type) {
    {
        this.isValidated = false;
    }
    this.childFlags = childFlags;
    this.children = children;
    this.className = className;
    this.dom = null;
    this.flags = flags;
    this.key = key === void 0 ? null : key;
    this.props = props === void 0 ? null : props;
    this.ref = ref === void 0 ? null : ref;
    this.type = type;
}
function createVNode(flags, type, className, children, childFlags, props, key, ref) {
    {
        if (flags & 14) {
            throwError('Creating Component vNodes using createVNode is not allowed. Use Inferno.createComponentVNode method.');
        }
    }
    var childFlag = childFlags === void 0 ? 1 : childFlags;
    var vNode = new V(childFlag, children, className, flags, key, props, ref, type);
    var optsVNode = options.createVNode;
    if (isFunction(optsVNode)) {
        optsVNode(vNode);
    }
    if (childFlag === 0) {
        normalizeChildren(vNode, vNode.children);
    }
    {
        validateVNodeElementChildren(vNode);
    }
    return vNode;
}
function createComponentVNode(flags, type, props, key, ref) {
    {
        if (flags & 1) {
            throwError('Creating element vNodes using createComponentVNode is not allowed. Use Inferno.createVNode method.');
        }
    }
    if ((flags & 2) !== 0) {
        if (type.prototype && type.prototype.render) {
            flags = 4;
        } else if (type.render) {
            flags = 32776;
            type = type.render;
        } else {
            flags = 8;
        }
    }
    var defaultProps = type.defaultProps;
    if (!isNullOrUndef(defaultProps)) {
        if (!props) {
            props = {};
        }
        for (var prop in defaultProps) {
            if (isUndefined(props[prop])) {
                props[prop] = defaultProps[prop];
            }
        }
    }
    if ((flags & 8) > 0 && (flags & 32768) === 0) {
        var defaultHooks = type.defaultHooks;
        if (!isNullOrUndef(defaultHooks)) {
            if (!ref) {
                ref = defaultHooks;
            } else {
                for (var prop$1 in defaultHooks) {
                    if (isUndefined(ref[prop$1])) {
                        ref[prop$1] = defaultHooks[prop$1];
                    }
                }
            }
        }
    }
    var vNode = new V(1, null, null, flags, key, props, ref, type);
    var optsVNode = options.createVNode;
    if (isFunction(optsVNode)) {
        optsVNode(vNode);
    }
    return vNode;
}
function createTextVNode(text, key) {
    return new V(1, isNullOrUndef(text) ? '' : text, null, 16, key, null, null, null);
}
function createFragment(children, childFlags, key) {
    var fragment = createVNode(8192, 8192, null, children, childFlags, null, key, null);
    switch (fragment.childFlags) {
    case 1:
        fragment.children = createVoidVNode();
        fragment.childFlags = 2;
        break;
    case 16:
        fragment.children = [createTextVNode(children)];
        fragment.childFlags = 4;
        break;
    default:
        break;
    }
    return fragment;
}
function normalizeProps(vNode) {
    var props = vNode.props;
    if (props) {
        var flags = vNode.flags;
        if (flags & 481) {
            if (props.children !== void 0 && isNullOrUndef(vNode.children)) {
                normalizeChildren(vNode, props.children);
            }
            if (props.className !== void 0) {
                vNode.className = props.className || null;
                props.className = undefined;
            }
        }
        if (props.key !== void 0) {
            vNode.key = props.key;
            props.key = undefined;
        }
        if (props.ref !== void 0) {
            if (flags & 8) {
                vNode.ref = combineFrom(vNode.ref, props.ref);
            } else {
                vNode.ref = props.ref;
            }
            props.ref = undefined;
        }
    }
    return vNode;
}
function cloneFragment(vNodeToClone) {
    var clonedChildren;
    var oldChildren = vNodeToClone.children;
    var childFlags = vNodeToClone.childFlags;
    if (childFlags === 2) {
        clonedChildren = directClone(oldChildren);
    } else if (childFlags & 12) {
        clonedChildren = [];
        for (var i = 0, len = oldChildren.length; i < len; ++i) {
            clonedChildren.push(directClone(oldChildren[i]));
        }
    }
    return createFragment(clonedChildren, childFlags, vNodeToClone.key);
}
function directClone(vNodeToClone) {
    var flags = vNodeToClone.flags & -16385;
    var props = vNodeToClone.props;
    if (flags & 14) {
        if (!isNull(props)) {
            var propsToClone = props;
            props = {};
            for (var key in propsToClone) {
                props[key] = propsToClone[key];
            }
        }
    }
    if ((flags & 8192) === 0) {
        return new V(vNodeToClone.childFlags, vNodeToClone.children, vNodeToClone.className, flags, vNodeToClone.key, props, vNodeToClone.ref, vNodeToClone.type);
    }
    return cloneFragment(vNodeToClone);
}
function createVoidVNode() {
    return createTextVNode('', null);
}
function createPortal(children, container) {
    return createVNode(1024, 1024, null, children, 0, null, isInvalid(children) ? null : children.key, container);
}
function _normalizeVNodes(nodes, result, index, currentKey) {
    for (var len = nodes.length; index < len; index++) {
        var n = nodes[index];
        if (!isInvalid(n)) {
            var newKey = currentKey + keyPrefix + index;
            if (isArray(n)) {
                _normalizeVNodes(n, result, 0, newKey);
            } else {
                if (isStringOrNumber(n)) {
                    n = createTextVNode(n, newKey);
                } else {
                    {
                        throwIfObjectIsNotVNode(n);
                    }
                    var oldKey = n.key;
                    var isPrefixedKey = isString(oldKey) && oldKey[0] === keyPrefix;
                    if (n.flags & 81920 || isPrefixedKey) {
                        n = directClone(n);
                    }
                    n.flags |= 65536;
                    if (!isPrefixedKey) {
                        if (isNull(oldKey)) {
                            n.key = newKey;
                        } else {
                            n.key = currentKey + oldKey;
                        }
                    } else if (oldKey.substring(0, currentKey.length) !== currentKey) {
                        n.key = currentKey + oldKey;
                    }
                }
                result.push(n);
            }
        }
    }
}
function getFlagsForElementVnode(type) {
    switch (type) {
    case 'svg':
        return 32;
    case 'input':
        return 64;
    case 'select':
        return 256;
    case 'textarea':
        return 128;
    case Fragment:
        return 8192;
    default:
        return 1;
    }
}
function normalizeChildren(vNode, children) {
    var newChildren;
    var newChildFlags = 1;
    if (isInvalid(children)) {
        newChildren = children;
    } else if (isStringOrNumber(children)) {
        newChildFlags = 16;
        newChildren = children;
    } else if (isArray(children)) {
        var len = children.length;
        for (var i = 0; i < len; ++i) {
            var n = children[i];
            if (isInvalid(n) || isArray(n)) {
                newChildren = newChildren || children.slice(0, i);
                _normalizeVNodes(children, newChildren, i, '');
                break;
            } else if (isStringOrNumber(n)) {
                newChildren = newChildren || children.slice(0, i);
                newChildren.push(createTextVNode(n, keyPrefix + i));
            } else {
                {
                    throwIfObjectIsNotVNode(n);
                }
                var key = n.key;
                var needsCloning = (n.flags & 81920) > 0;
                var isNullKey = isNull(key);
                var isPrefixed = isString(key) && key[0] === keyPrefix;
                if (needsCloning || isNullKey || isPrefixed) {
                    newChildren = newChildren || children.slice(0, i);
                    if (needsCloning || isPrefixed) {
                        n = directClone(n);
                    }
                    if (isNullKey || isPrefixed) {
                        n.key = keyPrefix + i;
                    }
                    newChildren.push(n);
                } else if (newChildren) {
                    newChildren.push(n);
                }
                n.flags |= 65536;
            }
        }
        newChildren = newChildren || children;
        if (newChildren.length === 0) {
            newChildFlags = 1;
        } else {
            newChildFlags = 8;
        }
    } else {
        newChildren = children;
        newChildren.flags |= 65536;
        if (children.flags & 81920) {
            newChildren = directClone(children);
        }
        newChildFlags = 2;
    }
    vNode.children = newChildren;
    vNode.childFlags = newChildFlags;
    return vNode;
}
function linkEvent(data, event) {
    if (isFunction(event)) {
        return {
            data: data,
            event: event
        };
    }
    return null;
}
var xlinkNS = 'http://www.w3.org/1999/xlink';
var xmlNS = 'http://www.w3.org/XML/1998/namespace';
var namespaces = {
    'xlink:actuate': xlinkNS,
    'xlink:arcrole': xlinkNS,
    'xlink:href': xlinkNS,
    'xlink:role': xlinkNS,
    'xlink:show': xlinkNS,
    'xlink:title': xlinkNS,
    'xlink:type': xlinkNS,
    'xml:base': xmlNS,
    'xml:lang': xmlNS,
    'xml:space': xmlNS
};
function getDelegatedEventObject(v) {
    return {
        onClick: v,
        onDblClick: v,
        onFocusIn: v,
        onFocusOut: v,
        onKeyDown: v,
        onKeyPress: v,
        onKeyUp: v,
        onMouseDown: v,
        onMouseMove: v,
        onMouseUp: v,
        onSubmit: v,
        onTouchEnd: v,
        onTouchMove: v,
        onTouchStart: v
    };
}
var attachedEventCounts = getDelegatedEventObject(0);
var attachedEvents = getDelegatedEventObject(null);
var delegatedEvents = getDelegatedEventObject(true);
function handleEvent(name, nextEvent, dom) {
    var eventsObject = dom.$EV;
    if (nextEvent) {
        if (attachedEventCounts[name] === 0) {
            attachedEvents[name] = attachEventToDocument(name);
        }
        if (!eventsObject) {
            eventsObject = dom.$EV = getDelegatedEventObject(null);
        }
        if (!eventsObject[name]) {
            ++attachedEventCounts[name];
        }
        eventsObject[name] = nextEvent;
    } else if (eventsObject && eventsObject[name]) {
        if (--attachedEventCounts[name] === 0) {
            document.removeEventListener(normalizeEventName(name), attachedEvents[name]);
            attachedEvents[name] = null;
        }
        eventsObject[name] = null;
    }
}
function dispatchEvents(event, target, isClick, name, eventData) {
    var dom = target;
    while (!isNull(dom)) {
        if (isClick && dom.disabled) {
            return;
        }
        var eventsObject = dom.$EV;
        if (eventsObject) {
            var currentEvent = eventsObject[name];
            if (currentEvent) {
                eventData.dom = dom;
                if (currentEvent.event) {
                    currentEvent.event(currentEvent.data, event);
                } else {
                    currentEvent(event);
                }
                if (event.cancelBubble) {
                    return;
                }
            }
        }
        dom = dom.parentNode;
    }
}
function stopPropagation() {
    this.cancelBubble = true;
    if (!this.immediatePropagationStopped) {
        this.stopImmediatePropagation();
    }
}
function isDefaultPrevented() {
    return this.defaultPrevented;
}
function isPropagationStopped() {
    return this.cancelBubble;
}
function attachEventToDocument(name) {
    var docEvent = function (event) {
        var isClick = name === 'onClick' || name === 'onDblClick';
        if (isClick && event.button !== 0) {
            event.stopPropagation();
            return;
        }
        event.isDefaultPrevented = isDefaultPrevented;
        event.isPropagationStopped = isPropagationStopped;
        event.stopPropagation = stopPropagation;
        var eventData = { dom: document };
        Object.defineProperty(event, 'currentTarget', {
            configurable: true,
            get: function get() {
                return eventData.dom;
            }
        });
        dispatchEvents(event, event.target, isClick, name, eventData);
    };
    document.addEventListener(normalizeEventName(name), docEvent);
    return docEvent;
}
function isSameInnerHTML(dom, innerHTML) {
    var tempdom = document.createElement('i');
    tempdom.innerHTML = innerHTML;
    return tempdom.innerHTML === dom.innerHTML;
}
function triggerEventListener(props, methodName, e) {
    if (props[methodName]) {
        var listener = props[methodName];
        if (listener.event) {
            listener.event(listener.data, e);
        } else {
            listener(e);
        }
    } else {
        var nativeListenerName = methodName.toLowerCase();
        if (props[nativeListenerName]) {
            props[nativeListenerName](e);
        }
    }
}
function createWrappedFunction(methodName, applyValue) {
    var fnMethod = function (e) {
        var vNode = this.$V;
        if (!vNode) {
            return;
        }
        var props = vNode.props || EMPTY_OBJ;
        var dom = vNode.dom;
        if (isString(methodName)) {
            triggerEventListener(props, methodName, e);
        } else {
            for (var i = 0; i < methodName.length; ++i) {
                triggerEventListener(props, methodName[i], e);
            }
        }
        if (isFunction(applyValue)) {
            var newVNode = this.$V;
            var newProps = newVNode.props || EMPTY_OBJ;
            applyValue(newProps, dom, false, newVNode);
        }
    };
    Object.defineProperty(fnMethod, 'wrapped', {
        configurable: false,
        enumerable: false,
        value: true,
        writable: false
    });
    return fnMethod;
}
function attachEvent(dom, event, handler) {
    var previousKey = '$' + event;
    var previousArgs = dom[previousKey];
    if (previousArgs && previousArgs[1].wrapped) {
        return;
    }
    if (previousArgs) {
        dom.removeEventListener.apply(dom, previousArgs);
        dom[previousKey] = null;
    }
    if (isFunction(handler)) {
        dom.addEventListener(event, handler);
        dom[previousKey] = [
            event,
            handler
        ];
    }
}
function isCheckedType(type) {
    return type === 'checkbox' || type === 'radio';
}
var onTextInputChange = createWrappedFunction('onInput', applyValueInput);
var wrappedOnChange = createWrappedFunction([
    'onClick',
    'onChange'
], applyValueInput);
function emptywrapper(event) {
    event.stopPropagation();
}
emptywrapper.wrapped = true;
function inputEvents(dom, nextPropsOrEmpty) {
    if (isCheckedType(nextPropsOrEmpty.type)) {
        attachEvent(dom, 'change', wrappedOnChange);
        attachEvent(dom, 'click', emptywrapper);
    } else {
        attachEvent(dom, 'input', onTextInputChange);
    }
}
function applyValueInput(nextPropsOrEmpty, dom) {
    var type = nextPropsOrEmpty.type;
    var value = nextPropsOrEmpty.value;
    var checked = nextPropsOrEmpty.checked;
    var multiple = nextPropsOrEmpty.multiple;
    var defaultValue = nextPropsOrEmpty.defaultValue;
    var hasValue = !isNullOrUndef(value);
    if (type && type !== dom.type) {
        dom.setAttribute('type', type);
    }
    if (!isNullOrUndef(multiple) && multiple !== dom.multiple) {
        dom.multiple = multiple;
    }
    if (!isNullOrUndef(defaultValue) && !hasValue) {
        dom.defaultValue = defaultValue + '';
    }
    if (isCheckedType(type)) {
        if (hasValue) {
            dom.value = value;
        }
        if (!isNullOrUndef(checked)) {
            dom.checked = checked;
        }
    } else {
        if (hasValue && dom.value !== value) {
            dom.defaultValue = value;
            dom.value = value;
        } else if (!isNullOrUndef(checked)) {
            dom.checked = checked;
        }
    }
}
function updateChildOptions(vNode, value) {
    if (vNode.type === 'option') {
        updateChildOption(vNode, value);
    } else {
        var children = vNode.children;
        var flags = vNode.flags;
        if (flags & 4) {
            updateChildOptions(children.$LI, value);
        } else if (flags & 8) {
            updateChildOptions(children, value);
        } else if (vNode.childFlags === 2) {
            updateChildOptions(children, value);
        } else if (vNode.childFlags & 12) {
            for (var i = 0, len = children.length; i < len; ++i) {
                updateChildOptions(children[i], value);
            }
        }
    }
}
function updateChildOption(vNode, value) {
    var props = vNode.props || EMPTY_OBJ;
    var dom = vNode.dom;
    dom.value = props.value;
    if (props.value === value || isArray(value) && value.indexOf(props.value) !== -1) {
        dom.selected = true;
    } else if (!isNullOrUndef(value) || !isNullOrUndef(props.selected)) {
        dom.selected = props.selected || false;
    }
}
var onSelectChange = createWrappedFunction('onChange', applyValueSelect);
function selectEvents(dom) {
    attachEvent(dom, 'change', onSelectChange);
}
function applyValueSelect(nextPropsOrEmpty, dom, mounting, vNode) {
    var multiplePropInBoolean = Boolean(nextPropsOrEmpty.multiple);
    if (!isNullOrUndef(nextPropsOrEmpty.multiple) && multiplePropInBoolean !== dom.multiple) {
        dom.multiple = multiplePropInBoolean;
    }
    var index = nextPropsOrEmpty.selectedIndex;
    if (index === -1) {
        dom.selectedIndex = -1;
    }
    var childFlags = vNode.childFlags;
    if (childFlags !== 1) {
        var value = nextPropsOrEmpty.value;
        if (isNumber(index) && index > -1 && dom.options[index]) {
            value = dom.options[index].value;
        }
        if (mounting && isNullOrUndef(value)) {
            value = nextPropsOrEmpty.defaultValue;
        }
        updateChildOptions(vNode, value);
    }
}
var onTextareaInputChange = createWrappedFunction('onInput', applyValueTextArea);
var wrappedOnChange$1 = createWrappedFunction('onChange');
function textAreaEvents(dom, nextPropsOrEmpty) {
    attachEvent(dom, 'input', onTextareaInputChange);
    if (nextPropsOrEmpty.onChange) {
        attachEvent(dom, 'change', wrappedOnChange$1);
    }
}
function applyValueTextArea(nextPropsOrEmpty, dom, mounting) {
    var value = nextPropsOrEmpty.value;
    var domValue = dom.value;
    if (isNullOrUndef(value)) {
        if (mounting) {
            var defaultValue = nextPropsOrEmpty.defaultValue;
            if (!isNullOrUndef(defaultValue) && defaultValue !== domValue) {
                dom.defaultValue = defaultValue;
                dom.value = defaultValue;
            }
        }
    } else if (domValue !== value) {
        dom.defaultValue = value;
        dom.value = value;
    }
}
function processElement(flags, vNode, dom, nextPropsOrEmpty, mounting, isControlled) {
    if (flags & 64) {
        applyValueInput(nextPropsOrEmpty, dom);
    } else if (flags & 256) {
        applyValueSelect(nextPropsOrEmpty, dom, mounting, vNode);
    } else if (flags & 128) {
        applyValueTextArea(nextPropsOrEmpty, dom, mounting);
    }
    if (isControlled) {
        dom.$V = vNode;
    }
}
function addFormElementEventHandlers(flags, dom, nextPropsOrEmpty) {
    if (flags & 64) {
        inputEvents(dom, nextPropsOrEmpty);
    } else if (flags & 256) {
        selectEvents(dom);
    } else if (flags & 128) {
        textAreaEvents(dom, nextPropsOrEmpty);
    }
}
function isControlledFormElement(nextPropsOrEmpty) {
    return nextPropsOrEmpty.type && isCheckedType(nextPropsOrEmpty.type) ? !isNullOrUndef(nextPropsOrEmpty.checked) : !isNullOrUndef(nextPropsOrEmpty.value);
}
function createRef() {
    return { current: null };
}
function forwardRef(render) {
    {
        if (!isFunction(render)) {
            warning('forwardRef requires a render function but was given ' + (render === null ? 'null' : typeof render) + '.');
            return;
        }
    }
    return { render: render };
}
function unmountRef(ref) {
    if (ref) {
        if (isFunction(ref)) {
            ref(null);
        } else if (ref.current) {
            ref.current = null;
        }
    }
}
function mountRef(ref, value, lifecycle) {
    if (ref && (isFunction(ref) || ref.current !== void 0)) {
        lifecycle.push(function () {
            if (isFunction(ref)) {
                ref(value);
            } else if (ref.current !== void 0) {
                ref.current = value;
            }
        });
    }
}
function remove(vNode, parentDOM) {
    unmount(vNode);
    if (parentDOM) {
        removeVNodeDOM(vNode, parentDOM);
    }
}
function unmount(vNode) {
    var flags = vNode.flags;
    var children = vNode.children;
    var ref;
    if (flags & 481) {
        ref = vNode.ref;
        var props = vNode.props;
        unmountRef(ref);
        var childFlags = vNode.childFlags;
        if (!isNull(props)) {
            var keys = Object.keys(props);
            for (var i = 0, len = keys.length; i < len; i++) {
                var key = keys[i];
                if (delegatedEvents[key]) {
                    handleEvent(key, null, vNode.dom);
                }
            }
        }
        if (childFlags & 12) {
            unmountAllChildren(children);
        } else if (childFlags === 2) {
            unmount(children);
        }
    } else if (children) {
        if (flags & 4) {
            if (isFunction(children.componentWillUnmount)) {
                children.componentWillUnmount();
            }
            unmountRef(vNode.ref);
            children.$UN = true;
            unmount(children.$LI);
        } else if (flags & 8) {
            ref = vNode.ref;
            if (!isNullOrUndef(ref) && isFunction(ref.onComponentWillUnmount)) {
                ref.onComponentWillUnmount(findDOMfromVNode(vNode, true), vNode.props || EMPTY_OBJ);
            }
            unmount(children);
        } else if (flags & 1024) {
            remove(children, vNode.ref);
        } else if (flags & 8192) {
            if (vNode.childFlags & 12) {
                unmountAllChildren(children);
            }
        }
    }
}
function unmountAllChildren(children) {
    for (var i = 0, len = children.length; i < len; ++i) {
        unmount(children[i]);
    }
}
function clearDOM(dom) {
    dom.textContent = '';
}
function removeAllChildren(dom, vNode, children) {
    unmountAllChildren(children);
    if (vNode.flags & 8192) {
        removeVNodeDOM(vNode, dom);
    } else {
        clearDOM(dom);
    }
}
function createLinkEvent(linkEvent, nextValue) {
    return function (e) {
        linkEvent(nextValue.data, e);
    };
}
function patchEvent(name, lastValue, nextValue, dom) {
    var event = normalizeEventName(name);
    if (isObject(nextValue) && !isNull(nextValue)) {
        var linkEvent = nextValue.event;
        {
            if (!isFunction(linkEvent)) {
                throwError('an event on a VNode "' + name + '". was not a function or a valid linkEvent.');
            }
        }
        if (!isSameLinkEvent(lastValue, nextValue)) {
            attachEvent(dom, event, createLinkEvent(linkEvent, nextValue));
        }
    } else {
        attachEvent(dom, event, nextValue);
    }
}
function patchStyle(lastAttrValue, nextAttrValue, dom) {
    if (isNullOrUndef(nextAttrValue)) {
        dom.removeAttribute('style');
        return;
    }
    var domStyle = dom.style;
    var style;
    var value;
    if (isString(nextAttrValue)) {
        domStyle.cssText = nextAttrValue;
        return;
    }
    if (!isNullOrUndef(lastAttrValue) && !isString(lastAttrValue)) {
        for (style in nextAttrValue) {
            value = nextAttrValue[style];
            if (value !== lastAttrValue[style]) {
                domStyle.setProperty(style, value);
            }
        }
        for (style in lastAttrValue) {
            if (isNullOrUndef(nextAttrValue[style])) {
                domStyle.removeProperty(style);
            }
        }
    } else {
        for (style in nextAttrValue) {
            value = nextAttrValue[style];
            domStyle.setProperty(style, value);
        }
    }
}
function patchProp(prop, lastValue, nextValue, dom, isSVG, hasControlledValue, lastVNode) {
    switch (prop) {
    case 'children':
    case 'childrenType':
    case 'className':
    case 'defaultValue':
    case 'key':
    case 'multiple':
    case 'ref':
    case 'selectedIndex':
        break;
    case 'autoFocus':
        dom.autofocus = !!nextValue;
        break;
    case 'allowfullscreen':
    case 'autoplay':
    case 'capture':
    case 'checked':
    case 'controls':
    case 'default':
    case 'disabled':
    case 'hidden':
    case 'indeterminate':
    case 'loop':
    case 'muted':
    case 'novalidate':
    case 'open':
    case 'readOnly':
    case 'required':
    case 'reversed':
    case 'scoped':
    case 'seamless':
    case 'selected':
        dom[prop] = !!nextValue;
        break;
    case 'defaultChecked':
    case 'value':
    case 'volume':
        if (hasControlledValue && prop === 'value') {
            break;
        }
        var value = isNullOrUndef(nextValue) ? '' : nextValue;
        if (dom[prop] !== value) {
            dom[prop] = value;
        }
        break;
    case 'style':
        patchStyle(lastValue, nextValue, dom);
        break;
    case 'dangerouslySetInnerHTML':
        var lastHtml = lastValue && lastValue.__html || '';
        var nextHtml = nextValue && nextValue.__html || '';
        if (lastHtml !== nextHtml) {
            if (!isNullOrUndef(nextHtml) && !isSameInnerHTML(dom, nextHtml)) {
                if (!isNull(lastVNode)) {
                    if (lastVNode.childFlags & 12) {
                        unmountAllChildren(lastVNode.children);
                    } else if (lastVNode.childFlags === 2) {
                        unmount(lastVNode.children);
                    }
                    lastVNode.children = null;
                    lastVNode.childFlags = 1;
                }
                dom.innerHTML = nextHtml;
            }
        }
        break;
    default:
        if (delegatedEvents[prop]) {
            if (!isSameLinkEvent(lastValue, nextValue)) {
                handleEvent(prop, nextValue, dom);
            }
        } else if (prop.charCodeAt(0) === 111 && prop.charCodeAt(1) === 110) {
            patchEvent(prop, lastValue, nextValue, dom);
        } else if (isNullOrUndef(nextValue)) {
            dom.removeAttribute(prop);
        } else if (isSVG && namespaces[prop]) {
            dom.setAttributeNS(namespaces[prop], prop, nextValue);
        } else {
            dom.setAttribute(prop, nextValue);
        }
        break;
    }
}
function mountProps(vNode, flags, props, dom, isSVG) {
    var hasControlledValue = false;
    var isFormElement = (flags & 448) > 0;
    if (isFormElement) {
        hasControlledValue = isControlledFormElement(props);
        if (hasControlledValue) {
            addFormElementEventHandlers(flags, dom, props);
        }
    }
    for (var prop in props) {
        patchProp(prop, null, props[prop], dom, isSVG, hasControlledValue, null);
    }
    if (isFormElement) {
        processElement(flags, vNode, dom, props, true, hasControlledValue);
    }
}
function warnAboutOldLifecycles(component) {
    var oldLifecycles = [];
    if (component.componentWillMount && component.componentWillMount.__suppressDeprecationWarning !== true) {
        oldLifecycles.push('componentWillMount');
    }
    if (component.componentWillReceiveProps && component.componentWillReceiveProps.__suppressDeprecationWarning !== true) {
        oldLifecycles.push('componentWillReceiveProps');
    }
    if (component.componentWillUpdate && component.componentWillUpdate.__suppressDeprecationWarning !== true) {
        oldLifecycles.push('componentWillUpdate');
    }
    if (oldLifecycles.length > 0) {
        warning('\n      Warning: Unsafe legacy lifecycles will not be called for components using new component APIs.\n      ' + getComponentName(component) + ' contains the following legacy lifecycles:\n      ' + oldLifecycles.join('\n') + '\n      The above lifecycles should be removed.\n    ');
    }
}
function renderNewInput(instance, props, context) {
    var nextInput = handleComponentInput(instance.render(props, instance.state, context));
    var childContext = context;
    if (isFunction(instance.getChildContext)) {
        childContext = combineFrom(context, instance.getChildContext());
    }
    instance.$CX = childContext;
    return nextInput;
}
function createClassComponentInstance(vNode, Component, props, context, isSVG, lifecycle) {
    var instance = new Component(props, context);
    var usesNewAPI = instance.$N = Boolean(Component.getDerivedStateFromProps || instance.getSnapshotBeforeUpdate);
    instance.$SVG = isSVG;
    instance.$L = lifecycle;
    {
        if (instance.getDerivedStateFromProps) {
            warning(getComponentName(instance) + ' getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.');
        }
        if (usesNewAPI) {
            warnAboutOldLifecycles(instance);
        }
    }
    vNode.children = instance;
    instance.$BS = false;
    instance.context = context;
    if (instance.props === EMPTY_OBJ) {
        instance.props = props;
    }
    if (!usesNewAPI) {
        if (isFunction(instance.componentWillMount)) {
            instance.$BR = true;
            instance.componentWillMount();
            var pending = instance.$PS;
            if (!isNull(pending)) {
                var state = instance.state;
                if (isNull(state)) {
                    instance.state = pending;
                } else {
                    for (var key in pending) {
                        state[key] = pending[key];
                    }
                }
                instance.$PS = null;
            }
            instance.$BR = false;
        }
    } else {
        instance.state = createDerivedState(instance, props, instance.state);
    }
    instance.$LI = renderNewInput(instance, props, context);
    return instance;
}
function handleComponentInput(input) {
    if (isInvalid(input)) {
        input = createVoidVNode();
    } else if (isStringOrNumber(input)) {
        input = createTextVNode(input, null);
    } else if (isArray(input)) {
        input = createFragment(input, 0, null);
    } else if (input.flags & 16384) {
        input = directClone(input);
    }
    return input;
}
function mount(vNode, parentDOM, context, isSVG, nextNode, lifecycle) {
    var flags = vNode.flags |= 16384;
    if (flags & 481) {
        mountElement(vNode, parentDOM, context, isSVG, nextNode, lifecycle);
    } else if (flags & 4) {
        mountClassComponent(vNode, parentDOM, context, isSVG, nextNode, lifecycle);
    } else if (flags & 8) {
        mountFunctionalComponent(vNode, parentDOM, context, isSVG, nextNode, lifecycle);
    } else if (flags & 512 || flags & 16) {
        mountText(vNode, parentDOM, nextNode);
    } else if (flags & 8192) {
        mountFragment(vNode, parentDOM, context, isSVG, nextNode, lifecycle);
    } else if (flags & 1024) {
        mountPortal(vNode, context, parentDOM, nextNode, lifecycle);
    } else {
        if (typeof vNode === 'object') {
            throwError('mount() received an object that\'s not a valid VNode, you should stringify it first, fix createVNode flags or call normalizeChildren. Object: "' + JSON.stringify(vNode) + '".');
        } else {
            throwError('mount() expects a valid VNode, instead it received an object with the type "' + typeof vNode + '".');
        }
    }
}
function mountPortal(vNode, context, parentDOM, nextNode, lifecycle) {
    mount(vNode.children, vNode.ref, context, false, null, lifecycle);
    var placeHolderVNode = createVoidVNode();
    mountText(placeHolderVNode, parentDOM, nextNode);
    vNode.dom = placeHolderVNode.dom;
}
function mountFragment(vNode, parentDOM, context, isSVG, nextNode, lifecycle) {
    var children = vNode.children;
    var childFlags = vNode.childFlags;
    if (childFlags & 12 && children.length === 0) {
        childFlags = vNode.childFlags = 2;
        children = vNode.children = createVoidVNode();
    }
    if (childFlags === 2) {
        mount(children, parentDOM, nextNode, isSVG, nextNode, lifecycle);
    } else {
        mountArrayChildren(children, parentDOM, context, isSVG, nextNode, lifecycle);
    }
}
function mountText(vNode, parentDOM, nextNode) {
    var dom = vNode.dom = document.createTextNode(vNode.children);
    if (!isNull(parentDOM)) {
        insertOrAppend(parentDOM, dom, nextNode);
    }
}
function mountElement(vNode, parentDOM, context, isSVG, nextNode, lifecycle) {
    var flags = vNode.flags;
    var props = vNode.props;
    var className = vNode.className;
    var ref = vNode.ref;
    var children = vNode.children;
    var childFlags = vNode.childFlags;
    isSVG = isSVG || (flags & 32) > 0;
    var dom = documentCreateElement(vNode.type, isSVG);
    vNode.dom = dom;
    if (!isNullOrUndef(className) && className !== '') {
        if (isSVG) {
            dom.setAttribute('class', className);
        } else {
            dom.className = className;
        }
    }
    {
        validateKeys(vNode);
    }
    if (childFlags === 16) {
        setTextContent(dom, children);
    } else if (childFlags !== 1) {
        var childrenIsSVG = isSVG && vNode.type !== 'foreignObject';
        if (childFlags === 2) {
            if (children.flags & 16384) {
                vNode.children = children = directClone(children);
            }
            mount(children, dom, context, childrenIsSVG, null, lifecycle);
        } else if (childFlags === 8 || childFlags === 4) {
            mountArrayChildren(children, dom, context, childrenIsSVG, null, lifecycle);
        }
    }
    if (!isNull(parentDOM)) {
        insertOrAppend(parentDOM, dom, nextNode);
    }
    if (!isNull(props)) {
        mountProps(vNode, flags, props, dom, isSVG);
    }
    {
        if (isString(ref)) {
            throwError('string "refs" are not supported in Inferno 1.0. Use callback ref or Inferno.createRef() API instead.');
        }
    }
    mountRef(ref, dom, lifecycle);
}
function mountArrayChildren(children, dom, context, isSVG, nextNode, lifecycle) {
    for (var i = 0, len = children.length; i < len; ++i) {
        var child = children[i];
        if (child.flags & 16384) {
            children[i] = child = directClone(child);
        }
        mount(child, dom, context, isSVG, nextNode, lifecycle);
    }
}
function mountClassComponent(vNode, parentDOM, context, isSVG, nextNode, lifecycle) {
    var instance = createClassComponentInstance(vNode, vNode.type, vNode.props || EMPTY_OBJ, context, isSVG, lifecycle);
    mount(instance.$LI, parentDOM, instance.$CX, isSVG, nextNode, lifecycle);
    mountClassComponentCallbacks(vNode.ref, instance, lifecycle);
}
function mountFunctionalComponent(vNode, parentDOM, context, isSVG, nextNode, lifecycle) {
    var type = vNode.type;
    var props = vNode.props || EMPTY_OBJ;
    var ref = vNode.ref;
    var input = handleComponentInput(vNode.flags & 32768 ? type(props, ref, context) : type(props, context));
    vNode.children = input;
    mount(input, parentDOM, context, isSVG, nextNode, lifecycle);
    mountFunctionalComponentCallbacks(props, ref, vNode, lifecycle);
}
function createClassMountCallback(instance) {
    return function () {
        instance.componentDidMount();
    };
}
function mountClassComponentCallbacks(ref, instance, lifecycle) {
    mountRef(ref, instance, lifecycle);
    {
        if (isStringOrNumber(ref)) {
            throwError('string "refs" are not supported in Inferno 1.0. Use callback ref or Inferno.createRef() API instead.');
        } else if (!isNullOrUndef(ref) && typeof ref === 'object' && ref.current === void 0) {
            throwError('functional component lifecycle events are not supported on ES2015 class components.');
        }
    }
    if (isFunction(instance.componentDidMount)) {
        lifecycle.push(createClassMountCallback(instance));
    }
}
function createOnMountCallback(ref, vNode, props) {
    return function () {
        ref.onComponentDidMount(findDOMfromVNode(vNode, true), props);
    };
}
function mountFunctionalComponentCallbacks(props, ref, vNode, lifecycle) {
    if (!isNullOrUndef(ref)) {
        if (isFunction(ref.onComponentWillMount)) {
            ref.onComponentWillMount(props);
        }
        if (isFunction(ref.onComponentDidMount)) {
            lifecycle.push(createOnMountCallback(ref, vNode, props));
        }
    }
}
function replaceWithNewNode(lastVNode, nextVNode, parentDOM, context, isSVG, lifecycle) {
    unmount(lastVNode);
    if ((nextVNode.flags & lastVNode.flags & 2033) !== 0) {
        mount(nextVNode, null, context, isSVG, null, lifecycle);
        replaceChild(parentDOM, nextVNode.dom, lastVNode.dom);
    } else {
        mount(nextVNode, parentDOM, context, isSVG, findDOMfromVNode(lastVNode, true), lifecycle);
        removeVNodeDOM(lastVNode, parentDOM);
    }
}
function patch(lastVNode, nextVNode, parentDOM, context, isSVG, nextNode, lifecycle) {
    var nextFlags = nextVNode.flags |= 16384;
    {
        if (isFunction(options.componentComparator) && lastVNode.flags & nextFlags & 4) {
            if (options.componentComparator(lastVNode, nextVNode) === false) {
                patchClassComponent(lastVNode, nextVNode, parentDOM, context, isSVG, nextNode, lifecycle);
                return;
            }
        }
    }
    if (lastVNode.flags !== nextFlags || lastVNode.type !== nextVNode.type || lastVNode.key !== nextVNode.key || (nextFlags & 2048) !== 0) {
        if (lastVNode.flags & 16384) {
            replaceWithNewNode(lastVNode, nextVNode, parentDOM, context, isSVG, lifecycle);
        } else {
            mount(nextVNode, parentDOM, context, isSVG, nextNode, lifecycle);
        }
    } else if (nextFlags & 481) {
        patchElement(lastVNode, nextVNode, context, isSVG, nextFlags, lifecycle);
    } else if (nextFlags & 4) {
        patchClassComponent(lastVNode, nextVNode, parentDOM, context, isSVG, nextNode, lifecycle);
    } else if (nextFlags & 8) {
        patchFunctionalComponent(lastVNode, nextVNode, parentDOM, context, isSVG, nextNode, lifecycle);
    } else if (nextFlags & 16) {
        patchText(lastVNode, nextVNode);
    } else if (nextFlags & 512) {
        nextVNode.dom = lastVNode.dom;
    } else if (nextFlags & 8192) {
        patchFragment(lastVNode, nextVNode, parentDOM, context, isSVG, lifecycle);
    } else {
        patchPortal(lastVNode, nextVNode, context, lifecycle);
    }
}
function patchSingleTextChild(lastChildren, nextChildren, parentDOM) {
    if (lastChildren !== nextChildren) {
        if (lastChildren !== '') {
            parentDOM.firstChild.nodeValue = nextChildren;
        } else {
            setTextContent(parentDOM, nextChildren);
        }
    }
}
function patchContentEditableChildren(dom, nextChildren) {
    if (dom.textContent !== nextChildren) {
        dom.textContent = nextChildren;
    }
}
function patchFragment(lastVNode, nextVNode, parentDOM, context, isSVG, lifecycle) {
    var lastChildren = lastVNode.children;
    var nextChildren = nextVNode.children;
    var lastChildFlags = lastVNode.childFlags;
    var nextChildFlags = nextVNode.childFlags;
    var nextNode = null;
    if (nextChildFlags & 12 && nextChildren.length === 0) {
        nextChildFlags = nextVNode.childFlags = 2;
        nextChildren = nextVNode.children = createVoidVNode();
    }
    var nextIsSingle = (nextChildFlags & 2) !== 0;
    if (lastChildFlags & 12) {
        var lastLen = lastChildren.length;
        if (lastChildFlags & 8 && nextChildFlags & 8 || nextIsSingle || !nextIsSingle && nextChildren.length > lastLen) {
            nextNode = findDOMfromVNode(lastChildren[lastLen - 1], false).nextSibling;
        }
    }
    patchChildren(lastChildFlags, nextChildFlags, lastChildren, nextChildren, parentDOM, context, isSVG, nextNode, lastVNode, lifecycle);
}
function patchPortal(lastVNode, nextVNode, context, lifecycle) {
    var lastContainer = lastVNode.ref;
    var nextContainer = nextVNode.ref;
    var nextChildren = nextVNode.children;
    patchChildren(lastVNode.childFlags, nextVNode.childFlags, lastVNode.children, nextChildren, lastContainer, context, false, null, lastVNode, lifecycle);
    nextVNode.dom = lastVNode.dom;
    if (lastContainer !== nextContainer && !isInvalid(nextChildren)) {
        var node = nextChildren.dom;
        removeChild(lastContainer, node);
        appendChild(nextContainer, node);
    }
}
function patchElement(lastVNode, nextVNode, context, isSVG, nextFlags, lifecycle) {
    var dom = lastVNode.dom;
    var lastProps = lastVNode.props;
    var nextProps = nextVNode.props;
    var isFormElement = false;
    var hasControlledValue = false;
    var nextPropsOrEmpty;
    nextVNode.dom = dom;
    isSVG = isSVG || (nextFlags & 32) > 0;
    if (lastProps !== nextProps) {
        var lastPropsOrEmpty = lastProps || EMPTY_OBJ;
        nextPropsOrEmpty = nextProps || EMPTY_OBJ;
        if (nextPropsOrEmpty !== EMPTY_OBJ) {
            isFormElement = (nextFlags & 448) > 0;
            if (isFormElement) {
                hasControlledValue = isControlledFormElement(nextPropsOrEmpty);
            }
            for (var prop in nextPropsOrEmpty) {
                var lastValue = lastPropsOrEmpty[prop];
                var nextValue = nextPropsOrEmpty[prop];
                if (lastValue !== nextValue) {
                    patchProp(prop, lastValue, nextValue, dom, isSVG, hasControlledValue, lastVNode);
                }
            }
        }
        if (lastPropsOrEmpty !== EMPTY_OBJ) {
            for (var prop$1 in lastPropsOrEmpty) {
                if (isNullOrUndef(nextPropsOrEmpty[prop$1]) && !isNullOrUndef(lastPropsOrEmpty[prop$1])) {
                    patchProp(prop$1, lastPropsOrEmpty[prop$1], null, dom, isSVG, hasControlledValue, lastVNode);
                }
            }
        }
    }
    var nextChildren = nextVNode.children;
    var nextClassName = nextVNode.className;
    if (lastVNode.className !== nextClassName) {
        if (isNullOrUndef(nextClassName)) {
            dom.removeAttribute('class');
        } else if (isSVG) {
            dom.setAttribute('class', nextClassName);
        } else {
            dom.className = nextClassName;
        }
    }
    {
        validateKeys(nextVNode);
    }
    if (nextFlags & 4096) {
        patchContentEditableChildren(dom, nextChildren);
    } else {
        patchChildren(lastVNode.childFlags, nextVNode.childFlags, lastVNode.children, nextChildren, dom, context, isSVG && nextVNode.type !== 'foreignObject', null, lastVNode, lifecycle);
    }
    if (isFormElement) {
        processElement(nextFlags, nextVNode, dom, nextPropsOrEmpty, false, hasControlledValue);
    }
    var nextRef = nextVNode.ref;
    var lastRef = lastVNode.ref;
    if (lastRef !== nextRef) {
        unmountRef(lastRef);
        mountRef(nextRef, dom, lifecycle);
    }
}
function replaceOneVNodeWithMultipleVNodes(lastChildren, nextChildren, parentDOM, context, isSVG, lifecycle) {
    unmount(lastChildren);
    mountArrayChildren(nextChildren, parentDOM, context, isSVG, findDOMfromVNode(lastChildren, true), lifecycle);
    removeVNodeDOM(lastChildren, parentDOM);
}
function patchChildren(lastChildFlags, nextChildFlags, lastChildren, nextChildren, parentDOM, context, isSVG, nextNode, parentVNode, lifecycle) {
    switch (lastChildFlags) {
    case 2:
        switch (nextChildFlags) {
        case 2:
            patch(lastChildren, nextChildren, parentDOM, context, isSVG, nextNode, lifecycle);
            break;
        case 1:
            remove(lastChildren, parentDOM);
            break;
        case 16:
            unmount(lastChildren);
            setTextContent(parentDOM, nextChildren);
            break;
        default:
            replaceOneVNodeWithMultipleVNodes(lastChildren, nextChildren, parentDOM, context, isSVG, lifecycle);
            break;
        }
        break;
    case 1:
        switch (nextChildFlags) {
        case 2:
            mount(nextChildren, parentDOM, context, isSVG, nextNode, lifecycle);
            break;
        case 1:
            break;
        case 16:
            setTextContent(parentDOM, nextChildren);
            break;
        default:
            mountArrayChildren(nextChildren, parentDOM, context, isSVG, nextNode, lifecycle);
            break;
        }
        break;
    case 16:
        switch (nextChildFlags) {
        case 16:
            patchSingleTextChild(lastChildren, nextChildren, parentDOM);
            break;
        case 2:
            clearDOM(parentDOM);
            mount(nextChildren, parentDOM, context, isSVG, nextNode, lifecycle);
            break;
        case 1:
            clearDOM(parentDOM);
            break;
        default:
            clearDOM(parentDOM);
            mountArrayChildren(nextChildren, parentDOM, context, isSVG, nextNode, lifecycle);
            break;
        }
        break;
    default:
        switch (nextChildFlags) {
        case 16:
            unmountAllChildren(lastChildren);
            setTextContent(parentDOM, nextChildren);
            break;
        case 2:
            removeAllChildren(parentDOM, parentVNode, lastChildren);
            mount(nextChildren, parentDOM, context, isSVG, nextNode, lifecycle);
            break;
        case 1:
            removeAllChildren(parentDOM, parentVNode, lastChildren);
            break;
        default:
            var lastLength = lastChildren.length | 0;
            var nextLength = nextChildren.length | 0;
            if (lastLength === 0) {
                if (nextLength > 0) {
                    mountArrayChildren(nextChildren, parentDOM, context, isSVG, nextNode, lifecycle);
                }
            } else if (nextLength === 0) {
                removeAllChildren(parentDOM, parentVNode, lastChildren);
            } else if (nextChildFlags === 8 && lastChildFlags === 8) {
                patchKeyedChildren(lastChildren, nextChildren, parentDOM, context, isSVG, lastLength, nextLength, nextNode, parentVNode, lifecycle);
            } else {
                patchNonKeyedChildren(lastChildren, nextChildren, parentDOM, context, isSVG, lastLength, nextLength, nextNode, lifecycle);
            }
            break;
        }
        break;
    }
}
function createDidUpdate(instance, lastProps, lastState, snapshot, lifecycle) {
    lifecycle.push(function () {
        instance.componentDidUpdate(lastProps, lastState, snapshot);
    });
}
function updateClassComponent(instance, nextState, nextProps, parentDOM, context, isSVG, force, nextNode, lifecycle) {
    var lastState = instance.state;
    var lastProps = instance.props;
    var usesNewAPI = Boolean(instance.$N);
    var hasSCU = isFunction(instance.shouldComponentUpdate);
    if (usesNewAPI) {
        nextState = createDerivedState(instance, nextProps, nextState !== lastState ? combineFrom(lastState, nextState) : nextState);
    }
    if (force || !hasSCU || hasSCU && instance.shouldComponentUpdate(nextProps, nextState, context)) {
        if (!usesNewAPI && isFunction(instance.componentWillUpdate)) {
            instance.componentWillUpdate(nextProps, nextState, context);
        }
        instance.props = nextProps;
        instance.state = nextState;
        instance.context = context;
        var snapshot = null;
        var nextInput = renderNewInput(instance, nextProps, context);
        if (usesNewAPI && isFunction(instance.getSnapshotBeforeUpdate)) {
            snapshot = instance.getSnapshotBeforeUpdate(lastProps, lastState);
        }
        patch(instance.$LI, nextInput, parentDOM, instance.$CX, isSVG, nextNode, lifecycle);
        instance.$LI = nextInput;
        if (isFunction(instance.componentDidUpdate)) {
            createDidUpdate(instance, lastProps, lastState, snapshot, lifecycle);
        }
    } else {
        instance.props = nextProps;
        instance.state = nextState;
        instance.context = context;
    }
}
function patchClassComponent(lastVNode, nextVNode, parentDOM, context, isSVG, nextNode, lifecycle) {
    var instance = nextVNode.children = lastVNode.children;
    if (isNull(instance)) {
        return;
    }
    instance.$L = lifecycle;
    var nextProps = nextVNode.props || EMPTY_OBJ;
    var nextRef = nextVNode.ref;
    var lastRef = lastVNode.ref;
    var nextState = instance.state;
    if (!instance.$N) {
        if (isFunction(instance.componentWillReceiveProps)) {
            instance.$BR = true;
            instance.componentWillReceiveProps(nextProps, context);
            if (instance.$UN) {
                return;
            }
            instance.$BR = false;
        }
        if (!isNull(instance.$PS)) {
            nextState = combineFrom(nextState, instance.$PS);
            instance.$PS = null;
        }
    }
    updateClassComponent(instance, nextState, nextProps, parentDOM, context, isSVG, false, nextNode, lifecycle);
    if (lastRef !== nextRef) {
        unmountRef(lastRef);
        mountRef(nextRef, instance, lifecycle);
    }
}
function patchFunctionalComponent(lastVNode, nextVNode, parentDOM, context, isSVG, nextNode, lifecycle) {
    var shouldUpdate = true;
    var nextProps = nextVNode.props || EMPTY_OBJ;
    var nextRef = nextVNode.ref;
    var lastProps = lastVNode.props;
    var nextHooksDefined = !isNullOrUndef(nextRef);
    var lastInput = lastVNode.children;
    if (nextHooksDefined && isFunction(nextRef.onComponentShouldUpdate)) {
        shouldUpdate = nextRef.onComponentShouldUpdate(lastProps, nextProps);
    }
    if (shouldUpdate !== false) {
        if (nextHooksDefined && isFunction(nextRef.onComponentWillUpdate)) {
            nextRef.onComponentWillUpdate(lastProps, nextProps);
        }
        var type = nextVNode.type;
        var nextInput = handleComponentInput(nextVNode.flags & 32768 ? type(nextProps, nextRef, context) : type(nextProps, context));
        patch(lastInput, nextInput, parentDOM, context, isSVG, nextNode, lifecycle);
        nextVNode.children = nextInput;
        if (nextHooksDefined && isFunction(nextRef.onComponentDidUpdate)) {
            nextRef.onComponentDidUpdate(lastProps, nextProps);
        }
    } else {
        nextVNode.children = lastInput;
    }
}
function patchText(lastVNode, nextVNode) {
    var nextText = nextVNode.children;
    var dom = lastVNode.dom;
    if (nextText !== lastVNode.children) {
        dom.nodeValue = nextText;
    }
    nextVNode.dom = dom;
}
function patchNonKeyedChildren(lastChildren, nextChildren, dom, context, isSVG, lastChildrenLength, nextChildrenLength, nextNode, lifecycle) {
    var commonLength = lastChildrenLength > nextChildrenLength ? nextChildrenLength : lastChildrenLength;
    var i = 0;
    var nextChild;
    var lastChild;
    for (; i < commonLength; ++i) {
        nextChild = nextChildren[i];
        lastChild = lastChildren[i];
        if (nextChild.flags & 16384) {
            nextChild = nextChildren[i] = directClone(nextChild);
        }
        patch(lastChild, nextChild, dom, context, isSVG, nextNode, lifecycle);
        lastChildren[i] = nextChild;
    }
    if (lastChildrenLength < nextChildrenLength) {
        for (i = commonLength; i < nextChildrenLength; ++i) {
            nextChild = nextChildren[i];
            if (nextChild.flags & 16384) {
                nextChild = nextChildren[i] = directClone(nextChild);
            }
            mount(nextChild, dom, context, isSVG, nextNode, lifecycle);
        }
    } else if (lastChildrenLength > nextChildrenLength) {
        for (i = commonLength; i < lastChildrenLength; ++i) {
            remove(lastChildren[i], dom);
        }
    }
}
function patchKeyedChildren(a, b, dom, context, isSVG, aLength, bLength, outerEdge, parentVNode, lifecycle) {
    var aEnd = aLength - 1;
    var bEnd = bLength - 1;
    var i = 0;
    var j = 0;
    var aNode = a[j];
    var bNode = b[j];
    var nextPos;
    var nextNode;
    outer: {
        while (aNode.key === bNode.key) {
            if (bNode.flags & 16384) {
                b[j] = bNode = directClone(bNode);
            }
            patch(aNode, bNode, dom, context, isSVG, outerEdge, lifecycle);
            a[j] = bNode;
            ++j;
            if (j > aEnd || j > bEnd) {
                break outer;
            }
            aNode = a[j];
            bNode = b[j];
        }
        aNode = a[aEnd];
        bNode = b[bEnd];
        while (aNode.key === bNode.key) {
            if (bNode.flags & 16384) {
                b[bEnd] = bNode = directClone(bNode);
            }
            patch(aNode, bNode, dom, context, isSVG, outerEdge, lifecycle);
            a[aEnd] = bNode;
            aEnd--;
            bEnd--;
            if (j > aEnd || j > bEnd) {
                break outer;
            }
            aNode = a[aEnd];
            bNode = b[bEnd];
        }
    }
    if (j > aEnd) {
        if (j <= bEnd) {
            nextPos = bEnd + 1;
            nextNode = nextPos < bLength ? findDOMfromVNode(b[nextPos], true) : outerEdge;
            while (j <= bEnd) {
                bNode = b[j];
                if (bNode.flags & 16384) {
                    b[j] = bNode = directClone(bNode);
                }
                ++j;
                mount(bNode, dom, context, isSVG, nextNode, lifecycle);
            }
        }
    } else if (j > bEnd) {
        while (j <= aEnd) {
            remove(a[j++], dom);
        }
    } else {
        var aStart = j;
        var bStart = j;
        var aLeft = aEnd - j + 1;
        var bLeft = bEnd - j + 1;
        var sources = new Int32Array(bLeft - i + 1);
        i = bLeft + 2;
        var canRemoveWholeContent = aLeft === aLength;
        var moved = false;
        var pos = 0;
        var patched = 0;
        if (bLength < 4 || (aLeft | bLeft) < 32) {
            for (i = aStart; i <= aEnd; ++i) {
                aNode = a[i];
                if (patched < bLeft) {
                    for (j = bStart; j <= bEnd; j++) {
                        bNode = b[j];
                        if (aNode.key === bNode.key) {
                            sources[j - bStart] = i + 1;
                            if (canRemoveWholeContent) {
                                canRemoveWholeContent = false;
                                while (aStart < i) {
                                    remove(a[aStart++], dom);
                                }
                            }
                            if (pos > j) {
                                moved = true;
                            } else {
                                pos = j;
                            }
                            if (bNode.flags & 16384) {
                                b[j] = bNode = directClone(bNode);
                            }
                            patch(aNode, bNode, dom, context, isSVG, outerEdge, lifecycle);
                            ++patched;
                            break;
                        }
                    }
                    if (!canRemoveWholeContent && j > bEnd) {
                        remove(aNode, dom);
                    }
                } else if (!canRemoveWholeContent) {
                    remove(aNode, dom);
                }
            }
        } else {
            var keyIndex = {};
            for (i = bStart; i <= bEnd; ++i) {
                keyIndex[b[i].key] = i;
            }
            for (i = aStart; i <= aEnd; ++i) {
                aNode = a[i];
                if (patched < bLeft) {
                    j = keyIndex[aNode.key];
                    if (j !== void 0) {
                        if (canRemoveWholeContent) {
                            canRemoveWholeContent = false;
                            while (i > aStart) {
                                remove(a[aStart++], dom);
                            }
                        }
                        bNode = b[j];
                        sources[j - bStart] = i + 1;
                        if (pos > j) {
                            moved = true;
                        } else {
                            pos = j;
                        }
                        if (bNode.flags & 16384) {
                            b[j] = bNode = directClone(bNode);
                        }
                        patch(aNode, bNode, dom, context, isSVG, outerEdge, lifecycle);
                        ++patched;
                    } else if (!canRemoveWholeContent) {
                        remove(aNode, dom);
                    }
                } else if (!canRemoveWholeContent) {
                    remove(aNode, dom);
                }
            }
        }
        if (canRemoveWholeContent) {
            removeAllChildren(dom, parentVNode, a);
            mountArrayChildren(b, dom, context, isSVG, outerEdge, lifecycle);
        } else if (moved) {
            var seq = lis_algorithm(sources);
            j = seq.length - 1;
            for (i = bLeft - 1; i >= 0; i--) {
                if (sources[i] === 0) {
                    pos = i + bStart;
                    bNode = b[pos];
                    if (bNode.flags & 16384) {
                        b[pos] = bNode = directClone(bNode);
                    }
                    nextPos = pos + 1;
                    mount(bNode, dom, context, isSVG, nextPos < bLength ? findDOMfromVNode(b[nextPos], true) : outerEdge, lifecycle);
                } else if (j < 0 || i !== seq[j]) {
                    pos = i + bStart;
                    bNode = b[pos];
                    nextPos = pos + 1;
                    moveVNodeDOM(bNode, dom, nextPos < bLength ? findDOMfromVNode(b[nextPos], true) : outerEdge);
                } else {
                    j--;
                }
            }
        } else if (patched !== bLeft) {
            for (i = bLeft - 1; i >= 0; i--) {
                if (sources[i] === 0) {
                    pos = i + bStart;
                    bNode = b[pos];
                    if (bNode.flags & 16384) {
                        b[pos] = bNode = directClone(bNode);
                    }
                    nextPos = pos + 1;
                    mount(bNode, dom, context, isSVG, nextPos < bLength ? findDOMfromVNode(b[nextPos], true) : outerEdge, lifecycle);
                }
            }
        }
    }
}
var result;
var p;
var maxLen = 0;
function lis_algorithm(arr) {
    var arrI = 0;
    var i = 0;
    var j = 0;
    var k = 0;
    var u = 0;
    var v = 0;
    var c = 0;
    var len = arr.length;
    if (len > maxLen) {
        maxLen = len;
        result = new Int32Array(len);
        p = new Int32Array(len);
    }
    for (; i < len; ++i) {
        arrI = arr[i];
        if (arrI !== 0) {
            j = result[k];
            if (arr[j] < arrI) {
                p[i] = j;
                result[++k] = i;
                continue;
            }
            u = 0;
            v = k;
            while (u < v) {
                c = u + v >> 1;
                if (arr[result[c]] < arrI) {
                    u = c + 1;
                } else {
                    v = c;
                }
            }
            if (arrI < arr[result[u]]) {
                if (u > 0) {
                    p[i] = result[u - 1];
                }
                result[u] = i;
            }
        }
    }
    u = i = k + 1;
    var seq = new Int32Array(u);
    v = result[u - 1];
    while (u-- > 0) {
        seq[u] = v;
        v = p[v];
    }
    while (i-- > 0) {
        result[i] = 0;
    }
    return seq;
}
var hasDocumentAvailable = typeof document !== 'undefined';
{
    if (hasDocumentAvailable && !document.body) {
        warning('Inferno warning: you cannot initialize inferno without "document.body". Wait on "DOMContentLoaded" event, add script to bottom of body, or use async/defer attributes on script tag.');
    }
}
var documentBody = null;
if (hasDocumentAvailable) {
    documentBody = document.body;
    Node.prototype.$EV = null;
    Node.prototype.$V = null;
}
function __render(input, parentDOM, callback, context) {
    {
        if (documentBody === parentDOM) {
            throwError('you cannot render() to the "document.body". Use an empty element as a container instead.');
        }
        if (isInvalid(parentDOM)) {
            throwError('render target ( DOM ) is mandatory, received ' + (parentDOM === null ? 'null' : typeof parentDOM));
        }
    }
    var lifecycle = [];
    var rootInput = parentDOM.$V;
    renderCheck.v = true;
    if (isNullOrUndef(rootInput)) {
        if (!isNullOrUndef(input)) {
            if (input.flags & 16384) {
                input = directClone(input);
            }
            mount(input, parentDOM, context, false, null, lifecycle);
            parentDOM.$V = input;
            rootInput = input;
        }
    } else {
        if (isNullOrUndef(input)) {
            remove(rootInput, parentDOM);
            parentDOM.$V = null;
        } else {
            if (input.flags & 16384) {
                input = directClone(input);
            }
            patch(rootInput, input, parentDOM, context, false, null, lifecycle);
            rootInput = parentDOM.$V = input;
        }
    }
    if (lifecycle.length > 0) {
        callAll(lifecycle);
    }
    renderCheck.v = false;
    if (isFunction(callback)) {
        callback();
    }
    if (isFunction(options.renderComplete)) {
        options.renderComplete(rootInput, parentDOM);
    }
}
function render(input, parentDOM, callback, context) {
    if (callback === void 0)
        callback = null;
    if (context === void 0)
        context = EMPTY_OBJ;
    __render(input, parentDOM, callback, context);
}
function createRenderer(parentDOM) {
    return function renderer(lastInput, nextInput, callback, context) {
        if (!parentDOM) {
            parentDOM = lastInput;
        }
        render(nextInput, parentDOM, callback, context);
    };
}
var QUEUE = [];
var nextTick = typeof Promise !== 'undefined' ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout.bind(window);
var microTaskPending = false;
function queueStateChanges(component, newState, callback, force) {
    var pending = component.$PS;
    if (isFunction(newState)) {
        newState = newState(pending ? combineFrom(component.state, pending) : component.state, component.props, component.context);
    }
    if (isNullOrUndef(pending)) {
        component.$PS = newState;
    } else {
        for (var stateKey in newState) {
            pending[stateKey] = newState[stateKey];
        }
    }
    if (!component.$BR) {
        if (!renderCheck.v) {
            if (QUEUE.length === 0) {
                applyState(component, force, callback);
                return;
            }
        }
        if (QUEUE.indexOf(component) === -1) {
            QUEUE.push(component);
        }
        if (!microTaskPending) {
            microTaskPending = true;
            nextTick(rerender);
        }
        if (isFunction(callback)) {
            var QU = component.$QU;
            if (!QU) {
                QU = component.$QU = [];
            }
            QU.push(callback);
        }
    } else if (isFunction(callback)) {
        component.$L.push(callback.bind(component));
    }
}
function callSetStateCallbacks(component) {
    var queue = component.$QU;
    for (var i = 0, len = queue.length; i < len; ++i) {
        queue[i].call(component);
    }
    component.$QU = null;
}
function rerender() {
    var component;
    microTaskPending = false;
    while (component = QUEUE.pop()) {
        var queue = component.$QU;
        applyState(component, false, queue ? callSetStateCallbacks.bind(null, component) : null);
    }
}
function applyState(component, force, callback) {
    if (component.$UN) {
        return;
    }
    if (force || !component.$BR) {
        var pendingState = component.$PS;
        component.$PS = null;
        var lifecycle = [];
        renderCheck.v = true;
        updateClassComponent(component, combineFrom(component.state, pendingState), component.props, findDOMfromVNode(component.$LI, true).parentNode, component.context, component.$SVG, force, null, lifecycle);
        if (lifecycle.length > 0) {
            callAll(lifecycle);
        }
        renderCheck.v = false;
    } else {
        component.state = component.$PS;
        component.$PS = null;
    }
    if (isFunction(callback)) {
        callback.call(component);
    }
}
var Component = function Component(props, context) {
    this.state = null;
    this.$BR = false;
    this.$BS = true;
    this.$PS = null;
    this.$LI = null;
    this.$UN = false;
    this.$CX = null;
    this.$QU = null;
    this.$N = false;
    this.$L = null;
    this.$SVG = false;
    this.props = props || EMPTY_OBJ;
    this.context = context || EMPTY_OBJ;
};
Component.prototype.forceUpdate = function forceUpdate(callback) {
    if (this.$UN) {
        return;
    }
    queueStateChanges(this, {}, callback, true);
};
Component.prototype.setState = function setState(newState, callback) {
    if (this.$UN) {
        return;
    }
    if (!this.$BS) {
        queueStateChanges(this, newState, callback, false);
    } else {
        {
            throwError('cannot update state via setState() in constructor. Instead, assign to `this.state` directly or define a `state = {};`');
        }
        return;
    }
};
Component.prototype.render = function render(_nextProps, _nextState, _nextContext) {
    return null;
};
{
    var testFunc = function testFn() {
    };
    console.log('Inferno is in development mode.');
    if ((testFunc.name || testFunc.toString()).indexOf('testFn') === -1) {
        warning('It looks like you\'re using a minified copy of the development build ' + 'of Inferno. When deploying Inferno apps to production, make sure to use ' + 'the production build which skips development warnings and is faster. ' + 'See http://infernojs.org for more details.');
    }
}
var version = '7.1.13';
exports.Component = Component;
exports.EMPTY_OBJ = EMPTY_OBJ;
exports.Fragment = Fragment;
exports._CI = createClassComponentInstance;
exports._HI = handleComponentInput;
exports._M = mount;
exports._MCCC = mountClassComponentCallbacks;
exports._ME = mountElement;
exports._MFCC = mountFunctionalComponentCallbacks;
exports._MP = mountProps;
exports._MR = mountRef;
exports._MT = mountText;
exports.__render = __render;
exports.createComponentVNode = createComponentVNode;
exports.createFragment = createFragment;
exports.createPortal = createPortal;
exports.createRef = createRef;
exports.createRenderer = createRenderer;
exports.createTextVNode = createTextVNode;
exports.createVNode = createVNode;
exports.directClone = directClone;
exports.findDOMfromVNode = findDOMfromVNode;
exports.forwardRef = forwardRef;
exports.getFlagsForElementVnode = getFlagsForElementVnode;
exports.linkEvent = linkEvent;
exports.normalizeProps = normalizeProps;
exports.options = options;
exports.render = render;
exports.rerender = rerender;
exports.version = version;
}
// isarray@0.0.1/index.js
$fsx.f[32] =
function(module,exports){
module.exports = Array.isArray || function (arr) {
    return Object.prototype.toString.call(arr) == '[object Array]';
};
}
// mobx/lib/mobx.js
$fsx.f[33] =
function(module,exports){
Object.defineProperty(exports, '__esModule', { value: true });
var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b)
            if (b.hasOwnProperty(p))
                d[p] = b[p];
    };
    return extendStatics(d, b);
};
function __extends(d, b) {
    extendStatics(d, b);
    function __() {
        this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var __assign = function () {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
                if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function __values(o) {
    var m = typeof Symbol === 'function' && o[Symbol.iterator], i = 0;
    if (m)
        return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length)
                o = void 0;
            return {
                value: o && o[i++],
                done: !o
            };
        }
    };
}
function __read(o, n) {
    var m = typeof Symbol === 'function' && o[Symbol.iterator];
    if (!m)
        return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
            ar.push(r.value);
    } catch (error) {
        e = { error: error };
    } finally {
        try {
            if (r && !r.done && (m = i['return']))
                m.call(i);
        } finally {
            if (e)
                throw e.error;
        }
    }
    return ar;
}
function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}
var OBFUSCATED_ERROR = 'An invariant failed, however the error is obfuscated because this is an production build.';
var EMPTY_ARRAY = [];
Object.freeze(EMPTY_ARRAY);
var EMPTY_OBJECT = {};
Object.freeze(EMPTY_OBJECT);
function getNextId() {
    return ++globalState.mobxGuid;
}
function fail(message) {
    invariant(false, message);
    throw 'X';
}
function invariant(check, message) {
    if (!check)
        throw new Error('[mobx] ' + (message || OBFUSCATED_ERROR));
}
var deprecatedMessages = [];
function deprecated(msg, thing) {
    return false;
    if (thing) {
        return deprecated('\'' + msg + '\', use \'' + thing + '\' instead.');
    }
    if (deprecatedMessages.indexOf(msg) !== -1)
        return false;
    deprecatedMessages.push(msg);
    console.error('[mobx] Deprecated: ' + msg);
    return true;
}
function once(func) {
    var invoked = false;
    return function () {
        if (invoked)
            return;
        invoked = true;
        return func.apply(this, arguments);
    };
}
var noop = function () {
};
function unique(list) {
    var res = [];
    list.forEach(function (item) {
        if (res.indexOf(item) === -1)
            res.push(item);
    });
    return res;
}
function isObject(value) {
    return value !== null && typeof value === 'object';
}
function isPlainObject(value) {
    if (value === null || typeof value !== 'object')
        return false;
    var proto = Object.getPrototypeOf(value);
    return proto === Object.prototype || proto === null;
}
function addHiddenProp(object, propName, value) {
    Object.defineProperty(object, propName, {
        enumerable: false,
        writable: true,
        configurable: true,
        value: value
    });
}
function addHiddenFinalProp(object, propName, value) {
    Object.defineProperty(object, propName, {
        enumerable: false,
        writable: false,
        configurable: true,
        value: value
    });
}
function isPropertyConfigurable(object, prop) {
    var descriptor = Object.getOwnPropertyDescriptor(object, prop);
    return !descriptor || descriptor.configurable !== false && descriptor.writable !== false;
}
function assertPropertyConfigurable(object, prop) {
    if ('production' !== 'production' && !isPropertyConfigurable(object, prop))
        fail('Cannot make property \'' + prop.toString() + '\' observable, it is not configurable and writable in the target object');
}
function createInstanceofPredicate(name, clazz) {
    var propName = 'isMobX' + name;
    clazz.prototype[propName] = true;
    return function (x) {
        return isObject(x) && x[propName] === true;
    };
}
function isArrayLike(x) {
    return Array.isArray(x) || isObservableArray(x);
}
function isES6Map(thing) {
    return thing instanceof Map;
}
function isES6Set(thing) {
    return thing instanceof Set;
}
function getPlainObjectKeys(object) {
    var enumerables = new Set();
    for (var key in object)
        enumerables.add(key);
    Object.getOwnPropertySymbols(object).forEach(function (k) {
        if (Object.getOwnPropertyDescriptor(object, k).enumerable)
            enumerables.add(k);
    });
    return Array.from(enumerables);
}
function stringifyKey(key) {
    if (key && key.toString)
        return key.toString();
    else
        return new String(key).toString();
}
function getMapLikeKeys(map) {
    if (isPlainObject(map))
        return Object.keys(map);
    if (Array.isArray(map))
        return map.map(function (_a) {
            var _b = __read(_a, 1), key = _b[0];
            return key;
        });
    if (isES6Map(map) || isObservableMap(map))
        return Array.from(map.keys());
    return fail('Cannot get keys from \'' + map + '\'');
}
function toPrimitive(value) {
    return value === null ? null : typeof value === 'object' ? '' + value : value;
}
var $mobx = Symbol('mobx administration');
var Atom = function () {
    function Atom(name) {
        if (name === void 0) {
            name = 'Atom@' + getNextId();
        }
        this.name = name;
        this.isPendingUnobservation = false;
        this.isBeingObserved = false;
        this.observers = new Set();
        this.diffValue = 0;
        this.lastAccessedBy = 0;
        this.lowestObserverState = exports.IDerivationState.NOT_TRACKING;
    }
    Atom.prototype.onBecomeObserved = function () {
        if (this.onBecomeObservedListeners) {
            this.onBecomeObservedListeners.forEach(function (listener) {
                return listener();
            });
        }
    };
    Atom.prototype.onBecomeUnobserved = function () {
        if (this.onBecomeUnobservedListeners) {
            this.onBecomeUnobservedListeners.forEach(function (listener) {
                return listener();
            });
        }
    };
    Atom.prototype.reportObserved = function () {
        return reportObserved(this);
    };
    Atom.prototype.reportChanged = function () {
        startBatch();
        propagateChanged(this);
        endBatch();
    };
    Atom.prototype.toString = function () {
        return this.name;
    };
    return Atom;
}();
var isAtom = createInstanceofPredicate('Atom', Atom);
function createAtom(name, onBecomeObservedHandler, onBecomeUnobservedHandler) {
    if (onBecomeObservedHandler === void 0) {
        onBecomeObservedHandler = noop;
    }
    if (onBecomeUnobservedHandler === void 0) {
        onBecomeUnobservedHandler = noop;
    }
    var atom = new Atom(name);
    if (onBecomeObservedHandler !== noop) {
        onBecomeObserved(atom, onBecomeObservedHandler);
    }
    if (onBecomeUnobservedHandler !== noop) {
        onBecomeUnobserved(atom, onBecomeUnobservedHandler);
    }
    return atom;
}
function identityComparer(a, b) {
    return a === b;
}
function structuralComparer(a, b) {
    return deepEqual(a, b);
}
function defaultComparer(a, b) {
    return Object.is(a, b);
}
var comparer = {
    identity: identityComparer,
    structural: structuralComparer,
    default: defaultComparer
};
var mobxDidRunLazyInitializersSymbol = Symbol('mobx did run lazy initializers');
var mobxPendingDecorators = Symbol('mobx pending decorators');
var enumerableDescriptorCache = {};
var nonEnumerableDescriptorCache = {};
function createPropertyInitializerDescriptor(prop, enumerable) {
    var cache = enumerable ? enumerableDescriptorCache : nonEnumerableDescriptorCache;
    return cache[prop] || (cache[prop] = {
        configurable: true,
        enumerable: enumerable,
        get: function () {
            initializeInstance(this);
            return this[prop];
        },
        set: function (value) {
            initializeInstance(this);
            this[prop] = value;
        }
    });
}
function initializeInstance(target) {
    if (target[mobxDidRunLazyInitializersSymbol] === true)
        return;
    var decorators = target[mobxPendingDecorators];
    if (decorators) {
        addHiddenProp(target, mobxDidRunLazyInitializersSymbol, true);
        for (var key in decorators) {
            var d = decorators[key];
            d.propertyCreator(target, d.prop, d.descriptor, d.decoratorTarget, d.decoratorArguments);
        }
    }
}
function createPropDecorator(propertyInitiallyEnumerable, propertyCreator) {
    return function decoratorFactory() {
        var decoratorArguments;
        var decorator = function decorate(target, prop, descriptor, applyImmediately) {
            if (applyImmediately === true) {
                propertyCreator(target, prop, descriptor, target, decoratorArguments);
                return null;
            }
            if ('production' !== 'production' && !quacksLikeADecorator(arguments))
                fail('This function is a decorator, but it wasn\'t invoked like a decorator');
            if (!Object.prototype.hasOwnProperty.call(target, mobxPendingDecorators)) {
                var inheritedDecorators = target[mobxPendingDecorators];
                addHiddenProp(target, mobxPendingDecorators, __assign({}, inheritedDecorators));
            }
            target[mobxPendingDecorators][prop] = {
                prop: prop,
                propertyCreator: propertyCreator,
                descriptor: descriptor,
                decoratorTarget: target,
                decoratorArguments: decoratorArguments
            };
            return createPropertyInitializerDescriptor(prop, propertyInitiallyEnumerable);
        };
        if (quacksLikeADecorator(arguments)) {
            decoratorArguments = EMPTY_ARRAY;
            return decorator.apply(null, arguments);
        } else {
            decoratorArguments = Array.prototype.slice.call(arguments);
            return decorator;
        }
    };
}
function quacksLikeADecorator(args) {
    return (args.length === 2 || args.length === 3) && typeof args[1] === 'string' || args.length === 4 && args[3] === true;
}
function deepEnhancer(v, _, name) {
    if (isObservable(v))
        return v;
    if (Array.isArray(v))
        return observable.array(v, { name: name });
    if (isPlainObject(v))
        return observable.object(v, undefined, { name: name });
    if (isES6Map(v))
        return observable.map(v, { name: name });
    if (isES6Set(v))
        return observable.set(v, { name: name });
    return v;
}
function shallowEnhancer(v, _, name) {
    if (v === undefined || v === null)
        return v;
    if (isObservableObject(v) || isObservableArray(v) || isObservableMap(v) || isObservableSet(v))
        return v;
    if (Array.isArray(v))
        return observable.array(v, {
            name: name,
            deep: false
        });
    if (isPlainObject(v))
        return observable.object(v, undefined, {
            name: name,
            deep: false
        });
    if (isES6Map(v))
        return observable.map(v, {
            name: name,
            deep: false
        });
    if (isES6Set(v))
        return observable.set(v, {
            name: name,
            deep: false
        });
    return fail('production' !== 'production' && 'The shallow modifier / decorator can only used in combination with arrays, objects, maps and sets');
}
function referenceEnhancer(newValue) {
    return newValue;
}
function refStructEnhancer(v, oldValue, name) {
    if ('production' !== 'production' && isObservable(v))
        throw 'observable.struct should not be used with observable values';
    if (deepEqual(v, oldValue))
        return oldValue;
    return v;
}
function createDecoratorForEnhancer(enhancer) {
    invariant(enhancer);
    var decorator = createPropDecorator(true, function (target, propertyName, descriptor, _decoratorTarget, decoratorArgs) {
        var initialValue = descriptor ? descriptor.initializer ? descriptor.initializer.call(target) : descriptor.value : undefined;
        asObservableObject(target).addObservableProp(propertyName, initialValue, enhancer);
    });
    var res = typeof undefined !== 'undefined' && process.env && 'production' !== 'production' ? function observableDecorator() {
        if (arguments.length < 2)
            return fail('Incorrect decorator invocation. @observable decorator doesn\'t expect any arguments');
        return decorator.apply(null, arguments);
    } : decorator;
    res.enhancer = enhancer;
    return res;
}
var defaultCreateObservableOptions = {
    deep: true,
    name: undefined,
    defaultDecorator: undefined,
    proxy: true
};
Object.freeze(defaultCreateObservableOptions);
function assertValidOption(key) {
    if (!/^(deep|name|equals|defaultDecorator|proxy)$/.test(key))
        fail('invalid option for (extend)observable: ' + key);
}
function asCreateObservableOptions(thing) {
    if (thing === null || thing === undefined)
        return defaultCreateObservableOptions;
    if (typeof thing === 'string')
        return {
            name: thing,
            deep: true,
            proxy: true
        };
    return thing;
}
var deepDecorator = createDecoratorForEnhancer(deepEnhancer);
var shallowDecorator = createDecoratorForEnhancer(shallowEnhancer);
var refDecorator = createDecoratorForEnhancer(referenceEnhancer);
var refStructDecorator = createDecoratorForEnhancer(refStructEnhancer);
function getEnhancerFromOptions(options) {
    return options.defaultDecorator ? options.defaultDecorator.enhancer : options.deep === false ? referenceEnhancer : deepEnhancer;
}
function createObservable(v, arg2, arg3) {
    if (typeof arguments[1] === 'string') {
        return deepDecorator.apply(null, arguments);
    }
    if (isObservable(v))
        return v;
    var res = isPlainObject(v) ? observable.object(v, arg2, arg3) : Array.isArray(v) ? observable.array(v, arg2) : isES6Map(v) ? observable.map(v, arg2) : isES6Set(v) ? observable.set(v, arg2) : v;
    if (res !== v)
        return res;
    fail('production' !== 'production' && 'The provided value could not be converted into an observable. If you want just create an observable reference to the object use \'observable.box(value)\'');
}
var observableFactories = {
    box: function (value, options) {
        if (arguments.length > 2)
            incorrectlyUsedAsDecorator('box');
        var o = asCreateObservableOptions(options);
        return new ObservableValue(value, getEnhancerFromOptions(o), o.name, true, o.equals);
    },
    array: function (initialValues, options) {
        if (arguments.length > 2)
            incorrectlyUsedAsDecorator('array');
        var o = asCreateObservableOptions(options);
        return createObservableArray(initialValues, getEnhancerFromOptions(o), o.name);
    },
    map: function (initialValues, options) {
        if (arguments.length > 2)
            incorrectlyUsedAsDecorator('map');
        var o = asCreateObservableOptions(options);
        return new ObservableMap(initialValues, getEnhancerFromOptions(o), o.name);
    },
    set: function (initialValues, options) {
        if (arguments.length > 2)
            incorrectlyUsedAsDecorator('set');
        var o = asCreateObservableOptions(options);
        return new ObservableSet(initialValues, getEnhancerFromOptions(o), o.name);
    },
    object: function (props, decorators, options) {
        if (typeof arguments[1] === 'string')
            incorrectlyUsedAsDecorator('object');
        var o = asCreateObservableOptions(options);
        if (o.proxy === false) {
            return extendObservable({}, props, decorators, o);
        } else {
            var defaultDecorator = getDefaultDecoratorFromObjectOptions(o);
            var base = extendObservable({}, undefined, undefined, o);
            var proxy = createDynamicObservableObject(base);
            extendObservableObjectWithProperties(proxy, props, decorators, defaultDecorator);
            return proxy;
        }
    },
    ref: refDecorator,
    shallow: shallowDecorator,
    deep: deepDecorator,
    struct: refStructDecorator
};
var observable = createObservable;
Object.keys(observableFactories).forEach(function (name) {
    return observable[name] = observableFactories[name];
});
function incorrectlyUsedAsDecorator(methodName) {
    fail('Expected one or two arguments to observable.' + methodName + '. Did you accidentally try to use observable.' + methodName + ' as decorator?');
}
var computedDecorator = createPropDecorator(false, function (instance, propertyName, descriptor, decoratorTarget, decoratorArgs) {
    var get = descriptor.get, set = descriptor.set;
    var options = decoratorArgs[0] || {};
    asObservableObject(instance).addComputedProp(instance, propertyName, __assign({
        get: get,
        set: set,
        context: instance
    }, options));
});
var computedStructDecorator = computedDecorator({ equals: comparer.structural });
var computed = function computed(arg1, arg2, arg3) {
    if (typeof arg2 === 'string') {
        return computedDecorator.apply(null, arguments);
    }
    if (arg1 !== null && typeof arg1 === 'object' && arguments.length === 1) {
        return computedDecorator.apply(null, arguments);
    }
    var opts = typeof arg2 === 'object' ? arg2 : {};
    opts.get = arg1;
    opts.set = typeof arg2 === 'function' ? arg2 : opts.set;
    opts.name = opts.name || arg1.name || '';
    return new ComputedValue(opts);
};
computed.struct = computedStructDecorator;
function createAction(actionName, fn, ref) {
    var res = function () {
        return executeAction(actionName, fn, ref || this, arguments);
    };
    res.isMobxAction = true;
    return res;
}
function executeAction(actionName, fn, scope, args) {
    var runInfo = startAction(actionName, fn, scope, args);
    var shouldSupressReactionError = true;
    try {
        var res = fn.apply(scope, args);
        shouldSupressReactionError = false;
        return res;
    } finally {
        if (shouldSupressReactionError) {
            globalState.suppressReactionErrors = shouldSupressReactionError;
            endAction(runInfo);
            globalState.suppressReactionErrors = false;
        } else {
            endAction(runInfo);
        }
    }
}
function startAction(actionName, fn, scope, args) {
    var notifySpy = isSpyEnabled() && !!actionName;
    var startTime = 0;
    if (notifySpy && 'production' !== 'production') {
        startTime = Date.now();
        var l = args && args.length || 0;
        var flattendArgs = new Array(l);
        if (l > 0)
            for (var i = 0; i < l; i++)
                flattendArgs[i] = args[i];
        spyReportStart({
            type: 'action',
            name: actionName,
            object: scope,
            arguments: flattendArgs
        });
    }
    var prevDerivation = untrackedStart();
    startBatch();
    var prevAllowStateChanges = allowStateChangesStart(true);
    return {
        prevDerivation: prevDerivation,
        prevAllowStateChanges: prevAllowStateChanges,
        notifySpy: notifySpy,
        startTime: startTime
    };
}
function endAction(runInfo) {
    allowStateChangesEnd(runInfo.prevAllowStateChanges);
    endBatch();
    untrackedEnd(runInfo.prevDerivation);
    if (runInfo.notifySpy && 'production' !== 'production')
        spyReportEnd({ time: Date.now() - runInfo.startTime });
}
function allowStateChanges(allowStateChanges, func) {
    var prev = allowStateChangesStart(allowStateChanges);
    var res;
    try {
        res = func();
    } finally {
        allowStateChangesEnd(prev);
    }
    return res;
}
function allowStateChangesStart(allowStateChanges) {
    var prev = globalState.allowStateChanges;
    globalState.allowStateChanges = allowStateChanges;
    return prev;
}
function allowStateChangesEnd(prev) {
    globalState.allowStateChanges = prev;
}
function allowStateChangesInsideComputed(func) {
    var prev = globalState.computationDepth;
    globalState.computationDepth = 0;
    var res;
    try {
        res = func();
    } finally {
        globalState.computationDepth = prev;
    }
    return res;
}
var ObservableValue = function (_super) {
    __extends(ObservableValue, _super);
    function ObservableValue(value, enhancer, name, notifySpy, equals) {
        if (name === void 0) {
            name = 'ObservableValue@' + getNextId();
        }
        if (notifySpy === void 0) {
            notifySpy = true;
        }
        if (equals === void 0) {
            equals = comparer.default;
        }
        var _this = _super.call(this, name) || this;
        _this.enhancer = enhancer;
        _this.name = name;
        _this.equals = equals;
        _this.hasUnreportedChange = false;
        _this.value = enhancer(value, undefined, name);
        if (notifySpy && isSpyEnabled() && 'production' !== 'production') {
            spyReport({
                type: 'create',
                name: _this.name,
                newValue: '' + _this.value
            });
        }
        return _this;
    }
    ObservableValue.prototype.dehanceValue = function (value) {
        if (this.dehancer !== undefined)
            return this.dehancer(value);
        return value;
    };
    ObservableValue.prototype.set = function (newValue) {
        var oldValue = this.value;
        newValue = this.prepareNewValue(newValue);
        if (newValue !== globalState.UNCHANGED) {
            var notifySpy = isSpyEnabled();
            if (notifySpy && 'production' !== 'production') {
                spyReportStart({
                    type: 'update',
                    name: this.name,
                    newValue: newValue,
                    oldValue: oldValue
                });
            }
            this.setNewValue(newValue);
            if (notifySpy && 'production' !== 'production')
                spyReportEnd();
        }
    };
    ObservableValue.prototype.prepareNewValue = function (newValue) {
        checkIfStateModificationsAreAllowed(this);
        if (hasInterceptors(this)) {
            var change = interceptChange(this, {
                object: this,
                type: 'update',
                newValue: newValue
            });
            if (!change)
                return globalState.UNCHANGED;
            newValue = change.newValue;
        }
        newValue = this.enhancer(newValue, this.value, this.name);
        return this.equals(this.value, newValue) ? globalState.UNCHANGED : newValue;
    };
    ObservableValue.prototype.setNewValue = function (newValue) {
        var oldValue = this.value;
        this.value = newValue;
        this.reportChanged();
        if (hasListeners(this)) {
            notifyListeners(this, {
                type: 'update',
                object: this,
                newValue: newValue,
                oldValue: oldValue
            });
        }
    };
    ObservableValue.prototype.get = function () {
        this.reportObserved();
        return this.dehanceValue(this.value);
    };
    ObservableValue.prototype.intercept = function (handler) {
        return registerInterceptor(this, handler);
    };
    ObservableValue.prototype.observe = function (listener, fireImmediately) {
        if (fireImmediately)
            listener({
                object: this,
                type: 'update',
                newValue: this.value,
                oldValue: undefined
            });
        return registerListener(this, listener);
    };
    ObservableValue.prototype.toJSON = function () {
        return this.get();
    };
    ObservableValue.prototype.toString = function () {
        return this.name + '[' + this.value + ']';
    };
    ObservableValue.prototype.valueOf = function () {
        return toPrimitive(this.get());
    };
    ObservableValue.prototype[Symbol.toPrimitive] = function () {
        return this.valueOf();
    };
    return ObservableValue;
}(Atom);
var isObservableValue = createInstanceofPredicate('ObservableValue', ObservableValue);
var ComputedValue = function () {
    function ComputedValue(options) {
        this.dependenciesState = exports.IDerivationState.NOT_TRACKING;
        this.observing = [];
        this.newObserving = null;
        this.isBeingObserved = false;
        this.isPendingUnobservation = false;
        this.observers = new Set();
        this.diffValue = 0;
        this.runId = 0;
        this.lastAccessedBy = 0;
        this.lowestObserverState = exports.IDerivationState.UP_TO_DATE;
        this.unboundDepsCount = 0;
        this.__mapid = '#' + getNextId();
        this.value = new CaughtException(null);
        this.isComputing = false;
        this.isRunningSetter = false;
        this.isTracing = TraceMode.NONE;
        if ('production' !== 'production' && !options.get)
            throw '[mobx] missing option for computed: get';
        this.derivation = options.get;
        this.name = options.name || 'ComputedValue@' + getNextId();
        if (options.set)
            this.setter = createAction(this.name + '-setter', options.set);
        this.equals = options.equals || (options.compareStructural || options.struct ? comparer.structural : comparer.default);
        this.scope = options.context;
        this.requiresReaction = !!options.requiresReaction;
        this.keepAlive = !!options.keepAlive;
    }
    ComputedValue.prototype.onBecomeStale = function () {
        propagateMaybeChanged(this);
    };
    ComputedValue.prototype.onBecomeObserved = function () {
        if (this.onBecomeObservedListeners) {
            this.onBecomeObservedListeners.forEach(function (listener) {
                return listener();
            });
        }
    };
    ComputedValue.prototype.onBecomeUnobserved = function () {
        if (this.onBecomeUnobservedListeners) {
            this.onBecomeUnobservedListeners.forEach(function (listener) {
                return listener();
            });
        }
    };
    ComputedValue.prototype.get = function () {
        if (this.isComputing)
            fail('Cycle detected in computation ' + this.name + ': ' + this.derivation);
        if (globalState.inBatch === 0 && this.observers.size === 0 && !this.keepAlive) {
            if (shouldCompute(this)) {
                this.warnAboutUntrackedRead();
                startBatch();
                this.value = this.computeValue(false);
                endBatch();
            }
        } else {
            reportObserved(this);
            if (shouldCompute(this))
                if (this.trackAndCompute())
                    propagateChangeConfirmed(this);
        }
        var result = this.value;
        if (isCaughtException(result))
            throw result.cause;
        return result;
    };
    ComputedValue.prototype.peek = function () {
        var res = this.computeValue(false);
        if (isCaughtException(res))
            throw res.cause;
        return res;
    };
    ComputedValue.prototype.set = function (value) {
        if (this.setter) {
            invariant(!this.isRunningSetter, 'The setter of computed value \'' + this.name + '\' is trying to update itself. Did you intend to update an _observable_ value, instead of the computed property?');
            this.isRunningSetter = true;
            try {
                this.setter.call(this.scope, value);
            } finally {
                this.isRunningSetter = false;
            }
        } else
            invariant(false, 'production' !== 'production' && '[ComputedValue \'' + this.name + '\'] It is not possible to assign a new value to a computed value.');
    };
    ComputedValue.prototype.trackAndCompute = function () {
        if (isSpyEnabled() && 'production' !== 'production') {
            spyReport({
                object: this.scope,
                type: 'compute',
                name: this.name
            });
        }
        var oldValue = this.value;
        var wasSuspended = this.dependenciesState === exports.IDerivationState.NOT_TRACKING;
        var newValue = this.computeValue(true);
        var changed = wasSuspended || isCaughtException(oldValue) || isCaughtException(newValue) || !this.equals(oldValue, newValue);
        if (changed) {
            this.value = newValue;
        }
        return changed;
    };
    ComputedValue.prototype.computeValue = function (track) {
        this.isComputing = true;
        globalState.computationDepth++;
        var res;
        if (track) {
            res = trackDerivedFunction(this, this.derivation, this.scope);
        } else {
            if (globalState.disableErrorBoundaries === true) {
                res = this.derivation.call(this.scope);
            } else {
                try {
                    res = this.derivation.call(this.scope);
                } catch (e) {
                    res = new CaughtException(e);
                }
            }
        }
        globalState.computationDepth--;
        this.isComputing = false;
        return res;
    };
    ComputedValue.prototype.suspend = function () {
        if (!this.keepAlive) {
            clearObserving(this);
            this.value = undefined;
        }
    };
    ComputedValue.prototype.observe = function (listener, fireImmediately) {
        var _this = this;
        var firstTime = true;
        var prevValue = undefined;
        return autorun(function () {
            var newValue = _this.get();
            if (!firstTime || fireImmediately) {
                var prevU = untrackedStart();
                listener({
                    type: 'update',
                    object: _this,
                    newValue: newValue,
                    oldValue: prevValue
                });
                untrackedEnd(prevU);
            }
            firstTime = false;
            prevValue = newValue;
        });
    };
    ComputedValue.prototype.warnAboutUntrackedRead = function () {
        return;
        if (this.requiresReaction === true) {
            fail('[mobx] Computed value ' + this.name + ' is read outside a reactive context');
        }
        if (this.isTracing !== TraceMode.NONE) {
            console.log('[mobx.trace] \'' + this.name + '\' is being read outside a reactive context. Doing a full recompute');
        }
        if (globalState.computedRequiresReaction) {
            console.warn('[mobx] Computed value ' + this.name + ' is being read outside a reactive context. Doing a full recompute');
        }
    };
    ComputedValue.prototype.toJSON = function () {
        return this.get();
    };
    ComputedValue.prototype.toString = function () {
        return this.name + '[' + this.derivation.toString() + ']';
    };
    ComputedValue.prototype.valueOf = function () {
        return toPrimitive(this.get());
    };
    ComputedValue.prototype[Symbol.toPrimitive] = function () {
        return this.valueOf();
    };
    return ComputedValue;
}();
var isComputedValue = createInstanceofPredicate('ComputedValue', ComputedValue);
(function (IDerivationState) {
    IDerivationState[IDerivationState['NOT_TRACKING'] = -1] = 'NOT_TRACKING';
    IDerivationState[IDerivationState['UP_TO_DATE'] = 0] = 'UP_TO_DATE';
    IDerivationState[IDerivationState['POSSIBLY_STALE'] = 1] = 'POSSIBLY_STALE';
    IDerivationState[IDerivationState['STALE'] = 2] = 'STALE';
}(exports.IDerivationState || (exports.IDerivationState = {})));
var TraceMode;
(function (TraceMode) {
    TraceMode[TraceMode['NONE'] = 0] = 'NONE';
    TraceMode[TraceMode['LOG'] = 1] = 'LOG';
    TraceMode[TraceMode['BREAK'] = 2] = 'BREAK';
}(TraceMode || (TraceMode = {})));
var CaughtException = function () {
    function CaughtException(cause) {
        this.cause = cause;
    }
    return CaughtException;
}();
function isCaughtException(e) {
    return e instanceof CaughtException;
}
function shouldCompute(derivation) {
    switch (derivation.dependenciesState) {
    case exports.IDerivationState.UP_TO_DATE:
        return false;
    case exports.IDerivationState.NOT_TRACKING:
    case exports.IDerivationState.STALE:
        return true;
    case exports.IDerivationState.POSSIBLY_STALE: {
            var prevUntracked = untrackedStart();
            var obs = derivation.observing, l = obs.length;
            for (var i = 0; i < l; i++) {
                var obj = obs[i];
                if (isComputedValue(obj)) {
                    if (globalState.disableErrorBoundaries) {
                        obj.get();
                    } else {
                        try {
                            obj.get();
                        } catch (e) {
                            untrackedEnd(prevUntracked);
                            return true;
                        }
                    }
                    if (derivation.dependenciesState === exports.IDerivationState.STALE) {
                        untrackedEnd(prevUntracked);
                        return true;
                    }
                }
            }
            changeDependenciesStateTo0(derivation);
            untrackedEnd(prevUntracked);
            return false;
        }
    }
}
function isComputingDerivation() {
    return globalState.trackingDerivation !== null;
}
function checkIfStateModificationsAreAllowed(atom) {
    var hasObservers = atom.observers.size > 0;
    if (globalState.computationDepth > 0 && hasObservers)
        fail('production' !== 'production' && 'Computed values are not allowed to cause side effects by changing observables that are already being observed. Tried to modify: ' + atom.name);
    if (!globalState.allowStateChanges && (hasObservers || globalState.enforceActions === 'strict'))
        fail('production' !== 'production' && (globalState.enforceActions ? 'Since strict-mode is enabled, changing observed observable values outside actions is not allowed. Please wrap the code in an `action` if this change is intended. Tried to modify: ' : 'Side effects like changing state are not allowed at this point. Are you trying to modify state from, for example, the render function of a React component? Tried to modify: ') + atom.name);
}
function trackDerivedFunction(derivation, f, context) {
    changeDependenciesStateTo0(derivation);
    derivation.newObserving = new Array(derivation.observing.length + 100);
    derivation.unboundDepsCount = 0;
    derivation.runId = ++globalState.runId;
    var prevTracking = globalState.trackingDerivation;
    globalState.trackingDerivation = derivation;
    var result;
    if (globalState.disableErrorBoundaries === true) {
        result = f.call(context);
    } else {
        try {
            result = f.call(context);
        } catch (e) {
            result = new CaughtException(e);
        }
    }
    globalState.trackingDerivation = prevTracking;
    bindDependencies(derivation);
    return result;
}
function bindDependencies(derivation) {
    var prevObserving = derivation.observing;
    var observing = derivation.observing = derivation.newObserving;
    var lowestNewObservingDerivationState = exports.IDerivationState.UP_TO_DATE;
    var i0 = 0, l = derivation.unboundDepsCount;
    for (var i = 0; i < l; i++) {
        var dep = observing[i];
        if (dep.diffValue === 0) {
            dep.diffValue = 1;
            if (i0 !== i)
                observing[i0] = dep;
            i0++;
        }
        if (dep.dependenciesState > lowestNewObservingDerivationState) {
            lowestNewObservingDerivationState = dep.dependenciesState;
        }
    }
    observing.length = i0;
    derivation.newObserving = null;
    l = prevObserving.length;
    while (l--) {
        var dep = prevObserving[l];
        if (dep.diffValue === 0) {
            removeObserver(dep, derivation);
        }
        dep.diffValue = 0;
    }
    while (i0--) {
        var dep = observing[i0];
        if (dep.diffValue === 1) {
            dep.diffValue = 0;
            addObserver(dep, derivation);
        }
    }
    if (lowestNewObservingDerivationState !== exports.IDerivationState.UP_TO_DATE) {
        derivation.dependenciesState = lowestNewObservingDerivationState;
        derivation.onBecomeStale();
    }
}
function clearObserving(derivation) {
    var obs = derivation.observing;
    derivation.observing = [];
    var i = obs.length;
    while (i--)
        removeObserver(obs[i], derivation);
    derivation.dependenciesState = exports.IDerivationState.NOT_TRACKING;
}
function untracked(action) {
    var prev = untrackedStart();
    try {
        return action();
    } finally {
        untrackedEnd(prev);
    }
}
function untrackedStart() {
    var prev = globalState.trackingDerivation;
    globalState.trackingDerivation = null;
    return prev;
}
function untrackedEnd(prev) {
    globalState.trackingDerivation = prev;
}
function changeDependenciesStateTo0(derivation) {
    if (derivation.dependenciesState === exports.IDerivationState.UP_TO_DATE)
        return;
    derivation.dependenciesState = exports.IDerivationState.UP_TO_DATE;
    var obs = derivation.observing;
    var i = obs.length;
    while (i--)
        obs[i].lowestObserverState = exports.IDerivationState.UP_TO_DATE;
}
var persistentKeys = [
    'mobxGuid',
    'spyListeners',
    'enforceActions',
    'computedRequiresReaction',
    'disableErrorBoundaries',
    'runId',
    'UNCHANGED'
];
var MobXGlobals = function () {
    function MobXGlobals() {
        this.version = 5;
        this.UNCHANGED = {};
        this.trackingDerivation = null;
        this.computationDepth = 0;
        this.runId = 0;
        this.mobxGuid = 0;
        this.inBatch = 0;
        this.pendingUnobservations = [];
        this.pendingReactions = [];
        this.isRunningReactions = false;
        this.allowStateChanges = true;
        this.enforceActions = false;
        this.spyListeners = [];
        this.globalReactionErrorHandlers = [];
        this.computedRequiresReaction = false;
        this.disableErrorBoundaries = false;
        this.suppressReactionErrors = false;
    }
    return MobXGlobals;
}();
var canMergeGlobalState = true;
var isolateCalled = false;
var globalState = function () {
    var global = getGlobal();
    if (global.__mobxInstanceCount > 0 && !global.__mobxGlobals)
        canMergeGlobalState = false;
    if (global.__mobxGlobals && global.__mobxGlobals.version !== new MobXGlobals().version)
        canMergeGlobalState = false;
    if (!canMergeGlobalState) {
        setTimeout(function () {
            if (!isolateCalled) {
                fail('There are multiple, different versions of MobX active. Make sure MobX is loaded only once or use `configure({ isolateGlobalState: true })`');
            }
        }, 1);
        return new MobXGlobals();
    } else if (global.__mobxGlobals) {
        global.__mobxInstanceCount += 1;
        if (!global.__mobxGlobals.UNCHANGED)
            global.__mobxGlobals.UNCHANGED = {};
        return global.__mobxGlobals;
    } else {
        global.__mobxInstanceCount = 1;
        return global.__mobxGlobals = new MobXGlobals();
    }
}();
function isolateGlobalState() {
    if (globalState.pendingReactions.length || globalState.inBatch || globalState.isRunningReactions)
        fail('isolateGlobalState should be called before MobX is running any reactions');
    isolateCalled = true;
    if (canMergeGlobalState) {
        if (--getGlobal().__mobxInstanceCount === 0)
            getGlobal().__mobxGlobals = undefined;
        globalState = new MobXGlobals();
    }
}
function getGlobalState() {
    return globalState;
}
function resetGlobalState() {
    var defaultGlobals = new MobXGlobals();
    for (var key in defaultGlobals)
        if (persistentKeys.indexOf(key) === -1)
            globalState[key] = defaultGlobals[key];
    globalState.allowStateChanges = !globalState.enforceActions;
}
function getGlobal() {
    return 'object' !== 'undefined' ? window : global;
}
function hasObservers(observable) {
    return observable.observers && observable.observers.size > 0;
}
function getObservers(observable) {
    return observable.observers;
}
function addObserver(observable, node) {
    observable.observers.add(node);
    if (observable.lowestObserverState > node.dependenciesState)
        observable.lowestObserverState = node.dependenciesState;
}
function removeObserver(observable, node) {
    observable.observers.delete(node);
    if (observable.observers.size === 0) {
        queueForUnobservation(observable);
    }
}
function queueForUnobservation(observable) {
    if (observable.isPendingUnobservation === false) {
        observable.isPendingUnobservation = true;
        globalState.pendingUnobservations.push(observable);
    }
}
function startBatch() {
    globalState.inBatch++;
}
function endBatch() {
    if (--globalState.inBatch === 0) {
        runReactions();
        var list = globalState.pendingUnobservations;
        for (var i = 0; i < list.length; i++) {
            var observable = list[i];
            observable.isPendingUnobservation = false;
            if (observable.observers.size === 0) {
                if (observable.isBeingObserved) {
                    observable.isBeingObserved = false;
                    observable.onBecomeUnobserved();
                }
                if (observable instanceof ComputedValue) {
                    observable.suspend();
                }
            }
        }
        globalState.pendingUnobservations = [];
    }
}
function reportObserved(observable) {
    var derivation = globalState.trackingDerivation;
    if (derivation !== null) {
        if (derivation.runId !== observable.lastAccessedBy) {
            observable.lastAccessedBy = derivation.runId;
            derivation.newObserving[derivation.unboundDepsCount++] = observable;
            if (!observable.isBeingObserved) {
                observable.isBeingObserved = true;
                observable.onBecomeObserved();
            }
        }
        return true;
    } else if (observable.observers.size === 0 && globalState.inBatch > 0) {
        queueForUnobservation(observable);
    }
    return false;
}
function propagateChanged(observable) {
    if (observable.lowestObserverState === exports.IDerivationState.STALE)
        return;
    observable.lowestObserverState = exports.IDerivationState.STALE;
    observable.observers.forEach(function (d) {
        if (d.dependenciesState === exports.IDerivationState.UP_TO_DATE) {
            if (d.isTracing !== TraceMode.NONE) {
                logTraceInfo(d, observable);
            }
            d.onBecomeStale();
        }
        d.dependenciesState = exports.IDerivationState.STALE;
    });
}
function propagateChangeConfirmed(observable) {
    if (observable.lowestObserverState === exports.IDerivationState.STALE)
        return;
    observable.lowestObserverState = exports.IDerivationState.STALE;
    observable.observers.forEach(function (d) {
        if (d.dependenciesState === exports.IDerivationState.POSSIBLY_STALE)
            d.dependenciesState = exports.IDerivationState.STALE;
        else if (d.dependenciesState === exports.IDerivationState.UP_TO_DATE)
            observable.lowestObserverState = exports.IDerivationState.UP_TO_DATE;
    });
}
function propagateMaybeChanged(observable) {
    if (observable.lowestObserverState !== exports.IDerivationState.UP_TO_DATE)
        return;
    observable.lowestObserverState = exports.IDerivationState.POSSIBLY_STALE;
    observable.observers.forEach(function (d) {
        if (d.dependenciesState === exports.IDerivationState.UP_TO_DATE) {
            d.dependenciesState = exports.IDerivationState.POSSIBLY_STALE;
            if (d.isTracing !== TraceMode.NONE) {
                logTraceInfo(d, observable);
            }
            d.onBecomeStale();
        }
    });
}
function logTraceInfo(derivation, observable) {
    console.log('[mobx.trace] \'' + derivation.name + '\' is invalidated due to a change in: \'' + observable.name + '\'');
    if (derivation.isTracing === TraceMode.BREAK) {
        var lines = [];
        printDepTree(getDependencyTree(derivation), lines, 1);
        new Function('debugger;\n/*\nTracing \'' + derivation.name + '\'\n\nYou are entering this break point because derivation \'' + derivation.name + '\' is being traced and \'' + observable.name + '\' is now forcing it to update.\nJust follow the stacktrace you should now see in the devtools to see precisely what piece of your code is causing this update\nThe stackframe you are looking for is at least ~6-8 stack-frames up.\n\n' + (derivation instanceof ComputedValue ? derivation.derivation.toString().replace(/[*]\//g, '/') : '') + '\n\nThe dependencies for this derivation are:\n\n' + lines.join('\n') + '\n*/\n    ')();
    }
}
function printDepTree(tree, lines, depth) {
    if (lines.length >= 1000) {
        lines.push('(and many more)');
        return;
    }
    lines.push('' + new Array(depth).join('\t') + tree.name);
    if (tree.dependencies)
        tree.dependencies.forEach(function (child) {
            return printDepTree(child, lines, depth + 1);
        });
}
var Reaction = function () {
    function Reaction(name, onInvalidate, errorHandler) {
        if (name === void 0) {
            name = 'Reaction@' + getNextId();
        }
        this.name = name;
        this.onInvalidate = onInvalidate;
        this.errorHandler = errorHandler;
        this.observing = [];
        this.newObserving = [];
        this.dependenciesState = exports.IDerivationState.NOT_TRACKING;
        this.diffValue = 0;
        this.runId = 0;
        this.unboundDepsCount = 0;
        this.__mapid = '#' + getNextId();
        this.isDisposed = false;
        this._isScheduled = false;
        this._isTrackPending = false;
        this._isRunning = false;
        this.isTracing = TraceMode.NONE;
    }
    Reaction.prototype.onBecomeStale = function () {
        this.schedule();
    };
    Reaction.prototype.schedule = function () {
        if (!this._isScheduled) {
            this._isScheduled = true;
            globalState.pendingReactions.push(this);
            runReactions();
        }
    };
    Reaction.prototype.isScheduled = function () {
        return this._isScheduled;
    };
    Reaction.prototype.runReaction = function () {
        if (!this.isDisposed) {
            startBatch();
            this._isScheduled = false;
            if (shouldCompute(this)) {
                this._isTrackPending = true;
                try {
                    this.onInvalidate();
                    if (this._isTrackPending && isSpyEnabled() && 'production' !== 'production') {
                        spyReport({
                            name: this.name,
                            type: 'scheduled-reaction'
                        });
                    }
                } catch (e) {
                    this.reportExceptionInDerivation(e);
                }
            }
            endBatch();
        }
    };
    Reaction.prototype.track = function (fn) {
        if (this.isDisposed) {
            return;
        }
        startBatch();
        var notify = isSpyEnabled();
        var startTime;
        if (notify && 'production' !== 'production') {
            startTime = Date.now();
            spyReportStart({
                name: this.name,
                type: 'reaction'
            });
        }
        this._isRunning = true;
        var result = trackDerivedFunction(this, fn, undefined);
        this._isRunning = false;
        this._isTrackPending = false;
        if (this.isDisposed) {
            clearObserving(this);
        }
        if (isCaughtException(result))
            this.reportExceptionInDerivation(result.cause);
        if (notify && 'production' !== 'production') {
            spyReportEnd({ time: Date.now() - startTime });
        }
        endBatch();
    };
    Reaction.prototype.reportExceptionInDerivation = function (error) {
        var _this = this;
        if (this.errorHandler) {
            this.errorHandler(error, this);
            return;
        }
        if (globalState.disableErrorBoundaries)
            throw error;
        var message = '[mobx] Encountered an uncaught exception that was thrown by a reaction or observer component, in: \'' + this + '\'';
        if (globalState.suppressReactionErrors) {
            console.warn('[mobx] (error in reaction \'' + this.name + '\' suppressed, fix error of causing action below)');
        } else {
            console.error(message, error);
        }
        if (isSpyEnabled()) {
            spyReport({
                type: 'error',
                name: this.name,
                message: message,
                error: '' + error
            });
        }
        globalState.globalReactionErrorHandlers.forEach(function (f) {
            return f(error, _this);
        });
    };
    Reaction.prototype.dispose = function () {
        if (!this.isDisposed) {
            this.isDisposed = true;
            if (!this._isRunning) {
                startBatch();
                clearObserving(this);
                endBatch();
            }
        }
    };
    Reaction.prototype.getDisposer = function () {
        var r = this.dispose.bind(this);
        r[$mobx] = this;
        return r;
    };
    Reaction.prototype.toString = function () {
        return 'Reaction[' + this.name + ']';
    };
    Reaction.prototype.trace = function (enterBreakPoint) {
        if (enterBreakPoint === void 0) {
            enterBreakPoint = false;
        }
        trace(this, enterBreakPoint);
    };
    return Reaction;
}();
function onReactionError(handler) {
    globalState.globalReactionErrorHandlers.push(handler);
    return function () {
        var idx = globalState.globalReactionErrorHandlers.indexOf(handler);
        if (idx >= 0)
            globalState.globalReactionErrorHandlers.splice(idx, 1);
    };
}
var MAX_REACTION_ITERATIONS = 100;
var reactionScheduler = function (f) {
    return f();
};
function runReactions() {
    if (globalState.inBatch > 0 || globalState.isRunningReactions)
        return;
    reactionScheduler(runReactionsHelper);
}
function runReactionsHelper() {
    globalState.isRunningReactions = true;
    var allReactions = globalState.pendingReactions;
    var iterations = 0;
    while (allReactions.length > 0) {
        if (++iterations === MAX_REACTION_ITERATIONS) {
            console.error('Reaction doesn\'t converge to a stable state after ' + MAX_REACTION_ITERATIONS + ' iterations.' + (' Probably there is a cycle in the reactive function: ' + allReactions[0]));
            allReactions.splice(0);
        }
        var remainingReactions = allReactions.splice(0);
        for (var i = 0, l = remainingReactions.length; i < l; i++)
            remainingReactions[i].runReaction();
    }
    globalState.isRunningReactions = false;
}
var isReaction = createInstanceofPredicate('Reaction', Reaction);
function setReactionScheduler(fn) {
    var baseScheduler = reactionScheduler;
    reactionScheduler = function (f) {
        return fn(function () {
            return baseScheduler(f);
        });
    };
}
function isSpyEnabled() {
    return 'production' !== 'production' && !!globalState.spyListeners.length;
}
function spyReport(event) {
    return;
    if (!globalState.spyListeners.length)
        return;
    var listeners = globalState.spyListeners;
    for (var i = 0, l = listeners.length; i < l; i++)
        listeners[i](event);
}
function spyReportStart(event) {
    return;
    var change = __assign({}, event, { spyReportStart: true });
    spyReport(change);
}
var END_EVENT = { spyReportEnd: true };
function spyReportEnd(change) {
    return;
    if (change)
        spyReport(__assign({}, change, { spyReportEnd: true }));
    else
        spyReport(END_EVENT);
}
function spy(listener) {
    console.warn('[mobx.spy] Is a no-op in production builds');
    return function () {
    };
}
function dontReassignFields() {
    fail('production' !== 'production' && '@action fields are not reassignable');
}
function namedActionDecorator(name) {
    return function (target, prop, descriptor) {
        if (descriptor) {
            if ('production' !== 'production' && descriptor.get !== undefined) {
                return fail('@action cannot be used with getters');
            }
            if (descriptor.value) {
                return {
                    value: createAction(name, descriptor.value),
                    enumerable: false,
                    configurable: true,
                    writable: true
                };
            }
            var initializer_1 = descriptor.initializer;
            return {
                enumerable: false,
                configurable: true,
                writable: true,
                initializer: function () {
                    return createAction(name, initializer_1.call(this));
                }
            };
        }
        return actionFieldDecorator(name).apply(this, arguments);
    };
}
function actionFieldDecorator(name) {
    return function (target, prop, descriptor) {
        Object.defineProperty(target, prop, {
            configurable: true,
            enumerable: false,
            get: function () {
                return undefined;
            },
            set: function (value) {
                addHiddenProp(this, prop, action(name, value));
            }
        });
    };
}
function boundActionDecorator(target, propertyName, descriptor, applyToInstance) {
    if (applyToInstance === true) {
        defineBoundAction(target, propertyName, descriptor.value);
        return null;
    }
    if (descriptor) {
        return {
            configurable: true,
            enumerable: false,
            get: function () {
                defineBoundAction(this, propertyName, descriptor.value || descriptor.initializer.call(this));
                return this[propertyName];
            },
            set: dontReassignFields
        };
    }
    return {
        enumerable: false,
        configurable: true,
        set: function (v) {
            defineBoundAction(this, propertyName, v);
        },
        get: function () {
            return undefined;
        }
    };
}
var action = function action(arg1, arg2, arg3, arg4) {
    if (arguments.length === 1 && typeof arg1 === 'function')
        return createAction(arg1.name || '<unnamed action>', arg1);
    if (arguments.length === 2 && typeof arg2 === 'function')
        return createAction(arg1, arg2);
    if (arguments.length === 1 && typeof arg1 === 'string')
        return namedActionDecorator(arg1);
    if (arg4 === true) {
        addHiddenProp(arg1, arg2, createAction(arg1.name || arg2, arg3.value, this));
    } else {
        return namedActionDecorator(arg2).apply(null, arguments);
    }
};
action.bound = boundActionDecorator;
function runInAction(arg1, arg2) {
    var actionName = typeof arg1 === 'string' ? arg1 : arg1.name || '<unnamed action>';
    var fn = typeof arg1 === 'function' ? arg1 : arg2;
    return executeAction(actionName, fn, this, undefined);
}
function isAction(thing) {
    return typeof thing === 'function' && thing.isMobxAction === true;
}
function defineBoundAction(target, propertyName, fn) {
    addHiddenProp(target, propertyName, createAction(propertyName, fn.bind(target)));
}
function autorun(view, opts) {
    if (opts === void 0) {
        opts = EMPTY_OBJECT;
    }
    var name = opts && opts.name || view.name || 'Autorun@' + getNextId();
    var runSync = !opts.scheduler && !opts.delay;
    var reaction;
    if (runSync) {
        reaction = new Reaction(name, function () {
            this.track(reactionRunner);
        }, opts.onError);
    } else {
        var scheduler_1 = createSchedulerFromOptions(opts);
        var isScheduled_1 = false;
        reaction = new Reaction(name, function () {
            if (!isScheduled_1) {
                isScheduled_1 = true;
                scheduler_1(function () {
                    isScheduled_1 = false;
                    if (!reaction.isDisposed)
                        reaction.track(reactionRunner);
                });
            }
        }, opts.onError);
    }
    function reactionRunner() {
        view(reaction);
    }
    reaction.schedule();
    return reaction.getDisposer();
}
var run = function (f) {
    return f();
};
function createSchedulerFromOptions(opts) {
    return opts.scheduler ? opts.scheduler : opts.delay ? function (f) {
        return setTimeout(f, opts.delay);
    } : run;
}
function reaction(expression, effect, opts) {
    if (opts === void 0) {
        opts = EMPTY_OBJECT;
    }
    var name = opts.name || 'Reaction@' + getNextId();
    var effectAction = action(name, opts.onError ? wrapErrorHandler(opts.onError, effect) : effect);
    var runSync = !opts.scheduler && !opts.delay;
    var scheduler = createSchedulerFromOptions(opts);
    var firstTime = true;
    var isScheduled = false;
    var value;
    var equals = opts.compareStructural ? comparer.structural : opts.equals || comparer.default;
    var r = new Reaction(name, function () {
        if (firstTime || runSync) {
            reactionRunner();
        } else if (!isScheduled) {
            isScheduled = true;
            scheduler(reactionRunner);
        }
    }, opts.onError);
    function reactionRunner() {
        isScheduled = false;
        if (r.isDisposed)
            return;
        var changed = false;
        r.track(function () {
            var nextValue = expression(r);
            changed = firstTime || !equals(value, nextValue);
            value = nextValue;
        });
        if (firstTime && opts.fireImmediately)
            effectAction(value, r);
        if (!firstTime && changed === true)
            effectAction(value, r);
        if (firstTime)
            firstTime = false;
    }
    r.schedule();
    return r.getDisposer();
}
function wrapErrorHandler(errorHandler, baseFn) {
    return function () {
        try {
            return baseFn.apply(this, arguments);
        } catch (e) {
            errorHandler.call(this, e);
        }
    };
}
function onBecomeObserved(thing, arg2, arg3) {
    return interceptHook('onBecomeObserved', thing, arg2, arg3);
}
function onBecomeUnobserved(thing, arg2, arg3) {
    return interceptHook('onBecomeUnobserved', thing, arg2, arg3);
}
function interceptHook(hook, thing, arg2, arg3) {
    var atom = typeof arg2 === 'string' ? getAtom(thing, arg2) : getAtom(thing);
    var cb = typeof arg2 === 'string' ? arg3 : arg2;
    var listenersKey = hook + 'Listeners';
    if (atom[listenersKey]) {
        atom[listenersKey].add(cb);
    } else {
        atom[listenersKey] = new Set([cb]);
    }
    var orig = atom[hook];
    if (typeof orig !== 'function')
        return fail('production' !== 'production' && 'Not an atom that can be (un)observed');
    return function () {
        var hookListeners = atom[listenersKey];
        if (hookListeners) {
            hookListeners.delete(cb);
            if (hookListeners.size === 0) {
                delete atom[listenersKey];
            }
        }
    };
}
function configure(options) {
    var enforceActions = options.enforceActions, computedRequiresReaction = options.computedRequiresReaction, disableErrorBoundaries = options.disableErrorBoundaries, reactionScheduler = options.reactionScheduler;
    if (options.isolateGlobalState === true) {
        isolateGlobalState();
    }
    if (enforceActions !== undefined) {
        if (typeof enforceActions === 'boolean' || enforceActions === 'strict')
            deprecated('Deprecated value for \'enforceActions\', use \'false\' => \'"never"\', \'true\' => \'"observed"\', \'"strict"\' => "\'always\'" instead');
        var ea = void 0;
        switch (enforceActions) {
        case true:
        case 'observed':
            ea = true;
            break;
        case false:
        case 'never':
            ea = false;
            break;
        case 'strict':
        case 'always':
            ea = 'strict';
            break;
        default:
            fail('Invalid value for \'enforceActions\': \'' + enforceActions + '\', expected \'never\', \'always\' or \'observed\'');
        }
        globalState.enforceActions = ea;
        globalState.allowStateChanges = ea === true || ea === 'strict' ? false : true;
    }
    if (computedRequiresReaction !== undefined) {
        globalState.computedRequiresReaction = !!computedRequiresReaction;
    }
    if (disableErrorBoundaries !== undefined) {
        if (disableErrorBoundaries === true)
            console.warn('WARNING: Debug feature only. MobX will NOT recover from errors when `disableErrorBoundaries` is enabled.');
        globalState.disableErrorBoundaries = !!disableErrorBoundaries;
    }
    if (reactionScheduler) {
        setReactionScheduler(reactionScheduler);
    }
}
function decorate(thing, decorators) {
    'production' !== 'production' && invariant(isPlainObject(decorators), 'Decorators should be a key value map');
    var target = typeof thing === 'function' ? thing.prototype : thing;
    var _loop_1 = function (prop) {
        var propertyDecorators = decorators[prop];
        if (!Array.isArray(propertyDecorators)) {
            propertyDecorators = [propertyDecorators];
        }
        'production' !== 'production' && invariant(propertyDecorators.every(function (decorator) {
            return typeof decorator === 'function';
        }), 'Decorate: expected a decorator function or array of decorator functions for \'' + prop + '\'');
        var descriptor = Object.getOwnPropertyDescriptor(target, prop);
        var newDescriptor = propertyDecorators.reduce(function (accDescriptor, decorator) {
            return decorator(target, prop, accDescriptor);
        }, descriptor);
        if (newDescriptor)
            Object.defineProperty(target, prop, newDescriptor);
    };
    for (var prop in decorators) {
        _loop_1(prop);
    }
    return thing;
}
function extendObservable(target, properties, decorators, options) {
    options = asCreateObservableOptions(options);
    var defaultDecorator = getDefaultDecoratorFromObjectOptions(options);
    initializeInstance(target);
    asObservableObject(target, options.name, defaultDecorator.enhancer);
    if (properties)
        extendObservableObjectWithProperties(target, properties, decorators, defaultDecorator);
    return target;
}
function getDefaultDecoratorFromObjectOptions(options) {
    return options.defaultDecorator || (options.deep === false ? refDecorator : deepDecorator);
}
function extendObservableObjectWithProperties(target, properties, decorators, defaultDecorator) {
    startBatch();
    try {
        var keys = getPlainObjectKeys(properties);
        for (var i in keys) {
            var key = keys[i];
            var descriptor = Object.getOwnPropertyDescriptor(properties, key);
            var decorator = decorators && key in decorators ? decorators[key] : descriptor.get ? computedDecorator : defaultDecorator;
            if ('production' !== 'production' && typeof decorator !== 'function')
                fail('Not a valid decorator for \'' + stringifyKey(key) + '\', got: ' + decorator);
            var resultDescriptor = decorator(target, key, descriptor, true);
            if (resultDescriptor)
                Object.defineProperty(target, key, resultDescriptor);
        }
    } finally {
        endBatch();
    }
}
function getDependencyTree(thing, property) {
    return nodeToDependencyTree(getAtom(thing, property));
}
function nodeToDependencyTree(node) {
    var result = { name: node.name };
    if (node.observing && node.observing.length > 0)
        result.dependencies = unique(node.observing).map(nodeToDependencyTree);
    return result;
}
function getObserverTree(thing, property) {
    return nodeToObserverTree(getAtom(thing, property));
}
function nodeToObserverTree(node) {
    var result = { name: node.name };
    if (hasObservers(node))
        result.observers = Array.from(getObservers(node)).map(nodeToObserverTree);
    return result;
}
var generatorId = 0;
function flow(generator) {
    if (arguments.length !== 1)
        fail(!!'production' && 'Flow expects one 1 argument and cannot be used as decorator');
    var name = generator.name || '<unnamed flow>';
    return function () {
        var ctx = this;
        var args = arguments;
        var runId = ++generatorId;
        var gen = action(name + ' - runid: ' + runId + ' - init', generator).apply(ctx, args);
        var rejector;
        var pendingPromise = undefined;
        var promise = new Promise(function (resolve, reject) {
            var stepId = 0;
            rejector = reject;
            function onFulfilled(res) {
                pendingPromise = undefined;
                var ret;
                try {
                    ret = action(name + ' - runid: ' + runId + ' - yield ' + stepId++, gen.next).call(gen, res);
                } catch (e) {
                    return reject(e);
                }
                next(ret);
            }
            function onRejected(err) {
                pendingPromise = undefined;
                var ret;
                try {
                    ret = action(name + ' - runid: ' + runId + ' - yield ' + stepId++, gen.throw).call(gen, err);
                } catch (e) {
                    return reject(e);
                }
                next(ret);
            }
            function next(ret) {
                if (ret && typeof ret.then === 'function') {
                    ret.then(next, reject);
                    return;
                }
                if (ret.done)
                    return resolve(ret.value);
                pendingPromise = Promise.resolve(ret.value);
                return pendingPromise.then(onFulfilled, onRejected);
            }
            onFulfilled(undefined);
        });
        promise.cancel = action(name + ' - runid: ' + runId + ' - cancel', function () {
            try {
                if (pendingPromise)
                    cancelPromise(pendingPromise);
                var res = gen.return();
                var yieldedPromise = Promise.resolve(res.value);
                yieldedPromise.then(noop, noop);
                cancelPromise(yieldedPromise);
                rejector(new Error('FLOW_CANCELLED'));
            } catch (e) {
                rejector(e);
            }
        });
        return promise;
    };
}
function cancelPromise(promise) {
    if (typeof promise.cancel === 'function')
        promise.cancel();
}
function interceptReads(thing, propOrHandler, handler) {
    var target;
    if (isObservableMap(thing) || isObservableArray(thing) || isObservableValue(thing)) {
        target = getAdministration(thing);
    } else if (isObservableObject(thing)) {
        if (typeof propOrHandler !== 'string')
            return fail('production' !== 'production' && 'InterceptReads can only be used with a specific property, not with an object in general');
        target = getAdministration(thing, propOrHandler);
    } else {
        return fail('production' !== 'production' && 'Expected observable map, object or array as first array');
    }
    if (target.dehancer !== undefined)
        return fail('production' !== 'production' && 'An intercept reader was already established');
    target.dehancer = typeof propOrHandler === 'function' ? propOrHandler : handler;
    return function () {
        target.dehancer = undefined;
    };
}
function intercept(thing, propOrHandler, handler) {
    if (typeof handler === 'function')
        return interceptProperty(thing, propOrHandler, handler);
    else
        return interceptInterceptable(thing, propOrHandler);
}
function interceptInterceptable(thing, handler) {
    return getAdministration(thing).intercept(handler);
}
function interceptProperty(thing, property, handler) {
    return getAdministration(thing, property).intercept(handler);
}
function _isComputed(value, property) {
    if (value === null || value === undefined)
        return false;
    if (property !== undefined) {
        if (isObservableObject(value) === false)
            return false;
        if (!value[$mobx].values.has(property))
            return false;
        var atom = getAtom(value, property);
        return isComputedValue(atom);
    }
    return isComputedValue(value);
}
function isComputed(value) {
    if (arguments.length > 1)
        return fail('production' !== 'production' && 'isComputed expects only 1 argument. Use isObservableProp to inspect the observability of a property');
    return _isComputed(value);
}
function isComputedProp(value, propName) {
    if (typeof propName !== 'string')
        return fail('production' !== 'production' && 'isComputed expected a property name as second argument');
    return _isComputed(value, propName);
}
function _isObservable(value, property) {
    if (value === null || value === undefined)
        return false;
    if (property !== undefined) {
        if ('production' !== 'production' && (isObservableMap(value) || isObservableArray(value)))
            return fail('isObservable(object, propertyName) is not supported for arrays and maps. Use map.has or array.length instead.');
        if (isObservableObject(value)) {
            return value[$mobx].values.has(property);
        }
        return false;
    }
    return isObservableObject(value) || !!value[$mobx] || isAtom(value) || isReaction(value) || isComputedValue(value);
}
function isObservable(value) {
    if (arguments.length !== 1)
        fail('production' !== 'production' && 'isObservable expects only 1 argument. Use isObservableProp to inspect the observability of a property');
    return _isObservable(value);
}
function isObservableProp(value, propName) {
    if (typeof propName !== 'string')
        return fail('production' !== 'production' && 'expected a property name as second argument');
    return _isObservable(value, propName);
}
function keys(obj) {
    if (isObservableObject(obj)) {
        return obj[$mobx].getKeys();
    }
    if (isObservableMap(obj)) {
        return Array.from(obj.keys());
    }
    if (isObservableSet(obj)) {
        return Array.from(obj.keys());
    }
    if (isObservableArray(obj)) {
        return obj.map(function (_, index) {
            return index;
        });
    }
    return fail('production' !== 'production' && '\'keys()\' can only be used on observable objects, arrays, sets and maps');
}
function values(obj) {
    if (isObservableObject(obj)) {
        return keys(obj).map(function (key) {
            return obj[key];
        });
    }
    if (isObservableMap(obj)) {
        return keys(obj).map(function (key) {
            return obj.get(key);
        });
    }
    if (isObservableSet(obj)) {
        return Array.from(obj.values());
    }
    if (isObservableArray(obj)) {
        return obj.slice();
    }
    return fail('production' !== 'production' && '\'values()\' can only be used on observable objects, arrays, sets and maps');
}
function entries(obj) {
    if (isObservableObject(obj)) {
        return keys(obj).map(function (key) {
            return [
                key,
                obj[key]
            ];
        });
    }
    if (isObservableMap(obj)) {
        return keys(obj).map(function (key) {
            return [
                key,
                obj.get(key)
            ];
        });
    }
    if (isObservableSet(obj)) {
        return Array.from(obj.entries());
    }
    if (isObservableArray(obj)) {
        return obj.map(function (key, index) {
            return [
                index,
                key
            ];
        });
    }
    return fail('production' !== 'production' && '\'entries()\' can only be used on observable objects, arrays and maps');
}
function set(obj, key, value) {
    if (arguments.length === 2 && !isObservableSet(obj)) {
        startBatch();
        var values_1 = key;
        try {
            for (var key_1 in values_1)
                set(obj, key_1, values_1[key_1]);
        } finally {
            endBatch();
        }
        return;
    }
    if (isObservableObject(obj)) {
        var adm = obj[$mobx];
        var existingObservable = adm.values.get(key);
        if (existingObservable) {
            adm.write(key, value);
        } else {
            adm.addObservableProp(key, value, adm.defaultEnhancer);
        }
    } else if (isObservableMap(obj)) {
        obj.set(key, value);
    } else if (isObservableSet(obj)) {
        obj.add(key);
    } else if (isObservableArray(obj)) {
        if (typeof key !== 'number')
            key = parseInt(key, 10);
        invariant(key >= 0, 'Not a valid index: \'' + key + '\'');
        startBatch();
        if (key >= obj.length)
            obj.length = key + 1;
        obj[key] = value;
        endBatch();
    } else {
        return fail('production' !== 'production' && '\'set()\' can only be used on observable objects, arrays and maps');
    }
}
function remove(obj, key) {
    if (isObservableObject(obj)) {
        obj[$mobx].remove(key);
    } else if (isObservableMap(obj)) {
        obj.delete(key);
    } else if (isObservableSet(obj)) {
        obj.delete(key);
    } else if (isObservableArray(obj)) {
        if (typeof key !== 'number')
            key = parseInt(key, 10);
        invariant(key >= 0, 'Not a valid index: \'' + key + '\'');
        obj.splice(key, 1);
    } else {
        return fail('production' !== 'production' && '\'remove()\' can only be used on observable objects, arrays and maps');
    }
}
function has(obj, key) {
    if (isObservableObject(obj)) {
        var adm = getAdministration(obj);
        return adm.has(key);
    } else if (isObservableMap(obj)) {
        return obj.has(key);
    } else if (isObservableSet(obj)) {
        return obj.has(key);
    } else if (isObservableArray(obj)) {
        return key >= 0 && key < obj.length;
    } else {
        return fail('production' !== 'production' && '\'has()\' can only be used on observable objects, arrays and maps');
    }
}
function get(obj, key) {
    if (!has(obj, key))
        return undefined;
    if (isObservableObject(obj)) {
        return obj[key];
    } else if (isObservableMap(obj)) {
        return obj.get(key);
    } else if (isObservableArray(obj)) {
        return obj[key];
    } else {
        return fail('production' !== 'production' && '\'get()\' can only be used on observable objects, arrays and maps');
    }
}
function observe(thing, propOrCb, cbOrFire, fireImmediately) {
    if (typeof cbOrFire === 'function')
        return observeObservableProperty(thing, propOrCb, cbOrFire, fireImmediately);
    else
        return observeObservable(thing, propOrCb, cbOrFire);
}
function observeObservable(thing, listener, fireImmediately) {
    return getAdministration(thing).observe(listener, fireImmediately);
}
function observeObservableProperty(thing, property, listener, fireImmediately) {
    return getAdministration(thing, property).observe(listener, fireImmediately);
}
var defaultOptions = {
    detectCycles: true,
    exportMapsAsObjects: true,
    recurseEverything: false
};
function cache(map, key, value, options) {
    if (options.detectCycles)
        map.set(key, value);
    return value;
}
function toJSHelper(source, options, __alreadySeen) {
    if (!options.recurseEverything && !isObservable(source))
        return source;
    if (typeof source !== 'object')
        return source;
    if (source === null)
        return null;
    if (source instanceof Date)
        return source;
    if (isObservableValue(source))
        return toJSHelper(source.get(), options, __alreadySeen);
    if (isObservable(source))
        keys(source);
    var detectCycles = options.detectCycles === true;
    if (detectCycles && source !== null && __alreadySeen.has(source)) {
        return __alreadySeen.get(source);
    }
    if (isObservableArray(source) || Array.isArray(source)) {
        var res_1 = cache(__alreadySeen, source, [], options);
        var toAdd = source.map(function (value) {
            return toJSHelper(value, options, __alreadySeen);
        });
        res_1.length = toAdd.length;
        for (var i = 0, l = toAdd.length; i < l; i++)
            res_1[i] = toAdd[i];
        return res_1;
    }
    if (isObservableSet(source) || Object.getPrototypeOf(source) === Set.prototype) {
        if (options.exportMapsAsObjects === false) {
            var res_2 = cache(__alreadySeen, source, new Set(), options);
            source.forEach(function (value) {
                res_2.add(toJSHelper(value, options, __alreadySeen));
            });
            return res_2;
        } else {
            var res_3 = cache(__alreadySeen, source, [], options);
            source.forEach(function (value) {
                res_3.push(toJSHelper(value, options, __alreadySeen));
            });
            return res_3;
        }
    }
    if (isObservableMap(source) || Object.getPrototypeOf(source) === Map.prototype) {
        if (options.exportMapsAsObjects === false) {
            var res_4 = cache(__alreadySeen, source, new Map(), options);
            source.forEach(function (value, key) {
                res_4.set(key, toJSHelper(value, options, __alreadySeen));
            });
            return res_4;
        } else {
            var res_5 = cache(__alreadySeen, source, {}, options);
            source.forEach(function (value, key) {
                res_5[key] = toJSHelper(value, options, __alreadySeen);
            });
            return res_5;
        }
    }
    var res = cache(__alreadySeen, source, {}, options);
    getPlainObjectKeys(source).forEach(function (key) {
        res[key] = toJSHelper(source[key], options, __alreadySeen);
    });
    return res;
}
function toJS(source, options) {
    if (typeof options === 'boolean')
        options = { detectCycles: options };
    if (!options)
        options = defaultOptions;
    options.detectCycles = options.detectCycles === undefined ? options.recurseEverything === true : options.detectCycles === true;
    var __alreadySeen;
    if (options.detectCycles)
        __alreadySeen = new Map();
    return toJSHelper(source, options, __alreadySeen);
}
function trace() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var enterBreakPoint = false;
    if (typeof args[args.length - 1] === 'boolean')
        enterBreakPoint = args.pop();
    var derivation = getAtomFromArgs(args);
    if (!derivation) {
        return fail('production' !== 'production' && '\'trace(break?)\' can only be used inside a tracked computed value or a Reaction. Consider passing in the computed value or reaction explicitly');
    }
    if (derivation.isTracing === TraceMode.NONE) {
        console.log('[mobx.trace] \'' + derivation.name + '\' tracing enabled');
    }
    derivation.isTracing = enterBreakPoint ? TraceMode.BREAK : TraceMode.LOG;
}
function getAtomFromArgs(args) {
    switch (args.length) {
    case 0:
        return globalState.trackingDerivation;
    case 1:
        return getAtom(args[0]);
    case 2:
        return getAtom(args[0], args[1]);
    }
}
function transaction(action, thisArg) {
    if (thisArg === void 0) {
        thisArg = undefined;
    }
    startBatch();
    try {
        return action.apply(thisArg);
    } finally {
        endBatch();
    }
}
function when(predicate, arg1, arg2) {
    if (arguments.length === 1 || arg1 && typeof arg1 === 'object')
        return whenPromise(predicate, arg1);
    return _when(predicate, arg1, arg2 || {});
}
function _when(predicate, effect, opts) {
    var timeoutHandle;
    if (typeof opts.timeout === 'number') {
        timeoutHandle = setTimeout(function () {
            if (!disposer[$mobx].isDisposed) {
                disposer();
                var error = new Error('WHEN_TIMEOUT');
                if (opts.onError)
                    opts.onError(error);
                else
                    throw error;
            }
        }, opts.timeout);
    }
    opts.name = opts.name || 'When@' + getNextId();
    var effectAction = createAction(opts.name + '-effect', effect);
    var disposer = autorun(function (r) {
        if (predicate()) {
            r.dispose();
            if (timeoutHandle)
                clearTimeout(timeoutHandle);
            effectAction();
        }
    }, opts);
    return disposer;
}
function whenPromise(predicate, opts) {
    if ('production' !== 'production' && opts && opts.onError)
        return fail('the options \'onError\' and \'promise\' cannot be combined');
    var cancel;
    var res = new Promise(function (resolve, reject) {
        var disposer = _when(predicate, resolve, __assign({}, opts, { onError: reject }));
        cancel = function () {
            disposer();
            reject('WHEN_CANCELLED');
        };
    });
    res.cancel = cancel;
    return res;
}
function getAdm(target) {
    return target[$mobx];
}
function isPropertyKey(val) {
    return typeof val === 'string' || typeof val === 'number' || typeof val === 'symbol';
}
var objectProxyTraps = {
    has: function (target, name) {
        if (name === $mobx || name === 'constructor' || name === mobxDidRunLazyInitializersSymbol)
            return true;
        var adm = getAdm(target);
        if (isPropertyKey(name))
            return adm.has(name);
        return name in target;
    },
    get: function (target, name) {
        if (name === $mobx || name === 'constructor' || name === mobxDidRunLazyInitializersSymbol)
            return target[name];
        var adm = getAdm(target);
        var observable = adm.values.get(name);
        if (observable instanceof Atom) {
            var result = observable.get();
            if (result === undefined) {
                adm.has(name);
            }
            return result;
        }
        if (isPropertyKey(name))
            adm.has(name);
        return target[name];
    },
    set: function (target, name, value) {
        if (!isPropertyKey(name))
            return false;
        set(target, name, value);
        return true;
    },
    deleteProperty: function (target, name) {
        if (!isPropertyKey(name))
            return false;
        var adm = getAdm(target);
        adm.remove(name);
        return true;
    },
    ownKeys: function (target) {
        var adm = getAdm(target);
        adm.keysAtom.reportObserved();
        return Reflect.ownKeys(target);
    },
    preventExtensions: function (target) {
        fail('Dynamic observable objects cannot be frozen');
        return false;
    }
};
function createDynamicObservableObject(base) {
    var proxy = new Proxy(base, objectProxyTraps);
    base[$mobx].proxy = proxy;
    return proxy;
}
function hasInterceptors(interceptable) {
    return interceptable.interceptors !== undefined && interceptable.interceptors.length > 0;
}
function registerInterceptor(interceptable, handler) {
    var interceptors = interceptable.interceptors || (interceptable.interceptors = []);
    interceptors.push(handler);
    return once(function () {
        var idx = interceptors.indexOf(handler);
        if (idx !== -1)
            interceptors.splice(idx, 1);
    });
}
function interceptChange(interceptable, change) {
    var prevU = untrackedStart();
    try {
        var interceptors = interceptable.interceptors;
        if (interceptors)
            for (var i = 0, l = interceptors.length; i < l; i++) {
                change = interceptors[i](change);
                invariant(!change || change.type, 'Intercept handlers should return nothing or a change object');
                if (!change)
                    break;
            }
        return change;
    } finally {
        untrackedEnd(prevU);
    }
}
function hasListeners(listenable) {
    return listenable.changeListeners !== undefined && listenable.changeListeners.length > 0;
}
function registerListener(listenable, handler) {
    var listeners = listenable.changeListeners || (listenable.changeListeners = []);
    listeners.push(handler);
    return once(function () {
        var idx = listeners.indexOf(handler);
        if (idx !== -1)
            listeners.splice(idx, 1);
    });
}
function notifyListeners(listenable, change) {
    var prevU = untrackedStart();
    var listeners = listenable.changeListeners;
    if (!listeners)
        return;
    listeners = listeners.slice();
    for (var i = 0, l = listeners.length; i < l; i++) {
        listeners[i](change);
    }
    untrackedEnd(prevU);
}
var MAX_SPLICE_SIZE = 10000;
var arrayTraps = {
    get: function (target, name) {
        if (name === $mobx)
            return target[$mobx];
        if (name === 'length')
            return target[$mobx].getArrayLength();
        if (typeof name === 'number') {
            return arrayExtensions.get.call(target, name);
        }
        if (typeof name === 'string' && !isNaN(name)) {
            return arrayExtensions.get.call(target, parseInt(name));
        }
        if (arrayExtensions.hasOwnProperty(name)) {
            return arrayExtensions[name];
        }
        return target[name];
    },
    set: function (target, name, value) {
        if (name === 'length') {
            target[$mobx].setArrayLength(value);
            return true;
        }
        if (typeof name === 'number') {
            arrayExtensions.set.call(target, name, value);
            return true;
        }
        if (!isNaN(name)) {
            arrayExtensions.set.call(target, parseInt(name), value);
            return true;
        }
        return false;
    },
    preventExtensions: function (target) {
        fail('Observable arrays cannot be frozen');
        return false;
    }
};
function createObservableArray(initialValues, enhancer, name, owned) {
    if (name === void 0) {
        name = 'ObservableArray@' + getNextId();
    }
    if (owned === void 0) {
        owned = false;
    }
    var adm = new ObservableArrayAdministration(name, enhancer, owned);
    addHiddenFinalProp(adm.values, $mobx, adm);
    var proxy = new Proxy(adm.values, arrayTraps);
    adm.proxy = proxy;
    if (initialValues && initialValues.length) {
        var prev = allowStateChangesStart(true);
        adm.spliceWithArray(0, 0, initialValues);
        allowStateChangesEnd(prev);
    }
    return proxy;
}
var ObservableArrayAdministration = function () {
    function ObservableArrayAdministration(name, enhancer, owned) {
        this.owned = owned;
        this.values = [];
        this.proxy = undefined;
        this.lastKnownLength = 0;
        this.atom = new Atom(name || 'ObservableArray@' + getNextId());
        this.enhancer = function (newV, oldV) {
            return enhancer(newV, oldV, name + '[..]');
        };
    }
    ObservableArrayAdministration.prototype.dehanceValue = function (value) {
        if (this.dehancer !== undefined)
            return this.dehancer(value);
        return value;
    };
    ObservableArrayAdministration.prototype.dehanceValues = function (values) {
        if (this.dehancer !== undefined && values.length > 0)
            return values.map(this.dehancer);
        return values;
    };
    ObservableArrayAdministration.prototype.intercept = function (handler) {
        return registerInterceptor(this, handler);
    };
    ObservableArrayAdministration.prototype.observe = function (listener, fireImmediately) {
        if (fireImmediately === void 0) {
            fireImmediately = false;
        }
        if (fireImmediately) {
            listener({
                object: this.proxy,
                type: 'splice',
                index: 0,
                added: this.values.slice(),
                addedCount: this.values.length,
                removed: [],
                removedCount: 0
            });
        }
        return registerListener(this, listener);
    };
    ObservableArrayAdministration.prototype.getArrayLength = function () {
        this.atom.reportObserved();
        return this.values.length;
    };
    ObservableArrayAdministration.prototype.setArrayLength = function (newLength) {
        if (typeof newLength !== 'number' || newLength < 0)
            throw new Error('[mobx.array] Out of range: ' + newLength);
        var currentLength = this.values.length;
        if (newLength === currentLength)
            return;
        else if (newLength > currentLength) {
            var newItems = new Array(newLength - currentLength);
            for (var i = 0; i < newLength - currentLength; i++)
                newItems[i] = undefined;
            this.spliceWithArray(currentLength, 0, newItems);
        } else
            this.spliceWithArray(newLength, currentLength - newLength);
    };
    ObservableArrayAdministration.prototype.updateArrayLength = function (oldLength, delta) {
        if (oldLength !== this.lastKnownLength)
            throw new Error('[mobx] Modification exception: the internal structure of an observable array was changed.');
        this.lastKnownLength += delta;
    };
    ObservableArrayAdministration.prototype.spliceWithArray = function (index, deleteCount, newItems) {
        var _this = this;
        checkIfStateModificationsAreAllowed(this.atom);
        var length = this.values.length;
        if (index === undefined)
            index = 0;
        else if (index > length)
            index = length;
        else if (index < 0)
            index = Math.max(0, length + index);
        if (arguments.length === 1)
            deleteCount = length - index;
        else if (deleteCount === undefined || deleteCount === null)
            deleteCount = 0;
        else
            deleteCount = Math.max(0, Math.min(deleteCount, length - index));
        if (newItems === undefined)
            newItems = EMPTY_ARRAY;
        if (hasInterceptors(this)) {
            var change = interceptChange(this, {
                object: this.proxy,
                type: 'splice',
                index: index,
                removedCount: deleteCount,
                added: newItems
            });
            if (!change)
                return EMPTY_ARRAY;
            deleteCount = change.removedCount;
            newItems = change.added;
        }
        newItems = newItems.length === 0 ? newItems : newItems.map(function (v) {
            return _this.enhancer(v, undefined);
        });
        var res = this.spliceItemsIntoValues(index, deleteCount, newItems);
        if (deleteCount !== 0 || newItems.length !== 0)
            this.notifyArraySplice(index, newItems, res);
        return this.dehanceValues(res);
    };
    ObservableArrayAdministration.prototype.spliceItemsIntoValues = function (index, deleteCount, newItems) {
        var _a;
        if (newItems.length < MAX_SPLICE_SIZE) {
            return (_a = this.values).splice.apply(_a, __spread([
                index,
                deleteCount
            ], newItems));
        } else {
            var res = this.values.slice(index, index + deleteCount);
            this.values = this.values.slice(0, index).concat(newItems, this.values.slice(index + deleteCount));
            return res;
        }
    };
    ObservableArrayAdministration.prototype.notifyArrayChildUpdate = function (index, newValue, oldValue) {
        var notifySpy = !this.owned && isSpyEnabled();
        var notify = hasListeners(this);
        var change = notify || notifySpy ? {
            object: this.proxy,
            type: 'update',
            index: index,
            newValue: newValue,
            oldValue: oldValue
        } : null;
        if (notifySpy && 'production' !== 'production')
            spyReportStart(__assign({}, change, { name: this.atom.name }));
        this.atom.reportChanged();
        if (notify)
            notifyListeners(this, change);
        if (notifySpy && 'production' !== 'production')
            spyReportEnd();
    };
    ObservableArrayAdministration.prototype.notifyArraySplice = function (index, added, removed) {
        var notifySpy = !this.owned && isSpyEnabled();
        var notify = hasListeners(this);
        var change = notify || notifySpy ? {
            object: this.proxy,
            type: 'splice',
            index: index,
            removed: removed,
            added: added,
            removedCount: removed.length,
            addedCount: added.length
        } : null;
        if (notifySpy && 'production' !== 'production')
            spyReportStart(__assign({}, change, { name: this.atom.name }));
        this.atom.reportChanged();
        if (notify)
            notifyListeners(this, change);
        if (notifySpy && 'production' !== 'production')
            spyReportEnd();
    };
    return ObservableArrayAdministration;
}();
var arrayExtensions = {
    intercept: function (handler) {
        return this[$mobx].intercept(handler);
    },
    observe: function (listener, fireImmediately) {
        if (fireImmediately === void 0) {
            fireImmediately = false;
        }
        var adm = this[$mobx];
        return adm.observe(listener, fireImmediately);
    },
    clear: function () {
        return this.splice(0);
    },
    replace: function (newItems) {
        var adm = this[$mobx];
        return adm.spliceWithArray(0, adm.values.length, newItems);
    },
    toJS: function () {
        return this.slice();
    },
    toJSON: function () {
        return this.toJS();
    },
    splice: function (index, deleteCount) {
        var newItems = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            newItems[_i - 2] = arguments[_i];
        }
        var adm = this[$mobx];
        switch (arguments.length) {
        case 0:
            return [];
        case 1:
            return adm.spliceWithArray(index);
        case 2:
            return adm.spliceWithArray(index, deleteCount);
        }
        return adm.spliceWithArray(index, deleteCount, newItems);
    },
    spliceWithArray: function (index, deleteCount, newItems) {
        var adm = this[$mobx];
        return adm.spliceWithArray(index, deleteCount, newItems);
    },
    push: function () {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        var adm = this[$mobx];
        adm.spliceWithArray(adm.values.length, 0, items);
        return adm.values.length;
    },
    pop: function () {
        return this.splice(Math.max(this[$mobx].values.length - 1, 0), 1)[0];
    },
    shift: function () {
        return this.splice(0, 1)[0];
    },
    unshift: function () {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        var adm = this[$mobx];
        adm.spliceWithArray(0, 0, items);
        return adm.values.length;
    },
    reverse: function () {
        var clone = this.slice();
        return clone.reverse.apply(clone, arguments);
    },
    sort: function (compareFn) {
        var clone = this.slice();
        return clone.sort.apply(clone, arguments);
    },
    remove: function (value) {
        var adm = this[$mobx];
        var idx = adm.dehanceValues(adm.values).indexOf(value);
        if (idx > -1) {
            this.splice(idx, 1);
            return true;
        }
        return false;
    },
    get: function (index) {
        var adm = this[$mobx];
        if (adm) {
            if (index < adm.values.length) {
                adm.atom.reportObserved();
                return adm.dehanceValue(adm.values[index]);
            }
            console.warn('[mobx.array] Attempt to read an array index (' + index + ') that is out of bounds (' + adm.values.length + '). Please check length first. Out of bound indices will not be tracked by MobX');
        }
        return undefined;
    },
    set: function (index, newValue) {
        var adm = this[$mobx];
        var values = adm.values;
        if (index < values.length) {
            checkIfStateModificationsAreAllowed(adm.atom);
            var oldValue = values[index];
            if (hasInterceptors(adm)) {
                var change = interceptChange(adm, {
                    type: 'update',
                    object: this.proxy,
                    index: index,
                    newValue: newValue
                });
                if (!change)
                    return;
                newValue = change.newValue;
            }
            newValue = adm.enhancer(newValue, oldValue);
            var changed = newValue !== oldValue;
            if (changed) {
                values[index] = newValue;
                adm.notifyArrayChildUpdate(index, newValue, oldValue);
            }
        } else if (index === values.length) {
            adm.spliceWithArray(index, 0, [newValue]);
        } else {
            throw new Error('[mobx.array] Index out of bounds, ' + index + ' is larger than ' + values.length);
        }
    }
};
[
    'concat',
    'every',
    'filter',
    'forEach',
    'indexOf',
    'join',
    'lastIndexOf',
    'map',
    'reduce',
    'reduceRight',
    'slice',
    'some',
    'toString',
    'toLocaleString'
].forEach(function (funcName) {
    arrayExtensions[funcName] = function () {
        var adm = this[$mobx];
        adm.atom.reportObserved();
        var res = adm.dehanceValues(adm.values);
        return res[funcName].apply(res, arguments);
    };
});
var isObservableArrayAdministration = createInstanceofPredicate('ObservableArrayAdministration', ObservableArrayAdministration);
function isObservableArray(thing) {
    return isObject(thing) && isObservableArrayAdministration(thing[$mobx]);
}
var _a;
var ObservableMapMarker = {};
var ObservableMap = function () {
    function ObservableMap(initialData, enhancer, name) {
        if (enhancer === void 0) {
            enhancer = deepEnhancer;
        }
        if (name === void 0) {
            name = 'ObservableMap@' + getNextId();
        }
        this.enhancer = enhancer;
        this.name = name;
        this[_a] = ObservableMapMarker;
        this._keysAtom = createAtom(this.name + '.keys()');
        this[Symbol.toStringTag] = 'Map';
        if (typeof Map !== 'function') {
            throw new Error('mobx.map requires Map polyfill for the current browser. Check babel-polyfill or core-js/es6/map.js');
        }
        this._data = new Map();
        this._hasMap = new Map();
        this.merge(initialData);
    }
    ObservableMap.prototype._has = function (key) {
        return this._data.has(key);
    };
    ObservableMap.prototype.has = function (key) {
        if (this._hasMap.has(key))
            return this._hasMap.get(key).get();
        return this._updateHasMapEntry(key, false).get();
    };
    ObservableMap.prototype.set = function (key, value) {
        var hasKey = this._has(key);
        if (hasInterceptors(this)) {
            var change = interceptChange(this, {
                type: hasKey ? 'update' : 'add',
                object: this,
                newValue: value,
                name: key
            });
            if (!change)
                return this;
            value = change.newValue;
        }
        if (hasKey) {
            this._updateValue(key, value);
        } else {
            this._addValue(key, value);
        }
        return this;
    };
    ObservableMap.prototype.delete = function (key) {
        var _this = this;
        if (hasInterceptors(this)) {
            var change = interceptChange(this, {
                type: 'delete',
                object: this,
                name: key
            });
            if (!change)
                return false;
        }
        if (this._has(key)) {
            var notifySpy = isSpyEnabled();
            var notify = hasListeners(this);
            var change = notify || notifySpy ? {
                type: 'delete',
                object: this,
                oldValue: this._data.get(key).value,
                name: key
            } : null;
            if (notifySpy && 'production' !== 'production')
                spyReportStart(__assign({}, change, {
                    name: this.name,
                    key: key
                }));
            transaction(function () {
                _this._keysAtom.reportChanged();
                _this._updateHasMapEntry(key, false);
                var observable = _this._data.get(key);
                observable.setNewValue(undefined);
                _this._data.delete(key);
            });
            if (notify)
                notifyListeners(this, change);
            if (notifySpy && 'production' !== 'production')
                spyReportEnd();
            return true;
        }
        return false;
    };
    ObservableMap.prototype._updateHasMapEntry = function (key, value) {
        var entry = this._hasMap.get(key);
        if (entry) {
            entry.setNewValue(value);
        } else {
            entry = new ObservableValue(value, referenceEnhancer, this.name + '.' + stringifyKey(key) + '?', false);
            this._hasMap.set(key, entry);
        }
        return entry;
    };
    ObservableMap.prototype._updateValue = function (key, newValue) {
        var observable = this._data.get(key);
        newValue = observable.prepareNewValue(newValue);
        if (newValue !== globalState.UNCHANGED) {
            var notifySpy = isSpyEnabled();
            var notify = hasListeners(this);
            var change = notify || notifySpy ? {
                type: 'update',
                object: this,
                oldValue: observable.value,
                name: key,
                newValue: newValue
            } : null;
            if (notifySpy && 'production' !== 'production')
                spyReportStart(__assign({}, change, {
                    name: this.name,
                    key: key
                }));
            observable.setNewValue(newValue);
            if (notify)
                notifyListeners(this, change);
            if (notifySpy && 'production' !== 'production')
                spyReportEnd();
        }
    };
    ObservableMap.prototype._addValue = function (key, newValue) {
        var _this = this;
        checkIfStateModificationsAreAllowed(this._keysAtom);
        transaction(function () {
            var observable = new ObservableValue(newValue, _this.enhancer, _this.name + '.' + stringifyKey(key), false);
            _this._data.set(key, observable);
            newValue = observable.value;
            _this._updateHasMapEntry(key, true);
            _this._keysAtom.reportChanged();
        });
        var notifySpy = isSpyEnabled();
        var notify = hasListeners(this);
        var change = notify || notifySpy ? {
            type: 'add',
            object: this,
            name: key,
            newValue: newValue
        } : null;
        if (notifySpy && 'production' !== 'production')
            spyReportStart(__assign({}, change, {
                name: this.name,
                key: key
            }));
        if (notify)
            notifyListeners(this, change);
        if (notifySpy && 'production' !== 'production')
            spyReportEnd();
    };
    ObservableMap.prototype.get = function (key) {
        if (this.has(key))
            return this.dehanceValue(this._data.get(key).get());
        return this.dehanceValue(undefined);
    };
    ObservableMap.prototype.dehanceValue = function (value) {
        if (this.dehancer !== undefined) {
            return this.dehancer(value);
        }
        return value;
    };
    ObservableMap.prototype.keys = function () {
        this._keysAtom.reportObserved();
        return this._data.keys();
    };
    ObservableMap.prototype.values = function () {
        var self = this;
        var nextIndex = 0;
        var keys = Array.from(this.keys());
        return makeIterable({
            next: function () {
                return nextIndex < keys.length ? {
                    value: self.get(keys[nextIndex++]),
                    done: false
                } : { done: true };
            }
        });
    };
    ObservableMap.prototype.entries = function () {
        var self = this;
        var nextIndex = 0;
        var keys = Array.from(this.keys());
        return makeIterable({
            next: function () {
                if (nextIndex < keys.length) {
                    var key = keys[nextIndex++];
                    return {
                        value: [
                            key,
                            self.get(key)
                        ],
                        done: false
                    };
                }
                return { done: true };
            }
        });
    };
    ObservableMap.prototype[_a = $mobx, Symbol.iterator] = function () {
        return this.entries();
    };
    ObservableMap.prototype.forEach = function (callback, thisArg) {
        var e_1, _a;
        try {
            for (var _b = __values(this), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), key = _d[0], value = _d[1];
                callback.call(thisArg, value, key, this);
            }
        } catch (e_1_1) {
            e_1 = { error: e_1_1 };
        } finally {
            try {
                if (_c && !_c.done && (_a = _b.return))
                    _a.call(_b);
            } finally {
                if (e_1)
                    throw e_1.error;
            }
        }
    };
    ObservableMap.prototype.merge = function (other) {
        var _this = this;
        if (isObservableMap(other)) {
            other = other.toJS();
        }
        transaction(function () {
            if (isPlainObject(other))
                getPlainObjectKeys(other).forEach(function (key) {
                    return _this.set(key, other[key]);
                });
            else if (Array.isArray(other))
                other.forEach(function (_a) {
                    var _b = __read(_a, 2), key = _b[0], value = _b[1];
                    return _this.set(key, value);
                });
            else if (isES6Map(other)) {
                if (other.constructor !== Map)
                    fail('Cannot initialize from classes that inherit from Map: ' + other.constructor.name);
                other.forEach(function (value, key) {
                    return _this.set(key, value);
                });
            } else if (other !== null && other !== undefined)
                fail('Cannot initialize map from ' + other);
        });
        return this;
    };
    ObservableMap.prototype.clear = function () {
        var _this = this;
        transaction(function () {
            untracked(function () {
                var e_2, _a;
                try {
                    for (var _b = __values(_this.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var key = _c.value;
                        _this.delete(key);
                    }
                } catch (e_2_1) {
                    e_2 = { error: e_2_1 };
                } finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return))
                            _a.call(_b);
                    } finally {
                        if (e_2)
                            throw e_2.error;
                    }
                }
            });
        });
    };
    ObservableMap.prototype.replace = function (values) {
        var _this = this;
        transaction(function () {
            var newKeys = getMapLikeKeys(values);
            var oldKeys = Array.from(_this.keys());
            var missingKeys = oldKeys.filter(function (k) {
                return newKeys.indexOf(k) === -1;
            });
            missingKeys.forEach(function (k) {
                return _this.delete(k);
            });
            _this.merge(values);
        });
        return this;
    };
    Object.defineProperty(ObservableMap.prototype, 'size', {
        get: function () {
            this._keysAtom.reportObserved();
            return this._data.size;
        },
        enumerable: true,
        configurable: true
    });
    ObservableMap.prototype.toPOJO = function () {
        var e_3, _a;
        var res = {};
        try {
            for (var _b = __values(this), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), key = _d[0], value = _d[1];
                res[typeof key === 'symbol' ? key : stringifyKey(key)] = value;
            }
        } catch (e_3_1) {
            e_3 = { error: e_3_1 };
        } finally {
            try {
                if (_c && !_c.done && (_a = _b.return))
                    _a.call(_b);
            } finally {
                if (e_3)
                    throw e_3.error;
            }
        }
        return res;
    };
    ObservableMap.prototype.toJS = function () {
        return new Map(this);
    };
    ObservableMap.prototype.toJSON = function () {
        return this.toPOJO();
    };
    ObservableMap.prototype.toString = function () {
        var _this = this;
        return this.name + '[{ ' + Array.from(this.keys()).map(function (key) {
            return stringifyKey(key) + ': ' + ('' + _this.get(key));
        }).join(', ') + ' }]';
    };
    ObservableMap.prototype.observe = function (listener, fireImmediately) {
        'production' !== 'production' && invariant(fireImmediately !== true, '`observe` doesn\'t support fireImmediately=true in combination with maps.');
        return registerListener(this, listener);
    };
    ObservableMap.prototype.intercept = function (handler) {
        return registerInterceptor(this, handler);
    };
    return ObservableMap;
}();
var isObservableMap = createInstanceofPredicate('ObservableMap', ObservableMap);
var _a$1;
var ObservableSetMarker = {};
var ObservableSet = function () {
    function ObservableSet(initialData, enhancer, name) {
        if (enhancer === void 0) {
            enhancer = deepEnhancer;
        }
        if (name === void 0) {
            name = 'ObservableSet@' + getNextId();
        }
        this.name = name;
        this[_a$1] = ObservableSetMarker;
        this._data = new Set();
        this._atom = createAtom(this.name);
        this[Symbol.toStringTag] = 'Set';
        if (typeof Set !== 'function') {
            throw new Error('mobx.set requires Set polyfill for the current browser. Check babel-polyfill or core-js/es6/set.js');
        }
        this.enhancer = function (newV, oldV) {
            return enhancer(newV, oldV, name);
        };
        if (initialData) {
            this.replace(initialData);
        }
    }
    ObservableSet.prototype.dehanceValue = function (value) {
        if (this.dehancer !== undefined) {
            return this.dehancer(value);
        }
        return value;
    };
    ObservableSet.prototype.clear = function () {
        var _this = this;
        transaction(function () {
            untracked(function () {
                var e_1, _a;
                try {
                    for (var _b = __values(_this._data.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var value = _c.value;
                        _this.delete(value);
                    }
                } catch (e_1_1) {
                    e_1 = { error: e_1_1 };
                } finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return))
                            _a.call(_b);
                    } finally {
                        if (e_1)
                            throw e_1.error;
                    }
                }
            });
        });
    };
    ObservableSet.prototype.forEach = function (callbackFn, thisArg) {
        var e_2, _a;
        try {
            for (var _b = __values(this), _c = _b.next(); !_c.done; _c = _b.next()) {
                var value = _c.value;
                callbackFn.call(thisArg, value, value, this);
            }
        } catch (e_2_1) {
            e_2 = { error: e_2_1 };
        } finally {
            try {
                if (_c && !_c.done && (_a = _b.return))
                    _a.call(_b);
            } finally {
                if (e_2)
                    throw e_2.error;
            }
        }
    };
    Object.defineProperty(ObservableSet.prototype, 'size', {
        get: function () {
            this._atom.reportObserved();
            return this._data.size;
        },
        enumerable: true,
        configurable: true
    });
    ObservableSet.prototype.add = function (value) {
        var _this = this;
        checkIfStateModificationsAreAllowed(this._atom);
        if (hasInterceptors(this)) {
            var change = interceptChange(this, {
                type: 'add',
                object: this,
                newValue: value
            });
            if (!change)
                return this;
        }
        if (!this.has(value)) {
            transaction(function () {
                _this._data.add(_this.enhancer(value, undefined));
                _this._atom.reportChanged();
            });
            var notifySpy = isSpyEnabled();
            var notify = hasListeners(this);
            var change = notify || notifySpy ? {
                type: 'add',
                object: this,
                newValue: value
            } : null;
            if (notifySpy && 'production' !== 'production')
                spyReportStart(change);
            if (notify)
                notifyListeners(this, change);
            if (notifySpy && 'production' !== 'production')
                spyReportEnd();
        }
        return this;
    };
    ObservableSet.prototype.delete = function (value) {
        var _this = this;
        if (hasInterceptors(this)) {
            var change = interceptChange(this, {
                type: 'delete',
                object: this,
                oldValue: value
            });
            if (!change)
                return false;
        }
        if (this.has(value)) {
            var notifySpy = isSpyEnabled();
            var notify = hasListeners(this);
            var change = notify || notifySpy ? {
                type: 'delete',
                object: this,
                oldValue: value
            } : null;
            if (notifySpy && 'production' !== 'production')
                spyReportStart(__assign({}, change, { name: this.name }));
            transaction(function () {
                _this._atom.reportChanged();
                _this._data.delete(value);
            });
            if (notify)
                notifyListeners(this, change);
            if (notifySpy && 'production' !== 'production')
                spyReportEnd();
            return true;
        }
        return false;
    };
    ObservableSet.prototype.has = function (value) {
        this._atom.reportObserved();
        return this._data.has(this.dehanceValue(value));
    };
    ObservableSet.prototype.entries = function () {
        var nextIndex = 0;
        var keys = Array.from(this.keys());
        var values = Array.from(this.values());
        return makeIterable({
            next: function () {
                var index = nextIndex;
                nextIndex += 1;
                return index < values.length ? {
                    value: [
                        keys[index],
                        values[index]
                    ],
                    done: false
                } : { done: true };
            }
        });
    };
    ObservableSet.prototype.keys = function () {
        return this.values();
    };
    ObservableSet.prototype.values = function () {
        this._atom.reportObserved();
        var self = this;
        var nextIndex = 0;
        var observableValues = Array.from(this._data.values());
        return makeIterable({
            next: function () {
                return nextIndex < observableValues.length ? {
                    value: self.dehanceValue(observableValues[nextIndex++]),
                    done: false
                } : { done: true };
            }
        });
    };
    ObservableSet.prototype.replace = function (other) {
        var _this = this;
        if (isObservableSet(other)) {
            other = other.toJS();
        }
        transaction(function () {
            if (Array.isArray(other)) {
                _this.clear();
                other.forEach(function (value) {
                    return _this.add(value);
                });
            } else if (isES6Set(other)) {
                _this.clear();
                other.forEach(function (value) {
                    return _this.add(value);
                });
            } else if (other !== null && other !== undefined) {
                fail('Cannot initialize set from ' + other);
            }
        });
        return this;
    };
    ObservableSet.prototype.observe = function (listener, fireImmediately) {
        'production' !== 'production' && invariant(fireImmediately !== true, '`observe` doesn\'t support fireImmediately=true in combination with sets.');
        return registerListener(this, listener);
    };
    ObservableSet.prototype.intercept = function (handler) {
        return registerInterceptor(this, handler);
    };
    ObservableSet.prototype.toJS = function () {
        return new Set(this);
    };
    ObservableSet.prototype.toString = function () {
        return this.name + '[ ' + Array.from(this).join(', ') + ' ]';
    };
    ObservableSet.prototype[_a$1 = $mobx, Symbol.iterator] = function () {
        return this.values();
    };
    return ObservableSet;
}();
var isObservableSet = createInstanceofPredicate('ObservableSet', ObservableSet);
var ObservableObjectAdministration = function () {
    function ObservableObjectAdministration(target, values, name, defaultEnhancer) {
        if (values === void 0) {
            values = new Map();
        }
        this.target = target;
        this.values = values;
        this.name = name;
        this.defaultEnhancer = defaultEnhancer;
        this.keysAtom = new Atom(name + '.keys');
    }
    ObservableObjectAdministration.prototype.read = function (key) {
        return this.values.get(key).get();
    };
    ObservableObjectAdministration.prototype.write = function (key, newValue) {
        var instance = this.target;
        var observable = this.values.get(key);
        if (observable instanceof ComputedValue) {
            observable.set(newValue);
            return;
        }
        if (hasInterceptors(this)) {
            var change = interceptChange(this, {
                type: 'update',
                object: this.proxy || instance,
                name: key,
                newValue: newValue
            });
            if (!change)
                return;
            newValue = change.newValue;
        }
        newValue = observable.prepareNewValue(newValue);
        if (newValue !== globalState.UNCHANGED) {
            var notify = hasListeners(this);
            var notifySpy = isSpyEnabled();
            var change = notify || notifySpy ? {
                type: 'update',
                object: this.proxy || instance,
                oldValue: observable.value,
                name: key,
                newValue: newValue
            } : null;
            if (notifySpy && 'production' !== 'production')
                spyReportStart(__assign({}, change, {
                    name: this.name,
                    key: key
                }));
            observable.setNewValue(newValue);
            if (notify)
                notifyListeners(this, change);
            if (notifySpy && 'production' !== 'production')
                spyReportEnd();
        }
    };
    ObservableObjectAdministration.prototype.has = function (key) {
        var map = this.pendingKeys || (this.pendingKeys = new Map());
        var entry = map.get(key);
        if (entry)
            return entry.get();
        else {
            var exists = !!this.values.get(key);
            entry = new ObservableValue(exists, referenceEnhancer, this.name + '.' + stringifyKey(key) + '?', false);
            map.set(key, entry);
            return entry.get();
        }
    };
    ObservableObjectAdministration.prototype.addObservableProp = function (propName, newValue, enhancer) {
        if (enhancer === void 0) {
            enhancer = this.defaultEnhancer;
        }
        var target = this.target;
        assertPropertyConfigurable(target, propName);
        if (hasInterceptors(this)) {
            var change = interceptChange(this, {
                object: this.proxy || target,
                name: propName,
                type: 'add',
                newValue: newValue
            });
            if (!change)
                return;
            newValue = change.newValue;
        }
        var observable = new ObservableValue(newValue, enhancer, this.name + '.' + stringifyKey(propName), false);
        this.values.set(propName, observable);
        newValue = observable.value;
        Object.defineProperty(target, propName, generateObservablePropConfig(propName));
        this.notifyPropertyAddition(propName, newValue);
    };
    ObservableObjectAdministration.prototype.addComputedProp = function (propertyOwner, propName, options) {
        var target = this.target;
        options.name = options.name || this.name + '.' + stringifyKey(propName);
        this.values.set(propName, new ComputedValue(options));
        if (propertyOwner === target || isPropertyConfigurable(propertyOwner, propName))
            Object.defineProperty(propertyOwner, propName, generateComputedPropConfig(propName));
    };
    ObservableObjectAdministration.prototype.remove = function (key) {
        if (!this.values.has(key))
            return;
        var target = this.target;
        if (hasInterceptors(this)) {
            var change = interceptChange(this, {
                object: this.proxy || target,
                name: key,
                type: 'remove'
            });
            if (!change)
                return;
        }
        try {
            startBatch();
            var notify = hasListeners(this);
            var notifySpy = isSpyEnabled();
            var oldObservable = this.values.get(key);
            var oldValue = oldObservable && oldObservable.get();
            oldObservable && oldObservable.set(undefined);
            this.keysAtom.reportChanged();
            this.values.delete(key);
            if (this.pendingKeys) {
                var entry = this.pendingKeys.get(key);
                if (entry)
                    entry.set(false);
            }
            delete this.target[key];
            var change = notify || notifySpy ? {
                type: 'remove',
                object: this.proxy || target,
                oldValue: oldValue,
                name: key
            } : null;
            if (notifySpy && 'production' !== 'production')
                spyReportStart(__assign({}, change, {
                    name: this.name,
                    key: key
                }));
            if (notify)
                notifyListeners(this, change);
            if (notifySpy && 'production' !== 'production')
                spyReportEnd();
        } finally {
            endBatch();
        }
    };
    ObservableObjectAdministration.prototype.illegalAccess = function (owner, propName) {
        console.warn('Property \'' + propName + '\' of \'' + owner + '\' was accessed through the prototype chain. Use \'decorate\' instead to declare the prop or access it statically through it\'s owner');
    };
    ObservableObjectAdministration.prototype.observe = function (callback, fireImmediately) {
        'production' !== 'production' && invariant(fireImmediately !== true, '`observe` doesn\'t support the fire immediately property for observable objects.');
        return registerListener(this, callback);
    };
    ObservableObjectAdministration.prototype.intercept = function (handler) {
        return registerInterceptor(this, handler);
    };
    ObservableObjectAdministration.prototype.notifyPropertyAddition = function (key, newValue) {
        var notify = hasListeners(this);
        var notifySpy = isSpyEnabled();
        var change = notify || notifySpy ? {
            type: 'add',
            object: this.proxy || this.target,
            name: key,
            newValue: newValue
        } : null;
        if (notifySpy && 'production' !== 'production')
            spyReportStart(__assign({}, change, {
                name: this.name,
                key: key
            }));
        if (notify)
            notifyListeners(this, change);
        if (notifySpy && 'production' !== 'production')
            spyReportEnd();
        if (this.pendingKeys) {
            var entry = this.pendingKeys.get(key);
            if (entry)
                entry.set(true);
        }
        this.keysAtom.reportChanged();
    };
    ObservableObjectAdministration.prototype.getKeys = function () {
        var e_1, _a;
        this.keysAtom.reportObserved();
        var res = [];
        try {
            for (var _b = __values(this.values), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), key = _d[0], value = _d[1];
                if (value instanceof ObservableValue)
                    res.push(key);
            }
        } catch (e_1_1) {
            e_1 = { error: e_1_1 };
        } finally {
            try {
                if (_c && !_c.done && (_a = _b.return))
                    _a.call(_b);
            } finally {
                if (e_1)
                    throw e_1.error;
            }
        }
        return res;
    };
    return ObservableObjectAdministration;
}();
function asObservableObject(target, name, defaultEnhancer) {
    if (name === void 0) {
        name = '';
    }
    if (defaultEnhancer === void 0) {
        defaultEnhancer = deepEnhancer;
    }
    if (Object.prototype.hasOwnProperty.call(target, $mobx))
        return target[$mobx];
    'production' !== 'production' && invariant(Object.isExtensible(target), 'Cannot make the designated object observable; it is not extensible');
    if (!isPlainObject(target))
        name = (target.constructor.name || 'ObservableObject') + '@' + getNextId();
    if (!name)
        name = 'ObservableObject@' + getNextId();
    var adm = new ObservableObjectAdministration(target, new Map(), stringifyKey(name), defaultEnhancer);
    addHiddenProp(target, $mobx, adm);
    return adm;
}
var observablePropertyConfigs = Object.create(null);
var computedPropertyConfigs = Object.create(null);
function generateObservablePropConfig(propName) {
    return observablePropertyConfigs[propName] || (observablePropertyConfigs[propName] = {
        configurable: true,
        enumerable: true,
        get: function () {
            return this[$mobx].read(propName);
        },
        set: function (v) {
            this[$mobx].write(propName, v);
        }
    });
}
function getAdministrationForComputedPropOwner(owner) {
    var adm = owner[$mobx];
    if (!adm) {
        initializeInstance(owner);
        return owner[$mobx];
    }
    return adm;
}
function generateComputedPropConfig(propName) {
    return computedPropertyConfigs[propName] || (computedPropertyConfigs[propName] = {
        configurable: false,
        enumerable: false,
        get: function () {
            return getAdministrationForComputedPropOwner(this).read(propName);
        },
        set: function (v) {
            getAdministrationForComputedPropOwner(this).write(propName, v);
        }
    });
}
var isObservableObjectAdministration = createInstanceofPredicate('ObservableObjectAdministration', ObservableObjectAdministration);
function isObservableObject(thing) {
    if (isObject(thing)) {
        initializeInstance(thing);
        return isObservableObjectAdministration(thing[$mobx]);
    }
    return false;
}
function getAtom(thing, property) {
    if (typeof thing === 'object' && thing !== null) {
        if (isObservableArray(thing)) {
            if (property !== undefined)
                fail('production' !== 'production' && 'It is not possible to get index atoms from arrays');
            return thing[$mobx].atom;
        }
        if (isObservableSet(thing)) {
            return thing[$mobx];
        }
        if (isObservableMap(thing)) {
            var anyThing = thing;
            if (property === undefined)
                return anyThing._keysAtom;
            var observable = anyThing._data.get(property) || anyThing._hasMap.get(property);
            if (!observable)
                fail('production' !== 'production' && 'the entry \'' + property + '\' does not exist in the observable map \'' + getDebugName(thing) + '\'');
            return observable;
        }
        initializeInstance(thing);
        if (property && !thing[$mobx])
            thing[property];
        if (isObservableObject(thing)) {
            if (!property)
                return fail('production' !== 'production' && 'please specify a property');
            var observable = thing[$mobx].values.get(property);
            if (!observable)
                fail('production' !== 'production' && 'no observable property \'' + property + '\' found on the observable object \'' + getDebugName(thing) + '\'');
            return observable;
        }
        if (isAtom(thing) || isComputedValue(thing) || isReaction(thing)) {
            return thing;
        }
    } else if (typeof thing === 'function') {
        if (isReaction(thing[$mobx])) {
            return thing[$mobx];
        }
    }
    return fail('production' !== 'production' && 'Cannot obtain atom from ' + thing);
}
function getAdministration(thing, property) {
    if (!thing)
        fail('Expecting some object');
    if (property !== undefined)
        return getAdministration(getAtom(thing, property));
    if (isAtom(thing) || isComputedValue(thing) || isReaction(thing))
        return thing;
    if (isObservableMap(thing) || isObservableSet(thing))
        return thing;
    initializeInstance(thing);
    if (thing[$mobx])
        return thing[$mobx];
    fail('production' !== 'production' && 'Cannot obtain administration from ' + thing);
}
function getDebugName(thing, property) {
    var named;
    if (property !== undefined)
        named = getAtom(thing, property);
    else if (isObservableObject(thing) || isObservableMap(thing) || isObservableSet(thing))
        named = getAdministration(thing);
    else
        named = getAtom(thing);
    return named.name;
}
var toString = Object.prototype.toString;
function deepEqual(a, b) {
    return eq(a, b);
}
function eq(a, b, aStack, bStack) {
    if (a === b)
        return a !== 0 || 1 / a === 1 / b;
    if (a == null || b == null)
        return false;
    if (a !== a)
        return b !== b;
    var type = typeof a;
    if (type !== 'function' && type !== 'object' && typeof b != 'object')
        return false;
    return deepEq(a, b, aStack, bStack);
}
function deepEq(a, b, aStack, bStack) {
    a = unwrap(a);
    b = unwrap(b);
    var className = toString.call(a);
    if (className !== toString.call(b))
        return false;
    switch (className) {
    case '[object RegExp]':
    case '[object String]':
        return '' + a === '' + b;
    case '[object Number]':
        if (+a !== +a)
            return +b !== +b;
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
    case '[object Date]':
    case '[object Boolean]':
        return +a === +b;
    case '[object Symbol]':
        return typeof Symbol !== 'undefined' && Symbol.valueOf.call(a) === Symbol.valueOf.call(b);
    }
    var areArrays = className === '[object Array]';
    if (!areArrays) {
        if (typeof a != 'object' || typeof b != 'object')
            return false;
        var aCtor = a.constructor, bCtor = b.constructor;
        if (aCtor !== bCtor && !(typeof aCtor === 'function' && aCtor instanceof aCtor && typeof bCtor === 'function' && bCtor instanceof bCtor) && ('constructor' in a && 'constructor' in b)) {
            return false;
        }
    }
    aStack = aStack || [];
    bStack = bStack || [];
    var length = aStack.length;
    while (length--) {
        if (aStack[length] === a)
            return bStack[length] === b;
    }
    aStack.push(a);
    bStack.push(b);
    if (areArrays) {
        length = a.length;
        if (length !== b.length)
            return false;
        while (length--) {
            if (!eq(a[length], b[length], aStack, bStack))
                return false;
        }
    } else {
        var keys = Object.keys(a);
        var key = void 0;
        length = keys.length;
        if (Object.keys(b).length !== length)
            return false;
        while (length--) {
            key = keys[length];
            if (!(has$1(b, key) && eq(a[key], b[key], aStack, bStack)))
                return false;
        }
    }
    aStack.pop();
    bStack.pop();
    return true;
}
function unwrap(a) {
    if (isObservableArray(a))
        return a.slice();
    if (isES6Map(a) || isObservableMap(a))
        return Array.from(a.entries());
    if (isES6Set(a) || isObservableSet(a))
        return Array.from(a.entries());
    return a;
}
function has$1(a, key) {
    return Object.prototype.hasOwnProperty.call(a, key);
}
function makeIterable(iterator) {
    iterator[Symbol.iterator] = self;
    return iterator;
}
function self() {
    return this;
}
if (typeof Proxy === 'undefined' || typeof Symbol === 'undefined') {
    throw new Error('[mobx] MobX 5+ requires Proxy and Symbol objects. If your environment doesn\'t support Symbol or Proxy objects, please downgrade to MobX 4. For React Native Android, consider upgrading JSCore.');
}
try {
    'production';
} catch (e) {
    var g = 'object' !== 'undefined' ? window : global;
    if (typeof undefined === 'undefined')
        g.process = {};
    g.process.env = {};
}
(function () {
    function testCodeMinification() {
    }
    if (testCodeMinification.name !== 'testCodeMinification' && 'production' !== 'production' && undefined !== 'true') {
        var varName = [
            'process',
            'env',
            'NODE_ENV'
        ].join('.');
        console.warn('[mobx] you are running a minified build, but \'' + varName + '\' was not set to \'production\' in your bundler. This results in an unnecessarily large and slow bundle');
    }
}());
if (typeof __MOBX_DEVTOOLS_GLOBAL_HOOK__ === 'object') {
    __MOBX_DEVTOOLS_GLOBAL_HOOK__.injectMobx({
        spy: spy,
        extras: { getDebugName: getDebugName },
        $mobx: $mobx
    });
}
exports.$mobx = $mobx;
exports.ObservableMap = ObservableMap;
exports.ObservableSet = ObservableSet;
exports.Reaction = Reaction;
exports._allowStateChanges = allowStateChanges;
exports._allowStateChangesInsideComputed = allowStateChangesInsideComputed;
exports._getAdministration = getAdministration;
exports._getGlobalState = getGlobalState;
exports._interceptReads = interceptReads;
exports._isComputingDerivation = isComputingDerivation;
exports._resetGlobalState = resetGlobalState;
exports.action = action;
exports.autorun = autorun;
exports.comparer = comparer;
exports.computed = computed;
exports.configure = configure;
exports.createAtom = createAtom;
exports.decorate = decorate;
exports.entries = entries;
exports.extendObservable = extendObservable;
exports.flow = flow;
exports.get = get;
exports.getAtom = getAtom;
exports.getDebugName = getDebugName;
exports.getDependencyTree = getDependencyTree;
exports.getObserverTree = getObserverTree;
exports.has = has;
exports.intercept = intercept;
exports.isAction = isAction;
exports.isArrayLike = isArrayLike;
exports.isBoxedObservable = isObservableValue;
exports.isComputed = isComputed;
exports.isComputedProp = isComputedProp;
exports.isObservable = isObservable;
exports.isObservableArray = isObservableArray;
exports.isObservableMap = isObservableMap;
exports.isObservableObject = isObservableObject;
exports.isObservableProp = isObservableProp;
exports.isObservableSet = isObservableSet;
exports.keys = keys;
exports.observable = observable;
exports.observe = observe;
exports.onBecomeObserved = onBecomeObserved;
exports.onBecomeUnobserved = onBecomeUnobserved;
exports.onReactionError = onReactionError;
exports.reaction = reaction;
exports.remove = remove;
exports.runInAction = runInAction;
exports.set = set;
exports.spy = spy;
exports.toJS = toJS;
exports.trace = trace;
exports.transaction = transaction;
exports.untracked = untracked;
exports.values = values;
exports.when = when;
}
// normalize.css/normalize.css
$fsx.f[34] =
function(){
$fsx.r(18)('normalize.css/normalize.css', '/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */\n\n/* Document\n   ========================================================================== */\n\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in iOS.\n */\n\nhtml {\n  line-height: 1.15; /* 1 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/* Sections\n   ========================================================================== */\n\n/**\n * Remove the margin in all browsers.\n */\n\nbody {\n  margin: 0;\n}\n\n/**\n * Render the `main` element consistently in IE.\n */\n\nmain {\n  display: block;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\n\nhr {\n  box-sizing: content-box; /* 1 */\n  height: 0; /* 1 */\n  overflow: visible; /* 2 */\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\npre {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * Remove the gray background on active links in IE 10.\n */\n\na {\n  background-color: transparent;\n}\n\n/**\n * 1. Remove the bottom border in Chrome 57-\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\n\nabbr[title] {\n  border-bottom: none; /* 1 */\n  text-decoration: underline; /* 2 */\n  text-decoration: underline dotted; /* 2 */\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/**\n * Add the correct font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Remove the border on images inside links in IE 10.\n */\n\nimg {\n  border-style: none;\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * 1. Change the font styles in all browsers.\n * 2. Remove the margin in Firefox and Safari.\n */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: inherit; /* 1 */\n  font-size: 100%; /* 1 */\n  line-height: 1.15; /* 1 */\n  margin: 0; /* 2 */\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\n\nbutton,\ninput { /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\n\nbutton,\nselect { /* 1 */\n  text-transform: none;\n}\n\n/**\n * Correct the inability to style clickable types in iOS and Safari.\n */\n\nbutton,\n[type="button"],\n[type="reset"],\n[type="submit"] {\n  -webkit-appearance: button;\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\n\nbutton::-moz-focus-inner,\n[type="button"]::-moz-focus-inner,\n[type="reset"]::-moz-focus-inner,\n[type="submit"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\n\nbutton:-moz-focusring,\n[type="button"]:-moz-focusring,\n[type="reset"]:-moz-focusring,\n[type="submit"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * Correct the padding in Firefox.\n */\n\nfieldset {\n  padding: 0.35em 0.75em 0.625em;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\n\nlegend {\n  box-sizing: border-box; /* 1 */\n  color: inherit; /* 2 */\n  display: table; /* 1 */\n  max-width: 100%; /* 1 */\n  padding: 0; /* 3 */\n  white-space: normal; /* 1 */\n}\n\n/**\n * Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\n\nprogress {\n  vertical-align: baseline;\n}\n\n/**\n * Remove the default vertical scrollbar in IE 10+.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10.\n * 2. Remove the padding in IE 10.\n */\n\n[type="checkbox"],\n[type="radio"] {\n  box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n\n[type="number"]::-webkit-inner-spin-button,\n[type="number"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n\n[type="search"] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/**\n * Remove the inner padding in Chrome and Safari on macOS.\n */\n\n[type="search"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n\n/* Interactive\n   ========================================================================== */\n\n/*\n * Add the correct display in Edge, IE 10+, and Firefox.\n */\n\ndetails {\n  display: block;\n}\n\n/*\n * Add the correct display in all browsers.\n */\n\nsummary {\n  display: list-item;\n}\n\n/* Misc\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 10+.\n */\n\ntemplate {\n  display: none;\n}\n\n/**\n * Add the correct display in IE 10.\n */\n\n[hidden] {\n  display: none;\n}\n');
}
// path-to-regexp-es6/index.js
$fsx.f[35] =
function(module,exports){
var pathToRegExp = $fsx.r(36);
module.exports = pathToRegExp;
module.exports.parse = pathToRegExp.parse;
module.exports.compile = pathToRegExp.compile;
module.exports.tokensToFunction = pathToRegExp.tokensToFunction;
module.exports.tokensToRegExp = pathToRegExp.tokensToRegExp;
module.exports['default'] = module.exports;
}
// path-to-regexp@1.7.0/index.js
$fsx.f[36] =
function(module,exports){
var isarray = $fsx.r(32);
module.exports = pathToRegexp;
module.exports.parse = parse;
module.exports.compile = compile;
module.exports.tokensToFunction = tokensToFunction;
module.exports.tokensToRegExp = tokensToRegExp;
var PATH_REGEXP = new RegExp([
    '(\\\\.)',
    '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
].join('|'), 'g');
function parse(str, options) {
    var tokens = [];
    var key = 0;
    var index = 0;
    var path = '';
    var defaultDelimiter = options && options.delimiter || '/';
    var res;
    while ((res = PATH_REGEXP.exec(str)) != null) {
        var m = res[0];
        var escaped = res[1];
        var offset = res.index;
        path += str.slice(index, offset);
        index = offset + m.length;
        if (escaped) {
            path += escaped[1];
            continue;
        }
        var next = str[index];
        var prefix = res[2];
        var name = res[3];
        var capture = res[4];
        var group = res[5];
        var modifier = res[6];
        var asterisk = res[7];
        if (path) {
            tokens.push(path);
            path = '';
        }
        var partial = prefix != null && next != null && next !== prefix;
        var repeat = modifier === '+' || modifier === '*';
        var optional = modifier === '?' || modifier === '*';
        var delimiter = res[2] || defaultDelimiter;
        var pattern = capture || group;
        tokens.push({
            name: name || key++,
            prefix: prefix || '',
            delimiter: delimiter,
            optional: optional,
            repeat: repeat,
            partial: partial,
            asterisk: !!asterisk,
            pattern: pattern ? escapeGroup(pattern) : asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?'
        });
    }
    if (index < str.length) {
        path += str.substr(index);
    }
    if (path) {
        tokens.push(path);
    }
    return tokens;
}
function compile(str, options) {
    return tokensToFunction(parse(str, options));
}
function encodeURIComponentPretty(str) {
    return encodeURI(str).replace(/[\/?#]/g, function (c) {
        return '%' + c.charCodeAt(0).toString(16).toUpperCase();
    });
}
function encodeAsterisk(str) {
    return encodeURI(str).replace(/[?#]/g, function (c) {
        return '%' + c.charCodeAt(0).toString(16).toUpperCase();
    });
}
function tokensToFunction(tokens) {
    var matches = new Array(tokens.length);
    for (var i = 0; i < tokens.length; i++) {
        if (typeof tokens[i] === 'object') {
            matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$');
        }
    }
    return function (obj, opts) {
        var path = '';
        var data = obj || {};
        var options = opts || {};
        var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent;
        for (var i = 0; i < tokens.length; i++) {
            var token = tokens[i];
            if (typeof token === 'string') {
                path += token;
                continue;
            }
            var value = data[token.name];
            var segment;
            if (value == null) {
                if (token.optional) {
                    if (token.partial) {
                        path += token.prefix;
                    }
                    continue;
                } else {
                    throw new TypeError('Expected "' + token.name + '" to be defined');
                }
            }
            if (isarray(value)) {
                if (!token.repeat) {
                    throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`');
                }
                if (value.length === 0) {
                    if (token.optional) {
                        continue;
                    } else {
                        throw new TypeError('Expected "' + token.name + '" to not be empty');
                    }
                }
                for (var j = 0; j < value.length; j++) {
                    segment = encode(value[j]);
                    if (!matches[i].test(segment)) {
                        throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`');
                    }
                    path += (j === 0 ? token.prefix : token.delimiter) + segment;
                }
                continue;
            }
            segment = token.asterisk ? encodeAsterisk(value) : encode(value);
            if (!matches[i].test(segment)) {
                throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"');
            }
            path += token.prefix + segment;
        }
        return path;
    };
}
function escapeString(str) {
    return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1');
}
function escapeGroup(group) {
    return group.replace(/([=!:$\/()])/g, '\\$1');
}
function attachKeys(re, keys) {
    re.keys = keys;
    return re;
}
function flags(options) {
    return options.sensitive ? '' : 'i';
}
function regexpToRegexp(path, keys) {
    var groups = path.source.match(/\((?!\?)/g);
    if (groups) {
        for (var i = 0; i < groups.length; i++) {
            keys.push({
                name: i,
                prefix: null,
                delimiter: null,
                optional: false,
                repeat: false,
                partial: false,
                asterisk: false,
                pattern: null
            });
        }
    }
    return attachKeys(path, keys);
}
function arrayToRegexp(path, keys, options) {
    var parts = [];
    for (var i = 0; i < path.length; i++) {
        parts.push(pathToRegexp(path[i], keys, options).source);
    }
    var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options));
    return attachKeys(regexp, keys);
}
function stringToRegexp(path, keys, options) {
    return tokensToRegExp(parse(path, options), keys, options);
}
function tokensToRegExp(tokens, keys, options) {
    if (!isarray(keys)) {
        options = keys || options;
        keys = [];
    }
    options = options || {};
    var strict = options.strict;
    var end = options.end !== false;
    var route = '';
    for (var i = 0; i < tokens.length; i++) {
        var token = tokens[i];
        if (typeof token === 'string') {
            route += escapeString(token);
        } else {
            var prefix = escapeString(token.prefix);
            var capture = '(?:' + token.pattern + ')';
            keys.push(token);
            if (token.repeat) {
                capture += '(?:' + prefix + capture + ')*';
            }
            if (token.optional) {
                if (!token.partial) {
                    capture = '(?:' + prefix + '(' + capture + '))?';
                } else {
                    capture = prefix + '(' + capture + ')?';
                }
            } else {
                capture = prefix + '(' + capture + ')';
            }
            route += capture;
        }
    }
    var delimiter = escapeString(options.delimiter || '/');
    var endsWithDelimiter = route.slice(-delimiter.length) === delimiter;
    if (!strict) {
        route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?';
    }
    if (end) {
        route += '$';
    } else {
        route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)';
    }
    return attachKeys(new RegExp('^' + route, flags(options)), keys);
}
function pathToRegexp(path, keys, options) {
    if (!isarray(keys)) {
        options = keys || options;
        keys = [];
    }
    options = options || {};
    if (path instanceof RegExp) {
        return regexpToRegexp(path, keys);
    }
    if (isarray(path)) {
        return arrayToRegexp(path, keys, options);
    }
    return stringToRegexp(path, keys, options);
}
}
// resolve-pathname/cjs/index.js
$fsx.f[38] =
function(module,exports){
exports.__esModule = true;
function isAbsolute(pathname) {
    return pathname.charAt(0) === '/';
}
function spliceOne(list, index) {
    for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1) {
        list[i] = list[k];
    }
    list.pop();
}
function resolvePathname(to) {
    var from = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var toParts = to && to.split('/') || [];
    var fromParts = from && from.split('/') || [];
    var isToAbs = to && isAbsolute(to);
    var isFromAbs = from && isAbsolute(from);
    var mustEndAbs = isToAbs || isFromAbs;
    if (to && isAbsolute(to)) {
        fromParts = toParts;
    } else if (toParts.length) {
        fromParts.pop();
        fromParts = fromParts.concat(toParts);
    }
    if (!fromParts.length)
        return '/';
    var hasTrailingSlash = void 0;
    if (fromParts.length) {
        var last = fromParts[fromParts.length - 1];
        hasTrailingSlash = last === '.' || last === '..' || last === '';
    } else {
        hasTrailingSlash = false;
    }
    var up = 0;
    for (var i = fromParts.length; i >= 0; i--) {
        var part = fromParts[i];
        if (part === '.') {
            spliceOne(fromParts, i);
        } else if (part === '..') {
            spliceOne(fromParts, i);
            up++;
        } else if (up) {
            spliceOne(fromParts, i);
            up--;
        }
    }
    if (!mustEndAbs)
        for (; up--; up) {
            fromParts.unshift('..');
        }
    if (mustEndAbs && fromParts[0] !== '' && (!fromParts[0] || !isAbsolute(fromParts[0])))
        fromParts.unshift('');
    var result = fromParts.join('/');
    if (hasTrailingSlash && result.substr(-1) !== '/')
        result += '/';
    return result;
}
exports.default = resolvePathname;
module.exports = exports['default'];
}
// tiny-invariant/dist/tiny-invariant.cjs.js
$fsx.f[39] =
function(module,exports){
var isProduction = 'production' === 'production';
var prefix = 'Invariant failed';
function invariant(condition, message) {
    if (condition) {
        return;
    }
    if (isProduction) {
        throw new Error(prefix);
    } else {
        throw new Error(prefix + ': ' + (message || ''));
    }
}
module.exports = invariant;
}
// tiny-warning/dist/tiny-warning.cjs.js
$fsx.f[40] =
function(module,exports){
var isProduction = 'production' === 'production';
function warning(condition, message) {
    if (!isProduction) {
        if (condition) {
            return;
        }
        var text = 'Warning: ' + message;
        if (typeof console !== 'undefined') {
            console.warn(text);
        }
        try {
            throw Error(text);
        } catch (x) {
        }
    }
}
module.exports = warning;
}
// value-equal/cjs/index.js
$fsx.f[41] =
function(module,exports){
exports.__esModule = true;
var _typeof = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function (obj) {
    return typeof obj;
} : function (obj) {
    return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj;
};
function valueEqual(a, b) {
    if (a === b)
        return true;
    if (a == null || b == null)
        return false;
    if (Array.isArray(a)) {
        return Array.isArray(b) && a.length === b.length && a.every(function (item, index) {
            return valueEqual(item, b[index]);
        });
    }
    var aType = typeof a === 'undefined' ? 'undefined' : _typeof(a);
    var bType = typeof b === 'undefined' ? 'undefined' : _typeof(b);
    if (aType !== bType)
        return false;
    if (aType === 'object') {
        var aValue = a.valueOf();
        var bValue = b.valueOf();
        if (aValue !== a || bValue !== b)
            return valueEqual(aValue, bValue);
        var aKeys = Object.keys(a);
        var bKeys = Object.keys(b);
        if (aKeys.length !== bKeys.length)
            return false;
        return aKeys.every(function (key) {
            return valueEqual(a[key], b[key]);
        });
    }
    return false;
}
exports.default = valueEqual;
module.exports = exports['default'];
}
var global = window
$fsx.r(0)
})($fsx);


//# sourceMappingURL=app_quantum.js.map