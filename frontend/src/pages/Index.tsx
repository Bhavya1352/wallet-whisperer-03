import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import SmartDashboard from "@/components/SmartDashboard";
import QuickTransactionForm from "@/components/QuickTransactionForm";
import LoginForm from "@/components/LoginForm";
import HeroSection from "@/components/HeroSection";

const Index = () => {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setShowLogin(false);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar 
        user={user} 
        onLogin={() => setShowLogin(true)} 
        onLogout={handleLogout} 
      />
      
      {user ? (
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2 gradient-text">💰 Welcome, {user.name}!</h1>
            <p className="text-muted-foreground">Your personal finance dashboard</p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              <SmartDashboard />
            </div>
            <div>
              <QuickTransactionForm />
            </div>
          </div>
        </div>
      ) : (
        <HeroSection onGetStarted={() => setShowLogin(true)} />
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