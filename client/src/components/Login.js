import React, { useEffect, useState } from "react";
import axios from "axios";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";

function Login() {
  // const [idx, setIdx] = useState("");

  // history.pus;

  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, []);

  const handleUserIdValueChange = (e) => {
    setUserId(e.target.value);
  };
  const handleUserPwValueChange = (e) => {
    setUserPw(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const result = await loginCheck();
    console.log(result);
    setUserId("");
    setUserPw("");
  };

  const loginCheck = async () => {
    const url = "/api/auth/login";

    const val = {
      userId,
      userPw,
    };

    const result = await axios
      .post(url, val, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then(function (res) {
        const msg = res.data.msg;
        const AccessToken = res.data.AccessToken;
        // const RefreshToken = res.data.RefreshToken;
        alert(msg);
        localStorage.setItem("token", AccessToken);
        window.location.reload();

        res.send(AccessToken);
      })
      .catch((err) => {
        alert(err.response.data.msg);
      });

    return result;
  };

  const logout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      localStorage.removeItem("token");
      setIsLogin(false);
      window.location.reload();
    }
  };

  return (
    <>
      {isLogin ? (
        <Button variant="contained" type="submit" onClick={logout}>
          LOGOUT
        </Button>
      ) : (
        <form>
          <TextField
            id="standard-basic"
            label="Standard"
            variant="standard"
            value={userId}
            onChange={handleUserIdValueChange}
            required
          />
          <TextField
            id="standard-basic"
            label="Standard"
            variant="standard"
            type="password"
            value={userPw}
            onChange={handleUserPwValueChange}
            required
          />
          <Button variant="contained" type="submit" onClick={handleFormSubmit}>
            LOGIN
          </Button>
        </form>
      )}
    </>
  );
}

export default Login;
