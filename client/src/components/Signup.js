import React, { useState } from "react";
import { Dialog } from "@mui/material";
import { DialogActions } from "@mui/material";
import { DialogTitle } from "@mui/material";
import { DialogContent } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import axios from "axios";

function Signup() {
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUserIdValueChange = (e) => {
    setUserId(e.target.value);
  };
  const handleUserPwValueChange = (e) => {
    setUserPw(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const result = await singup();
    console.log(result);
    setUserId("");
    setUserPw("");
    setOpen(false);
  };

  const singup = async () => {
    const url = "/api/auth/signup";

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
      .then(function (response) {
        console.log(`status ${response.data}`);
      });
    return result;
  };

  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        회원가입
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>회원정보 입력</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>회원가입을 진행합니다.</Typography>
          <TextField
            label="아이디"
            type="text"
            name="userID"
            value={userId}
            onChange={handleUserIdValueChange}
          />
          <br />
          <TextField
            label="비밀번호"
            type="text"
            name="userPW"
            value={userPw}
            onChange={handleUserPwValueChange}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={handleFormSubmit}
          >
            회원가입
          </Button>
          <Button variant="outlined" color="primary" onClick={handleClose}>
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Signup;
