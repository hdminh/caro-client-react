import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import HistoryTable from "../components/HistoryTable";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import MatchHistory from "../components/MatchHistory";
import { getUserMatch } from "../api/matchService";

const useStyles = makeStyles((theme) => ({
  search: {
    display: "flex",
    marginTop: "100px",
  },
  input: {
    width: "50%",
  },
}));

export default function History(props) {
  const classes = useStyles();
  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);
  // const [historyList, setHistoryList] = useState(null);
  //   const [squares, setSquares] = useState([]);
  const [history, setHistory] = useState([{ squares: Array(400).fill(null) }]);
  const [clickHistory, setClickHistory] = useState([]);
  const [index, setIndex] = useState(0);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [currentPos, setCurrentPos] = useState(0);
  //   const current = history[history.length - 1];

  const handleNextMove = () => {
    setCurrentPos(currentPos + 1);
  };

  const handlePrevMove = () => {
    setCurrentPos(currentPos - 1);
  };

  useEffect(() => {
    getMatchList();
  }, []);

  const getMatchList = () => {
    props.setLoading(true);
    getUserMatch()
      .then((response) => {
        props.setLoading(false);
        if (response.status < 400) {
          console.log(response.data);
          setData(response.data);
        }
      })
      .catch((error) => {
        props.setLoading(false);
        props.setError(error.message);
      });
  };

  const mapHistory = (historyList) => {
    historyList.map((his) => {
      // setIndex(his.y * 20 + his.x + 1);
      setClickHistory([...clickHistory, his.y * 20 + his.x + 1]);
      const clickhistory = history.slice(0, stepNumber + 1);
      const current = clickhistory[clickhistory.length - 1];
      const squares = current.squares.slice();
      squares[his.y * 20 + his.x + 1] = xIsNext ? "X" : "O";
      setXIsNext(!xIsNext);
      setHistory(
        clickhistory.concat([
          {
            squares: squares,
            latestMoveSquare: his.y * 20 + his.x + 1,
          },
        ])
      );
      setStepNumber(stepNumber + 1);
    });
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <HistoryTable
          setError={props.setError()}
          data={data}
          setOpen={setOpen}
          mapHistory={mapHistory}
          open={open}
        />
      </TableContainer>
      <MatchHistory historyList={history} />
    </div>
  );
}
