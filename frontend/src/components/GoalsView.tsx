import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";

const GoalsView = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGoals();
    
    // Listen for storage changes to update goals in real-time
    const handleStorageChange = () => {
      fetchGoals();
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const fetchGoals = () => {
    try {
      const goals = JSON.parse(localStorage.getItem('allGoals') || '[]');
      setGoals(goals);
    } catch (error) {
      console.log('Goals fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card className="finance-card">
        <CardHeader>
          <CardTitle>Financial Goals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="h-16 bg-muted rounded"></div>
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
            <Target className="h-5 w-5 mr-2" />
            Financial Goals
          </span>
          {goals.length > 0 && (
            <span className="text-sm text-muted-foreground font-normal">
              {goals.length} goals
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {goals.length > 0 ? (
          <div className="space-y-4">
            {goals.slice(0, 3).map((goal: any, index) => (
              <div key={index} className="p-3 rounded-lg bg-secondary/20 space-y-2">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">{goal.title}</h4>
                  <span className="text-sm text-muted-foreground">${goal.targetAmount}</span>
                </div>
                <div className="text-sm text-muted-foreground">{goal.category}</div>
              </div>
            ))}
            {goals.length > 3 && (
              <p className="text-xs text-muted-foreground text-center">
                +{goals.length - 3} more goals
              </p>
            )}
          </div>
        ) : (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto">
              <Target className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-medium text-muted-foreground">No Goals Set</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Set financial goals to track your progress
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={() => window.dispatchEvent(new CustomEvent('openGoalForm'))}>
              <Plus className="h-4 w-4 mr-2" />
              Create Goal
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GoalsView;