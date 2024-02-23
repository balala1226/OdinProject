import { newButton, newP } from "../helper/htmlElementsMaker";

export function showGameOverDialog(didWin) {
    var gameOverDialog = document.getElementById('gameOverDialog')

    if (gameOverDialog == null){
        const body = document.getElementsByTagName('BODY')[0];
        gameOverDialog = document.createElement('dialog');
        gameOverDialog.id = 'gameOverDialog';
        body.appendChild(gameOverDialog);
        
        const gameOverHeader = newP('', '-', 'gameOverHeader');
        gameOverDialog.appendChild(gameOverHeader);

        const gameOverButton = newButton('-','gameOverButton');
        gameOverButton.innerHTML = 'New Game';

        gameOverButton.addEventListener('click', () =>{
            gameOverDialog.style.display = 'none';
            gameOverDialog.close();
        });
        gameOverDialog.appendChild(gameOverButton);
    }
    
    const gameOverHeader = document.getElementById('gameOverHeader');

    if (didWin){
        gameOverHeader.innerHTML = "YOU WIN!"
    } else {
        gameOverHeader.innerHTML = "YOU LOSE!"
    }
    
    gameOverDialog.showModal();
    gameOverDialog.style.display = 'flex';
}