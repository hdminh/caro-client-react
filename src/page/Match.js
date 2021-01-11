import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Board from '../components/Board';
import { handleClickInMatch, endMatchSock } from '../socket/matchSocket';
import { ioClient } from '../socket/index';
import { playMatch, surrender } from '../api/matchService';
import { ContactSupportOutlined } from '@material-ui/icons';
import { getUserId } from '../api/authService';
import Button from '@material-ui/core/Button';
import { Chat } from '../components';
// import  calculateWinner  from '../api/GameService';


function Match() {
  const [history, setHistory] = useState([{ squares: Array(400).fill(null) }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [canMove, setCanMove] = useState(true);
  const [status, setStatus] = useState("play");
  const [timeCount, settimeCount] = useState(60);
  const [oponentMove, setOponentMove] = useState();
  let { id } = useParams();

  // const matchId= props.match.params.id;

  //   function jumpTo(step) {
  //   setStepNumber(step);
  //   setXIsNext((step % 2) === 0);
  // }


  const handleNewMove = (i) => {
    const clickhistory = history.slice(0, stepNumber + 1);
    const current = clickhistory[clickhistory.length - 1];
    const squares = current.squares.slice();
    squares[i] = xIsNext ? 'X' : 'O';
    setXIsNext(!xIsNext);
    console.log(i);
    console.log(xIsNext);
    setHistory(clickhistory.concat([
      {
        squares: squares,
        latestMoveSquare: i
      }
    ]));
    setStepNumber(clickhistory.length);
  }

  const updateStatusWinner = (winner) => {
    if (winner == "-1") {
      setStatus("playing");
    } else if (JSON.stringify(winner) == getUserId()) {
      setStatus("you win");

    } else {
      setStatus("you lose");

    }

  }


  ioClient.off("opponent_move");
  ioClient.on("opponent_move", (data) => {
    handleNewMove(JSON.stringify(data.i));
    setCanMove(true);
  })

  ioClient.off("force_disconnect");
  ioClient.on("force_disconnect", () => {
    endMatchSock();
  })

  const handleClick = async (i) => {
    if (canMove) {
      //call api handle status play
      const result = await playMatch(id, i);
      console.log(result);
      updateStatusWinner(result.winner);

      //emit to oppenent
      if (!result.error) {
        handleClickInMatch(i);
        handleNewMove(i);
        setCanMove(false);
      }
    }
  }

  const handleSurrender = async () => {
    const result = await surrender(id);
    console.log("error surrennder");
    console.log(result);
    if (result._id) {
      updateStatusWinner(result.winner);
      endMatchSock();
    }
  }

  //move
  const current = history[history.length - 1];
  //   console.log(current);
  //   const squares = current.squares.slice();
  //   const moves = history.map((step, move) => {
  //     const latestMoveSquare = step.latestMoveSquare;
  //     const col = 1 + latestMoveSquare % 20;
  //     const row = 1 + Math.floor(latestMoveSquare / 20);
  //     const desc = move ?
  //       `Go to move #${move} (${col}, ${row})` :
  //       'Go to game start';
  //     return (
  //       <li key={move}>
  //         <button className={move === stepNumber ? 'bold-selected-item' : ''}
  //           onClick={() => jumpTo(move)}>{desc}</button>
  //       </li>
  //     );
  //   });

  return (
    <Container component="main">
      <CssBaseline />
      <Typography component="h1" variant="h5">
          TRAN DAU
         </Typography>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Board
            squares={current.squares}
            onClick={(i) => handleClick(i)}
          />
        </Grid>
        <Grid item xs={4}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={endMatchSock}
          >
            End game
    </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={endMatchSock}
          >
            Xin hòa
    </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleSurrender}
          >
            Xin hàng
    </Button>
    <br/>
    <Chat name={getUserId()} room={"123"}/>
        </Grid>
      </Grid>

    </Container>


    // <div className="game">
    //   <div className="game-board">
    //   <Typography component="h1" variant="h5">
    //             TRAN DAU 
    //     </Typography>
    //     <Board
    //       squares={current.squares}
    //       onClick={(i) => handleClick(i)}
    //     />
    //     {/* winLine={winStruct.line} /> */}
    //   </div>
    //   <div className="game-info">
    //   <Button
    //   type="submit"
    //   variant="contained"
    //   color="primary"
    // onClick={endMatchSock}
    // >
    //   End game
    // </Button>
    // <Button
    //   type="submit"
    //   variant="contained"
    //   color="primary"
    // onClick={endMatchSock}
    // >
    //   Xin hòa
    // </Button>
    // <Button
    //   type="submit"
    //   variant="contained"
    //   color="primary"
    // onClick={handleSurrender}
    // >
    // Xin hàng
    // </Button>
    //     <div>{status}</div>
    //     <Chat/>
    //     {/* <button onClick={() => setIsAscending(!isAscending)}>
    //       {isAscending ? 'descending' : 'ascending'}
    //     </button>
    //     <ol>{moves}</ol> */}
    //   </div>
    // </div>
  );
}



export default Match;
