const fs = require("fs");
const mysql = require("mysql2/promise");
const data = fs.readFileSync("./database.json");
const conf = JSON.parse(data);

const pool = mysql.createPool({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database,
});

module.exports = pool;

// mysql2 doc
// https://rat2.tistory.com/8
