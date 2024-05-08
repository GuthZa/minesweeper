import "./game-panel.css";
import React from "react";
import { Timer, Cell } from "../index";

let mineCount;
let time = 0;

function GamePanel(props) {
  const { selectedLevel, gameStarted, onGameOver, grid } = props;

  const handleTimer = (t) => {
    time = t;
  };

  const checkNeighbors = (x, y) => {
    let count = 0;
    grid.forEach((ele) => {
      if (isAdjacentAndMined(x, y, ele)) count++;
    });
    return count === 0;
  };

  if (!gameStarted)
    mineCount = selectedLevel === "3" ? 99 : selectedLevel === "2" ? 40 : 10;

  let nivel =
    selectedLevel === "2"
      ? "intermedio"
      : selectedLevel === "3"
      ? "avancado"
      : "iniciante";

  //? use useEffect to update mineCount
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
      <div className={`gamePanel ${nivel}`}>
        {gameStarted && selectedLevel !== "0"
          ? grid.map((cell) => (
              <Cell
                key={cell.id}
                isMined={cell.isMined}
                x={cell.x}
                y={cell.y}
                checkNeighbors={checkNeighbors}
                onGameOver={onGameOver}
              />
            ))
          : " "}
      </div>
    </div>
  );
}

function isAdjacentAndMined(x, y, ele) {
  return (
    Math.abs(x - ele.x) <= 1 &&
    Math.abs(y - ele.y) <= 1 &&
    !(x === ele.x && y === ele.y) &&
    ele.isMined
  );
}

export default GamePanel;
