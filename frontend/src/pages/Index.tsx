import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Dashboard from "@/components/Dashboard";
import LoginForm from "@/components/LoginForm";

const Index = () => {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    setShowLogin(false);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <div className="min-h-screen">
      <Navbar 
        user={user} 
        onLogin={() => setShowLogin(true)} 
        onLogout={handleLogout} 
      />
      
      {user ? (
        <Dashboard user={user} />
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-blue-900 flex items-center justify-center relative overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-32 h-32 bg-green-400/20 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-32 right-32 w-40 h-40 bg-blue-400/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
          </div>

          <div className="text-center relative z-10">
            {/* Main Content */}
            <div className="mb-8">
              <div className="text-8xl mb-4 animate-pulse">💰</div>
              <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-2xl">
                Wallet Whisperer
              </h1>
              <p className="text-2xl text-green-200 mb-8 drop-shadow-lg">
                Your Smart Finance Tracker
              </p>
            </div>
            
            {/* Glass Card */}
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-white/20 mb-8">
              <div className="flex justify-center space-x-6 mb-6">
                <div className="text-4xl animate-bounce">📊</div>
                <div className="text-4xl animate-bounce delay-200">💎</div>
                <div className="text-4xl animate-bounce delay-400">🎯</div>
              </div>
              
              <p className="text-xl text-white font-semibold mb-6">
                Track • Budget • Achieve
              </p>
              
              <button 
                onClick={() => setShowLogin(true)}
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-4 rounded-2xl text-lg font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 transform"
              >
                🚀 Get Started Now
              </button>
            </div>
            
            {/* Bottom Icons */}
            <div className="flex justify-center space-x-6">
              <div className="text-3xl animate-bounce">💸</div>
              <div className="text-3xl animate-bounce delay-100">📈</div>
              <div className="text-3xl animate-bounce delay-200">🏆</div>
            </div>
          </div>
        </div>
      )}
      
      <LoginForm 
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onLogin={handleLogin}
      />
    </div>
  );
};

export default Index;