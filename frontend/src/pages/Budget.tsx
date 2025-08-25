import { useState, useEffect } from 'react';
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import BudgetForm from "@/components/BudgetForm";
import { PiggyBank, Plus, TrendingDown } from 'lucide-react';

const Budget = () => {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showBudgetForm, setShowBudgetForm] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
      fetchBudgets();
    }
  }, []);

  // Authentication check
  if (!user) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md mx-auto text-center">
            <div className="text-red-600 text-6xl mb-4">🔒</div>
            <h2 className="text-2xl font-bold text-red-800 mb-4">Login Required</h2>
            <p className="text-red-700">Please login to manage budgets</p>
          </div>
        </div>
      </div>
    );
  }

  const fetchBudgets = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) return;

      // Fetch both budgets and transactions to calculate spent amounts
      const [budgetsRes, transactionsRes] = await Promise.all([
        fetch('http://localhost:3001/api/budgets', {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch('http://localhost:3001/api/admin/transactions')
      ]);
      
      const budgetsData = await budgetsRes.json();
      const transactionsData = await transactionsRes.json();
      
      if (budgetsData.success) {
        // Calculate spent amount for each budget
        const budgetsWithSpent = budgetsData.budgets.map(budget => {
          const categoryTransactions = transactionsData.transactions?.filter(t => 
            t.type === 'expense' && t.category === budget.category
          ) || [];
          
          const spent = categoryTransactions.reduce((sum, t) => sum + t.amount, 0);
          
          return {
            ...budget,
            spent: spent
          };
        });
        
        setBudgets(budgetsWithSpent);
      }
    } catch (error) {
      console.error('Error fetching budgets:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSpentPercentage = (spent: number, amount: number) => {
    return Math.min((spent / amount) * 100, 100);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Budget Management</h1>
              <p className="text-muted-foreground">Track your spending against budgets</p>
            </div>
            <Button onClick={() => setShowBudgetForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Set New Budget
            </Button>
          </div>

          {/* Budgets Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              <p>Loading budgets...</p>
            ) : budgets.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <PiggyBank className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No budgets set</h3>
                <p className="text-muted-foreground mb-4">Create your first budget to start tracking expenses</p>
                <Button onClick={() => setShowBudgetForm(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Budget
                </Button>
              </div>
            ) : (
              budgets.map((budget: any) => {
                const spent = budget.spent || 0;
                const spentPercentage = getSpentPercentage(spent, budget.amount);
                const remaining = budget.amount - spent;
                
                return (
                  <div key={budget._id} className="finance-card p-6 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">{budget.category}</h3>
                        <p className="text-sm text-muted-foreground capitalize">{budget.period}</p>
                      </div>
                      <div className={`p-2 rounded-full ${
                        spentPercentage > 90 ? 'bg-red-100 text-red-600' :
                        spentPercentage > 70 ? 'bg-yellow-100 text-yellow-600' :
                        'bg-green-100 text-green-600'
                      }`}>
                        <TrendingDown className="h-4 w-4" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>${spent.toFixed(2)} spent</span>
                        <span>${budget.amount.toFixed(2)} budget</span>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            spentPercentage > 90 ? 'bg-red-500' :
                            spentPercentage > 70 ? 'bg-yellow-500' :
                            'bg-green-500'
                          }`}
                          style={{ width: `${spentPercentage}%` }}
                        />
                      </div>
                      
                      <div className="flex justify-between items-center text-sm">
                        <span className={`font-medium ${
                          remaining < 0 ? 'text-red-600' : 'text-green-600'
                        }`}>
                          ${Math.abs(remaining).toFixed(2)} {remaining < 0 ? 'over budget' : 'remaining'}
                        </span>
                        <span className="text-muted-foreground">
                          {spentPercentage.toFixed(1)}% used
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      <BudgetForm 
        isOpen={showBudgetForm} 
        onClose={() => {
          setShowBudgetForm(false);
          // Small delay to ensure backend saves data
          setTimeout(() => {
            fetchBudgets(); // Refresh after adding
          }, 500);
        }} 
      />
    </div>
  );
};

export default Budget;