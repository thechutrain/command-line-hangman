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
    return correctQuotes.lenth;
  },
  getLoses: function(){
    return incorrectQuotes.length;
  }
}

// to do
// stats.prototype.toString = function(){};

module.exports = stats;