const coordinatesHelper = (function () {
    const generateRandomCoordinates = () => {
        var y = Math.floor((Math.random() * 10));
        var x = Math.floor((Math.random() * 10));
    
        return [x, y];
    }

    const coordinatesInInt = (coordinates) => {
        return coordinates[0]*10 + coordinates[1] + 1;
    }

    const intToCoordinates = (value) => {
        var y = value%10;
        var x = Math.floor(value/10);
    
        return [x, y];
    }
    return { generateRandomCoordinates, coordinatesInInt, intToCoordinates };
})();

module.exports = {
    coordinatesHelper
};