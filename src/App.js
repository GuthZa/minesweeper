import "./assets/styles/App.css";
import { React, useState } from "react";
import { GamePanel, ControlPanel, Header, Footer } from "./components";

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState("0");

  const handleGameStart = () => setGameStarted(!gameStarted);
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
      <GamePanel selectedLevel={selectedLevel} gameStarted={gameStarted} />
      <Footer />
    </div>
  );
}

export default App;
