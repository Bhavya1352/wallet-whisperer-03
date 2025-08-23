// backend/src/server.js
require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// SUPER DETAILED LOGGING
app.use((req, res, next) => {
  const timestamp = new Date().toLocaleString();
  console.log(`\n🔥🔥🔥 ${timestamp} - ${req.method} ${req.path} 🔥🔥🔥`);
  
  if (req.headers.authorization) {
    console.log('🔑 Auth Header Present:', req.headers.authorization.substring(0, 20) + '...');
  }
  
  if (req.body && Object.keys(req.body).length > 0) {
    console.log('📝 REQUEST BODY:');
    console.log(JSON.stringify(req.body, null, 2));
  }
  
  // Log response
  const originalSend = res.send;
  res.send = function(data) {
    console.log('📤 RESPONSE:', typeof data === 'string' ? data.substring(0, 100) + '...' : 'JSON Response');
    console.log('═'.repeat(60));
    return originalSend.call(this, data);
  };
  
  next();
});

// Routes
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ADMIN ROUTES - View all data
app.get("/api/admin/users", async (req, res) => {
  try {
    const User = require("./models/User");
    const users = await User.find().select("-password");
    console.log(`👥 ADMIN: Found ${users.length} users`);
    res.json({ success: true, count: users.length, users });
  } catch (error) {
    console.error('❌ Admin Users Error:', error.message);
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/admin/transactions", async (req, res) => {
  try {
    const Transaction = require("./models/Transaction");
    const transactions = await Transaction.find().populate("userId", "name email");
    console.log(`💰 ADMIN: Found ${transactions.length} transactions`);
    
    // Log each transaction
    transactions.forEach((t, i) => {
      console.log(`${i+1}. ${t.type.toUpperCase()}: $${t.amount} - ${t.description} by ${t.userId?.name}`);
    });
    
    res.json({ success: true, count: transactions.length, transactions });
  } catch (error) {
    console.error('❌ Admin Transactions Error:', error.message);
    res.status(500).json({ message: error.message });
  }
});

// Import routes
const authRoutes = require("./routes/authroutes.js");
const transactionRoutes = require("./routes/transactionRoutes.js");

app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);

// DB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    console.log("🔍 SUPER DETAILED LOGGING ACTIVE");
    console.log("📊 Check entries at: http://localhost:5000/api/admin/transactions");
  })
  .catch((err) => console.error("❌ MongoDB Error:", err));

// Start server
const PORT = process.env.PORT || 5000;

// For Vercel deployment
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log("🎯 Add transaction via frontend to see entries here!");
  });
}

// Export for Vercel
module.exports = app;