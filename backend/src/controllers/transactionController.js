const Transaction = require("../models/Transaction");

// Get all transactions
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user._id });
    
    console.log('\n📊 USER VIEWING TRANSACTIONS:');
    console.log('User:', req.user.name, '(' + req.user.email + ')');
    console.log('Total Transactions:', transactions.length);
    transactions.forEach((t, i) => {
      console.log(`${i+1}. ${t.type.toUpperCase()}: $${t.amount} - ${t.description} (${t.category})`);
    });
    console.log('================================\n');
    
    res.json({ success: true, transactions });
  } catch (error) {
    console.error('Get Transactions Error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Add new transaction
exports.addTransaction = async (req, res) => {
  try {
    const { type, category, amount, description, date } = req.body;
    
    console.log('\n🔥 NEW TRANSACTION ENTRY:');
    console.log('User:', req.user.name, '(' + req.user.email + ')');
    console.log('Type:', type);
    console.log('Amount: $' + amount);
    console.log('Description:', description);
    console.log('Category:', category);
    console.log('Date:', new Date(date).toLocaleDateString());
    console.log('================================\n');
    
    const transaction = await Transaction.create({
      userId: req.user._id,
      type,
      category,
      amount,
      description,
      date
    });
    
    res.status(201).json({ success: true, transaction });
  } catch (error) {
    console.error('Transaction Error:', error);
    res.status(400).json({ message: error.message });
  }
};
