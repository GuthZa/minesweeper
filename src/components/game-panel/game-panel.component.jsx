import "./game-panel.css";
import React from "react";
import { Timer, Cell } from "../index";

let mineCount;
let time = 0;

function GamePanel(props) {
  const { selectedLevel, gameStarted, grid } = props;

  const handleTimer = (t) => {
    time = t;
  };

  const checkNeighbors = (x, y) => {
    let count = 0;
    grid.forEach((ele) => {
      //TODO change into a better function
      if (
        (x - 1 === ele.x && y - 1 === ele.y && ele.isMined) ||
        (x === ele.x && y - 1 === ele.y && ele.isMined) ||
        (x + 1 === ele.x && y - 1 === ele.y && ele.isMined) ||
        (x - 1 === ele.x && y === ele.y && ele.isMined) ||
        (x + 1 === ele.x && y === ele.y && ele.isMined) ||
        (x - 1 === ele.x && y + 1 === ele.y && ele.isMined) ||
        (x === ele.x && y + 1 === ele.y && ele.isMined) ||
        (x + 1 === ele.x && y + 1 === ele.y && ele.isMined)
      ) {
        count++;
        console.log("mina");
      }
    });
    return count;
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
                checkNeighbors={checkNeighbors}
                x={cell.x}
                y={cell.y}
              />
            ))
          : " "}
      </div>
    </div>
  );
}

export default GamePanel;
