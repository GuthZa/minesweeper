import "./game-panel.css";
import React, { useState } from "react";
import { Cell } from "../index";

let mineCount;

function GamePanel(props) {
  const { selectedLevel, gameStarted } = props;

  const [isMined, setMined] = useState(false);
  const [isFlagged, setFlagged] = useState(false);
  const [isHidden, setHidden] = useState(true);

  const handleSetHidden = (e) =>
    e.target.className.includes("hidden") ? setHidden(false) : " ";
  const handleSetFlagged = (e) => setFlagged(true);
  const handleSetMined = (e) => console.log("to implement");

  if (!gameStarted)
    mineCount = selectedLevel === "3" ? 99 : selectedLevel === "2" ? 40 : 10;

  const handleOnClick = (e) => {
    //Stops the browser from opening the default window
    e.preventDefault();
    mineCount--;
    if (e.type === "click") {
      handleSetHidden(e);
    } else if (e.type === "contextmenu") {
      handleSetFlagged();
    }
  };

  const grid = [];
  let k = 0;
  let altura = selectedLevel === "3" ? 30 : selectedLevel === "2" ? 16 : 9;
  let largura = selectedLevel === "3" || selectedLevel === "2" ? 16 : 9;
  for (let i = 0; i < altura; i++) {
    for (let j = 0; j < largura; j++) {
      grid.push(
        <Cell
          key={k++}
          isHidden={isHidden}
          isMined={isMined}
          isFlagged={isFlagged}
          onClick={handleOnClick}
        />
      );
    }
  }

  let className =
    selectedLevel === "2"
      ? "intermedio"
      : selectedLevel === "3"
      ? "avancado"
      : "iniciante";

  return (
    <div className="board">
      <div className="mines-count">Mines: {mineCount}</div>
      <div className={`gamePanel ${className}`}>{grid}</div>
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
