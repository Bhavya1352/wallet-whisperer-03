import { Wallet, TrendingUp, TrendingDown, PiggyBank, CreditCard, Target } from "lucide-react";
import StatsCard from "./StatsCard";
import TransactionList from "./TransactionList";
import SpendingChart from "./SpendingChart";
import AddTransactionForm from "./AddTransactionForm";
import BudgetForm from "./BudgetForm";
import GoalForm from "./GoalForm";
import GoalsView from "./GoalsView";
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
            <h2 className="text-4xl font-bold gradient-text">Financial Dashboard</h2>
            <p className="text-xl text-muted-foreground">Welcome back, {user.name}!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              title="Total Balance"
              amount="$24,580.00"
              change="+12.5% from last month"
              changeType="positive"
              icon={Wallet}
              variant="success"
            />
            <StatsCard
              title="Monthly Income"
              amount="$8,450.00"
              change="+8.2% from last month"
              changeType="positive"
              icon={TrendingUp}
              variant="success"
            />
            <StatsCard
              title="Monthly Expenses"
              amount="$3,250.00"
              change="-5.1% from last month"
              changeType="negative"
              icon={TrendingDown}
              variant="warning"
            />
            <StatsCard
              title="Savings Goal"
              amount="$15,000.00"
              change="78% completed"
              changeType="positive"
              icon={Target}
              variant="primary"
            />
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <SpendingChart />
            </div>

            <div className="space-y-6">
              <div className="finance-card p-6">
                <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => setShowExpenseForm(true)}
                    className="p-4 rounded-xl border border-border/50 hover:border-primary/50 transition-colors group"
                  >
                    <CreditCard className="h-6 w-6 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-sm font-medium">Add Expense</p>
                  </button>
                  <button 
                    onClick={() => setShowIncomeForm(true)}
                    className="p-4 rounded-xl border border-border/50 hover:border-success/50 transition-colors group"
                  >
                    <TrendingUp className="h-6 w-6 text-success mx-auto mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-sm font-medium">Add Income</p>
                  </button>
                  <button 
                    onClick={() => setShowBudgetForm(true)}
                    className="p-4 rounded-xl border border-border/50 hover:border-warning/50 transition-colors group"
                  >
                    <PiggyBank className="h-6 w-6 text-warning mx-auto mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-sm font-medium">Set Budget</p>
                  </button>
                  <button 
                    onClick={() => setShowGoalsView(true)}
                    className="p-4 rounded-xl border border-border/50 hover:border-accent/50 transition-colors group"
                  >
                    <Target className="h-6 w-6 text-accent mx-auto mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-sm font-medium">View Goals</p>
                  </button>
                </div>
              </div>

              <TransactionList />
            </div>
          </div>
        </div>
      </div>
      
      <AddTransactionForm 
        isOpen={showExpenseForm} 
        onClose={() => setShowExpenseForm(false)} 
        type="expense" 
      />
      <AddTransactionForm 
        isOpen={showIncomeForm} 
        onClose={() => setShowIncomeForm(false)} 
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
      <GoalsView 
        isOpen={showGoalsView} 
        onClose={() => setShowGoalsView(false)} 
      />
    </div>
  );
};

export default Dashboard;