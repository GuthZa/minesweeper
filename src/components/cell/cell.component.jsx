import "./cell.css";
import React, { useEffect, useState } from "react";

function Cell(props) {
  const {
    isMined,
    grid,
    numMines,
    onGameOver,
    onMineCount,
    gameStarted,
  } = props;
  const [isFlag, setFlag] = useState("");
  const [isRevealed, setRevealed] = useState(false);

  const handleSetCellRevealed = () => (!isRevealed ? setRevealed(true) : "");

  //Clears the board to a new state
  useEffect(() => {
    setFlag("");
    setRevealed(false);
  }, [grid]);

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

    if (!gameStarted) return;

    if (e.type === "click" && isFlag === "") {
      handleSetCellRevealed();
      if (isMined && !isRevealed) onGameOver();
    } else if (e.type === "contextmenu" && !isRevealed) {
      handleSetFlag();
    }
  };

  let cellText = "";

  if (isFlag === "flagged") cellText = "🚩";
  else if (isFlag === "possible") cellText = "?";
  else if (!isRevealed) {
    if (numMines !== 0) cellText = numMines;
    if (isMined) cellText = "💣";
  }

  const hiddenClass = isRevealed ? "" : "hidden";
  const mineClass = isMined ? "mined" : "";

  return (
    <div
      className={`cell unselectable ${hiddenClass} ${mineClass}`}
      onClick={handleOnClick}
      onContextMenu={handleOnClick}>
      {cellText}
    </div>
  );
}

export default Cell;
