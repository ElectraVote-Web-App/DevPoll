const express =  require("express");
const dotenv =  require("dotenv");
const cors =  require("cors");

const authRoutes =  require("./routes/authRoutes.js");
const pollRoutes = require("./routes/pollRoutes");

/**
 * midleware for protected routes (or any route that requires authentication, authenticated user)
 */

//import authMiddleware from "./middlewars/authMiddleware.js";

dotenv.config();
const app = express();

const allowedOrigins = process.env.ALLOWED_ORIGINS.split(",");

// Configure CORS
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
  })
);








// Routes
app.use("/api/auth", authRoutes);
app.use("/api/polls", pollRoutes);
// localhost:PORT/api/polls
// localhost:PORT/api/polls/:id

app.get("/", (req, res) => {
  res.send("Dev Poll server side running !");
});


module.exports = app;
