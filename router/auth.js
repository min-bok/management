const express = require("express");
const router = express.Router();
const connection = require("../config");
const bcrypt = require("bcrypt");
const { has, result } = require("lodash");
const saltRounds = 10;

router.post("/signup", async (req, res) => {
  const sql = `INSERT INTO SINGUP VALUES (null, ?, ?)`;
  const { userID, userPW } = req.body;
  const params = [userID, userPW];
  try {
    bcrypt.hash(params[1], saltRounds, async (err, hash) => {
      params[1] = hash;
      const result = await connection.query(sql, params);
      console.log("회원가입 완료!");
      res.send(result);
    });
  } catch (err) {
    res.send(null);
  }
});

router.post("/login", async (req, res) => {
  const sql = `SELECT * FROM SINGUP WHERE userID = ?;`;
  const { userId, userPw } = req.body;
  const params = [userId, userPw];

  //   console.log(`params ${params[1]}`);

  try {
    console.log("hi");
    const userInfo = await connection.query(sql, params[0]);
    // console.log(`userPW ${userInfo[0][0]["userPW"]}`);

    if (userInfo[0][0] == undefined) {
      console.log("ID가 존재하지 않습니다.");
    } else {
      console.log("존재!");
      bcrypt.compare(params[1], userInfo[0][0]["userPW"], (err, result) => {
        if (result) {
          console.log("비밀번호 일치");
        } else {
          console.log("불일치");
        }
      });

      //   bcrypt.compareSync(userInfo[0][0]["userPW"], hash);
    }

    res.end();
  } catch (err) {
    console.log("err!");
    res.send(null);
  }
});

module.exports = router;

// https://webaura.tistory.com/entry/NodeJS-%EB%A1%9C%EA%B7%B8%EC%9D%B8%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0-%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85%ED%8E%B8
