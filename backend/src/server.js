// backend/src/server.js
require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// LIVE MONITORING
app.use((req, res, next) => {
  console.log(`\n🔥 ${new Date().toLocaleString()} - ${req.method} ${req.path}`);
  if (req.body && Object.keys(req.body).length > 0) {
    console.log('👤 USER DATA:', JSON.stringify(req.body, null, 2));
    console.log('═'.repeat(50));
  }
  next();
});

// DEFINE SCHEMAS DIRECTLY IN SERVER
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["income", "expense"], required: true },
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  date: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
});

// REGISTER MODELS
const User = mongoose.model("User", userSchema);
const Transaction = mongoose.model("Transaction", transactionSchema);

// Routes
app.get("/", (req, res) => {
  res.json({ message: "🚀 Wallet Whisperer API is running!" });
});

// ADMIN ROUTES
app.get("/api/admin/users", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    console.log(`📊 Found ${users.length} users`);
    res.json({
      success: true,
      count: users.length,
      users: users
    });
  } catch (error) {
    console.error('Users Error:', error.message);
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/admin/transactions", async (req, res) => {
  try {
    const transactions = await Transaction.find().populate("userId", "name email");
    
    console.log(`💰 Found ${transactions.length} transactions`);
    transactions.forEach((t, i) => {
      console.log(`${i+1}. ${t.type}: $${t.amount} - ${t.description} by ${t.userId?.name || 'Unknown'}`);
    });
    
    res.json({
      success: true,
      count: transactions.length,
      transactions: transactions
    });
  } catch (error) {
    console.error('Transactions Error:', error.message);
    res.status(500).json({ message: error.message });
  }
});

// CREATE SAMPLE DATA ROUTE (GET for browser access)
app.get("/api/admin/create-sample", async (req, res) => {
  try {
    // Create sample user
    const sampleUser = new User({
      name: "John Doe",
      email: "john@example.com",
      password: "123456"
    });
    await sampleUser.save();

    // Create diverse sample transactions
    const sampleTransactions = [
      { userId: sampleUser._id, type: "expense", amount: 45, description: "Starbucks Coffee", category: "Food" },
      { userId: sampleUser._id, type: "expense", amount: 120, description: "Uber Ride", category: "Transport" },
      { userId: sampleUser._id, type: "income", amount: 2500, description: "Salary", category: "Work" },
      { userId: sampleUser._id, type: "expense", amount: 80, description: "Netflix Subscription", category: "Entertainment" },
      { userId: sampleUser._id, type: "expense", amount: 200, description: "Grocery Shopping", category: "Food" }
    ];
    
    await Transaction.insertMany(sampleTransactions);

    res.json({ 
      success: true,
      message: "Smart sample data created!",
      user: sampleUser,
      transactionsCount: sampleTransactions.length
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 🧠 SMART EXPENSE ANALYZER
app.get("/api/smart/analyze/:userId", async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.params.userId });
    
    const analysis = {
      totalSpent: transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0),
      totalIncome: transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0),
      topCategory: getTopCategory(transactions),
      spendingTrend: getSpendingTrend(transactions),
      recommendations: getSmartRecommendations(transactions)
    };
    
    res.json({ success: true, analysis });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 💡 FINANCIAL INSIGHTS
app.get("/api/insights/weekly", async (req, res) => {
  try {
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const transactions = await Transaction.find({ date: { $gte: weekAgo } });
    
    const insights = {
      weeklySpending: transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0),
      mostExpensiveDay: getMostExpensiveDay(transactions),
      savingsRate: calculateSavingsRate(transactions),
      alert: getSpendingAlert(transactions)
    };
    
    res.json({ success: true, insights });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 🎯 EXPENSE PREDICTOR
app.get("/api/predict/next-month", async (req, res) => {
  try {
    const lastMonth = await Transaction.find({ 
      date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
    });
    
    const prediction = {
      predictedSpending: calculatePredictedSpending(lastMonth),
      riskCategories: getRiskCategories(lastMonth),
      budgetSuggestion: getBudgetSuggestion(lastMonth)
    };
    
    res.json({ success: true, prediction });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Helper functions
function getTopCategory(transactions) {
  const categories = {};
  transactions.filter(t => t.type === 'expense').forEach(t => {
    categories[t.category] = (categories[t.category] || 0) + t.amount;
  });
  return Object.keys(categories).reduce((a, b) => categories[a] > categories[b] ? a : b, 'None');
}

function getSpendingTrend(transactions) {
  const recent = transactions.filter(t => t.date > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));
  const older = transactions.filter(t => t.date <= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));
  
  const recentSpend = recent.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const olderSpend = older.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  
  return recentSpend > olderSpend ? 'increasing' : 'decreasing';
}

function getSmartRecommendations(transactions) {
  const recommendations = [];
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  
  if (totalExpense > 1000) recommendations.push('Consider setting a monthly budget limit');
  if (transactions.filter(t => t.category === 'Food').length > 5) recommendations.push('Try meal planning to reduce food expenses');
  
  return recommendations;
}

function getMostExpensiveDay(transactions) {
  const days = {};
  transactions.filter(t => t.type === 'expense').forEach(t => {
    const day = t.date.toDateString();
    days[day] = (days[day] || 0) + t.amount;
  });
  return Object.keys(days).reduce((a, b) => days[a] > days[b] ? a : b, 'No data');
}

function calculateSavingsRate(transactions) {
  const income = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const expense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  return income > 0 ? ((income - expense) / income * 100).toFixed(1) + '%' : '0%';
}

function getSpendingAlert(transactions) {
  const weeklySpend = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  if (weeklySpend > 500) return 'High spending week! Consider reviewing expenses.';
  if (weeklySpend < 100) return 'Great job keeping expenses low!';
  return 'Spending looks normal this week.';
}

function calculatePredictedSpending(transactions) {
  const avgDaily = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0) / 30;
  return (avgDaily * 30).toFixed(2);
}

function getRiskCategories(transactions) {
  const categories = {};
  transactions.filter(t => t.type === 'expense').forEach(t => {
    categories[t.category] = (categories[t.category] || 0) + t.amount;
  });
  return Object.entries(categories).filter(([_, amount]) => amount > 200).map(([cat, _]) => cat);
}

function getBudgetSuggestion(transactions) {
  const totalSpent = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  return (totalSpent * 1.1).toFixed(2); // 10% buffer
}

// DB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/wallet-whisperer')
  .then(() => {
    console.log("✅ MongoDB Connected");
    console.log("🌐 Admin URLs:");
    console.log("   Users: http://localhost:5000/api/admin/users");
    console.log("   Transactions: http://localhost:5000/api/admin/transactions");
    console.log("   Create Sample: http://localhost:5000/api/admin/create-sample (GET)");
    console.log("\n🧠 SMART FEATURES:");
    console.log("   Expense Analyzer: http://localhost:5000/api/smart/analyze/USER_ID");
    console.log("   Weekly Insights: http://localhost:5000/api/insights/weekly");
    console.log("   Spending Predictor: http://localhost:5000/api/predict/next-month");
  })
  .catch((err) => console.error("❌ MongoDB Error:", err));

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 API URL: http://localhost:${PORT}`);
  console.log(`📊 Users: http://localhost:${PORT}/api/admin/users`);
  console.log(`💰 Transactions: http://localhost:${PORT}/api/admin/transactions`);
  console.log(`🎯 Create Sample: http://localhost:${PORT}/api/admin/create-sample`);
  console.log("👀 Models registered - Ready to track entries!");
});