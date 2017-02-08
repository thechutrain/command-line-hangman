var inquirer = require("inquirer");
var figlet = require("figlet");
var clear = require('clear');

// my modules
var getQuote = require("./lib/quoteAPI");
var printColor = require("./lib/printColor");

// Start the game
playGame(true);

/******* Part I. ****** 
* use inquirer to ask if user wants to play
* YES! --> getQuote() --> and pass quoteObj to second part of inquirer
* NO --> say goodbye. 
*/
function playGame(firstTimeBool){
  if (firstTimeBool){
    // Welcome message
    console.log(figlet.textSync("Welcome to Hangman!"));
    question = { message: "Want to play hangman?", type: "confirm", name: "play"};
  } 
  else {
    question = { message: "Play another game?", type: "confirm", name: "play"};
  }
  // inquirer prompt!    
  inquirer.prompt(question)
  .then(function(input){
    // console.log(input);
    if (input.play){
      // They want to play!
      clear()
      console.log("So you want to play eh??? Get ready then!");
      getQuote().then(quoteObj => {
        // take the quoteObje --> pass to function that will ask user to guess a letter
        guessLetter(false, quoteObj);
      });
    } else {
      // They don't want to play :(
      clear();
      console.log("Okay, come back when you want to play!");
      console.log(figlet.textSync("Good bye"));
      }
  })
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

  // TODO - add a validator to the question!
  if(againBool){
   question = { message: "Guess another letter: ", type: "input", name: "letter"};
  } else {
    question = { message: "Guess a letter: ", type: "input", name: "letter"};
  }
  // prompt question!
  inquirer.prompt(question)
  .then(function(input){
    clear(); 
    console.log(`Who said ... \n"${quoteObj.quote}"`);
    console.log(quoteObj.word.author); // TAKE OUT LATER

    // 1. check if the letter is in word
    var found = quoteObj.word.hasLetter(input.letter);
    if (found){
      quoteObj.word.show();
      console.log(printColor.success("Nice guess!"));
      console.log(`Found a(n) "${input.letter}"`);
    } else {
      quoteObj.word.show();
      console.log(printColor.wrong("Nope."));
      console.log(`Did not find a(n) "${input.letter}"`);
    };

    // 2. check if user has won
    if (quoteObj.word.solved()){
          console.log(figlet.textSync("You WON!!!"));
          // console.log(`Took you ${quoteObj.word.numGuess} guess(es)`);
          console.log(`You had ${quoteObj.word.incorrectGuess} incorrect guess(es)`);
          playGame(false);
    } else {
      guessLetter(true, quoteObj);
    }
  }) // .then()
}; // closes guessLetter()
