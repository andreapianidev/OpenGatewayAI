import React, { useState } from 'react';
import { DollarSign, TrendingUp, TrendingDown, RefreshCw, Calendar, BarChart3, AlertTriangle } from 'lucide-react';

const SyrianExchange: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('today');

  const exchangeRates = [
    {
      currency: 'USD',
      name: 'الدولار الأمريكي',
      rate: 2512.50,
      change: +15.25,
      changePercent: +0.61,
      lastUpdate: '10:30 ص',
      trend: 'up'
    },
    {
      currency: 'EUR',
      name: 'اليورو',
      rate: 2734.80,
      change: -8.40,
      changePercent: -0.31,
      lastUpdate: '10:28 ص',
      trend: 'down'
    },
    {
      currency: 'TRY',
      name: 'الليرة التركية',
      rate: 84.75,
      change: +2.15,
      changePercent: +2.60,
      lastUpdate: '10:32 ص',
      trend: 'up'
    },
    {
      currency: 'SAR',
      name: 'الريال السعودي',
      rate: 669.33,
      change: +4.08,
      changePercent: +0.61,
      lastUpdate: '10:29 ص',
      trend: 'up'
    },
    {
      currency: 'AED',
      name: 'الدرهم الإماراتي',
      rate: 684.12,
      change: +4.15,
      changePercent: +0.61,
      lastUpdate: '10:31 ص',
      trend: 'up'
    },
    {
      currency: 'GBP',
      name: 'الجنيه الإسترليني',
      rate: 3187.45,
      change: -12.30,
      changePercent: -0.38,
      lastUpdate: '10:27 ص',
      trend: 'down'
    }
  ];

  const marketData = {
    totalVolume: '₺847.2M',
    dailyTransactions: 15847,
    averageRate: 2512.50,
    marketCap: '₺12.4B',
    volatility: 2.3
  };

  const historicalData = [
    { date: '2024-01-15', rate: 2497.25 },
    { date: '2024-01-16', rate: 2503.80 },
    { date: '2024-01-17', rate: 2508.15 },
    { date: '2024-01-18', rate: 2495.60 },
    { date: '2024-01-19', rate: 2512.50 }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">أسعار الصرف السورية</h1>
            <p className="text-gray-600">متابعة أسعار الصرف والتحليلات المالية للسوق السوري</p>
          </div>
          
          <div className="flex items-center space-x-4 space-x-reverse">
            <select 
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
              <option value="today">اليوم</option>
              <option value="week">هذا الأسبوع</option>
              <option value="month">هذا الشهر</option>
              <option value="year">هذا العام</option>
            </select>
            
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <RefreshCw className="w-4 h-4 ml-2" />
              تحديث
            </button>
          </div>
        </div>
      </div>

      {/* Market Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600">حجم التداول</p>
              <p className="text-2xl font-bold text-gray-900">{marketData.totalVolume}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600">المعاملات اليومية</p>
              <p className="text-2xl font-bold text-gray-900">{marketData.dailyTransactions.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600">متوسط السعر</p>
              <p className="text-2xl font-bold text-gray-900">{marketData.averageRate.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Calendar className="w-6 h-6 text-orange-600" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600">رأس المال السوقي</p>
              <p className="text-2xl font-bold text-gray-900">{marketData.marketCap}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600">التقلبات</p>
              <p className="text-2xl font-bold text-gray-900">{marketData.volatility}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Exchange Rates */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">أسعار الصرف الحالية</h2>
          <p className="text-sm text-gray-600">آخر تحديث: اليوم 10:35 صباحاً</p>
        </div>
        
        <div className="divide-y divide-gray-200">
          {exchangeRates.map((rate) => (
            <div key={rate.currency} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-3 bg-gray-100 rounded-lg ml-4">
                    <DollarSign className="w-6 h-6 text-gray-600" />
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-1">
                      <h3 className="text-lg font-medium text-gray-900 ml-3">{rate.name}</h3>
                      <span className="text-sm text-gray-500">({rate.currency})</span>
                    </div>
                    
                    <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-600">
                      <span>آخر تحديث: {rate.lastUpdate}</span>
                      <span className={`flex items-center ${
                        rate.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {rate.trend === 'up' ? (
                          <TrendingUp className="w-4 h-4 ml-1" />
                        ) : (
                          <TrendingDown className="w-4 h-4 ml-1" />
                        )}
                        {rate.changePercent > 0 ? '+' : ''}{rate.changePercent}%
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="text-left">
                  <div className="text-2xl font-bold text-gray-900">
                    {rate.rate.toLocaleString()} ل.س
                  </div>
                  <div className={`text-sm font-medium ${
                    rate.change > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {rate.change > 0 ? '+' : ''}{rate.change.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Historical Chart Placeholder */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">الرسم البياني التاريخي - USD/SYP</h2>
        </div>
        
        <div className="p-6">
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">الرسم البياني للأسعار التاريخية</p>
              <p className="text-sm text-gray-500 mt-2">عرض تطور أسعار الصرف خلال الفترة المحددة</p>
            </div>
          </div>
        </div>
      </div>

      {/* Market Alert */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start">
          <TrendingUp className="w-6 h-6 text-blue-600 mt-0.5 ml-3" />
          <div>
            <h3 className="text-lg font-medium text-blue-800 mb-2">تحليل السوق</h3>
            <p className="text-blue-700 mb-4">
              يشهد الدولار الأمريكي ارتفاعاً طفيفاً مقابل الليرة السورية اليوم بنسبة 0.61%. 
              السوق مستقر نسبياً مع حجم تداول جيد. يُنصح بمتابعة التطورات الاقتصادية المحلية والإقليمية.
            </p>
            <div className="flex items-center space-x-4 space-x-reverse text-sm">
              <span className="text-blue-600">مستوى المقاومة: 2,520</span>
              <span className="text-blue-600">مستوى الدعم: 2,480</span>
              <span className="text-blue-600">التوقع: مستقر</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SyrianExchange;