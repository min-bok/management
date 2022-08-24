import jwt from "jsonwebtoken";

const SECRET_KEY =
  "d7dc0a02ab84686fa1da76896332901382c50372692bf317c80bcf5858ebae50b2934c5d30b00b308d0966385d25e6bc";

const authJWT = (req, res, next) => {
  const token = req.headers.authorization.split("Bearer ")[1]; // header에서 access token을 가져옵니다.

  if (token !== "null") {
    jwt.verify(token, SECRET_KEY, (err) => {
      if (err) {
        res.status(403).json({ error: "인증이 만료되어 로그아웃됩니다." });
      } else {
        next();
      }
    });
  } else {
    res.status(401).json({ error: "로그인이 필요합니다!" });
  }
};

module.exports = authJWT;
// https://backend-intro.vlpt.us/4/01.html
// https://velog.io/@kshired/Express%EC%97%90%EC%84%9C-JWT%EB%A1%9C-%EC%9D%B8%EC%A6%9D%EC%8B%9C%EC%8A%A4%ED%85%9C-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0-Access-Token%EA%B3%BC-Refresh-Token

// 만료기간 끝나면 로그아웃되게
