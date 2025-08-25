import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Bell, AlertTriangle, TrendingUp, Target, Calendar, Brain, DollarSign } from 'lucide-react';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationPanel = ({ isOpen, onClose }: NotificationPanelProps) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      generateSmartNotifications();
    }
  }, [isOpen]);

  const generateSmartNotifications = async () => {
    setLoading(true);
    try {
      // Fetch user's financial data
      const [insightsRes, transactionsRes] = await Promise.all([
        fetch('http://localhost:3001/api/insights/weekly'),
        fetch('http://localhost:3001/api/transactions')
      ]);
      
      const insights = await insightsRes.json();
      const transactions = await transactionsRes.json();
      
      const smartNotifications = [];
      let notificationId = 1;
      
      // Smart spending alert
      if (insights.success && insights.insights.weeklySpending > 300) {
        smartNotifications.push({
          id: notificationId++,
          type: 'spending_alert',
          title: '⚠️ High Spending Alert',
          message: `You've spent $${insights.insights.weeklySpending} this week. Consider reviewing your expenses.`,
          time: 'Just now',
          icon: AlertTriangle,
          color: 'text-red-600',
          bgColor: 'bg-red-100'
        });
      }
      
      // Savings rate notification
      if (insights.success) {
        const savingsRate = parseFloat(insights.insights.savingsRate);
        if (savingsRate > 20) {
          smartNotifications.push({
            id: notificationId++,
            type: 'savings_good',
            title: '🎉 Great Savings Rate!',
            message: `Your savings rate is ${insights.insights.savingsRate}. You're doing excellent!`,
            time: '1 hour ago',
            icon: TrendingUp,
            color: 'text-green-600',
            bgColor: 'bg-green-100'
          });
        } else if (savingsRate < 10) {
          smartNotifications.push({
            id: notificationId++,
            type: 'savings_low',
            title: '💡 Improve Your Savings',
            message: `Your savings rate is ${insights.insights.savingsRate}. Try to save at least 20% of income.`,
            time: '2 hours ago',
            icon: Target,
            color: 'text-yellow-600',
            bgColor: 'bg-yellow-100'
          });
        }
      }
      
      // Recent transaction notifications
      if (transactions.success && transactions.transactions.length > 0) {
        const recentTransaction = transactions.transactions[0];
        if (recentTransaction.type === 'income') {
          smartNotifications.push({
            id: notificationId++,
            type: 'income_added',
            title: '💰 Income Added',
            message: `${recentTransaction.description}: +$${recentTransaction.amount}`,
            time: '1 day ago',
            icon: DollarSign,
            color: 'text-green-600',
            bgColor: 'bg-green-100'
          });
        }
        
        // Check for high expense
        const highExpenses = transactions.transactions.filter(t => 
          t.type === 'expense' && t.amount > 100
        );
        
        if (highExpenses.length > 0) {
          smartNotifications.push({
            id: notificationId++,
            type: 'high_expense',
            title: '📊 Large Expense Detected',
            message: `${highExpenses[0].description}: -$${highExpenses[0].amount}`,
            time: '2 days ago',
            icon: AlertTriangle,
            color: 'text-orange-600',
            bgColor: 'bg-orange-100'
          });
        }
      }
      
      // AI Insights notification
      smartNotifications.push({
        id: notificationId++,
        type: 'ai_insight',
        title: '🧠 AI Insight Available',
        message: 'New financial insights are ready. Click Smart Insights to view analysis.',
        time: '3 hours ago',
        icon: Brain,
        color: 'text-purple-600',
        bgColor: 'bg-purple-100'
      });
      
      // Monthly review reminder
      smartNotifications.push({
        id: notificationId++,
        type: 'monthly_review',
        title: '📅 Monthly Review Time',
        message: 'Review your spending patterns and set goals for next month.',
        time: '1 week ago',
        icon: Calendar,
        color: 'text-blue-600',
        bgColor: 'bg-blue-100'
      });
      
      setNotifications(smartNotifications);
    } catch (error) {
      console.error('Error generating notifications:', error);
      // Fallback to welcome message
      setNotifications([{
        id: 1,
        type: 'welcome',
        title: '👋 Welcome to Wallet Whisperer',
        message: 'Start adding transactions to get personalized insights and notifications.',
        time: 'Just now',
        icon: Bell,
        color: 'text-blue-600',
        bgColor: 'bg-blue-100'
      }]);
    }
    setLoading(false);
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
          {loading ? (
            <div className="text-center py-8">
              <Brain className="h-12 w-12 mx-auto text-purple-500 mb-4 animate-pulse" />
              <p className="text-muted-foreground">Generating smart notifications...</p>
            </div>
          ) : notifications.length === 0 ? (
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