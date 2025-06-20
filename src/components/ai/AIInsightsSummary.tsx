import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Brain, TrendingUp, Shield, Zap, Users, CreditCard, AlertTriangle, CheckCircle, BarChart3, Sparkles } from 'lucide-react';

const AIInsightsSummary: React.FC = () => {
  const { t } = useTranslation();
  const [isTyping, setIsTyping] = useState(true);
  const [currentText, setCurrentText] = useState('');
  const [showFullContent, setShowFullContent] = useState(false);

  const fullText = `${t('aiInsights.greeting')} 

${t('aiInsights.analysisIntro')}`;

  const insights = [
    {
      icon: TrendingUp,
      title: t('aiInsights.excellentPerformance'),
      description: t('aiInsights.performanceDescription'),
      color: "text-green-600",
      bgColor: "bg-green-50",
      trend: "+12%"
    },
    {
      icon: Shield,
      title: t('aiInsights.advancedSecurity'),
      description: t('aiInsights.securityDescription'),
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      trend: `23 ${t('aiInsights.blocks')}`
    },
    {
      icon: Zap,
      title: t('aiInsights.automaticOptimization'),
      description: t('aiInsights.optimizationDescription'),
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      trend: `-15% ${t('aiInsights.latency')}`
    },
    {
      icon: Users,
      title: t('aiInsights.merchantExperience'),
      description: t('aiInsights.merchantDescription'),
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      trend: `-8% ${t('aiInsights.fees')}`
    }
  ];

  const recommendations = [
    {
      priority: t('aiInsights.high'),
      title: t('aiInsights.geographicExpansion'),
      description: t('aiInsights.geographicDescription'),
      action: t('aiInsights.activateNewMarkets'),
      impact: `€45k ${t('aiInsights.potentialMonthly')}`
    },
    {
      priority: t('aiInsights.medium'),
      title: t('aiInsights.hourlyOptimization'),
      description: t('aiInsights.hourlyDescription'),
      action: t('aiInsights.scaleResources'),
      impact: `${t('aiInsights.errorReduction')} 23%`
    },
    {
      priority: t('aiInsights.low'),
      title: t('aiInsights.newPaymentMethods'),
      description: t('aiInsights.paymentMethodsDescription'),
      action: t('aiInsights.marketingCampaign'),
      impact: `€12k ${t('aiInsights.incremental')}`
    }
  ];

  useEffect(() => {
    if (isTyping && currentText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setCurrentText(fullText.slice(0, currentText.length + 1));
      }, 30);
      return () => clearTimeout(timeout);
    } else if (currentText.length >= fullText.length) {
      setTimeout(() => {
        setIsTyping(false);
        setShowFullContent(true);
      }, 1000);
    }
  }, [currentText, fullText, isTyping]);

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 rounded-xl shadow-lg border border-indigo-200 p-6">
      {/* AI Header */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="relative">
          <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 flex items-center">
            DeepSeek AI Assistant
            <Sparkles className="w-5 h-5 ml-2 text-yellow-500" />
          </h2>
          <p className="text-sm text-indigo-600 font-medium">{t('aiInsights.firstGatewayWithAI')}</p>
        </div>
        <div className="ml-auto">
          <div className="flex items-center space-x-2 bg-green-100 px-3 py-1 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-green-700">{t('aiInsights.aiActive')}</span>
          </div>
        </div>
      </div>

      {/* AI Typing Animation */}
      <div className="bg-white rounded-lg p-4 mb-6 border border-indigo-100">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
            <Brain className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="flex-1">
            <p className="text-gray-800 leading-relaxed">
              {currentText}
              {isTyping && <span className="animate-pulse">|</span>}
            </p>
          </div>
        </div>
      </div>

      {/* AI Insights */}
      {showFullContent && (
        <div className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {insights.map((insight, index) => {
              const IconComponent = insight.icon;
              return (
                <div key={index} className={`${insight.bgColor} rounded-lg p-4 border border-opacity-20`}>
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg bg-white shadow-sm`}>
                      <IconComponent className={`w-5 h-5 ${insight.color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{insight.title}</h3>
                        <span className={`text-xs font-bold px-2 py-1 rounded-full bg-white ${insight.color}`}>
                          {insight.trend}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">{insight.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* AI Recommendations */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center space-x-2 mb-4">
              <BarChart3 className="w-5 h-5 text-indigo-600" />
              <h3 className="text-lg font-semibold text-gray-900">{t('aiInsights.aiRecommendations')}</h3>
            </div>
            <div className="space-y-4">
              {recommendations.map((rec, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className={`px-2 py-1 rounded-full text-xs font-bold ${
                    rec.priority === 'Alta' ? 'bg-red-100 text-red-700' :
                    rec.priority === 'Media' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {rec.priority}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">{rec.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
                    <div className="flex items-center justify-between">
                      <button className="text-xs bg-indigo-600 text-white px-3 py-1 rounded-full hover:bg-indigo-700 transition-colors">
                        {rec.action}
                      </button>
                      <span className="text-xs font-medium text-green-600">{rec.impact}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Capabilities */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-6 text-white">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Zap className="w-5 h-5 mr-2" />
              {t('aiInsights.advancedAIFeatures')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <Shield className="w-8 h-8 mx-auto mb-2 opacity-90" />
                <h4 className="font-medium mb-1">{t('aiInsights.fraudDetection')}</h4>
                <p className="text-xs opacity-80">{t('aiInsights.fraudDetectionDesc')}</p>
              </div>
              <div className="text-center">
                <TrendingUp className="w-8 h-8 mx-auto mb-2 opacity-90" />
                <h4 className="font-medium mb-1">{t('aiInsights.predictiveAnalytics')}</h4>
                <p className="text-xs opacity-80">{t('aiInsights.predictiveAnalyticsDesc')}</p>
              </div>
              <div className="text-center">
                <CreditCard className="w-8 h-8 mx-auto mb-2 opacity-90" />
                <h4 className="font-medium mb-1">{t('aiInsights.smartRouting')}</h4>
                <p className="text-xs opacity-80">{t('aiInsights.smartRoutingDesc')}</p>
              </div>
            </div>
          </div>

          {/* Real-time Status */}
          <div className="flex items-center justify-between bg-green-50 rounded-lg p-4 border border-green-200">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <div>
                <p className="font-medium text-green-900">{t('aiInsights.aiSystemOperational')}</p>
                <p className="text-sm text-green-700">{t('aiInsights.activeMonitoring')}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-green-600">99.9%</p>
              <p className="text-xs text-green-700">{t('aiInsights.aiUptime')}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIInsightsSummary;