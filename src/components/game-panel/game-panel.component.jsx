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
    let x = 0,
      y = 0;

    let count = 0;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (shuffledArray[x + y * width].isMined) continue;
        //NE
        if (x > 0 && y > 0 && shuffledArray[x - 1 + (y - 1) * width].isMined)
          count++;
        //N
        if (y > 0 && shuffledArray[x + (y - 1) * width].isMined) count++;
        //NO
        if (
          x < width - 1 &&
          y > 0 &&
          shuffledArray[x + 1 + (y - 1) * width].isMined
        )
          count++;
        //O
        if (x < width - 1 && shuffledArray[x + 1 + y * width].isMined) count++;
        //SO
        if (
          x < width - 1 &&
          y < height - 1 &&
          shuffledArray[x + 1 + (y + 1) * width].isMined
        )
          count++;
        //S
        if (y < height - 1 && shuffledArray[x + (y + 1) * width].isMined)
          count++;
        //SE
        if (
          y < height - 1 &&
          x > 0 &&
          shuffledArray[x - 1 + (y + 1) * width].isMined
        )
          count++;
        //E
        if (x > 0 && shuffledArray[x - 1 + y * width].isMined) count++;
        shuffledArray[x + y * width].numMines = count;
        count = 0;
      }
    }

    shuffledArray.forEach((cell) => {
      cell.x = x++;
      cell.y = y;
      if (!(x % width)) {
        y++;
        x = 0;
      }
      // cell.numMines = checkAdjacentCells(shuffledArray, cell);
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

class BoardCell {
  /**
   * @param {Boolean} mined
   */
  constructor(mined) {
    this.x = 0;
    this.y = 0;
    this.isMined = mined;
    this.isFlagged = false;
    this.numMines = 0;
  }
}

export default GamePanel;
