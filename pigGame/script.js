'use strict';
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const currScore0El = document.querySelector('#current--0');
const currScore1El = document.querySelector('#current--1');

let currScore;
let activePlayer;
let scores;
let playing;

const init = function () {
  currScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  playing = true;
  player0El.classList.remove(`player--winner`);
  player1El.classList.remove(`player--winner`);
  player0El.classList.add(`player--active`);
  currScore0El.textContent = 0;
  currScore1El.textContent = 0;
  player1El.classList.remove(`player--active`);

  score0El.textContent = 0;
  score1El.textContent = 0;
};
init();

const switchPlayer = function () {
  currScore = 0;
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  player0El.classList.toggle(`player--active`);
  player1El.classList.toggle(`player--active`);
  activePlayer = activePlayer === 0 ? 1 : 0;
};

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add(`hidden`);

btnRoll.addEventListener(`click`, function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6 + 1);
    diceEl.classList.remove(`hidden`);
    diceEl.src = `dice-${dice}.png`;

    if (dice != 1) {
      currScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener(`click`, function () {
  if (playing) {
    scores[activePlayer] += currScore;
    console.log(scores);
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 50) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--active`);
      diceEl.classList.add(`hidden`);
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener(`click`, init);
