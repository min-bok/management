const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "./upload" });
const connection = require("../config");

router.get("/", async (req, res) => {
  let sql = "SELECT * FROM CUSTOMER WHERE isDeleted = 0";
  try {
    const result = await connection.query(sql);
    res.send(result[0]);
  } catch (err) {
    res.send("err");
  }
});

router.post("/", upload.single("image"), async (req, res) => {
  let sql = "INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, ?, ?, now(), 0)";
  let image = "/image/" + req.file.filename;
  let { name, birthday, gender, job } = req.body;
  let params = [image, name, birthday, gender, job];

  try {
    const result = await connection.query(sql, params);
    res.send(result);
  } catch (err) {
    res.send(null);
  }
});

router.delete("/:id", async (req, res) => {
  let sql = "UPDATE CUSTOMER SET isDeleted = 1 WHERE id = ?";
  let params = [req.params.id];

  try {
    const result = await connection.query(sql, params);
    res.send(result);
  } catch (err) {
    res.send(null);
  }
});

router.put("/:id", upload.single("image"), async (req, res) => {
  const id = req.params.id;
  let sql = `UPDATE CUSTOMER SET image = ?,name = ?,birthday = ?,gender = ?,job = ?WHERE id = ?`;
  let { name, birthday, gender, job } = req.body;
  let image = "/image/" + req.file.filename;
  let params = [image, name, birthday, gender, job, id];

  try {
    const result = await connection.query(sql, params);
    res.send(result);
  } catch (err) {
    res.send(null);
  }
});

module.exports = router;
