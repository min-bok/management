import React from "react";
import { post } from "axios";

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
    };
  }

  hadleFormSubmit = (e) => {
    e.preventDefault();
    this.addCustomer().then((response) => {
      console.log(response);
    });
    this.setState({
      file: null,
      userName: "",
      birthday: "",
      gender: "",
      job: "",
      fileName: "",
    });
    window.location.reload();
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
    formData.append("name", this.state.name);
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

  render() {
    return (
      <form onSubmit={this.hadleFormSubmit}>
        <h1>고객 추가</h1>
        프로필 이미지:
        <input
          type="file"
          name="file"
          file={this.state.file}
          value={this.state.fileName}
          onChange={this.handleFileChange}
        />
        이름 :
        <input
          type="text"
          name="userName"
          value={this.state.userName}
          onChange={this.hadleValueChange}
        />
        생년월일:
        <input
          type="text"
          name="birthday"
          value={this.state.birthday}
          onChange={this.hadleValueChange}
        />
        성별:
        <input
          type="text"
          name="gender"
          value={this.state.gender}
          onChange={this.hadleValueChange}
        />
        직업:
        <input
          type="text"
          name="job"
          value={this.state.job}
          onChange={this.hadleValueChange}
        />
        <button type="submit">추가하기</button>
      </form>
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

export default CustomerAdd;
