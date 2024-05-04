import "./game-panel.css";
import React from "react";
import { Cell, Timer } from "../index";

let mineCount;

function GamePanel(props) {
  const { selectedLevel, gameStarted } = props;

  const handleTimer = (t) => {
    console.log(t);
  };

  if (!gameStarted)
    mineCount = selectedLevel === "3" ? 99 : selectedLevel === "2" ? 40 : 10;

  const grid = [];
  let k = 0;
  let altura = selectedLevel === "3" ? 30 : selectedLevel === "2" ? 16 : 9;
  let largura = selectedLevel === "3" || selectedLevel === "2" ? 16 : 9;
  for (let i = 0; i < altura * largura; i++) {
    grid.push(<Cell key={k++} />);
  }

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
        {gameStarted && (
          <div className="timer">
            Time:
            <Timer onTimer={handleTimer} />s{" "}
          </div>
        )}
      </div>
      <div className={`gamePanel ${nivel}`}>{grid}</div>
    </div>
  );
}

export default GamePanel;
