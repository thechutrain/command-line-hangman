var inquirer = require("inquirer");

// my files
var quote = require("./quoteAPI");
var Word = require("./Word");

var test = new Word("HELLO WORLD", true);
// var test = new Word("HELLO WORLD", false);

test.toString();

// 1. Get a random quote!
// quote.getRandomQuote().then(
//     function(response){
//     console.log("---- from a fulfilled promise -----");
//     console.log(response);
//     }, function(err){
//         console.log(err);
//     }
// );