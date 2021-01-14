import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function RoomInfo(props) {
  const classes = useStyles();

  const joinRoom = () => {
    props.joinRoom(props.data);
  };

  return (
    <Grid item xs={3}>
      {props.data && props.data.status !== -1 && (
        <Card className={classes.root} variant="outlined">
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            ></Typography>
            <Typography variant="h5" component="h2">
              Phòng {props.data.idRoom}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {" "}
              {props.data.status === -1
                ? "Phòng trống"
                : props.data.status === 1
                ? "Đang chờ..."
                : "Đã đủ người"}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={joinRoom}>
              Join Room
            </Button>
          </CardActions>
        </Card>
      )}
    </Grid>
  );
}
