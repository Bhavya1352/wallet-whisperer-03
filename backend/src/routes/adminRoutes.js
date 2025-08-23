const express = require("express");
const User = require("../models/User");
const Transaction = require("../models/Transaction");
const router = express.Router();

// Get all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json({
      success: true,
      count: users.length,
      users: users
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all transactions
router.get("/transactions", async (req, res) => {
  try {
    const transactions = await Transaction.find().populate("userId", "name email");
    res.json({
      success: true,
      count: transactions.length,
      transactions: transactions
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get specific user's transactions
router.get("/user/:userId/transactions", async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.params.userId });
    const user = await User.findById(req.params.userId).select("name email");
    
    res.json({
      success: true,
      user: user,
      count: transactions.length,
      transactions: transactions
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;