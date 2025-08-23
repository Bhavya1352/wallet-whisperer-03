import { Button } from "@/components/ui/button";
import { TrendingUp, Wallet, Bell, User, Settings } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import LoginForm from "./LoginForm";
import AdminPanel from "./AdminPanel";
import GoalForm from "./GoalForm";
import NotificationPanel from "./NotificationPanel";

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showGoalForm, setShowGoalForm] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <nav className="w-full border-b border-border/50 backdrop-blur-xl bg-background/80 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-primary to-success rounded-xl animate-pulse-glow">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-poppins font-bold gradient-text">
              FinanceTracker Pro
            </h1>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`transition-colors ${
                location.pathname === '/' ? 'text-primary font-medium' : 'text-foreground/80 hover:text-foreground'
              }`}
            >
              Dashboard
            </Link>
            <Link 
              to="/transactions" 
              className={`transition-colors ${
                location.pathname === '/transactions' ? 'text-primary font-medium' : 'text-foreground/80 hover:text-foreground'
              }`}
            >
              Transactions
            </Link>
            <Link 
              to="/analytics" 
              className={`transition-colors ${
                location.pathname === '/analytics' ? 'text-primary font-medium' : 'text-foreground/80 hover:text-foreground'
              }`}
            >
              Analytics
            </Link>
            <Link 
              to="/budget" 
              className={`transition-colors ${
                location.pathname === '/budget' ? 'text-primary font-medium' : 'text-foreground/80 hover:text-foreground'
              }`}
            >
              Budget
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Button variant="ghost" size="sm" onClick={() => setShowGoalForm(true)}>
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Goal
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setShowAdmin(true)}>
                  <Settings className="h-5 w-5 mr-2" />
                  Admin
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setShowNotifications(true)} className="p-2 relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    5
                  </span>
                </Button>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <User className="h-5 w-5 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <Button onClick={() => setShowLogin(true)} className="btn-hero">
                <User className="h-4 w-4 mr-2" />
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
      
      <LoginForm 
        isOpen={showLogin} 
        onClose={() => setShowLogin(false)} 
        onSuccess={() => {
          const userData = localStorage.getItem('user');
          if (userData) setUser(JSON.parse(userData));
        }} 
      />
      
      <AdminPanel 
        isOpen={showAdmin} 
        onClose={() => setShowAdmin(false)} 
      />
      
      <GoalForm 
        isOpen={showGoalForm} 
        onClose={() => setShowGoalForm(false)} 
      />
      
      <NotificationPanel 
        isOpen={showNotifications} 
        onClose={() => setShowNotifications(false)} 
      />
    </nav>
  );
};

export default Navbar;