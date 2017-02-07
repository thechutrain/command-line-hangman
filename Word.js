// constructor file 
// methods:
// checked guessed letter and with random word

function Word(word, show){
    this.word = word;
    this.show = show;
    this.wordArray = [];
    this.init();
}

// methods to get properties of word
Word.prototype.init = function(){
    if (this.show){
        this.wordArray = this.word.split("");
        // console.log(this.wordArray);
    } else {
        var re = new RegExp(/[\S]/, "gi");
        this.wordArray = this.word.replace(re, "_").split("");
        // console.log(this.wordArray);
    }
    // console.log(`Hello I "${this.word}" was created!`);
}


// DEBUGGIN METHODS
Word.prototype.toString = function(){
    console.log(`Word: ${this.word}`);
    console.log(`Show: ${this.show}`);
    for (var letter of this.wordArray){
        console.log(letter);
    }
}

// EXPORTING WORD OBJECT
module.exports = Word;

// var test = new Word("HELLO", true);