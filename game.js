var inquirer = require("inquirer");
var figlet = require("figlet");
var clear = require('clear');

// my modules
var getQuote = require("./lib/quoteAPI");
var printColor = require("./lib/printColor");
var stats = require("./lib/gameStats");
console.log(stats);

// Start the game
playGame(true);

/******* Part I. ****** 
* use inquirer to ask if user wants to play
* YES! --> getQuote() --> and pass quoteObj to second part of inquirer
* NO --> say goodbye. 
*/
function playGame(firstTimeBool){
  question = { message: "Play another game?", type: "confirm", name: "play"};
  if (firstTimeBool){
    clear();
    console.log(figlet.textSync("Welcome!"));
    question["message"] = "Want to play hangman?";
  } 
  // inquirer prompt!    
  inquirer.prompt(question)
  .then(function(input){
    if (input.play){
      clear()
      getQuote().then(quoteObj => {
        guessLetter(false, quoteObj);
      })
      .catch(err => {console.log(err)});
    } else {
      clear();
      stats.showStats();
      // console.log(figlet.textSync("Good bye"));
      // console.log("Okay, come back when you want to play!");
      // console.dir(stats);
    }
  }) // .then of inquirer
}; 

/******* Part II. ****** 
* Keep asking the user to guess a letter, as long as they have not  
* already guessed the correct word.
*/
function guessLetter(againBool, quoteObj){
  if (!againBool){
    console.log(`Who said ... \n"${quoteObj.quote}"`);
    quoteObj.word.show();
  }

  if (quoteObj.word.incorrectLetters.length !== 0){
    console.log(`Incorrect Letter(s): ${quoteObj.word.incorrectLetters.join(", ")}`);
  }
  // build the question
  var question = {
    type: "input", 
    name: "letter", 
    validate: function(value){
      var regexp = /^[a-zA-Z]{1}$/gi;
      return regexp.test(value) ? true : "please enter only one letter";
    }
  };
  question["message"] = againBool ? "Guess another letter: " :  "Guess a letter: ";

  // prompt question!
  inquirer.prompt(question)
  .then(function(input){
    clear(); 
    var guess = input.letter;
    console.log(`Who said ... \n"${quoteObj.quote}"`);
    // if (process.env.DEBUG) console.log(quoteObj.word.author);

    // 1. check if the letter is in word
    var result = quoteObj.word.hasLetter(input.letter);
    var message;
    if (result.correct){
      quoteObj.word.show();
      message = result.newGuess ?
      `Nice! we found a(n) "${guess.toUpperCase()}"`:
      `You already guessed a(n) "${guess.toUpperCase()}" - silly!`;
      console.log(printColor.success(message));
    } else {
      quoteObj.word.show();
      message = result.newGuess ? 
        `Sorry, no "${guess.toUpperCase()}" found` : 
        `Sorry bud, "${guess.toUpperCase()}" still isn't the right letter.`;
      console.log(printColor.wrong(message));
    };

    // 2. check if user has won
    if (quoteObj.word.solved()){
          console.log(figlet.textSync("You WON!!!"));
          console.log(`You had ${quoteObj.word.incorrectGuess} incorrect guess(es)`);
          stats.addCorrect(quoteObj);
          playGame(false);
    } else if (quoteObj.word.incorrectGuess > 7){
      console.log(`Out of Guesses! \n The answer was: ${quoteObj.word.showAll()}`);
      playGame(false);
    } else {
      guessLetter(true, quoteObj);
    }
  }) // .then()
}; // closes guessLetter()
