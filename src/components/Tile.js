import React, { useEffect, useState, useCallback } from "react";

const Tile = ({board, index, onClick, value, activePlayer, gameCompleted}) => {
  const [icon, setIcon] = useState(null);
  const [winningTileClass, setWinningTileClass] = useState(null);

  const handleMouseOver = () => {
    if(board[index]) {
      return
    }

    if(activePlayer === "X") {
      setIcon(<svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><path d="M51.12 1.269c.511 0 1.023.195 1.414.586l9.611 9.611c.391.391.586.903.586 1.415s-.195 1.023-.586 1.414L44.441 32l17.704 17.705c.391.39.586.902.586 1.414 0 .512-.195 1.024-.586 1.415l-9.611 9.611c-.391.391-.903.586-1.415.586a1.994 1.994 0 0 1-1.414-.586L32 44.441 14.295 62.145c-.39.391-.902.586-1.414.586a1.994 1.994 0 0 1-1.415-.586l-9.611-9.611a1.994 1.994 0 0 1-.586-1.415c0-.512.195-1.023.586-1.414L19.559 32 1.855 14.295a1.994 1.994 0 0 1-.586-1.414c0-.512.195-1.024.586-1.415l9.611-9.611c.391-.391.903-.586 1.415-.586s1.023.195 1.414.586L32 19.559 49.705 1.855c.39-.391.902-.586 1.414-.586Z" stroke="#31C3BD" strokeWidth="2" fill="none"/></svg>)
    } else {
      setIcon(<svg width="66" height="66" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg"><path d="M33 1c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C15.327 65 1 50.673 1 33 1 15.327 15.327 1 33 1Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z" stroke="#F2B137" strokeWidth="2" fill="none"/></svg>)
    }
  }

  const handleMouseOut = () => {
    if(board[index]) {
      return
    }

    setIcon(null);
  }

  const handleWinner = useCallback(() => {
    if(gameCompleted.winningMark) {
      if(gameCompleted.winningMark === "X" && (gameCompleted.winningCombo.includes(index))) {
        setWinningTileClass('x--wins');
      }

      if(gameCompleted.winningMark === "O" && (gameCompleted.winningCombo.includes(index))) {
        setWinningTileClass('o--wins');
      }
    }
  },
  [gameCompleted.winningMark, gameCompleted.winningCombo, index]);


  useEffect(()=> {
    if ( value ) {
      if ( value === "X" ) {
        setIcon(<svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><path d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z" fill="#31C3BD" fillRule="evenodd"/></svg>);
      } else if ( value === "O" ) {
        setIcon(<svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><path d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z" fill="#F2B137"/></svg>);
      }

      handleWinner();

    } else {
      setIcon(null);
      setWinningTileClass(null);
    }

  }, [value, handleWinner]);

  return (
    <div onClick={onClick} value={value} index={index} className={`tile${winningTileClass ? " " + winningTileClass : ""}`} onMouseOver={()=> handleMouseOver()} onMouseLeave={() => handleMouseOut()}>
      {icon}
    </div>
  )
};

export default Tile;
