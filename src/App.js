import "./assets/styles/App.css";
import shuffleArray from "./helpers/shuffle";
import { React, useState } from "react";
import { GamePanel, ControlPanel, Header, Footer } from "./components";
import {
  NUM_MINAS_AVANCADO,
  NUM_MINAS_BEGINNER,
  NUM_MINAS_INTERMEDIO,
} from "./constants";

let height, width;

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState("0");
  const [grid, setGrid] = useState([]);
  const [mineCount, setMineCount] = useState(0);

  const handleGameStart = () => {
    setGameStarted(!gameStarted);
    handleGrid(selectedLevel);
    setMineCount(setNumMinas(selectedLevel));
  };

  const handleGameOver = () => {
    setGameStarted(false);
  };

  const handleLevelChange = (ele) => {
    let value = ele.currentTarget.value;
    setSelectedLevel(value);
    handleGrid(value);
    setMineCount(setNumMinas(selectedLevel));
  };

  const handleMineCount = (isToRemoveMine) => {
    if (isToRemoveMine && mineCount > 0) {
      setMineCount((previousValue) => previousValue - 1);
    } else {
      setMineCount((previousValue) => previousValue + 1);
    }
  };

  const handleGrid = (level) => {
    height = level === "3" ? 30 : level === "2" ? 16 : 9;
    width = level === "3" || level === "2" ? 16 : 9;
    const newGrid = [];
    let maxMinas = setNumMinas(level);

    let isMine;
    for (let i = 0, currentMinas = 0; i < height * width; i++, currentMinas++) {
      isMine = currentMinas <= maxMinas ? true : false;
      newGrid.push(new BoardCell(isMine, false));
    }
    let shuffledArray = shuffleArray(newGrid);

    setGrid(shuffledArray);
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

class BoardCell {
  constructor(mined, flagged) {
    this.isMined = mined;
    this.isFlagged = flagged;
  }
}

export default App;
