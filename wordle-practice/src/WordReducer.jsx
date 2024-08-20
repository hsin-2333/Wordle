import { useReducer } from "react";
import { ACTIONS } from "./Actions";

export const WordReducer = (state, action) => {
  switch (action.type) {
    //互動行為
    case ACTIONS.INPUT_LETTER: {
    //   const updatedGrid = [...state.grid];
    const updatedGrid = JSON.parse(JSON.stringify(state.grid));
      const { currentRow, currentCol } = state; //從state中提取currentRow和currentCol屬性

      if (updatedGrid[currentRow].every((letter) => letter !== "")) {
        console.log("currentRow", currentRow);
        console.log("滿了的currentCol", currentCol);
        return {
          ...state,
        };
      } else {
        // const newCol = (currentCol + 1) % updatedGrid[currentRow].length;
        const newCol = currentCol + 1;
        const newRow = newCol === 0 && currentRow < updatedGrid.length - 1 ? currentRow + 1 : currentRow;

        if (currentCol < updatedGrid[currentRow].length) {
            console.log("currentCol", currentCol);
            console.log("action.letter", action.letter);

          updatedGrid[currentRow][currentCol] = action.letter;
        }
        console.log("updatedGrid", updatedGrid);
        console.log("輸入的currentCol", currentCol);

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
      const updatedGrid =  JSON.parse(JSON.stringify(state.grid));
      const { currentRow } = state;
    //   console.log("刪除的currentCol", currentCol);
      //   let newCol = currentCol === 0 ? 0 : currentCol - 1;
      //   const newCol = currentCol > 0 ? currentCol - 1 : 0;
      //   updatedGrid[currentRow][currentCol] = "";
      //   console.log("刪除的newCol", newCol);

      let lastFilledCol = -1;
      for (let i = 0; i < updatedGrid[currentRow].length; i++) {
        if (updatedGrid[currentRow][i] !== "") {
          lastFilledCol = i;
        }
      }
      if(lastFilledCol != -1){
        console.log("lastFilledCol", lastFilledCol);
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
