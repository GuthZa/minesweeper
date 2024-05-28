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
  const [revealedCells, setRevealedCells] = useState([]);

  const handleMineCount = (isToRemoveMine) =>
    setMineCount((previousValue) =>
      isToRemoveMine ? previousValue - 1 : previousValue + 1
    );

  const handleGrid = (level) => {
    const newGrid = [];
    let maxMinas = numMinesOnLevel(level);
    let [width, height] = boardSize(level);

    //Creates the board
    for (let i = 0, currentMinas = 0; i < width * height; i++, currentMinas++)
      newGrid.push({
        isMined: currentMinas < maxMinas,
        isFlagged: false,
        numMines: 0,
      });

    let shuffledArray = shuffleArray(newGrid);
    calculateMines(shuffledArray, width, height);

    // calculatePosition(shuffledArray, width);

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

  const handleRevealCells = (cell) => {
    let [width, height] = boardSize(selectedLevel);

    // if (!grid[cell - 1].isMined)
    //   setRevealedCells((currentCells) => [...currentCells, cell - 1]);
    setRevealedCells((currentCells) => [...currentCells, cell]);
  };

  const handleGameOver = () => {
    let [width, height] = boardSize(selectedLevel);
    if (revealedCells.length + 1 + mineCount === width * height) onGameOver();
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
            id={index}
            grid={grid}
            isMined={cell.isMined}
            numMines={cell.numMines}
            onGameOver={handleGameOver}
            onMineCount={handleMineCount}
            gameStarted={gameStarted}
            onReveal={handleRevealCells}
            revealedCells={revealedCells}
          />
        ))}
      </div>
    </div>
  );
}

function calculateMines(array, width, height) {
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
      if (array[x + y * width].isMined) continue;

      let count = 0;
      for (const [dx, dy] of directions) {
        const newX = x + dx;
        const newY = y + dy;

        if (
          newX >= 0 &&
          newX < width &&
          newY >= 0 &&
          newY < height &&
          array[newX + newY * width].isMined
        ) {
          count++;
        }
      }

      array[x + y * width].numMines = count;
    }
  }
}

function calculatePosition(array, width) {
  let x = 0,
    y = 0;
  array.forEach((cell) => {
    cell.x = x++;
    cell.y = y;
    if (!(x % width)) {
      y++;
      x = 0;
    }
  });
}

export default GamePanel;
