import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

const ClearDataButton = () => {
  const clearMyData = () => {
    if (confirm('Clear only YOUR data? This will not affect other users.')) {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      
      // Clear only current user's data
      const allTransactions = JSON.parse(localStorage.getItem('allTransactions') || '[]');
      const otherTransactions = allTransactions.filter(t => t.userId !== user.id);
      localStorage.setItem('allTransactions', JSON.stringify(otherTransactions));
      
      const allBudgets = JSON.parse(localStorage.getItem('allBudgets') || '[]');
      const otherBudgets = allBudgets.filter(b => b.userId !== user.id);
      localStorage.setItem('allBudgets', JSON.stringify(otherBudgets));
      
      const allGoals = JSON.parse(localStorage.getItem('allGoals') || '[]');
      const otherGoals = allGoals.filter(g => g.userId !== user.id);
      localStorage.setItem('allGoals', JSON.stringify(otherGoals));
      
      // Trigger refresh
      window.dispatchEvent(new Event('refreshStats'));
      
      alert('Your data cleared successfully!');
      window.location.reload();
    }
  };
  
  const clearAllData = () => {
    if (confirm('Clear ALL data from ALL users? This cannot be undone.')) {
      localStorage.removeItem('allTransactions');
      localStorage.removeItem('allBudgets');
      localStorage.removeItem('allGoals');
      
      window.dispatchEvent(new Event('refreshStats'));
      alert('All data cleared!');
      window.location.reload();
    }
  };

  return (
    <div className="flex gap-2">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={clearMyData}
        className="text-orange-600 hover:text-orange-700 hover:bg-orange-50"
      >
        <Trash2 className="h-4 w-4 mr-2" />
        Clear My Data
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={clearAllData}
        className="text-red-600 hover:text-red-700 hover:bg-red-50"
      >
        <Trash2 className="h-4 w-4 mr-2" />
        Clear All
      </Button>
    </div>
  );
};

export default ClearDataButton;