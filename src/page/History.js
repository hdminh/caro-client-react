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


  return (
    <div>
      <TableContainer component={Paper}>
        <HistoryTable
          setError={props.setError()}
          data={data}
          setOpen={setOpen}
          setHistory={props.setHistory}
          open={open}
        />
      </TableContainer>
    </div>
  );
}
