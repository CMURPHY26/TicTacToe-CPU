import React from "react";

const ScoreCard = ({player, totalTiedGames, playingCPU}) => {
  return (
    <div className={player ? `board__score-card ${player.mark}` : "board__score-card ties"}>
      <div className="board__score-card__header">
         {player ? `${player.mark} (${playingCPU ? 'CPU' : player.name})` : "Ties"}
      </div>
      <div className="score">
      <h2>{player ? player.score : totalTiedGames}</h2>
      </div>
    </div>
  )
}

export default ScoreCard;
