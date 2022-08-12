const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;
const connection = require("./config");
const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const multer = require("multer");
const upload = multer({ dest: "./upload" });

// db 연결해제
// connection.end();

app.route("/api/customers").get(async (req, res) => {
  let sql = "SELECT * FROM CUSTOMER WHERE isDeleted = 0";
  try {
    const result = await connection.query(sql);
    res.send(result[0]);
  } catch (err) {
    res.send(null);
  }
});

// app.get("/api/customers", async (req, res) => {
//   let sql = "SELECT * FROM CUSTOMER WHERE isDeleted = 0";
//   try {
//     const result = await connection.query(sql);
//     res.send(result[0]);
//   } catch (err) {
//     res.send(null);
//   }
// });

app.use("/image", express.static("./upload"));

app.post("/api/customers", upload.single("image"), async (req, res) => {
  let sql = "INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, ?, ?, now(), 0)";
  let image = "/image/" + req.file.filename;
  let name = req.body.name;
  let birthday = req.body.birthday;
  let gender = req.body.gender;
  let job = req.body.job;
  let params = [image, name, birthday, gender, job];

  try {
    const result = await connection.query(sql, params);
    res.send(result);
  } catch (err) {
    res.send(null);
  }
});

app.delete("/api/customers/:id", async (req, res) => {
  let sql = "UPDATE CUSTOMER SET isDeleted = 1 WHERE id = ?";
  let params = [req.params.id];

  try {
    const result = await connection.query(sql, params);
    res.send(result);
  } catch (err) {
    res.send(null);
  }
});

// 회원 정보 수정
app.put("/api/customers/:id", upload.single("image"), (req, res) => {
  const id = req.params.id;
  let sql = `
  UPDATE 
  CUSTOMER 
  SET 
  image = ?,
  name = ?,
  birthday = ?,
  gender = ?,
  job = ?
  WHERE id = ?`;

  let image = "/image/" + req?.file?.filename;
  let name = req.body?.name ?? "";
  let birthday = req.body?.birthday ?? "";
  let gender = req.body?.gender ?? "";
  let job = req.body?.job ?? "";
  let params = [image, name, birthday, gender, job, id];
  connection.query(sql, params, (err, rows, fields) => {
    console.log(`rows ${birthday}`);
    console.log(`rows ${name}`);
    console.log(`rows ${gender}`);
    res.send(rows);
  });
});

// 회원가입
app.post("/api/signup", (req, res) => {
  let sql = `INSERT INTO SINGUP VALUES (null, ?, ?)`;
  let userID = req.body.userID;
  let userPW = req.body.userPW;
  let params = [userID, userPW];

  console.log(params);
  try {
    connection.query(sql, params, (err, rows, fields) => {
      res.send({
        statusCode: 1,
        data: {},
      });
    });
  } catch (err) {
    res.send({
      statusCode: -1,
      data: {},
    });
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
