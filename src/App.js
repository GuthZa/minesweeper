import "./assets/styles/App.css";
import { React, useState } from "react";
import {
  GamePanel,
  ControlPanel,
  Header,
  Footer,
  GameOverModal,
} from "./components";

let timerId;

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState("0");
  const [isGameOverModalOpen, setIsGameOverModalClose] = useState(false);

  const handleGameStart = () => {
    setGameStarted(!gameStarted);
  };

  const handleGameOverModalClose = () => {
    setIsGameOverModalClose(false);
    setGameStarted(false);
  };

  const handleGameOver = () => {
    setIsGameOverModalClose(true);
    clearInterval(timerId);
  };

  const handleLevelChange = (ele) => setSelectedLevel(ele.currentTarget.value);

  const handleTimer = (id) => {
    timerId = id;
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
        onTimer={handleTimer}
      />
      <GameOverModal
        isOpen={isGameOverModalOpen}
        handleClose={handleGameOverModalClose}
      />
      <Footer />
    </div>
  );
}
export default App;
