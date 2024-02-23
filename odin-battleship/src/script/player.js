const coordinatesHelper = require('./helper/coordinatesHelper').coordinatesHelper;
const shipModules = require('./ship');
const Ship = shipModules.Ship;

class Player{
    constructor(playerId = 1, isAi = false){
        this.playerId = playerId;
        this.currentTurn = false;
        this.isAi = isAi;
    }

    aiMove(opponenetBoard){
        var isMoveValid = false;

        var coordinates = null;

        while(!isMoveValid){
            coordinates = coordinatesHelper.generateRandomCoordinates();

            if (opponenetBoard.getTile([coordinates[0],coordinates[1]]).didHit == false){
                isMoveValid = true;
            } 
        }

        return [coordinates[0], coordinates[1]];
    }

    generateGameShips(playerBoard, shipsLength){
        var coordinates = null;
        var boardArray = Array.from(Array(100).keys());

        shipsLength.forEach(currentLength => {
            var shipPlaced = false
            while(!shipPlaced) {
                const randomIndex = Math.floor(Math.random() * boardArray.length);  
                coordinates = coordinatesHelper.intToCoordinates(boardArray[randomIndex]);
                var direction = [0,0];
                
                var directionOptions = Math.floor(Math.random() * 4);
                switch (directionOptions){
                    case 0:
                        if(coordinates[0] + currentLength - 1 <= 9){
                            direction[0] = 1;
                            direction[1] = 0;
                        }
                        break;
                    case 1:
                        if (coordinates[0] - currentLength -1 >= 0){
                            direction[0] = -1;
                            direction[1] = 0;
                        }
                        break;
                    case 2:
                        if(coordinates[1] + currentLength -1 <= 9){
                            direction[0] = 0;
                            direction[1] = 1;
                        }
                        break;
                    case 3:
                        if (coordinates[1] - currentLength -1 >= 0){
                            direction[0] = 0;
                            direction[1] = -1;
                        } 
                        break;
                }

                if (direction[0] == 0 && direction[1] == 0){
                    continue;
                }

                var allTilesValid = true;
                for (var index = 0; index < currentLength; index++){
                    var newX = coordinates[0] + direction[0]*index;
                    var newY = coordinates[1] + direction[1]*index;
                    
                    if (playerBoard.getTile([newX,newY]).ship != null){
                        allTilesValid = false;
                        break;
                    }
                }

                if(!allTilesValid) {
                    continue;
                }

                var newShip = new Ship(currentLength);

                var shipCoordinates = [];
                for (var index = 0; index < currentLength; index++){
                    var newX = coordinates[0] + direction[0]*index;
                    var newY = coordinates[1] + direction[1]*index;
                    
                    var newShipCoordinate = [newX, newY];
                    shipCoordinates.push(newShipCoordinate);

                    var newCoordinatesInt =  coordinatesHelper.coordinatesInInt(newShipCoordinate);

                    const indexToRemove = boardArray.indexOf(newCoordinatesInt);
                    boardArray.splice(indexToRemove, 1);
                }
                playerBoard.setShip(newShip, shipCoordinates);

                shipPlaced = true;
            }
        });
    }
}

module.exports = Player;