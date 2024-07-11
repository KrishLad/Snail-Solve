import { useState } from "react";
import "./Settings.css";

function Settings() {
  const [selectedDigit, setSelectedDigit] = useState(5);
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
    settingsRender: (<>
      <div className="container">
        <div className="digit-settings">
          <button
            className={`btn ${selectedDigit === 5 ? "selected" : ""}`}
            onClick={() => handleDigitClick(5)}
          >
            5
          </button>
          <button
            className={`btn ${selectedDigit === 10 ? "selected" : ""}`}
            onClick={() => handleDigitClick(10)}
          >
            10
          </button>
          <button
            className={`btn ${selectedDigit === 15 ? "selected" : ""}`}
            onClick={() => handleDigitClick(15)}
          >
            15
          </button>
        </div>
        <div className="timer-settings">
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
    )};
}

export default Settings;
