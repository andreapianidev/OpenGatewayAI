import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Brain, TrendingUp, Shield, AlertTriangle, CheckCircle, Sparkles, BarChart3, Zap } from 'lucide-react';

const DashboardAIWidget: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isTyping, setIsTyping] = useState(true);
  const [currentText, setCurrentText] = useState('');
  const [showInsights, setShowInsights] = useState(false);

  // Multilingual AI messages
  const aiMessages = {
    en: {
      greeting: "Hello! I'm DeepSeek AI, integrated into the world's first payment gateway with native AI. Current analysis:",
      insights: [
        {
          icon: TrendingUp,
          title: "Excellent Performance",
          description: "Processing €544k with 98.7% success rate. +12% growth vs last week.",
          color: "text-green-600",
          bgColor: "bg-green-50"
        },
        {
          icon: Shield,
          title: "Advanced Security",
          description: "ML algorithms blocked 23 fraud attempts, protecting €67k.",
          color: "text-blue-600",
          bgColor: "bg-blue-50"
        },
        {
          icon: Zap,
          title: "Auto Optimization",
          description: "Reduced response time by 15%, increased approval rate by 8%.",
          color: "text-purple-600",
          bgColor: "bg-purple-50"
        }
      ],
      recommendations: [
        "Activate Middle East payments: 156 attempts detected (+€45k potential)",
        "Scale capacity 12-16h when volume increases 340%",
        "Promote Apple Pay: growing +8% weekly"
      ]
    },
    it: {
      greeting: "Ciao! Sono DeepSeek AI, integrato nel primo gateway di pagamento al mondo con AI nativa. Analisi attuale:",
      insights: [
        {
          icon: TrendingUp,
          title: "Performance Eccellente",
          description: "Elaborando €544k con tasso successo 98.7%. +12% crescita vs settimana scorsa.",
          color: "text-green-600",
          bgColor: "bg-green-50"
        },
        {
          icon: Shield,
          title: "Sicurezza Avanzata",
          description: "Algoritmi ML hanno bloccato 23 tentativi frode, protetto €67k.",
          color: "text-blue-600",
          bgColor: "bg-blue-50"
        },
        {
          icon: Zap,
          title: "Ottimizzazione Auto",
          description: "Ridotto tempo risposta 15%, aumentato tasso approvazione 8%.",
          color: "text-purple-600",
          bgColor: "bg-purple-50"
        }
      ],
      recommendations: [
        "Attiva pagamenti Medio Oriente: 156 tentativi rilevati (+€45k potenziali)",
        "Scala capacità 12-16h quando volume aumenta 340%",
        "Promuovi Apple Pay: crescita +8% settimanale"
      ]
    },
    ar: {
      greeting: "مرحباً! أنا DeepSeek AI، مدمج في أول بوابة دفع في العالم مع ذكاء اصطناعي أصلي. التحليل الحالي:",
      insights: [
        {
          icon: TrendingUp,
          title: "أداء ممتاز",
          description: "معالجة €544k بمعدل نجاح 98.7%. نمو +12% مقارنة بالأسبوع الماضي.",
          color: "text-green-600",
          bgColor: "bg-green-50"
        },
        {
          icon: Shield,
          title: "أمان متقدم",
          description: "خوارزميات ML منعت 23 محاولة احتيال، حماية €67k.",
          color: "text-blue-600",
          bgColor: "bg-blue-50"
        },
        {
          icon: Zap,
          title: "تحسين تلقائي",
          description: "تقليل وقت الاستجابة 15%، زيادة معدل الموافقة 8%.",
          color: "text-purple-600",
          bgColor: "bg-purple-50"
        }
      ],
      recommendations: [
        "تفعيل مدفوعات الشرق الأوسط: تم اكتشاف 156 محاولة (+€45k محتملة)",
        "توسيع السعة 12-16 ساعة عندما يزيد الحجم 340%",
        "ترويج Apple Pay: نمو +8% أسبوعياً"
      ]
    }
  };

  const currentLang = i18n.language as keyof typeof aiMessages;
  const messages = aiMessages[currentLang] || aiMessages.en;
  const fullText = messages.greeting;

  useEffect(() => {
    if (isTyping && currentText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setCurrentText(fullText.slice(0, currentText.length + 1));
      }, 50);
      return () => clearTimeout(timeout);
    } else if (currentText.length >= fullText.length) {
      setTimeout(() => {
        setIsTyping(false);
        setShowInsights(true);
      }, 1000);
    }
  }, [currentText, fullText, isTyping]);

  // Reset animation when language changes
  useEffect(() => {
    setCurrentText('');
    setIsTyping(true);
    setShowInsights(false);
  }, [i18n.language]);

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 rounded-xl shadow-lg border border-indigo-200 p-6">
      {/* AI Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 flex items-center">
              DeepSeek AI
              <Sparkles className="w-4 h-4 ml-1 text-yellow-500" />
            </h3>
            <p className="text-xs text-indigo-600 font-medium">{t('ai.firstGatewayWithAI', 'First Gateway with Integrated AI')}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 bg-green-100 px-2 py-1 rounded-full">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs font-medium text-green-700">{t('ai.active', 'Active')}</span>
        </div>
      </div>

      {/* AI Message */}
      <div className="bg-white rounded-lg p-4 mb-4 border border-indigo-100">
        <div className="flex items-start space-x-3">
          <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
            <Brain className="w-3 h-3 text-indigo-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-800 leading-relaxed">
              {currentText}
              {isTyping && <span className="animate-pulse">|</span>}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Insights */}
      {showInsights && (
        <div className="space-y-3 animate-fade-in">
          <div className="grid grid-cols-1 gap-3">
            {messages.insights.map((insight, index) => {
              const IconComponent = insight.icon;
              return (
                <div key={index} className={`${insight.bgColor} rounded-lg p-3 border border-opacity-20`}>
                  <div className="flex items-start space-x-3">
                    <div className="p-1.5 rounded-lg bg-white shadow-sm">
                      <IconComponent className={`w-4 h-4 ${insight.color}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm mb-1">{insight.title}</h4>
                      <p className="text-xs text-gray-700">{insight.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Recommendations */}
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center space-x-2 mb-3">
              <BarChart3 className="w-4 h-4 text-indigo-600" />
              <h4 className="text-sm font-semibold text-gray-900">{t('ai.recommendations', 'AI Recommendations')}</h4>
            </div>
            <div className="space-y-2">
              {messages.recommendations.map((rec, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-xs text-gray-600">{rec}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Status Indicators */}
          <div className="grid grid-cols-3 gap-2">
            <div className="text-center p-2 bg-green-50 rounded-lg">
              <CheckCircle className="w-4 h-4 text-green-600 mx-auto mb-1" />
              <p className="text-xs font-bold text-green-600">98.7%</p>
              <p className="text-xs text-green-700">{t('ai.successRate', 'Success')}</p>
            </div>
            <div className="text-center p-2 bg-blue-50 rounded-lg">
              <Shield className="w-4 h-4 text-blue-600 mx-auto mb-1" />
              <p className="text-xs font-bold text-blue-600">23</p>
              <p className="text-xs text-blue-700">{t('ai.fraudBlocked', 'Fraud Blocked')}</p>
            </div>
            <div className="text-center p-2 bg-purple-50 rounded-lg">
              <Zap className="w-4 h-4 text-purple-600 mx-auto mb-1" />
              <p className="text-xs font-bold text-purple-600">1.2s</p>
              <p className="text-xs text-purple-700">{t('ai.avgResponse', 'Avg Response')}</p>
            </div>
          </div>

          {/* Last Update */}
          <div className="text-center">
            <p className="text-xs text-gray-500">
              {t('ai.lastUpdate', 'Last AI analysis')}: {new Date().toLocaleTimeString(currentLang === 'ar' ? 'ar-SA' : currentLang)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardAIWidget;