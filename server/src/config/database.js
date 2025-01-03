const mysql =  require('mysql');
const dotenv =  require('dotenv');

require("dotenv").config();


const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

db.connect((err) => {
    if (err) {
        console.log("Error", err.message);
        return;
    }
    console.log("Connected to Mysql Datbase");
})

module.exports = db;