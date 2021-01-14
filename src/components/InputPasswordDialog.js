import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { joinRoom, setPassword } from "../api/roomService";
import { Redirect } from "react-router-dom";

export default function InputPasswordDialog(props) {
  const [alert, setAlert] = React.useState("");
  const [text, setText] = React.useState("");
  const [redirect, setRedirect] = React.useState(false);
  const [link, setLink] = React.useState("");

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleRedirect = () => {
    if (props.type === "new") {
      setLink("/room/" + props.id);
      setRedirect(true);
    }
    props.setOpen(false);
  };

  const handlePassword = () => {
    if (text === null || text === "") {
      setAlert("Không được để trống!");
    } else {
      setAlert("");
      if (props.type === "new") {
        setPassword(props.id, text)
          .then((res) => {
            if (res.status < 400) {
              setLink("/room/" + props.id);
              props.setOpen(false);
              props.setError(null);
              setRedirect(true);
            }
          })
          .catch((err) => {
            props.setError("Đặt mật khẩu không thành công");
          });
      } else {
        joinRoom(props.id, text)
          .then((res) => {
            props.joinRoomSock(res.data._id);
            setLink("/room/" + res.data._id);
            props.setOpen(false);
            props.setError(null);
            setRedirect(true);
          })
          .catch((err) => {
            props.setError("Vào bàn không thành công");
            setAlert("Mật khẩu sai!");
          });
      }
    }
  };

  const handleChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div>
      {redirect ? (
        <Redirect to={link} />
      ) : (
        <Dialog
          open={props.open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Vào phòng chơi</DialogTitle>
          <DialogContent>
            <DialogContentText>Nhập mật khẩu phòng chơi:</DialogContentText>
            <TextField
              autoFocus
              value={text}
              margin="dense"
              id="password"
              label="Mật khẩu"
              type="password"
              fullWidth
              onChange={handleChange}
            />
          </DialogContent>
          <p>{alert}</p>
          <DialogActions>
            <Button onClick={handleRedirect} color="primary">
              {props.type === "new" ? "Không đặt mật khẩu" : "Thoát"}
            </Button>
            <Button onClick={handlePassword} color="primary">
              {props.type === "new" ? "Đặt mật khẩu" : "Vào phòng"}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}
