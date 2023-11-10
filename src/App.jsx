import { useState, useEffect } from "react";
import "./App.css";
import ShowCats from "./CatStuff";

function App() {
  const [counter, setCounter] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  const [gameIsOver, setGameIsOver] = useState(false);

  function incrementCounter() {
    setCounter((prevCounter) => {
      const newCounter = prevCounter + 1;
      if (newCounter > maxScore) {
        setMaxScore(newCounter);
      }
      //move max score condition from Cat
      if (newCounter >= 12) gameOver();
      return newCounter;
    });
  }

  function gameOver() {
    setGameIsOver(true);
  }

  function newGame() {
    setGameIsOver(false);
    setCounter(0);
  }

  return (
    <>
      <h2>Memory game</h2>
      <p>Don&apos;t click the same cat twice!</p>
      <Score counter={counter} maxScore={maxScore} />
      {gameIsOver ? (
        <GameOverScreen newGame={newGame} counter={counter} />
      ) : (
        <ShowCats
          incrementCounter={incrementCounter}
          gameOver={gameOver}
          counter={counter}
        />
      )}
    </>
  );
}

function GameOverScreen({ newGame, counter }) {
  return (
    <div className="game-over">
      {counter < 12 ? (
        <div>
          <h2>Game over!</h2>
          <h3>Better luck next time</h3>
        </div>
      ) : (
        <div>
          <h2>Congratulations!</h2>
          <h3>You achieved the maximum score. You are a true cat master.</h3>
        </div>
      )}
      <button onClick={newGame}>Play again</button>
    </div>
  );
}

function Score({ counter, maxScore }) {
  return (
    <div className="score-container">
      <p>
        <b>Current score:</b> <span>{counter}</span>
      </p>
      <p>
        <b>Best score:</b> <span>{maxScore}</span>
      </p>
    </div>
  );
}

export default App;
