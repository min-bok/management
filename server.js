const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;
const connection = require("./config");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const multer = require("multer");
// const { Router } = require("express");
const upload = multer({ dest: "./upload" });

// async await 문법으로 바꿔보기
app.get("/api/customers", (req, res) => {
  connection.query(
    "SELECT * FROM CUSTOMER WHERE isDeleted = 0",
    (err, rows, fields) => {
      res.send(rows);
    }
  );
});

app.use("/image", express.static("./upload"));

app.post("/api/customers", upload.single("image"), (req, res) => {
  console.log(req);
  let sql = "INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, ?, ?, now(), 0)";
  let image = "/image/" + req.file.filename;
  let name = req.body.name;
  let birthday = req.body.birthday;
  let gender = req.body.gender;
  let job = req.body.job;
  let params = [image, name, birthday, gender, job];
  connection.query(sql, params, (err, rows, fields) => {
    console.log(err);
    console.log(fields);
    res.send(rows);
  });
});

app.delete("/api/customers/:id", (req, res) => {
  let sql = "UPDATE CUSTOMER SET isDeleted = 1 WHERE id = ?";
  let params = [req.params.id];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
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
app.post("/api/signup", async (req, res) => {
  let sql = `INSERT INTO SINGUP VALUES (null, ?, ?)`;
  let userID = req.body.userID;
  let userPW = req.body.userPW;
  let params = [userID, userPW];

  console.log(params);
  try {
    let a = 3;
    a = 4;
    console.log();
  } catch (err) {
    console.log(err);
    return res.send({
      statusCode: -1,
      data: {},
    });
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
