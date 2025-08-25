import { useState, useEffect } from "react";
import { Wallet, TrendingUp, TrendingDown, PiggyBank } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DynamicStatsCards = () => {
  const [stats, setStats] = useState({
    totalBalance: 0,
    totalIncome: 0,
    totalExpenses: 0,
    savings: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
    
    // Listen for storage changes to update stats in real-time
    const handleStorageChange = () => {
      fetchStats();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom refresh events
    window.addEventListener('refreshStats', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('refreshStats', handleStorageChange);
    };
  }, []);

  const fetchStats = () => {
    try {
      const transactions = JSON.parse(localStorage.getItem('allTransactions') || '[]');
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      
      // Filter transactions for current user only
      const userTransactions = transactions.filter(t => t.userId === user.id);
      
      const income = userTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
        
      const expenses = userTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
        
      const balance = income - expenses;
      const savings = balance > 0 ? balance : 0;
      
      setStats({
        totalBalance: balance,
        totalIncome: income,
        totalExpenses: expenses,
        savings: savings
      });
    } catch (error) {
      console.log('Stats fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const statsData = [
    {
      title: "Total Balance",
      value: formatCurrency(stats.totalBalance),
      icon: Wallet,
      color: stats.totalBalance >= 0 ? "text-success" : "text-destructive",
      bgColor: stats.totalBalance >= 0 ? "bg-success/10" : "bg-destructive/10"
    },
    {
      title: "Total Income",
      value: formatCurrency(stats.totalIncome),
      icon: TrendingUp,
      color: "text-success",
      bgColor: "bg-success/10"
    },
    {
      title: "Total Expenses",
      value: formatCurrency(stats.totalExpenses),
      icon: TrendingDown,
      color: "text-destructive",
      bgColor: "bg-destructive/10"
    },
    {
      title: "Savings",
      value: formatCurrency(stats.savings),
      icon: PiggyBank,
      color: "text-primary",
      bgColor: "bg-primary/10"
    }
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-2">
              <div className="h-4 bg-muted rounded w-24"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-muted rounded w-20"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsData.map((stat, index) => (
        <Card key={index} className="finance-card hover:shadow-lg transition-all duration-300 group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${stat.bgColor} group-hover:scale-110 transition-transform`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${stat.color}`}>
              {stat.value}
            </div>
            {stats.totalIncome === 0 && stats.totalExpenses === 0 ? (
              <p className="text-xs text-muted-foreground mt-1">
                Add transactions to see real data
              </p>
            ) : (
              <p className="text-xs text-muted-foreground mt-1">
                Updated with your data
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DynamicStatsCards;