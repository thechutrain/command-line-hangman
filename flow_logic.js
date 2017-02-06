var inquirer = require("inquirer");
var figlet = require("figlet");
var clear = require('clear');

playGame(true);

// 1. Ask user if they want to play the game
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
            // TO DO:
            // FUNCTION - get a random quote
            // FUNCTION save that word somewhere
            guessLetter(false);
            // 
        } else {
            // They don't want to play :(
            clear();
            console.log("Okay, come back when you want to play!");
        }
    })
}; // closes playGame



// 2. Ask user what letter to guess
function guessLetter(againBool){
    var correctLetter = "J";

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
        // console.log(response.letter.toUpperCase());
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
