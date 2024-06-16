import { useState, useEffect } from "react";
import './Timer.css'
const Timer = (initalTime: number) => {
    const [time, setTime] = useState(initalTime);
    useEffect( () => {
        if (time  > 0){
            const timer = setInterval(() => {
                setTime(prevTime => prevTime-1 );
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [time]);
    return {
        time,
        render:(
        <div className = "timer-content">
            <h1>
                {time}s
            </h1>
        </div>
  )};
}

export default Timer