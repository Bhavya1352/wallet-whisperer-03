import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PiggyBank, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const BudgetQuickView = () => {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBudgets();
    
    // Listen for storage changes to update budgets in real-time
    const handleStorageChange = () => {
      fetchBudgets();
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const fetchBudgets = () => {
    try {
      const budgets = JSON.parse(localStorage.getItem('allBudgets') || '[]');
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      
      // Filter budgets for current user only
      const userBudgets = budgets.filter(b => b.userId === user.id);
      setBudgets(userBudgets);
    } catch (error) {
      console.log('Budget fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card className="finance-card">
        <CardHeader>
          <CardTitle>Budget Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-muted rounded w-24 mb-2"></div>
                <div className="h-2 bg-muted rounded"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="finance-card">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center">
            <PiggyBank className="h-5 w-5 mr-2" />
            Budget Overview
          </span>
          {budgets.length > 0 && (
            <span className="text-sm text-muted-foreground font-normal">
              {budgets.length} budgets
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {budgets.length > 0 ? (
          <div className="space-y-4">
            {budgets.slice(0, 3).map((budget, index) => {
              // Calculate spending for this category (user-specific)
              const transactions = JSON.parse(localStorage.getItem('allTransactions') || '[]');
              const user = JSON.parse(localStorage.getItem('user') || '{}');
              const categorySpending = transactions
                .filter(t => t.type === 'expense' && t.category === budget.category && t.userId === user.id)
                .reduce((sum, t) => sum + t.amount, 0);
              const progressPercentage = Math.min((categorySpending / budget.amount) * 100, 100);
              
              return (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{budget.category}</span>
                    <span className="text-muted-foreground">
                      ${categorySpending.toFixed(2)} / ${budget.amount} ({budget.period})
                    </span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                  <div className="text-xs text-muted-foreground text-right">
                    {progressPercentage.toFixed(1)}% used
                  </div>
                </div>
              );
            })}
            {budgets.length > 3 && (
              <p className="text-xs text-muted-foreground text-center">
                +{budgets.length - 3} more budgets
              </p>
            )}
          </div>
        ) : (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto">
              <PiggyBank className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-medium text-muted-foreground">No Budgets Set</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Create budgets to track your spending limits
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={() => window.dispatchEvent(new CustomEvent('openBudgetForm'))}>
              <Plus className="h-4 w-4 mr-2" />
              Create Budget
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BudgetQuickView;