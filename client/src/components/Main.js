import { Paper } from "@mui/material";
import { Table } from "@mui/material";
import { TableHead } from "@mui/material";
import { TableBody } from "@mui/material";
import { TableRow } from "@mui/material";
import { TableCell } from "@mui/material";
import { withStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import axios from "axios";
import Customer from "./Customer";
import CustomerAdd from "./CustomerAdd";
import Signup from "./Signup";
import Login from "./Login";
import Header from "./Header";

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

function Main(props) {
  const { classes } = props;
  const [customers, setCustomers] = useState("");

  const stateRefresh = () => {
    setCustomers("");

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

  return (
    <div>
      <Header />
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
              <TableCell>수정</TableCell>
              <TableCell>삭제</TableCell>
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
                  <p>로딩중</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>

      <CustomerAdd stateRefresh={stateRefresh} />
      <Signup></Signup>
      {/* <Login></Login> */}
    </div>
  );
}

export default withStyles(styles)(Main);
