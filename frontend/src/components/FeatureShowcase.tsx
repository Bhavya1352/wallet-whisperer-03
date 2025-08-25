import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Brain, TrendingUp, AlertTriangle, Target, Calendar, DollarSign, PieChart, BarChart3 } from 'lucide-react';

const FeatureShowcase = () => {
  const [activeDemo, setActiveDemo] = useState('');
  const [demoResults, setDemoResults] = useState<any>(null);

  const runDemo = async (feature: string) => {
    setActiveDemo(feature);
    setDemoResults(null);

    try {
      let url = '';
      switch (feature) {
        case 'ai-insights':
          url = 'http://localhost:5000/api/insights/weekly';
          break;
        case 'predictions':
          url = 'http://localhost:5000/api/predict/next-month';
          break;
        case 'transactions':
          url = 'http://localhost:5000/api/admin/transactions';
          break;
        case 'users':
          url = 'http://localhost:5000/api/admin/users';
          break;
        default:
          return;
      }

      const response = await fetch(url);
      const data = await response.json();
      setDemoResults(data);
    } catch (error) {
      setDemoResults({ error: 'Failed to fetch data' });
    }
    setActiveDemo('');
  };

  const features = [
    {
      id: 'ai-insights',
      title: '🧠 AI Weekly Insights',
      description: 'Smart spending analysis with savings rate calculation',
      icon: Brain,
      color: 'bg-purple-100 text-purple-600',
      demo: true
    },
    {
      id: 'predictions',
      title: '🔮 Spending Predictions',
      description: 'Forecast next month expenses with risk detection',
      icon: TrendingUp,
      color: 'bg-blue-100 text-blue-600',
      demo: true
    },
    {
      id: 'transactions',
      title: '💰 Transaction Management',
      description: 'Add, view, and track all income/expense entries',
      icon: DollarSign,
      color: 'bg-green-100 text-green-600',
      demo: true
    },
    {
      id: 'users',
      title: '👥 User Management',
      description: 'Multi-user support with secure authentication',
      icon: Target,
      color: 'bg-orange-100 text-orange-600',
      demo: true
    },
    {
      id: 'analytics',
      title: '📊 Real-time Analytics',
      description: 'Live charts and spending pattern analysis',
      icon: BarChart3,
      color: 'bg-indigo-100 text-indigo-600',
      demo: false
    },
    {
      id: 'notifications',
      title: '🔔 Smart Notifications',
      description: 'Personalized alerts based on spending behavior',
      icon: AlertTriangle,
      color: 'bg-red-100 text-red-600',
      demo: false
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">🚀 All Features Working Live</h2>
        <p className="text-gray-600">Click "Try Live Demo" to see real API responses</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Card key={feature.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${feature.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{feature.title}</h3>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-gray-600">{feature.description}</p>
                
                {feature.demo && (
                  <Button 
                    onClick={() => runDemo(feature.id)}
                    disabled={activeDemo === feature.id}
                    className="w-full"
                    variant="outline"
                  >
                    {activeDemo === feature.id ? 'Loading...' : 'Try Live Demo'}
                  </Button>
                )}

                {!feature.demo && (
                  <Badge variant="secondary" className="w-full justify-center">
                    Interactive in Dashboard
                  </Badge>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Demo Results Display */}
      {demoResults && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-600" />
              Live API Response
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-4 rounded-lg">
              <pre className="text-sm overflow-x-auto">
                {JSON.stringify(demoResults, null, 2)}
              </pre>
            </div>
            
            {demoResults.insights && (
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">
                    ₹{demoResults.insights.weeklySpending}
                  </p>
                  <p className="text-sm text-gray-600">Weekly Spending</p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">
                    {demoResults.insights.savingsRate}
                  </p>
                  <p className="text-sm text-gray-600">Savings Rate</p>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <p className="text-sm font-bold text-orange-600">
                    {demoResults.insights.mostExpensiveDay}
                  </p>
                  <p className="text-sm text-gray-600">Peak Spending Day</p>
                </div>
                <div className="text-center p-3 bg-red-50 rounded-lg">
                  <p className="text-sm font-bold text-red-600">
                    Alert Active
                  </p>
                  <p className="text-sm text-gray-600">Smart Warning</p>
                </div>
              </div>
            )}

            {demoResults.prediction && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">
                    ₹{demoResults.prediction.predictedSpending}
                  </p>
                  <p className="text-sm text-gray-600">Next Month Prediction</p>
                </div>
                <div className="text-center p-3 bg-yellow-50 rounded-lg">
                  <p className="text-lg font-bold text-yellow-600">
                    {demoResults.prediction.riskCategories?.join(', ') || 'None'}
                  </p>
                  <p className="text-sm text-gray-600">Risk Categories</p>
                </div>
                <div className="text-center p-3 bg-indigo-50 rounded-lg">
                  <p className="text-2xl font-bold text-indigo-600">
                    ₹{demoResults.prediction.budgetSuggestion}
                  </p>
                  <p className="text-sm text-gray-600">Suggested Budget</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Quick Access Panel */}
      <Card>
        <CardHeader>
          <CardTitle>🔗 Direct API Access</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <Button 
              variant="outline" 
              onClick={() => window.open('http://localhost:5000/api/admin/users', '_blank')}
              className="justify-start"
            >
              👥 View All Users
            </Button>
            <Button 
              variant="outline" 
              onClick={() => window.open('http://localhost:5000/api/admin/transactions', '_blank')}
              className="justify-start"
            >
              💰 View All Transactions
            </Button>
            <Button 
              variant="outline" 
              onClick={() => window.open('http://localhost:5000/api/insights/weekly', '_blank')}
              className="justify-start"
            >
              🧠 Weekly Insights API
            </Button>
            <Button 
              variant="outline" 
              onClick={() => window.open('http://localhost:5000/api/predict/next-month', '_blank')}
              className="justify-start"
            >
              🔮 Predictions API
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeatureShowcase;