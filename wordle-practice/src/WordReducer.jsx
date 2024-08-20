import { useReducer } from "react";


// const initialState = {
    // alphabet: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J",
    //             "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T",
    //             "U", "V", "W", "X", "Y", "Z"],
//     wrongGuess: [],
//     rightGuess: []
// };

// const initialState = {
//     grid: Array(6).fill().map(()=>Array(5).fill({value:'', status:letterStatus.idle})),
//     alphabet: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J",
//         "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T",
//         "U", "V", "W", "X", "Y", "Z"],
//     currentGuess: 0,
//     guess: [],
//     answer: "APPLE",
// }

// const letterStatus = {
//     idle: "idle", 
//     wrong: "wrong",
//     correct: "correct",
//     guess: "guess"
// };

// const colorMap = {
//     [letterStatus.idle]: "bg-slate-300", 
//     [letterStatus.wrong]: "bg-lime-500",
//     [letterStatus.correct]: "bg-amber-400",
//     [letterStatus.guess]: "border-solid border-2 border-amber-400"
// };


function WordReducer (state, action){
    switch(action.type){

        //互動行為
        case "inputLetter":
            return{}
        case "deleteLetter":
            return{}
        case "submitGuess":
            return{
                //判斷單字是否在清單中
                //正確: 判斷
            }
        case "resetGame":
            return{}

        default:
            return state
    }

}
export const WordSheet = () => {
    const [state, dispatch] = useReducer(WordReducer, action) 

    return (
        <>
        </>
    )
};
