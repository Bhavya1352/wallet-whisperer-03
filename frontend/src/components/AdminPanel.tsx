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

  useEffect(() => {
    if (isOpen) {
      const allUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');
      const allTransactions = JSON.parse(localStorage.getItem('allTransactions') || '[]');
      setUsers(allUsers);
      setTransactions(allTransactions);
    }
  }, [isOpen]);

  const clearAllData = () => {
    if (confirm('Are you sure you want to clear all data?')) {
      localStorage.removeItem('allUsers');
      localStorage.removeItem('allTransactions');
      setUsers([]);
      setTransactions([]);
      alert('All data cleared!');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Admin Panel - View All Data</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="users" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="users">Users ({users.length})</TabsTrigger>
            <TabsTrigger value="transactions">Transactions ({transactions.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="users" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">All Registered Users</h3>
              <Button variant="destructive" size="sm" onClick={clearAllData}>
                Clear All Data
              </Button>
            </div>
            
            {users.length === 0 ? (
              <p className="text-muted-foreground">No users registered yet.</p>
            ) : (
              <div className="space-y-2">
                {users.map((user, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-muted-foreground">{user.email}</div>
                    <div className="text-xs text-muted-foreground">ID: {user.id}</div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="transactions" className="space-y-4">
            <h3 className="text-lg font-semibold">All Transactions</h3>
            
            {transactions.length === 0 ? (
              <p className="text-muted-foreground">No transactions recorded yet.</p>
            ) : (
              <div className="space-y-2">
                {transactions.map((transaction, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">
                          {transaction.type === 'income' ? '+' : '-'}${transaction.amount}
                        </div>
                        <div className="text-sm">{transaction.description}</div>
                        <div className="text-xs text-muted-foreground">
                          Category: {transaction.category}
                        </div>
                      </div>
                      <div className="text-right text-xs text-muted-foreground">
                        <div>By: {transaction.userName}</div>
                        <div>{transaction.userEmail}</div>
                        <div>{new Date(transaction.date).toLocaleDateString()}</div>
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