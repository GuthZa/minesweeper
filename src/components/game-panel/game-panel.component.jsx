import "./game-panel.css";
import { Timer, Cell } from "../index";

let time = 0;

function GamePanel(props) {
  const {
    selectedLevel,
    gameStarted,
    onGameOver,
    grid,
    mineCount,
    onMineCount,
  } = props;

  const handleTimer = (t) => {
    time = t;
  };

  const checkNeighborsHaveMines = (cell) => {
    // console.log("to implent");
    // let width = selectedLevel === "3" ? 30 : selectedLevel === "2" ? 16 : 9;
    // let arrayPosition = y * width + x;
    // let value = grid.filter((ele) => isAdjacentAndMined(cell, ele)).length;
    console.log(cell);
    // return value;
  };

  const isAdjacentAndMined = (cell, ele) => {
    let value =
      Math.abs(cell.x - ele.x) <= 1 &&
      Math.abs(cell.y - ele.y) <= 1 &&
      !(cell.x === ele.x && cell.y === ele.y) &&
      ele.isMined;
    return value;
  };

  let nivel =
    selectedLevel === "2"
      ? "intermedio"
      : selectedLevel === "3"
      ? "avancado"
      : "iniciante";

  useEffect(() => {
    // if (mineCount === 0) onGameOver();
  }, [grid, gameStarted, onGameOver]);

  return (
    <div className="board" onContextMenu={(e) => e.preventDefault()}>
      <div className="info">
        <div className="mines-count">Mines: {mineCount}</div>
        <div className="timer">
          Time:
          {gameStarted && <Timer onTimer={handleTimer} />}
          {!gameStarted && time}
        </div>
      </div>
      <div className={`gamePanel ${nivel}`}>
        {grid.map((cell, index) => (
          <Cell
            key={index}
            grid={grid}
            isMined={cell.isMined}
            checkNeighborsHaveMines={checkNeighborsHaveMines}
            onGameOver={onGameOver}
            onMineCount={onMineCount}
            gameStarted={gameStarted}
          />
        ))}
      </div>
    </div>
  );
}

export default GamePanel;
