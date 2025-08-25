import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Shield, Zap } from "lucide-react";

const HeroSection = () => {
  const handleGetStarted = () => {
    const user = localStorage.getItem('user');
    
    if (user) {
      const dashboardElement = document.getElementById('dashboard');
      if (dashboardElement) {
        dashboardElement.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
      }
    } else {
      alert('🔒 Please login first to access the dashboard!\n\nClick the Login button in the navbar to get started.');
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-primary/10" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
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

          <div className="relative lg:ml-8">
            <div className="relative z-10 animate-float">
              <div className="w-full h-96 rounded-2xl shadow-2xl finance-card bg-gradient-to-br from-primary/10 to-success/10 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">💰</div>
                  <h3 className="text-2xl font-bold mb-2">Your Finance Dashboard</h3>
                  <p className="text-muted-foreground">Track, Analyze, Grow</p>
                </div>
              </div>
            </div>
            
            <div className="absolute -top-6 -right-6 p-4 bg-success/20 backdrop-blur-xl border border-success/30 rounded-xl animate-float" style={{ animationDelay: '1s' }}>
              <div className="text-center">
                <p className="text-2xl font-bold text-success">$0</p>
                <p className="text-xs text-success-foreground">Start Tracking</p>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -left-6 p-4 bg-primary/20 backdrop-blur-xl border border-primary/30 rounded-xl animate-float" style={{ animationDelay: '2s' }}>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">$0</p>
                <p className="text-xs text-primary-foreground">Your Goal</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;