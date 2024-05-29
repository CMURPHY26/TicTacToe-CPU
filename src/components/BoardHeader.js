import React from "react";
import GameReset from "./GameReset";
import Logo from "./Logo";
import TurnIndicator from "./TurnIndicator";

const BoardHeader = ({activePlayer, setGameReset}) => {
  return (
    <div className="board__header">
      <Logo />
      <TurnIndicator activePlayer={activePlayer} />
      <GameReset setGameReset={setGameReset}/>
    </div>
  )
};

export default BoardHeader;
