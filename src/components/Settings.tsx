import { useState } from "react";
import "./Settings.css";

function Settings() {
  const [selectedDigit, setSelectedDigit] = useState(10);
  const [selectedTimer, setSelectedTimer] = useState("Single");
  const [selectedOperation, setSelectedOperation] = useState("+");

  const handleDigitClick = (value: number) => {
    setSelectedDigit(value);
  };

  const handleTimerClick = (value: string) => {
    setSelectedTimer(value);
  };

  const handleOperationClick = (value: string) => {
    setSelectedOperation(value);
  };

  return {
    selectedDigit,
    selectedTimer,
    selectedOperation,
    settingsRender: (
      <>
        <div className="container">
          <div className="digit-settings">
            <p className="title">Time | </p>
            <button
              className={`btn ${selectedDigit === 10 ? "selected" : ""}`}
              onClick={() => handleDigitClick(10)}
            >
              10
            </button>
            <button
              className={`btn ${selectedDigit === 30 ? "selected" : ""}`}
              onClick={() => handleDigitClick(30)}
            >
              30
            </button>
            <button
              className={`btn ${selectedDigit === 60 ? "selected" : ""}`}
              onClick={() => handleDigitClick(60)}
            >
              60
            </button>
          </div>
          <div className="timer-settings">
            <p className="title">Digits | </p>
            <button
              className={`btn ${selectedTimer === "Single" ? "selected" : ""}`}
              onClick={() => handleTimerClick("Single")}
            >
              Single
            </button>
            <button
              className={`btn ${selectedTimer === "Double" ? "selected" : ""}`}
              onClick={() => handleTimerClick("Double")}
            >
              Double
            </button>
            <button
              className={`btn ${selectedTimer === "Triple" ? "selected" : ""}`}
              onClick={() => handleTimerClick("Triple")}
            >
              Triple
            </button>
          </div>
          <div className="operation-settings">
            <p className="title">Operation | </p>
            <button
              className={`btn ${selectedOperation === "+" ? "selected" : ""}`}
              onClick={() => handleOperationClick("+")}
            >
              +
            </button>
            <button
              className={`btn ${selectedOperation === "x" ? "selected" : ""}`}
              onClick={() => handleOperationClick("x")}
            >
              x
            </button>
          </div>
        </div>
      </>
    ),
  };
}

export default Settings;
