import "./cell.css";
import React from "react";

function Cell(props) {
  const { isFlagged, isMined, onClick } = props;

  let mina = isMined ? "mina" : "";
  let bandeira = isFlagged ? "bandeira" : "";
  return (
    <div
      className={`cell ${mina} ${bandeira}`}
      onClick={onClick}
      onContextMenu={onClick}></div>
  );
}

export default Cell;
