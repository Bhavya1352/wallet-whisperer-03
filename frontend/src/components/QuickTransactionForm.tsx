import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, TrendingUp, TrendingDown } from "lucide-react";

const QuickTransactionForm = () => {
  const [formData, setFormData] = useState({
    type: 'expense',
    amount: '',
    description: '',
    category: ''
  });

  const expenseCategories = [
    'Food & Dining', 'Transportation', 'Shopping', 'Entertainment',
    'Bills & Utilities', 'Healthcare', 'Education', 'Travel', 'Other'
  ];

  const incomeCategories = [
    'Salary', 'Freelance', 'Business', 'Investment', 'Gift', 'Other'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.amount || !formData.description || !formData.category) {
      alert('Please fill all fields!');
      return;
    }

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const transactions = JSON.parse(localStorage.getItem('allTransactions') || '[]');
    
    const newTransaction = {
      id: Date.now(),
      userId: user.id,
      type: formData.type,
      amount: parseFloat(formData.amount),
      description: formData.description,
      category: formData.category,
      date: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };

    transactions.push(newTransaction);
    localStorage.setItem('allTransactions', JSON.stringify(transactions));
    
    // Trigger storage event to update other components
    window.dispatchEvent(new Event('storage'));
    
    // Reset form
    setFormData({
      type: 'expense',
      amount: '',
      description: '',
      category: ''
    });

    alert(`${formData.type === 'income' ? 'Income' : 'Expense'} added successfully!`);
  };

  return (
    <Card className="finance-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PlusCircle className="h-5 w-5" />
          Quick Add Transaction
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Button
              type="button"
              variant={formData.type === 'income' ? 'default' : 'outline'}
              onClick={() => setFormData({ ...formData, type: 'income', category: '' })}
              className="flex items-center gap-2"
            >
              <TrendingUp className="h-4 w-4" />
              Income
            </Button>
            <Button
              type="button"
              variant={formData.type === 'expense' ? 'default' : 'outline'}
              onClick={() => setFormData({ ...formData, type: 'expense', category: '' })}
              className="flex items-center gap-2"
            >
              <TrendingDown className="h-4 w-4" />
              Expense
            </Button>
          </div>

          <div>
            <Label htmlFor="amount">Amount ($)</Label>
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
              placeholder="What was this for?"
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
                {(formData.type === 'income' ? incomeCategories : expenseCategories).map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full">
            Add {formData.type === 'income' ? 'Income' : 'Expense'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default QuickTransactionForm;