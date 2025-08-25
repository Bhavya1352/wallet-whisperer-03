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
import ClearDataButton from "./ClearDataButton";

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
          <div className="text-center space-y-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-3xl"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
                <div className="flex items-center justify-center mb-4">
                  <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full">
                    <Wallet className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  📊 Financial Dashboard
                </h2>
                <p className="text-xl text-gray-600 mt-2">
                  Welcome back, <span className="font-semibold text-blue-600">{user?.name}</span>! 🚀
                </p>
                <div className="flex items-center justify-center gap-4 mt-4">
                  <div className="text-sm text-gray-500">
                    ✨ Your personal finance command center
                  </div>
                  <ClearDataButton />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 max-w-6xl mx-auto shadow-xl border border-white/20">
            <h3 className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ⚡ Quick Actions
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <button 
                onClick={() => setShowIncomeForm(true)}
                className="relative p-6 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 hover:border-green-400 transition-all duration-300 group hover:shadow-2xl hover:scale-105 transform"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-green-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <TrendingUp className="h-10 w-10 text-green-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <p className="font-bold text-green-700">💰 Add Income</p>
                  <p className="text-sm text-green-600 mt-2">Track your earnings</p>
                </div>
              </button>
              
              <button 
                onClick={() => setShowExpenseForm(true)}
                className="relative p-6 rounded-2xl bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 hover:border-red-400 transition-all duration-300 group hover:shadow-2xl hover:scale-105 transform"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-400/20 to-red-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <TrendingDown className="h-10 w-10 text-red-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <p className="font-bold text-red-700">💳 Add Expense</p>
                  <p className="text-sm text-red-600 mt-2">Record your spending</p>
                </div>
              </button>
              
              <button 
                onClick={() => setShowBudgetForm(true)}
                className="relative p-6 rounded-2xl bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-200 hover:border-yellow-400 transition-all duration-300 group hover:shadow-2xl hover:scale-105 transform"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <PiggyBank className="h-10 w-10 text-yellow-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <p className="font-bold text-yellow-700">💰 Set Budget</p>
                  <p className="text-sm text-yellow-600 mt-2">Control your spending</p>
                </div>
              </button>
              
              <button 
                onClick={() => setShowGoalForm(true)}
                className="relative p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 hover:border-purple-400 transition-all duration-300 group hover:shadow-2xl hover:scale-105 transform"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-purple-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <Target className="h-10 w-10 text-purple-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <p className="font-bold text-purple-700">🎯 Set Goal</p>
                  <p className="text-sm text-purple-600 mt-2">Plan your future</p>
                </div>
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