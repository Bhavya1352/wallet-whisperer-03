// backend/src/server.js
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.send("API is running...");
});

// DB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${5000}`));
// const authRoutes = require("./routes/authroutes.js");
const authRoutes = require("../routes/authroutes.js");
app.use("/api/auth", authRoutes);

// app.use("/api/auth", authRoutes);
const transactionRoutes = require("./routes/transactionRoutes.js");
app.use("/api/transactions", transactionRoutes);

