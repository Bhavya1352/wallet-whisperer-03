import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DynamicSpendingChart = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasData, setHasData] = useState(false);
  const [updateKey, setUpdateKey] = useState(0);

  useEffect(() => {
    fetchChartData();
    
    // Listen for storage changes to update chart in real-time
    const handleStorageChange = () => {
      setLoading(true);
      setTimeout(() => {
        fetchChartData();
      }, 100);
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('refreshStats', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('refreshStats', handleStorageChange);
    };
  }, []);

  const fetchChartData = () => {
    try {
      const transactions = JSON.parse(localStorage.getItem('allTransactions') || '[]');
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      
      // Filter transactions for current user only
      const userTransactions = transactions.filter(t => t.userId === user.id);
      
      // Group expenses by category
      const expensesByCategory = {};
      userTransactions
        .filter(t => t.type === 'expense')
        .forEach(t => {
          expensesByCategory[t.category] = (expensesByCategory[t.category] || 0) + t.amount;
        });
      
      const chartData = Object.entries(expensesByCategory).map(([category, amount]) => ({
        name: category,
        value: amount
      }));
      
      setChartData(chartData);
      setHasData(chartData.length > 0);
      setUpdateKey(prev => prev + 1);
    } catch (error) {
      console.log('Chart data fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#8dd1e1', '#d084d0'];

  if (loading) {
    return (
      <Card className="finance-card">
        <CardHeader>
          <CardTitle>Spending by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="finance-card">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Spending by Category
          {hasData && (
            <span className="text-sm text-muted-foreground font-normal">
              {chartData.length} categories
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {hasData ? (
          <ResponsiveContainer width="100%" height={300} key={updateKey}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                animationBegin={0}
                animationDuration={800}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${entry.name}-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`$${value.toFixed(2)}`, 'Amount']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-64 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
              <PieChart className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-medium text-muted-foreground">No Data Yet</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Add some expense transactions to see your spending breakdown
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DynamicSpendingChart;