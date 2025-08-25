import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface GoalFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const GoalForm = ({ isOpen, onClose }: GoalFormProps) => {
  const [formData, setFormData] = useState({
    title: '',
    targetAmount: '',
    deadline: '',
    category: 'Savings',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.targetAmount) {
      alert('Please fill title and target amount');
      return;
    }

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const goal = {
      id: Date.now(),
      title: formData.title,
      targetAmount: parseFloat(formData.targetAmount),
      currentAmount: 0,
      deadline: formData.deadline,
      category: formData.category,
      userId: user.id,
      createdAt: new Date().toISOString()
    };

    // Save to localStorage
    const goals = JSON.parse(localStorage.getItem('goals') || '[]');
    goals.push(goal);
    localStorage.setItem('goals', JSON.stringify(goals));

    alert('Goal created successfully!');
    setFormData({ title: '', targetAmount: '', deadline: '', category: 'Savings' });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Savings Goal</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Goal Title</Label>
            <Input
              id="title"
              placeholder="e.g., Emergency Fund, Vacation, New Car"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="targetAmount">Target Amount</Label>
            <Input
              id="targetAmount"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={formData.targetAmount}
              onChange={(e) => setFormData({ ...formData, targetAmount: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="deadline">Target Date (Optional)</Label>
            <Input
              id="deadline"
              type="date"
              value={formData.deadline}
              onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              placeholder="e.g., Savings, Investment, Emergency"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            />
          </div>

          <div className="flex gap-2">
            <Button type="submit" className="flex-1">
              Create Goal
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default GoalForm;