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
    // const { setUserID, setUserPW } = nextState;
  };
  const handleUserPwValueChange = (e) => {
    setUserPw(e.target.value);
    // const { setUserID, setUserPW } = nextState;
  };

function aaa () {
  return 
}

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const result = await singup();
    console.log(result);
    setUserId("");
    setUserPw("");
    setOpen(false);
  };

  const singup = async () => {
    const url = "/api/signup";
    const userID = userId;
    const userPW = userPw;

    const val = {
      userID,
      userPW,
    };

    const result = await axios.post(url, val, {
      headers: {
        "content-type": "application/json",
      },
    });
    if (result.data.statusCode != -1) {
      //성공
    } else {
      //실
    }
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

// https://webaura.tistory.com/entry/NodeJS-%EB%A1%9C%EA%B7%B8%EC%9D%B8%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0-%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85%ED%8E%B8
