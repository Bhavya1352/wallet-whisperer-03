import { Button } from "@/components/ui/button";
import { TrendingUp, Wallet, Bell, User } from "lucide-react";

const Navbar = () => {
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
            <a href="#" className="text-foreground/80 hover:text-foreground transition-colors">
              Dashboard
            </a>
            <a href="#" className="text-foreground/80 hover:text-foreground transition-colors">
              Transactions
            </a>
            <a href="#" className="text-foreground/80 hover:text-foreground transition-colors">
              Analytics
            </a>
            <a href="#" className="text-foreground/80 hover:text-foreground transition-colors">
              Budget
            </a>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="p-2">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm" className="p-2">
              <User className="h-5 w-5" />
            </Button>
            <Button className="btn-hero">
              <Wallet className="h-4 w-4 mr-2" />
              Add Transaction
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;