import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
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
      
      {!user ? (
        <>
          <HeroSection onGetStarted={() => setShowLogin(true)} />
          {/* Show login prompt if trying to access dashboard without login */}
          {window.location.hash === '#dashboard' && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-background p-6 rounded-lg shadow-lg max-w-md mx-4">
                <h3 className="text-lg font-semibold mb-2">Login Required</h3>
                <p className="text-muted-foreground mb-4">Please login to access your dashboard</p>
                <button 
                  onClick={() => setShowLogin(true)}
                  className="w-full bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90"
                >
                  Login Now
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <Dashboard user={user} />
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