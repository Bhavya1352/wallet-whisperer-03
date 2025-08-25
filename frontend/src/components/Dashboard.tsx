import { Wallet, TrendingUp, TrendingDown, PiggyBank, CreditCard, Target } from "lucide-react";
import SmartDashboard from "./SmartDashboard";
import AddTransactionForm from "./AddTransactionForm";
import BudgetForm from "./BudgetForm";
import GoalForm from "./GoalForm";
import GoalsView from "./GoalsView";
import ClearDataButton from "./ClearDataButton";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [showIncomeForm, setShowIncomeForm] = useState(false);
  const [showBudgetForm, setShowBudgetForm] = useState(false);
  const [showGoalForm, setShowGoalForm] = useState(false);
  const [showGoalsView, setShowGoalsView] = useState(false);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold gradient-text mb-4">Welcome to Wallet Whisperer</h2>
          <p className="text-xl text-muted-foreground">Please login to access your dashboard</p>
        </div>
      </div>
    );
  }

  return (
    <div id="dashboard" className="min-h-screen bg-gradient-to-br from-background to-secondary/20 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <h2 className="text-4xl font-bold gradient-text">Financial Dashboard</h2>
                <p className="text-xl text-muted-foreground">Welcome back, {user.name}!</p>
              </div>
              <ClearDataButton />
            </div>
          </div>

          <div className="finance-card p-6 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold mb-4 text-center">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button 
                onClick={() => setShowIncomeForm(true)}
                className="p-4 rounded-xl border border-border/50 hover:border-success/50 transition-colors group"
              >
                <TrendingUp className="h-6 w-6 text-success mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-sm font-medium">Add Income</p>
              </button>
              <button 
                onClick={() => setShowExpenseForm(true)}
                className="p-4 rounded-xl border border-border/50 hover:border-primary/50 transition-colors group"
              >
                <CreditCard className="h-6 w-6 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-sm font-medium">Add Expense</p>
              </button>
              <button 
                onClick={() => setShowBudgetForm(true)}
                className="p-4 rounded-xl border border-border/50 hover:border-warning/50 transition-colors group"
              >
                <PiggyBank className="h-6 w-6 text-warning mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-sm font-medium">Set Budget</p>
              </button>
              <button 
                onClick={() => setShowGoalForm(true)}
                className="p-4 rounded-xl border border-border/50 hover:border-accent/50 transition-colors group"
              >
                <Target className="h-6 w-6 text-accent mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-sm font-medium">Set Goal</p>
              </button>
            </div>
          </div>

          <SmartDashboard />
        </div>
      </div>
      
      <AddTransactionForm 
        isOpen={showExpenseForm} 
        onClose={() => {
          setShowExpenseForm(false);
          // Force refresh to update all components
          setTimeout(() => window.location.reload(), 100);
        }} 
        type="expense" 
      />
      <AddTransactionForm 
        isOpen={showIncomeForm} 
        onClose={() => {
          setShowIncomeForm(false);
          // Force refresh to update all components
          setTimeout(() => window.location.reload(), 100);
        }} 
        type="income" 
      />
      <BudgetForm 
        isOpen={showBudgetForm} 
        onClose={() => {
          setShowBudgetForm(false);
          setTimeout(() => window.location.reload(), 100);
        }} 
      />
      <GoalForm 
        isOpen={showGoalForm} 
        onClose={() => {
          setShowGoalForm(false);
          setTimeout(() => window.location.reload(), 100);
        }} 
      />
      <GoalsView 
        isOpen={showGoalsView} 
        onClose={() => setShowGoalsView(false)} 
      />

    </div>
  );
};

export default Dashboard;