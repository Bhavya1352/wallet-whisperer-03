import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Target, Calendar, DollarSign } from 'lucide-react';

interface GoalsViewProps {
  isOpen: boolean;
  onClose: () => void;
}

const GoalsView = ({ isOpen, onClose }: GoalsViewProps) => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchGoals = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch('http://localhost:5000/api/goals', {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      const data = await response.json();
      if (data.success) {
        setGoals(data.goals);
      }
    } catch (error) {
      console.error('Error fetching goals:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchGoals();
    }
  }, [isOpen]);

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Your Savings Goals</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {loading && <p>Loading goals...</p>}
          
          {goals.length === 0 && !loading ? (
            <div className="text-center py-8">
              <Target className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No goals set yet</p>
              <p className="text-sm text-muted-foreground">Create your first savings goal to get started!</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {goals.map((goal: any) => {
                const progress = getProgressPercentage(goal.currentAmount, goal.targetAmount);
                const daysLeft = Math.ceil((new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                
                return (
                  <div key={goal._id} className="p-4 border rounded-lg space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{goal.title}</h3>
                        <p className="text-sm text-muted-foreground">{goal.category}</p>
                      </div>
                      <div className={`px-2 py-1 rounded text-xs ${
                        goal.status === 'completed' ? 'bg-green-100 text-green-800' :
                        goal.status === 'active' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {goal.status}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>${goal.currentAmount.toFixed(2)} saved</span>
                        <span>${goal.targetAmount.toFixed(2)} target</span>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      
                      <div className="flex justify-between items-center text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-3 w-3" />
                          <span>{progress.toFixed(1)}% complete</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>
                            {daysLeft > 0 ? `${daysLeft} days left` : 'Overdue'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GoalsView;