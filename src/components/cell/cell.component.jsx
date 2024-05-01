import "./cell.css";
import React from "react";

function Cell(props) {
  const { isFlagged, isMined, isHidden, onClick } = props;

  // const className =
  //   "cell" +
  //   (isMined ? " mina" : "") +
  //   (isFlagged ? " bandeira" : "") +
  //   (isHidden ? " hidden" : "");

  return (
    <div
      className={`cell ${isHidden ? "hidden" : ""}`}
      onClick={onClick}
      onContextMenu={onClick}>
      {isFlagged ? "🚩" : ""}
    </div>
  );
}

export default Cell;
