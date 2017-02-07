function Letter(ltr){
    this.show = false;
    this.letter = ltr.toString();
}

Letter.prototype.show = function(){
    this.show = true;
}