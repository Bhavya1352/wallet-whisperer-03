import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('expense');
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedTransactions = localStorage.getItem('transactions');
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedTransactions) setTransactions(JSON.parse(savedTransactions));
  }, []);

  const handleAuth = (e) => {
    e.preventDefault();
    const userData = { 
      name: name || email.split('@')[0], 
      email,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name || email.split('@')[0])}&background=667eea&color=fff&size=100`
    };
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleAddTransaction = (e) => {
    e.preventDefault();
    const transaction = {
      id: Date.now(),
      type,
      amount: parseFloat(amount),
      description,
      category,
      date: new Date().toISOString(),
      icon: type === 'income' ? '💰' : getCategoryIcon(category)
    };
    const newTransactions = [transaction, ...transactions];
    setTransactions(newTransactions);
    localStorage.setItem('transactions', JSON.stringify(newTransactions));
    setAmount('');
    setDescription('');
    setCategory('');
    setShowAddForm(false);
  };

  const getCategoryIcon = (cat) => {
    const icons = {
      'Food': '🍔', 'Transport': '🚗', 'Shopping': '🛍️', 'Entertainment': '🎬',
      'Bills': '📄', 'Healthcare': '🏥', 'Education': '📚', 'Travel': '✈️',
      'Salary': '💼', 'Business': '🏢', 'Investment': '📈', 'Gift': '🎁'
    };
    return icons[cat] || '💳';
  };

  const deleteTransaction = (id) => {
    const newTransactions = transactions.filter(t => t.id !== id);
    setTransactions(newTransactions);
    localStorage.setItem('transactions', JSON.stringify(newTransactions));
  };

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpenses;

  const expenseCategories = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  if (!user) {
    return (
      <div className="login-container">
        <div className="login-bg">
          <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
            <div className="shape shape-4"></div>
          </div>
        </div>
        
        <div className="login-card">
          <div className="login-header">
            <div className="logo-container">
              <div className="logo-icon">💰</div>
              <div className="logo-text">
                <h1>ExpenseTracker</h1>
                <p>Smart Financial Management</p>
              </div>
            </div>
          </div>
          
          <div className="auth-tabs">
            <button 
              className={`tab ${isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(true)}
            >
              Sign In
            </button>
            <button 
              className={`tab ${!isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
          </div>
          
          <form onSubmit={handleAuth} className="auth-form">
            {!isLogin && (
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={!isLogin}
                />
              </div>
            )}
            
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <button type="submit" className="auth-btn">
              <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
              <div className="btn-shine"></div>
            </button>
          </form>
          
          <div className="demo-info">
            <p>🚀 Demo: demo@example.com / password123</p>
          </div>
          
          <div className="features-preview">
            <div className="feature">
              <span>📊</span>
              <p>Analytics</p>
            </div>
            <div className="feature">
              <span>💳</span>
              <p>Transactions</p>
            </div>
            <div className="feature">
              <span>🎯</span>
              <p>Goals</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <div className="logo">
              <span className="logo-icon">💰</span>
              <span className="logo-text">ExpenseTracker</span>
            </div>
          </div>
          
          <div className="header-right">
            <div className="user-info">
              <img src={user.avatar} alt="Avatar" className="user-avatar" />
              <div className="user-details">
                <span className="user-name">{user.name}</span>
                <span className="user-email">{user.email}</span>
              </div>
            </div>
            <button 
              className="logout-btn"
              onClick={() => { 
                setUser(null); 
                localStorage.removeItem('user'); 
                localStorage.removeItem('transactions');
                setTransactions([]);
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card balance-card">
            <div className="stat-icon">💰</div>
            <div className="stat-content">
              <h3>Total Balance</h3>
              <p className={`stat-value ${balance >= 0 ? 'positive' : 'negative'}`}>
                ${Math.abs(balance).toLocaleString('en-US', {minimumFractionDigits: 2})}
              </p>
              <span className="stat-label">{balance >= 0 ? 'Surplus' : 'Deficit'}</span>
            </div>
            <div className="stat-trend">
              <span className={balance >= 0 ? 'trend-up' : 'trend-down'}>
                {balance >= 0 ? '📈' : '📉'}
              </span>
            </div>
          </div>
          
          <div className="stat-card income-card">
            <div className="stat-icon">📈</div>
            <div className="stat-content">
              <h3>Total Income</h3>
              <p className="stat-value positive">
                ${totalIncome.toLocaleString('en-US', {minimumFractionDigits: 2})}
              </p>
              <span className="stat-label">This month</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill income-progress" style={{width: '75%'}}></div>
            </div>
          </div>
          
          <div className="stat-card expense-card">
            <div className="stat-icon">📉</div>
            <div className="stat-content">
              <h3>Total Expenses</h3>
              <p className="stat-value negative">
                ${totalExpenses.toLocaleString('en-US', {minimumFractionDigits: 2})}
              </p>
              <span className="stat-label">This month</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill expense-progress" style={{width: '60%'}}></div>
            </div>
          </div>
          
          <div className="stat-card transactions-card">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <h3>Transactions</h3>
              <p className="stat-value">{transactions.length}</p>
              <span className="stat-label">Total records</span>
            </div>
            <div className="mini-chart">
              {transactions.slice(0, 7).map((_, i) => (
                <div key={i} className="chart-bar" style={{height: `${Math.random() * 100}%`}}></div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <button 
              className="action-btn income-btn"
              onClick={() => { setType('income'); setShowAddForm(true); }}
            >
              <span className="btn-icon">💰</span>
              <span className="btn-text">Add Income</span>
              <div className="btn-glow"></div>
            </button>
            
            <button 
              className="action-btn expense-btn"
              onClick={() => { setType('expense'); setShowAddForm(true); }}
            >
              <span className="btn-icon">💳</span>
              <span className="btn-text">Add Expense</span>
              <div className="btn-glow"></div>
            </button>
          </div>
        </div>

        {/* Content Grid */}
        <div className="content-grid">
          {/* Recent Transactions */}
          <div className="content-card transactions-list">
            <div className="card-header">
              <h3>Recent Transactions</h3>
              <span className="card-icon">📋</span>
            </div>
            
            <div className="transactions-container">
              {transactions.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">💸</div>
                  <h4>No transactions yet</h4>
                  <p>Start by adding your first transaction</p>
                </div>
              ) : (
                transactions.slice(0, 8).map((transaction) => (
                  <div key={transaction.id} className="transaction-item">
                    <div className="transaction-icon">
                      {transaction.icon}
                    </div>
                    <div className="transaction-details">
                      <h4>{transaction.description}</h4>
                      <p>{transaction.category} • {new Date(transaction.date).toLocaleDateString()}</p>
                    </div>
                    <div className="transaction-amount">
                      <span className={`amount ${transaction.type}`}>
                        {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                      </span>
                      <button 
                        className="delete-btn"
                        onClick={() => deleteTransaction(transaction.id)}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="content-card category-chart">
            <div className="card-header">
              <h3>Expense Categories</h3>
              <span className="card-icon">🎯</span>
            </div>
            
            {Object.keys(expenseCategories).length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📊</div>
                <h4>No expense data</h4>
                <p>Add expenses to see breakdown</p>
              </div>
            ) : (
              <div className="category-list">
                {Object.entries(expenseCategories)
                  .sort(([,a], [,b]) => b - a)
                  .slice(0, 6)
                  .map(([cat, amount]) => (
                    <div key={cat} className="category-item">
                      <div className="category-info">
                        <span className="category-icon">{getCategoryIcon(cat)}</span>
                        <span className="category-name">{cat}</span>
                      </div>
                      <div className="category-amount">
                        <span>${amount.toFixed(2)}</span>
                        <div className="category-bar">
                          <div 
                            className="category-fill"
                            style={{width: `${(amount / totalExpenses) * 100}%`}}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Add Transaction Modal */}
      {showAddForm && (
        <div className="modal-overlay" onClick={() => setShowAddForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add {type === 'income' ? 'Income' : 'Expense'}</h3>
              <button className="close-btn" onClick={() => setShowAddForm(false)}>×</button>
            </div>
            
            <form onSubmit={handleAddTransaction} className="transaction-form">
              <div className="form-group">
                <label>Amount ($)</label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Description</label>
                <input
                  type="text"
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="">Select category</option>
                  {type === 'expense' ? (
                    <>
                      <option value="Food">🍔 Food</option>
                      <option value="Transport">🚗 Transport</option>
                      <option value="Shopping">🛍️ Shopping</option>
                      <option value="Entertainment">🎬 Entertainment</option>
                      <option value="Bills">📄 Bills</option>
                      <option value="Healthcare">🏥 Healthcare</option>
                      <option value="Education">📚 Education</option>
                      <option value="Travel">✈️ Travel</option>
                    </>
                  ) : (
                    <>
                      <option value="Salary">💼 Salary</option>
                      <option value="Business">🏢 Business</option>
                      <option value="Investment">📈 Investment</option>
                      <option value="Gift">🎁 Gift</option>
                    </>
                  )}
                </select>
              </div>
              
              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowAddForm(false)}>
                  Cancel
                </button>
                <button type="submit" className={`submit-btn ${type}`}>
                  Add {type === 'income' ? 'Income' : 'Expense'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;