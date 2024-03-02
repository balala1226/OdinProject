import '../style/App.css'
import { PlayingCardModel } from './PlayingCardModel';

export function MemoryGameCards(){
    let unselectedCardSet = [];
    let currentCardSet = [];
    let selectedCardSet = [];
    const boardCardLimit = 12;
    let totalCards = 0;

    const generateCards = () => {
        var count = [];
        for (var index = 1; index <= 50; index++) {
            count.push(index);
        }   

        var apiUrl = 'https://rickandmortyapi.com/api/character/' + count;
        
        fetch(apiUrl, {mode: 'cors'})
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            var fetchedImages = response;
            fetchedImages.forEach(element => {
                var newCard = new PlayingCardModel(element.id, element.image);
                unselectedCardSet.push(newCard);
            });
            totalCards = unselectedCardSet.length;
        })
        .catch(()=>{
            console.log('fetch fail')
        });
    }

    const isCardAlreadySelected = (card) => {
        if (card.getIsSelected()){
            returnToCorrectDeck();
            return true;
        }

        card.setIsSelected(true);
        returnToCorrectDeck();

        return false;
    }

    const shuffleCard =() => {
        currentCardSet = [];

        if (unselectedCardSet.length == 0){
            return [];
        }

        var sureUnselectedCardIndexInBoard = Math.floor(Math.random()*boardCardLimit);
        for(var index = 0; index < boardCardLimit; index++){
            if (sureUnselectedCardIndexInBoard == index && unselectedCardSet.length > 0){
                currentCardSet.push(getRandomUnselectedCard());
                continue;
            }
            
            currentCardSet.push(getRandomCard());
        }
        
        return currentCardSet;
    }

    const getRandomCard = () => {
        if(selectedCardSet.length <= 0){
            return getRandomUnselectedCard();
        }

        if(unselectedCardSet.length <= 0){
            return getRandomSelectedCard();
        }

        var selectedCardPercentage = ((selectedCardSet.length)/(totalCards))*100;

        var randomNum = Math.floor(Math.random()*100)+1;

        if (randomNum <= selectedCardPercentage){
            return getRandomSelectedCard();
        }

        return getRandomUnselectedCard();
    }

    const getRandomUnselectedCard = () => {
        var randomIndex = Math.floor(Math.random()*unselectedCardSet.length);
        let randomUnselectedCard = unselectedCardSet[randomIndex];
        unselectedCardSet.splice(randomIndex, 1);

        return randomUnselectedCard;
    }

    const getRandomSelectedCard = () => {
        var randomIndex = Math.floor(Math.random()*selectedCardSet.length);
        let randomSelectedCard = selectedCardSet[randomIndex];
        selectedCardSet.splice(randomIndex, 1);

        return randomSelectedCard;
    }

    const returnToCorrectDeck = () => {
        currentCardSet.forEach(element => {
            if (element.getIsSelected()){
                selectedCardSet.push(element);
            } else {
                unselectedCardSet.push(element);
            }
        });

        currentCardSet = [];
    }

    const resetDeck = () => {
        selectedCardSet.forEach(element => {
            element.setIsSelected(false);
            unselectedCardSet.push(element);
        });

        selectedCardSet = [];
    }

    return {generateCards, isCardAlreadySelected, shuffleCard, resetDeck}
}
