import React, { useState } from "react";
import chessboard from "./chessboard.css";

function Chessboard() {
  let board = [];
  const [currentCell, setCurrentCell] = useState(-1);
  const [moves, setMoves] = useState([]);

  function valid(row, col) {
    return row >= 0 && row < 8 && col >= 0 && col < 8;
  }

  async function myfunction(e) {
    const val = e.target.value;
    setCurrentCell(parseInt(val, 10));

    const row = Math.floor(val / 8);
    const col = val % 8;

    await setMoves([]);
    for (let x of [-1, 1]) {
      for (let y of [-2, 2]) {
        let newrow = row + x;
        let newcol = col + y;
        if (valid(newrow, newcol)) {
          await setMoves((p) => [...p, newrow * 8 + newcol]);
        }

        newrow = row + y;
        newcol = col + x;
        if (valid(newrow, newcol)) {
          await setMoves((p) => [...p, newrow * 8 + newcol]);
        }
      }
    }
  }
  let num = 0;
  for (let i = 0; i <= 7; i++) {
    for (let j = 0; j <= 7; j++) {
      board.push(
        <button
          value={i * 8 + j}
          onClick={myfunction}
          className={`tile 
            ${num === currentCell && "redtile"}
            ${(i + j) % 2 === 0 ? "blacktile" : "whitetile"}
            ${moves.indexOf(num) !== -1 && "greentile"}
            `}
        ></button>
      );
      num++;
    }
  }

  return (
    <>
      <div className="chessboard">{board} </div>
    </>
  );
}
export default Chessboard;
