import React from "react";
import { useState, useEffect } from "react";

function Timer({ onTimer }) {
  const [seconds, setSeconds] = useState(0);
  const [idInterval, setIdInterval] = useState(null);

  //hook useEffect
  //
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);
    setIdInterval(interval);
    return () => clearInterval(interval);
  }, []);
  //por ter dependencias a vazio:
  //Quando o componente for montado
  //executa o useEffect

  useEffect(() => {
    onTimer(idInterval);
  }, [seconds, onTimer, idInterval]);

  return <>{seconds}</>;
}

export default Timer;
