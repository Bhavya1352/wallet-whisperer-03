import { ArrowUpRight, ArrowDownLeft, Coffee, Car, Home, ShoppingBag } from "lucide-react";
import { useState, useEffect } from "react";
import { api } from "@/api";

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  category: string;
  date: string;
  icon: any;
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'income',
    amount: 2500,
    description: 'Salary Deposit',
    category: 'Salary',
    date: '2024-01-15',
    icon: ArrowUpRight
  },
  {
    id: '2',
    type: 'expense',
    amount: 45.99,
    description: 'Grocery Shopping',
    category: 'Food',
    date: '2024-01-14',
    icon: ShoppingBag
  },
  {
    id: '3',
    type: 'expense',
    amount: 15.50,
    description: 'Coffee Shop',
    category: 'Food',
    date: '2024-01-14',
    icon: Coffee
  },
  {
    id: '4',
    type: 'expense',
    amount: 85.00,
    description: 'Gas Station',
    category: 'Transport',
    date: '2024-01-13',
    icon: Car
  },
  {
    id: '5',
    type: 'expense',
    amount: 1200.00,
    description: 'Rent Payment',
    category: 'Housing',
    date: '2024-01-01',
    icon: Home
  }
];

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (token) {
        const data = await api.getTransactions(token);
        if (data.transactions && data.transactions.length > 0) {
          const formattedTransactions = data.transactions.slice(0, 5).map(t => ({
            id: t._id,
            type: t.type,
            amount: t.amount,
            description: t.description,
            category: t.category,
            date: t.date,
            icon: t.type === 'income' ? ArrowUpRight : 
                  t.category === 'Food' ? Coffee :
                  t.category === 'Transport' ? Car :
                  t.category === 'Housing' ? Home : ShoppingBag
          }));
          setTransactions(formattedTransactions);
        } else {
          // Show sample data if no transactions
          setTransactions(mockTransactions.slice(0, 3));
        }
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="finance-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Recent Transactions</h3>
        <button className="text-sm text-primary hover:text-primary-light transition-colors">
          View All
        </button>
      </div>
      
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-4 text-gray-500">Loading transactions...</div>
        ) : transactions.length === 0 ? (
          <div className="text-center py-4 text-gray-500">
            <p>No transactions yet</p>
            <p className="text-sm">Add your first transaction to get started!</p>
          </div>
        ) : (
          transactions.map((transaction) => {
          const Icon = transaction.icon;
          const isIncome = transaction.type === 'income';
          
          return (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-secondary/50 transition-colors group"
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-xl ${
                  isIncome 
                    ? 'bg-success/10 text-success group-hover:bg-success/20' 
                    : 'bg-warning/10 text-warning group-hover:bg-warning/20'
                } transition-colors`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{transaction.description}</p>
                  <p className="text-sm text-muted-foreground">{transaction.category}</p>
                </div>
              </div>
              
              <div className="text-right">
                <p className={`font-semibold ${
                  isIncome ? 'text-success' : 'text-foreground'
                }`}>
                  {isIncome ? '+' : '-'}${transaction.amount.toFixed(2)}
                </p>
                <p className="text-sm text-muted-foreground">
                  {new Date(transaction.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          );
        })
        )}
      </div>
    </div>
  );
};

export default TransactionList;