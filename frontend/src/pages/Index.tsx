import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Dashboard from "@/components/Dashboard";
import SimpleLogin from "@/components/SimpleLogin";

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
        <SimpleLogin onLogin={handleLogin} />
      )}
    </div>
  );
};

export default Index;