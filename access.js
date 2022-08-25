import jwt from "jsonwebtoken";

const SECRET_KEY =
  "d7dc0a02ab84686fa1da76896332901382c50372692bf317c80bcf5858ebae50b2934c5d30b00b308d0966385d25e6bc";

const AccessToken = (data) => {
  const result = jwt.sign(
    {
      type: "JWT",
      id: data,
    },
    SECRET_KEY,
    {
      expiresIn: "1s",
      issuer: "minbok",
    }
  );

  return result;
};

export default AccessToken;
