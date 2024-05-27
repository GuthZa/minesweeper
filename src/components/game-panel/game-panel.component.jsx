import "./game-panel.css";
import { Timer, Cell } from "../index";
import { useEffect, useState } from "react";
import shuffleArray from "../../helpers/shuffle";
import boardSize from "../../helpers/boardsize";
import numMinesOnLevel from "../../helpers/mines";

let nivel = "";

function GamePanel(props) {
  const { selectedLevel, gameStarted, onGameOver, onTimer } = props;

  const [mineCount, setMineCount] = useState(0);
  const [grid, setGrid] = useState([]);

  const handleGrid = (level) => {
    const newGrid = [];
    let maxMinas = numMinesOnLevel(level);
    let [width, height] = boardSize(level);
    console.log(width);

    for (let i = 0, currentMinas = 0; i < width * height; i++, currentMinas++)
      newGrid.push(new BoardCell(currentMinas <= maxMinas));

    let shuffledArray = shuffleArray(newGrid);
    let x = 0,
      y = 0;

    shuffledArray.forEach((cell) => {
      cell.x = x++;
      cell.y = y;
      if (!(x % width)) {
        y++;
        x = 0;
      }
      cell.numMines = checkNeighborsHaveMines(x, y);
    });

    setGrid(shuffledArray);
  };

  useEffect(() => {
    handleGrid(selectedLevel);
    setMineCount(numMinesOnLevel(selectedLevel));
    nivel =
      selectedLevel === "2"
        ? "intermedio"
        : selectedLevel === "3"
        ? "avancado"
        : "iniciante";
  }, [selectedLevel, gameStarted]);

  const handleMineCount = (isToRemoveMine) =>
    setMineCount((previousValue) =>
      isToRemoveMine ? previousValue - 1 : previousValue + 1
    );

  const checkNeighborsHaveMines = (x, y) => {
    return grid.filter((ele) => isAdjacentAndMined(x, y, ele)).length;
  };

  const isAdjacentAndMined = (x, y, ele) => {
    return (
      Math.abs(x - ele.x) <= 1 &&
      Math.abs(y - ele.y) <= 1 &&
      !(x === ele.x && y === ele.y) &&
      ele.isMined
    );
  };

  return (
    <div className="board" onContextMenu={(e) => e.preventDefault()}>
      <div className="info">
        <div className="mines-count">Mines: {mineCount}</div>
        <div className="timer">
          Time:
          {gameStarted && <Timer onTimer={onTimer} />}
          {!gameStarted && 0 /* Only to make the game "prettier*/}
        </div>
      </div>
      <div className={`gamePanel ${nivel}`}>
        {grid.map((cell, index) => (
          <Cell
            key={index}
            grid={grid}
            isMined={cell.isMined}
            mineCount={cell.numMines}
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
  /**
   * @param {Boolean} mined
   */
  constructor(mined) {
    this.x = 0;
    this.y = 0;
    this.isMined = mined;
    this.isFlagged = false;
    this.mineDisplay = 0;
  }
}

export default GamePanel;
