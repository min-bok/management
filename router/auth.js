const express = require("express");
const router = express.Router();
const connection = require("../config");

router.post("/signup", async (req, res) => {
  let sql = `INSERT INTO SINGUP VALUES (null, ?, ?)`;
  let { userID, userPW } = req.body;
  let params = [userID, userPW];

  console.log(`test ${[params]}`);

  try {
    const result = await connection.query(sql, params);
    res.send(result);
  } catch (err) {
    res.send(null);
  }
});

module.exports = router;
