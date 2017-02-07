// constructor file 
// methods:
// checked guessed letter and with random word

var Letter = require("./Letter");

function Word(_author){
    this.author = _author;
    this.letterArray = []; // array containing letter objects
    this.numGuess = 0;
    this.init();
}

Word.prototype.init = function(){
    for (var ltr of this.author){
        this.letterArray.push(new Letter(ltr))
    }
}

Word.prototype.show = function(){
    var displayStr = ""
    this.letterArray.forEach(function(letter){
        if (letter.display){
            displayStr += ` ${letter.letter} `;
        } else {
            displayStr += " __ ";
        }
    })
    console.log(displayStr);
}

Word.prototype.hasLetter = function(ltr){
    var correctGuess = false;
    this.numGuess +=1;

    // loop through letterArray
    this.letterArray.forEach(function(ltrObj){
        if (!ltrObj.display && ltrObj.letter == ltr.toUpperCase()){
            ltrObj.show();
            correctGuess = true;
        }
    })
    return correctGuess;
}

Word.prototype.solved = function(){
    var solved = true;
    this.letterArray.forEach(function(ltrObj){
        if (ltrObj.display == false) solved = false;
    })
    return solved;
}

// TESTING
var test = new Word("heLLo");
test.show();
console.log(test.hasLetter("l"));
test.show();
// console.log(test.hasLetter("l"));
console.log(`Has this word been solved? ${test.solved()}`);
console.log(test.hasLetter("h"));
console.log(`Has this word been solved? ${test.solved()}`);
console.log(test.hasLetter("e"));
console.log(test.hasLetter("o"));
console.log(`Has this word been solved? ${test.solved()}`);
test.show();



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
