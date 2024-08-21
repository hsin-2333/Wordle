import { ACTIONS } from "./Actions";
import { letterStatus } from "./constants/constant";

export const initialState = {
  grid: Array(6)
    .fill()
    .map(() => Array(5).fill("")),
  statusGrid: Array(6)
    .fill()
    .map(() => Array(5).fill(letterStatus.idle)),
  currentRow: 0,
  currentCol: 0,
  answer: "",
  gameStatus: 0, //0: playing, 1: win, 2: lose
};

export const wordReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.INPUT_LETTER: {
      const updatedGrid = JSON.parse(JSON.stringify(state.grid));
      const { currentRow, currentCol } = state;

      if (updatedGrid[currentRow].every((letter) => letter !== "")) {
        return state;
      }

      const newCol = currentCol + 1;
      const newRow = newCol === 0 && currentRow < updatedGrid.length - 1 ? currentRow + 1 : currentRow;

      if (currentCol < updatedGrid[currentRow].length) {
        updatedGrid[currentRow][currentCol] = action.letter;
      }
      return {
        ...state,
        grid: updatedGrid,
        currentRow: newRow,
        currentCol: newCol,
      };
    }
    case ACTIONS.DELETE_LETTER: {
      const updatedGrid = JSON.parse(JSON.stringify(state.grid));
      const { currentRow } = state;
      let lastFilledCol = -1;
      for (let i = 0; i < updatedGrid[currentRow].length; i++) {
        if (updatedGrid[currentRow][i] !== "") {
          lastFilledCol = i;
        }
      }
      if (lastFilledCol != -1) {
        updatedGrid[currentRow][lastFilledCol] = "";
      }

      const newCol = lastFilledCol > 0 ? lastFilledCol : 0;
      return {
        ...state,
        grid: updatedGrid,
        currentCol: newCol,
      };
    }
    case ACTIONS.SUBMIT_GUESS: {
      const updatedGrid = JSON.parse(JSON.stringify(state.grid));
      const updatedStatusGrid = JSON.parse(JSON.stringify(state.statusGrid));

      const { currentRow } = state;
      const answerArray = state.answer.split("");
      if (updatedGrid[currentRow].every((letter) => letter !== "")) {
        const newStatusGrid = updatedStatusGrid.map((row, rowIndex) => {
          if (rowIndex === currentRow) {
            return updatedGrid[rowIndex].map((cell, colIndex) => {
              if (cell === answerArray[colIndex]) {
                return letterStatus.correct;
              } else if (answerArray.includes(cell)) {
                return letterStatus.correctLetter;
              }

              return letterStatus.wrong;
            });
          }
          return row;
        });
        const isCorrect = updatedGrid[currentRow].join("") === state.answer;
        if (isCorrect) {
          return {
            ...state,
            statusGrid: newStatusGrid,
            gameStatus: 1,
          };
        } else if (currentRow === updatedGrid.length - 1) {
          return {
            ...state,
            statusGrid: newStatusGrid,
            gameStatus: 2,
          };
        }
        return {
          ...state,
          statusGrid: newStatusGrid,
          currentRow: currentRow + 1,
          currentCol: 0,
        };
      }
      return state;
    }
    case ACTIONS.RESET: {
      return {
        ...state,
        grid: Array(6)
          .fill()
          .map(() => Array(5).fill("")),
        statusGrid: Array(6)
          .fill()
          .map(() => Array(5).fill(letterStatus.idle)),
        currentRow: 0,
        currentCol: 0,
        gameStatus: 0,
      };
    }
    case ACTIONS.SET_ANSWER: {
      return {
        ...state,
        answer: action.answer,
      };
    }
    default:
      return state;
  }
};
