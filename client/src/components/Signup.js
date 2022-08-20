// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
// import TextField from "@mui/material/TextField";
// import Link from "@mui/material/Link";
// import Grid from "@mui/material/Grid";
// import Box from "@mui/material/Box";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
// import { createTheme, ThemeProvider } from "@mui/material/styles";

// function Copyright(props) {
//   return (
//     <Typography
//       variant="body2"
//       color="text.secondary"
//       align="center"
//       {...props}
//     >
//       {"Copyright © "}
//       <Link color="inherit" href="https://github.com/minbok-1998">
//         Hyeyeong Lee
//       </Link>{" "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

// const theme = createTheme();

// function Signup() {
//   const navigate = useNavigate();

//   const [userId, setUserId] = useState("");
//   const [userPw, setUserPw] = useState("");

//   const handleUserIdValueChange = (e) => {
//     setUserId(e.target.value);
//   };
//   const handleUserPwValueChange = (e) => {
//     setUserPw(e.target.value);
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     const result = await singup();
//     console.log(result);
//     setUserId("");
//     setUserPw("");
//   };

//   const singup = async () => {
//     const url = "/api/auth/signup";

//     const val = {
//       userId,
//       userPw,
//     };

//     const result = await axios
//       .post(url, val, {
//         headers: {
//           "content-type": "application/json",
//         },
//       })
//       .then((res) => {
//         alert(res.data.msg);
//         navigate("/Login");
//       })
//       .catch((err) => {
//         alert(err.response.data.msg);
//       });
//     return result;
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         <Box
//           sx={{
//             marginTop: 8,
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//           }}
//         >
//           <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
//             <LockOutlinedIcon />
//           </Avatar>
//           <Typography component="h1" variant="h5">
//             Sign up
//           </Typography>
//           <Box component="form" noValidate sx={{ mt: 3 }}>
//             <Grid container spacing={2}>
//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   id="id"
//                   label="ID"
//                   name="id"
//                   autoComplete="id"
//                   value={userId}
//                   onChange={handleUserIdValueChange}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   name="password"
//                   label="Password"
//                   type="password"
//                   id="password"
//                   autoComplete="new-password"
//                   value={userPw}
//                   onChange={handleUserPwValueChange}
//                 />
//               </Grid>
//             </Grid>
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2 }}
//               onClick={handleFormSubmit}
//             >
//               Sign Up
//             </Button>
//             <Grid container justifyContent="flex-end">
//               <Grid item>
//                 <Link href="/login" variant="body2">
//                   Already have an account? Sign in
//                 </Link>
//               </Grid>
//             </Grid>
//           </Box>
//         </Box>
//         <Copyright sx={{ mt: 5 }} />
//       </Container>
//     </ThemeProvider>
//   );
// }

// export default Signup;

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

    const result = await axios.post(url, val, {
      headers: {
        "content-type": "application/json",
      },
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
