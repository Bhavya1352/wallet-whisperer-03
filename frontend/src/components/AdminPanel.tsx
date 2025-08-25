import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminPanel = ({ isOpen, onClose }: AdminPanelProps) => {
  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchAllData();
    }
  }, [isOpen]);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [usersRes, transactionsRes, budgetsRes, goalsRes] = await Promise.all([
        fetch('http://localhost:3001/api/admin/users'),
        fetch('http://localhost:3001/api/admin/transactions'),
        fetch('http://localhost:3001/api/budgets'),
        fetch('http://localhost:3001/api/goals')
      ]);
      
      const usersData = await usersRes.json();
      const transactionsData = await transactionsRes.json();
      const budgetsData = await budgetsRes.json();
      const goalsData = await goalsRes.json();
      
      if (usersData.success) setUsers(usersData.users);
      if (transactionsData.success) setTransactions(transactionsData.transactions);
      if (budgetsData.success) setBudgets(budgetsData.budgets);
      if (goalsData.success) setGoals(goalsData.goals);
    } catch (error) {
      console.error('Error fetching admin data:', error);
    }
    setLoading(false);
  };

  const clearAllData = async () => {
    if (confirm('Are you sure you want to clear old sample data?')) {
      try {
        const response = await fetch('http://localhost:3001/api/admin/clear-old-data');
        const data = await response.json();
        if (data.success) {
          alert('Old sample data cleared!');
          fetchAllData(); // Refresh data
        }
      } catch (error) {
        console.error('Error clearing data:', error);
        alert('Error clearing data');
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Admin Panel - View All Data</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="users" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="users">Users ({users.length})</TabsTrigger>
            <TabsTrigger value="transactions">Transactions ({transactions.length})</TabsTrigger>
            <TabsTrigger value="budgets">Budgets ({budgets.length})</TabsTrigger>
            <TabsTrigger value="goals">Goals ({goals.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="users" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">All Registered Users</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={fetchAllData}>
                  Refresh Data
                </Button>
                <Button variant="destructive" size="sm" onClick={clearAllData}>
                  Clear Sample Data
                </Button>
              </div>
            </div>
            
            {loading ? (
              <p>Loading users...</p>
            ) : users.length === 0 ? (
              <p className="text-muted-foreground">No users registered yet.</p>
            ) : (
              <div className="space-y-2">
                {users.map((user, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-muted-foreground">{user.email}</div>
                    <div className="text-xs text-muted-foreground">ID: {user._id}</div>
                    <div className="text-xs text-muted-foreground">Created: {new Date(user.createdAt).toLocaleDateString()}</div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="transactions" className="space-y-4">
            <h3 className="text-lg font-semibold">All Transactions</h3>
            
            {loading ? (
              <p>Loading transactions...</p>
            ) : transactions.length === 0 ? (
              <p className="text-muted-foreground">No transactions recorded yet.</p>
            ) : (
              <div className="space-y-2">
                {transactions.map((transaction, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className={`font-medium ${
                          transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.type === 'income' ? '+' : '-'}${transaction.amount}
                        </div>
                        <div className="text-sm">{transaction.description}</div>
                        <div className="text-xs text-muted-foreground">
                          Category: {transaction.category}
                        </div>
                      </div>
                      <div className="text-right text-xs text-muted-foreground">
                        <div>By: {transaction.userId?.name || 'Unknown'}</div>
                        <div>{transaction.userId?.email || 'No email'}</div>
                        <div>{new Date(transaction.date).toLocaleDateString()}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="budgets" className="space-y-4">
            <h3 className="text-lg font-semibold">All Budgets</h3>
            
            {loading ? (
              <p>Loading budgets...</p>
            ) : budgets.length === 0 ? (
              <p className="text-muted-foreground">No budgets set yet.</p>
            ) : (
              <div className="space-y-2">
                {budgets.map((budget, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">{budget.category}</div>
                        <div className="text-sm text-blue-600">${budget.amount} / {budget.period}</div>
                      </div>
                      <div className="text-right text-xs text-muted-foreground">
                        <div>By: {budget.userId?.name || 'Unknown'}</div>
                        <div>{new Date(budget.createdAt).toLocaleDateString()}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="goals" className="space-y-4">
            <h3 className="text-lg font-semibold">All Goals</h3>
            
            {loading ? (
              <p>Loading goals...</p>
            ) : goals.length === 0 ? (
              <p className="text-muted-foreground">No goals created yet.</p>
            ) : (
              <div className="space-y-2">
                {goals.map((goal, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">{goal.title}</div>
                        <div className="text-sm text-purple-600">
                          ${goal.currentAmount} / ${goal.targetAmount}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Category: {goal.category}
                        </div>
                      </div>
                      <div className="text-right text-xs text-muted-foreground">
                        <div>By: {goal.userId?.name || 'Unknown'}</div>
                        <div>Deadline: {new Date(goal.deadline).toLocaleDateString()}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AdminPanel;