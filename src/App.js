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
    handleMineCount("=", setNumMinas(selectedLevel));
  };

  const handleGameOver = () => {
    setGameStarted(false);
  };

  const handleLevelChange = (ele) => {
    let value = ele.currentTarget.value;
    setSelectedLevel(value);
    handleGrid(value);
    handleMineCount("=", setNumMinas(value));
  };

  const handleMineCount = (ope, value = 1) => {
    switch (ope) {
      case "-":
        setMineCount(mineCount - value);
        break;
      case "+":
        setMineCount(mineCount + value);
        break;
      default:
        setMineCount(value);
    }
  };

  const handleGrid = (level) => {
    let height = level === "3" ? 30 : level === "2" ? 16 : 9;
    let width = level === "3" || level === "2" ? 16 : 9;
    const newGrid = [];

    let mineChance = (height * width) / mineCount;

    for (let i = 0, k = 0; i < height; i++)
      for (let j = 0; j < width; j++, k++)
        newGrid.push({ id: k, isMined: true, x: j, y: i });

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
    
  }
}

export default App;
