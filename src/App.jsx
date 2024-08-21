import "./App.css";
import PropTypes from "prop-types";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

import { useEffect, useReducer } from "react";
import { initialState, wordReducer } from "./WordReducer";
import { colorStatus } from "./constants/constant";

function App() {
  const [state, dispatch] = useReducer(wordReducer, initialState);

  const setAnswer = (answer) => {
    dispatch({ type: "SET_ANSWER", answer });
  };

  const handleRestart = () => {
    dispatch({ type: "RESET" });
    getAnswer().then((answer) => {
      console.log("設定答案 =", answer);
      setAnswer(answer);
    });
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      const { key } = e;
      if (key.length === 1 && /^[A-Z]$/i.test(key) && state.gameStatus === 0) {
        dispatch({ type: "INPUT_LETTER", letter: key.toUpperCase() });
      } else if (key === "Backspace" && state.gameStatus === 0) {
        dispatch({ type: "DELETE_LETTER" });
      } else if (key === "Enter" && state.gameStatus === 0) {
        dispatch({ type: "SUBMIT_GUESS" });
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [state.gameStatus]);

  useEffect(() => {
    getAnswer().then((answer) => {
      console.log("設定答案 =", answer);
      setAnswer(answer);
    });
  }, []);

  return (
    <>
      <Grid className="text-3xl" grid={state.grid} statusGrid={state.statusGrid} />
      {state.gameStatus !== 0 && (
        <div className="absolute flex flex-col gap-6 justify-center	align-center top-0 w-full	h-full backdrop-grayscale-0 bg-black/60 ...">
          <div className=" game-font self-stretch text-8xl text-white">Game Over</div>

          <div className="game-font text-4xl text-white">
            {state.gameStatus === 2 ? "Maybe Try Again" : "You Win!🎉🎉"}
          </div>
          <button
            onClick={handleRestart}
            className=" game-font mx-auto	 w-24 h-11 text-xl text-black border-slate-500 bg-white rounded-xl"
          >
            Retry
          </button>
        </div>
      )}
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

const Cell = ({ value, status }) => <div className={colorStatus[status]}>{value}</div>;
Cell.propTypes = {
  value: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

const getAnswer = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "answers"));
    const answerArray = [];
    querySnapshot.forEach((doc) => {
      answerArray.push(doc.data().answer);
    });
    const TodayAnswer = answerArray[Math.floor(Math.random() * answerArray.length)];
    return TodayAnswer.toUpperCase();
  } catch (e) {
    console.error("Error getting document:", e);
  }
};

export default App;
