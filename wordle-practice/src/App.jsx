import "./App.css";
import PropTypes from "prop-types";
import { useEffect, useReducer } from "react";
import { WordReducer } from "./WordReducer";
import { letterStatus, colorStatus } from "./constants/constant";

function App() {
  const [state, dispatch] = useReducer(WordReducer, initialState);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const { key } = e;
      if (key.length === 1 && /^[A-Z]$/i.test(key) && state.gameStatus === 0) {
        dispatch({ type: "INPUT_LETTER", letter: key.toUpperCase() });
      } else if (key === "Backspace") {
        dispatch({ type: "DELETE_LETTER" });
      } else if (key === "Enter") {
        dispatch({ type: "SUBMIT_GUESS" });
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [state.gameStatus]);

  return (
    <>
      <Grid className="text-3xl" grid={state.grid} statusGrid={state.statusGrid} />
    </>
  );
}

const Grid = ({ grid, statusGrid }) => {
  return (
    <div className="grid grid-cols-5 gap-3 w-80 h-96">
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Cell key={`${rowIndex}-${colIndex}`} status={statusGrid[rowIndex][colIndex]} value={cell}></Cell>
        ))
      )}
    </div>
  );
};
Grid.propTypes = {
  grid: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  statusGrid: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
};

const Cell = ({ value, status }) => <div className={`cell ${colorStatus[status]}`}>{value}</div>;
Cell.propTypes = {
  value: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

const initialState = {
  grid: Array(6)
    .fill()
    .map(() => Array(5).fill("")),
  statusGrid: Array(6)
    .fill()
    .map(() => Array(5).fill(letterStatus.idle)),
  currentRow: 0,
  currentCol: 0,
  answer: "APPLE",
  gameStatus: 0, //0: playing, 1: win, 2: lose
};

export default App;
