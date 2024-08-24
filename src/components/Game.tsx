import { useEffect, useState } from "react";
import './Game.css'
import Problem from "./Problem";
import Timer from "./Timer";
import Settings from "./Settings";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";


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
  const [settingsDisplayed, setSettingsDisplayed] = useState(true);
  const [showEndGame, setShowEndGame] = useState(false);

  const { selectedDigit, selectedTimer, selectedOperation, settingsRender } = Settings();
  const {time, setTimerOn, render}  = Timer(selectedDigit); //I was very sleep when i named this
  const [solvesperMinute, setSolvesPerMinute] = useState(0);
  const [solveTimes, setSolveTimes] = useState([]);

 

  //Random number generator 
  useEffect(() => {
    switch (selectedTimer) {
      case "Single":
        setN1(getRandomInt(10));
        setN2(getRandomInt(10));
        document.getElementById('answerBox').placeholder = "00";
        document.getElementById("answerBox").maxLength = 2;
        break;
      case "Double":
        setN1(getRandomInt(100));
        setN2(getRandomInt(100));
        document.getElementById("answerBox").placeholder = "000";
        document.getElementById("answerBox").maxLength = 3;
        break;
      case "Triple":
        setN1(getRandomInt(1000));
        setN2(getRandomInt(1000));
        document.getElementById("answerBox").placeholder = "0000";
        document.getElementById("answerBox").maxLength = 4;
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
  

  // Game loop 
   useEffect(() => {
     if (answer && !gameStarted) {
       setGameStarted(true);
       startTimer();
       setTimerOn(true);
       setSettingsDisplayed(false);
     } else if (answer) {
       if (parseInt(answer) === calculate(N1, N2, operation)) {
         setScore(score + 1);
         setN1(getRandomInt(10));
         setN2(getRandomInt(10));
         clearInput();

         //Record the time taken for this solve
         const solveTime = selectedDigit - time;
         setSolveTimes(prevTimes => [...prevTimes, solveTime]); 
       }
     } 
   }, [answer, gameStarted, time]);

  //Game end.
 useEffect(() => {
   if (time < 0) {
     setTimerStarted(false);
     setShowEndGame(true);
     document.getElementById("game").style.display = "none";


     const minutesPlayed = selectedDigit/ 60;
     const spm = (score / minutesPlayed).toFixed(2);
     setSolvesPerMinute(parseFloat(spm));
   }
 }, [time]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value);
    
  };


  //Display this at the end game
  const EndGameDisplay = ({score, solveTimes}) => {
    const data = solveTimes.map((time, index) => ({
      problem: index+1,
      time: time
    }));

    const averageSolveTime = solveTimes.reduce((a,b) => a+b, 0);
    const solvesperMinute = (60/ averageSolveTime).toFixed(2);

    return (
      <div className="end-game-display">
        <h2>Game Over!</h2>
        <p>Your Score: {score}</p>
        <p>Solves per Minute: {solvesperMinute}</p>
        <LineChart
          width={600}
          height={300}
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="problem"
            label={{
              value: "Problem Number",
              position: "insideBottomRight",
              offset: -10,
            }}
          />
          <YAxis
            label={{
              value: "Time (seconds)",
              angle: -90,
              position: "insideLeft",
            }}
          />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="time" stroke="#8884d8" />
        </LineChart>
      </div>
    );
  }

  return (
    <>
      <div />
      {settingsDisplayed && settingsRender}
      <div />
      <div className="timer-box">
        <div className="timer">{timerStarted && render}</div>
      </div>
      <div className="game-content" id="game">
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
            if (!(e.code === "Backspace" || isValidInput(e.key))) {
              e.preventDefault();
            }
          }}
          maxLength={2} //value is modified
        />
      </div>
      {showEndGame && <EndGameDisplay score={score} solveTimes={solveTimes}/>}
    </>
  );
}

export default Game