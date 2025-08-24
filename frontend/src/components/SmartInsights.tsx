import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface SmartInsightsProps {
  userId?: string;
}

const SmartInsights: React.FC<SmartInsightsProps> = ({ userId }) => {
  const [insights, setInsights] = useState<any>(null);
  const [prediction, setPrediction] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchInsights = async () => {
    setLoading(true);
    try {
      const [insightsRes, predictionRes] = await Promise.all([
        fetch('http://localhost:5000/api/insights/weekly'),
        fetch('http://localhost:5000/api/predict/next-month')
      ]);
      
      const insightsData = await insightsRes.json();
      const predictionData = await predictionRes.json();
      
      setInsights(insightsData.insights);
      setPrediction(predictionData.prediction);
    } catch (error) {
      console.error('Error fetching insights:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchInsights();
  }, []);

  if (loading) return <div className="text-center p-4">🧠 Analyzing your finances...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">🧠 Smart Financial Insights</h2>
        <Button onClick={fetchInsights} variant="outline">
          Refresh Analysis
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Weekly Spending Alert */}
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              📊 This Week
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-blue-600">
                ${insights?.weeklySpending || 0}
              </p>
              <p className="text-sm text-gray-600">Weekly spending</p>
              <Badge variant={insights?.weeklySpending > 300 ? "destructive" : "secondary"}>
                {insights?.alert || "No data"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Savings Rate */}
        <Card className="border-l-4 border-l-green-500">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              💰 Savings Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-green-600">
                {insights?.savingsRate || "0%"}
              </p>
              <p className="text-sm text-gray-600">This week</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{ width: `${parseFloat(insights?.savingsRate) || 0}%` }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Month Prediction */}
        <Card className="border-l-4 border-l-purple-500">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              🔮 Next Month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-purple-600">
                ${prediction?.predictedSpending || 0}
              </p>
              <p className="text-sm text-gray-600">Predicted spending</p>
              <Badge variant="outline">
                Budget: ${prediction?.budgetSuggestion || 0}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Risk Categories */}
      {prediction?.riskCategories?.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              ⚠️ High Spending Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {prediction.riskCategories.map((category: string, index: number) => (
                <Badge key={index} variant="destructive">
                  {category}
                </Badge>
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Consider setting limits for these categories
            </p>
          </CardContent>
        </Card>
      )}

      {/* Most Expensive Day */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            📅 Spending Pattern
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="font-semibold">Most expensive day this week:</p>
            <Badge variant="secondary" className="text-sm">
              {insights?.mostExpensiveDay || "No data"}
            </Badge>
            <p className="text-xs text-gray-500">
              Try to spread expenses more evenly throughout the week
            </p>
          </div>
        </CardContent>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            🎯 Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <Button variant="outline" size="sm">
              Set Budget Alert
            </Button>
            <Button variant="outline" size="sm">
              Export Report
            </Button>
            <Button variant="outline" size="sm">
              Schedule Review
            </Button>
            <Button variant="outline" size="sm">
              Share Insights
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SmartInsights;