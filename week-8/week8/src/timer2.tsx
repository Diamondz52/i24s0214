import { useState, useEffect, useRef } from 'react';

interface TimerProps {
    initialSeconds: number;
}

export const Timer2 = ({ initialSeconds }: TimerProps) => {
    const [seconds, setSeconds] = useState<number>(initialSeconds);
    const timerIdRef = useRef<number | null>(null);

    useEffect(() => {
        timerIdRef.current = setInterval(() => {
            setSeconds(prev => {
                if (prev < 1) {
                    if (timerIdRef.current) clearInterval(timerIdRef.current);
                    console.log("Time's up!");
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            if (timerIdRef.current) clearInterval(timerIdRef.current);
        };
    }, []);

    return <div>Осталось времени: {seconds}</div>;
};