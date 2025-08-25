import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DynamicSpendingChart = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchChartData = () => {
    const transactions = JSON.parse(localStorage.getItem('allTransactions') || '[]');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    const userTransactions = transactions.filter(t => t.userId === user.id && t.type === 'expense');
    
    const expensesByCategory = {};
    userTransactions.forEach(t => {
      expensesByCategory[t.category] = (expensesByCategory[t.category] || 0) + t.amount;
    });
    
    const data = Object.entries(expensesByCategory).map(([name, value]) => ({ name, value }));
    setChartData(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchChartData();
    
    const handleUpdate = () => fetchChartData();
    window.addEventListener('refreshStats', handleUpdate);
    
    return () => window.removeEventListener('refreshStats', handleUpdate);
  }, []);

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
        {loading ? (
          <div className="h-64 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-64 flex items-center justify-center text-center">
            <div>
              <h3 className="font-medium text-muted-foreground">No Expenses Yet</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Add expense transactions to see chart
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DynamicSpendingChart;