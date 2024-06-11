import { useState } from "react";
import './Game.css'
import Problem from "./Problem";
import Timer from "./Timer";
const Game = () => {
  const [N1, setN1] = useState(0);
  const [N2, setN2] = useState(0);
  const [operation, setOperation] = useState('+');
  const [answer, setAnswer] = useState("");


  return (
    <>
      <div className="timer-box">
        <div className="timer">
          <Timer initalTime={30} />
        </div>
      </div>
      <div className="game-content">
        <div className="problem">
          <Problem num1={1} num2={9} operation="+" />
        </div>
        <input
          type="in"
          className="input"
          placeholder="0"
          maxLength={1}
        />
      </div>
    </>
  );
}

export default Game