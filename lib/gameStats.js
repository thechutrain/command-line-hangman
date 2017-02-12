var inquirer = require("inquirer");

var stats = {
  correctQuotes: [],
  incorrectQuotes: [],
  addCorrect: function(quote){
    this.correctQuotes.push(quote);
  },
  addIncorrect: function(quote){
    this.incorrectQuotes.push(quote);
  },
  getWins: function(){
    return this.correctQuotes.length;
  },
  getLoses: function(){
    return this.incorrectQuotes.length;
  },
  showStats: function(){
    // use inquirer
    inquirer.prompt({ message: "Want to see what you got right?", type: "confirm", name: "play"})
    .then(function(userInput){
      console.log(userInput);
      if (userInput.play){
        console.log(`You got: ${stats.getWins()} correct`);
        console.log(`You got: ${stats.getLoses()} wrong`);
      }
    })
  }
}

// to do
// stats.prototype.toString = function(){};
// stats.prototype.showStats = ;

module.exports = stats;