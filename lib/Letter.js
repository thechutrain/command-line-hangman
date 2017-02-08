function Letter(ltr, displayBool){
    this.display = displayBool;
    // this.letter = ltr.toString().toUpperCase();
    this.letter;
    this.init(ltr);
}

// Methods:
Letter.prototype.init = function(ltr){
  if (ltr == " "){
    this.display = true;
    this.letter = "//";
} else {
  this.letter = ltr.toString().toUpperCase();
}

}
Letter.prototype.show = function(){
    this.display = true;
}

// Export Object
module.exports = Letter;