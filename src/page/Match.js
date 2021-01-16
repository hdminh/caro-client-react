import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Board from '../components/Board';
import { handleClickInMatch, endMatchSock, drawMatchSock } from '../socket/matchSocket';
import { ioClient } from '../socket/index';
import { playMatch, surrender, DrawMatch } from '../api/matchService';
import { ContactSupportOutlined, PinDropSharp } from '@material-ui/icons';
import { getCurrentUser, getUserId } from '../api/authService';
import Button from '@material-ui/core/Button';
import { Chat } from '../components';
import Dialog from '../components/Dialog';
import Countdown from "react-countdown";
  // import  calculateWinner  from '../api/GameService';

function Match(props) {
  const [history, setHistory] = useState([{ squares: Array(400).fill(null) }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [canMove, setCanMove] = useState(true);
  const [status, setStatus] = useState("play");
  const[turn,setTurn]= useState("your turn");
  const [infor, setInfor] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogEnd, setOpenDialogEnd] = useState(false);
  const [isHost,setIsHost]=useState("false");

  const [timeCount, settimeCount] = useState(60);
  const [oponentMove, setOponentMove] = useState();
  let History = useHistory();

  let { id, ishost } = useParams();



  // const matchId= props.match.params.id;

  //   function jumpTo(step) {
  //   setStepNumber(step);
  //   setXIsNext((step % 2) === 0);
  // }


  const handleNewMove = (i) => {
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
      endMatch("you win");
    } else {
      setStatus("you lose");
      endMatch("you lose");

    }
  };
  // const handleEndMatch = (message)

  ioClient.off("force_disconnect");
  ioClient.on("force_disconnect", () => {
    endMatch("");
  });
  ioClient.off("opponent_move");
  ioClient.on("opponent_move", (data) => {
    handleNewMove(JSON.stringify(data.i));
    setTurn("your turn");
    setCanMove(true);
  }, [])
  ioClient.off("time_out");
  ioClient.on("time_out", async (data) => {
    console.log(data);
    console.log(JSON.stringify(data));
    if (data == 1) {
      await setStatus("Bạn đa thắng vì đối thủ đã hết thời gian đánh");
      endMatch("Bạn đa thắng vì đối thủ đã hết thời gian đánh");
    } else {
      await setStatus();
      await surrender(id);
      endMatch("Bạn đa thua vì đã hết thời gian đánh");
    }
  });

  // ioClient.off("draw_match");
  ioClient.off("draw_match_send");
  ioClient.on("draw_match_send", async () => {
    console.log("on draw request");
    setOpenDialog(true);

  })

  const handleAgreeDraw = async () => {
    setOpenDialog(false);
    const result = await DrawMatch(id);
    if (result._id) {
      setStatus("Draw");
      endMatch("Draw");
    }
  }

  const handleDraw = async () => {
    drawMatchSock();
  }
  const endMatch = async(status) => {
   await setStatus(status);
    setOpenDialogEnd(true);
  }

  const handleEnd = () => {
    endMatchSock();
    History.push("/");
  }
  const handleClick = async (i) => {
    if (canMove) {
      //call api handle status play
      const result = await playMatch(id, i);
      console.log(result);

      //emit to oppenent
      if (result._id) {
        console.log("khong loi");
        updateStatusWinner(result.winner);
        handleClickInMatch(i);
        handleNewMove(i);
        setTurn("opponent's turn");
        setCanMove(false);
      } else {
        console.log(result.error);
        setStatus(result.error.message);
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

  useEffect(()=>{
    if(ishost=="true"){
      console.log("ishost");
      console.log(ishost);
      setIsHost("true");
    }
  },[ishost])
  useEffect(() => {
    if (isHost === "false") {
      setCanMove(true);
      setTurn("your turn");
    } else {
      console.log("false turn");
      setCanMove(false);
      setTurn("opponent's turn");
    }
    // console.log(localStorage.getItem("player"));
    // setInfor(JSON.stringify(localStorage.getItem("player")));
  }, [isHost]);


  return (
    <Container component="main">
      <Dialog openDialog={openDialog} setOpenDialog={setOpenDialog} setResult={handleAgreeDraw} content={"Đối thủ xin cầu hòa"} />
      <Dialog openDialog={openDialogEnd} setOpenDialog={setOpenDialogEnd} setResult={handleEnd} content={"Trận đâu đã kết thúc." + status} />


      <CssBaseline />
      <Typography component="h1" variant="h5">
        TRẬN ĐẤU
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Board squares={current.squares} onClick={(i) => handleClick(i)} />
        </Grid>
        <Grid item xs={4}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleDraw}
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
          <br />
          <Countdown
            date={Date.now() + 60000}
            intervalDelay={1000}
            precision={1000}
            renderer={(props) => <div>{parseInt(props.total / 1000)}</div>}
            onComplete={() => { console.log("time outq ") }}>
            Thời gian:
      </Countdown>
          <div>
            {infor == null ? (<p>loading...</p>) : (
              <p>Người chơi 1 : {infor['player1']} Người chơi 2 : {infor['player2']} </p>
            )}


          </div>
          <div>{turn}</div>
          <br />
          <Chat name={getCurrentUser()} room={JSON.stringify(props.title)} id={id} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Match;
