// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { withStyles } from "@mui/styles";
// import { Paper } from "@mui/material";
// import { TextField } from "@mui/material";
// import { Button } from "@mui/material";

// function Login() {

//   const [userId, setUserId] = useState("");
//   const [userPw, setUserPw] = useState("");
//   const [isLogin, setIsLogin] = useState(false);

//   useEffect(() => {
//     if (localStorage.getItem("token") === null) {
//       setIsLogin(false);
//     } else {
//       setIsLogin(true);
//     }
//   }, []);

//   const handleUserIdValueChange = (e) => {
//     setUserId(e.target.value);
//   };
//   const handleUserPwValueChange = (e) => {
//     setUserPw(e.target.value);
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     const result = await loginCheck();
//     console.log(result);
//     setUserId("");
//     setUserPw("");
//   };

//   const loginCheck = async () => {
//     const url = "/api/auth/login";

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
//       .then(function (res) {
//         const msg = res.data.msg;
//         const AccessToken = res.data.AccessToken;
//         // const RefreshToken = res.data.RefreshToken;
//         alert(msg);
//         localStorage.setItem("token", AccessToken);
//         window.location.reload();

//         res.send(AccessToken);
//       })
//       .catch((err) => {
//         alert(err.response.data.msg);
//       });

//     return result;
//   };

//   const logout = () => {
//     if (window.confirm("로그아웃 하시겠습니까?")) {
//       localStorage.removeItem("token");
//       setIsLogin(false);
//       window.location.reload();
//     }
//   };

//   return (
//     <>
//       {isLogin ? (
//         <Button variant="contained" type="submit" onClick={logout}>
//           LOGOUT
//         </Button>
//       ) : (
//         <form>
//           <TextField
//             id="standard-basic"
//             label="Standard"
//             variant="standard"
//             value={userId}
//             onChange={handleUserIdValueChange}
//             required
//           />
//           <TextField
//             id="standard-basic"
//             label="Standard"
//             variant="standard"
//             type="password"
//             value={userPw}
//             onChange={handleUserPwValueChange}
//             required
//           />
//           <Button variant="contained" type="submit" onClick={handleFormSubmit}>
//             LOGIN
//           </Button>
//         </form>
//       )}
//     </>
//   );
// }

// export default withStyles(styles)(Login);

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  // const [isLogin, setIsLogin] = useState(false);

  // useEffect(() => {
  //   if (localStorage.getItem("token") === null) {
  //     setIsLogin(false);
  //   } else {
  //     setIsLogin(true);
  //   }
  // }, []);

  const handleUserIdValueChange = (e) => {
    setUserId(e.target.value);
  };
  const handleUserPwValueChange = (e) => {
    setUserPw(e.target.value);
  };

  // const handleSubmit = (event) => {
  // event.preventDefault();
  // const data = new FormData(event.currentTarget);
  // console.log({
  //   email: data.get("email"),
  //   password: data.get("password"),
  // });
  // };

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
        navigate("/");

        res.send(AccessToken);
      })
      .catch((err) => {
        alert(err.response.data.msg);
      });

    return result;
  };

  // const logout = () => {
  //   if (window.confirm("로그아웃 하시겠습니까?")) {
  //     localStorage.removeItem("token");
  //     setIsLogin(false);
  //     window.location.reload();
  //   }
  // };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          {/* 제목 */}
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleFormSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            {/* 아이디 입력 */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="id"
              label="ID"
              name="id"
              autoComplete="id"
              value={userId}
              onChange={handleUserIdValueChange}
              autoFocus
            />
            {/* 비밀번호 입력 */}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={userPw}
              onChange={handleUserPwValueChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
