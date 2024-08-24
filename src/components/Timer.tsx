import { useState, useEffect } from "react";
import './Timer.css'
const Timer = (initalTime: number) => {
    const [time, setTime] = useState(initalTime);
    const [timerOn, setTimerOn] = useState(false);
    useEffect( () => {
        if (timerOn){
             if (time >= 0) {
               const timer = setInterval(() => {
                 setTime((prevTime) => prevTime - 1);
               }, 1000);

               return () => clearInterval(timer);
             }
        }
       
    }, [time, timerOn]);
    return {
        time,
        setTime,
        setTimerOn,
        render:(
        <div className = "timer-content">
            <h1>
                {time}s
            </h1>
        </div>
  )};
}

export default Timer