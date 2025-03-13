//emoji  windows  + .

const SECRET_NUMBER = Math.trunc(Math.random() * 20) + 1;

document.querySelector('.number').textContent = SECRET_NUMBER;

const btn = document.querySelector('.check');

let score = 20;

const scoreElement = document.querySelector('.score');
scoreElement.textContent = score;

btn.addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  if (!guess) {
    document.querySelector('.message').textContent = '⛔ Please enter a number';
  } else if (guess === SECRET_NUMBER) {
    document.querySelector('.message').textContent = '🎉 Correct Number!';
  } else if (guess > SECRET_NUMBER) {
    if (score > 1) {
      score--;
      document.querySelector('.message').textContent = '📈 Too high';
    } else {
      score = 0;
      document.querySelector('.message').textContent = '😭 Yoy lost the game!';
    }
  } else if (guess < SECRET_NUMBER) {
    if (score > 1) {
      score--;
      document.querySelector('.message').textContent = '📉 Too low';
    } else {
      score = 0;
      document.querySelector('.message').textContent = '😭 Yoy lost the game!';
    }
  }
  scoreElement.textContent = score;
});
