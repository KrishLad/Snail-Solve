import { useState } from "react";
import "./Settings.css";

function useSettings() {
  const [selectedDuration, setSelectedDuration] = useState(10);
  const [selectedDigits, setSelectedDigits] = useState("Single");
  const [selectedOperation, setSelectedOperation] = useState("+");

  const handleDurationClick = (value: number) => {
    setSelectedDuration(value);
  };

  const handleDigitsClick = (value: string) => {
    setSelectedDigits(value);
  };

  const handleOperationClick = (value: string) => {
    setSelectedOperation(value);
  };

  return {
    selectedDuration,
    selectedDigits,
    selectedOperation,
    settingsRender: (
      <>
        <div className="container">
          <div className="digit-settings">
            <p className="title">Time | </p>
            <button
              className={`btn ${selectedDuration === 10 ? "selected" : ""}`}
              onClick={() => handleDurationClick(10)}
            >
              10
            </button>
            <button
              className={`btn ${selectedDuration === 30 ? "selected" : ""}`}
              onClick={() => handleDurationClick(30)}
            >
              30
            </button>
            <button
              className={`btn ${selectedDuration === 60 ? "selected" : ""}`}
              onClick={() => handleDurationClick(60)}
            >
              60
            </button>
          </div>
          <div className="timer-settings">
            <p className="title">Digits | </p>
            <button
              className={`btn ${selectedDigits === "Single" ? "selected" : ""}`}
              onClick={() => handleDigitsClick("Single")}
            >
              Single
            </button>
            <button
              className={`btn ${selectedDigits === "Double" ? "selected" : ""}`}
              onClick={() => handleDigitsClick("Double")}
            >
              Double
            </button>
            <button
              className={`btn ${selectedDigits === "Triple" ? "selected" : ""}`}
              onClick={() => handleDigitsClick("Triple")}
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

export default useSettings;
