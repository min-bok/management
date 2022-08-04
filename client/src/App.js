import "./App.css";
import Customer from "./components/Customer";
import { Paper } from "@mui/material";
import { Table } from "@mui/material";
import { TableHead } from "@mui/material";
import { TableBody } from "@mui/material";
import { TableRow } from "@mui/material";
import { TableCell } from "@mui/material";
import { withStyles } from "@mui/styles";

const styles = {
  root: {
    width: "100%",
    overflowX: "auto",
  },
  table: {
    minWidth: 1080,
  },
};

const customers = [
  {
    id: 1,
    image: "https://placeimg.com/64/64/1",
    name: "나동빈",
    birthday: "961222",
    gender: "남자",
    job: "대학생",
  },
  {
    id: 2,
    image: "https://placeimg.com/64/64/2",
    name: "이혜영",
    birthday: "980810",
    gender: "여자",
    job: "대학생",
  },
  {
    id: 3,
    image: "https://placeimg.com/64/64/3",
    name: "김범진",
    birthday: "970730",
    gender: "남자",
    job: "대학생",
  },
];

function App(props) {
  const { classes } = props;
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
          {customers.map((customer) => {
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
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default withStyles(styles)(App);
