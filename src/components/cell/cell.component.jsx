import "./cell.css";
import React, { useState } from "react";

function Cell(props) {
  const [isMined, setMined] = useState(false);
  const [isFlagged, setFlagged] = useState("");
  const [isRevealed, setRevealed] = useState(false);

  const handlesetRevealed = () => (!isRevealed ? setRevealed(true) : "");
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
    if (e.type === "click") {
      handlesetRevealed();
    } else if (e.type === "contextmenu") {
      handleSetFlagged();
    }
  };

  const hiddenClass = isRevealed ? "" : "hidden";

  return (
    <div
      className={`cell ${hiddenClass}`}
      onClick={handleOnClick}
      onContextMenu={handleOnClick}>
      {isFlagged === "flagged" ? "🚩" : isFlagged === "possible" ? "?" : ""}
    </div>
  );
}

function handleRightClick() {}

export default Cell;
