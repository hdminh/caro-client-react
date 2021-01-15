import React, { useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import Button from "@material-ui/core/Button";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { getUserId } from "../api/authService";
import { Redirect } from "react-router-dom";
import VisibilityIcon from '@material-ui/icons/Visibility';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    width: "100%"
  },
});

const getWinnerStatus = (row) => {
  let status = "Chưa xác định";
  
  if (row.winner) {
    if (getUserId() === JSON.stringify(row.winner)) status = "Thắng"
    else if (row.winner == 0) status = "Hòa"
    else if (row.winner == -1) status = "Chưa xác định"
    else if (status !== null) status = "Thua"
  }
  return status;
}

export default function MatchTable(props) {
  const classes = useStyles();
  const [redirect, setRedirect] = useState(false);
  const [id, setId] = useState("");

  const handleClick = (row) => {
    setId(row._id)
    setRedirect(true)
  };

  return (
    <div>
      {redirect ? (
        <Redirect to={"/detail/" + id}  />
      ) : (
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Kết quả</StyledTableCell>
              <StyledTableCell>Trạng thái</StyledTableCell>
              <StyledTableCell>Số nước đi</StyledTableCell>
              <StyledTableCell>Tin nhắn</StyledTableCell>
              <StyledTableCell align="right">Xem lịch sử</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {props.data &&
              props.data.map((row) => (
                <StyledTableRow key={row._id}>
                  <StyledTableCell align="left"> {row._id} </StyledTableCell>
                  <StyledTableCell>
                    {getWinnerStatus(row)}
                  </StyledTableCell>
                  <StyledTableCell>
                    {row.status === 1
                      ? row.status === 2
                        ? "Playing"
                        : "Finished"
                      : "Waiting"}
                  </StyledTableCell>
                  <StyledTableCell>
                    {row.history.length}
                  </StyledTableCell>
                  <StyledTableCell>
                    {row.chat.length}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Button onClick={() => handleClick(row)}>
                      <VisibilityIcon />
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
