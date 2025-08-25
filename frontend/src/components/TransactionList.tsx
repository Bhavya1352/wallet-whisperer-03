import { ArrowUpRight, ArrowDownLeft, Coffee, Car, Home, ShoppingBag } from "lucide-react";
import { useState, useEffect } from "react";

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Get transactions from localStorage
    const storedTransactions = JSON.parse(localStorage.getItem('allTransactions') || '[]');
    setTransactions(storedTransactions.slice(0, 5)); // Show only last 5
  }, []);

  return (
    <div className="finance-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Recent Transactions</h3>
        <button className="text-sm text-primary hover:text-primary-light transition-colors">
          View All
        </button>
      </div>
      
      <div className="space-y-4">
        {transactions.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p className="text-lg mb-2">No transactions yet</p>
            <p className="text-sm">Add your first transaction to get started!</p>
          </div>
        ) : (
          transactions.map((transaction) => {
            const isIncome = transaction.type === 'income';
            const Icon = isIncome ? ArrowUpRight : 
                        transaction.category === 'Food' ? Coffee :
                        transaction.category === 'Transport' ? Car :
                        transaction.category === 'Housing' ? Home : ShoppingBag;
            
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