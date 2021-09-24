'use strict';

//Selecting the elements:
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');

//Selecting buttons elements:
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

//Setting the game up:
let scores, currentScore, activePlayer, playing;

const initialization = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  //A variable that we declare, in order to disable the buttons upon game ending,
  //so it wont run after we have a winner:
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

initialization();

//Refactoring the code according to DRY principle:
const switchPlayer = function () {
  //Reset current score:
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  //Switch player:
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Rolling dice functionality:
btnRoll.addEventListener('click', function () {
  if (playing) {
    //Generate a random number:
    const dice = Math.trunc(Math.random() * 6) + 1;
    //Display the dice on the board:
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //Check whether the number is 1 or not:
    if (dice === 1) {
      switchPlayer();
    } else {
      //Add dice score to current score:
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }
  }
});

//Hold button functionality:
btnHold.addEventListener('click', function () {
  if (playing) {
    //1.Hold the current score in the total score:
    //Storing current score in scores array:
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2.Check whether score is greater than 100 - switch player/player win
    if (scores[activePlayer] >= 20) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      playing = false;
      diceEl.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});

//New game button functionality:
btnNew.addEventListener('click', initialization);
