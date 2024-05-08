import { logDOM } from "@testing-library/react";
import "./cell.css";
import React, { useState } from "react";

function Cell(props) {
  const { gameStarted, isMined, x, y, checkNeighbors, onGameOver } = props;
  const [isFlagged, setFlagged] = useState("");
  const [isRevealed, setRevealed] = useState(false);
  //! The cards still have the class "revealed" or "flagged" upon new creation

  const handleSetRevealed = () => (!isRevealed ? setRevealed(true) : "");

  const handleSetFlagged = () => {
    let flag =
      isFlagged === "" ? "flagged" : isFlagged === "flagged" ? "possible" : "";
    setFlagged(flag);
  };
  const handleSetMined = (e) => console.log("to implement");

  const handleOnClick = (e) => {
    //Stops the browser from opening the default window
    e.preventDefault();
    // mineCount--;
    if (e.type === "click" && isFlagged === "") {
      if (checkNeighbors(x, y) === 0) handleSetRevealed();
      else onGameOver();
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
      {isFlagged === "flagged" ? "🚩" : isFlagged === "possible" ? "?" : ""}
    </div>
  );
}

export default Cell;
