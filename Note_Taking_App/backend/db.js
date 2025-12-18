const mysql = require("mysql2/promise");
require("dotenv").config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

db.getConnection()
  .then((connection) => {
    console.log("Database connection SuccessFully!");
    connection.release();
  })
  .catch((err) => {
    console.log("Database connection Failed ! ", err);
  });

module.exports = db;
