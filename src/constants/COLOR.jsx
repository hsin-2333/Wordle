import { LETTER } from "./LETTER";

export const COLOR = {
  [LETTER.IDLE]: " w-14 h-14 border-2 border-slate-300 bg-white text-3xl	font-black leading-14",
  [LETTER.TYPING]: "w-14 h-14 border-2 border-slate-500 bg-white text-3xl	font-black leading-14 text-black	",
  [LETTER.WRONG]: "w-14 h-14 bg-zinc-500	text-3xl font-black leading-14 text-white		",
  [LETTER.CORRECT]: "w-14 h-14 bg-lime-500	text-3xl font-black leading-14 text-white	",
  [LETTER.CORRECT_LETTER]: "w-14 h-14  bg-yellow-400	text-3xl font-black leading-14 text-white	",
};

//gamesStatus 也整理到這裡

//把所有constant分類到一起， 各個constant分開

// ACTION
// COLOR
// LETTER

// 狀態大小寫統一
