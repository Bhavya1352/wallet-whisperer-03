import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface AddTransactionFormProps {
  isOpen: boolean;
  onClose: () => void;
  onTransactionAdded?: () => void;
  type: 'income' | 'expense';
}

const AddTransactionForm = ({ isOpen, onClose, onTransactionAdded, type }: AddTransactionFormProps) => {
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    category: '',
  });

  const categories = type === 'expense' 
    ? ['Food', 'Transport', 'Housing', 'Entertainment', 'Healthcare', 'Shopping', 'Other']
    : ['Salary', 'Freelance', 'Investment', 'Business', 'Other'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.amount || !formData.description || !formData.category) {
      alert('Please fill all fields');
      return;
    }

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const transaction = {
      id: Date.now(),
      type,
      amount: parseFloat(formData.amount),
      description: formData.description,
      category: formData.category,
      date: new Date().toISOString(),
      userId: user.id,
      userName: user.name,
      userEmail: user.email
    };

    // Save to localStorage
    const transactions = JSON.parse(localStorage.getItem('allTransactions') || '[]');
    transactions.push(transaction);
    localStorage.setItem('allTransactions', JSON.stringify(transactions));

    // Trigger multiple events for real-time updates
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new Event('refreshStats'));

    setFormData({ amount: '', description: '', category: '' });
    if (onTransactionAdded) onTransactionAdded();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add {type === 'income' ? 'Income' : 'Expense'}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="amount">Amount</Label>
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
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="Enter description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

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

          <div className="flex gap-2">
            <Button type="submit" className="flex-1">
              Add {type === 'income' ? 'Income' : 'Expense'}
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

export default AddTransactionForm;