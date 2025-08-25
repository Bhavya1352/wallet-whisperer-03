import { useState, useEffect } from 'react';
import Navbar from "@/components/Navbar";
import SpendingChart from "@/components/SpendingChart";
import RealStatsCards from "@/components/RealStatsCards";
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

          <RealStatsCards />

          <div className="lg:col-span-2">
            <SpendingChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;