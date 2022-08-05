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
import axios from "axios";

const styles = {
  root: {
    width: "100%",
    overflowX: "auto",
  },
  table: {
    minWidth: 1080,
  },
};

function App(props) {
  const { classes } = props;
  const [customers, setCustomers] = useState("");

  useEffect(() => {
    axios.get("/api/customers").then((data) => setCustomers(data));
  }, []);

  return (
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
          </TableRow>
        </TableHead>
        <TableBody>
          {customers.data
            ? customers.data.map((customer) => {
                return (
                  <Customer
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
            : ""}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default withStyles(styles)(App);
