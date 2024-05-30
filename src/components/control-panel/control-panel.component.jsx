import "./control-panel.css";
import React from "react";

function ControlPanel(props) {
  const { gameStarted, onGameStart, selectedLevel, onSelectedLevel } = props;

  return (
    <section id="panel-control">
      <h3>Choose the Level!</h3>
      <form className="form">
        <fieldset className="form-group">
          <label>Level: </label>
          <select
            id="btLevel"
            disabled={gameStarted}
            onChange={onSelectedLevel}>
            <option defaultValue="0" value="0">
              Choose the level ...
            </option>
            <option value="1">Basic (9x9) - 10 mines</option>
            <option value="2">Intermediate (16x16) - 40 mines</option>
            <option value="3">Advanced (30x16) - 99 mines</option>
          </select>
        </fieldset>
        <button
          type="button"
          id="btPlay"
          disabled={selectedLevel === "0"}
          onClick={onGameStart}>
          {gameStarted ? "End Game" : "Start Game"}
        </button>
      </form>
    </section>
  );
}

export default ControlPanel;
