import { useState, useEffect } from "react";
import './Timer.css'
interface Prop{
    initalTime: number;
}
const Timer = ({initalTime}: Prop) => {
    const [time, setTime] = useState(initalTime);
    useEffect( () => {
        if (time  > 0){
            const timer = setInterval(() => {
                setTime(prevTime => prevTime-1 );
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [time]);
    return (
        <div className = "timer">
            <h1>
                {time}s
            </h1>
        </div>
  );
}

export default Timer