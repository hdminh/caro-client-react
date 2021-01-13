import React, { useEffect, useState } from "react";
import "../App.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Board from "../components/Board";
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function MatchHistory(props) {

  const handleClose = () => {
      props.setOpen(false)
  }

  return (
    <Dialog
      open={props.open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">
        <Typography component="h1" variant="h5">
          Lịch sử trận đấu
        </Typography>
      </DialogTitle>
      <DialogContent>
        {props.squares && <Board squares={props.squares} />}
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleNextMove}>Next</Button>
        <Button onClick={props.handlePrevMove}>Prev</Button>
      </DialogActions>
    </Dialog>
  );
}

export default MatchHistory;
