import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 345,
  },
});

export default function UserCard(props) {
    const classes = useStyles();
    const handleButtonReady = () =>{
      props.joinMatchSock(props.user);
    }

    return (
      <div>
      {props.user && <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.user.avatar}
          title={props.user.firstname}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          {props.user.firstname} {props.user.lastname} 
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
           Thắng: {props.user.win}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Cup: {props.user.cup}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
           Số trận đã chơi: {props.user.totalmatch}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    }
    </div>
  );
}
