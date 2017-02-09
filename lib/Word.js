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

    // if (correctGuess && newGuess){
    //   return {correct: true, msg: `Nice! we found a(n) "${ltr.toUpperCase()}"`};
    // } 
    // else if (correctGuess && !newGuess){
    //   return {correct: true, msg: `You already guessed a(n) "${ltr.toUpperCase()}" - silly!`};
    // } 
    // else if (!correctGuess && newGuess){
    //   this.incorrectLetters.push(ltr.toUpperCase());
    //   this.incorrectGuess +=1;
    //   return {correct: false, msg: `Sorry, no "${ltr.toUpperCase()}" found`};
    // } 
    // else {
    //   return {correct: false, msg: `Sorry bud, "${ltr.toUpperCase()}" still isn't the right letter.`};
    // }
}

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

// TESTING
var test = new Word("Frederick the (II) of Prussia!");
// test.show();
// // console.log(test.hasLetter("r"));
// // test.show();
console.log(test.incorrectGuess);
console.log(test.hasLetter("a"));
console.log(test.hasLetter("a"));
console.log(test.hasLetter("z"));
console.log(test.hasLetter("z"));
console.log(test.incorrectGuess);
// console.log(`Has this word been solved? ${test.solved()}`);
// console.log(test.hasLetter("h"));
// console.log(`Has this word been solved? ${test.solved()}`);
// console.log(test.hasLetter("e"));
// console.log(test.hasLetter("o"));
// console.log(`Has this word been solved? ${test.solved()}`);
// test.show();



//////////////////////////////////////////////
// function Word(word, show){
//     this.word = word;
//     this.show = show;
//     this.wordArray = [];
//     this.init();
//     // this.letter();
// }

// methods to get properties of word
// Word.prototype.letter = function(){
//     this.word.split("");
// }

// Word.prototype.init = function(){
//     if (this.show){
//         this.wordArray = this.word.split("");
//         // console.log(this.wordArray);
//     } else {
//         var re = new RegExp(/[\S]/, "gi");
//         this.wordArray = this.word.replace(re, "_").split("");
//         // console.log(this.wordArray);
//     }
//     // console.log(`Hello I "${this.word}" was created!`);
// }


// DEBUGGIN METHODS
// Word.prototype.toString = function(){
//     console.log(`Word: ${this.word}`);
//     console.log(`Show: ${this.show}`);
//     for (var letter of this.wordArray){
//         console.log(letter);
//     }
// }

// EXPORTING WORD OBJECT
// module.exports = Word;
