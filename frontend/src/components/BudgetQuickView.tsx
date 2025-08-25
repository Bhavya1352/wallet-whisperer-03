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
  }, []);

  const fetchBudgets = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/budgets');
      if (response.ok) {
        const data = await response.json();
        setBudgets(data.budgets || []);
      }
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
            {budgets.slice(0, 3).map((budget, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{budget.category}</span>
                  <span className="text-muted-foreground">
                    ${budget.amount} / {budget.period}
                  </span>
                </div>
                <Progress value={Math.random() * 100} className="h-2" />
              </div>
            ))}
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
            <Button variant="outline" size="sm">
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