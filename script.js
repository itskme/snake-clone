const gameContainer = document.getElementById('game-container');
const gameBoard = document.getElementById('game-board');
const scoreElement = document.getElementById('score');
const speedSelect = document.getElementById('speed-select');

// game settings
const boardSize = 20;
const snakeStartLength = 5;
const foodSpawnChance = 0.1;

// game state
let snake = [];
let food = null;
let score = 0;
let direction = 'right';
let speed = 100; // default speed

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

// game loop
let intervalId = setInterval(() => {
  moveSnake();
  checkCollisions();
  updateScore();
}, speed);

// handle keyboard input
document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowUp':
      if (direction !== 'down') direction = 'up';
      break;
    case 'ArrowDown':
      if (direction !== 'up') direction = 'down';
      break;
    case 'ArrowLeft':
      if (direction !== 'right') direction = 'left';
      break;
    case 'ArrowRight':
      if (direction !== 'left') direction = 'right';
      break;
  }
});

// handle speed change
speedSelect.addEventListener('change', (e) => {
  clearInterval(intervalId);
  speed = parseInt(e.target.value);
  intervalId = setInterval(() => {
    moveSnake();
    checkCollisions();
    updateScore();
  }, speed);
});

// move snake
function moveSnake() {
  const head = snake[0];
  let newX = head.x;
  let newY = head.y;

  switch (direction) {
    case 'up':
      newY = (newY - 1 + boardSize) % boardSize;
      break;
    case 'down':
      newY = (newY + 1) % boardSize;
      break;
    case 'left':
      newX = (newX - 1 + boardSize) % boardSize;
      break;
    case 'right':
      newX = (newX + 1) % boardSize;
      break;
  }

  const newHead = { x: newX, y: newY };
  snake.unshift(newHead);

  const tail = snake.pop();
  const tailCell = gameBoard.children[tail.y * boardSize + tail.x];
  tailCell.className = 'cell';

  const headCell = gameBoard.children[newHead.y * boardSize + newHead.x];
  headCell.className += ' snake';
}

// check collisions
function checkCollisions() {
  const head = snake[0];
  if (
    head.x < 0 || head.x >= boardSize ||
    head.y < 0 || head.y >= boardSize ||
    snake.slice(1).some((part) => part.x === head.x && part.y === head.y)
  ) {
    gameOver();
  }

  if (food && head.x === food.x && head.y === food.y) {
    eatFood();
  }
}

// spawn food
function spawnFood() {
  let randomX;
  let randomY;
  do {
    randomX = Math.floor(Math.random() * boardSize);
    randomY = Math.floor(Math.random() * boardSize);
  } while (snake.some((part) => part.x === randomX && part.y === randomY));

  food = { x: randomX, y: randomY };
  const foodCell = gameBoard.children[food.y * boardSize + food.x];
  foodCell.className += ' food';
}

// eat food
function eatFood() {
  score++;
  scoreElement.textContent = `Score: ${score}`;
  snake.push({ x: food.x, y: food.y });
  spawnFood();
}

// game over
function gameOver() {
  alert(`Game Over! Your score is ${score}`);
  location.reload();
}