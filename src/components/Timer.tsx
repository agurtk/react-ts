import React from "react";
import { useTimersContext, type Timer as Props } from "../store/timersContext";
import Container from "./UI/Container";

const Timer = ({ name, duration }: Props) => {
  const [remainingTime, setRemainingTime] = React.useState(duration * 1000);
  const intervalTimerRef = React.useRef<number | null>(null);
  const { isRunning } = useTimersContext();

  React.useEffect(() => {
    let intervalTimer: number;
    if (isRunning) {
      intervalTimer = intervalTimerRef.current = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime <= 0) return 0;
          return prevTime - 50;
        });
      }, 50);
    } else if (intervalTimerRef.current) {
      clearInterval(intervalTimerRef.current);
    }
    return () => {
      clearInterval(intervalTimer);
    };
  }, [isRunning]);

  if (intervalTimerRef.current && remainingTime <= 0) {
    clearInterval(intervalTimerRef.current);
  }
  return (
    <Container as="article">
      <h2>{name}</h2>
      <p>
        <progress max={duration * 1000} value={remainingTime} />
      </p>
      <p>{(remainingTime / 1000).toFixed(2)}</p>
    </Container>
  );
};

export default Timer;
