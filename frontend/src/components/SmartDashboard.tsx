import { Wallet, TrendingUp, TrendingDown, PiggyBank, CreditCard, Target } from "lucide-react";
import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const SmartDashboard = () => {
  const [stats, setStats] = useState({
    totalBalance: 0,
    monthlyIncome: 0,
    monthlyExpenses: 0,
    savingsGoal: 0
  });
  const [chartData, setChartData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    updateAllData();
    
    // Listen for storage changes
    const handleStorageChange = () => {
      updateAllData();
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const updateAllData = () => {
    const allTransactions = JSON.parse(localStorage.getItem('allTransactions') || '[]');
    const goals = JSON.parse(localStorage.getItem('goals') || '[]');
    
    // Calculate stats
    let totalBalance = 0;
    let monthlyIncome = 0;
    let monthlyExpenses = 0;
    const categoryData = {};
    
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    allTransactions.forEach(transaction => {
      const transactionDate = new Date(transaction.date);
      const isCurrentMonth = transactionDate.getMonth() === currentMonth && 
                            transactionDate.getFullYear() === currentYear;
      
      if (transaction.type === 'income') {
        totalBalance += transaction.amount;
        if (isCurrentMonth) monthlyIncome += transaction.amount;
      } else {
        totalBalance -= transaction.amount;
        if (isCurrentMonth) monthlyExpenses += transaction.amount;
        
        // Category data for pie chart
        categoryData[transaction.category] = (categoryData[transaction.category] || 0) + transaction.amount;
      }
    });
    
    const totalGoals = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
    
    setStats({
      totalBalance,
      monthlyIncome,
      monthlyExpenses,
      savingsGoal: totalGoals
    });
    
    // Generate chart data for last 6 months
    const monthlyData = [];
    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthName = date.toLocaleDateString('en-US', { month: 'short' });
      
      let income = 0;
      let expenses = 0;
      
      allTransactions.forEach(transaction => {
        const transactionDate = new Date(transaction.date);
        if (transactionDate.getMonth() === date.getMonth() && 
            transactionDate.getFullYear() === date.getFullYear()) {
          if (transaction.type === 'income') {
            income += transaction.amount;
          } else {
            expenses += transaction.amount;
          }
        }
      });
      
      monthlyData.push({ month: monthName, income, expenses });
    }
    
    setChartData(monthlyData);
    
    // Pie chart data
    const pieChartData = Object.entries(categoryData).map(([category, amount]) => ({
      name: category,
      value: amount
    }));
    setPieData(pieChartData);
    
    // Recent transactions
    setTransactions(allTransactions.slice(-5).reverse());
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="stat-card success">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Total Balance</p>
              <p className="text-2xl font-bold text-foreground">${stats.totalBalance.toFixed(2)}</p>
              <p className="text-sm text-success">
                {stats.totalBalance > 0 ? "Great progress!" : "Start adding transactions"}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-success/10">
              <Wallet className="h-6 w-6 text-success" />
            </div>
          </div>
        </div>

        <div className="stat-card success">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Monthly Income</p>
              <p className="text-2xl font-bold text-foreground">${stats.monthlyIncome.toFixed(2)}</p>
              <p className="text-sm text-success">
                {stats.monthlyIncome > 0 ? "This month's earnings" : "No income recorded"}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-success/10">
              <TrendingUp className="h-6 w-6 text-success" />
            </div>
          </div>
        </div>

        <div className="stat-card warning">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Monthly Expenses</p>
              <p className="text-2xl font-bold text-foreground">${stats.monthlyExpenses.toFixed(2)}</p>
              <p className="text-sm text-warning">
                {stats.monthlyExpenses > 0 ? "This month's spending" : "No expenses recorded"}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-warning/10">
              <TrendingDown className="h-6 w-6 text-warning" />
            </div>
          </div>
        </div>

        <div className="stat-card primary">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Savings Goal</p>
              <p className="text-2xl font-bold text-foreground">${stats.savingsGoal.toFixed(2)}</p>
              <p className="text-sm text-primary">
                {stats.savingsGoal > 0 ? "Target amount set" : "Set your first goal"}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-primary/10">
              <Target className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Monthly Chart */}
        <div className="finance-card p-6">
          <h3 className="text-xl font-semibold mb-6">Monthly Overview</h3>
          {chartData.some(d => d.income > 0 || d.expenses > 0) ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value.toFixed(2)}`, '']} />
                <Bar dataKey="income" fill="#10B981" name="Income" />
                <Bar dataKey="expenses" fill="#F59E0B" name="Expenses" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📊</div>
              <h4 className="text-lg font-medium mb-2">No Data Yet</h4>
              <p className="text-muted-foreground">Add income and expenses to see monthly trends</p>
            </div>
          )}
        </div>

        {/* Category Pie Chart */}
        <div className="finance-card p-6">
          <h3 className="text-xl font-semibold mb-6">Expense Categories</h3>
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`$${value.toFixed(2)}`, 'Amount']} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🥧</div>
              <h4 className="text-lg font-medium mb-2">No Categories Yet</h4>
              <p className="text-muted-foreground">Add expenses to see category breakdown</p>
            </div>
          )}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="finance-card p-6">
        <h3 className="text-xl font-semibold mb-6">Recent Transactions</h3>
        {transactions.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-3">💳</div>
            <p className="text-lg mb-2 font-medium">No transactions yet</p>
            <p className="text-sm text-muted-foreground">Add your first income or expense to get started!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-secondary/50 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-xl ${
                    transaction.type === 'income' 
                      ? 'bg-success/10 text-success' 
                      : 'bg-warning/10 text-warning'
                  }`}>
                    {transaction.type === 'income' ? 
                      <TrendingUp className="h-4 w-4" /> : 
                      <TrendingDown className="h-4 w-4" />
                    }
                  </div>
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-sm text-muted-foreground">{transaction.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${
                    transaction.type === 'income' ? 'text-success' : 'text-foreground'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(transaction.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SmartDashboard;