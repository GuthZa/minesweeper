import "./cell.css";
import React from "react";

function Cell(props) {
  const { isFlagged, isMined, isHidden, onClick } = props;

  const className =
    "cell" +
    (isMined ? " mina" : "") +
    (isFlagged ? " bandeira" : "") +
    (isHidden ? " hidden" : "");

  return (
    <div className={className} onClick={onClick} onContextMenu={onClick}></div>
  );
}

export default Cell;
