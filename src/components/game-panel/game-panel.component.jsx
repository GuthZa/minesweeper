import "./game-panel.css";
import { Timer, Cell } from "../index";
import { useEffect, useState } from "react";
import shuffleArray from "../../helpers/shuffle";
import boardSize from "../../helpers/boardsize";
import numMinesOnLevel from "../../helpers/mines";

let time = 0;

function GamePanel(props) {
  const { selectedLevel, gameStarted, onGameOver } = props;

  const [mineCount, setMineCount] = useState(0);
  const [grid, setGrid] = useState([]);

  const handleGrid = (level) => {
    const newGrid = [];
    let maxMinas = numMinesOnLevel(level);
    let [width, height] = boardSize(level);

    for (let i = 0, currentMinas = 0; i < height * width; i++, currentMinas++)
      newGrid.push(new BoardCell(currentMinas <= maxMinas));

    setGrid(shuffleArray(newGrid));
  };

  useEffect(() => {
    if (gameStarted) handleGrid(selectedLevel);
    setMineCount(numMinesOnLevel(selectedLevel));
  }, [selectedLevel, gameStarted]);

  const handleTimer = (t) => {
    time = t;
  };

  const handleMineCount = (isToRemoveMine) =>
    setMineCount((previousValue) =>
      isToRemoveMine ? previousValue - 1 : previousValue + 1
    );

  const checkNeighborsHaveMines = (cell) => {
    // console.log("to implent");
    // let width = selectedLevel === "3" ? 30 : selectedLevel === "2" ? 16 : 9;
    // let arrayPosition = y * width + x;
    // let value = grid.filter((ele) => isAdjacentAndMined(cell, ele)).length;
    console.log(cell);
    // return value;
  };

  const isAdjacentAndMined = (cell, ele) => {
    let value =
      Math.abs(cell.x - ele.x) <= 1 &&
      Math.abs(cell.y - ele.y) <= 1 &&
      !(cell.x === ele.x && cell.y === ele.y) &&
      ele.isMined;
    return value;
  };

  let nivel =
    selectedLevel === "2"
      ? "intermedio"
      : selectedLevel === "3"
      ? "avancado"
      : "iniciante";

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
            onMineCount={handleMineCount}
            gameStarted={gameStarted}
          />
        ))}
      </div>
    </div>
  );
}

class BoardCell {
  constructor(mined) {
    this.isMined = mined;
    this.isFlagged = false;
  }
}

export default GamePanel;
