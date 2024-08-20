import "./App.css";
import React, { useEffect, useReducer } from "react";
import { WordReducer } from "./WordReducer";

function App() {
  const [state, dispatch] = useReducer(WordReducer, initialState);
  const handleKeyDown = (e) => {
    const { key } = e;
    if (key.length === 1 && /^[A-Z]$/i.test(key)) {
      dispatch({ type: "INPUT_LETTER", letter: key.toUpperCase() });
    } else if (key === "Backspace") {
      dispatch({ type: "DELETE_LETTER" });
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

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

const Cell = ({ value, status }) => <div className={`cell ${colorStatus[status]}`}>{value}</div>;

const letterStatus = {
  idle: "idle",
  typing: "typing",
  wrong: "wrong",
  correct: "correct",
  guess: "guess",
};

const colorStatus = {
  [letterStatus.idle]: " w-14 h-14 border-2 border-slate-300 bg-white text-3xl	font-black leading-14",
  [letterStatus.typing]: "w-14 h-14 border-2 border-slate-500 bg-white text-3xl	font-black leading-14 text-black	",
  [letterStatus.wrong]: "w-14 h-14 bg-zinc-500	text-3xl font-black leading-14 text-white		",
  [letterStatus.correct]: "w-14 h-14 bg-lime-500	text-3xl font-black leading-14 text-white	",
  [letterStatus.correctLetter]: "w-14 h-14  bg-yellow-400	text-3xl font-black leading-14 text-white	",
};

const initialState = {
  grid: Array(6)
    .fill()
    .map(() => Array(5).fill("")), // 只存 value
  statusGrid: Array(6)
    .fill()
    .map(() => Array(5).fill(letterStatus.idle)), // 存 status
  currentRow: 0,
  currentCol: 0,
  answer: "APPLE",
};

export default App;
