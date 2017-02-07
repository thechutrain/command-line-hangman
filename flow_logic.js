var inquirer = require("inquirer");
var figlet = require("figlet");
var clear = require('clear');


// my files
var quote = require("./quoteAPI");
var Word = require("./Word");

// Start the game
playGame(true);

// Global variables -- any way to store them passed into promise?
var quoteObj = quoteObj;
var currentWord = "testing 1234";


// FLOW PART 1) Ask user if they want to play the game
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
  .then(function(response){
    // console.log(response);
    if (response.play){
      // They want to play!
      clear()
      console.log("So you want to play eh??? Get ready then!");
      getQuote();
    } else {
      // They don't want to play :(
      clear();
      console.log("Okay, come back when you want to play!");
      console.log(figlet.textSync("Good bye"));
      }
  })
}; // closes playGame



// FLOW PART 2) Ask user what letter to guess
function guessLetter(againBool, quoteObj){
  console.log(`From guessLetter - quote: ${quoteObj.quote}`);
  quoteObj.word.show();
  console.log("---------------------");
  // console.log(`From guessLetter - word: ${quoteObj.word.show()}`);
  // // testing
  // var correctLetter = "J";
  // console.log(quoteObj);
  // console.log(currentWord.wordArray);

  // check if its the first time or repeated question?
  // TODO - add a validator to the question!
  if(againBool){
   question = { message: "Guess another letter: ", type: "input", name: "letter"};
  } else {
    question = { message: "Guess a letter: ", type: "input", name: "letter"};
  }
  // prompt question!
  inquirer.prompt(question)
  .then(function(response){
    clear(); 
    // Debugging
    console.log(quoteObj.quote);
    // quoteObj.quote & quoteObj.word

    // 1. check if the letter is in word
    var found = quoteObj.word.hasLetter(response.letter);
    if (found){
      console.log("Found a " + response.letter);
      quoteObj.word.show();
    } else {
      console.log("Did NOT find a " + response.letter);
      quoteObj.word.show();
    }
      // yes --> tell user correctLetter
      // no --> tell user they are wrong

    // 2. check if user has won
      // no --> then recusion
      // yes --> call play game

  }) // .then()
}; // closes guessLetter()


//////// HELPER FUNCTIONS
function getQuote(){
  quote.getRandomQuote()
  .then(function(quoteObj){
    // get a new quote if the author is unknown
    if (quoteObj.author == "unknown"){getQuote()};
    currentWord = new Word(quoteObj.author);
    currentQuote = quoteObj.quote;
    // console.log(quoteObj);
    guessLetter(false, {"word": currentWord, "quote": currentQuote});
  }, (err) => console.log(err));
  
}