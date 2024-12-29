const mysql = require('mysql');
const dotenv = require('dotenv');
// console.log("Current directory:", process.cwd());

dotenv.config({ path: "server/.env" });


const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

db.connect((err) => {
    if (err) {
        console.log("Error", err.message);
        return;
    }
    console.log("Connected to Mysql Datbase");
})

module.exports = db;