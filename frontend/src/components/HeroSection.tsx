import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Shield, Zap } from "lucide-react";
import financeHero from "@/assets/finance-hero.jpg";
import financeBg from "@/assets/finance-bg.jpg";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    // Check if user is logged in
    const user = localStorage.getItem('user');
    
    if (user) {
      // User is logged in, scroll to dashboard
      const dashboardElement = document.getElementById('dashboard');
      if (dashboardElement) {
        dashboardElement.scrollIntoView({ behavior: 'smooth' });
      } else {
        // If dashboard not found, scroll down to show it
        window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
      }
    } else {
      // User not logged in, show alert to login first
      alert('🔒 Please login first to access the dashboard!\n\nClick the Login button in the navbar to get started.');
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url(${financeBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(100px)',
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-primary/10" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <Zap className="h-4 w-4 text-primary mr-2" />
                <span className="text-sm font-medium text-primary">Smart Financial Management</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Take Control of Your{" "}
                <span className="gradient-text">Financial Future</span>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                Track expenses, manage income, and gain valuable insights with our 
                intelligent personal finance tracker. Make smarter financial decisions today.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <TrendingUp className="h-5 w-5 text-success" />
                <span className="text-sm text-foreground">Real-time Analytics</span>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-success" />
                <span className="text-sm text-foreground">Secure & Private</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="btn-hero group" onClick={handleGetStarted}>
                Get Started Now
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-border/50 hover:border-primary/50"
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
              >
                View Demo
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative lg:ml-8">
            <div className="relative z-10 animate-float">
              <img
                src={financeHero}
                alt="Financial Dashboard"
                className="w-full rounded-2xl shadow-2xl finance-card"
              />
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 p-4 bg-success/20 backdrop-blur-xl border border-success/30 rounded-xl animate-float" style={{ animationDelay: '1s' }}>
              <div className="text-center">
                <p className="text-2xl font-bold text-success">+15%</p>
                <p className="text-xs text-success-foreground">Monthly Growth</p>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -left-6 p-4 bg-primary/20 backdrop-blur-xl border border-primary/30 rounded-xl animate-float" style={{ animationDelay: '2s' }}>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">$12.5K</p>
                <p className="text-xs text-primary-foreground">Total Saved</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;