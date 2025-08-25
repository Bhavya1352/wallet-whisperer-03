import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

const ClearDataButton = () => {
  const clearAllData = () => {
    if (confirm('Are you sure you want to clear all data? This will remove all transactions, goals, and budgets.')) {
      // Keep user login but clear all other data
      localStorage.removeItem('allTransactions');
      localStorage.removeItem('goals');
      localStorage.removeItem('budgets');
      // Don't remove 'token' and 'user' so user stays logged in
      alert('All data cleared! You can now add fresh transactions.');
      window.location.reload();
    }
  };

  return (
    <Button 
      onClick={clearAllData}
      variant="outline"
      size="sm"
      className="text-red-600 border-red-200 hover:bg-red-50"
    >
      <Trash2 className="h-4 w-4 mr-2" />
      Clear All Data
    </Button>
  );
};

export default ClearDataButton;