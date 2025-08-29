// COMPLETE WALLET WHISPERER RESTORE - Paste in browser console
console.log('🚀 Restoring Complete Wallet Whisperer Project...');

// Clear everything
localStorage.clear();

// Demo user
const demoUser = {
  name: 'Bhavya',
  email: 'bhavya@example.com',
  id: 1,
  createdAt: new Date().toISOString()
};

// Rich sample transactions for graphs
const sampleTransactions = [
  // Income transactions
  {id: 1, userId: 1, type: 'income', amount: 50000, description: 'Monthly Salary', category: 'Work', date: new Date(2024, 7, 1).toISOString()},
  {id: 2, userId: 1, type: 'income', amount: 15000, description: 'Freelance Project', category: 'Freelance', date: new Date(2024, 7, 15).toISOString()},
  {id: 3, userId: 1, type: 'income', amount: 5000, description: 'Investment Returns', category: 'Investment', date: new Date(2024, 7, 20).toISOString()},
  
  // Housing expenses
  {id: 4, userId: 1, type: 'expense', amount: 15000, description: 'House Rent', category: 'Housing', date: new Date(2024, 7, 2).toISOString()},
  {id: 5, userId: 1, type: 'expense', amount: 3000, description: 'Electricity Bill', category: 'Housing', date: new Date(2024, 7, 5).toISOString()},
  
  // Food expenses
  {id: 6, userId: 1, type: 'expense', amount: 8000, description: 'Groceries', category: 'Food', date: new Date(2024, 7, 3).toISOString()},
  {id: 7, userId: 1, type: 'expense', amount: 2500, description: 'Restaurant', category: 'Food', date: new Date(2024, 7, 10).toISOString()},
  {id: 8, userId: 1, type: 'expense', amount: 1200, description: 'Coffee & Snacks', category: 'Food', date: new Date(2024, 7, 12).toISOString()},
  
  // Transport expenses
  {id: 9, userId: 1, type: 'expense', amount: 4000, description: 'Petrol', category: 'Transport', date: new Date(2024, 7, 6).toISOString()},
  {id: 10, userId: 1, type: 'expense', amount: 800, description: 'Uber Rides', category: 'Transport', date: new Date(2024, 7, 14).toISOString()},
  
  // Entertainment expenses
  {id: 11, userId: 1, type: 'expense', amount: 1500, description: 'Movie Tickets', category: 'Entertainment', date: new Date(2024, 7, 8).toISOString()},
  {id: 12, userId: 1, type: 'expense', amount: 599, description: 'Netflix Subscription', category: 'Entertainment', date: new Date(2024, 7, 1).toISOString()},
  
  // Shopping expenses
  {id: 13, userId: 1, type: 'expense', amount: 6000, description: 'Clothes Shopping', category: 'Shopping', date: new Date(2024, 7, 16).toISOString()},
  {id: 14, userId: 1, type: 'expense', amount: 2500, description: 'Electronics', category: 'Shopping', date: new Date(2024, 7, 18).toISOString()},
  
  // Healthcare expenses
  {id: 15, userId: 1, type: 'expense', amount: 2000, description: 'Doctor Visit', category: 'Healthcare', date: new Date(2024, 7, 11).toISOString()},
  {id: 16, userId: 1, type: 'expense', amount: 800, description: 'Medicines', category: 'Healthcare', date: new Date(2024, 7, 13).toISOString()}
];

// Sample budgets
const sampleBudgets = [
  {id: 1, userId: 1, category: 'Food', amount: 12000, period: 'monthly', createdAt: new Date().toISOString()},
  {id: 2, userId: 1, category: 'Entertainment', amount: 3000, period: 'monthly', createdAt: new Date().toISOString()},
  {id: 3, userId: 1, category: 'Transport', amount: 5000, period: 'monthly', createdAt: new Date().toISOString()},
  {id: 4, userId: 1, category: 'Shopping', amount: 8000, period: 'monthly', createdAt: new Date().toISOString()},
  {id: 5, userId: 1, category: 'Healthcare', amount: 4000, period: 'monthly', createdAt: new Date().toISOString()}
];

// Sample goals
const sampleGoals = [
  {
    id: 1, 
    userId: 1, 
    title: 'Emergency Fund', 
    targetAmount: 100000, 
    currentAmount: 35000, 
    deadline: new Date(2024, 11, 31).toISOString(), 
    category: 'Savings',
    createdAt: new Date().toISOString()
  },
  {
    id: 2, 
    userId: 1, 
    title: 'New Car', 
    targetAmount: 500000, 
    currentAmount: 125000, 
    deadline: new Date(2025, 5, 30).toISOString(), 
    category: 'Purchase',
    createdAt: new Date().toISOString()
  },
  {
    id: 3, 
    userId: 1, 
    title: 'Vacation Fund', 
    targetAmount: 50000, 
    currentAmount: 18000, 
    deadline: new Date(2024, 11, 15).toISOString(), 
    category: 'Travel',
    createdAt: new Date().toISOString()
  }
];

// Store all data
localStorage.setItem('user', JSON.stringify(demoUser));
localStorage.setItem('token', 'demo-token-1');
localStorage.setItem('allTransactions', JSON.stringify(sampleTransactions));
localStorage.setItem('allBudgets', JSON.stringify(sampleBudgets));
localStorage.setItem('allGoals', JSON.stringify(sampleGoals));
localStorage.setItem('allUsers', JSON.stringify([demoUser]));

// Calculate totals for verification
const totalIncome = sampleTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
const totalExpenses = sampleTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
const balance = totalIncome - totalExpenses;

console.log('✅ COMPLETE PROJECT RESTORED!');
console.log('👤 User:', demoUser.name);
console.log('💰 Total Income: ₹' + totalIncome.toLocaleString());
console.log('💸 Total Expenses: ₹' + totalExpenses.toLocaleString());
console.log('💵 Balance: ₹' + balance.toLocaleString());
console.log('📊 Transactions:', sampleTransactions.length);
console.log('🎯 Budgets:', sampleBudgets.length);
console.log('🏆 Goals:', sampleGoals.length);
console.log('');
console.log('🎉 Your complete Wallet Whisperer is ready!');
console.log('📈 Features restored:');
console.log('- Dynamic Stats Cards');
console.log('- Pie Chart with Categories');
console.log('- Recent Transactions List');
console.log('- Budget Tracking');
console.log('- Goal Setting & Progress');
console.log('- Smart Insights');

// Reload to show dashboard
window.location.reload();