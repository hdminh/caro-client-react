import React, { useEffect, useState } from "react";
import "../App.css";
import { useParams } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Board from "../components/Board";
import Slide from "@material-ui/core/Slide";
import Grid from "@material-ui/core/Grid";
import { getMatchInfo } from '../api/matchService';
import { PostAddOutlined } from "@material-ui/icons";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  input: {
    width: "50%",
  },
}));

function MatchHistory(props) {
  const classes = useStyles();
  const [history, setHistory] = useState({ squares: Array(400).fill(null) });
  const [clickHistory, setClickHistory] = useState([]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [currentPos, setCurrentPos] = useState(0);
  //   const current = history[history.length - 1];
  let { id } = useParams();
  const handleNextMove = () => {
    if (currentPos < clickHistory.length - 1) setCurrentPos(currentPos + 1);
    let clicks = clickHistory.slice(0, currentPos);
    let squaresList = Array(400).fill(null);
    let index = 0;
    clicks.forEach(click =>{
      squaresList[click] = index % 2 == 0 ? "X" : "O"
      index = index + 1;
    })
    setHistory(squaresList)
    console.log(currentPos, squaresList)

  };

  const handlePrevMove = () => {
    if (currentPos > 0) setCurrentPos(currentPos - 1);
    let clicks = clickHistory.slice(0, currentPos);
    let squaresList = Array(400).fill(null);
    let index = 0;
    clicks.forEach(click =>{
      squaresList[click] = index % 2 == 0 ? "X" : "O"
      index = index + 1;

    })
    setHistory(squaresList)
    console.log(currentPos, squaresList)

  };

  const mapHistory = () => {
    let stepNumber = 0;
    getMatchInfo(id)
      .then((res) => {
        console.log(res.data.history)
        res.data.history.forEach((his) => {
          let pos = (his.y * 20 + his.x)
          setClickHistory(clickHistory => clickHistory.concat(pos));
          console.log('aaaaaaaaaaaa', his.x, his.y, pos);
          console.log('aaaaaaaa', clickHistory)
          // const clickhistory = history.slice(0, stepNumber + 1);
          // const current = clickhistory[clickhistory.length - 1];
          // const squares = history.squares.slice();
          // console.log(current)
          // squares[his.y * 20 + his.x] = xIsNext ? "X" : "O";
          // setXIsNext(!xIsNext);
          // setHistory(
          //   clickhistory.concat([
          //     {
          //       squares: squares,
          //       latestMoveSquare: his.y * 20 + his.x + 1,
          //     },
          //   ])
          // );
          // console.log('stepppp',stepNumber)
          // stepNumber = clickhistory.length;
        });
      })
      .catch((err) => {
        console.log(err.message)
      });
  };

  useEffect(() => {
    console.log('aaaaaaaaaaaaa')
    mapHistory(props.history);
  }, []);

  return (
    <div>
      <Typography component="h1" variant="h5">
        Lịch sử trận đấu
      </Typography>
      <Grid container>
        <Grid item>
        <Board squares={history} />
        </Grid>
        <Grid item>
      <Button onClick={handlePrevMove}>Prev</Button>
          
        </Grid>
        <Grid item>
      <Button onClick={handleNextMove}>Next</Button>
          
        </Grid>
      </Grid>
    </div>
  );
}

export default MatchHistory;
