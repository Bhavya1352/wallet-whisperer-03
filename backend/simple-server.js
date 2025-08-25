const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 8000;

// Middleware
app.use(express.json());
app.use(cors());

// Simple routes
app.get('/', (req, res) => {
  res.json({ message: '🚀 Simple Server Working!' });
});

app.get('/api/test', (req, res) => {
  res.json({ 
    success: true, 
    message: 'API Working!',
    timestamp: new Date().toLocaleString()
  });
});

// Mock data for testing
app.get('/api/admin/users', (req, res) => {
  res.json({
    success: true,
    users: [
      { id: 1, name: 'Test User', email: 'test@example.com' }
    ]
  });
});

app.get('/api/admin/transactions', (req, res) => {
  res.json({
    success: true,
    transactions: [
      { id: 1, type: 'expense', amount: 100, description: 'Test Expense' },
      { id: 2, type: 'income', amount: 500, description: 'Test Income' }
    ]
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Simple Server running on http://localhost:${PORT}`);
  console.log(`📊 Test URLs:`);
  console.log(`   Main: http://localhost:${PORT}`);
  console.log(`   API Test: http://localhost:${PORT}/api/test`);
  console.log(`   Users: http://localhost:${PORT}/api/admin/users`);
  console.log(`   Transactions: http://localhost:${PORT}/api/admin/transactions`);
});