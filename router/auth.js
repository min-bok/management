const express = require("express");
const router = express.Router();
const connection = require("../config");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const jwt = require("jsonwebtoken");
// require("dotenv").config();
const SECRET_KEY =
  "d7dc0a02ab84686fa1da76896332901382c50372692bf317c80bcf5858ebae50b2934c5d30b00b308d0966385d25e6bc";

// 테스트 계정
// testing, test1234

router.post("/signup", async (req, res) => {
  const sql = `INSERT INTO SINGUP VALUES (null, ?, ?)`;
  const { userId, userPw } = req.body;
  const params = [userId, userPw];
  try {
    bcrypt.hash(params[1], saltRounds, async (err, hash) => {
      params[1] = hash;
      const result = await connection.query(sql, params);

      // const AccessToken = jwt.sign(
      //   {
      //     type: "JWT",
      //     id: userId,
      //     pw: userPw,
      //   },
      //   SECRET_KEY,
      //   // process.env.SECRET_KEY
      //   {
      //     expiresIn: "15m",
      //     issuer: "minbok",
      //   }
      // );

      // const RefreshToken = jwt.sign(
      //   {
      //     type: "JWT",
      //     id: userId,
      //     pw: userPw,
      //   },
      //   SECRET_KEY,
      //   {
      //     expiresIn: "14d",
      //     issuer: "minbok",
      //   }
      // );

      // console.log("회원가입 완료!");
      // console.log(`SECRET_KEY ${process.env.SECRET_KEY}`);
      // console.log(`AccessToken ${AccessToken}`);
      // console.log(`RefreshToken ${RefreshToken}`);

      // return res.status(200).json({
      //   msg: "회원가입 완료!",
      //   AccessToken: AccessToken,
      //   RefreshToken: RefreshToken,
      // });
    });
  } catch (err) {
    res.status(400).json({
      msg: "회원가입 과정에서 에러발생!",
    });
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
      return res.status(400).json({
        msg: "존재하지않는 아이디 입니다.",
      });
    } else {
      console.log("존재!");
      bcrypt.compare(params[1], userInfo[0][0]["userPW"], (err, result) => {
        if (result) {
          console.log("비밀번호 일치");

          const AccessToken = jwt.sign(
            {
              type: "JWT",
              id: userId,
              pw: userPw,
            },
            SECRET_KEY,
            // process.env.SECRET_KEY
            {
              expiresIn: "15m",
              issuer: "minbok",
            }
          );

          const RefreshToken = jwt.sign(
            {
              type: "JWT",
              id: userId,
              pw: userPw,
            },
            SECRET_KEY,
            {
              expiresIn: "14d",
              issuer: "minbok",
            }
          );

          // console.log("회원가입 완료!");
          // console.log(`AccessToken ${AccessToken}`);
          // console.log(`RefreshToken ${RefreshToken}`);

          return res.status(200).json({
            msg: "로그인 성공!",
            AccessToken: AccessToken,
            RefreshToken: RefreshToken,
          });
        } else {
          console.log("불일치");
          return res.status(400).json({
            msg: "비밀번호가 일치하지 않습니다.",
          });
        }
      });
    }
  } catch (err) {
    console.log("err!");
    res.send(null);
  }
});

module.exports = router;

// https://webaura.tistory.com/entry/NodeJS-%EB%A1%9C%EA%B7%B8%EC%9D%B8%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0-%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85%ED%8E%B8
