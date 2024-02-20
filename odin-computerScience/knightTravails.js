
class MoveSet{
    constructor(currentPosition = null, previousMove = null){
        this.currentPosition = currentPosition;
        this.previousMove = previousMove;
    }
}

function knightMoves(initialPosition, targetPosition) {
    var movementPositions = [];

    var initialMove = new MoveSet(initialPosition);

    var initialPositionMoveStack = [initialMove];

    var meetingMove = null;
    while(meetingMove == null){
        var newMoveArray = [];
        while(initialPositionMoveStack.length > 0 && meetingMove == null ){
            var currentMove = initialPositionMoveStack.shift();
            var newMoves = generateNextMoves(currentMove);

            for(var index = 0;index < newMoves.length; index++){
                if (newMoves[index].currentPosition[0] == targetPosition[0] &&
                    newMoves[index].currentPosition[1] == targetPosition[1]){
                    meetingMove = newMoves[index];
                    break;
                }
            }

            newMoveArray = newMoveArray.concat(newMoves);
        }

        if (meetingMove == null) {
            initialPositionMoveStack = newMoveArray;
        }    
    }

    while(meetingMove) {
        movementPositions.splice(0,0,meetingMove.currentPosition);
        meetingMove = meetingMove.previousMove;
    }

    return movementPositions
}

function generateNextMoves(currentMove) {
    var movesArray = [];
    var currentPosition = currentMove.currentPosition;
    for(var horizontal = 1; horizontal < 3; horizontal++){
        var newXPos = currentPosition[0] + horizontal;
        var newXNeg = currentPosition[0] - horizontal;
        
        var vertical = 2;
        if (horizontal == 2)
        {
            vertical = 1;
        }

        var newYPos = currentPosition[1] + vertical;
        var newYNeg = currentPosition[1] - vertical;

        if (newXPos <= 7){
            if (newYPos <= 7){
                var newMove = new MoveSet([newXPos,newYPos], currentMove);
                movesArray.push(newMove);
            }

            if (newYPos >= 0){
                var newMove = new MoveSet([newXPos,newYNeg], currentMove);
                movesArray.push(newMove);
            }
        }

        if (newXNeg >= 0){
            if (newYPos <= 7){
                var newMove = new MoveSet([newXNeg,newYPos], currentMove);
                movesArray.push(newMove);
            }

            if (newYPos >= 0){
                var newMove = new MoveSet([newXNeg,newYNeg], currentMove);
                movesArray.push(newMove);
            }
        }
    }

    return movesArray;
}

function printResults(movementArray) {
    var moves = movementArray.length -1;
    console.log("knightMoves [" + movementArray[0] + "] [" + movementArray[moves] + "]");
    console.log("You made it in "+moves+" moves!  Here's your path:");
    movementArray.forEach(element => {
        console.log(element);
    });
}

//test
var knightMovements1 = knightMoves([3,3], [4,3]);
printResults(knightMovements1);

var knightMovements2 = knightMoves([0,0], [3,3]);
printResults(knightMovements2);

var knightMovements3 = knightMoves([3,3], [0,0]);
printResults(knightMovements3);

var knightMovements4 = knightMoves([0,0], [5,7]);
printResults(knightMovements4);

var knightMovements5 = knightMoves([2,1], [6,6]);
printResults(knightMovements5);