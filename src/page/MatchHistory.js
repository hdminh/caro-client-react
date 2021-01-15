import React, { useEffect, useState } from "react";
import "../App.css";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Board from "../components/Board";
import Grid from "@material-ui/core/Grid";
import { getMatchInfo } from "../api/matchService";
import ChatHistory from "../components/ChatHistory";

const useStyles = makeStyles((theme) => ({
  input: {
    width: "50%",
  },
}));

function MatchHistory(props) {
  const classes = useStyles();
  const [history, setHistory] = useState({ squares: Array(400).fill(null) });
  const [clickHistory, setClickHistory] = useState([]);
  const [currentPos, setCurrentPos] = useState(0);
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [messages, setMessages] = useState([]);

  let { id } = useParams();
  const handleNextMove = () => {
    if (currentPos < clickHistory.length) setCurrentPos(currentPos + 1);
    let clicks = clickHistory.slice(0, currentPos + 1);
    let squaresList = Array(400).fill(null);
    let index = 0;
    clicks.forEach((click) => {
      squaresList[click] = index % 2 == 0 ? "X" : "O";
      index = index + 1;
    });
    setHistory(squaresList);
  };

  const handlePrevMove = () => {
    let clicks;
    if (currentPos > 0) {
      setCurrentPos(currentPos - 1);
      clicks = clickHistory.slice(0, currentPos - 1);
    } else {
      clicks = clickHistory.slice(0, currentPos);
    }
    let squaresList = Array(400).fill(null);
    let index = 0;
    clicks.forEach((click) => {
      squaresList[click] = index % 2 == 0 ? "X" : "O";
      index = index + 1;
    });
    setHistory(squaresList);
  };

  const mapHistory = async () => {
    setClickHistory([]);
    getMatchInfo(id)
      .then((res) => {
        console.log(res.data.history);
        res.data.history.forEach((his) => {
          let pos = his.y * 20 + his.x;
          setClickHistory((clickHistory) => clickHistory.concat(pos));
        });
        setMessages(res.data.chat);
        setRoom("Lịch sử chat");
      })
      .catch((err) => {
        props.setError("Lấy thông tin bàn chơi không thành công");
      });
  };

  useEffect(() => {
    mapHistory(props.history);
  }, []);

  const handleClick = (i) => {};

  return (
    <div>
      <Grid container spacing={0}>
        <Grid item xs={2}>
          <Grid item>
            <Typography>Nước đi thứ {currentPos}</Typography>
          </Grid>
          <Grid item>
            <Button onClick={handlePrevMove}>Nước đi trước</Button>
          </Grid>
          <Grid item>
            <Button onClick={handleNextMove}>Nước đi kế tiếp</Button>
          </Grid>
        </Grid>

        <Grid item xs={7}>
          <Typography component="h1" variant="h5">
            Lịch sử trận đấu
          </Typography>
          <Board squares={history} onClick={(i) => handleClick(i)} />
        </Grid>
        <Grid item xs={3}>
          <ChatHistory room={room} name={name} messages={messages} />
        </Grid>
      </Grid>
    </div>
  );
}

export default MatchHistory;
