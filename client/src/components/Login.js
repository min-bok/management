import React, { useEffect, useState } from "react";
import axios from "axios";

function Login() {
  // const [idx, setIdx] = useState("");
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
    } else {
      window.location.reload();
    }
  };

  return (
    <>
      {isLogin ? (
        <button type="submit" onClick={logout}>
          logout
        </button>
      ) : (
        <form>
          <input
            type="text"
            value={userId}
            onChange={handleUserIdValueChange}
            required
          />
          <input
            type="password"
            value={userPw}
            onChange={handleUserPwValueChange}
            required
          />
          <button type="submit" onClick={handleFormSubmit}>
            login
          </button>
        </form>
      )}
    </>
  );
}

export default Login;
