import { useState, useEffect } from 'react';

const SpendingChart = () => {
  const [categories, setCategories] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRealSpendingData();
  }, []);

  const fetchRealSpendingData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await fetch('http://localhost:3001/api/admin/transactions');
      const data = await response.json();
      
      if (data.success && data.transactions) {
        const expenses = data.transactions.filter(t => t.type === 'expense');
        
        // Group by category
        const categoryTotals = {};
        expenses.forEach(expense => {
          const category = expense.category || 'Other';
          categoryTotals[category] = (categoryTotals[category] || 0) + expense.amount;
        });
        
        const total = Object.values(categoryTotals).reduce((sum, amount) => sum + amount, 0);
        
        // Convert to chart format
        const chartCategories = Object.entries(categoryTotals).map(([name, amount], index) => {
          const colors = ['bg-primary', 'bg-success', 'bg-warning', 'bg-accent', 'bg-secondary'];
          return {
            name,
            amount,
            percentage: total > 0 ? Math.round((amount / total) * 100) : 0,
            color: colors[index % colors.length]
          };
        }).sort((a, b) => b.amount - a.amount);
        
        setCategories(chartCategories);
        setTotalExpenses(total);
      }
    } catch (error) {
      console.error('Error fetching spending data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="finance-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Spending Overview</h3>
        <select className="px-3 py-1 rounded-lg bg-secondary border border-border text-sm">
          <option>This Month</option>
          <option>Last Month</option>
          <option>Last 3 Months</option>
        </select>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Chart */}
        <div className="relative">
          {loading ? (
            <div className="w-full h-64 bg-gray-100 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                <p className="text-sm text-gray-500">Loading chart...</p>
              </div>
            </div>
          ) : categories.length === 0 ? (
            <div className="w-full h-64 bg-gray-50 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
              <div className="text-center">
                <div className="text-4xl mb-2">📊</div>
                <p className="text-gray-600 font-medium">No Expense Data</p>
                <p className="text-sm text-gray-500">Add expenses to see spending chart</p>
              </div>
            </div>
          ) : (
            <div className="w-full h-64 bg-gradient-to-br from-primary/10 to-success/10 rounded-xl flex items-center justify-center relative">
              <div className="text-center bg-background/90 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                <p className="text-3xl font-bold text-foreground">${totalExpenses.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">Total Expenses</p>
                <p className="text-xs text-muted-foreground mt-1">{categories.length} categories</p>
              </div>
            </div>
          )}
        </div>

        {/* Categories */}
        <div className="space-y-4">
          {loading ? (
            <div className="space-y-3">
              {[1,2,3].map(i => (
                <div key={i} className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-2 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : categories.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-2">💸</div>
              <p className="text-gray-600">No expense categories</p>
              <p className="text-sm text-gray-500">Start adding expenses to see breakdown</p>
            </div>
          ) : (
            categories.map((category) => (
              <div key={category.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${category.color}`} />
                    <span className="font-medium text-foreground">{category.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">${category.amount.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">{category.percentage}%</p>
                  </div>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${category.color} transition-all duration-300`}
                    style={{ width: `${category.percentage}%` }}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Smart Insights */}
      {categories.length > 0 && (
        <div className="mt-8 p-4 bg-primary/5 border border-primary/20 rounded-xl">
          <h4 className="font-semibold text-primary mb-2">💡 Smart Insights</h4>
          <p className="text-sm text-muted-foreground">
            {categories[0] && categories[0].percentage > 40 
              ? `Your ${categories[0].name.toLowerCase()} expenses are ${categories[0].percentage}% of total spending. Consider reviewing this category.`
              : categories.length > 1
              ? `Your spending is well distributed across ${categories.length} categories. Good financial balance!`
              : "Start tracking more expense categories for better insights."
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default SpendingChart;