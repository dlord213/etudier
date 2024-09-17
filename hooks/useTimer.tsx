import { useEffect, useState, useRef } from "react";

export default function useTimer() {
  const [timer, setTimer] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTimer((prevTime) => {
          if (prevTime === 0) {
            clearInterval(intervalRef.current as NodeJS.Timeout);

            if (!isBreak) {
              setIsBreak(true);
              setTimer(5 * 60);
              setIsRunning(false);
            } else {
              setIsBreak(false);
              setTimer(25 * 60);
              setIsRunning(false);
            }

            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
  };

  const pauseTimer = () => {
    if (isRunning && intervalRef.current) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
    }
  };

  useEffect(() => {
    if (isBreak && !isRunning) {
      startTimer();
    }
  }, [isBreak, isRunning]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return [timer, formatTime, startTimer, pauseTimer, isRunning, isBreak];
}
