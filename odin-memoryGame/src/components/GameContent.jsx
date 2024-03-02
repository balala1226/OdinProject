import { useEffect, useRef, useState } from 'react'

import '../style/GameContent.css'

import PlayingCardView from './PlayingCardView';
import { GameOverType } from '../helper/gameOverTypes';
import { noneDisplay, flexDisplay, gridDisplay } from '../helper/styleHelper';

import { MemoryGameCards } from './MemoryGameCards';

const memoryGame = MemoryGameCards();
memoryGame.generateCards();

function GameContent() {
  const timeLimit = 15;
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  const [isGameOver, setIsGameOver] = useState(false);

  const [statsPanelDisplay, setStatsPanelDisplay] = useState(noneDisplay);
  const [startButtonDisplay, setStartButtonDisplay] = useState(flexDisplay);
  
  const [currentCardSet, setCurrentCardSet] = useState([]);
  const [cardsPanelDisplay, setCardsPanelDisplay] = useState(noneDisplay);

  const [gameOverDisplay, setGameOverDisplay] = useState(noneDisplay);

  const Ref = useRef(null);

  const [timer, setTimer] = useState(0);
 
  const getTimeRemaining = (e) => {
      const total =
          Date.parse(e) - Date.parse(new Date());
      const seconds = Math.floor((total / 1000) % 60);
      return {
          total,
          seconds,
      };
  };

  const startTimer = (e) => {
      let { total, seconds } =
        getTimeRemaining(e);
      if (total > 0) {
        setTimer(seconds);
      } else {
        if(!isGameOver){
          setIsGameOver(true);
          onGameOver(GameOverType().timeOut);
        }
      }
  };

  const clearTimer = (e) => {
      setTimer(timeLimit);

      if (Ref.current) clearInterval(Ref.current);
      const id = setInterval(() => {
          startTimer(e);
      }, 1000);
      Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();
    
    deadline.setSeconds(deadline.getSeconds() + timeLimit);
    return deadline;
  };

  useEffect(() => {
    clearTimer(getDeadTime());
  }, [])
  
  const handleOnStartClick = () => {
    setStartButtonDisplay(noneDisplay);

    var newCardSet = memoryGame.shuffleCard();
    setCurrentCardSet(newCardSet);

    setCurrentScore(0);

    setCardsPanelDisplay(gridDisplay);
    setStatsPanelDisplay(flexDisplay);
    setGameOverDisplay(noneDisplay);
    
    setIsGameOver(false);
    resetTime();
  }

  const onCardSelected = (card) => {
    var isCardAlreadySelected = memoryGame.isCardAlreadySelected(card);

    if (isCardAlreadySelected){
      onGameOver(GameOverType().repeatCard);
      return;
    }

    addScore();

    setCurrentCardSet([]);

    console.log(currentCardSet);
    var newCardSet = memoryGame.shuffleCard();
    if (newCardSet == []){
      onGameOver(GameOverType().gameWin);
      return;
    }
    
    resetTime();
    setCurrentCardSet(newCardSet);
  }

  const addScore = () => {
    var newScore = currentScore + 1;
    setCurrentScore(newScore);

    if (newScore > bestScore) {
      setBestScore(newScore);
    }
  };

  const resetTime = () => {
    console.log('reset time');
    clearTimer(getDeadTime());
  }

  const onGameOver = (gameOverType) => {
    switch(gameOverType){
      case GameOverType().repeatCard:
        console.log('game over rc');
        break;
      case GameOverType().timeOut:
        console.log('game over to');
        break;
      case GameOverType().gameWin:
        console.log('game over dub');
        break;
      default:
        console.log('game over def');
        break;
    }
 
    setIsGameOver(true);

    setStartButtonDisplay(flexDisplay);
    setCardsPanelDisplay(noneDisplay);
    setStatsPanelDisplay(noneDisplay);
    setGameOverDisplay(flexDisplay);

    memoryGame.resetDeck();
  }

  return (
    <>
      <div className='gamePlayPanel'>
        <div className='gameStatsPanel' style={statsPanelDisplay}>
          <div className='scorePanel'>
            <div className='scoreContainer'>
              <p className='scoreDescription'>Best Score: </p>
              <p className='scoreValue'>{bestScore}</p>
            </div>
            <div className='scoreContainer'>
              <p className='scoreDescription'>Score: </p>
              <p className='scoreValue'>{currentScore}</p>
            </div>
          </div>
          <div className='timerContainer'>
            <p className='timerDescription'>Time: </p>
            <p className='timerValue'>{timer}</p>
          </div>
        </div>
        <div className='cardsPanel' style={cardsPanelDisplay}>
          {currentCardSet.map((currentCard, index) => (
            <PlayingCardView  key={index} cardData={currentCard} onCardSelected={onCardSelected}></PlayingCardView>
          ))}
        </div>
        <div className='gameOverpanel' style={gameOverDisplay}>
          <p className='gamOverHeader'>GAME OVER </p>
          <div className='gameOverScore'>
            <p className='gamOverBody'>Score: {currentScore}</p>
            <p className='gamOverBody'>Best Score: {bestScore}</p>
          </div>
        </div>
        <button className='startButton' style={startButtonDisplay} onClick={handleOnStartClick}>Start Game</button>
      </div>
    </>
  )
}

export default GameContent
