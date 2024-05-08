import "./game-panel.css";
import React from "react";
import { Timer, Cell } from "../index";

let time = 0;

function GamePanel(props) {
  const {
    selectedLevel,
    gameStarted,
    onGameOver,
    grid,
    mineCount,
    onMineCount,
  } = props;

  const handleTimer = (t) => {
    time = t;
  };

  const checkNeighbors = (x, y) =>
    grid.filter((ele) => isAdjacentAndMined(x, y, ele)).length;

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
        {gameStarted &&
          grid.map((cell) => (
            <Cell
              key={cell.id}
              isMined={cell.isMined}
              x={cell.x}
              y={cell.y}
              checkNeighbors={checkNeighbors}
              onGameOver={onGameOver}
              onMineCount={onMineCount}
            />
          ))}
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
