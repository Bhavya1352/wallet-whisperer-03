const StatsCards = ({ stats }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const cards = [
    {
      title: 'Total Balance',
      value: formatCurrency(stats.balance),
      icon: '💰',
      color: stats.balance >= 0 ? 'text-green-600' : 'text-red-600',
      bgColor: stats.balance >= 0 ? 'bg-green-50' : 'bg-red-50',
      borderColor: stats.balance >= 0 ? 'border-green-200' : 'border-red-200'
    },
    {
      title: 'Total Income',
      value: formatCurrency(stats.totalIncome),
      icon: '📈',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      title: 'Total Expenses',
      value: formatCurrency(stats.totalExpenses),
      icon: '📉',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    },
    {
      title: 'Transactions',
      value: stats.transactionCount,
      icon: '📊',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`bg-white rounded-xl shadow-lg p-6 border-2 ${card.borderColor} ${card.bgColor} hover:shadow-xl transition-all duration-300 hover:scale-105`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">
                {card.title}
              </p>
              <p className={`text-2xl font-bold ${card.color}`}>
                {card.value}
              </p>
            </div>
            <div className="text-3xl">
              {card.icon}
            </div>
          </div>
          
          {/* Progress bar for balance */}
          {card.title === 'Total Balance' && stats.totalIncome > 0 && (
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${stats.balance >= 0 ? 'bg-green-500' : 'bg-red-500'}`}
                  style={{
                    width: `${Math.min(Math.abs(stats.balance) / stats.totalIncome * 100, 100)}%`
                  }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {stats.balance >= 0 ? 'Positive balance' : 'Negative balance'}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default StatsCards;