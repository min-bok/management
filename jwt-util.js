const jwt = require("jsonwebtoken");
const SECRET_KEY =
  "d7dc0a02ab84686fa1da76896332901382c50372692bf317c80bcf5858ebae50b2934c5d30b00b308d0966385d25e6bc";

const AccessToken = jwt.sign(
  {
    type: "JWT",
    id: 2,
  },
  SECRET_KEY,
  {
    expiresIn: "15m",
    issuer: "minbok",
  }
);

console.log("회원가입 완료!");
console.log(`SECRET_KEY ${process.env.SECRET_KEY}`);
console.log(`AccessToken ${AccessToken}`);
// console.log(`RefreshToken ${RefreshToken}`);

//       return res.status(200).json({
//         msg: "회원가입 완료!",
//         AccessToken: AccessToken,
//         RefreshToken: RefreshToken,
//       });
//     });
// } catch (err) {
//   res.status(400).json({
//     msg: "회원가입 과정에서 에러발생!",
//   });
// }
