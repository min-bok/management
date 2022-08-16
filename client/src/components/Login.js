import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");

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

    const result = await axios.post(url, val, {
      headers: {
        "content-type": "application/json",
      },
    });
    return result;
  };

  return (
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
  );
}

export default Login;
