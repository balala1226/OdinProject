const functionsToTest = require('../helper/calculator')

const calculator = functionsToTest.calculator

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