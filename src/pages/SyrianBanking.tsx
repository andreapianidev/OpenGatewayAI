import React from 'react';
import { Building2, TrendingUp, Users, CreditCard, AlertCircle, CheckCircle, Clock, Wifi, WifiOff } from 'lucide-react';

const SyrianBanking: React.FC = () => {
  const banks = [
    {
      id: 1,
      name: 'المصرف التجاري السوري',
      code: 'CBS',
      status: 'online',
      transactions: 1247,
      volume: '₺850K',
      lastSync: '2 دقائق',
      branches: 45,
      customers: 125000
    },
    {
      id: 2,
      name: 'بنك سورية والمهجر',
      code: 'BSM',
      status: 'online',
      transactions: 892,
      volume: '₺620K',
      lastSync: '1 دقيقة',
      branches: 38,
      customers: 98000
    },
    {
      id: 3,
      name: 'بنك الشرق',
      code: 'BOE',
      status: 'maintenance',
      transactions: 0,
      volume: '₺0',
      lastSync: '45 دقيقة',
      branches: 22,
      customers: 67000
    },
    {
      id: 4,
      name: 'بنك قطر الوطني - سورية',
      code: 'QNB',
      status: 'online',
      transactions: 654,
      volume: '₺420K',
      lastSync: '3 دقائق',
      branches: 18,
      customers: 45000
    },
    {
      id: 5,
      name: 'المصرف الدولي للتجارة والتمويل',
      code: 'ITFB',
      status: 'offline',
      transactions: 0,
      volume: '₺0',
      lastSync: '2 ساعات',
      branches: 15,
      customers: 32000
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-600 bg-green-100';
      case 'offline': return 'text-red-600 bg-red-100';
      case 'maintenance': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return <Wifi className="w-4 h-4" />;
      case 'offline': return <WifiOff className="w-4 h-4" />;
      case 'maintenance': return <Clock className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'online': return 'متصل';
      case 'offline': return 'غير متصل';
      case 'maintenance': return 'صيانة';
      default: return 'غير محدد';
    }
  };

  const onlineBanks = banks.filter(bank => bank.status === 'online').length;
  const totalTransactions = banks.reduce((sum, bank) => sum + bank.transactions, 0);
  const totalVolume = banks.reduce((sum, bank) => {
    const volume = parseFloat(bank.volume.replace('₺', '').replace('K', '')) * 1000;
    return sum + (isNaN(volume) ? 0 : volume);
  }, 0);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">النظام المصرفي السوري</h1>
        <p className="text-gray-600">مراقبة وإدارة الاتصالات مع البنوك والمؤسسات المالية السورية</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Building2 className="w-6 h-6 text-green-600" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600">البنوك المتصلة</p>
              <p className="text-2xl font-bold text-gray-900">{onlineBanks}/{banks.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <CreditCard className="w-6 h-6 text-blue-600" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600">المعاملات اليوم</p>
              <p className="text-2xl font-bold text-gray-900">{totalTransactions.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600">حجم المعاملات</p>
              <p className="text-2xl font-bold text-gray-900">₺{(totalVolume / 1000000).toFixed(1)}M</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600">إجمالي العملاء</p>
              <p className="text-2xl font-bold text-gray-900">{(banks.reduce((sum, bank) => sum + bank.customers, 0) / 1000).toFixed(0)}K</p>
            </div>
          </div>
        </div>
      </div>

      {/* System Status Alert */}
      <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start">
          <CheckCircle className="w-6 h-6 text-blue-600 mt-0.5 ml-3" />
          <div>
            <h3 className="text-lg font-medium text-blue-800 mb-2">حالة النظام</h3>
            <p className="text-blue-700 mb-4">
              النظام يعمل بشكل طبيعي. جميع الاتصالات مع البنوك الرئيسية مستقرة ومعدل الاستجابة ممتاز.
            </p>
            <div className="flex items-center space-x-4 space-x-reverse">
              <span className="text-sm text-blue-600">آخر فحص: منذ دقيقتين</span>
              <span className="text-sm text-blue-600">معدل الاستجابة: 99.8%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Banks List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">البنوك المتصلة</h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {banks.map((bank) => (
            <div key={bank.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-3 bg-gray-100 rounded-lg ml-4">
                    <Building2 className="w-6 h-6 text-gray-600" />
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-1">
                      <h3 className="text-lg font-medium text-gray-900 ml-3">{bank.name}</h3>
                      <span className="text-sm text-gray-500">({bank.code})</span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mr-3 ${getStatusColor(bank.status)}`}>
                        {getStatusIcon(bank.status)}
                        <span className="mr-1">{getStatusText(bank.status)}</span>
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-6 space-x-reverse text-sm text-gray-600">
                      <span>الفروع: {bank.branches}</span>
                      <span>العملاء: {bank.customers.toLocaleString()}</span>
                      <span>آخر مزامنة: {bank.lastSync}</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-left">
                  <div className="text-lg font-semibold text-gray-900">{bank.volume}</div>
                  <div className="text-sm text-gray-600">{bank.transactions} معاملة</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Maintenance Notice */}
      {banks.some(bank => bank.status === 'maintenance' || bank.status === 'offline') && (
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="flex items-start">
            <AlertCircle className="w-6 h-6 text-yellow-600 mt-0.5 ml-3" />
            <div>
              <h3 className="text-lg font-medium text-yellow-800 mb-2">تنبيه صيانة</h3>
              <p className="text-yellow-700 mb-4">
                يوجد بنوك غير متصلة حالياً. يرجى التحقق من حالة الاتصال ومراجعة سجلات النظام.
              </p>
              <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors">
                فحص الاتصالات
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SyrianBanking;