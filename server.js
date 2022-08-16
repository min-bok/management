const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;
const connection = require("./config");

const routerApi = require("./router");
// const CustomerApiId = require("./api/CustomerApiId");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const multer = require("multer");
const upload = multer({ dest: "./upload" });

// db 연결해제
// connection.end();

app.use("/api", routerApi);
app.use("/image", express.static("./upload"));

// 회원가입
// app.post("/api/auth/signup", async (req, res) => {
//   let sql = `INSERT INTO SINGUP VALUES (null, ?, ?)`;
//   let { userID, userPW } = req.body;
//   let params = [userID, userPW];

//   console.log(`test ${[params]}`);

//   try {
//     const result = await connection.query(sql, params);
//   } catch (err) {
//     res.send(null);
//   }
// });

app.listen(port, () => console.log(`Listening on port ${port}`));
