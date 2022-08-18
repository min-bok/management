import React from "react";
import { post } from "axios";
import { Dialog } from "@mui/material";
import { DialogActions } from "@mui/material";
import { DialogTitle } from "@mui/material";
import { DialogContent } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { withStyles } from "@mui/styles";
import { useState } from "react";

const styles = (theme) => ({
  hidden: {
    display: "none",
  },
});

function CustomerAdd(props) {
  const { classes } = props;

  const [file, setFile] = useState(null);
  const [userName, setUserName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [job, setJob] = useState("");
  const [fileName, setFileName] = useState("");
  const [open, setOpen] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    addCustomer()
      .then((res) => {
        console.log(res.data);
        props.stateRefresh();
      })
      .catch((err) => {
        alert(err.response.data.error);
      });
    setFile(null);
    setUserName("");
    setBirthday("");
    setGender("");
    setJob("");
    setFileName("");
    setOpen(false);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.value);
  };

  const handleUserNameValueChange = (e) => {
    setUserName(e.target.value);
  };
  const handleBirthdayValueChange = (e) => {
    setBirthday(e.target.value);
  };

  const handleGenderValueChange = (e) => {
    setGender(e.target.value);
  };
  const handleJobValueChange = (e) => {
    setJob(e.target.value);
  };

  const addCustomer = () => {
    const url = "/api/customers";
    const formData = new FormData();
    formData.append("image", file);
    formData.append("name", userName);
    formData.append("birthday", birthday);
    formData.append("gender", gender);
    formData.append("job", job);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    return post(url, formData, config).catch((err) => {
      if (err.response.status === 403) {
        alert(err.response.data.error);
        localStorage.removeItem("token");
        window.location.reload();
      } else {
        alert(err.response.data.error);
      }
      props.stateRefresh();
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setFile(null);
    setUserName("");
    setBirthday("");
    setGender("");
    setJob("");
    setFileName("");
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        고객 추가하기
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>고객 추가</DialogTitle>
        <DialogContent>
          <input
            className={classes.hidden}
            accept="image/*"
            id="raised-button-file"
            type="file"
            file={file}
            value={fileName}
            onChange={handleFileChange}
          />
          <br />
          <label htmlFor="raised-button-file">
            <Button
              variant="contained"
              color="primary"
              component="span"
              name="file"
            >
              {fileName === "" ? "프로필 이미지 선택" : fileName}
            </Button>
          </label>
          <br />
          <TextField
            label="이름"
            type="text"
            name="userName"
            value={userName}
            onChange={handleUserNameValueChange}
          />
          <br />
          <TextField
            label="생년월일"
            type="text"
            name="birthday"
            value={birthday}
            onChange={handleBirthdayValueChange}
          />
          <br />
          <TextField
            label="성별"
            type="text"
            name="gender"
            value={gender}
            onChange={handleGenderValueChange}
          />
          <br />
          <TextField
            label="직업"
            type="text"
            name="job"
            value={job}
            onChange={handleJobValueChange}
          />
          <br />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={handleFormSubmit}
          >
            추가
          </Button>
          <Button variant="outlined" color="primary" onClick={handleClose}>
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default withStyles(styles)(CustomerAdd);
