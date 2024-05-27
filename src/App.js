import "./assets/styles/App.css";
import { React, useState } from "react";
import { GamePanel, ControlPanel, Header, Footer } from "./components";

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState("0");
  const [grid, setGrid] = useState([]);
  const [mineCount, setMineCount] = useState(0);

  const handleGameStart = () => setGameStarted(!gameStarted);

  const handleGameOver = () => setGameStarted(false);

  const handleLevelChange = (ele) => {
    let value = ele.currentTarget.value;
    setSelectedLevel(value);
    handleGrid(value);
    setMineCount(numMinesOnLevel(selectedLevel));
  };

  const handleMineCount = (isToRemoveMine) => {
    setMineCount((previousValue) =>
      isToRemoveMine ? previousValue - 1 : previousValue + 1
    );
  };

  const handleGrid = (level) => {
    const newGrid = [];
    let maxMinas = numMinesOnLevel(level);
    let [width, height] = boardSize(level);

    for (let i = 0, currentMinas = 0; i < height * width; i++, currentMinas++)
      newGrid.push(new BoardCell(currentMinas <= maxMinas));
    let shuffledArray = shuffleArray(newGrid);

    setGrid(shuffledArray);
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
        onGameOver={handleGameOver}
      />
      <Footer />
    </div>
  );
}

export default App;
