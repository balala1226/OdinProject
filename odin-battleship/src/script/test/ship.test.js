const shipModules = require('../ship');
const Ship = shipModules.Ship;

var newShip = new Ship();

test('ShipHit', () => {
    newShip.hit()
    expect(newShip.hitCount).toBe(1);
});

test('ShipHit', () => {
    expect(newShip.isSunk()).toBe(false);
});
