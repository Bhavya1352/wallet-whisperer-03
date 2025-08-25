import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

const ClearDataButton = () => {
  const clearAllData = () => {
    if (confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      // Clear all localStorage data except user info
      localStorage.removeItem('allTransactions');
      localStorage.removeItem('allBudgets');
      localStorage.removeItem('allGoals');
      
      // Trigger refresh
      window.dispatchEvent(new Event('refreshStats'));
      
      alert('All data cleared successfully!');
      window.location.reload();
    }
  };

  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={clearAllData}
      className="text-red-600 hover:text-red-700 hover:bg-red-50"
    >
      <Trash2 className="h-4 w-4 mr-2" />
      Clear All Data
    </Button>
  );
};

export default ClearDataButton;