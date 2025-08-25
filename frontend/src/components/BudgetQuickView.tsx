import { useState, useEffect } from 'react';
import { Badge } from './ui/badge';

const BudgetQuickView = () => {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBudgets();
  }, []);

  const fetchBudgets = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch('http://localhost:3001/api/budgets', {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      const data = await response.json();
      if (data.success) {
        setBudgets(data.budgets.slice(0, 3)); // Show only 3 recent budgets
      }
    } catch (error) {
      console.error('Error fetching budgets:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-sm text-gray-500">Loading budgets...</div>;
  }

  if (budgets.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-sm text-gray-500">No budgets set yet</p>
        <p className="text-xs text-gray-400">Click "Set Budget" to create your first budget</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {budgets.map((budget: any) => (
        <div key={budget._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div>
            <p className="font-medium text-sm">{budget.category}</p>
            <p className="text-xs text-gray-500 capitalize">{budget.period}</p>
          </div>
          <div className="text-right">
            <p className="font-semibold text-sm">${budget.amount}</p>
            <Badge variant="outline" className="text-xs">
              Budget Set
            </Badge>
          </div>
        </div>
      ))}
      
      {budgets.length >= 3 && (
        <div className="text-center pt-2">
          <p className="text-xs text-gray-500">+ more budgets available</p>
        </div>
      )}
    </div>
  );
};

export default BudgetQuickView;