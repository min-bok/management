import React from "react";
import { post } from "axios";
import { Dialog } from "@mui/material";
import { DialogActions } from "@mui/material";
import { DialogTitle } from "@mui/material";
import { DialogContent } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { withStyles } from "@mui/styles";

// 사진 안 나옴
// 추가하면 고객 추가 하면 에러남, 재 접속하면 추가되어있음
// Error occurred while proxying request localhost:3000/api/customers to http://localhost:5000/
// 함수형으로 바꿔보기

const styles = (theme) => ({
  hidden: {
    display: "none",
  },
});

class CustomerAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      userName: "",
      birthday: "",
      gender: "",
      job: "",
      fileName: "",
      open: false,
    };
  }

  hadleFormSubmit = (e) => {
    e.preventDefault();
    this.addCustomer().then((response) => {
      console.log(response);
      this.props.stateRefresh();
    });
    this.setState({
      file: null,
      userName: "",
      birthday: "",
      gender: "",
      job: "",
      fileName: "",
      open: false,
    });
  };

  handleFileChange = (e) => {
    this.setState({
      file: e.target.files[0],
      fileName: e.target.value,
    });
  };

  hadleValueChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  };

  addCustomer = () => {
    const url = "/api/customers";
    const formData = new FormData();
    formData.append("image", this.state.file);
    formData.append("name", this.state.userName);
    formData.append("birthday", this.state.birthday);
    formData.append("gender", this.state.gender);
    formData.append("job", this.state.job);
    const config = {
      Headers: {
        "content-type": "multipart/form-data",
      },
    };
    return post(url, formData, config);
  };

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({
      file: null,
      userName: "",
      birthday: "",
      gender: "",
      job: "",
      fileName: "",
      open: false,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={this.handleClickOpen}
        >
          고객 추가하기
        </Button>
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle>고객 추가</DialogTitle>
          <DialogContent>
            <input
              className={classes.hidden}
              accept="image/*"
              id="raised-button-file"
              type="file"
              file={this.state.file}
              value={this.state.fileName}
              onChange={this.handleFileChange}
            />
            <label htmlFor="raised-button-file">
              <Button
                variant="contained"
                color="primary"
                component="span"
                name="file"
              >
                {this.state.fileName === ""
                  ? "프로필 이미지 선택"
                  : this.state.fileName}
              </Button>
            </label>
            <br />
            <TextField
              label="이름"
              type="text"
              name="userName"
              value={this.state.userName}
              onChange={this.hadleValueChange}
            />
            <TextField
              label="생년월일"
              type="text"
              name="birthday"
              value={this.state.birthday}
              onChange={this.hadleValueChange}
            />
            <TextField
              label="성별"
              type="text"
              name="gender"
              value={this.state.gender}
              onChange={this.hadleValueChange}
            />
            <TextField
              label="직업"
              type="text"
              name="job"
              value={this.state.job}
              onChange={this.hadleValueChange}
            />
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="primary"
              onClick={this.hadleFormSubmit}
            >
              추가
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={this.handleClose}
            >
              닫기
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      // <form onSubmit={this.hadleFormSubmit}>
      //   <h1>고객 추가</h1>
      // 프로필 이미지:
      // <input
      //   type="file"
      //   name="file"
      //   file={this.state.file}
      //   value={this.state.fileName}
      //   onChange={this.handleFileChange}
      // />
      // 이름 :
      // <input
      //   type="text"
      //   name="userName"
      //   value={this.state.userName}
      //   onChange={this.hadleValueChange}
      // />
      // 생년월일:
      // <input
      //   type="text"
      //   name="birthday"
      //   value={this.state.birthday}
      //   onChange={this.hadleValueChange}
      // />
      // 성별:
      // <input
      //   type="text"
      //   name="gender"
      //   value={this.state.gender}
      //   onChange={this.hadleValueChange}
      // />
      // 직업:
      // <input
      //   type="text"
      //   name="job"
      //   value={this.state.job}
      //   onChange={this.hadleValueChange}
      // />
      //   <button type="submit">추가하기</button>
      // </form>
    );
  }
}

// import React, { useCallback, useState } from "react";
// import { post } from "axios";
// // import { response } from "express";

// function CustomerAdd() {
//   const [file, setFile] = useState(null);
//   const [userName, setUserName] = useState("");
//   const [birthday, setBirthday] = useState("");
//   const [gender, setGender] = useState("");
//   const [job, setJob] = useState("");
//   const [fileName, setFileName] = useState("");

//   const hadleFormSubmit = (e) => {
//     e.preventDefault();
//     addCustomer().then((response) => {
//       console.log(response.data);
//     });
//   };

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//     setFileName(e.target.value);
//   };

//   const hadleValueChange = useCallback((e) => {
//     let nextState = {};
//     nextState[e.target.name] = e.target.value;

//     setUserName(nextState);
//     // setBirthday(nextState);
//     // setGender(nextState);
//     // setJob(nextState);

//     console.log(nextState);
//   }, []);

//   const addCustomer = () => {
//     const url = "/api/customers";
//     const formData = new FormData();
//     formData.append("image", file);
//     // formData.append("name", userName);
//     // formData.append("birthday", birthday);
//     // formData.append("gender", gender);
//     // formData.append("job", job);
//     const config = {
//       Headers: {
//         "content-type": "multipart/form-data",
//       },
//     };
//     return post(url, formData, config);
//   };

//   return (
// <form onSubmit={hadleFormSubmit}>
//   <h1>고객 추가</h1>
//   프로필 이미지:
//   <input
//     type="file"
//     name="file"
//     file={file}
//     value={fileName}
//     onChange={handleFileChange}
//   />
//   이름 :
//   <input
//     type="text"
//     name="userName"
//     value={userName}
//     onChange={hadleValueChange}
//   />
//   {/* 생년월일:
//   <input
//     type="text"
//     name="birthday"
//     value={birthday}
//     onChange={hadleValueChange}
//   /> */}
//   {/* 성별:
//   <input
//     type="text"
//     name="gender"
//     value={gender}
//     onChange={hadleValueChange}
//   />
//   직업:
//   <input type="text" name="job" value={job} onChange={hadleValueChange} />
//   <button type="submit">추가하기</button> */}
// </form>
//   );
// }

export default withStyles(styles)(CustomerAdd);
