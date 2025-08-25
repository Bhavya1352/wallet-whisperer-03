import { useState, useEffect } from 'react';
import Navbar from "@/components/Navbar";
import SpendingChart from "@/components/SpendingChart";
import StatsCard from "@/components/StatsCard";
import { TrendingUp, TrendingDown, Wallet, Target } from 'lucide-react';

const Analytics = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  // Authentication check
  if (!user) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md mx-auto text-center">
            <div className="text-red-600 text-6xl mb-4">🔒</div>
            <h2 className="text-2xl font-bold text-red-800 mb-4">Login Required</h2>
            <p className="text-red-700">Please login to view analytics</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold">Financial Analytics</h1>
            <p className="text-muted-foreground">Detailed insights into your financial patterns</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard title="Total Balance" amount="$24,580.00" change="+12.5%" changeType="positive" icon={Wallet} variant="success" />
            <StatsCard title="Monthly Income" amount="$8,450.00" change="+8.2%" changeType="positive" icon={TrendingUp} variant="success" />
            <StatsCard title="Monthly Expenses" amount="$3,250.00" change="-5.1%" changeType="negative" icon={TrendingDown} variant="warning" />
            <StatsCard title="Savings Rate" amount="61.5%" change="+3.2%" changeType="positive" icon={Target} variant="primary" />
          </div>

          <div className="lg:col-span-2">
            <SpendingChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;