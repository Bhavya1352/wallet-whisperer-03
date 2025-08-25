import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";

const SmartInsights = () => {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInsights();
    
    // Listen for storage changes to update insights in real-time
    const handleStorageChange = () => {
      fetchInsights();
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const fetchInsights = () => {
    try {
      const transactions = JSON.parse(localStorage.getItem('allTransactions') || '[]');
      const generatedInsights = generateInsights(transactions);
      setInsights(generatedInsights);
    } catch (error) {
      console.log('Insights fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateInsights = (transactions) => {
    const insights = [];
    
    if (transactions.length === 0) {
      return [
        {
          type: "info",
          icon: Lightbulb,
          title: "Welcome to Wallet Whisperer!",
          message: "Start by adding your first transaction to see personalized insights.",
          color: "text-primary"
        }
      ];
    }

    const income = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const expenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    const balance = income - expenses;

    // Savings rate insight
    if (income > 0) {
      const savingsRate = ((income - expenses) / income) * 100;
      if (savingsRate > 20) {
        insights.push({
          type: "success",
          icon: CheckCircle,
          title: "Great Savings Rate!",
          message: `You're saving ${savingsRate.toFixed(1)}% of your income. Keep it up!`,
          color: "text-success"
        });
      } else if (savingsRate < 10) {
        insights.push({
          type: "warning",
          icon: AlertTriangle,
          title: "Low Savings Rate",
          message: `You're only saving ${savingsRate.toFixed(1)}% of your income. Consider reducing expenses.`,
          color: "text-warning"
        });
      }
    }

    // Spending pattern insight
    const expensesByCategory = {};
    transactions.filter(t => t.type === 'expense').forEach(t => {
      expensesByCategory[t.category] = (expensesByCategory[t.category] || 0) + t.amount;
    });

    const topCategory = Object.entries(expensesByCategory)
      .sort(([,a], [,b]) => b - a)[0];

    if (topCategory) {
      const [category, amount] = topCategory;
      const percentage = ((amount / expenses) * 100).toFixed(1);
      insights.push({
        type: "info",
        icon: TrendingUp,
        title: "Top Spending Category",
        message: `${category} accounts for ${percentage}% of your expenses ($${amount.toFixed(2)}).`,
        color: "text-primary"
      });
    }

    // Balance insight
    if (balance > 0) {
      insights.push({
        type: "success",
        icon: CheckCircle,
        title: "Positive Balance",
        message: `You have a positive balance of $${balance.toFixed(2)}. Great financial management!`,
        color: "text-success"
      });
    } else if (balance < 0) {
      insights.push({
        type: "warning",
        icon: AlertTriangle,
        title: "Negative Balance",
        message: `Your expenses exceed income by $${Math.abs(balance).toFixed(2)}. Consider reviewing your spending.`,
        color: "text-destructive"
      });
    }

    return insights.slice(0, 3); // Show max 3 insights
  };

  if (loading) {
    return (
      <Card className="finance-card">
        <CardHeader>
          <CardTitle>Smart Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="animate-pulse flex space-x-3">
                <div className="w-8 h-8 bg-muted rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-3 bg-muted rounded w-full"></div>
                </div>
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
        <CardTitle className="flex items-center">
          <Lightbulb className="h-5 w-5 mr-2" />
          Smart Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <div key={index} className="flex space-x-3 p-3 rounded-lg bg-secondary/20">
              <div className={`p-1 rounded-full bg-background`}>
                <insight.icon className={`h-4 w-4 ${insight.color}`} />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-sm">{insight.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">{insight.message}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartInsights;