function Letter(ltr){
    this.display = false;
    this.letter = ltr.toString().toUpperCase();
}

Letter.prototype.show = function(){
    this.display = true;
}

module.exports = Letter;