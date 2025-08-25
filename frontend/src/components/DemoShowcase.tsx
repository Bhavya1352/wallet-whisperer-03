import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface DemoShowcaseProps {
  isOpen: boolean;
  onClose: () => void;
}

const DemoShowcase = ({ isOpen, onClose }: DemoShowcaseProps) => {
  const [step, setStep] = useState(1);

  const addDemoData = () => {
    // Clear existing data first
    localStorage.removeItem('allTransactions');
    localStorage.removeItem('goals');
    
    // Add demo transactions
    const demoTransactions = [
      {
        id: Date.now() + 1,
        type: 'income',
        amount: 3500,
        description: 'Monthly Salary',
        category: 'Salary',
        date: new Date().toISOString(),
        userId: Date.now(),
        userName: 'Demo User',
        userEmail: 'demo@test.com'
      },
      {
        id: Date.now() + 2,
        type: 'expense',
        amount: 250,
        description: 'Groceries',
        category: 'Food',
        date: new Date().toISOString(),
        userId: Date.now(),
        userName: 'Demo User',
        userEmail: 'demo@test.com'
      },
      {
        id: Date.now() + 3,
        type: 'expense',
        amount: 150,
        description: 'Gas Bill',
        category: 'Housing',
        date: new Date().toISOString(),
        userId: Date.now(),
        userName: 'Demo User',
        userEmail: 'demo@test.com'
      },
      {
        id: Date.now() + 4,
        type: 'income',
        amount: 500,
        description: 'Freelance Work',
        category: 'Freelance',
        date: new Date().toISOString(),
        userId: Date.now(),
        userName: 'Demo User',
        userEmail: 'demo@test.com'
      }
    ];

    // Add demo goals
    const demoGoals = [
      {
        id: Date.now() + 5,
        title: 'Emergency Fund',
        targetAmount: 5000,
        currentAmount: 0,
        userId: Date.now()
      }
    ];

    localStorage.setItem('allTransactions', JSON.stringify(demoTransactions));
    localStorage.setItem('goals', JSON.stringify(demoGoals));
    
    setStep(2);
  };

  const clearData = () => {
    localStorage.removeItem('allTransactions');
    localStorage.removeItem('goals');
    setStep(1);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>🎬 Live Demo: From Zero to Data</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">
              See How Data Transforms the Dashboard
            </h3>
            <p className="text-muted-foreground">
              Watch the app go from empty state to fully populated with real data
            </p>
          </div>

          {step === 1 && (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">📊 Current State: Empty Dashboard</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Total Balance: $0.00</li>
                  <li>• Monthly Income: $0.00</li>
                  <li>• Monthly Expenses: $0.00</li>
                  <li>• Charts: "No Data Yet"</li>
                </ul>
              </div>
              
              <Button 
                onClick={addDemoData}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              >
                🚀 Add Demo Data & See Magic Happen!
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-medium mb-2 text-green-800">✅ Data Added Successfully!</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Total Balance: $3,600.00</li>
                  <li>• Monthly Income: $4,000.00</li>
                  <li>• Monthly Expenses: $400.00</li>
                  <li>• Charts: Now showing real data!</li>
                  <li>• Goals: Emergency Fund ($5,000 target)</li>
                </ul>
              </div>
              
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">
                  🎉 Close this dialog and see your dashboard transform!
                </p>
                <p className="text-xs text-muted-foreground">
                  All stats, charts, and graphs now show real data
                </p>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  onClick={() => {
                    onClose();
                    window.location.reload();
                  }}
                  className="flex-1"
                >
                  ✨ View Updated Dashboard
                </Button>
                <Button 
                  onClick={clearData}
                  variant="outline"
                  className="flex-1"
                >
                  🔄 Reset to Zero
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DemoShowcase;