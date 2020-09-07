// Game values
let min = 1,
  max = 10,
  winningNum = getRandomWinningNum(min, max),
  guessesLeft = 3;


// UI Elements
const game = document.querySelector('#game'),
  minNum = document.querySelector('.min-num'),
  maxNum = document.querySelector('.max-num'),
  guessBtn = document.querySelector('#guess-btn'),
  guessInput = document.querySelector('#guess-input'),
  message = document.querySelector('.message');


// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;


// Play again event listener
game.addEventListener('mousedown', function (e) {
  if (e.target.className === 'play-again') {
    window.location.reload();
  }
});


// Listen for guess
guessBtn.addEventListener('click', function () {
  let guess = parseInt(guessInput.value);

  // Validate our input
  if (guess !== guess || guess < min || guess > max) {
    // If any of these are true then we don't want the game to continue
    // Set Message
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  };


  // Check if won
  if (guess === winningNum) {
    // Game Over - won
    gameOver(true, `${winningNum} is correct, YOU WIN!`);

  } else {
    // Wrong number
    guessesLeft -= 1;

    // Check to see if there are any guesses left
    if (guessesLeft === 0) {
      // Game Over - lost
      gameOver(false, `Game Over, you lost. The correct number was ${winningNum}`);
    } else {
      // Game continues - answer wrong

      // Change border color
      guessInput.style.borderColor = 'red';

      // Clear Input
      guessInput.value = '';

      // Tell user it's the wrong number
      setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');

    };
  };
});


// Game Over
function gameOver(won, msg) {
  let color;
  won === true ? color = 'green' : color = 'red';

  // Disable input
  guessInput.disabled = true;
  // Change border color
  guessInput.style.borderColor = color;
  // Set text color
  message.style.color = color;
  // Set message
  setMessage(msg);


  // Play Again
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';
};


// Get Random Winning Number
function getRandomWinningNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};


// Set Message function
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
};