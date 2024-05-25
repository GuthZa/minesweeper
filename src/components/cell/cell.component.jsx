import "./cell.css";
import React, { useState } from "react";

function Cell(props) {
  const {
    isMined,
    x,
    y,
    checkNeighborsHaveMines,
    onGameOver,
    onMineCount,
    gameStarted,
  } = props;
  const [isFlag, setFlag] = useState("");
  const [isRevealed, setRevealed] = useState(false);
  const [numMines, setNumMines] = useState(0);

  const handleSetCellRevealed = () => (!isRevealed ? setRevealed(true) : "");

  const handleSetNumberOfMines = (value) => setNumMines(value);

  // const handleGameStarted = () => {
  //   if (gameStarted) {
  //     setFlag("");
  //     setRevealed(false);

  //   }
  // };

  const handleSetFlag = () => {
    if (isFlag === "") {
      setFlag("flagged");
      onMineCount(true);
    } else if (isFlag === "flagged") {
      setFlag("possible");
    } else {
      setFlag("");
      onMineCount(false);
    }
  };

  const handleOnClick = (e) => {
    //Stops the browser from opening the default window
    e.preventDefault();
    console.log(x + " " + y);

    if (!gameStarted) return;

    if (e.type === "click" && isFlag === "") {
      if (isMined && !isRevealed) {
        //! remover quando minas estiver com numero correto
        // onGameOver();
      }
      handleSetCellRevealed();
      handleSetNumberOfMines(checkNeighborsHaveMines(x, y));
    } else if (e.type === "contextmenu" && !isRevealed) {
      handleSetFlag();
    }
  };

  const cellText =
    isFlag === "flagged"
      ? "🚩"
      : isFlag === "possible"
      ? "?"
      : numMines !== 0
      ? numMines
      : "";

  const hiddenClass = isRevealed ? "" : "hidden";

  return (
    <div
      className={`cell unselectable ${hiddenClass}`}
      onClick={handleOnClick}
      onContextMenu={handleOnClick}>
      {cellText}
    </div>
  );
}

export default Cell;
