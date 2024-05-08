import { logDOM } from "@testing-library/react";
import "./cell.css";
import React, { useState } from "react";

function Cell(props) {
  const {
    gameStarted,
    isMined,
    x,
    y,
    checkNeighbors,
    onGameOver,
    onMineCount,
  } = props;
  const [isFlagged, setFlagged] = useState("");
  const [mineCount, setMineCount] = useState(0);
  const [isRevealed, setRevealed] = useState(false);
  //! The cards still have the class "revealed" or "flagged" upon new creation

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
      //! remover quando minas estiver com numero correto if (isMined) onGameOver();
      if (isMined) onMineCount("-");
      handleSetRevealed();
      handleMineCount(checkNeighbors(x, y));
    } else if (e.type === "contextmenu" && !isRevealed) {
      handleSetFlagged();
    }
  };

  const hiddenClass = isRevealed ? "" : "hidden";

  return (
    <div
      className={`cell unselectable ${hiddenClass}`}
      onClick={handleOnClick}
      onContextMenu={handleOnClick}>
      {isFlagged === "flagged"
        ? "🚩"
        : isFlagged === "possible"
        ? "?"
        : mineCount !== 0
        ? mineCount
        : ""}
    </div>
  );
}

export default Cell;
