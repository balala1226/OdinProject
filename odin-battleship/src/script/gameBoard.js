const Ship = require('./ship').Ship;

class GameTile{
    constructor(){
        this.ship = null;
        this.didHit = false;
    }
}

class GameBoard{
    constructor(){
        this.board = [];
        this.shipsSunked = 0;
        this.shipsCount = 0;

        this.resetGameBoard();
    }

    resetGameBoard(){
        this.board = [];
        for (var row = 0; row < 10; row++){
            var newRow = [];
            for (var column = 0; column < 10; column++){
                var newTile = new GameTile();
                newRow.push(newTile);    
            }
            this.board.push(newRow);
        }

        this.shipsSunked = 0;
        this.shipsCount = 0;
    }

    receiveAttack(coordinates){
        var gameTile = this.board[coordinates[1]][coordinates[0]];

        gameTile.didHit = true;


        var didHitShip = false;
        var didShipSunk = false;
        var isGameOver = false;

        if (gameTile.ship != null){
            gameTile.ship.hit();

            didHitShip = true;
            if (gameTile.ship.isSunk()){
                this.shipsSunked ++;

                didShipSunk = true;

                if(this.isAllShipsSunk()) {
                    isGameOver = true;
                }
            }
        }

        return {didHitShip: didHitShip, didShipSunk: didShipSunk, isGameOver: isGameOver, }
    }

    setShipByLength(length, coordinates){
        var newShip = new Ship(length);

        this.setShip(newShip, coordinates);
    }

    setShip(ship, coordinates){
        coordinates.forEach(element => {
            this.board[element[1]][element[0]].ship = ship;
        });

        this.shipsCount++;
    }

    isAllShipsSunk(){
        if (this.shipsSunked == this.shipsCount)
        {
            return true;
        }

        return false;
    }

    shipConsoleLog(){
        for(var y = 0; y < 10; y++) {
            var newRowText = '';
            for(var x = 0; x < 10; x++) {
                if (this.board[y][x].ship == null){
                    newRowText += "0 ";
                } else {
                    newRowText += "S ";
                }
            }
            console.log(newRowText);
        }
    }

    getTile(coordinates) {
        return this.board[coordinates[1]][coordinates[0]];
    }

    isAlreadyHit(coordinates){
        return this.board[coordinates[1]][coordinates[0]].didHit;
    }
}

module.exports = GameBoard;