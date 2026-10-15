import { useEffect, useRef, useState } from "react";
import './Game.css'
import Problem from "./Problem";
import useTimer from "./Timer";
import useSettings from "./Settings";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function numberLimit(digits: string) {
  return digits === "Triple" ? 1000 : digits === "Double" ? 100 : 10;
}

function calculate(N1: number, N2: number, operation: string) {
  return operation === "x" ? N1 * N2 : N1 + N2;
}

interface EndGameDisplayProps {
  score: number;
  duration: number;
  solveTimes: number[];
}

const EndGameDisplay = ({ score, duration, solveTimes }: EndGameDisplayProps) => {
  const data = solveTimes.map((time, index) => ({
    problem: index + 1,
    time,
  }));
  const solvesPerMinute = (score * 60 / duration).toFixed(2);

  return (
    <div className="end-game-display">
      <h2>Game Over!</h2>
      <p>Your Score: {score}</p>
      <p>Solves per Minute: {solvesPerMinute}</p>
      {solveTimes.length === 0 && <p>No solves recorded.</p>}
      {solveTimes.length === 1 && <p>Solve time: {solveTimes[0].toFixed(2)}s</p>}
      {solveTimes.length > 1 && (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="problem"
              label={{ value: "Solves", position: "insideBottomRight", offset: -10 }}
            />
            <YAxis width={65} domain={[0, (maximum: number) => Math.max(1, Math.ceil(maximum))]} allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="time" name="Solve time (s)" stroke="#8884d8" dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

const Game = () => {
  const [N1, setN1] = useState(() => getRandomInt(10));
  const [N2, setN2] = useState(() => getRandomInt(10));
  const [answer, setAnswer] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [showEndGame, setShowEndGame] = useState(false);
  const [solveTimes, setSolveTimes] = useState<number[]>([]);
  const lastSolveAt = useRef<number | null>(null);

  const { selectedDuration, selectedDigits, selectedOperation, settingsRender } = useSettings();
  const { time, setTime, setTimerOn, render } = useTimer(selectedDuration);
  const limit = numberLimit(selectedDigits);
  const largestOperand = limit - 1;
  const maxAnswerLength = String(selectedOperation === "x"
    ? largestOperand * largestOperand
    : largestOperand * 2).length;

  useEffect(() => {
    setN1(getRandomInt(numberLimit(selectedDigits)));
    setN2(getRandomInt(numberLimit(selectedDigits)));
    setAnswer("");
  }, [selectedDigits, selectedOperation]);

  useEffect(() => {
    if (gameStarted && time === 0) {
      setTimerOn(false);
      setGameStarted(false);
      setShowEndGame(true);
      setAnswer("");
    }
  }, [gameStarted, time, setTimerOn]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (time === 0 || !/^\d*$/.test(value) || value.length > maxAnswerLength) return;

    if (value && !gameStarted) {
      setGameStarted(true);
      setTimerOn(true);
      lastSolveAt.current = performance.now();
    }

    if (value && Number(value) === calculate(N1, N2, selectedOperation)) {
      const now = performance.now();
      const solveTime = (now - (lastSolveAt.current ?? now)) / 1000;
      setSolveTimes(previous => [...previous, Number(solveTime.toFixed(2))]);
      lastSolveAt.current = now;
      setScore(previous => previous + 1);
      setN1(getRandomInt(limit));
      setN2(getRandomInt(limit));
      setAnswer("");
    } else {
      setAnswer(value);
    }
  };

  const restartGame = () => {
    setTimerOn(false);
    setTime(selectedDuration);
    setGameStarted(false);
    setShowEndGame(false);
    setScore(0);
    setSolveTimes([]);
    setAnswer("");
    lastSolveAt.current = null;
    setN1(getRandomInt(limit));
    setN2(getRandomInt(limit));
  };

  return (
    <>
      <img className="logo" src="/CgMvp701.svg" alt="logo" />
      {!gameStarted && !showEndGame && settingsRender}
      {gameStarted && (
        <div className="timer-box">
          <div className="timer">{render}</div>
        </div>
      )}
      {!showEndGame && (
        <div className="game-content" id="game">
          <div className="problem">
            <Problem num1={N1} num2={N2} operation={selectedOperation} />
          </div>
          <input
            type="text"
            inputMode="numeric"
            id="answerBox"
            className="input"
            placeholder={"0".repeat(maxAnswerLength)}
            value={answer}
            onChange={handleInputChange}
            maxLength={maxAnswerLength}
          />
        </div>
      )}
      {showEndGame && (
        <div className="end-screen">
          <EndGameDisplay score={score} duration={selectedDuration} solveTimes={solveTimes} />
          <button className="restart-button" onClick={restartGame} aria-label="Play again">⟳</button>
        </div>
      )}
    </>
  );
};

export default Game;
