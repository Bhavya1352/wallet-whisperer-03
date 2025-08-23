import { useState, useEffect } from 'react';
import Navbar from "@/components/Navbar";
import { api } from '@/api';
import { ArrowUpRight, ArrowDownLeft, Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import AddTransactionForm from "@/components/AddTransactionForm";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formType, setFormType] = useState<'income' | 'expense'>('expense');

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (token) {
        const data = await api.getTransactions(token);
        if (data.transactions) {
          setTransactions(data.transactions);
        }
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTransaction = (type: 'income' | 'expense') => {
    setFormType(type);
    setShowAddForm(true);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">All Transactions</h1>
              <p className="text-muted-foreground">Manage your income and expenses</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => handleAddTransaction('income')} className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Income
              </Button>
              <Button onClick={() => handleAddTransaction('expense')}>
                <Plus className="h-4 w-4 mr-2" />
                Add Expense
              </Button>
            </div>
          </div>

          {/* Transactions List */}
          <div className="finance-card p-6">
            {loading ? (
              <p>Loading transactions...</p>
            ) : transactions.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No transactions found</p>
                <p className="text-sm text-muted-foreground">Add your first transaction to get started!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {transactions.map((transaction: any) => {
                  const isIncome = transaction.type === 'income';
                  return (
                    <div key={transaction._id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-secondary/50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className={`p-2 rounded-full ${isIncome ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                          {isIncome ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownLeft className="h-4 w-4" />}
                        </div>
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <p className="text-sm text-muted-foreground">{transaction.category}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${isIncome ? 'text-green-600' : 'text-red-600'}`}>
                          {isIncome ? '+' : '-'}${transaction.amount.toFixed(2)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(transaction.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <AddTransactionForm 
        isOpen={showAddForm} 
        onClose={() => {
          setShowAddForm(false);
          fetchTransactions(); // Refresh after adding
        }} 
        type={formType} 
      />
    </div>
  );
};

export default Transactions;