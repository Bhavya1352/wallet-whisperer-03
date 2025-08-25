import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Dashboard from "@/components/Dashboard";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <Dashboard />
    </div>
  );
};

export default Index;