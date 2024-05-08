import "./cell.css";
import React, { useState } from "react";

function Cell(props) {
  const { isMined, x, y, checkNeighbors, onGameOver, onMineCount } = props;
  const [isFlagged, setFlagged] = useState("");
  const [isRevealed, setRevealed] = useState(false);
  const [numMines, setNumMines] = useState(0);

  const handleRevealed = () => (!isRevealed ? setRevealed(true) : "");

  const handleNumMines = (value) => setNumMines(value);

  const handleSetFlagged = () => {
    if (isFlagged === "") {
      setFlagged("flagged");
      onMineCount("-");
    } else if (isFlagged === "flagged") {
      setFlagged("possible");
    } else {
      setFlagged("");
      onMineCount("+");
    }
  };

  const handleOnClick = (e) => {
    //Stops the browser from opening the default window
    e.preventDefault();
    console.log(x + " " + y);
    if (e.type === "click" && isFlagged === "") {
      if (isMined && !isRevealed) {
        onMineCount("-");
        //! remover quando minas estiver com numero correto
        // onGameOver();
      }
      handleRevealed();
      handleNumMines(checkNeighbors(x, y));
    } else if (e.type === "contextmenu" && !isRevealed) {
      handleSetFlagged();
    }
  };

  const cellText =
    isFlagged === "flagged"
      ? "🚩"
      : isFlagged === "possible"
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
