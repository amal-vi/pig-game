'use strict';
//? selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const currScore0El = document.getElementById('current--0');
const currScore1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

let playing, scores, currentScore, activePlayer;

//?buttons
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//? function to switch player
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  //? finding the active player
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  //? toggling class of active player
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  currScore0El.textContent = 0;
  currScore1El.textContent = 0;

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  diceEl.classList.add('hidden');
};

//? on reloading all scores are resetted
init();

//? removig the dice
diceEl.classList.add('hidden');

//? rolling dice functionality

btnRoll.addEventListener('click', function () {
  //? 1.generating a random dice roll
  const dice = Math.trunc(Math.random() * 6) + 1;
  //? 2.display dice
  diceEl.classList.remove('hidden');
  diceEl.src = `img/dice-${dice}.png`;
  //? 3.check for rolled 1 : true,switch player
  if (dice !== 1) {
    //? add to current score
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    //? switch player
    switchPlayer();
  }
});

//? function for holding the scores
btnHold.addEventListener('click', function () {
  //? add current score to activeplayers score
  scores[activePlayer] += currentScore;
  //? displaying the score
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];
  //?check score >= 100
  if (scores[activePlayer] >= 100) {
    //?finish
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
  } else {
    //? switch to next player
    switchPlayer();
  }
});

//? new game
btnNew.addEventListener('click', init);
