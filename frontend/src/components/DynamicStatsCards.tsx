import { Wallet, TrendingUp, TrendingDown, Target } from "lucide-react";
import StatsCard from "./StatsCard";
import { useState, useEffect } from "react";

const DynamicStatsCards = () => {
  const [stats, setStats] = useState({
    totalBalance: 0,
    monthlyIncome: 0,
    monthlyExpenses: 0,
    savingsGoal: 0
  });

  useEffect(() => {
    calculateStats();
  }, []);

  const calculateStats = () => {
    const transactions = JSON.parse(localStorage.getItem('allTransactions') || '[]');
    const goals = JSON.parse(localStorage.getItem('goals') || '[]');
    
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    let monthlyIncome = 0;
    let monthlyExpenses = 0;
    let totalBalance = 0;
    
    transactions.forEach(transaction => {
      const transactionDate = new Date(transaction.date);
      const isCurrentMonth = transactionDate.getMonth() === currentMonth && 
                            transactionDate.getFullYear() === currentYear;
      
      if (transaction.type === 'income') {
        totalBalance += transaction.amount;
        if (isCurrentMonth) monthlyIncome += transaction.amount;
      } else {
        totalBalance -= transaction.amount;
        if (isCurrentMonth) monthlyExpenses += transaction.amount;
      }
    });
    
    const totalGoals = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
    
    setStats({
      totalBalance,
      monthlyIncome,
      monthlyExpenses,
      savingsGoal: totalGoals
    });
  };

  // Listen for storage changes to update stats
  useEffect(() => {
    const handleStorageChange = () => {
      calculateStats();
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard
        title="Total Balance"
        amount={`$${stats.totalBalance.toFixed(2)}`}
        change={stats.totalBalance > 0 ? "Great progress!" : "Start adding transactions"}
        changeType={stats.totalBalance > 0 ? "positive" : "neutral"}
        icon={Wallet}
        variant="success"
      />
      <StatsCard
        title="Monthly Income"
        amount={`$${stats.monthlyIncome.toFixed(2)}`}
        change={stats.monthlyIncome > 0 ? "This month's earnings" : "No income recorded"}
        changeType={stats.monthlyIncome > 0 ? "positive" : "neutral"}
        icon={TrendingUp}
        variant="success"
      />
      <StatsCard
        title="Monthly Expenses"
        amount={`$${stats.monthlyExpenses.toFixed(2)}`}
        change={stats.monthlyExpenses > 0 ? "This month's spending" : "No expenses recorded"}
        changeType={stats.monthlyExpenses > 0 ? "negative" : "neutral"}
        icon={TrendingDown}
        variant="warning"
      />
      <StatsCard
        title="Savings Goal"
        amount={`$${stats.savingsGoal.toFixed(2)}`}
        change={stats.savingsGoal > 0 ? "Target amount set" : "Set your first goal"}
        changeType={stats.savingsGoal > 0 ? "positive" : "neutral"}
        icon={Target}
        variant="primary"
      />
    </div>
  );
};

export default DynamicStatsCards;