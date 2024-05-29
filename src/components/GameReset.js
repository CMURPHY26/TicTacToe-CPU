import React from "react";
import resetIcon from '../images/icon-restart.svg'

const GameReset = ({setGameReset}) => {
  return (
    <div onClick={() => setGameReset(true)} className="board__reset">
      <img src={resetIcon} alt="" />
    </div>
  )
}

export default GameReset;
