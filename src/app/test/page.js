"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./test.module.css";

const page = () => {
  const [time, setTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [running, setRunning] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (running) {
      timerRef.current = setInterval(() => {
        setTime((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timerRef.current);
  }, [running]);

  const formatTime = (seconds) => {
    const min = String(Math.floor(seconds / 60)).padStart(2, "0");
    const sec = String(seconds % 60).padStart(2, "0");
    return `${min}:${sec}`;
  };

  const progressPercent = totalTime === 0 ? 0 : (time / totalTime) * 100;

  console.log("test", progressPercent);

  return (
    <div className={styles.box}>
      <p className={styles.time}>{formatTime(time)}</p>
      <div className={styles.progressBar}>
        <div
          className={styles.progress}
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>
      <di className={styles.control}>
        <button
          className={styles.minus}
          onClick={() => setTime((t) => Math.max(0, t - 60))}
        >
          -
        </button>
        <button
          className={styles.start}
          onClick={() => {
            setRunning(true);
            if (totalTime === 0) setTotalTime(time);
          }}
          disabled={running || time === 0}
        >
          Start!
        </button>
        <button className={styles.plus} onClick={() => setTime((t) => t + 60)}>
          +
        </button>
      </di>
      <button
        className={styles.cancel}
        onClick={() => {
          clearInterval(timerRef.current);
          setRunning(false);
          setTime(0);
        }}
      >
        Cancel
      </button>
    </div>
  );
};

export default page;
