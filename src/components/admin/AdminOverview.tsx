import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TrendingUp, Users, CreditCard, DollarSign, ArrowUpRight, ArrowDownRight, MapPin, Shield, Activity, Brain, AlertTriangle, CheckCircle } from 'lucide-react';
import StatsCard from '../shared/StatsCard';
import TransactionChart from '../charts/TransactionChart';
import RevenueChart from '../charts/RevenueChart';
import DashboardAIWidget from '../ai/DashboardAIWidget';
import POIMap from './POIMap';

const AdminOverview: React.FC = () => {
  const { t } = useTranslation();
  
  const stats = [
    {
      title: t('dashboard.totalRevenue'),
      value: '€847,320',
      change: '+12.5%',
      trend: 'up' as const,
      icon: DollarSign,
      color: 'green' as const
    },
    {
      title: t('dashboard.transactionsToday'),
      value: '2,847',
      change: '+8.2%',
      trend: 'up' as const,
      icon: CreditCard,
      color: 'blue' as const
    },
    {
      title: t('dashboard.activeMerchants'),
      value: '127',
      change: '+3.1%',
      trend: 'up' as const,
      icon: Users,
      color: 'indigo' as const
    },
    {
      title: t('dashboard.successRate'),
      value: '98.7%',
      change: '-0.3%',
      trend: 'down' as const,
      icon: TrendingUp,
      color: 'orange' as const
    }
  ];

  const [aiInsights, setAiInsights] = useState([
    { type: 'success', message: 'Revenue increased by 15% this week', icon: TrendingUp },
    { type: 'warning', message: '3 suspicious transactions detected', icon: AlertTriangle },
    { type: 'info', message: 'Peak hours: 14:00-16:00 today', icon: Activity }
  ]);

  const [poiData, setPoiData] = useState([
    { 
      id: '1', 
      name: 'Caffè Milano', 
      address: 'Via Dante 15, Milano Centro', 
      lat: 45.4642, 
      lng: 9.1900, 
      transactions: 1250, 
      revenue: 12500, 
      status: 'active' as const, 
      category: 'Food & Beverage' 
    },
    { 
      id: '2', 
      name: 'Pizzeria Roma', 
      address: 'Via Trastevere 42, Roma', 
      lat: 41.8902, 
      lng: 12.4922, 
      transactions: 830, 
      revenue: 8300, 
      status: 'active' as const, 
      category: 'Restaurant' 
    },
    { 
      id: '3', 
      name: 'Boutique Firenze', 
      address: 'Ponte Vecchio 8, Firenze', 
      lat: 43.7696, 
      lng: 11.2558, 
      transactions: 1520, 
      revenue: 15200, 
      status: 'active' as const, 
      category: 'Fashion' 
    },
    { 
      id: '4', 
      name: 'Gelateria Napoli', 
      address: 'Via Spaccanapoli 23, Napoli', 
      lat: 40.8518, 
      lng: 14.2681, 
      transactions: 670, 
      revenue: 6700, 
      status: 'inactive' as const, 
      category: 'Food & Beverage' 
    },
    { 
      id: '5', 
      name: 'Tech Store Torino', 
      address: 'Via Po 18, Torino', 
      lat: 45.0703, 
      lng: 7.6869, 
      transactions: 945, 
      revenue: 18900, 
      status: 'active' as const, 
      category: 'Electronics' 
    },
    { 
      id: '6', 
      name: 'Farmacia Bologna', 
      address: 'Piazza Maggiore 12, Bologna', 
      lat: 44.4949, 
      lng: 11.3426, 
      transactions: 2100, 
      revenue: 25600, 
      status: 'active' as const, 
      category: 'Healthcare' 
    }
  ]);

  const recentTransactions = [
    { id: 'TXN001', merchant: 'TechStore Milano', amount: 2850, status: 'completed', time: '2 min fa', risk: 'low' },
    { id: 'TXN002', merchant: 'Fashion Roma', amount: 1420, status: 'completed', time: '5 min fa', risk: 'low' },
    { id: 'TXN003', merchant: 'Restaurant Napoli', amount: 890, status: 'pending', time: '8 min fa', risk: 'medium' },
    { id: 'TXN004', merchant: 'Pharmacy Torino', amount: 340, status: 'completed', time: '12 min fa', risk: 'low' },
    { id: 'TXN005', merchant: 'Market Firenze', amount: 1650, status: 'failed', time: '15 min fa', risk: 'high' }
  ];

  const topMerchants = [
    { name: 'TechStore Milano', volume: '€45,320', transactions: 1247, growth: '+15%', aiScore: 95 },
    { name: 'Fashion Roma', volume: '€38,940', transactions: 892, growth: '+8%', aiScore: 88 },
    { name: 'Restaurant Napoli', volume: '€32,150', transactions: 1456, growth: '+12%', aiScore: 92 },
    { name: 'Pharmacy Torino', volume: '€28,670', transactions: 734, growth: '+5%', aiScore: 85 }
  ];

  useEffect(() => {
    // Simulate real-time AI insights updates
    const interval = setInterval(() => {
      const newInsight = {
        type: Math.random() > 0.5 ? 'info' : 'success',
        message: `AI detected ${Math.floor(Math.random() * 50)} new opportunities`,
        icon: Brain
      };
      setAiInsights(prev => [newInsight, ...prev.slice(0, 2)]);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 sm:p-6 space-y-6 sm:space-y-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white/70 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20 shadow-lg gap-4">
        <div className="flex-1">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Dashboard Overview</h1>
          <p className="text-gray-600 mt-1 sm:mt-2 font-medium text-sm sm:text-base">🤖 OpenPay AI - Smart Payment Gateway with Advanced Analytics</p>
        </div>
        <div className="text-left sm:text-right bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-xl shadow-md w-full sm:w-auto">
          <p className="text-xs sm:text-sm opacity-90">Ultimo aggiornamento</p>
          <p className="text-xs sm:text-sm font-bold">{new Date().toLocaleString('it-IT', { 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* AI Insights Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* OpenPay AI Insights */}
        <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/30 p-4 sm:p-6 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center mb-4">
            <Brain className="w-6 h-6 text-purple-600 mr-3" />
            <h3 className="text-lg sm:text-xl font-bold text-gray-800">🤖 OpenPay AI Insights</h3>
            <span className="ml-auto bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-semibold">Live</span>
          </div>
          <div className="space-y-3">
            {aiInsights.map((insight, index) => {
              const IconComponent = insight.icon;
              return (
                <div key={index} className={`p-3 rounded-lg border-l-4 ${
                  insight.type === 'success' ? 'bg-green-50 border-green-400' :
                  insight.type === 'warning' ? 'bg-yellow-50 border-yellow-400' :
                  'bg-blue-50 border-blue-400'
                }`}>
                  <div className="flex items-center">
                    <IconComponent className={`w-5 h-5 mr-3 ${
                      insight.type === 'success' ? 'text-green-600' :
                      insight.type === 'warning' ? 'text-yellow-600' :
                      'text-blue-600'
                    }`} />
                    <p className="text-sm font-medium text-gray-800">{insight.message}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 p-3 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border border-purple-200">
            <p className="text-sm text-purple-700">💡 <strong>AI Recommendation:</strong> Consider promoting mobile payments during peak hours (14:00-16:00) to increase conversion rates by an estimated 12%.</p>
          </div>
        </div>

        {/* POI Map */}
        <POIMap locations={poiData} />
      </div>

      {/* AI Widget */}
      <div className="w-full">
        <DashboardAIWidget />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/30 p-4 sm:p-6 lg:p-8 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center mb-4 sm:mb-6">
            <div className="w-2 sm:w-3 h-6 sm:h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full mr-3 sm:mr-4"></div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-800">📈 Andamento Transazioni</h3>
          </div>
          <TransactionChart />
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/30 p-4 sm:p-6 lg:p-8 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center mb-4 sm:mb-6">
            <div className="w-2 sm:w-3 h-6 sm:h-8 bg-gradient-to-b from-emerald-500 to-green-600 rounded-full mr-3 sm:mr-4"></div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-800">💰 Ricavi Mensili</h3>
          </div>
          <RevenueChart />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        {/* Recent Transactions */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/30 overflow-hidden hover:shadow-2xl transition-all duration-300">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-bold text-white flex items-center">
              <span className="mr-2 sm:mr-3">⚡</span>
              Transazioni Recenti
            </h3>
          </div>
          <div className="p-4 sm:p-6">
            <div className="space-y-3">
              {recentTransactions.map((transaction, index) => (
                <div key={transaction.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 rounded-xl transition-all duration-200 border border-transparent hover:border-blue-200 gap-3 sm:gap-0">
                  <div className="flex items-center space-x-3 sm:space-x-4 flex-1">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <p className="font-semibold text-gray-900 text-sm sm:text-base truncate">{transaction.merchant}</p>
                        <Shield className={`w-3 h-3 ${
                          transaction.risk === 'low' ? 'text-green-500' :
                          transaction.risk === 'medium' ? 'text-yellow-500' : 'text-red-500'
                        }`} />
                      </div>
                      <p className="text-xs sm:text-sm text-gray-500">{transaction.id} • {transaction.time}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        transaction.risk === 'low' ? 'bg-green-100 text-green-700' :
                        transaction.risk === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        🤖 Risk: {transaction.risk.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="text-left sm:text-right w-full sm:w-auto">
                    <p className="font-bold text-base sm:text-lg text-gray-900">€{transaction.amount.toLocaleString()}</p>
                    <span className={`text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-full font-semibold inline-block mt-1 ${
                      transaction.status === 'completed' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' :
                      transaction.status === 'pending' ? 'bg-amber-100 text-amber-700 border border-amber-200' :
                      'bg-red-100 text-red-700 border border-red-200'
                    }`}>
                      {transaction.status === 'completed' ? `✅ ${t('common.completed')}` :
                       transaction.status === 'pending' ? `⏳ ${t('common.pending')}` : `❌ ${t('common.failed')}`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Merchants */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/30 overflow-hidden hover:shadow-2xl transition-all duration-300">
          <div className="bg-gradient-to-r from-emerald-500 to-green-600 p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-bold text-white flex items-center">
              <span className="mr-2 sm:mr-3">🏆</span>
              {t('admin.topMerchants')}
            </h3>
          </div>
          <div className="p-4 sm:p-6">
            <div className="space-y-3">
              {topMerchants.map((merchant, index) => (
                <div key={merchant.name} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-green-50 rounded-xl transition-all duration-200 border border-transparent hover:border-emerald-200 gap-3 sm:gap-0">
                  <div className="flex items-center space-x-3 sm:space-x-4 flex-1">
                    <div className="relative flex-shrink-0">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-sm sm:text-lg">
                          {merchant.name.charAt(0)}
                        </span>
                      </div>
                      {index < 3 && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {index + 1}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-sm sm:text-base truncate">{merchant.name}</p>
                      <p className="text-xs sm:text-sm text-gray-500 flex items-center">
                        <span className="mr-1">📊</span>
                        {merchant.transactions} {t('common.transactions')}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          merchant.aiScore >= 90 ? 'bg-yellow-100 text-yellow-700' :
                          merchant.aiScore >= 70 ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          🤖 AI Score: {merchant.aiScore}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-left sm:text-right w-full sm:w-auto">
                    <p className="font-bold text-base sm:text-lg text-gray-900">{merchant.volume}</p>
                    <div className="flex items-center justify-start sm:justify-end space-x-1 mt-1">
                      <span className="text-emerald-600 text-sm">📈</span>
                      <p className="text-sm font-semibold text-emerald-600">{merchant.growth}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;