function capitalize(inputString){
    var currentString = inputString;
    var firstCharacter = currentString.charAt(0);
    currentString = currentString.slice(1);
    return firstCharacter.toUpperCase() + currentString;
}

function reverseString(inputString){
    var outputString = '';

    for(var index = inputString.length-1; index >= 0; index--){
        outputString += inputString[index];
    }

    return outputString;
}

const calculator = (function () {
    const add = (a, b) => a + b;
    const sub = (a, b) => a - b;
    const mul = (a, b) => a * b;
    const div = (a, b) => a / b;
    return { add, sub, mul, div };
})();

function analyzeArray(array) {
    var average = 0;
    var min = array[0];
    var max = array[0];
    var length = array.length

    var sum = 0;
    array.forEach(element => {
        sum += element;

        if (element > max){
            max = element
        }

        if (element < min){
            min = element
        }
    });

    average = sum/length;

    return {average:average, min:min, max:max, length:length};
}

const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

function caesarCipher(inputString, shiftFactor){
    var encodedMessage = "";

    var length = inputString.length;

    for(var index = 0; index < length; index++){
        var currentChar = inputString.charAt(index).toLowerCase();

        if (!alphabet.includes(currentChar)) {
            encodedMessage += currentChar;
            continue;
        }

        var characterIndex = 0;

        for(var charIndex = 0; charIndex < 26; charIndex++){
            if (currentChar == alphabet[charIndex]){
                characterIndex = charIndex;
                break;
            } 
        }

        var newCharIndex = characterIndex+shiftFactor;
        if (newCharIndex > 25){
            newCharIndex = newCharIndex - 26
        }

        encodedMessage += alphabet[newCharIndex];
    }

    return encodedMessage;
}



module.exports = {
    capitalize,
    reverseString,
    calculator,
    analyzeArray,
    caesarCipher
};