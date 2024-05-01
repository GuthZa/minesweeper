import "./game-panel.css";
import React, { useState } from "react";
import { Cell } from "../index";
import { ALTURA_BASE, LARGURA_BASE } from "../../constants";

function GamePanel() {
  const [isMined, setIsMined] = useState(false);
  const [isFlagged, setIsFlagged] = useState("");

  const handleOnClick = (e) => {
    //Stops the browser from opening the default window
    e.preventDefault();
    if (e.type === "click") {
      console.log("Left click");
    } else if (e.type === "contextmenu") {
      console.log("Right click");
    }
  };

  const grid = [];
  let k = 0;
  for (let i = 0; i < ALTURA_BASE; i++) {
    for (let j = 0; j < LARGURA_BASE; j++) {
      grid.push(k++);
    }
  }

  return (
    <div className="board">
      <div className="mines-count">Mines: </div>
      <div className="gamePanel">
        {grid.map((cell) => (
          <Cell
            key={cell}
            isMined={isMined}
            isFlagged={isFlagged}
            onClick={handleOnClick}
          />
        ))}
      </div>
    </div>
  );
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
