import "./App.css";
import Customer from "./components/Customer";
import { Paper } from "@mui/material";
import { Table } from "@mui/material";
import { TableHead } from "@mui/material";
import { TableBody } from "@mui/material";
import { TableRow } from "@mui/material";
import { TableCell } from "@mui/material";
import { withStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import CustomerAdd from "./components/CustomerAdd";

const styles = {
  root: {
    width: "100%",
    overflowX: "auto",
  },
  table: {
    minWidth: 1080,
  },
  process: {
    margin: 20,
  },
};

function App(props) {
  const { classes } = props;
  const [customers, setCustomers] = useState("");
  // const [comleted, setCompleted] = useState(0);

  const stateRefresh = () => {
    setCustomers("");
    // setCompleted(0);

    axios
      .get("/api/customers")
      .then((data) => setCustomers(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get("/api/customers")
      .then((data) => setCustomers(data))
      .catch((err) => console.log(err));
  }, []);

  // useEffect(() => {
  //   setInterval(() => {
  //     setCompleted(comleted >= 100 ? 0 : comleted + 25);
  //   }, 20);
  // }, [comleted]);

  return (
    <div>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>이미지</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>생년월일</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>직업</TableCell>
              <TableCell>설정</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.data ? (
              customers.data.map((customer) => {
                return (
                  <Customer
                    stateRefresh={stateRefresh}
                    key={customer.id}
                    id={customer.id}
                    image={customer.image}
                    name={customer.name}
                    birthday={customer.birthday}
                    gender={customer.gender}
                    job={customer.job}
                  />
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  {/* <CircularProgress
                  className={classes.process}
                  variant="determinate"
                  value={comleted}
                /> */}
                  <p>로딩중</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>

      <CustomerAdd stateRefresh={stateRefresh} />
    </div>
  );
}

export default withStyles(styles)(App);
