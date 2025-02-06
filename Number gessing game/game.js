const { Command } = require('commander');
const program = new Command();
let max;

program.version('1.0.0').description('A simple number guessing game').requiredOption('-d, --difficulty <level>', 'Set difficulty level (easy, medium, hard)').option('-g, --guesses <numbers...>', 'List of guesses (separated by spaces)');

program.parse(process.argv);
const options = program.opts();

function game(difficulty, guesses) {
  console.log('Welcome to the Number Guessing Game!');
  console.log("I'm thinking of a number between 1 and 100");

  switch (difficulty.toLowerCase()) {
    case 'easy':
      max = 10;
      break;
    case 'medium':
      max = 5;
      break;
    case 'hard':
      max = 3;
      break;
    default:
      console.log('Invalid difficulty level. Choose easy, medium, or hard');
      process.exit(1);
  }

  const number = Math.floor(Math.random() * 100) + 1;
  console.log(`Target number (for debugging): ${number}`);

  if (!guesses || guesses.length === 0) {
    console.log(`Game started! You have ${max} attempts`);
    console.log('Make guesses using: node guess.js -d hard -g 30 50 70');
    process.exit();
  }

  let attempts = 0;
  for (const guess of guesses) {
    const input = parseInt(guess, 10);

    if (isNaN(input)) {
      console.log(`"${guess}" is not a valid number.`);
      continue;
    }

    attempts++;

    if (attempts > max) {
      console.log(`You've run out of attempts! The correct number was ${number}.`);
      process.exit();
    }

    if (input === number) {
      console.log(`Congratulations! You guessed the correct number in ${attempts} attempts.`);
      process.exit();
    } else if (input < number) {
      console.log(`Guess ${input}: Too low!`);
    } else {
      console.log(`Guess ${input}: Too high!`);
    }
  }

  console.log(`Attempts used: ${attempts}/${max}`);
  console.log('Try again with more guesses.');
}
game(options.difficulty, options.guesses);
