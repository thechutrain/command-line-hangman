var inquirer = require("inquirer");
var figlet = require("figlet");
var clear = require('clear');


// my files
var quote = require("./lib/quoteAPI");
var Word = require("./lib/Word");

// Start the game
playGame(true);


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
  if (!againBool){
    console.log(`Who said ... \n"${quoteObj.quote}"`);
    quoteObj.word.show();
  }
  
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
    console.log(`Who said ... \n"${quoteObj.quote}"`);

    // 1. check if the letter is in word
    var found = quoteObj.word.hasLetter(response.letter);
    if (found){
      quoteObj.word.show();
      console.log(`Found a(n) "${response.letter}"`);
    } else {
      quoteObj.word.show();
      console.log(`Did not find a(n) "${response.letter}"`);
    };

    // 2. check if user has won
    if (quoteObj.word.solved()){
          console.log(figlet.textSync("You WON!!!"));
          console.log(`Took you ${quoteObj.word.numGuess} guess(es)`);
          playGame(false);
    } else {
      guessLetter(true, quoteObj);
    }
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