import React from "react";
import { useRef, useEffect } from "react";
import "./game-over-modal.css";

function GameOverModal({ isOpen, points, handleClose }) {
  const ref = useRef();
  useEffect(() => {
    if (isOpen) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [isOpen]);

  return (
    <dialog id="modal-gameOver" ref={ref} onCancel={handleClose}>
      <div className="estilos">
        <header>
          <span
            className="closeModal"
            data-modalid="gameOver"
            onClick={handleClose}
          >
            &times;
          </span>
          <div>Jogo Terminado</div>
        </header>
        <div className="info" id="messageGameOver">
          <p>Pontuação: {points}</p>
        </div>
        {/* <div className="info" id="nickname">
          Nick Name:
          <input
            type="text"
            id="inputNick"
            size="16"
            placeholder="Introduza seu Nick"
          />
          <button id="okTop">ok</button>
        </div> */}
        <footer>
          <p>
            <em>© Linguagens Script @ DEIS - ISEC</em>
          </p>
        </footer>
      </div>
    </dialog>
  );
}

export default GameOverModal;
