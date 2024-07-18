const gameContainer = document.getElementById('game-container');
const gameBoard = document.getElementById('game-board');
const scoreElement = document.getElementById('score');

// game settings
const boardSize = 20;
const snakeStartLength = 5;
const foodSpawnChance = 0.1;

// game state
let snake = [];
let food = null;
let score = 0;
let direction = 'right';

// create game board
for (let i = 0; i < boardSize; i++) {
  for (let j = 0; j < boardSize; j++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    gameBoard.appendChild(cell);
  }
}

// initialize snake
for (let i = 0; i < snakeStartLength; i++) {
  snake.push({ x: i, y: 0 });
  const cell = gameBoard.children[i];
  cell.className += ' snake';
}

// spawn food
spawnFood();

