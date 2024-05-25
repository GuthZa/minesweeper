import "./assets/styles/App.css";
import { React, useState } from "react";
import { GamePanel, ControlPanel, Header, Footer } from "./components";
import {
  NUM_MINAS_AVANCADO,
  NUM_MINAS_BEGINNER,
  NUM_MINAS_INTERMEDIO,
} from "./constants";

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState("0");
  const [grid, setGrid] = useState([]);
  const [mineCount, setMineCount] = useState(0);

  const handleGameStart = () => {
    setGameStarted(!gameStarted);
    handleGrid(selectedLevel);
    setNumMinas(selectedLevel);
  };

  const handleGameOver = () => {
    setGameStarted(false);
  };

  const handleLevelChange = (ele) => {
    let value = ele.currentTarget.value;
    setSelectedLevel(value);
    handleGrid(value);
    setNumMinas(value);
  };

  const handleMineCount = (isToRemoveMine) => {
    if (isToRemoveMine && mineCount > 0) {
      setMineCount((previousValue) => previousValue - 1);
    } else {
      setMineCount((previousValue) => previousValue + 1);
    }
  };

  const handleGrid = (level) => {
    let height = level === "3" ? 30 : level === "2" ? 16 : 9;
    let width = level === "3" || level === "2" ? 16 : 9;
    const newGrid = [];

    let mineChance = (height * width) / mineCount;
    const arrayMines = [];
    //chance inicial de minas 50%
    //reduzindo smp q gera uma mina
    setMines(width, height, mineCount, arrayMines);

    for (let i = 0; i < height; i++)
      for (let j = 0; j < width; j++)
        newGrid.push({
          id: j + "-" + i,
          isMined: arrayMines.includes([i, j]),
          x: j,
          y: i,
        });

    setGrid(newGrid);
  };

  const setNumMinas = () => {
    return selectedLevel === "3"
      ? NUM_MINAS_AVANCADO
      : selectedLevel === "2"
      ? NUM_MINAS_INTERMEDIO
      : NUM_MINAS_BEGINNER;
  };

  return (
    <div id="container">
      <Header />
      <ControlPanel
        gameStarted={gameStarted}
        onGameStart={handleGameStart}
        selectedLevel={selectedLevel}
        onSelectedLevel={handleLevelChange}
      />
      <GamePanel
        selectedLevel={selectedLevel}
        gameStarted={gameStarted}
        grid={grid}
        onGameOver={handleGameOver}
        mineCount={mineCount}
        onMineCount={handleMineCount}
      />
      <Footer />
    </div>
  );
}

function setMines(width, height, numMines) {
  let arrayMines = [];
  while (numMines >= 0) {
    let newMine = [
      Math.floor(Math.random() * width),
      Math.floor(Math.random() * height),
    ];
    numMines--;
  }
}

export default App;
