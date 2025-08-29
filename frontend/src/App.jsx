import { useState } from 'react';

function App() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('expense');

  const handleAuth = (e) => {
    e.preventDefault();
    const userData = { name: name || email.split('@')[0], email };
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
      date: new Date().toLocaleDateString()
    };
    setTransactions([transaction, ...transactions]);
    setAmount('');
    setDescription('');
  };

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpenses;

  if (!user) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', width: '400px' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💰</div>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#333' }}>Expense Tracker</h1>
            <p style={{ color: '#666' }}>{isLogin ? 'Welcome back!' : 'Create your account'}</p>
          </div>
          
          <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {!isLogin && (
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ padding: '0.75rem', border: '1px solid #ddd', borderRadius: '0.5rem', fontSize: '1rem' }}
                required={!isLogin}
              />
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ padding: '0.75rem', border: '1px solid #ddd', borderRadius: '0.5rem', fontSize: '1rem' }}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ padding: '0.75rem', border: '1px solid #ddd', borderRadius: '0.5rem', fontSize: '1rem' }}
              required
            />
            <button
              type="submit"
              style={{ padding: '0.75rem', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', borderRadius: '0.5rem', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' }}
            >
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          </form>
          
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <button
              onClick={() => setIsLogin(!isLogin)}
              style={{ background: 'none', border: 'none', color: '#667eea', cursor: 'pointer', textDecoration: 'underline' }}
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', padding: '2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '1rem', marginBottom: '2rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#333', margin: 0 }}>💰 Expense Tracker</h1>
              <p style={{ color: '#666', margin: '0.5rem 0 0 0' }}>Welcome, {user.name}!</p>
            </div>
            <button
              onClick={() => { setUser(null); localStorage.removeItem('user'); }}
              style={{ padding: '0.5rem 1rem', background: '#ef4444', color: 'white', border: 'none', borderRadius: '0.5rem', cursor: 'pointer' }}
            >
              Logout
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💰</div>
            <h3 style={{ margin: 0, color: '#333' }}>Balance</h3>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: balance >= 0 ? '#10b981' : '#ef4444', margin: '0.5rem 0 0 0' }}>
              ${balance.toFixed(2)}
            </p>
          </div>
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📈</div>
            <h3 style={{ margin: 0, color: '#333' }}>Income</h3>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10b981', margin: '0.5rem 0 0 0' }}>
              ${totalIncome.toFixed(2)}
            </p>
          </div>
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📉</div>
            <h3 style={{ margin: 0, color: '#333' }}>Expenses</h3>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ef4444', margin: '0.5rem 0 0 0' }}>
              ${totalExpenses.toFixed(2)}
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          {/* Add Transaction */}
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <h2 style={{ margin: '0 0 1rem 0', color: '#333' }}>Add Transaction</h2>
            <form onSubmit={handleAddTransaction} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                style={{ padding: '0.75rem', border: '1px solid #ddd', borderRadius: '0.5rem', fontSize: '1rem' }}
              >
                <option value="expense">💳 Expense</option>
                <option value="income">💰 Income</option>
              </select>
              <input
                type="number"
                step="0.01"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                style={{ padding: '0.75rem', border: '1px solid #ddd', borderRadius: '0.5rem', fontSize: '1rem' }}
                required
              />
              <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ padding: '0.75rem', border: '1px solid #ddd', borderRadius: '0.5rem', fontSize: '1rem' }}
                required
              />
              <button
                type="submit"
                style={{ padding: '0.75rem', background: type === 'income' ? '#10b981' : '#ef4444', color: 'white', border: 'none', borderRadius: '0.5rem', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' }}
              >
                Add {type === 'income' ? 'Income' : 'Expense'}
              </button>
            </form>
          </div>

          {/* Recent Transactions */}
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <h2 style={{ margin: '0 0 1rem 0', color: '#333' }}>Recent Transactions</h2>
            {transactions.length === 0 ? (
              <p style={{ color: '#666', textAlign: 'center', padding: '2rem' }}>No transactions yet</p>
            ) : (
              <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', background: '#f9fafb', borderRadius: '0.5rem', marginBottom: '0.5rem' }}
                  >
                    <div>
                      <p style={{ margin: 0, fontWeight: 'bold', color: '#333' }}>{transaction.description}</p>
                      <p style={{ margin: 0, fontSize: '0.875rem', color: '#666' }}>{transaction.date}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ margin: 0, fontWeight: 'bold', color: transaction.type === 'income' ? '#10b981' : '#ef4444' }}>
                        {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                      </p>
                      <p style={{ margin: 0, fontSize: '0.875rem', color: '#666' }}>{transaction.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;