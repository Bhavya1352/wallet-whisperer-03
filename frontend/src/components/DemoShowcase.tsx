import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Wallet, PiggyBank } from "lucide-react";

const DemoShowcase = () => {
  return (
    <section className="py-16 bg-secondary/20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">See How It Works</h2>
          <p className="text-lg text-muted-foreground">
            Start with clean $0.00 values, then watch your dashboard come alive with real data
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Before - Clean Interface */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-center">Step 1: Clean Start</h3>
            <div className="grid grid-cols-2 gap-4">
              <Card className="finance-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground flex items-center">
                    <Wallet className="h-4 w-4 mr-2" />
                    Balance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-muted-foreground">$0.00</div>
                  <p className="text-xs text-muted-foreground">Add transactions to see data</p>
                </CardContent>
              </Card>
              
              <Card className="finance-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Income
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-muted-foreground">$0.00</div>
                  <p className="text-xs text-muted-foreground">No income yet</p>
                </CardContent>
              </Card>
              
              <Card className="finance-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground flex items-center">
                    <TrendingDown className="h-4 w-4 mr-2" />
                    Expenses
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-muted-foreground">$0.00</div>
                  <p className="text-xs text-muted-foreground">No expenses yet</p>
                </CardContent>
              </Card>
              
              <Card className="finance-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground flex items-center">
                    <PiggyBank className="h-4 w-4 mr-2" />
                    Savings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-muted-foreground">$0.00</div>
                  <p className="text-xs text-muted-foreground">Start saving today</p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* After - With Data */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-center">Step 2: With Your Data</h3>
            <div className="grid grid-cols-2 gap-4">
              <Card className="finance-card border-success/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground flex items-center">
                    <Wallet className="h-4 w-4 mr-2 text-success" />
                    Balance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-success">$2,350.00</div>
                  <p className="text-xs text-success">Great job saving!</p>
                </CardContent>
              </Card>
              
              <Card className="finance-card border-primary/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2 text-primary" />
                    Income
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">$3,500.00</div>
                  <p className="text-xs text-primary">This month</p>
                </CardContent>
              </Card>
              
              <Card className="finance-card border-destructive/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground flex items-center">
                    <TrendingDown className="h-4 w-4 mr-2 text-destructive" />
                    Expenses
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-destructive">$1,150.00</div>
                  <p className="text-xs text-destructive">Well controlled</p>
                </CardContent>
              </Card>
              
              <Card className="finance-card border-accent/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground flex items-center">
                    <PiggyBank className="h-4 w-4 mr-2 text-accent" />
                    Savings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-accent">$2,350.00</div>
                  <p className="text-xs text-accent">67% savings rate</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-8">
          <p className="text-muted-foreground">
            ✨ Your dashboard automatically updates as you add real transactions
          </p>
        </div>
      </div>
    </section>
  );
};

export default DemoShowcase;