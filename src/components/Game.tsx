import { useState } from "react";
import './Game.css'
const Game = () => {
  const [N1, setN1] = useState(0);
  const [N2, setN2] = useState(0);
  const [operation, setOperation] = useState('+');
  const [answer, setAnswer] = useState("");

  const generateProblem = () => {
    const randomN1 = Math.floor(Math.random() * 10) + 1;
    const randomN2 = Math.floor(Math.random() * 10) + 1;
    // implement choosing operation logic.
    setN1(randomN1);
    setN2(randomN2);
    setAnswer("");
  }
  
  return (
    <>
      <div className = "game-content">
        
      </div>
    </>
  );
}

export default Game