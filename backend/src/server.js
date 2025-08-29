// backend/src/server.js
require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require('./routes/auth');

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'https://wallet-whisperer-03.vercel.app'],
  credentials: true
}));

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

// Add OTP routes
app.use('/api/auth', authRoutes);

// AUTH ROUTES
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }
    
    const user = new User({ name, email, password });
    await user.save();
    
    console.log(`✅ NEW USER REGISTERED: ${user.name} (${user.email})`);
    
    res.json({
      success: true,
      user: { id: user._id, name: user.name, email: user.email },
      token: 'token-' + user._id
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }
    
    console.log(`🔑 USER LOGGED IN: ${user.name} (${user.email})`);
    
    res.json({
      success: true,
      user: { id: user._id, name: user.name, email: user.email },
      token: 'token-' + user._id
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
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
    console.log("   Expense Analyzer: http://localhost:3001/api/smart/analyze/USER_ID");
    console.log("   Weekly Insights: http://localhost:3001/api/insights/weekly");
    console.log("   Spending Predictor: http://localhost:3001/api/predict/next-month");

  })
  .catch((err) => console.error("❌ MongoDB Error:", err));

// TRANSACTION ROUTES
app.get("/api/transactions", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }
    
    const userId = token.replace('token-', '');
    const transactions = await Transaction.find({ userId }).sort({ date: -1 });
    
    console.log(`📋 Found ${transactions.length} transactions for user ${userId}`);
    
    res.json({ success: true, transactions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post("/api/transactions", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }
    
    const userId = token.replace('token-', '');
    const { type, amount, description, category } = req.body;
    
    const transaction = new Transaction({
      userId,
      type,
      amount: parseFloat(amount),
      description,
      category,
      date: new Date()
    });
    
    await transaction.save();
    
    console.log(`💰 ${type.toUpperCase()}: $${amount} - ${description} (${category})`);
    
    res.json({ success: true, transaction });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// LIVE TRANSACTION MONITOR
app.get("/api/admin/live-transactions", async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 })
      .limit(10);
    
    console.log(`\n📊 LIVE TRANSACTION CHECK - Found ${transactions.length} recent transactions`);
    
    res.json({
      success: true,
      count: transactions.length,
      transactions: transactions,
      lastUpdated: new Date().toLocaleString()
    });
  } catch (error) {
    console.error('Live transactions error:', error.message);
    res.status(500).json({ message: error.message });
  }
});

// COMPLETE DATABASE RESET
app.get("/api/admin/reset-database", async (req, res) => {
  try {
    // Delete ALL data for fresh start
    await Transaction.deleteMany({});
    await Budget.deleteMany({});
    await Goal.deleteMany({});
    await User.deleteMany({});
    
    console.log(`\n🗑️ COMPLETE DATABASE RESET`);
    console.log(`✅ All users deleted`);
    console.log(`✅ All transactions deleted`);
    console.log(`✅ All budgets deleted`);
    console.log(`✅ All goals deleted`);
    
    res.json({
      success: true,
      message: "Database completely reset! Fresh start ready.",
      deleted: {
        users: "all",
        transactions: "all",
        budgets: "all",
        goals: "all"
      }
    });
  } catch (error) {
    console.error('Database reset error:', error.message);
    res.status(500).json({ message: error.message });
  }
});

// CLEAR ALL SAMPLE/DEMO DATA
app.get("/api/admin/clear-all-sample-data", async (req, res) => {
  try {
    // Delete all sample/demo data
    await Transaction.deleteMany({ 
      $or: [
        { description: { $regex: /sample|demo|test/i } },
        { description: "Sample Coffee" },
        { description: "Starbucks Coffee" },
        { description: "Uber Ride" },
        { description: "Salary" },
        { description: "Netflix Subscription" },
        { description: "Grocery Shopping" }
      ]
    });
    
    await User.deleteMany({ 
      $or: [
        { email: "john@example.com" },
        { name: "John Doe" },
        { email: { $regex: /demo|test|sample/i } }
      ]
    });
    
    await Budget.deleteMany({ category: { $regex: /sample|demo|test/i } });
    await Goal.deleteMany({ title: { $regex: /sample|demo|test/i } });
    
    console.log(`\n🗑️ ALL SAMPLE DATA CLEARED`);
    
    const remainingUsers = await User.find().select("-password");
    const remainingTransactions = await Transaction.find().populate("userId", "name email");
    const remainingBudgets = await Budget.find().populate("userId", "name email");
    const remainingGoals = await Goal.find().populate("userId", "name email");
    
    console.log(`✅ Remaining Users: ${remainingUsers.length}`);
    console.log(`✅ Remaining Transactions: ${remainingTransactions.length}`);
    console.log(`✅ Remaining Budgets: ${remainingBudgets.length}`);
    console.log(`✅ Remaining Goals: ${remainingGoals.length}`);
    
    res.json({
      success: true,
      message: "All sample data cleared successfully!",
      remaining: {
        users: remainingUsers.length,
        transactions: remainingTransactions.length,
        budgets: remainingBudgets.length,
        goals: remainingGoals.length
      }
    });
  } catch (error) {
    console.error('Clear sample data error:', error.message);
    res.status(500).json({ message: error.message });
  }
});

// GET ONLY TODAY'S TRANSACTIONS
app.get("/api/admin/today-transactions", async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayTransactions = await Transaction.find({
      createdAt: { $gte: today }
    }).populate("userId", "name email").sort({ createdAt: -1 });
    
    console.log(`\n📅 TODAY'S TRANSACTIONS: ${todayTransactions.length}`);
    todayTransactions.forEach((t, i) => {
      console.log(`${i+1}. ${t.type}: $${t.amount} - ${t.description || t.category} by ${t.userId?.name}`);
    });
    
    res.json({
      success: true,
      count: todayTransactions.length,
      date: today.toDateString(),
      transactions: todayTransactions
    });
  } catch (error) {
    console.error('Today transactions error:', error.message);
    res.status(500).json({ message: error.message });
  }
});

// BUDGET SCHEMA AND ROUTES
const budgetSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  period: { type: String, enum: ["weekly", "monthly", "yearly"], default: "monthly" },
  createdAt: { type: Date, default: Date.now }
});

const Budget = mongoose.model("Budget", budgetSchema);

// GOAL SCHEMA AND ROUTES
const goalSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  targetAmount: { type: Number, required: true },
  currentAmount: { type: Number, default: 0 },
  deadline: { type: Date, required: true },
  category: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Goal = mongoose.model("Goal", goalSchema);

// AUTHENTICATION ROUTES
app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    console.log(`\n👤 NEW USER REGISTRATION:`);
    console.log(`   Name: ${name}`);
    console.log(`   Email: ${email}`);
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }
    
    // Create new user
    const user = new User({
      name,
      email,
      password // In production, hash this password
    });
    
    await user.save();
    
    console.log(`✅ USER REGISTERED SUCCESSFULLY!`);
    console.log(`   ID: ${user._id}`);
    console.log(`   Name: ${user.name}`);
    console.log(`═`.repeat(50));
    
    res.json({
      success: true,
      message: 'User registered successfully',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      },
      token: 'demo-token-' + user._id
    });
  } catch (error) {
    console.error('❌ REGISTRATION ERROR:', error.message);
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log(`\n🔑 USER LOGIN ATTEMPT:`);
    console.log(`   Email: ${email}`);
    
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    
    // In production, compare hashed password
    if (user.password !== password) {
      return res.status(400).json({ message: 'Invalid password' });
    }
    
    console.log(`✅ USER LOGGED IN SUCCESSFULLY!`);
    console.log(`   ID: ${user._id}`);
    console.log(`   Name: ${user.name}`);
    console.log(`═`.repeat(50));
    
    res.json({
      success: true,
      message: 'Login successful',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      },
      token: 'demo-token-' + user._id
    });
  } catch (error) {
    console.error('❌ LOGIN ERROR:', error.message);
    res.status(500).json({ message: error.message });
  }
});

// GET BUDGETS
app.get("/api/budgets", async (req, res) => {
  try {
    const budgets = await Budget.find().populate("userId", "name email");
    
    console.log(`💰 Found ${budgets.length} budgets`);
    
    res.json({
      success: true,
      budgets: budgets
    });
  } catch (error) {
    console.error('Get budgets error:', error.message);
    res.status(500).json({ message: error.message });
  }
});

// ADD BUDGET
app.post("/api/budgets", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    
    const { category, amount, period } = req.body;
    
    console.log(`\n💰 NEW BUDGET REQUEST:`);
    console.log(`   Category: ${category}`);
    console.log(`   Amount: $${amount}`);
    console.log(`   Period: ${period}`);
    
    // Use first user for demo
    const firstUser = await User.findOne();
    if (!firstUser) {
      return res.status(400).json({ message: 'No users found. Create sample data first.' });
    }
    
    const budget = new Budget({
      userId: firstUser._id,
      category,
      amount: parseFloat(amount),
      period
    });
    
    await budget.save();
    
    console.log(`✅ BUDGET SAVED TO DATABASE!`);
    console.log(`   ID: ${budget._id}`);
    console.log(`   User: ${firstUser.name}`);
    console.log(`═`.repeat(50));
    
    res.json({
      success: true,
      message: 'Budget added successfully',
      budget: budget
    });
  } catch (error) {
    console.error('❌ ADD BUDGET ERROR:', error.message);
    res.status(500).json({ message: error.message });
  }
});

// GET GOALS
app.get("/api/goals", async (req, res) => {
  try {
    const goals = await Goal.find().populate("userId", "name email");
    
    console.log(`🎯 Found ${goals.length} goals`);
    
    res.json({
      success: true,
      goals: goals
    });
  } catch (error) {
    console.error('Get goals error:', error.message);
    res.status(500).json({ message: error.message });
  }
});

// ADD GOAL
app.post("/api/goals", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    
    const { title, targetAmount, deadline, category } = req.body;
    
    console.log(`\n🎯 NEW GOAL REQUEST:`);
    console.log(`   Title: ${title}`);
    console.log(`   Target: $${targetAmount}`);
    console.log(`   Deadline: ${deadline}`);
    console.log(`   Category: ${category}`);
    
    // Use first user for demo
    const firstUser = await User.findOne();
    if (!firstUser) {
      return res.status(400).json({ message: 'No users found. Create sample data first.' });
    }
    
    const goal = new Goal({
      userId: firstUser._id,
      title,
      targetAmount: parseFloat(targetAmount),
      deadline: new Date(deadline),
      category
    });
    
    await goal.save();
    
    console.log(`✅ GOAL SAVED TO DATABASE!`);
    console.log(`   ID: ${goal._id}`);
    console.log(`   User: ${firstUser.name}`);
    console.log(`═`.repeat(50));
    
    res.json({
      success: true,
      message: 'Goal added successfully',
      goal: goal
    });
  } catch (error) {
    console.error('❌ ADD GOAL ERROR:', error.message);
    res.status(500).json({ message: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 API URL: http://localhost:${PORT}`);
  console.log(`📊 Users: http://localhost:${PORT}/api/admin/users`);
  console.log(`💰 Transactions: http://localhost:${PORT}/api/admin/transactions`);
  console.log(`💰 Budgets: http://localhost:${PORT}/api/budgets`);
  console.log(`🎯 Goals: http://localhost:${PORT}/api/goals`);
  console.log(`🔑 Auth: http://localhost:${PORT}/api/auth/register (POST)`);
  console.log(`🔑 Login: http://localhost:${PORT}/api/auth/login (POST)`);
  console.log(`🗑️ Clear Sample Data: http://localhost:${PORT}/api/admin/clear-all-sample-data`);
  console.log(`🔄 Reset Database: http://localhost:${PORT}/api/admin/reset-database`);
  console.log(`🎯 Create Sample: http://localhost:${PORT}/api/admin/create-sample`);
  console.log("👀 Models registered - Ready to track entries!");
});