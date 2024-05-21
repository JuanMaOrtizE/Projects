'use strict';

let score = 20;
let secretNumber = Math.trunc(Math.random() * 20 + 1);
let highScore = 0;
console.log(secretNumber);

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

// Funcíon para chequear el número ingresado
document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  if (!guess) {
    displayMessage(`Debes ingresar un número primero`);
  } else if (guess === secretNumber) {
    displayMessage(`Número correcto!!`);
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    document.querySelector('.number').textContent = secretNumber;

    if (score > highScore) {
      highScore = score;
      document.querySelector('.highscore').textContent = highScore;
    }
  } else if (guess != secretNumber) {
    if (score > 1) {
      displayMessage(
        guess > secretNumber
          ? `Te pasaste un poco con tu número`
          : `Aumenta un poco más tu número`
      );

      score--;
      document.querySelector('.score').textContent = score;
    } else {
      displayMessage(`Perdiste!`);

      document.querySelector('.score').textContent = 0;
    }
  }
});

document.querySelector('.again').addEventListener(`click`, function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20 + 1);
  document.querySelector('.score').textContent = 20;
  document.querySelector('.number').textContent = `?`;
  document.querySelector('.guess').value = ``;
  displayMessage(`Start guessing!`);
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
});
