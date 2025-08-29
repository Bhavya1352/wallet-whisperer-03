// COMPLETE PROJECT RESTORE - Paste in browser console
console.log('🔄 Restoring Wallet Whisperer Project...');

// Clear everything first
localStorage.clear();

// Create demo user
const demoUser = {
  name: 'Demo User',
  email: 'demo@example.com',
  id: 1,
  createdAt: new Date().toISOString()
};

// Create sample transactions
const sampleTransactions = [
  {
    id: 1,
    userId: 1,
    type: 'income',
    amount: 5000,
    description: 'Monthly Salary',
    category: 'Work',
    date: new Date().toISOString()
  },
  {
    id: 2,
    userId: 1,
    type: 'expense',
    amount: 1200,
    description: 'House Rent',
    category: 'Housing',
    date: new Date().toISOString()
  },
  {
    id: 3,
    userId: 1,
    type: 'expense',
    amount: 300,
    description: 'Groceries',
    category: 'Food',
    date: new Date().toISOString()
  },
  {
    id: 4,
    userId: 1,
    type: 'expense',
    amount: 150,
    description: 'Electricity Bill',
    category: 'Utilities',
    date: new Date().toISOString()
  }
];

// Create sample budgets
const sampleBudgets = [
  {
    id: 1,
    userId: 1,
    category: 'Food',
    amount: 500,
    period: 'monthly',
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    userId: 1,
    category: 'Entertainment',
    amount: 200,
    period: 'monthly',
    createdAt: new Date().toISOString()
  }
];

// Create sample goals
const sampleGoals = [
  {
    id: 1,
    userId: 1,
    title: 'Emergency Fund',
    targetAmount: 10000,
    currentAmount: 2500,
    deadline: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
    category: 'Savings',
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

console.log('✅ Project restored successfully!');
console.log('📊 Sample data created:');
console.log('- User:', demoUser.name);
console.log('- Transactions:', sampleTransactions.length);
console.log('- Budgets:', sampleBudgets.length);
console.log('- Goals:', sampleGoals.length);

// Reload page
window.location.reload();