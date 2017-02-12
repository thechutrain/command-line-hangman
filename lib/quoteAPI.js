var unirest = require("unirest");

// My modules
var private = require("./private");
var Word = require("./Word");

var getRandomQuote = function(){
  return new Promise(function(resolve, reject){
    // Make API call
    unirest.post("https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous")
    // .header("X-Mashape-Key", private.quote_API_KEY)
    .header("X-Mashape-Key", process.argv[2] || private.quote_API_KEY)
    .header("Content-Type", "application/x-www-form-urlencoded")
    .header("Accept", "application/json")
    .end(function (result) {
      if (result.status !== 200) reject({"status_code": result.status});
      else {
        // console.log(result.body);
        var body = JSON.parse(result.body);
        var currentWord = new Word(body.author);
        var quoteObj = { quote: body.quote, word: currentWord };
        resolve(quoteObj);
      }
    }) // closes .end()
  }) // closes promise
}


module.exports = getRandomQuote;