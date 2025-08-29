import { Button } from "@/components/ui/button";
import { ArrowRight, Wallet, TrendingUp, Shield, Target } from "lucide-react";

const HeroSection = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen">
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-blue-400 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-purple-400 rounded-full blur-lg animate-bounce"></div>
          <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-pink-400 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-32 right-1/3 w-12 h-12 bg-green-400 rounded-full blur-lg animate-bounce delay-500"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 text-center lg:text-left">
              <div className="space-y-6">
                <div className="flex justify-center lg:justify-start mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-lg opacity-30 animate-pulse"></div>
                    <div className="relative p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full">
                      <Wallet className="h-12 w-12 text-white" />
                    </div>
                  </div>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Wallet Whisperer
                  </span>
                </h1>
                
                <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  🚀 Smart Finance Tracker that grows with your data! Start with a clean $0.00 interface and watch it come alive.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start items-center">
                <Button 
                  size="lg" 
                  onClick={onGetStarted}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 text-lg font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 transform"
                >
                  🚀 Get Started Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                
                <div className="text-center lg:text-left">
                  <div className="text-sm text-gray-500 mb-1">
                    ✨ No credit card required
                  </div>
                  <div className="text-sm text-gray-500">
                    🎯 Start tracking in seconds
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-gray-800">Dashboard Preview</h3>
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gradient-to-r from-green-100 to-green-200 p-3 rounded-lg">
                      <div className="text-xs text-green-600 mb-1">💰 Balance</div>
                      <div className="font-bold text-green-800">$2,350.00</div>
                    </div>
                    <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-3 rounded-lg">
                      <div className="text-xs text-blue-600 mb-1">📈 Income</div>
                      <div className="font-bold text-blue-800">$3,500.00</div>
                    </div>
                    <div className="bg-gradient-to-r from-red-100 to-red-200 p-3 rounded-lg">
                      <div className="text-xs text-red-600 mb-1">📉 Expenses</div>
                      <div className="font-bold text-red-800">$1,150.00</div>
                    </div>
                    <div className="bg-gradient-to-r from-purple-100 to-purple-200 p-3 rounded-lg">
                      <div className="text-xs text-purple-600 mb-1">🎯 Savings</div>
                      <div className="font-bold text-purple-800">$2,350.00</div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-xs text-gray-600 mb-2">📊 Spending Chart</div>
                    <div className="flex items-end space-x-1 h-16">
                      <div className="bg-blue-400 w-4 h-8 rounded-t"></div>
                      <div className="bg-green-400 w-4 h-12 rounded-t"></div>
                      <div className="bg-yellow-400 w-4 h-6 rounded-t"></div>
                      <div className="bg-red-400 w-4 h-10 rounded-t"></div>
                      <div className="bg-purple-400 w-4 h-4 rounded-t"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-4 -right-4 bg-yellow-400 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium animate-bounce">
                ✨ Real-time
              </div>
              <div className="absolute -bottom-4 -left-4 bg-green-400 text-green-800 px-3 py-1 rounded-full text-sm font-medium animate-pulse">
                🔒 Secure
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gradient-to-br from-background to-secondary/20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
      </section>
    </div>
  );
};

export default HeroSection;