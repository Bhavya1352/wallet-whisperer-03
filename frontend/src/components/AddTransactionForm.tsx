import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface AddTransactionFormProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'income' | 'expense';
}

const AddTransactionForm = ({ isOpen, onClose, type }: AddTransactionFormProps) => {
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
      amount: parseFloat(formData.amount),
      description: formData.description,
      category: formData.category,
      type,
      id: Date.now(),
      date: new Date().toISOString(),
      userId: user.id || Date.now(),
      userName: user.name || 'Unknown User',
      userEmail: user.email || 'unknown@email.com'
    };

    try {
      const transactions = JSON.parse(localStorage.getItem('allTransactions') || '[]');
      transactions.push(transaction);
      localStorage.setItem('allTransactions', JSON.stringify(transactions));
      
      alert(`${type === 'income' ? 'Income' : 'Expense'} added successfully!`);
      setFormData({ amount: '', description: '', category: '' });
      onClose();
    } catch (error) {
      console.error('Error:', error);
      alert('Error adding transaction');
    }
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