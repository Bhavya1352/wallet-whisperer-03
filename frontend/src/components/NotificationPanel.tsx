import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Bell, AlertTriangle, TrendingUp, Target, DollarSign } from 'lucide-react';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationPanel = ({ isOpen, onClose }: NotificationPanelProps) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (isOpen) {
      generateNotifications();
    }
  }, [isOpen]);

  const generateNotifications = () => {
    const transactions = JSON.parse(localStorage.getItem('allTransactions') || '[]');
    const budgets = JSON.parse(localStorage.getItem('budgets') || '[]');
    const goals = JSON.parse(localStorage.getItem('goals') || '[]');
    
    const smartNotifications = [];
    let id = 1;

    // Welcome message if no data
    if (transactions.length === 0) {
      smartNotifications.push({
        id: id++,
        title: '👋 Welcome to Wallet Whisperer',
        message: 'Start adding transactions to get personalized insights!',
        time: 'Just now',
        icon: Bell,
        color: 'text-blue-600',
        bgColor: 'bg-blue-100'
      });
    }

    // Recent transaction notifications
    if (transactions.length > 0) {
      const recentTransaction = transactions[transactions.length - 1];
      smartNotifications.push({
        id: id++,
        title: recentTransaction.type === 'income' ? '💰 Income Added' : '💸 Expense Added',
        message: `${recentTransaction.description}: ${recentTransaction.type === 'income' ? '+' : '-'}$${recentTransaction.amount}`,
        time: '1 hour ago',
        icon: DollarSign,
        color: recentTransaction.type === 'income' ? 'text-green-600' : 'text-red-600',
        bgColor: recentTransaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
      });
    }

    // Budget notifications
    if (budgets.length > 0) {
      smartNotifications.push({
        id: id++,
        title: '📊 Budget Set',
        message: `${budgets[budgets.length - 1].category} budget: $${budgets[budgets.length - 1].amount}`,
        time: '2 hours ago',
        icon: Target,
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-100'
      });
    }

    // Goals notifications
    if (goals.length > 0) {
      smartNotifications.push({
        id: id++,
        title: '🎯 Goal Created',
        message: `${goals[goals.length - 1].title}: $${goals[goals.length - 1].targetAmount} target`,
        time: '3 hours ago',
        icon: Target,
        color: 'text-purple-600',
        bgColor: 'bg-purple-100'
      });
    }

    // Spending insights
    const expenses = transactions.filter(t => t.type === 'expense');
    if (expenses.length > 0) {
      const totalExpenses = expenses.reduce((sum, t) => sum + t.amount, 0);
      if (totalExpenses > 500) {
        smartNotifications.push({
          id: id++,
          title: '⚠️ High Spending Alert',
          message: `Total expenses: $${totalExpenses.toFixed(2)}. Consider reviewing your spending.`,
          time: '1 day ago',
          icon: AlertTriangle,
          color: 'text-red-600',
          bgColor: 'bg-red-100'
        });
      }
    }

    // Savings encouragement
    const income = transactions.filter(t => t.type === 'income');
    if (income.length > 0 && expenses.length > 0) {
      const totalIncome = income.reduce((sum, t) => sum + t.amount, 0);
      const totalExpenses = expenses.reduce((sum, t) => sum + t.amount, 0);
      const savingsRate = ((totalIncome - totalExpenses) / totalIncome) * 100;
      
      if (savingsRate > 20) {
        smartNotifications.push({
          id: id++,
          title: '🎉 Great Savings Rate!',
          message: `You're saving ${savingsRate.toFixed(1)}% of your income. Keep it up!`,
          time: '2 days ago',
          icon: TrendingUp,
          color: 'text-green-600',
          bgColor: 'bg-green-100'
        });
      }
    }

    setNotifications(smartNotifications);
  };

  const markAsRead = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications ({notifications.length})
            </DialogTitle>
            {notifications.length > 0 && (
              <Button variant="ghost" size="sm" onClick={clearAll}>
                Clear All
              </Button>
            )}
          </div>
        </DialogHeader>
        
        <div className="space-y-3">
          {notifications.length === 0 ? (
            <div className="text-center py-8">
              <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No new notifications</p>
              <p className="text-sm text-muted-foreground">You're all caught up!</p>
            </div>
          ) : (
            notifications.map((notification) => {
              const Icon = notification.icon;
              return (
                <div key={notification.id} className="p-3 border rounded-lg hover:bg-secondary/50 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-full ${notification.bgColor}`}>
                      <Icon className={`h-4 w-4 ${notification.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm">{notification.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-muted-foreground">{notification.time}</span>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => markAsRead(notification.id)}
                          className="text-xs h-6 px-2"
                        >
                          Mark as read
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationPanel;