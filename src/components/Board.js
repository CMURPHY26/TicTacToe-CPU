import React, { useEffect } from "react";
import Tile from "./Tile";

const Board = ({board, setBoard, activePlayer, setActivePlayer, gameCompleted, playerOne, playerTwo, totalTiedGames}) => {
  const handleClick = (index) => {
    const boardCopy = [...board];

    if(boardCopy[index]) {
      return
    }

    boardCopy[index] = activePlayer;

    setBoard(boardCopy);
    setActivePlayer(activePlayer === "X" ? "O" : "X");
  }

  useEffect(()=> {
    localStorage.setItem("P1", JSON.stringify(playerOne));
    localStorage.setItem("P2",JSON.stringify(playerTwo));
    localStorage.setItem("Ties", totalTiedGames);
  }, [playerOne, playerTwo, totalTiedGames]);

  const tiles = board.map((tile, index) => {
    return (
      <Tile
        board={board}
        key={index}
        index={index}
        value={tile}
        activePlayer={activePlayer}
        gameCompleted={gameCompleted}
        onClick={() => handleClick(index)}
      />
    )
  });

  return (
    <div className="board__tile__wrapper">
      {tiles}
    </div>
  )
};

export default Board;
