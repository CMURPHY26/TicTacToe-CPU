import React, { useState } from "react";
import Logo from "./Logo";
import Button from "./Button";

const NewGame = ({setPlayerOne, playerOne, setPlayerTwo, playerTwo, setGameActive, setPlayingCPU}) => {
  const [selectedMark, setSelectedMark] = useState("X");

  const setPlayers = () => {
    if(selectedMark) {
      setPlayerOne({...playerOne, mark: selectedMark});
      setPlayerTwo({...playerTwo, mark: selectedMark === "X" ? "O" : "X"});
      setGameActive(true);
      localStorage.setItem("GameActive", true);
    }
  }

  const setSoloPlay = () => {
    if(selectedMark) {
      setPlayerOne({...playerOne, mark: selectedMark});
      setPlayerTwo({...playerTwo, mark: selectedMark === "X" ? "O" : "X"});
      setGameActive(true);
      localStorage.setItem("GameActive", true);
      setPlayingCPU(true);
    }
  }

  return (
    <div className="new-game">
      <Logo />
      <div className="new-game__select">
        <h4 className="new-game__heading">
          Pick Player 1's Mark
        </h4>
        <div className="new-game__options">
          <div className="new-game__option" onClick={() => setSelectedMark("X")} style={{ backgroundColor: selectedMark === "X" ? '#A8BFC9' : null}}>
          <svg id="X" width="64" height="64" viewBox="0 0 64 64" style={{ fill: selectedMark === "X" ? '#1A2A33' : '#A8BFC9'}} xmlns="http://www.w3.org/2000/svg"><path d="M51.12 1.269c.511 0 1.023.195 1.414.586l9.611 9.611c.391.391.586.903.586 1.415s-.195 1.023-.586 1.414L44.441 32l17.704 17.705c.391.39.586.902.586 1.414 0 .512-.195 1.024-.586 1.415l-9.611 9.611c-.391.391-.903.586-1.415.586a1.994 1.994 0 0 1-1.414-.586L32 44.441 14.295 62.145c-.39.391-.902.586-1.414.586a1.994 1.994 0 0 1-1.415-.586l-9.611-9.611a1.994 1.994 0 0 1-.586-1.415c0-.512.195-1.023.586-1.414L19.559 32 1.855 14.295a1.994 1.994 0 0 1-.586-1.414c0-.512.195-1.024.586-1.415l9.611-9.611c.391-.391.903-.586 1.415-.586s1.023.195 1.414.586L32 19.559 49.705 1.855c.39-.391.902-.586 1.414-.586Z" fill={selectedMark === "X" ? '#1A2A33' : '#A8BFC9'}/></svg>
          </div>
          <div className="new-game__option" onClick={() => setSelectedMark("O")} style={{ backgroundColor: selectedMark === "O" ? '#A8BFC9' : null}}>
          <svg id="O" width="66" height="66" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg"><path d="M33 1c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C15.327 65 1 50.673 1 33 1 15.327 15.327 1 33 1Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z" fill={selectedMark === "O" ? '#1A2A33' : '#A8BFC9'}/></svg>
          </div>
        </div>
        <div className="new-game__sub-text">
            Remember: X Goes First
        </div>
      </div>
      <Button buttonClasses={"new-game__button button__primary--blue"} buttonCTA={"New Game (VS Player)"} onClick={setPlayers}/>
      <Button buttonClasses={"new-game__button--cpu button__primary--gold"} buttonCTA={"New Game (VS CPU)"} onClick={setSoloPlay}/>
    </div>
  );
}

export default NewGame;
