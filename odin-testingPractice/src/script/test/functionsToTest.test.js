const functionsToTest = require('../helper/functionsToTest')

const calculator = functionsToTest.calculator
const capitalize = functionsToTest.capitalize
const reverseString = functionsToTest.reverseString
const analyzeArray = functionsToTest.analyzeArray
const caesarCipher = functionsToTest.caesarCipher

test('test capitalized is Text', () => {
    expect(capitalize('test')).toBe('Test');
});

test('test reverseString is tset', () => {
    expect(reverseString('test')).toBe('tset');
});

test('adds 1 + 2 to equal 3', () => {
    expect(calculator.add(1, 2)).toBe(3);
});

test('subtract 3 - 2 to equal 1', () => {
    expect(calculator.sub(3, 2)).toBe(1);
});

test('multiply 2 * 2 to equal 4', () => {
    expect(calculator.mul(2, 2)).toBe(4);
});

test('subtract 2 / 2 to equal 1', () => {
    expect(calculator.div(2, 2)).toBe(1);
});

test('The quick brown fox, jumps over the lazy dog? caeser to xli uymgo fvsar jsb, nyqtw sziv xli pedc hsk?', () => {
    expect(caesarCipher("The quick brown fox, jumps over the lazy dog?", 4)).toBe("xli uymgo fvsar jsb, nyqtw sziv xli pedc hsk?");
});

test('analyze array [1,8,3,4,2,6] average: 4,min: 1,max: 8,length: 6', () => {
    expect(analyzeArray([1,8,3,4,2,6])).toStrictEqual({
        average: 4,
        min: 1,
        max: 8,
        length: 6
    });
});