// constructor file 
// methods:
// checked guessed letter and with random word

var Letter = require("./Letter");

function Word(_author){
    this.author = _author;
    this.letterArray = []; // array containing letter objects
    this.incorrectLetters = [];
    this.incorrectGuess = 0;
    this.init();
}

/* -- Word.prototype.init() --
* runs every time a new Word() is created.
*  Creates a Letter object for each letter, 
* but only shows non-alphabetic symbols.
*/
Word.prototype.init = function(){
  var regExp = /^[a-zA-Z]{1}$/;
    for (var ltr of this.author){
      if (regExp.test(ltr)){
        this.letterArray.push(new Letter(ltr));
      } else {
        this.letterArray.push(new Letter(ltr, true));
      } 
    }
}

/* ----- Word.prototype.show() -----
* logs currently visible word in console
*/ 
Word.prototype.show = function(){
    var displayStr = ""
    this.letterArray.forEach(function(ltr){
        if (ltr.display){
            displayStr += ` ${ltr.letter} `;
        } else {
            displayStr += " __ ";
        }
    })
    console.log(displayStr);
}

/* ----- Word.prototype.showAnswer() -----
* changes display to true for all & consoles
*/ 
Word.prototype.showAll = function(){
    var displayStr = ""
    this.letterArray.forEach(function(ltr){
      displayStr += ` ${ltr.letter} `;
      ltr.display = true;
    })
    return displayStr;
}

/* ----- Word.prototype.hasLetter() -----
* checks to see if that letter is in word,
* & if it's already been guessed or not.
*/ 
Word.prototype.hasLetter = function(ltr){
    var newGuess = true;
    var correctGuess = false;
    // check to see if ltr is in letterArray
    this.letterArray.forEach(function(ltrObj){
        if (ltrObj.letter == ltr.toUpperCase()){
          if (ltrObj.display){
            newGuess = false;
            correctGuess = true;
          } else {
            correctGuess = true;
            ltrObj.show();
          }
        }
    }) // end forEach
    // check that incorrect guess is really new
    if (!correctGuess){
      newGuess = this.incorrectLetters.indexOf(ltr.toUpperCase()) == -1 ? true : false;
      if (newGuess){
        this.incorrectLetters.push(ltr.toUpperCase());
        this.incorrectGuess +=1;
      }
    }
    return {correct: correctGuess, newGuess: newGuess};
}

/* ----- Word.prototype.solved() -----
* checks to see if word has been solved or not
*/ 
Word.prototype.solved = function(){
    var solved = true;
    this.letterArray.forEach(function(ltrObj){
        if (ltrObj.display == false) {
          solved = false;
        }
    });
    return solved;
}

// Export!
module.exports = Word;

