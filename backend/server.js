const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const connectDb = require("./src/config/db");
const authRoutes = require("./src/routes/authRoutes");
const horseRoutes = require("./src/routes/horseRoutes");

const app = express();

// Connect to database
connectDb();

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/horses", horseRoutes);

// Root route
app.get("/", (req, res) => {
  res.json({ 
    message: "Equine Excellence API", 
    version: "1.0.0",
    endpoints: {
      health: "/api/health",
      auth: "/api/auth",
      horses: "/api/horses"
    }
  });
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Serve frontend build in production (optional)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});