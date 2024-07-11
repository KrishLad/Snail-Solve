import { useEffect, useState } from "react";
import './Game.css'
import Problem from "./Problem";
import Timer from "./Timer";
import Settings from "./Settings";


function getRandomInt(max:number){
  return Math.floor(Math.random() * max);
}

function isValidInput(value: string) {
 return /^\d+(\.\d+)?$/.test(value);
}
function calculate(N1:number, N2: number, operation:string){
  switch (operation) {
    case "+":
      return N1 + N2;
      break;
    case "×":
      return N1 * N2;
    default:
      break;
  }
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

  const { selectedDigit, selectedTimer, selectedOperation, settingsRender } = Settings();
  const {render, time}  = Timer(selectedDigit); //I was very sleep when i named this
  
  useEffect(() => {
    switch (selectedTimer) {
      case "Single":
        setN1(getRandomInt(10));
        setN2(getRandomInt(10));
        document.getElementById('answerBox').placeholder = "00";
        break;
      case "Double":
        setN1(getRandomInt(100));
        setN2(getRandomInt(100));
        document.getElementById("answerBox").placeholder = "000";
        break;
      case "Triple":
        setN1(getRandomInt(1000));
        setN2(getRandomInt(1000));
        document.getElementById("answerBox").placeholder = "0000";
        break;
      default:
        break;
    }
  }, [selectedTimer]);
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
      if(parseInt(answer) === calculate(N1,N2,operation)){
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
    <div/>{1 && settingsRender}<div/>
      <div className="timer-box">
        <div className="timer">{timerStarted && render}</div>
      </div>
      <div className="game-content">
        <div className="problem">
          <Problem num1={N1} num2={N2} operation={selectedOperation} />
        </div>
        <input
          type="in"
          id="answerBox"
          className="input"
          placeholder="000"
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