import './App.css';
import React, { useRef, useState, useEffect, useCallback } from 'react';
import Board from './components/Board';
import BoardHeader from './components/BoardHeader';
import BoardFooter from './components/BoardFooter';
import NewGame from './components/NewGame';
import Banner from './components/Banner';



const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [gameActive, setGameActive] = useState(localStorage.getItem("GameActive") ? localStorage.getItem("GameActive") : false);
  const [nextGameActive, setNextGameActive] = useState(false);
  const [gameCompleted, setGameCompleted] = useState({completed: false, winner: null});
  const [gameTied, setGameTied] = useState(false);
  const [gameReset, setGameReset] = useState(false);
  let   [totalTiedGames, setTotaTiedGames] = useState(localStorage.getItem("Ties") ? JSON.parse(localStorage.getItem("Ties")) : 0);
  const [playerOne, setPlayerOne] = useState(localStorage.getItem("P1") ? JSON.parse(localStorage.getItem("P1")) : {mark: null, score: 0, name: "P1"});
  const [playerTwo, setPlayerTwo] = useState(localStorage.getItem("P2") ? JSON.parse(localStorage.getItem("P2")) : {mark: null, score: 0, name: "P2"});
  const [activePlayer, setActivePlayer] = useState("X");
  const [playingCPU, setPlayingCPU] = useState(false);
  const boardRef = useRef(null);

  const quitGame = () => {
    setBoard(Array(9).fill(null));
    setGameActive(false);
    setGameCompleted({completed: false, winner: null})
    setPlayerOne({...playerOne, mark: null, score: 0});
    setPlayerTwo({...playerTwo, mark: null, score: 0});
    setGameTied(false);
    setGameReset(false);
    setActivePlayer("X");
    setTotaTiedGames(0);
    setPlayingCPU(false);
    localStorage.removeItem("P1");
    localStorage.removeItem("P2");
    localStorage.removeItem("Ties");
    localStorage.removeItem("GameActive");
  }

  const nextGame = () => {
    setBoard(Array(9).fill(null));
    setNextGameActive(!nextGameActive);
    setGameTied(false);
    setGameCompleted({...gameCompleted, completed:false, winner: null, winningMark: null, winningCombo: null});
  }

  const calculateTie = useCallback(() => {
    setGameTied(true);
    setTotaTiedGames(totalTiedGames += 1);
    setBoard(Array(9).fill(null));
    setGameCompleted({completed: false, winner: null})
    localStorage.setItem("Ties", totalTiedGames);
    return true;
  },[totalTiedGames])

  const calculateWinner = useCallback(() => {
    const winningLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    if(board) {
      for(let i = 0; i < winningLines.length; i++) {
        const [a, b, c] = winningLines[i];
        if(board[a] && board[a] === board[b] && board[a] === board[c]) {
          if(board[a] === playerOne.mark) {
            setGameCompleted({...gameCompleted, completed:true, winner: "Player 1", winningMark: playerOne.mark, winningCombo: [a,b,c]});
            if(playingCPU && gameCompleted.winningMark === playerOne.mark) {
              setPlayerOne({...playerOne, score: playerOne.score += 1});
            } else if(!playingCPU) {
              setPlayerOne({...playerOne, score: playerOne.score += 1});
            }
            setNextGameActive(false);
            return;
          }

          if (board[a] === playerTwo.mark) {
            setGameCompleted({...gameCompleted, completed:true, winner: "Player 2", winningMark: playerTwo.mark, winningCombo: [a,b,c]});
            setPlayerTwo({...playerTwo, score: playerTwo.score += 1});
            setNextGameActive(false);
            return;
          }
        }
      }
    }

    const boardCompleted = board.every(value => value !== null);

    if(board && boardCompleted) {
      calculateTie();
      return
    }

    return null;
  }, [board]);

  const computerMove = () => {
    if(playingCPU && activePlayer === playerTwo.mark && !gameCompleted.completed) {
      const boardCopy = [...board];
      const availableIndexes = boardCopy.map((tile, i) => {
        if(tile === null) {
          return i;
        } else {
          return null;
        }
      }).filter((tile) => tile !== null);

      const cpuMove = availableIndexes[Math.floor(Math.random() * availableIndexes.length)];

      boardCopy[cpuMove] = activePlayer;

      setBoard(boardCopy);
      setActivePlayer(activePlayer === "X" ? "O" : "X");
    }
  }

  useEffect(() => {
    computerMove();
  });

  useEffect(() => {
    calculateWinner();
  }, [calculateWinner])

  return (
    <div className='board'>
      {gameActive ?
          <div ref={boardRef} >
            <BoardHeader activePlayer={activePlayer} setGameReset={setGameReset}/>
            <Board
              board={board}
              setBoard={setBoard}
              gameActive={gameActive}
              activePlayer={activePlayer}
              setActivePlayer={setActivePlayer}
              nextGameActive={nextGameActive}
              gameCompleted={gameCompleted}
              playerOne={playerOne}
              playerTwo={playerTwo}
              totalTiedGames={totalTiedGames}
            />
            <BoardFooter playerOne={playerOne} playerTwo={playerTwo} totalTiedGames={totalTiedGames} playingCPU={playingCPU}/>
          </div>
        : <NewGame setPlayerOne={setPlayerOne} playerOne={playerOne} setPlayerTwo={setPlayerTwo} playerTwo={playerTwo} setGameActive={setGameActive} setPlayingCPU={setPlayingCPU} />
      }

      {gameCompleted.completed && gameCompleted.winner !== null && gameActive && !nextGameActive ?
        <Banner nextGame={nextGame} quitGame={quitGame} winningMessage={`${gameCompleted.winner} Wins!`} winningMark={gameCompleted.winningMark} mainMessage={"Takes the Round"}/>
        :
        null
      }

      {gameTied ?
          <Banner gameTied={gameTied} nextGame={nextGame} quitGame={quitGame} mainMessage={"Round Tied"}/>
        :
        null
      }

      {gameReset ?
          <Banner setGameReset={setGameReset} gameReset={gameReset} quitGame={quitGame} mainMessage={"Restart Game"}/>
        :
        null
      }
    </div>
  );
}

export default App;
