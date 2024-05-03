import "./game-panel.css";
import React from "react";
import { Cell } from "../index";

let mineCount;

function GamePanel(props) {
  const { selectedLevel, gameStarted } = props;

  if (!gameStarted)
    mineCount = selectedLevel === "3" ? 99 : selectedLevel === "2" ? 40 : 10;

  const grid = [];
  let k = 0;
  let altura = selectedLevel === "3" ? 30 : selectedLevel === "2" ? 16 : 9;
  let largura = selectedLevel === "3" || selectedLevel === "2" ? 16 : 9;
  for (let i = 0; i < altura * largura; i++) {
    grid.push(<Cell key={k++} />);
  }

  let nivel =
    selectedLevel === "2"
      ? "intermedio"
      : selectedLevel === "3"
      ? "avancado"
      : "iniciante";

  return (
    <div className="board">
      <div className="mines-count">Mines: {mineCount}</div>
      <div className={`gamePanel ${nivel}`}>{grid}</div>
    </div>
  );
}

//TODO Change functions bellow to create mines, or remove them

//Creates an array on mines where:  saved as x,y,x,y...
//Odd numbers - x
//Even numbers - y
function setMines(numMinas, altura, largura) {
  let rows = [<Cell />, <Cell />, <Cell />, <Cell />, <Cell />];
  rows.forEach((cell) => {
    console.log(cell.mina);
  });
  // for (let i = 0; i < numMinas - 1; i++) {
  //   let current = rows[x][y];
  //   let mina = randomCell(altura, largura);
  // }
}

function randomCell(min, max) {
  let a = Math.floor(Math.random() * (max - min + 1)) + min;
  let l = Math.floor(Math.random() * (max - min + 1)) + min;
  return [a, l];
}

export default GamePanel;
