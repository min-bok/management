import express from "express";
import bodyParser from "body-parser";
import { DotenvConfigOptions } from "dotenv";
import routerApi from "./router";
import axios from "axios";

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// db 연결해제
// connection.end();

app.use("/api", routerApi);
app.use("/image", express.static("./upload"));

app.listen(port, () => console.log(`Listening on port ${port}`));
