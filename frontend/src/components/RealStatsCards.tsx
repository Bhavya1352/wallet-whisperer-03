import { useState, useEffect } from 'react';
import StatsCard from './StatsCard';
import { Wallet, TrendingUp, TrendingDown, Target } from 'lucide-react';

const RealStatsCards = () => {
  const [stats, setStats] = useState({
    totalBalance: 0,
    monthlyIncome: 0,
    monthlyExpenses: 0,
    savingsRate: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRealStats();
  }, []);

  const fetchRealStats = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      // Fetch transactions to calculate real stats
      const response = await fetch('http://localhost:3001/api/admin/transactions');
      const data = await response.json();
      
      if (data.success && data.transactions) {
        const transactions = data.transactions;
        
        // Calculate this month's data
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        
        const thisMonthTransactions = transactions.filter(t => {
          const transactionDate = new Date(t.date);
          return transactionDate.getMonth() === currentMonth && 
                 transactionDate.getFullYear() === currentYear;
        });
        
        const monthlyIncome = thisMonthTransactions
          .filter(t => t.type === 'income')
          .reduce((sum, t) => sum + t.amount, 0);
          
        const monthlyExpenses = thisMonthTransactions
          .filter(t => t.type === 'expense')
          .reduce((sum, t) => sum + t.amount, 0);
          
        const totalBalance = monthlyIncome - monthlyExpenses;
        const savingsRate = monthlyIncome > 0 ? ((monthlyIncome - monthlyExpenses) / monthlyIncome * 100) : 0;
        
        setStats({
          totalBalance,
          monthlyIncome,
          monthlyExpenses,
          savingsRate
        });
      }
    } catch (error) {
      console.error('Error fetching real stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1,2,3,4].map(i => (
          <div key={i} className="finance-card p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-8 bg-gray-200 rounded mb-2"></div>
            <div className="h-3 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  // Show empty state if no data
  if (stats.monthlyIncome === 0 && stats.monthlyExpenses === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="finance-card p-6 text-center">
          <Wallet className="h-8 w-8 mx-auto text-gray-400 mb-2" />
          <h3 className="font-semibold text-gray-600">Total Balance</h3>
          <p className="text-2xl font-bold text-gray-400">$0.00</p>
          <p className="text-sm text-gray-400">Add transactions to see balance</p>
        </div>
        
        <div className="finance-card p-6 text-center">
          <TrendingUp className="h-8 w-8 mx-auto text-gray-400 mb-2" />
          <h3 className="font-semibold text-gray-600">Monthly Income</h3>
          <p className="text-2xl font-bold text-gray-400">$0.00</p>
          <p className="text-sm text-gray-400">Add income to track earnings</p>
        </div>
        
        <div className="finance-card p-6 text-center">
          <TrendingDown className="h-8 w-8 mx-auto text-gray-400 mb-2" />
          <h3 className="font-semibold text-gray-600">Monthly Expenses</h3>
          <p className="text-2xl font-bold text-gray-400">$0.00</p>
          <p className="text-sm text-gray-400">Add expenses to track spending</p>
        </div>
        
        <div className="finance-card p-6 text-center">
          <Target className="h-8 w-8 mx-auto text-gray-400 mb-2" />
          <h3 className="font-semibold text-gray-600">Savings Rate</h3>
          <p className="text-2xl font-bold text-gray-400">0%</p>
          <p className="text-sm text-gray-400">Start saving to see progress</p>
        </div>
      </div>
    );
  }

  // Show real data
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard
        title="Total Balance"
        amount={`$${stats.totalBalance.toFixed(2)}`}
        change={stats.totalBalance >= 0 ? "Positive balance" : "Negative balance"}
        changeType={stats.totalBalance >= 0 ? "positive" : "negative"}
        icon={Wallet}
        variant={stats.totalBalance >= 0 ? "success" : "warning"}
      />
      <StatsCard
        title="Monthly Income"
        amount={`$${stats.monthlyIncome.toFixed(2)}`}
        change="This month"
        changeType="positive"
        icon={TrendingUp}
        variant="success"
      />
      <StatsCard
        title="Monthly Expenses"
        amount={`$${stats.monthlyExpenses.toFixed(2)}`}
        change="This month"
        changeType="negative"
        icon={TrendingDown}
        variant="warning"
      />
      <StatsCard
        title="Savings Rate"
        amount={`${stats.savingsRate.toFixed(1)}%`}
        change={stats.savingsRate > 20 ? "Great savings!" : stats.savingsRate > 10 ? "Good progress" : "Can improve"}
        changeType={stats.savingsRate > 10 ? "positive" : "negative"}
        icon={Target}
        variant={stats.savingsRate > 20 ? "success" : stats.savingsRate > 10 ? "primary" : "warning"}
      />
    </div>
  );
};

export default RealStatsCards;