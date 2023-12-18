import { FC, useEffect, useState, memo } from "react";
import TimerProps from "./type";
export const Timer: FC<TimerProps> = memo(
  ({ initialType, type, finishText, handleFinish }) => {
    const [time, setTime] = useState(initialType);
    const [finish, setFinish] = useState(false);
    useEffect(() => {
      const timer = setInterval(() => {
        setTime((prevTime) => prevTime - (type === "asc" ? -1 : 1));
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }, []);

    useEffect(() => {
      if (time < 0) {
        setFinish(true);
        handleFinish(true);
      }
    }, [time]);

    const formatTime = (totalSeconds: number) => {
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      return `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
    };

    return <span>{finish ? finishText : formatTime(time)}</span>;
  }
);

Timer.displayName = "Timer";
