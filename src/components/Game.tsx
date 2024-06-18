import { useEffect, useState } from "react";
import './Game.css'
import Problem from "./Problem";
import Timer from "./Timer";

function getRandomInt(max:number){
  return Math.floor(Math.random() * max);
}

function isValidInput(value: string) {
 return /^\d+(\.\d+)?$/.test(value);
}

function clearInput(){
  document.getElementById('answerBox').value = ""; //it will not be null.
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

  useEffect(() => {
    if(answer && !gameStarted){
      setGameStarted(true);
      startTimer();
    }
    else if(answer){
      if(parseInt(answer) === N1+N2){
        setScore(score+1);
        setN1(getRandomInt(10));
        setN2(getRandomInt(10));
        clearInput();
      }
    }
    else{
      if(gameStarted && time === 0 ){
        setGameStarted(false);
        console.log("Score is : " + score);
        return;
      }
    }
  }, [answer, gameStarted, time]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value);
    
  };
  

  return (
    <>
      <div className="timer-box">
        <div className="timer">{timerStarted && render}</div>
      </div>
      <div className="game-content">
        <div className="problem">
          <Problem num1={N1} num2={N2} operation="+" />
        </div>
        <input
          type="in"
          id="answerBox"
          className="input"
          placeholder="00"
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if(!(e.code === 'Backspace' || isValidInput(e.key))){
              e.preventDefault();
            }
          }}
          maxLength={2}
        />
      </div>
    </>
  );
}

export default Game