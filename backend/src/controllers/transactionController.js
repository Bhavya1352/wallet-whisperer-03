const Transaction = require("../models/Transaction");

// Get all transactions
exports.getTransactions = async (req, res) => {
  const transactions = await Transaction.find({ userId: req.user._id });
  res.json(transactions);
};

// Add new transaction
exports.addTransaction = async (req, res) => {
  const { type, category, amount, date } = req.body;
  const transaction = await Transaction.create({
    userId: req.user._id,
    type,
    category,
    amount,
    date
  });
  res.status(201).json(transaction);
};
