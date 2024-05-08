import "./cell.css";
import React, { useState } from "react";

function Cell(props) {
  const [isMined, setMined] = useState(false);
  const [isFlagged, setFlagged] = useState("");
  const [isRevealed, setRevealed] = useState(false);
  //! The cards still have the class "revealed" or "flaggd" upon new creation

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
    if (e.type === "click") {
      if (isFlagged !== "flagged" && isFlagged !== "possible")
        if (!isMined) handleSetRevealed();
    } else if (e.type === "contextmenu") {
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
