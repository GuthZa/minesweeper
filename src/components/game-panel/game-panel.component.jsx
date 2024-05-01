import React, { useState } from "react";
import { Cell } from "../index";
import { ALTURA_BASE, LARGURA_BASE } from "../../constants";

import "./game-panel.css";

function GamePanel() {
  const [isMined, setIsMined] = useState(false);
  const [isFlagged, setIsFlagged] = useState("");

  const handleOnClick = () => {
    console.log("clicked");
  };

  return (
    <div className="gamePanel">
      <Cell isMined={isMined} isFlagged={isFlagged} onClick={handleOnClick} />
      <Cell isMined={isMined} isFlagged={isFlagged} onClick={handleOnClick} />
      <Cell isMined={isMined} isFlagged={isFlagged} onClick={handleOnClick} />
      <Cell isMined={isMined} isFlagged={isFlagged} onClick={handleOnClick} />
      <Cell isMined={isMined} isFlagged={isFlagged} onClick={handleOnClick} />
    </div>
  );
}

function addCells(altura = ALTURA_BASE, largura = LARGURA_BASE) {
  let grid = [];
  for (let i = 0; i < altura; i++) {
    for (let j = 0; j < largura; j++) {
      grid.push(<Cell isFlagged="" />);
    }
  }
}

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
