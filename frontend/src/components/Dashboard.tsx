import { useState, useEffect } from "react";
import { Wallet, TrendingUp, TrendingDown, PiggyBank, Target } from "lucide-react";
import DynamicStatsCards from "./DynamicStatsCards";
import DynamicSpendingChart from "./DynamicSpendingChart";
import TransactionList from "./TransactionList";
import AddTransactionForm from "./AddTransactionForm";
import BudgetQuickView from "./BudgetQuickView";
import GoalsView from "./GoalsView";
import SmartInsights from "./SmartInsights";
import BudgetForm from "./BudgetForm";
import GoalForm from "./GoalForm";

const Dashboard = ({ user }) => {
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [showIncomeForm, setShowIncomeForm] = useState(false);
  const [showBudgetForm, setShowBudgetForm] = useState(false);
  const [showGoalForm, setShowGoalForm] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Redirect if no user
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
          <p className="text-muted-foreground">Please login to access your dashboard</p>
        </div>
      </div>
    );
  }

  const handleTransactionAdded = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  // Listen for budget form open events
  useEffect(() => {
    const handleOpenBudgetForm = () => setShowBudgetForm(true);
    const handleOpenGoalForm = () => setShowGoalForm(true);
    
    window.addEventListener('openBudgetForm', handleOpenBudgetForm);
    window.addEventListener('openGoalForm', handleOpenGoalForm);
    
    return () => {
      window.removeEventListener('openBudgetForm', handleOpenBudgetForm);
      window.removeEventListener('openGoalForm', handleOpenGoalForm);
    };
  }, []);

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
          <div className="finance-card p-6 max-w-6xl mx-auto">
            <h3 className="text-xl font-semibold mb-4 text-center">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
              <button 
                onClick={() => setShowBudgetForm(true)}
                className="p-6 rounded-xl border border-border/50 hover:border-warning/50 transition-all duration-300 group hover:shadow-lg"
              >
                <PiggyBank className="h-8 w-8 text-warning mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <p className="font-medium text-warning">Set Budget</p>
                <p className="text-sm text-muted-foreground mt-1">Control your spending</p>
              </button>
              <button 
                onClick={() => setShowGoalForm(true)}
                className="p-6 rounded-xl border border-border/50 hover:border-primary/50 transition-all duration-300 group hover:shadow-lg"
              >
                <Target className="h-8 w-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <p className="font-medium text-primary">Set Goal</p>
                <p className="text-sm text-muted-foreground mt-1">Plan your future</p>
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
      
      {/* Forms */}
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
      <BudgetForm 
        isOpen={showBudgetForm} 
        onClose={() => setShowBudgetForm(false)} 
      />
      <GoalForm 
        isOpen={showGoalForm} 
        onClose={() => setShowGoalForm(false)} 
      />
    </div>
  );
};

export default Dashboard;