const express = require("express");
const dotenv = require("dotenv");
const db = require("./config/database.js");


dotenv.config();
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Dev Poll server side running !");
});

app.get('/api/polls', (req, res) => {
  db.query("SELECT * FROM polls", (err, result) => {
    if (err) {
      console.log(err.message);
      return res.status(500).send("Internal server error");
    }
    res.json(result);
  });
})

module.exports = app;
