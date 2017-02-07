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
var currentWord;
var userGuess;


// FLOW PART 1) Ask user if they want to play the game
function playGame(firstTimeBool){
    if (firstTimeBool){
        // Welcome message
        console.log(figlet.textSync("Welcome to Hangman!"));
        question = { message: "Want to play hangman?", type: "confirm", name: "play"};
    } else {
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
function guessLetter(againBool){
    // testing
    var correctLetter = "J";
    console.log(quoteObj);
    console.log(currentWord.wordArray);

    // check if its the first time or repeated question?
    if(againBool){
        question = { message: "Guess another letter: ", type: "input", name: "letter"};
    } else {
        question = { message: "Guess a letter: ", type: "input", name: "letter"};
    }
    // prompt question!
    inquirer.prompt(question)
    .then(function(response){
        // check what the letter is
        clear();
        
       // DEBUGGING
        if (response.letter.toUpperCase() != correctLetter){
            console.log(`${response.letter} is not the correct letter`);
            guessLetter(true);
        } else {
            console.log(`${correctLetter} was the correct letter!`);
            // ask user if they want to play again?
            playGame();
        }
    })
}; // closes guessLetter()


//////// HELPER FUNCTIONS
function getQuote(){
    // reset all variables

    quote.getRandomQuote().then(function(quote){

    if (quote.author == "unknown"){getQuote()};
        // console.log("From inquirer" + quote);
        quoteObj = quote;
        currentWord = new Word(quote.author, true);
        userGuess = new Word(quote.author, false);
        guessLetter(false);
    })
}