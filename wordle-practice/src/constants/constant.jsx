export const letterStatus = {
    idle: "idle",
    typing: "typing",
    wrong: "wrong",
    correct: "correct",
    correctLetter: "correctLetter",
  };
  
export const colorStatus = {
    [letterStatus.idle]: " w-14 h-14 border-2 border-slate-300 bg-white text-3xl	font-black leading-14",
    [letterStatus.typing]: "w-14 h-14 border-2 border-slate-500 bg-white text-3xl	font-black leading-14 text-black	",
    [letterStatus.wrong]: "w-14 h-14 bg-zinc-500	text-3xl font-black leading-14 text-white		",
    [letterStatus.correct]: "w-14 h-14 bg-lime-500	text-3xl font-black leading-14 text-white	",
    [letterStatus.correctLetter]: "w-14 h-14  bg-yellow-400	text-3xl font-black leading-14 text-white	",
  };
  