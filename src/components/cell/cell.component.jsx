import "./cell.css";
import React, { useState } from "react";

function Cell(props) {
  const { isMined, x, y, checkNeighbors, onGameOver, onMineCount } = props;
  const [isFlagged, setFlagged] = useState("");
  const [mineCount, setMineCount] = useState(0);
  const [isRevealed, setRevealed] = useState(false);

  const handleSetRevealed = () => (!isRevealed ? setRevealed(true) : "");

  const handleMineCount = (value) => setMineCount(value);

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
    if (e.type === "click" && isFlagged === "") {
      if (isMined && !isRevealed) {
        onMineCount("-");
        //! remover quando minas estiver com numero correto
        // onGameOver();
      }
      handleSetRevealed();
      handleMineCount(checkNeighbors(x, y));
    } else if (e.type === "contextmenu" && !isRevealed) {
      handleSetFlagged();
    }
  };

  const setCellText =
    isFlagged === "flagged"
      ? "🚩"
      : isFlagged === "possible"
      ? "?"
      : mineCount !== 0
      ? mineCount
      : "";

  const hiddenClass = isRevealed ? "" : "hidden";

  return (
    <div
      className={`cell unselectable ${hiddenClass}`}
      onClick={handleOnClick}
      onContextMenu={handleOnClick}>
      {setCellText}
    </div>
  );
}

export default Cell;
