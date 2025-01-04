const express =  require("express");
const dotenv =  require("dotenv");
const cors =  require("cors");
const authRoutes =  require("./routes/authRoutes.js");

/**
 * midleware for protected routes (or any route that requires authentication, authenticated user)
 */

//import authMiddleware from "./middlewars/authMiddleware.js";

dotenv.config();

const app = express();

const allowedOrigins = process.env.ALLOWED_ORIGINS.split(",");

// Configure CORS
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


app.use(express.json());

app.use("/api/auth", authRoutes);



app.get("/", (req, res) => {
  res.send("Dev Poll server side running!");
});

module.exports = app;
