var unirest = require("unirest");
var private = require("./private");

unirest.post("https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous")
    .header("X-Mashape-Key", private.quote_API_KEY)
    .header("Content-Type", "application/x-www-form-urlencoded")
    .header("Accept", "application/json")
    .end(function (result) {
    // console.log(result.status, result.headers, result.body);
    console.log(result.body);
});

// console.log(private.quote_API_KEY);