import "./assets/styles/App.css";
import { React, useState } from "react";
import { GamePanel, ControlPanel, Header, Footer } from "./components";

function App() {
  const [gameStarted, setGameStarted] = useState(false);

  const handleGameStart = () => setGameStarted(!gameStarted);

  return (
    <div id="container">
      <Header />
      <ControlPanel gameStarted={gameStarted} onGameStart={handleGameStart} />
      <GamePanel />
      <Footer />
    </div>
  );
}

export default App;
