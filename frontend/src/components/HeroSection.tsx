import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-6xl font-bold mb-6">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Wallet Whisperer
          </span>
        </h1>
        
        <p className="text-xl text-gray-600 mb-8">
          Smart Finance Tracker - Take Control of Your Financial Future
        </p>
        
        <div className="space-y-4">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            Get Started Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          
          <div className="text-sm text-gray-500">
            Click Login in navbar to access your dashboard
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;