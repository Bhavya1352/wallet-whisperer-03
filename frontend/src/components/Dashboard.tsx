import { useState } from "react";
import { Wallet, TrendingUp, TrendingDown, PiggyBank } from "lucide-react";
import DynamicStatsCards from "./DynamicStatsCards";
import DynamicSpendingChart from "./DynamicSpendingChart";
import TransactionList from "./TransactionList";
import AddTransactionForm from "./AddTransactionForm";
import BudgetQuickView from "./BudgetQuickView";
import GoalsView from "./GoalsView";
import SmartInsights from "./SmartInsights";

const Dashboard = ({ user }) => {
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [showIncomeForm, setShowIncomeForm] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleTransactionAdded = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div id="dashboard" className="min-h-screen bg-gradient-to-br from-background to-secondary/20 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold gradient-text">Financial Dashboard</h2>
            <p className="text-xl text-muted-foreground">Welcome back, {user?.name}!</p>
          </div>

          {/* Quick Actions */}
          <div className="finance-card p-6 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold mb-4 text-center">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => setShowIncomeForm(true)}
                className="p-6 rounded-xl border border-border/50 hover:border-success/50 transition-all duration-300 group hover:shadow-lg"
              >
                <TrendingUp className="h-8 w-8 text-success mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <p className="font-medium text-success">Add Income</p>
                <p className="text-sm text-muted-foreground mt-1">Track your earnings</p>
              </button>
              <button 
                onClick={() => setShowExpenseForm(true)}
                className="p-6 rounded-xl border border-border/50 hover:border-destructive/50 transition-all duration-300 group hover:shadow-lg"
              >
                <TrendingDown className="h-8 w-8 text-destructive mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <p className="font-medium text-destructive">Add Expense</p>
                <p className="text-sm text-muted-foreground mt-1">Record your spending</p>
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <DynamicStatsCards key={refreshTrigger} />

          {/* Charts and Data */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <DynamicSpendingChart key={refreshTrigger} />
            <BudgetQuickView key={refreshTrigger} />
          </div>

          {/* Smart Insights */}
          <SmartInsights key={refreshTrigger} />

          {/* Recent Transactions */}
          <TransactionList key={refreshTrigger} />

          {/* Goals Overview */}
          <GoalsView key={refreshTrigger} />
        </div>
      </div>
      
      {/* Transaction Forms */}
      <AddTransactionForm 
        isOpen={showExpenseForm} 
        onClose={() => setShowExpenseForm(false)} 
        onTransactionAdded={handleTransactionAdded}
        type="expense" 
      />
      <AddTransactionForm 
        isOpen={showIncomeForm} 
        onClose={() => setShowIncomeForm(false)} 
        onTransactionAdded={handleTransactionAdded}
        type="income" 
      />
    </div>
  );
};

export default Dashboard;