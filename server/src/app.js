const express = require("express");
const dotenv = require("dotenv");


dotenv.config();
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Dev Poll server side running !");
});

module.exports = app;
