var unirest = require("unirest");
var private = require("./private");

exports.getRandomQuote = function(){
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


// TESTING!
// console.log(private.quote_API_KEY);
// getRandomQuote().then(
//     function(response){
//     console.log("---- from a fulfilled promise -----");
//     console.log(response);
//     }, function(err){
//         console.log(err);
//     })