import React, {useState} from "react";
import Button from "./Button";

const Banner = ({winningMessage, mainMessage, winningMark, quitGame, nextGame, gameTied, gameReset, setGameReset}) => {
  return (
    <div className="banner">
      <div className="banner__message">
        {winningMessage ? <h4 className="banner__winner-message">{winningMessage}</h4> : null}
        <div className="banner__main-message">
          {winningMark && winningMark === "X" ?
            <>
              <svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><path d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z" fill="#31C3BD" fillRule="evenodd"/></svg>
              <h1 style={{color: '#31C3BD'}}>{mainMessage}</h1>
            </>
            :
            null
          }
          {winningMark && winningMark === "O" ?
            <>
              <svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><path d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z" fill="#F2B137"/></svg>
              <h1 style={{color: '#F2B137'}}>{mainMessage}</h1>
            </>
            :
            null
          }

          {gameTied || gameReset ? <h1>{mainMessage}</h1> : null}
        </div>
        <div className="banner__buttons">
          {winningMessage || gameTied ? <Button onClick={quitGame} buttonClasses={"button__secondary button__secondary--grey"} buttonCTA={"Quit"} /> : null}
          {winningMessage || gameTied ? <Button onClick={nextGame} buttonClasses={"button__secondary button__secondary--gold"} buttonCTA={"Next Round"} /> : null}
          {gameReset ? <Button onClick={() => setGameReset(false)} buttonClasses={"button__secondary button__secondary--grey"} buttonCTA={"No, Cancel"} /> : null}
          {gameReset ? <Button onClick={quitGame} buttonClasses={"button__secondary button__secondary--gold"} buttonCTA={"Yes, Restart"} /> : null}
        </div>
      </div>
    </div>
  );
};

export default Banner;
