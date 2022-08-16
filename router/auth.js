const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  let sql = `INSERT INTO SINGUP VALUES (null, ?, ?)`;
  let { userID, userPW } = req.body;
  let params = [userID, userPW];

  try {
    const result = await connection.query(sql, params);
  } catch (err) {
    res.send(null);
  }
});
