const express =  require("express");
const dotenv =  require("dotenv");
const cors =  require("cors");
const authRoutes =  require("./routes/authRoutes.js");

/**
 * midleware for protected routes (or any route that requires authentication)
 */

//import authMiddleware from "./middlewars/authMiddleware.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);



app.get("/", (req, res) => {
  res.send("Dev Poll server side running!");
});

module.exports = app;
