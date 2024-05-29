import React from "react";
import ScoreCard from "./ScoreCard";

const BoardFooter = ({playerOne, playerTwo, totalTiedGames, playingCPU}) => {

  return (
    <div className="board__footer">
      <ScoreCard player={playerOne}/>
      <ScoreCard totalTiedGames={totalTiedGames}/>
      <ScoreCard player={playerTwo} playingCPU={playingCPU}/>
    </div>
  )
};

export default BoardFooter;
