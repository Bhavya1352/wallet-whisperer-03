import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { api } from '@/api';

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
  const [loading, setLoading] = useState(false);

  const categories = type === 'expense' 
    ? ['Food', 'Transport', 'Housing', 'Entertainment', 'Healthcare', 'Shopping', 'Other']
    : ['Salary', 'Freelance', 'Investment', 'Business', 'Other'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login first');
        return;
      }

      await api.addTransaction(token, {
        ...formData,
        amount: parseFloat(formData.amount),
        type,
        date: new Date().toISOString(),
      });

      alert('Transaction added successfully!');
      setFormData({ amount: '', description: '', category: '' });
      onClose();
    } catch (error) {
      console.error('Error adding transaction:', error);
      alert('Error adding transaction');
    } finally {
      setLoading(false);
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
              name="amount"
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
              name="description"
              placeholder="Enter description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Select name="category" value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger id="category" name="category">
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
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? 'Adding...' : `Add ${type === 'income' ? 'Income' : 'Expense'}`}
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