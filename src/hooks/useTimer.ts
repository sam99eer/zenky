import { useEffect, useRef, useState } from 'react';

const useTimer = (duration: number) => {
    const [timeLeft, setTimeLeft] = useState(duration);
    const [isRunning, setIsRunning] = useState(false);
    const [toggle, setToggle] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const handleStart = () => {
        setTimeLeft(duration);
        setIsRunning(true);
        setToggle((prevState) => !prevState);
    };

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setTimeLeft((prevTime) => {
                    if (prevTime === 0 && intervalRef.current) {
                        clearInterval(intervalRef.current);
                        setIsRunning(false);
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isRunning, toggle]);

    return {
        timeLeft,
        handleStart,
        isEnabled: isRunning === false,
    };
};

export default useTimer;
