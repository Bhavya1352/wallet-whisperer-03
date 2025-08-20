import expenseChart from "@/assets/expense-chart.jpg";

const SpendingChart = () => {
  const categories = [
    { name: 'Housing', amount: 1200, percentage: 45, color: 'bg-primary' },
    { name: 'Food', amount: 650, percentage: 25, color: 'bg-success' },
    { name: 'Transportation', amount: 400, percentage: 15, color: 'bg-warning' },
    { name: 'Entertainment', amount: 250, percentage: 10, color: 'bg-accent' },
    { name: 'Other', amount: 150, percentage: 5, color: 'bg-secondary' }
  ];

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
          <img
            src={expenseChart}
            alt="Expense Distribution Chart"
            className="w-full h-64 object-contain rounded-xl"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center bg-background/90 backdrop-blur-sm rounded-xl p-4">
              <p className="text-2xl font-bold text-foreground">$2,650</p>
              <p className="text-sm text-muted-foreground">Total Expenses</p>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-4">
          {categories.map((category) => (
            <div key={category.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${category.color}`} />
                  <span className="font-medium text-foreground">{category.name}</span>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">${category.amount}</p>
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
          ))}
        </div>
      </div>

      {/* Insights */}
      <div className="mt-8 p-4 bg-primary/5 border border-primary/20 rounded-xl">
        <h4 className="font-semibold text-primary mb-2">💡 Smart Insights</h4>
        <p className="text-sm text-muted-foreground">
          Your housing expenses are 45% of your total spending. Consider reviewing your budget 
          to optimize your financial health.
        </p>
      </div>
    </div>
  );
};

export default SpendingChart;