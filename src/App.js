import "./assets/styles/App.css";
import { React, useState } from "react";
import {
  GamePanel,
  ControlPanel,
  Header,
  Footer,
  GameOverModal,
} from "./components";

let timer = 0;
let timerId;

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState("0");
  const [isGameOverModalOpen, setIsGameOverModalClose] = useState(false);

  const handleGameStart = () => {
    setIsGameOverModalClose(false);
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

  const handleTimer = (t, id) => {
    timer = t;
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
        points={100}
      />
      <Footer />
    </div>
  );
}
export default App;
