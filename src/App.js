import "./assets/styles/App.css";
import { React, useState } from "react";
import { GamePanel, ControlPanel, Header, Footer } from "./components";

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  //Selected Level
  //1 - Beginner - 9x9 10mines
  //2 - Intermediate - 16x16 40mines
  //3 - Advanced - 30x16 99mines
  const [selectedLevel, setSelectedLevel] = useState("0");

  const handleGameStart = () => setGameStarted(!gameStarted);

  const handleGameOver = () => setGameStarted(false);

  const handleLevelChange = (ele) => setSelectedLevel(ele.currentTarget.value);

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
