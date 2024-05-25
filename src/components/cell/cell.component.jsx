import "./cell.css";
import React, { useEffect, useState } from "react";

let cellText = "";

function Cell(props) {
  const {
    isMined,
    grid,
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

  //Clears the board to a new state
  useEffect(() => {
    setFlag("");
    setRevealed(false);
  }, [grid]);

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

    if (!gameStarted) return;

    if (e.type === "click" && isFlag === "") {
      handleSetCellRevealed();
      if (isMined && !isRevealed) {
        console.log("isMine");
        onGameOver();
      }
      // handleSetNumberOfMines(checkNeighborsHaveMines(x, y));
    } else if (e.type === "contextmenu" && !isRevealed) {
      handleSetFlag();
    }
  };

  let cellText = "";

  if (isFlag === "flagged") cellText = "🚩";
  if (isFlag === "possible") cellText = "?";
  if (numMines !== 0) cellText = numMines;
  if (isMined && isRevealed) cellText = "💣";

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
