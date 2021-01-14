import React, { useEffect, useState } from "react";
import "../App.css";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Board from "../components/Board";
import Slide from "@material-ui/core/Slide";

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

  const handleClose = () => {
    props.setOpen(false);
    props.mapHistory([{ squares: Array(400).fill(null) }]);
  };

  return (
    <div>
      <Typography component="h1" variant="h5">
        Lịch sử trận đấu
      </Typography>
      {props.squares && <Board squares={props.squares} />}
      <Button onClick={props.handleNextMove}>Next</Button>
      <Button onClick={props.handlePrevMove}>Prev</Button>
    </div>
  );
}

export default MatchHistory;
