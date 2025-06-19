import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { Brain, TrendingUp, AlertCircle, Target, Zap, Calendar, DollarSign, Users, Activity, ArrowUp, ArrowDown } from 'lucide-react';

interface PredictionData {
  period: string;
  predicted: number;
  actual?: number;
  confidence: number;
}

interface RiskPrediction {
  category: string;
  riskLevel: 'low' | 'medium' | 'high';
  probability: number;
  impact: number;
  trend: 'increasing' | 'decreasing' | 'stable';
}

const PredictiveAnalytics: React.FC = () => {
  const { t } = useTranslation();
  const [selectedTimeframe, setSelectedTimeframe] = useState<'7d' | '30d' | '90d'>('30d');
  const [activeTab, setActiveTab] = useState<'revenue' | 'transactions' | 'risks' | 'merchants'>('revenue');

  // Revenue prediction data
  const revenuePredictions: PredictionData[] = [
    { period: 'Week 1', predicted: 125000, actual: 120000, confidence: 92 },
    { period: 'Week 2', predicted: 135000, actual: 138000, confidence: 89 },
    { period: 'Week 3', predicted: 142000, actual: 145000, confidence: 94 },
    { period: 'Week 4', predicted: 155000, confidence: 87 },
    { period: 'Week 5', predicted: 162000, confidence: 85 },
    { period: 'Week 6', predicted: 158000, confidence: 83 },
    { period: 'Week 7', predicted: 170000, confidence: 81 },
    { period: 'Week 8', predicted: 175000, confidence: 79 }
  ];

  // Transaction volume predictions
  const transactionPredictions: PredictionData[] = [
    { period: 'Mon', predicted: 2400, actual: 2350, confidence: 95 },
    { period: 'Tue', predicted: 2800, actual: 2900, confidence: 93 },
    { period: 'Wed', predicted: 3200, actual: 3100, confidence: 91 },
    { period: 'Thu', predicted: 3500, confidence: 89 },
    { period: 'Fri', predicted: 4200, confidence: 87 },
    { period: 'Sat', predicted: 3800, confidence: 85 },
    { period: 'Sun', predicted: 2900, confidence: 88 }
  ];

  // Risk predictions
  const riskPredictions: RiskPrediction[] = [
    { category: 'Fraud Detection', riskLevel: 'medium', probability: 15, impact: 75, trend: 'decreasing' },
    { category: 'Chargeback Risk', riskLevel: 'low', probability: 8, impact: 45, trend: 'stable' },
    { category: 'System Downtime', riskLevel: 'low', probability: 5, impact: 90, trend: 'decreasing' },
    { category: 'Compliance Issues', riskLevel: 'medium', probability: 12, impact: 85, trend: 'increasing' },
    { category: 'Market Volatility', riskLevel: 'high', probability: 25, impact: 60, trend: 'increasing' }
  ];

  // Merchant growth predictions
  const merchantGrowthData = [
    { month: 'Jan', newMerchants: 45, churnRate: 5, netGrowth: 40 },
    { month: 'Feb', newMerchants: 52, churnRate: 7, netGrowth: 45 },
    { month: 'Mar', newMerchants: 48, churnRate: 6, netGrowth: 42 },
    { month: 'Apr', newMerchants: 58, churnRate: 4, netGrowth: 54 },
    { month: 'May', newMerchants: 62, churnRate: 8, netGrowth: 54 },
    { month: 'Jun', newMerchants: 67, churnRate: 5, netGrowth: 62 }
  ];

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing': return <ArrowUp className="w-4 h-4 text-red-500" />;
      case 'decreasing': return <ArrowDown className="w-4 h-4 text-green-500" />;
      case 'stable': return <div className="w-4 h-1 bg-gray-400 rounded"></div>;
    }
  };

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  return (
    <div className="space-y-6">
      {/* Header with AI Insights */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2 flex items-center">
              <Brain className="w-8 h-8 mr-3" />
              AI Predictive Analytics
            </h2>
            <p className="text-purple-100">Advanced machine learning models predicting business trends and risks</p>
          </div>
          <div className="text-right">
            <div className="bg-white/20 rounded-xl p-4">
              <p className="text-sm text-purple-100">Model Accuracy</p>
              <p className="text-3xl font-bold">94.2%</p>
              <p className="text-xs text-purple-200">Last 30 days</p>
            </div>
          </div>
        </div>
      </div>

      {/* Timeframe Selector */}
      <div className="flex space-x-4">
        {(['7d', '30d', '90d'] as const).map((timeframe) => (
          <button
            key={timeframe}
            onClick={() => setSelectedTimeframe(timeframe)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              selectedTimeframe === timeframe
                ? 'bg-blue-500 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            {timeframe === '7d' ? '7 Days' : timeframe === '30d' ? '30 Days' : '90 Days'}
          </button>
        ))}
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl p-1 shadow-lg border border-gray-200">
        <div className="flex space-x-1">
          {[
            { key: 'revenue', label: 'Revenue Forecast', icon: DollarSign },
            { key: 'transactions', label: 'Transaction Volume', icon: Activity },
            { key: 'risks', label: 'Risk Analysis', icon: AlertCircle },
            { key: 'merchants', label: 'Merchant Growth', icon: Users }
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as any)}
              className={`flex items-center px-4 py-3 rounded-lg font-semibold transition-all ${
                activeTab === key
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-4 h-4 mr-2" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'revenue' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
              Revenue Forecast
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenuePredictions}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip formatter={(value: number, name: string) => [`€${value?.toLocaleString()}`, name === 'predicted' ? 'Predicted' : 'Actual']} />
                <Area type="monotone" dataKey="actual" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
                <Area type="monotone" dataKey="predicted" stackId="2" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.4} strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
              <h4 className="font-bold text-gray-800 mb-4">Key Predictions</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Next Week</span>
                  <span className="font-bold text-green-600">+12.5%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Next Month</span>
                  <span className="font-bold text-blue-600">+18.2%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Confidence</span>
                  <span className="font-bold text-purple-600">87%</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
              <h4 className="font-bold text-gray-800 mb-4">AI Insights</h4>
              <div className="space-y-2 text-sm">
                <p className="text-gray-600">• Peak revenue expected on Fridays</p>
                <p className="text-gray-600">• 15% growth in mobile payments</p>
                <p className="text-gray-600">• Damascus region showing strong growth</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'transactions' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Daily Transaction Volume</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={transactionPredictions}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="actual" stroke="#10B981" strokeWidth={3} dot={{ fill: '#10B981' }} />
                <Line type="monotone" dataKey="predicted" stroke="#3B82F6" strokeWidth={2} strokeDasharray="5 5" dot={{ fill: '#3B82F6' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Volume Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'Peak Hours', value: 45, color: '#3B82F6' },
                    { name: 'Business Hours', value: 35, color: '#10B981' },
                    { name: 'Off Hours', value: 20, color: '#F59E0B' }
                  ]}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {[0, 1, 2].map((entry: number, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {activeTab === 'risks' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {riskPredictions.map((risk, index) => (
              <div key={risk.category} className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-gray-800">{risk.category}</h4>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getRiskColor(risk.riskLevel)}`}>
                    {risk.riskLevel.toUpperCase()}
                  </span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Probability</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold">{risk.probability}%</span>
                      {getTrendIcon(risk.trend)}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Impact</span>
                    <span className="font-bold">{risk.impact}%</span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        risk.riskLevel === 'high' ? 'bg-red-500' :
                        risk.riskLevel === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${risk.probability}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <Target className="w-5 h-5 mr-2 text-red-600" />
              Risk Mitigation Recommendations
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <h4 className="font-semibold text-blue-800 mb-2">Immediate Actions</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Enhance fraud detection algorithms</li>
                  <li>• Implement additional security layers</li>
                  <li>• Review compliance procedures</li>
                </ul>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <h4 className="font-semibold text-green-800 mb-2">Long-term Strategy</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Invest in AI-powered risk management</li>
                  <li>• Diversify payment processing</li>
                  <li>• Strengthen merchant partnerships</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'merchants' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Merchant Growth Forecast</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={merchantGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="newMerchants" fill="#3B82F6" name="New Merchants" />
                <Bar dataKey="churnRate" fill="#EF4444" name="Churn Rate" />
                <Bar dataKey="netGrowth" fill="#10B981" name="Net Growth" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
              <h4 className="font-bold text-gray-800 mb-4">Growth Metrics</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Monthly Growth Rate</span>
                  <span className="font-bold text-green-600">+15.2%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Churn Rate</span>
                  <span className="font-bold text-red-600">5.8%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Retention Rate</span>
                  <span className="font-bold text-blue-600">94.2%</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
              <h4 className="font-bold text-gray-800 mb-4">Predicted Trends</h4>
              <div className="space-y-2 text-sm">
                <p className="text-gray-600">• E-commerce merchants growing fastest</p>
                <p className="text-gray-600">• Restaurant sector showing recovery</p>
                <p className="text-gray-600">• Mobile-first merchants preferred</p>
                <p className="text-gray-600">• SME adoption increasing 23%</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PredictiveAnalytics;