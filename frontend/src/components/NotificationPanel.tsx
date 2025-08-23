import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Bell, AlertTriangle, TrendingUp, Target, Calendar } from 'lucide-react';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationPanel = ({ isOpen, onClose }: NotificationPanelProps) => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'budget_alert',
      title: 'Budget Alert: Food Category',
      message: 'You have spent 85% of your monthly food budget',
      time: '2 hours ago',
      icon: AlertTriangle,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      id: 2,
      type: 'goal_progress',
      title: 'Goal Progress Update',
      message: 'Emergency Fund goal is 60% complete! Keep going!',
      time: '1 day ago',
      icon: Target,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      id: 3,
      type: 'income_added',
      title: 'Income Added',
      message: 'Salary of $5,000 has been added to your account',
      time: '2 days ago',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      id: 4,
      type: 'budget_exceeded',
      title: 'Budget Exceeded',
      message: 'Shopping budget exceeded by $150 this month',
      time: '3 days ago',
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    {
      id: 5,
      type: 'reminder',
      title: 'Monthly Review Reminder',
      message: 'Time to review your monthly expenses and budget',
      time: '1 week ago',
      icon: Calendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ]);

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