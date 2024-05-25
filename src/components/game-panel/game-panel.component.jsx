import "./game-panel.css";
import React, { useEffect } from "react";
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

  const checkNeighborsHaveMines = (x, y) => {
    console.log("to implent");
    // let width = selectedLevel === "3" ? 30 : selectedLevel === "2" ? 16 : 9;
    // let arrayPosition = y * width + x;
    // grid.filter((ele) => isAdjacentAndMined(x, y, ele));
  };

  const isAdjacentAndMined = (x, y, ele) => {
    return (
      Math.abs(x - ele.x) <= 1 &&
      Math.abs(y - ele.y) <= 1 &&
      !(x === ele.x && y === ele.y) &&
      ele.isMined
    );
  };

  let nivel =
    selectedLevel === "2"
      ? "intermedio"
      : selectedLevel === "3"
      ? "avancado"
      : "iniciante";

  useEffect(() => {
    // if (mineCount === 0) onGameOver();
  }, [grid, gameStarted, onGameOver]);

  return (
    <div className="board" onContextMenu={(e) => e.preventDefault()}>
      <div className="info">
        <div className="mines-count">Mines: {mineCount}</div>
        <div className="timer">
          Time:
          {gameStarted && <Timer onTimer={handleTimer} />}
          {!gameStarted && time}
        </div>
      </div>
      <div className={`gamePanel ${nivel}`}>
        {grid.map((cell, index) => (
          <Cell
            key={index}
            grid={grid}
            isMined={cell.isMined}
            checkNeighborsHaveMines={checkNeighborsHaveMines}
            onGameOver={onGameOver}
            onMineCount={onMineCount}
            gameStarted={gameStarted}
          />
        ))}
      </div>
    </div>
  );
}

export default GamePanel;
