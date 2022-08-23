const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();

const routerApi = require("./router");
const { default: axios } = require("axios");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// db 연결해제
// connection.end();

app.use("/api", routerApi);
app.use("/image", express.static("./upload"));

app.listen(port, () => console.log(`Listening on port ${port}`));
