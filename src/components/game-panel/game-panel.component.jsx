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
      newGrid.push(new BoardCell(currentMinas < maxMinas));

    let shuffledArray = shuffleArray(newGrid);

    shuffledArray = calculateMines(shuffledArray, width, height);

    shuffledArray = calculatePosition(shuffledArray, width);

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
    let cellsToReveal = [];

    cellsToReveal.push(cell);

    for (let i = 0; i < cellsToReveal.length; i++) {
      checkNeighbors(cellsToReveal, cellsToReveal[i], width, height);
      if (cellsToReveal.length > width * height) return;
    }
    setRevealedCells((currentCells) => [...currentCells, ...cellsToReveal]);
  };

  const checkNeighbors = (array, cell, width, height) => {
    if (grid[cell].numMines !== 0) return;
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
    for (const [dx, dy] of directions) {
      const newX = grid[cell].x + dx;
      const newY = grid[cell].y + dy;
      const nextCell = cell + dx + dy * width;
      if (
        newX >= 0 &&
        newX < width &&
        newY >= 0 &&
        newY < height &&
        !array.includes(nextCell) &&
        !grid[nextCell].isMined
      ) {
        console.log("(" + newX + "," + newY + ")");
        console.log(nextCell);
        array.push(nextCell);
      }
    }
    return array;
  };

  const handleGameOver = (isMined) => {
    let [width, height] = boardSize(selectedLevel);
    if (isMined) {
      //Reveals all mined cells
      grid.forEach((cell, index) => {
        if (cell.isMined)
          setRevealedCells((currentCells) => [...currentCells, index]);
      });
      onGameOver();
    }
    if (revealedCells.length + 1 + mineCount === width * height) onGameOver();
  };

  useEffect(() => {
    setRevealedCells([]);
  }, [gameStarted]);

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
            x={cell.x}
            y={cell.y}
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

//For each cell, calculates the 8 cells in the coordinates (n, e, s, o, ne, no, se, so)
//Then places the num in the object for each cell
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
  return array;
}

//Calculates x and y position of each Cell
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
  return array;
}

class BoardCell {
  constructor(isMined) {
    this.isMined = isMined;
    this.isFlagged = false;
    this.isRevealed = false;
    this.x = 0;
    this.y = 0;
    this.numMines = 0;
  }
}

export default GamePanel;
