import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import StatsCards from './StatsCards';
import TransactionForm from './TransactionForm';
import RecentTransactions from './RecentTransactions';
import ExpenseChart from './ExpenseChart';

const Dashboard = ({ user }) => {
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [transactionType, setTransactionType] = useState('expense');
  const [stats, setStats] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0,
    transactionCount: 0
  });
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      
      // Fetch stats
      const statsResponse = await fetch('http://localhost:3001/api/stats', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const statsData = await statsResponse.json();
      
      // Fetch transactions
      const transactionsResponse = await fetch('http://localhost:3001/api/transactions', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const transactionsData = await transactionsResponse.json();
      
      if (statsData.success) setStats(statsData.stats);
      if (transactionsData.success) setTransactions(transactionsData.transactions);
      
    } catch (error) {
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTransaction = (type) => {
    setTransactionType(type);
    setShowTransactionForm(true);
  };

  const handleTransactionAdded = () => {
    setShowTransactionForm(false);
    fetchData();
    toast.success('Transaction added successfully!');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {user.name}! 👋
              </h1>
              <p className="text-gray-600 mt-1">
                Here's your financial overview for today
              </p>
            </div>
            <div className="hidden md:block">
              <div className="text-6xl">💰</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => handleAddTransaction('income')}
            className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <h3 className="text-lg font-semibold">Add Income</h3>
                <p className="text-green-100">Record your earnings</p>
              </div>
              <div className="text-3xl">💵</div>
            </div>
          </button>
          
          <button
            onClick={() => handleAddTransaction('expense')}
            className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <h3 className="text-lg font-semibold">Add Expense</h3>
                <p className="text-red-100">Track your spending</p>
              </div>
              <div className="text-3xl">💳</div>
            </div>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <StatsCards stats={stats} />

      {/* Charts and Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <ExpenseChart transactions={transactions} />
        <RecentTransactions transactions={transactions.slice(0, 5)} onRefresh={fetchData} />
      </div>

      {/* Transaction Form Modal */}
      {showTransactionForm && (
        <TransactionForm
          type={transactionType}
          onClose={() => setShowTransactionForm(false)}
          onSuccess={handleTransactionAdded}
        />
      )}
    </div>
  );
};

export default Dashboard;