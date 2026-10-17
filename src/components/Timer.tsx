import { useState, useEffect } from "react";
import './Timer.css'

const useTimer = (initialTime: number) => {
  const [time, setTime] = useState(initialTime);
  const [timerOn, setTimerOn] = useState(false);

  useEffect(() => {
    setTime(initialTime);
  }, [initialTime]);

  useEffect(() => {
    if (!timerOn) return;

    const timer = window.setInterval(() => {
      setTime(previous => Math.max(0, previous - 1));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [timerOn]);

  return {
    time,
    setTime,
    setTimerOn,
    render: (
      <div className="timer-content">
        <h1>{time}s</h1>
      </div>
    ),
  };
};

export default useTimer;
