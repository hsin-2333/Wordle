import { ACTION } from "./constants/ACTION";
import { LETTER } from "./constants/LETTER";
import { GAME_STATUS } from "./constants/GAME_STATUS";

export const initialState = {
  grid: Array(6)
    .fill()
    .map(() => Array(5).fill("")),
  statusGrid: Array(6)
    .fill()
    .map(() => Array(5).fill(LETTER.IDLE)),
  currentRow: 0,
  currentCol: 0,
  answer: "",
  gameStatus: GAME_STATUS.PLAYING,
};

export const wordReducer = (state, action) => {
  switch (action.type) {
    case ACTION.INPUT_LETTER: {
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
    case ACTION.DELETE_LETTER: {
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
    case ACTION.SUBMIT_GUESS: {
      const updatedGrid = JSON.parse(JSON.stringify(state.grid));
      const updatedStatusGrid = JSON.parse(JSON.stringify(state.statusGrid));

      const { currentRow } = state;
      const answerArray = state.answer.split("");
      if (updatedGrid[currentRow].every((letter) => letter !== "")) {
        const newStatusGrid = updatedStatusGrid.map((row, rowIndex) => {
          if (rowIndex === currentRow) {
            return updatedGrid[rowIndex].map((cell, colIndex) => {
              if (cell === answerArray[colIndex]) {
                return LETTER.CORRECT;
              } else if (answerArray.includes(cell)) {
                return LETTER.CORRECT_LETTER;
              }

              return LETTER.WRONG;
            });
          }
          return row;
        });
        const isCORRECT = updatedGrid[currentRow].join("") === state.answer;
        if (isCORRECT) {
          return {
            ...state,
            statusGrid: newStatusGrid,
            gameStatus: GAME_STATUS.WIN,
          };
        } else if (currentRow === updatedGrid.length - 1) {
          return {
            ...state,
            statusGrid: newStatusGrid,
            gameStatus: GAME_STATUS.LOSE,
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
    case ACTION.RESET: {
      return {
        ...state,
        grid: Array(6)
          .fill()
          .map(() => Array(5).fill("")),
        statusGrid: Array(6)
          .fill()
          .map(() => Array(5).fill(LETTER.IDLE)),
        currentRow: 0,
        currentCol: 0,
        gameStatus: GAME_STATUS.PLAYING,
      };
    }
    case ACTION.SET_ANSWER: {
      return {
        ...state,
        answer: action.answer,
      };
    }
    default:
      return state;
  }
};
