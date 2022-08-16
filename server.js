const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;
// const connection = require("./config");

// const cors = require("cors");
// const session = require("express-session");
// const cookieParser = require("cookie-parser");

const routerApi = require("./router");
const { default: axios } = require("axios");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// const multer = require("multer");
// const upload = multer({ dest: "./upload" });

// db 연결해제
// connection.end();

app.use("/api", routerApi);
app.use("/image", express.static("./upload"));

// axios.defaults.withCredentials = true;

// app.use(cors());

// app.use(
//   cors({
//     origin: true,
//     credentials: true,
//   })
// );
// app.use(cookieParser());
// app.use(
//   session({
//     key: "loginData",
//     secret: "testSecret",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       expires: 60 * 60 * 24,
//     },
//   })
// );

app.listen(port, () => console.log(`Listening on port ${port}`));
