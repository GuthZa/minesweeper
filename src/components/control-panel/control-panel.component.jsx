import "./control-panel.css";
import React from "react";

function ControlPanel(props) {
  const { gameStarted, onGameStart } = props;

  return (
    <section id="panel-control">
      <h3>Escolha do Nível</h3>
      <form className="form">
        <fieldset className="form-group">
          <label>Nível:</label>
          <select id="btLevel">
            <option defaultValue="0" value="0">
              Seleccione...
            </option>
            <option value="1">Básico (9x9) - 10 minas</option>
            <option value="2">Intermédio (16x16) - 40 minas</option>
            <option value="3">Avançado (30x16) - 99 minas</option>
          </select>
        </fieldset>
        <button type="button" id="btPlay" onClick={onGameStart}>
          {gameStarted ? "Terminar Jogo" : "Iniciar Jogo"}
        </button>
      </form>
    </section>
  );
}

export default ControlPanel;
