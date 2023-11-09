import { useState, useEffect } from "react";
import "./App.css";
import ShowCats from "./CatStuff";

function App() {
  const [counter, setCounter] = useState(0);
  const [maxScore, setMaxScore] = useState(0);

  function incrementCounter() {
    setCounter(counter + 1);
  }

  return (
    <>
      <h2>Memory game</h2>
      <p>Don&apos;t click the same cat twice!</p>
      <Score counter={counter} maxScore={maxScore} />
      <ShowCats incrementCounter={incrementCounter} />
    </>
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
