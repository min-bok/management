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
app.put("/api/customers/:id", upload.single("image"), async (req, res) => {
  const id = req.params.id;
  let sql = `UPDATE CUSTOMER SET image = ?,name = ?,birthday = ?,gender = ?,job = ?WHERE id = ?`;
  let { name, birthday, gender, job } = req.body;
  let image = "/image/" + req.file.filename;
  let params = [image, name, birthday, gender, job, id];
  await connection.query(sql, params);
});

// 회원가입
app.post("/api/signup", async (req, res) => {
  let sql = `INSERT INTO SINGUP VALUES (null, ?, ?)`;
  let { userID, userPW } = req.body;
  let params = [userID, userPW];

  try {
    const result = await connection.query(sql, params);
  } catch (err) {
    res.send(null);
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
