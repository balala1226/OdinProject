const GameBoard = require ('../gameBoard')
const shipModules = require('../ship');
const Ship = shipModules.Ship;

var newGameBoard = new GameBoard();
var newShip = new Ship();

newGameBoard.setShip(newShip, [[0,0],[0,1]]);

var hitResponse = newGameBoard.receiveAttack([1,1])
test('Boardhit none', () => {
    expect(hitResponse.didHitShip).toBe(false);
});

var hitResponse2 = newGameBoard.receiveAttack([0,0])
test('Boardhit ship', () => {
    expect(hitResponse2.didHitShip).toBe(true);
});

test('Boardhit ship sink', () => {
    expect(hitResponse2.didShipSunk).toBe(false);
});

test('Boardhit gameover', () => {
    expect(hitResponse2.isGameOver).toBe(false);
});

var hitResponse3 = newGameBoard.receiveAttack([0,1])
test('Boardhit ship', () => {
    expect(hitResponse3.didHitShip).toBe(true);
});

test('Boardhit ship sink', () => {
    expect(hitResponse3.didShipSunk).toBe(true);
});

test('Boardhit gameover', () => {
    expect(hitResponse3.isGameOver).toBe(true);
});