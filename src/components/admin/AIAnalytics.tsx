import React from 'react';
import { useTranslation } from 'react-i18next';
import { Brain, TrendingUp, Shield, AlertTriangle, CheckCircle, Activity, Zap, Target } from 'lucide-react';

const AIAnalytics: React.FC = () => {
  const { t } = useTranslation();

  const aiMetrics = [
    {
      title: 'AI Fraud Detection',
      value: '99.8%',
      change: '+0.3%',
      icon: Shield,
      color: 'emerald',
      description: 'Accuracy in fraud detection'
    },
    {
      title: 'Predictive Analytics',
      value: '94.2%',
      change: '+2.1%',
      icon: Brain,
      color: 'purple',
      description: 'Transaction success prediction'
    },
    {
      title: 'Real-time Processing',
      value: '1.2ms',
      change: '-0.8ms',
      icon: Zap,
      color: 'yellow',
      description: 'Average AI response time'
    },
    {
      title: 'Risk Assessment',
      value: '87.5%',
      change: '+1.5%',
      icon: Target,
      color: 'red',
      description: 'Risk scoring accuracy'
    }
  ];

  const aiInsights = [
    {
      type: 'success',
      title: 'Anomaly Detected',
      message: 'Unusual transaction pattern detected from Damascus region - automatically flagged for review',
      time: '2 minutes ago',
      confidence: '95%'
    },
    {
      type: 'warning',
      title: 'Performance Alert',
      message: 'AI model performance slightly decreased - retraining recommended',
      time: '15 minutes ago',
      confidence: '87%'
    },
    {
      type: 'info',
      title: 'Pattern Recognition',
      message: 'New payment pattern identified - updating ML models automatically',
      time: '1 hour ago',
      confidence: '92%'
    }
  ];

  return (
    <div className="space-y-6">
      {/* AI Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {aiMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br from-${metric.color}-400 to-${metric.color}-600 rounded-xl flex items-center justify-center shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
                  metric.change.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {metric.change}
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{metric.title}</h3>
              <p className="text-3xl font-bold text-gray-900 mb-2">{metric.value}</p>
              <p className="text-sm text-gray-600">{metric.description}</p>
            </div>
          );
        })}
      </div>

      {/* AI Insights */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/30 overflow-hidden">
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-6">
          <h3 className="text-xl font-bold text-white flex items-center">
            <Brain className="w-6 h-6 mr-3" />
            AI Insights & Alerts
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {aiInsights.map((insight, index) => {
              const getIcon = () => {
                switch (insight.type) {
                  case 'success': return <CheckCircle className="w-5 h-5 text-green-500" />;
                  case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
                  case 'info': return <Activity className="w-5 h-5 text-blue-500" />;
                  default: return <Activity className="w-5 h-5 text-gray-500" />;
                }
              };

              const getBgColor = () => {
                switch (insight.type) {
                  case 'success': return 'bg-green-50 border-green-200';
                  case 'warning': return 'bg-yellow-50 border-yellow-200';
                  case 'info': return 'bg-blue-50 border-blue-200';
                  default: return 'bg-gray-50 border-gray-200';
                }
              };

              return (
                <div key={index} className={`p-4 rounded-xl border ${getBgColor()} hover:shadow-md transition-all duration-200`}>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      {getIcon()}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{insight.title}</h4>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                            Confidence: {insight.confidence}
                          </span>
                          <span className="text-xs text-gray-500">{insight.time}</span>
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm">{insight.message}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* AI Model Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/30 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
            Model Performance Trends
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Fraud Detection Model</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '98%' }}></div>
                </div>
                <span className="text-sm font-semibold text-green-600">98%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Risk Assessment Model</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '94%' }}></div>
                </div>
                <span className="text-sm font-semibold text-blue-600">94%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Prediction Model</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '91%' }}></div>
                </div>
                <span className="text-sm font-semibold text-purple-600">91%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/30 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
            <Activity className="w-5 h-5 mr-2 text-green-600" />
            Real-time AI Status
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <span className="text-gray-700">Fraud Detection Engine</span>
              <span className="flex items-center text-green-600 font-semibold">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                Active
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
              <span className="text-gray-700">Predictive Analytics</span>
              <span className="flex items-center text-blue-600 font-semibold">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
                Processing
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-200">
              <span className="text-gray-700">Risk Assessment</span>
              <span className="flex items-center text-purple-600 font-semibold">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse"></div>
                Learning
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAnalytics;