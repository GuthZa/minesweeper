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

    for (let i = 0, currentMinas = 0; i < width * height; i++, currentMinas++)
      newGrid.push(new BoardCell(currentMinas <= maxMinas));

    let shuffledArray = shuffleArray(newGrid);

    calculateMines(shuffledArray, width, height);
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
            numMines={cell.numMines}
            onGameOver={onGameOver}
            onMineCount={handleMineCount}
            gameStarted={gameStarted}
          />
        ))}
      </div>
    </div>
  );
}

function calculateMines(shuffledArray, width, height) {
  const directions = [
    [-1, -1], // NE
    [0, -1], // N
    [1, -1], // NO
    [1, 0], // O
    [1, 1], // SO
    [0, 1], // S
    [-1, 1], // SE
    [-1, 0], // E
  ];

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (shuffledArray[x + y * width].isMined) continue;

      let count = 0;
      for (const [dx, dy] of directions) {
        const newX = x + dx;
        const newY = y + dy;

        if (
          newX >= 0 &&
          newX < width &&
          newY >= 0 &&
          newY < height &&
          shuffledArray[newX + newY * width].isMined
        ) {
          count++;
        }
      }

      shuffledArray[x + y * width].numMines = count;
    }
  }
}

class BoardCell {
  /**
   * @param {Boolean} mined
   */
  constructor(mined) {
    this.isMined = mined;
    this.isFlagged = false;
    this.numMines = 0;
  }
}

export default GamePanel;
