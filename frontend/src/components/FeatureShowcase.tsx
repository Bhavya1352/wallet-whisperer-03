import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Target, Shield, Zap, TrendingUp, PieChart } from "lucide-react";

const FeatureShowcase = () => {
  const features = [
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description: "Watch your charts update instantly as you add transactions",
      color: "text-primary"
    },
    {
      icon: Target,
      title: "Goal Tracking",
      description: "Set financial goals and track your progress visually",
      color: "text-success"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your financial data is encrypted and stored securely",
      color: "text-accent"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Instant updates and smooth performance on all devices",
      color: "text-warning"
    },
    {
      icon: TrendingUp,
      title: "Smart Insights",
      description: "Get intelligent recommendations based on your spending patterns",
      color: "text-info"
    },
    {
      icon: PieChart,
      title: "Visual Reports",
      description: "Beautiful charts and graphs to understand your finances",
      color: "text-purple-500"
    }
  ];

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to take control of your finances, all in one beautiful interface
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="finance-card hover:shadow-lg transition-all duration-300 group">
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg bg-background border flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full">
            <Zap className="h-4 w-4" />
            <span className="text-sm font-medium">Ready to deploy • Built with modern tech</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase;