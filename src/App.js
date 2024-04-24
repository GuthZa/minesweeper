import "./assets/styles/App.css";
import { React, useState } from "react";
import { GamePanel, ControlPanel, Header, Footer } from "./components";

function App() {
  return (
    <div id="container">
      <Header />
      <ControlPanel />
      <GamePanel />
      <Footer />
    </div>
  );
}

export default App;
