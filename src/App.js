import "./App.css";
import React from "react";
import { GamePanel, ControlPanel } from "./components";

function App() {
  return (
    <div className="App">
      <ControlPanel />
      <GamePanel />
    </div>
  );
}

export default App;
