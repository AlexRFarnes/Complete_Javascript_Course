//emoji  windows  + .

const btn = document.querySelector('.check');

btn.addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  if (!guess) {
    document.querySelector('.message').textContent = '⛔ Please enter a number';
  }
});
