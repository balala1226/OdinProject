const functionsToTest = require('./script/helper/functionsToTest')

const calculator = functionsToTest.calculator
const capitalize = functionsToTest.capitalize
const reverseString = functionsToTest.reverseString
const analyzeArray = functionsToTest.analyzeArray
const caesarCipher = functionsToTest.caesarCipher

console.log(capitalize("test"));
console.log(reverseString("test"));

console.log(calculator.add(3,2));
console.log(calculator.sub(3,2));
console.log(calculator.mul(3,2));
console.log(calculator.div(2,2));

console.log(caesarCipher("The quick brown fox, jumps over the lazy dog?", 4));

console.log(analyzeArray([1,8,3,4,2,6]));