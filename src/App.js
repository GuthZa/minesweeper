import "./assets/styles/App.css";
import { React, useState } from "react";
import { GamePanel, ControlPanel, Header, Footer, Cell } from "./components";

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState("0");
  const [grid, setGrid] = useState([]);

  const handleGameStart = () => {
    setGameStarted(!gameStarted);
    handleGrid(selectedLevel);
  };

  const gameOver = () => {
    setGameStarted(false);
  };

  const handleLevelChange = (ele) => {
    let value = ele.currentTarget.value;
    setSelectedLevel(value);
    handleGrid(value);
  };

  //  const [isMined, setMined] = useState(false);

  const handleGrid = (level) => {
    let k = 0;
    let altura = level === "3" ? 30 : level === "2" ? 16 : 9;
    let largura = level === "3" || level === "2" ? 16 : 9;
    const newGrid = [];
    for (let i = 0; i < altura * largura; i++, k++) {
      newGrid.push({ id: k, isMined: true });
    }
    setGrid(newGrid);
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
      />
      <Footer />
    </div>
  );
}

export default App;
