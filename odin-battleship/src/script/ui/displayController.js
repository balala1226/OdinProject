import { newDiv, newP, newButton } from "../helper/htmlElementsMaker";
const ShipsLengthList = require('../ship').ShipsLengthList;
import { showGameOverDialog } from "./gameoverDialog";
import { resetUi } from "./resetUi";

export class DisplayController{
    constructor(battleShipGame) {
        const contentDiv = document.getElementById('content');

        const promptContainer = newDiv('-','promptContainer');
        const promptText = newP('Destroy enemy ships.','-','promptText');
        promptContainer.appendChild(promptText);

        contentDiv.appendChild(promptContainer);

        const gameContainer = newDiv('-','gameContainer'); 

        const shipsContainer = this.generateShipsItem('gameBoard1');
        gameContainer.appendChild(shipsContainer);

        const gameBoard1 = this.setGameBoard('gameBoard1', battleShipGame);
        gameContainer.appendChild(gameBoard1);

        const gameBoard2 = this.setGameBoard('gameBoard2', battleShipGame);
        gameContainer.appendChild(gameBoard2);
        gameBoard2.style.display = 'none';

        contentDiv.appendChild(gameContainer);

        const buttonsContainer = newDiv('-','buttonsContainer'); 

        const newGameButton = newButton('promptButton','newGameButton');
        newGameButton.innerHTML = 'Start Game';
        newGameButton.style.display = 'block';   
        newGameButton.addEventListener("click", () => {
            promptText.innerHTML = 'Place your ships.';
            gameContainer.style.display = 'flex';
            gameBoard1.style.display = 'grid';
            shipsContainer.style.display = 'flex';
            newGameButton.style.display = 'none';
            confirmButton.style.display = 'block';
            confirmButton.style.backgroundColor = 'gray';
            confirmButton.style.pointerEvents = "none";
        });
        buttonsContainer.appendChild(newGameButton);

        const confirmButton = newButton('promptButton','confirmButton');
        confirmButton.innerHTML = 'Confirm';
        confirmButton.style.display = 'none';  
        confirmButton.addEventListener("click", () => {
            promptText.innerHTML = 'Player 1 turn';
            gameContainer.style.display = 'flex';
            gameBoard1.style.display = 'grid';
            gameBoard2.style.display = 'grid';
            shipsContainer.style.display = 'none';
            newGameButton.style.display = 'none';
            confirmButton.style.display = 'none';
            gameBoard1.style.pointerEvents = "none";
            gameBoard2.style.pointerEvents = "auto";

            battleShipGame.gameStart();
        });
        buttonsContainer.appendChild(confirmButton);

        contentDiv.appendChild(buttonsContainer);

        gameBoard2.style.pointerEvents = "none";
    }

    setGameBoard(boardId, battleShipGame){
        const gameBoard = newDiv('gameBoard', boardId);
        const promptText = document.getElementById('promptText');
        for(let y = 0; y < 10; y++) {
            for(let x = 0; x < 10; x++) {
                let boardTileId = boardId+'tile'+y+x;
                let boardTile = newDiv('boardTile', boardTileId);

                boardTile.addEventListener("click", () => {
                    if (!battleShipGame.didGameStart){
                        return;
                    }

                    var coordinates = [x, y];
                    
                    if (battleShipGame.getEnemyBoard().isAlreadyHit(coordinates)){
                        return;
                    }

                    var attckResponse = battleShipGame.getEnemyBoard().receiveAttack(coordinates);
                    
                    var gameBoard1 = document.getElementById('gameBoard1');
                    var gameBoard2 = document.getElementById('gameBoard2');

                    if (attckResponse.didHitShip){
                        boardTile.style.backgroundColor = 'red';
                        boardTile.innerHTML = 'X';
                        if (attckResponse.isGameOver){
                            console.log("Game Over");
                            gameBoard1.style.pointerEvents = "none";
                            gameBoard2.style.pointerEvents = "none";
                            battleShipGame.setGameOver();

                            showGameOverDialog(true);
                            battleShipGame.resetBoards();
                            resetUi();
                            return;
                        }
                        return;
                    }

                    boardTile.style.backgroundColor = 'blue';
                    boardTile.innerHTML = 'X';

                    battleShipGame.changeTurn();
                    var currentEnemyBoardId = null;

                    if (battleShipGame.playerOne.currentTurn){
                        promptText.innerHTML = 'Player 1 turn';
                        gameBoard1.style.pointerEvents = "none";
                        gameBoard2.style.pointerEvents = "auto";
                        currentEnemyBoardId = 'gameBoard2';
                    } else {
                        promptText.innerHTML = 'Player 2 turn';
                        gameBoard1.style.pointerEvents = "auto";
                        gameBoard2.style.pointerEvents = "none";
                        currentEnemyBoardId = 'gameBoard1';
                    }

                    if (!battleShipGame.isCurrentPlayerAi){
                        return;
                    }

                    var didAiHit = false;
                    do{
                        var aiHit = battleShipGame.aiMove();
    
                        var attckResponse = battleShipGame.getEnemyBoard().receiveAttack(aiHit);
                        didAiHit = attckResponse.didHitShip;

                        var tileToFill = currentEnemyBoardId+'tile'+aiHit[1]+aiHit[0];
                        var tile = document.getElementById(tileToFill);

                        if (didAiHit){
                            tile.style.backgroundColor = 'red';
                            tile.innerHTML = 'X';
        
                            if (attckResponse.isGameOver){
                                console.log("Game Over");
                                gameBoard1.style.pointerEvents = "none";
                                gameBoard2.style.pointerEvents = "none";
                                battleShipGame.setGameOver();

                                showGameOverDialog(false);
                                battleShipGame.resetBoards();
                                resetUi();
                                return;
                            }
                        } else {
                            tile.style.backgroundColor = 'blue';
                            tile.innerHTML = 'X';
                        }
                    }while(didAiHit)

                    battleShipGame.changeTurn();
                    if (battleShipGame.playerOne.currentTurn){
                        promptText.innerHTML = 'Player 1 turn';
                        gameBoard1.style.pointerEvents = "none";
                        gameBoard2.style.pointerEvents = "auto";
                    } else {
                        promptText.innerHTML = 'Player 2 turn';
                        gameBoard1.style.pointerEvents = "auto";
                        gameBoard2.style.pointerEvents = "none";
                    }
                });
                
                boardTile.addEventListener("dragenter", function(event) {
                    event.preventDefault();
                });

                
                boardTile.addEventListener("dragover", function(event) {
                    event.preventDefault();
                });

                
                boardTile.addEventListener("dragleave", function(event) {
                    event.preventDefault();
                });

                boardTile.addEventListener("drop", function(event) {
                    event.preventDefault();
                    var eventData = event.dataTransfer.getData('text/plain');
                    var shipObject = JSON.parse(eventData);

                    var coordinatesToFill = [];
                    if (shipObject.isHorizontal){
                        if (x - shipObject.shipCursorIndex < 0){
                            return;
                        }

                        var remaining = shipObject.length - (shipObject.shipCursorIndex + 1);
                        if (x + remaining > 9){
                            return;
                        }

                        for (var index = shipObject.shipCursorIndex; index >= 0; index--){
                            var newX = x - index;
                            if (battleShipGame.getCurrentPlayerGameBoard().getTile([newX,y]).ship != null) {
                                return;
                            }
                            coordinatesToFill.push([newX, y]);
                        }

                        for (var index = 0; index < remaining; index++){
                            var newX = x + index +1;
                            if (battleShipGame.getCurrentPlayerGameBoard().getTile([newX,y]).ship != null) {
                                return;
                            }
                            coordinatesToFill.push([newX, y]);
                        }
                    } else {
                        if (y - shipObject.shipCursorIndex < 0){
                            return;
                        }

                        var remaining = shipObject.length - (shipObject.shipCursorIndex + 1);
                        if (y + remaining >9){
                            return;
                        }

                        for (var index = shipObject.shipCursorIndex; index >= 0; index--){
                            var newY = y - index;
                            if (battleShipGame.getCurrentPlayerGameBoard().getTile([x,newY]).ship != null) {
                                return;
                            }
                            coordinatesToFill.push([x,newY]);
                        }

                        for (var index = 0; index < remaining; index++){
                            var newY = y + index +1;
                            if (battleShipGame.getCurrentPlayerGameBoard().getTile([x,newY]).ship != null) {
                                return;
                            }
                            coordinatesToFill.push([x,newY]);
                        }
                    }

                    battleShipGame.getCurrentPlayerGameBoard().setShipByLength(shipObject.length, coordinatesToFill);
                    
                    coordinatesToFill.forEach(element =>{
                        var tileToFill = boardId+'tile'+element[1]+element[0];
                        var tile = document.getElementById(tileToFill);
                        tile.style.backgroundColor = 'red';
                    });

                    var shipOption = document.getElementById(shipObject.id);
                    shipOption.style.display = 'none';

                    if (battleShipGame.getCurrentPlayerGameBoard().shipsCount == ShipsLengthList.length){
                        confirmButton.style.backgroundColor = 'green';
                        confirmButton.style.pointerEvents = 'auto';
                    }
                });
                
                gameBoard.appendChild(boardTile);
            }
        }

        return gameBoard;
    }

    generateShipsItem(boardId){
        const shipsContainerId = boardId+'ShipsContainer';
        const shipsContainer = newDiv('shipsContainer', shipsContainerId); 

        var extraId = 0;
        ShipsLengthList.forEach(element => {
            let shipObject = {
                id: '',
                isHorizontal: false,
                shipCursorIndex: 0,
                length: 2
            }
    
            var shipId = boardId+"ship"+element.toString()+extraId;
            const shipOptionContainer = newDiv('shipOptionContainer', shipId); 

            let isHorizontal = true;
            
            let ship = newDiv('ship');
            let shipMouseOverArray = new Array(element);
            ship.draggable = true;

            ship.addEventListener("dragstart", function(event) {
                var shipCursorIndex = 0;

                for(var index = 0; index < element; index++){
                    if (shipMouseOverArray[index] == 1){
                        shipCursorIndex = index;
                        break;
                    }
                }

                shipObject.id = shipId;
                shipObject.isHorizontal = isHorizontal;
                shipObject.shipCursorIndex = shipCursorIndex;
                shipObject.length = element;

                event.dataTransfer.setData('text/plain', JSON.stringify(shipObject));
            });

            for(let count = 0; count < element; count++){
                let newShipPart = newDiv('shipPart');

                newShipPart.addEventListener("mouseenter", function(  ) {
                    shipMouseOverArray.forEach(element => {
                        element = 0;
                    });
                    shipMouseOverArray[count] = 1;
                });
                newShipPart.addEventListener("mouseout", function(  ) {
                    shipMouseOverArray[count] = 0;
                });

                ship.appendChild(newShipPart);
            }            

            shipOptionContainer.appendChild(ship);

            const rotateButton = newButton('rotateButton');
            rotateButton.style.display = 'block';
            
            rotateButton.addEventListener("click", () => {
                if (isHorizontal){
                    ship.style.flexDirection = 'column';
                    var size = 5*element;
                    ship.style.height = size.toString()+'vmin';
                    ship.style.width = '5vmin';
                }else {
                    ship.style.flexDirection = 'row';
                    var size = 5*element;
                    ship.style.width = size.toString()+'vmin';
                    ship.style.height = '5vmin';
                }

                isHorizontal = !isHorizontal;
            });

            shipOptionContainer.appendChild(rotateButton);

            shipsContainer.appendChild(shipOptionContainer);
            extraId++;
        });

        return shipsContainer;
    }
}