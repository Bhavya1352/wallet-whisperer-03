import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminPanel = ({ isOpen, onClose }: AdminPanelProps) => {
  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('users');

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/admin/users');
      const data = await response.json();
      if (data.success) {
        setUsers(data.users);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/admin/transactions');
      const data = await response.json();
      if (data.success) {
        setTransactions(data.transactions);
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      if (activeTab === 'users') {
        fetchUsers();
      } else {
        fetchTransactions();
      }
    }
  }, [isOpen, activeTab]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Admin Panel - Database Entries</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Tabs */}
          <div className="flex gap-2">
            <Button 
              variant={activeTab === 'users' ? 'default' : 'outline'}
              onClick={() => setActiveTab('users')}
            >
              Users ({users.length})
            </Button>
            <Button 
              variant={activeTab === 'transactions' ? 'default' : 'outline'}
              onClick={() => setActiveTab('transactions')}
            >
              Transactions ({transactions.length})
            </Button>
          </div>

          {loading && <p>Loading...</p>}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div className="space-y-2">
              <h3 className="font-semibold">Registered Users:</h3>
              {users.length === 0 ? (
                <p className="text-muted-foreground">No users found</p>
              ) : (
                <div className="grid gap-2">
                  {users.map((user: any) => (
                    <div key={user._id} className="p-3 border rounded-lg">
                      <p><strong>Name:</strong> {user.name}</p>
                      <p><strong>Email:</strong> {user.email}</p>
                      <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
                      <p><strong>ID:</strong> {user._id}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Transactions Tab */}
          {activeTab === 'transactions' && (
            <div className="space-y-2">
              <h3 className="font-semibold">All Transactions:</h3>
              {transactions.length === 0 ? (
                <p className="text-muted-foreground">No transactions found</p>
              ) : (
                <div className="grid gap-2">
                  {transactions.map((transaction: any) => (
                    <div key={transaction._id} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <p><strong>User:</strong> {transaction.userId?.name || 'Unknown'} ({transaction.userId?.email})</p>
                          <p><strong>Type:</strong> <span className={transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}>{transaction.type}</span></p>
                          <p><strong>Amount:</strong> ${transaction.amount}</p>
                          <p><strong>Description:</strong> {transaction.description}</p>
                          <p><strong>Category:</strong> {transaction.category}</p>
                        </div>
                        <div className="text-right text-sm text-muted-foreground">
                          <p>{new Date(transaction.date).toLocaleDateString()}</p>
                          <p>{new Date(transaction.createdAt).toLocaleTimeString()}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdminPanel;