import {useState, useEffect} from "react";

interface TimerProps {
    initialSeconds: number;
}

export const Timer = ({ initialSeconds }: TimerProps) => {
    const [seconds, setSeconds] = useState(initialSeconds);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds - 1);
            if (seconds === 0) {
                clearInterval(interval);
                console.log("Time's up!")
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [seconds]);
    return(
        <div>
            Осталось времени: {seconds}
        </div>
    )
};