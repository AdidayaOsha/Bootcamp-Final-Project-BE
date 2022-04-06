const mysql = require("mysql");

const db = mysql.createConnection({
  hostname: "localhost",
  user: "root",
  password: "",
  database: "bootcamp_group_1",
  port: 3306,
  multipleStatements: true,
});

db.connect((err) => {
  if (err) {
    return console.log(`Error: ${err.message}`);
  }
  console.log(`CONNECTED TO MYSQL SERVER`);
});

module.exports = { db };
