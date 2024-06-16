import { useState } from "react";
import './Game.css'
import Problem from "./Problem";
import Timer from "./Timer";

function getRandomInt(max:number){
  return Math.floor(Math.random() * max);
}


const Game = () => {
  const [N1, setN1] = useState(getRandomInt(10));
  const [N2, setN2] = useState(getRandomInt(10));
  const [operation, setOperation] = useState('+');
  const [answer, setAnswer] = useState("");
  const [timerStarted, setTimerStarted] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);

  const {render, time}  = Timer(30);

  const startTimer = () => {
    if(!timerStarted){
      setTimerStarted(true);
    }
  } 

  
  const playGame = () =>{
    // if this function is called and the user is alredy playing then noting should happen
    if(!gameStarted){
      startTimer();
      setGameStarted(true);
      while(time != 0){
        const ans = parseInt(answer);
        if(ans === N1+N2){
          setScore(score+1);
        }
        const n1 = getRandomInt(10);
        const n2 = getRandomInt(10);
        setN1(n1);
        setN2(n2);
      }
      console.log(score);
    }
  }

  return (
    <> 
      <div className="timer-box">
        <div className="timer">
         {timerStarted && render} 
        </div>
      </div>
      <div className="game-content">
        <div className="problem">
          <Problem num1={N1} num2={N2} operation="+" />
        </div>
        <input
          type="in"
          id = "answerBox"
          className="input"
          placeholder="0"
          maxLength={1}
          onChange={playGame}
          value={answer}
        />
      </div>
    </>
  );
}

export default Game