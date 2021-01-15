import React, { useEffect, useState } from "react";
import { getRanking } from "../api/userService";
import { makeStyles } from "@material-ui/core/styles";
import UserTable from "../components/UserTable";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";

export default function User(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    getUserList();
  }, []);

  const getUserList = () => {
    props.setLoading(true);
    getRanking()
      .then((response) => {
        props.setLoading(false);
        if (response.status < 400) {
          console.log("data", response.data);
          setData(response.data);
        }
      })
      .catch((error) => {
        props.setLoading(false);

        console.log("error", error);
        props.setError("Lấy thông tin ranking không thành công");
      });
  };

  return (
    <TableContainer component={Paper}>
      <UserTable setError={props.setError} data={data} setData={setData} />
    </TableContainer>
  );
}
