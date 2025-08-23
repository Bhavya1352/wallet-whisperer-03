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
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login first');
        return;
      }

      const response = await fetch('http://localhost:5000/api/goals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          targetAmount: parseFloat(formData.targetAmount),
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert('Goal created successfully!');
        setFormData({ title: '', targetAmount: '', deadline: '', category: 'Savings' });
        onClose();
      } else {
        alert(data.message || 'Error creating goal');
      }
    } catch (error) {
      console.error('Error creating goal:', error);
      alert('Error creating goal');
    } finally {
      setLoading(false);
    }
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
            <Label htmlFor="deadline">Target Date</Label>
            <Input
              id="deadline"
              type="date"
              value={formData.deadline}
              onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              required
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
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? 'Creating...' : 'Create Goal'}
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