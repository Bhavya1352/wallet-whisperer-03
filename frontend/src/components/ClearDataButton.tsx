import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

const ClearDataButton = () => {
  const clearAllDummyData = () => {
    if (confirm('🗑️ Clear ALL dummy data and start fresh? This will remove all transactions, budgets, and goals.')) {
      // Clear everything for fresh start
      localStorage.removeItem('allTransactions');
      localStorage.removeItem('allBudgets');
      localStorage.removeItem('allGoals');
      
      // Trigger refresh events
      window.dispatchEvent(new Event('refreshStats'));
      window.dispatchEvent(new Event('storage'));
      
      alert('✅ All dummy data cleared! Fresh start ready.');
      window.location.reload();
    }
  };

  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={clearAllDummyData}
      className="text-red-600 hover:text-red-700 hover:bg-red-50 font-medium"
    >
      <Trash2 className="h-4 w-4 mr-2" />
      🗑️ Clear All Data
    </Button>
  );
};

export default ClearDataButton;