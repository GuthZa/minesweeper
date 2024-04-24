import React from "react";
import { CELLIMAGE } from "../../constants";

function Cell() {
  return (
    <div className="cell">
      <img src={CELLIMAGE} alt="" />
    </div>
  );
}

export default Cell;
