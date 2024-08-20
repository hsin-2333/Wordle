import { useReducer } from "react";
import { ACTIONS } from "./Actions";

export const WordReducer = (state, action) => {
  switch (action.type) {
    //互動行為
    case ACTIONS.INPUT_LETTER: {
      //   const updatedGrid = [...state.grid];
      const updatedGrid = JSON.parse(JSON.stringify(state.grid));
      const { currentRow, currentCol } = state;

      if (updatedGrid[currentRow].every((letter) => letter !== "")) {
        return {
          ...state,
        };
      } else {
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
    }
    case ACTIONS.DELETE_LETTER: {
      //   const updatedGrid = [...state.grid];
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
    default:
      return state;
  }
};
