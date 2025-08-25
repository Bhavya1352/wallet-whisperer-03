import { Button } from "@/components/ui/button";
import { Wallet, User } from "lucide-react";

const Navbar = ({ user, onLogin, onLogout }) => {
  return (
    <nav className="w-full border-b border-border/50 backdrop-blur-xl bg-background/80 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-primary to-accent rounded-xl">
              <Wallet className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-bold gradient-text">
              Wallet Whisperer
            </h1>
          </div>

          {/* Navigation Links */}
          {user && (
            <div className="hidden md:flex items-center space-x-6">
              <a href="#dashboard" className="text-foreground/80 hover:text-foreground transition-colors">
                Dashboard
              </a>
              <a href="#transactions" className="text-foreground/80 hover:text-foreground transition-colors">
                Transactions
              </a>
              <a href="#analytics" className="text-foreground/80 hover:text-foreground transition-colors">
                Analytics
              </a>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground hidden sm:block">
                  Welcome, {user.name}
                </span>
                <Button variant="outline" size="sm" onClick={onLogout}>
                  <User className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <Button onClick={onLogin} className="bg-primary hover:bg-primary/90">
                <User className="h-4 w-4 mr-2" />
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;