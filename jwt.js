require("dotenv").config();
const jwt = require("jsonwebtoken");

// 토큰 발급
const token = () => {
  return {
    access(id) {
      return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "15m",
      });
    },
    refresh(id) {
      return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "180days",
      });
    },
  };
};

// https://webaura.tistory.com/entry/Nodejs-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85-JWT-Token
