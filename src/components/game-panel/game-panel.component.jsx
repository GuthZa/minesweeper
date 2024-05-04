import "./game-panel.css";
import React, { useState } from "react";
import { Timer } from "../index";

let mineCount;
let time = 0;

function GamePanel(props) {
  const { selectedLevel, gameStarted, grid } = props;

  const handleTimer = (t) => {
    time = t;
  };

  if (!gameStarted)
    mineCount = selectedLevel === "3" ? 99 : selectedLevel === "2" ? 40 : 10;

  let nivel =
    selectedLevel === "2"
      ? "intermedio"
      : selectedLevel === "3"
      ? "avancado"
      : "iniciante";

  // use useEffect to update mineCount ?
  return (
    <div className="board">
      <div className="info">
        <div className="mines-count">Mines: {mineCount}</div>
        <div className="timer">
          Time:
          {gameStarted && <Timer onTimer={handleTimer} />}
          {!gameStarted && time}
        </div>
      </div>
      <div className={`gamePanel ${nivel}`}>{grid}</div>
    </div>
  );
}

export default GamePanel;
