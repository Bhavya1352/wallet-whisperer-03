import { Wallet, TrendingUp, TrendingDown, PiggyBank, CreditCard, Target, Brain, Rocket } from "lucide-react";
import StatsCard from "./StatsCard";
import TransactionList from "./TransactionList";
import SpendingChart from "./SpendingChart";
import AddTransactionForm from "./AddTransactionForm";
import BudgetForm from "./BudgetForm";
import GoalForm from "./GoalForm";
import GoalsView from "./GoalsView";
import SmartInsights from "./SmartInsights";
import FeatureShowcase from "./FeatureShowcase";
import BudgetQuickView from "./BudgetQuickView";
import RealStatsCards from "./RealStatsCards";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [showIncomeForm, setShowIncomeForm] = useState(false);
  const [showBudgetForm, setShowBudgetForm] = useState(false);
  const [showGoalForm, setShowGoalForm] = useState(false);
  const [showGoalsView, setShowGoalsView] = useState(false);
  const [showSmartInsights, setShowSmartInsights] = useState(false);
  const [showFeatureShowcase, setShowFeatureShowcase] = useState(false);
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
          <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md mx-auto">
            <div className="text-red-600 text-6xl mb-4">🔒</div>
            <h2 className="text-2xl font-bold text-red-800 mb-4">Access Denied</h2>
            <p className="text-red-700 mb-6">You must be logged in to access the dashboard</p>
            <div className="space-y-3">
              <p className="text-sm text-red-600">Please:</p>
              <ul className="text-sm text-red-600 space-y-1">
                <li>• Click Login button in navbar</li>
                <li>• Register if you don't have account</li>
                <li>• Enter valid credentials</li>
              </ul>
            </div>
          </div>
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

          <RealStatsCards />

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
                
                <div className="space-y-2 mt-4">
                  <button 
                    onClick={() => setShowSmartInsights(true)}
                    className="w-full p-4 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 transition-all group"
                  >
                    <Brain className="h-6 w-6 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                    <p className="font-medium">🧠 Smart Insights</p>
                    <p className="text-xs opacity-90">AI-powered analysis</p>
                  </button>
                  
                  <button 
                    onClick={() => setShowFeatureShowcase(true)}
                    className="w-full p-4 rounded-xl bg-gradient-to-r from-green-500 to-teal-500 text-white hover:from-green-600 hover:to-teal-600 transition-all group"
                  >
                    <Rocket className="h-6 w-6 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                    <p className="font-medium">🚀 All Features Demo</p>
                    <p className="text-xs opacity-90">Live API showcase</p>
                  </button>
                </div>
              </div>
              
              {showSmartInsights && (
                <div className="finance-card p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">Smart Financial Insights</h3>
                    <button 
                      onClick={() => setShowSmartInsights(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      ✕
                    </button>
                  </div>
                  <SmartInsights userId={user?._id} />
                </div>
              )}
              
              {showFeatureShowcase && (
                <div className="finance-card p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">All Features Live Demo</h3>
                    <button 
                      onClick={() => setShowFeatureShowcase(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      ✕
                    </button>
                  </div>
                  <FeatureShowcase />
                </div>
              )}

              {!showSmartInsights && !showFeatureShowcase && (
                <>
                  <TransactionList />
                  
                  {/* Quick Budget View */}
                  <div className="finance-card p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-semibold">Recent Budgets</h3>
                      <button 
                        onClick={() => setShowBudgetForm(true)}
                        className="text-sm text-primary hover:text-primary-light transition-colors"
                      >
                        View All
                      </button>
                    </div>
                    <BudgetQuickView />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <AddTransactionForm 
        isOpen={showExpenseForm} 
        onClose={() => {
          setShowExpenseForm(false);
          window.location.reload(); // Refresh to show new data
        }} 
        type="expense" 
      />
      <AddTransactionForm 
        isOpen={showIncomeForm} 
        onClose={() => {
          setShowIncomeForm(false);
          window.location.reload(); // Refresh to show new data
        }} 
        type="income" 
      />
      <BudgetForm 
        isOpen={showBudgetForm} 
        onClose={() => {
          setShowBudgetForm(false);
          window.location.reload();
        }} 
      />
      <GoalForm 
        isOpen={showGoalForm} 
        onClose={() => {
          setShowGoalForm(false);
          window.location.reload();
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