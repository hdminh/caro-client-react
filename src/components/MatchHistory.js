import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../App.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

import Board from "../components/Board";
import { handleClickInMatch, endMatchSock } from "../socket/matchSocket";
import { ioClient } from "../socket/index";
import { playMatch, surrender } from "../api/matchService";
import { getCurrentUser, getUserId } from "../api/authService";
import Button from "@material-ui/core/Button";
import { Chat } from "../components";

function Match(props) {
  const [history, setHistory] = useState([{ squares: Array(400).fill(null) }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [canMove, setCanMove] = useState(true);
  const [status, setStatus] = useState("play");
  const [infor, setInfor] = useState({});
  let { id } = useParams();

  const handleNextMove = (i) => {
    const clickhistory = history.slice(0, stepNumber + 1);
    const current = clickhistory[clickhistory.length - 1];
    const squares = current.squares.slice();
    squares[i] = xIsNext ? "X" : "O";
    setXIsNext(!xIsNext);
    console.log(i);
    console.log(xIsNext);
    setHistory(
      clickhistory.concat([
        {
          squares: squares,
          latestMoveSquare: i,
        },
      ])
    );
    setStepNumber(clickhistory.length);
  };

  const handlePrevMove = (i) => {
    const clickhistory = history.slice(0, stepNumber + 1);
    const current = clickhistory[clickhistory.length - 1];
    const squares = current.squares.slice();
    squares[i] = xIsNext ? "X" : "O";
    setXIsNext(!xIsNext);
    console.log(i);
    console.log(xIsNext);
    setHistory(
      clickhistory.concat([
        {
          squares: squares,
          latestMoveSquare: i,
        },
      ])
    );
    setStepNumber(clickhistory.length);
  };

  const updateStatusWinner = (winner) => {
    if (winner == "-1") {
      setStatus("playing");
    } else if (JSON.stringify(winner) == getUserId()) {
      setStatus("you win");
    } else {
      setStatus("you lose");
    }
  };

  // ioClient.off("opponent_move");
  // ioClient.on("opponent_move", (data) => {
  //   handleNewMove(JSON.stringify(data.i));
  //   setCanMove(true);
  // })

  ioClient.off("force_disconnect");
  ioClient.on("force_disconnect", () => {
    endMatchSock();
  });
  ioClient.off("opponent_move");
  ioClient.on(
    "opponent_move",
    (data) => {
      handleNextMove(JSON.stringify(data.i));
      setCanMove(true);
    },
    []
  );

  ioClient.on("time_out", (data) => {
    console.log(data);
    console.log(JSON.stringify(data));
    if (data == 1) {
      setStatus("Bạn đa thắng vì đối thủ đã hết thời gian đánh");
    } else {
      setStatus("Bạn đa thua vì đã hết thời gian đánh");
    }
  });

  const handleClick = async (i) => {
    if (canMove) {
      //call api handle status play
      const result = await playMatch(id, i);
      console.log(result);
      updateStatusWinner(result.winner);

      //emit to oppenent
      if (!result.error) {
        handleClickInMatch(i);
        handleNextMove(i);
        setCanMove(false);
      }
    }
  };

  const handleSurrender = async () => {
    const result = await surrender(id);
    console.log("error surrennder");
    console.log(result);
    if (result._id) {
      updateStatusWinner(result.winner);
      endMatchSock();
    }
  };

  //move
  const current = history[history.length - 1];
  useEffect(() => {
    console.log(localStorage.getItem("player"));
    setInfor(localStorage.getItem("player"));
  }, []);

  return (
    <Container component="main">
      <CssBaseline />
      <Typography component="h1" variant="h5">
        TRAN DAU
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Board squares={current.squares} onClick={(i) => handleClick(i)} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Match;
