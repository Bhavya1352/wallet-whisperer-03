import { Button } from "@/components/ui/button";
import { ArrowRight, Wallet, TrendingUp, Shield, Target } from "lucide-react";
import FeatureShowcase from "./FeatureShowcase";
import DemoShowcase from "./DemoShowcase";

const HeroSection = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary/20 to-accent/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex justify-center mb-6">
                <div className="p-4 rounded-full bg-primary/10 border border-primary/20">
                  <Wallet className="h-12 w-12 text-primary" />
                </div>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold">
                <span className="gradient-text">Wallet Whisperer</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Smart Finance Tracker that grows with your data! Start with a clean $0.00 interface and watch it come alive as you add your real transactions.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                onClick={onGetStarted}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <div className="text-sm text-muted-foreground">
                ✨ No credit card required • Start tracking in seconds
              </div>
            </div>
            
            {/* Key Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
              <div className="finance-card p-6 text-center group hover:shadow-lg transition-all duration-300">
                <TrendingUp className="h-8 w-8 text-success mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold mb-2">Real-time Updates</h3>
                <p className="text-sm text-muted-foreground">Watch your dashboard populate as you add transactions</p>
              </div>
              
              <div className="finance-card p-6 text-center group hover:shadow-lg transition-all duration-300">
                <Shield className="h-8 w-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold mb-2">Secure & Private</h3>
                <p className="text-sm text-muted-foreground">Your financial data is encrypted and secure</p>
              </div>
              
              <div className="finance-card p-6 text-center group hover:shadow-lg transition-all duration-300">
                <Target className="h-8 w-8 text-accent mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold mb-2">Smart Goals</h3>
                <p className="text-sm text-muted-foreground">Set and track your financial goals with ease</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Demo Showcase */}
      <DemoShowcase />
      
      {/* Feature Showcase */}
      <FeatureShowcase />
    </div>
  );
};

export default HeroSection;