var chalk = require('chalk');

var test = chalk.bgRed.bold.blue('Hello world!');
console.log(test);

var test = chalk.red('Hello', chalk.underline.bgBlue('world') + '!');
console.log(test);

var _error = chalk.bold.red;
console.log(_error("wrong!"));

var _correct = chalk.bold.green;
console.log(_correct("You are right!"));

exports.error = _error;
exports.correct = _correct;