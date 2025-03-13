//emoji  windows  + .

let secretNumber = generateSecretNumber();
let score = 20;
let highscore = 0;

const btn = document.querySelector('.check');

document.querySelector('.guess').value = '';

const scoreElement = document.querySelector('.score');
scoreElement.textContent = score;

function generateSecretNumber() {
  return Math.trunc(Math.random() * 20) + 1;
}

function displayMessage(message) {
  document.querySelector('.message').textContent = message;
}

// Game logic
btn.addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  // When there is no input
  if (!guess) {
    displayMessage('⛔ Please enter a number');

    // When players wins
  } else if (guess === secretNumber) {
    displayMessage('🎉 Correct Number!');
    document.querySelector('.number').textContent = secretNumber;
    document.body.style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';

    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').te = highscore;
    }

    // When guess is wrong
  } else if (guess !== secretNumber) {
    if (score > 1) {
      score--;
      displayMessage(guess > secretNumber ? '📈 Too high' : '📉 Too low');
    } else {
      score = 0;
      displayMessage('😭 Yoy lost the game!');
    }
    scoreElement.textContent = score;
  }
});

// Reset game
const resetBtn = document.querySelector('.again');

resetBtn.addEventListener('click', function () {
  secretNumber = generateSecretNumber();
  score = 20;

  displayMessage('Start guessing...');
  document.querySelector('.number').textContent = '?';
  scoreElement.textContent = score;
  document.querySelector('.guess').value = '';

  document.body.style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
});
