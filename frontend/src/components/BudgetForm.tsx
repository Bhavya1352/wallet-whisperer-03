import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface BudgetFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const BudgetForm = ({ isOpen, onClose }: BudgetFormProps) => {
  const [formData, setFormData] = useState({
    category: '',
    amount: '',
    period: 'monthly',
  });

  const categories = ['Food', 'Transport', 'Housing', 'Entertainment', 'Healthcare', 'Shopping', 'Other'];
  const periods = ['weekly', 'monthly', 'yearly'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.category || !formData.amount) {
      alert('Please fill all fields');
      return;
    }

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const budget = {
      id: Date.now(),
      category: formData.category,
      amount: parseFloat(formData.amount),
      period: formData.period,
      userId: user.id,
      userName: user.name,
      createdAt: new Date().toISOString()
    };

    // Save to localStorage
    const budgets = JSON.parse(localStorage.getItem('allBudgets') || '[]');
    budgets.push(budget);
    localStorage.setItem('allBudgets', JSON.stringify(budgets));

    // Trigger events for real-time updates
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new Event('refreshStats'));

    setFormData({ category: '', amount: '', period: 'monthly' });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Set Budget</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="category">Category</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="amount">Budget Amount</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="period">Period</Label>
            <Select value={formData.period} onValueChange={(value) => setFormData({ ...formData, period: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {periods.map((period) => (
                  <SelectItem key={period} value={period}>
                    {period.charAt(0).toUpperCase() + period.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
            <Button type="submit" className="flex-1">
              Set Budget
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

export default BudgetForm;