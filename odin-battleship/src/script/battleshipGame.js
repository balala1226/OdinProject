const GameBoard = require('./gameBoard');
const Player = require('./player');
const shipModules = require('./ship');
const ShipsLengthList = shipModules.ShipsLengthList;

class BattleshipGame{
    constructor(){
        this.playerOne = new Player(1, false);
        this.playerTwo = new Player(2, true);

        this.gameboardOne = new GameBoard();
        this.gameboardTwo = new GameBoard();

        this.didGameStart = false;
        this.isGameOver = false;

        this.playerOne.currentTurn = true;
    }

    gameStart(){
        this.playerTwo.currentTurn = false;
        this.playerOne.currentTurn = false;

        if (this.playerTwo.isAi){
            this.playerTwo.generateGameShips(this.gameboardTwo, ShipsLengthList);
        }

        this.playerOne.currentTurn = true;

        this.didGameStart = true;
        this.isGameOver = false;
    }

    getCurrentPlayerGameBoard() {
        if (this.playerOne.currentTurn) {
            return this.gameboardOne;
        }

        return this.gameboardTwo;
    }

    getCurrentPlayer() {
        if (this.playerOne.currentTurn) {
            return this.playerOne;
        }

        return this.playerTwo;
    }

    getEnemyBoard() {
        if (this.playerOne.currentTurn) {
            return this.gameboardTwo;
        }

        return this.gameboardOne;
    }

    logAllBoards() {
        this.gameboardOne.shipConsoleLog();
        console.log('**************************');
        this.gameboardTwo.shipConsoleLog();
    }

    resetBoards(){
        this.gameboardOne.resetGameBoard();
        this.gameboardTwo.resetGameBoard();
    }

    changeTurn(){
        this.playerOne.currentTurn = !this.playerOne.currentTurn;
        this.playerTwo.currentTurn = !this.playerOne.currentTurn;
    }

    isCurrentPlayerAi(){
        if(this.playerOne.currentTurn){
            return this.playerOne.isAi;
        }

        return this.playerTwo.isAi;
    }

    aiMove(){
        if (this.playerOne.currentTurn) {
            return this.playerOne.aiMove(this.gameboardTwo);
        }

        return this.playerTwo.aiMove(this.gameboardOne);
    }

    setGameOver(){
        this.isGameOver = true;
    }
}

module.exports = BattleshipGame;