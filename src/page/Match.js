import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Board from '../components/Board';
import { handleClickInMatch, endMatchSock,drawMatchSock } from '../socket/matchSocket';
import { ioClient } from '../socket/index';
import { playMatch, surrender,DrawMatch } from '../api/matchService';
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
  const [infor,setInfor]=useState({});
  const [openDialog,setOpenDialog]=useState(false);
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
  // const handleEndMatch = (message)

  ioClient.off("force_disconnect");
  ioClient.on("force_disconnect", () => {
    endMatchSock();
  });
  ioClient.off("opponent_move");
  ioClient.on("opponent_move", (data) => {
    handleNewMove(JSON.stringify(data.i));
    setCanMove(true);
  },[])
  ioClient.off("time_out");
  ioClient.on("time_out", (data) => {
    console.log(data);
    console.log(JSON.stringify(data));
    if (data == 1) {
      setStatus("Bạn đa thắng vì đối thủ đã hết thời gian đánh");
    } else {
      setStatus("Bạn đa thua vì đã hết thời gian đánh");
    }
  });

  // ioClient.off("draw_match");
  ioClient.off("draw_match_send");
  ioClient.on("draw_match_send",async()=>{
    console.log("on draw request");
    setOpenDialog(true);
   

  })

  const handleAgreeDraw=async () =>{
    setOpenDialog(false);
    const result = await DrawMatch(id);
    if(result._id){
      setStatus("Draw");
    endMatchSock();
    }
  }

  const handleDraw = async() =>{
    drawMatchSock();
  }





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
      <Dialog openDialog={openDialog} setOpenDialog={setOpenDialog} setResult={handleAgreeDraw} content={"Đối thủ xin cầu hòa"}/>
      <CssBaseline />
      <Typography component="h1" variant="h5">
        TRAN DAU
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
    <br/>
    <Countdown
        date={Date.now()+60000}
        intervalDelay={1000}
        precision={1000}
        renderer={(props) => <div>{parseInt(props.total/1000)}</div>}
        onComplete={()=>{console.log("time outq ")}}>
          Thời gian: 
      </Countdown>
    <div> 
      {infor==null ?(<p>loading...</p>) : (
        <p>Người chơi 1 : {infor['player1'] } Người chơi 2 : {infor.player2 } </p>
      )}
      

</div>   
    <div>{status}</div>
    <br/>
    <Chat name={getCurrentUser()} room={JSON.stringify(props.title)} id={id}/>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Match;
