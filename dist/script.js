'use strict';
// Variables
const resetGame = document.querySelector('.btn--new');
const rollDice = document.querySelector('.btn--roll');
const HoldScore = document.querySelector('.btn--hold');
const diceEl = document.querySelector('.dice');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const player0NameEl = document.querySelector('#name--0');
const player1NameEl = document.querySelector('#name--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const currentScore0El = document.querySelector('#current--0');
const currentScore1El = document.querySelector('#current--1');
const btn = document.querySelectorAll('.btn');
let activeplayer;
let currentScore;
const winningScore = 100;
// GAME FUNCTIONS
const start = function () {
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
    score0El.textContent = score1El.textContent = '0';
    activeplayer = currentScore = 0;
    diceEl.classList.add('hidden');
    currentScore0El.textContent = currentScore1El.textContent = `${currentScore}`;
};
const switchPlayer = function () {
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
    activeplayer === 0 ? (activeplayer = 1) : (activeplayer = 0);
};
// SCORING
const checkScore = function () {
    const score0 = score0El.textContent ? +score0El.textContent : 0;
    const score1 = score1El.textContent ? +score1El.textContent : 0;
    if (score0 >= winningScore) {
        currentScore = 0;
        currentScore0El.textContent = `${currentScore}`;
        player0El.classList.add('player--winner');
        player0NameEl.textContent = '🏆 WINNER !';
        diceEl.classList.add('hidden');
    }
    if (score1 >= winningScore) {
        currentScore = 0;
        currentScore1El.textContent = `${currentScore}`;
        player1El.classList.add('player--winner');
        player1NameEl.textContent = '🏆 WINNER !';
        diceEl.classList.add('hidden');
    }
};
const diceRoll = function (dice) {
    currentScore += dice;
    diceEl.src = `./img/dice-${dice}.png`;
    diceEl.classList.remove('hidden');
    activeplayer === 0
        ? (currentScore0El.textContent = `${currentScore}`)
        : (currentScore1El.textContent = `${currentScore}`);
};
// ENSURING PLAYER SWITCHES WHEN DICE === 1
const playerValidation = function (dice) {
    if (dice === 1 && activeplayer === 0) {
        currentScore = 0;
        currentScore0El.textContent = `${currentScore}`;
        switchPlayer();
    }
    else if (dice === 1 && activeplayer === 1) {
        currentScore = 0;
        currentScore1El.textContent = `${currentScore}`;
        switchPlayer();
    }
};
const scoreHold = function () {
    if (activeplayer === 0) {
        score0El.textContent = `${Number(score0El.textContent) + currentScore}`;
        switchPlayer();
        currentScore = 0;
        currentScore0El.textContent = `${currentScore}`;
        checkScore();
    }
    else {
        score1El.textContent = `${Number(score1El.textContent) + currentScore}`;
        switchPlayer();
        currentScore = 0;
        currentScore1El.textContent = `${currentScore}`;
        checkScore();
    }
};
const resetPlayers = function () {
    if (player0El.classList.contains('player--winner')) {
        player0El.classList.remove('player--winner');
        player0NameEl.textContent = 'PLAYER 1';
    }
    else if (player1El.classList.contains('player--winner')) {
        player1El.classList.remove('player--winner');
        player1NameEl.textContent = 'PLAYER 2';
    }
};
// GAME STARTS
start();
// ACTION OF ROLL DICE
rollDice.addEventListener('click', () => {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceRoll(dice);
    checkScore();
    playerValidation(dice);
});
// ENSURING C.SCORE ADDS TO MAIN SCORE & SWITCHES PLAYER
HoldScore.addEventListener('click', scoreHold);
// THE RESET: ENSURES SCORES ARE 0 AND RESTARTS TO PLAYER ONE
resetGame.addEventListener('click', () => {
    start();
    resetPlayers();
});
//# sourceMappingURL=script.js.map