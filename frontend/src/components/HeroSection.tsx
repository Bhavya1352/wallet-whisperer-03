import { Button } from "@/components/ui/button";
import { ArrowRight, Wallet } from "lucide-react";

const HeroSection = ({ onGetStarted }) => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="mb-8">
          <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full w-fit mx-auto mb-6">
            <Wallet className="h-12 w-12 text-white" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Wallet Whisperer
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            🚀 Smart Finance Tracker that grows with your data! Start with a clean $0.00 interface and watch it come alive.
          </p>
          
          <Button 
            size="lg" 
            onClick={onGetStarted}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 text-lg font-bold rounded-2xl"
          >
            🚀 Get Started Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          <div className="mt-4 text-sm text-gray-500">
            ✨ No credit card required • 🎯 Start tracking in seconds
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;