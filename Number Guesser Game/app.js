/*
  Rules that Number Guesser Game will follow
  - Player must guess a number between a min and max
  - Player gets certain amount of guesses
  - Notify the player about the number of remaining guesses
  - If the player looses game then notify player about the correct answer
  - Let player choose to play again
*/

// Game values
let min = 1;
let max = 10;
let winningNumber = getRandomNum(min, max);
let guessesLeft = 3;


// UI elements
const game = document.getElementById('#game');
const minNum = document.querySelector('.min-num');
const maxNum = document.querySelector('.max-num');
const guessBtn = document.querySelector('#guess-btn');
const guessInput = document.querySelector('#guess-input');
const message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// // Play again event listener
// game.addEventListener('mousedown', function(e){
//   if(e.target.className === 'play-again'){
//     window.location.reload();
//   }
// });

// Listen for guess
guessBtn.addEventListener('click', function(){
  // If you check the console and see the below input value in black color that means it is string, so we need to parse the the string value to integer
  //console.log(guessInput.value);

  let guess = parseInt(guessInput.value);
  console.log(guess);

  // Validate input
  // Check if the input is not blank, check if it is not less than minimum or higher than maximum
   if(isNaN(guess) || guess < min || guess > max) {
     // Error message should be in red color
     setMessage(`Please enter a number between ${min} and ${max}`, 'red');
   }

   // Check if the guess is equal to the winning Number
   if(guess === winningNumber) {
     // Game over -> won

     // // Disable input
     // guessInput.disabled = true;
     //
     // // Make the border green, to indicate that player won
     // guessInput.style.borderColor = 'green';
     //
     // // Set the sucess Message
     // setMessage(`${winningNumber} is correct, YOU WIN!`, 'green');
     gameOver(true, `${winningNumber} is correct, YOU WIN!`);

   } else {
     // Wrong number
     guessesLeft -= 1;

     if(guessesLeft === 0) {
       // Game over  -> lost

       // // Disable input
       // guessInput.disabled = true;
       //
       // // Make the border red, to indicate that player lost
       // guessInput.style.borderColor = 'red';
       //
       // // Set the sucess Message
       // setMessage(`Game Over, you lost. The correct number was ${winningNumber}!`, 'red');

       gameOver(false, `Game Over, you lost. The correct number was ${winningNumber}!`);

     } else {
       // Game continues - answer wrong

       // Make the border red, to indicate that player's guess is not correct.
       guessInput.style.borderColor = 'red';

       // Clear the Input
       guessInput.value = '';

       // Tell the player that his guess is wrong
       setMessage(`Unfortunately, ${guess} is not correct. You have ${guessesLeft} guesses left.`, 'red');
     }
   }
});

// Function game over
function gameOver(won, msg) {

  let color;
  won === true ?  color = 'green' : color = 'red';
  // Disable input
  guessInput.disabled = true;

  // Change the border color
  guessInput.style.borderColor = color;

  // Change the text color
  message.style.color = color;

  // Set message
  setMessage(msg);

  // // Play Again?
  // guessBtn.value = 'Play Again';
  // //Add a class to Play Again button because we need add event handler for this new version of button
  // guessBtn.className += 'play-again';

}

// Get winning Number
function getRandomNum(min, max) {
  return Math.floor(Math.random()*(max-min+1)+min);
}

// Function to set a message
function setMessage(msg, color) {

  message.style.color = color;

  // Output the message into the paragraph with class - message
  message.textContent = msg;
}
