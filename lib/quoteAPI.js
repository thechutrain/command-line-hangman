var unirest = require("unirest");
var private = require("./private");

 function getRandomQuote(){
    return new Promise(function(resolve, reject){
        unirest.post("https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous")
        .header("X-Mashape-Key", private.quote_API_KEY)
        .header("Content-Type", "application/x-www-form-urlencoded")
        .header("Accept", "application/json")
        .end(function (result) {
        // console.log(result.status, result.headers, result.body);
        // console.log("------------");
        // console.log(result.status);
        if (result.status !== 200) reject({"status_code": result.status});
        else {
        // console.log(result.body);
        var body = JSON.parse(result.body);
        var quoteObj = { quote: body.quote, author: body.author };
        // console.log(quoteObj);
        resolve(quoteObj);
        }
    
        }) // closes .end()
    }) // closes promise
}

var getQuote = function(){
  return new Promise(function(resolve, reject){

  getRandomQuote()
    .then(function(quoteObj){
      // console.log(quoteObj);
      // get a new quote if the author is unknown
      // if (quoteObj.author == "unknown"){getQuote()}; 
      currentWord = new Word(quoteObj.author);
      currentQuote = quoteObj.quote;
      resolve({"word": currentWord, "quote": currentQuote});
    }, (err) => {
      console.log(err);
      console.log("getting another quote");
      getQuote();
      reject("Fuckkkk");
    }); // .then
  }) // closes promise
} // closes func

// module.exports = getQuote;

// TESTING!
getQuote().then(quote =>{
  console.log(quote);
})