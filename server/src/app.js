const express = require("express");
const dotenv = require("dotenv");
var cors = require('cors')
const pollRoutes = require("./routes/pollRoutes");


dotenv.config();
const app = express();
app.use(cors())
app.use(express.json());

// Routes
app.use("/api/polls", pollRoutes);
// localhost:PORT/api/polls
// localhost:PORT/api/polls/:id

app.get("/", (req, res) => {
  res.send("Dev Poll server side running !");
});


module.exports = app;
