const { Command } = require('commander');
const readline = require('readline');

const program = new Command();
// Creating an interactive command-line interface for reading user input (stdin) and writing output (stdout) using readline
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
// constants
let number;
let attempts = 0;
let max;

program.version('1.0.0').description('A simple number guessing game');

// Starting the game by displaying a welcome message, asking for difficulty level, and setting the number of attempts based on the user's choice.
function game() {
  console.log('Welcome to the Number Guessing Game!');
  console.log("I'm thinking of a number between 1 and 100.");
  console.log('\nPlease select the difficulty level:');
  console.log('1. Easy (10 chances)');
  console.log('2. Medium (5 chances)');
  console.log('3. Hard (3 chances)');

  rl.question('\nEnter your choice (1/2/3): ', (choice) => {
    switch (choice.trim()) {
      case '1':
        max = 10;
        console.log('\nGreat! You have selected the "Easy" difficulty level.');
        break;
      case '2':
        max = 5;
        console.log('\nGreat! You have selected the "Medium" difficulty level.');
        break;
      case '3':
        max = 3;
        console.log('\nGreat! You have selected the "Hard" difficulty level.');
        break;
      default:
        console.log('\nInvalid choice. Please enter 1, 2, or 3.');
        game();
        return;
    }

    console.log(`Let's start the game! You have ${max} chances.`);
    number = Math.floor(Math.random() * 100) + 1;
    play();
  });
}
//  Handling the gameplay loop
function play() {
  if (attempts >= max) {
    console.log(`You've run out of attempts. The correct number was ${number}.`);
    rl.close();
    return;
  }

  rl.question(`\nAttempt ${attempts + 1}/${max} - Enter your guess (1-100): `, (answer) => {
    const input = parseInt(answer, 10);

    if (isNaN(input) || input < 1 || input > 100) {
      console.log('Please enter a valid number between 1 and 100.');
      play();
      return;
    }

    attempts++;

    if (input === number) {
      console.log(`Congratulations! You guessed the correct number in ${attempts} attempts.`);
      rl.close();
    } else if (input < number) {
      console.log('Too low! Try again.');
      play();
    } else {
      console.log('Too high! Try again.');
      play();
    }
  });
}

game();
