import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useState, useEffect } from 'react';

const DynamicSpendingChart = () => {
  const [chartData, setChartData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    generateChartData();
  }, []);

  const generateChartData = () => {
    const transactions = JSON.parse(localStorage.getItem('allTransactions') || '[]');
    
    if (transactions.length === 0) {
      setHasData(false);
      return;
    }

    setHasData(true);

    // Generate monthly data for last 6 months
    const monthlyData = [];
    const categoryData = {};
    
    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthName = date.toLocaleDateString('en-US', { month: 'short' });
      
      let income = 0;
      let expenses = 0;
      
      transactions.forEach(transaction => {
        const transactionDate = new Date(transaction.date);
        if (transactionDate.getMonth() === date.getMonth() && 
            transactionDate.getFullYear() === date.getFullYear()) {
          if (transaction.type === 'income') {
            income += transaction.amount;
          } else {
            expenses += transaction.amount;
            // Category data for pie chart
            categoryData[transaction.category] = (categoryData[transaction.category] || 0) + transaction.amount;
          }
        }
      });
      
      monthlyData.push({
        month: monthName,
        income,
        expenses
      });
    }
    
    // Convert category data to pie chart format
    const pieChartData = Object.entries(categoryData).map(([category, amount]) => ({
      name: category,
      value: amount
    }));
    
    setChartData(monthlyData);
    setPieData(pieChartData);
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  if (!hasData) {
    return (
      <div className="finance-card p-6">
        <h3 className="text-xl font-semibold mb-6">Spending Analytics</h3>
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📊</div>
          <h4 className="text-lg font-medium mb-2">No Data Yet</h4>
          <p className="text-muted-foreground">Add some transactions to see your spending analytics</p>
        </div>
      </div>
    );
  }

  return (
    <div className="finance-card p-6">
      <h3 className="text-xl font-semibold mb-6">Spending Analytics</h3>
      
      <div className="space-y-8">
        {/* Monthly Income vs Expenses */}
        <div>
          <h4 className="text-lg font-medium mb-4">Monthly Overview</h4>
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
        </div>

        {/* Category Breakdown */}
        {pieData.length > 0 && (
          <div>
            <h4 className="text-lg font-medium mb-4">Expense Categories</h4>
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
          </div>
        )}
      </div>
    </div>
  );
};

export default DynamicSpendingChart;