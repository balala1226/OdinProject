export function resetUi(){
    const promptText = document.getElementById('promptText');

    promptText.innerHTML = 'Destroy enemy ships.';

    const gameBoard1Ships = document.getElementById('gameBoard1ShipsContainer');
    if (gameBoard1Ships != null){
        var ships = gameBoard1Ships.childNodes;

        ships.forEach(element => {
            element.style.display = 'flex';
        });
    }

    const gameBoard1 = document.getElementById('gameBoard1');
    if (gameBoard1 != null){
        var tiles = gameBoard1.childNodes;

        tiles.forEach(element => {
            element.style.backgroundColor = "gray";
            element.innerHTML = '';
        });
        
        gameBoard1.style.pointerEvents = "auto";
    }

    const gameBoard2 = document.getElementById('gameBoard2');
    if (gameBoard2 != null){
        var tiles = gameBoard2.childNodes;

        tiles.forEach(element => {
            element.style.backgroundColor = "gray";
            element.innerHTML = '';
        });

        gameBoard2.style.pointerEvents = "none";
        gameBoard2.style.display = 'none';
    }

    const newGameButton = document.getElementById('newGameButton');
    if (newGameButton != null){
        newGameButton.style.display = 'block';
    }

    const gameContainer = document.getElementById('gameContainer');
    if (gameContainer != null){
        gameContainer.style.display = 'none';
    }
}