import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DollarSign, CreditCard, TrendingUp, Clock, ArrowUpRight, Calendar, Plus, Download, Settings, HelpCircle } from 'lucide-react';
import StatsCard from '../shared/StatsCard';
import TransactionChart from '../charts/TransactionChart';
import DashboardAIWidget from '../ai/DashboardAIWidget';

const MerchantOverview: React.FC = () => {
  const { t } = useTranslation();
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Funzione per mostrare notifiche simulate
  const showSimulatedNotification = (message: string) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  // Funzioni simulate per i pulsanti
  const handleNewPaymentRequest = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      showSimulatedNotification('🎉 Nuova richiesta di pagamento creata con successo! ID: PAY_' + Math.random().toString(36).substr(2, 9).toUpperCase());
    }, 1500);
  };

  const handleExportData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      showSimulatedNotification('📊 Report esportato con successo! Download avviato...');
      // Simula il download di un file
      const link = document.createElement('a');
      link.href = 'data:text/csv;charset=utf-8,ID,Amount,Customer,Date,Status\nTXN_001,245.50,Cliente #4521,2024-01-15,Completed';
      link.download = 'merchant_report_' + new Date().toISOString().split('T')[0] + '.csv';
      link.click();
    }, 2000);
  };

  const handleSettings = () => {
    showSimulatedNotification('⚙️ Apertura impostazioni account...');
    setTimeout(() => {
      showSimulatedNotification('🔧 Impostazioni caricate! Puoi modificare le tue preferenze.');
    }, 1000);
  };

  const handleSupport = () => {
    showSimulatedNotification('🆘 Apertura centro assistenza...');
    setTimeout(() => {
      showSimulatedNotification('💬 Ticket di supporto creato! ID: SUP_' + Math.random().toString(36).substr(2, 6).toUpperCase());
    }, 1500);
  };
  
  const stats = [
    {
      title: t('dashboard.availableBalance'),
      value: '€12,485',
      change: '+18.2%',
      trend: 'up' as const,
      icon: DollarSign,
      color: 'green' as const
    },
    {
      title: t('dashboard.transactionsToday'),
      value: '47',
      change: '+12%',
      trend: 'up' as const,
      icon: CreditCard,
      color: 'blue' as const
    },
    {
      title: t('dashboard.monthlyRevenue'),
      value: '€28,940',
      change: '+8.7%',
      trend: 'up' as const,
      icon: TrendingUp,
      color: 'purple' as const
    },
    {
      title: t('dashboard.pendingTransactions'),
      value: '3',
      change: '0%',
      trend: 'neutral' as const,
      icon: Clock,
      color: 'orange' as const
    }
  ];

  const recentTransactions = [
    { id: 'TXN_M001', amount: 245.50, customer: 'Cliente #4521', time: '5 min fa', status: 'completed' },
    { id: 'TXN_M002', amount: 89.90, customer: 'Cliente #4522', time: '12 min fa', status: 'completed' },
    { id: 'TXN_M003', amount: 156.75, customer: 'Cliente #4523', time: '28 min fa', status: 'pending' },
    { id: 'TXN_M004', amount: 320.00, customer: 'Cliente #4524', time: '45 min fa', status: 'completed' },
    { id: 'TXN_M005', amount: 67.25, customer: 'Cliente #4525', time: '1 ora fa', status: 'completed' }
  ];

  const weeklyStats = [
    { day: 'Lun', transactions: 12, amount: 1450 },
    { day: 'Mar', transactions: 18, amount: 2340 },
    { day: 'Mer', transactions: 15, amount: 1890 },
    { day: 'Gio', transactions: 22, amount: 2890 },
    { day: 'Ven', transactions: 28, amount: 3420 },
    { day: 'Sab', transactions: 35, amount: 4250 },
    { day: 'Dom', transactions: 31, amount: 3780 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 space-y-6 sm:space-y-8 p-4 sm:p-6">
      {/* Notification Toast */}
      {showNotification && (
        <div className="fixed top-4 right-4 z-50 bg-white border-l-4 border-green-500 rounded-lg shadow-lg p-4 max-w-md animate-slide-in">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-sm">✓</span>
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{notificationMessage}</p>
            </div>
            <button 
              onClick={() => setShowNotification(false)}
              className="ml-4 text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
          <div className="bg-white rounded-lg p-6 flex items-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div>
            <span className="text-gray-700">Elaborazione in corso...</span>
          </div>
        </div>
      )}
      {/* Page Header */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-white/40">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">🚀 Dashboard Merchant</h1>
            <p className="text-gray-600 text-sm sm:text-base lg:text-lg">Panoramica delle tue attività di pagamento</p>
          </div>
          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <button 
              onClick={handleNewPaymentRequest}
              disabled={isLoading}
              className="px-3 sm:px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 text-sm sm:text-base w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? '⏳ Creazione...' : `💳 ${t('merchant.newPaymentRequest')}`}
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatsCard
          title={`💰 ${t('dashboard.availableBalance')}`}
          value="€12,450"
          change="+2.5%"
          trend="up"
          icon={DollarSign}
          color="green"
        />
        <StatsCard
          title={`💳 ${t('dashboard.transactionsToday')}`}
          value="47"
          change="+12%"
          trend="up"
          icon={CreditCard}
          color="blue"
        />
        <StatsCard
          title={`📈 ${t('dashboard.monthlyRevenue')}`}
          value="€8,920"
          change="+8.2%"
          trend="up"
          icon={TrendingUp}
          color="indigo"
        />
        <StatsCard
          title={`⏳ ${t('dashboard.pendingTransactions')}`}
          value="3"
          change="-1"
          trend="down"
          icon={Clock}
          color="orange"
        />
      </div>

      {/* AI Widget */}
      <DashboardAIWidget />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/30 p-4 sm:p-6 lg:p-8 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center mb-4 sm:mb-6">
            <div className="w-2 sm:w-3 h-6 sm:h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full mr-3 sm:mr-4"></div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-800">📊 Andamento Transazioni</h3>
          </div>
          <TransactionChart />
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/30 p-4 sm:p-6 lg:p-8 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center mb-4 sm:mb-6">
            <div className="w-2 sm:w-3 h-6 sm:h-8 bg-gradient-to-b from-purple-500 to-pink-600 rounded-full mr-3 sm:mr-4"></div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-800">⚡ Performance Settimanale</h3>
          </div>
          <div className="space-y-4 sm:space-y-6">
            <div className="flex justify-between items-center p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
              <span className="text-xs sm:text-sm font-medium text-gray-700 flex items-center">
                <span className="mr-1 sm:mr-2">💼</span>
                Commissioni
              </span>
              <span className="font-bold text-base sm:text-lg text-blue-600">2.5%</span>
            </div>
            <div className="flex justify-between items-center p-3 sm:p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-200">
              <span className="text-xs sm:text-sm font-medium text-gray-700 flex items-center">
                <span className="mr-1 sm:mr-2">✅</span>
                Tasso di Successo
              </span>
              <span className="font-bold text-base sm:text-lg text-emerald-600">98.2%</span>
            </div>
            <div className="flex justify-between items-center p-3 sm:p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
              <span className="text-xs sm:text-sm font-medium text-gray-700 flex items-center">
                <span className="mr-1 sm:mr-2">⚡</span>
                Tempo Medio Elaborazione
              </span>
              <span className="font-bold text-base sm:text-lg text-amber-600">1.2s</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/30 overflow-hidden hover:shadow-2xl transition-all duration-300">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-bold text-white flex items-center">
            <span className="mr-2 sm:mr-3">💳</span>
            Transazioni Recenti
          </h3>
        </div>
        <div className="p-4 sm:p-6">
          <div className="space-y-3">
            {recentTransactions.map((transaction, index) => (
              <div key={transaction.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 rounded-xl transition-all duration-200 border border-transparent hover:border-indigo-200 gap-3 sm:gap-0">
                <div className="flex items-center space-x-3 sm:space-x-4 flex-1">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm sm:text-base truncate">{transaction.customer}</p>
                    <p className="text-xs sm:text-sm text-gray-500">{transaction.id} • {transaction.time}</p>
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

      {/* Quick Actions */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/30 p-4 sm:p-6 lg:p-8 hover:shadow-2xl transition-all duration-300">
        <div className="flex items-center mb-4 sm:mb-6">
          <div className="w-2 sm:w-3 h-6 sm:h-8 bg-gradient-to-b from-orange-500 to-red-600 rounded-full mr-3 sm:mr-4"></div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-800">🚀 {t('merchant.quickActions')}</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button 
            onClick={handleNewPaymentRequest}
            disabled={isLoading}
            className="p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200 rounded-xl hover:from-blue-100 hover:to-indigo-200 hover:shadow-lg transition-all duration-200 text-left group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-bold text-gray-900">💳 {t('merchant.newRequest')}</p>
                <p className="text-sm text-gray-600">{t('merchant.createPayment')}</p>
              </div>
            </div>
          </button>
          
          <button 
            onClick={handleExportData}
            disabled={isLoading}
            className="p-4 sm:p-6 bg-gradient-to-br from-emerald-50 to-green-100 border border-emerald-200 rounded-xl hover:from-emerald-100 hover:to-green-200 hover:shadow-lg transition-all duration-200 text-left group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                <Download className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm sm:text-base">📊 {t('merchant.exportData')}</p>
                <p className="text-xs sm:text-sm text-gray-600">Download report</p>
              </div>
            </div>
          </button>
          
          <button 
            onClick={handleSettings}
            disabled={isLoading}
            className="p-4 sm:p-6 bg-gradient-to-br from-purple-50 to-pink-100 border border-purple-200 rounded-xl hover:from-purple-100 hover:to-pink-200 hover:shadow-lg transition-all duration-200 text-left group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                <Settings className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm sm:text-base">⚙️ {t('common.settings')}</p>
                <p className="text-xs sm:text-sm text-gray-600">{t('merchant.configureAccount')}</p>
              </div>
            </div>
          </button>
          
          <button 
            onClick={handleSupport}
            disabled={isLoading}
            className="p-4 sm:p-6 bg-gradient-to-br from-amber-50 to-orange-100 border border-amber-200 rounded-xl hover:from-amber-100 hover:to-orange-200 hover:shadow-lg transition-all duration-200 text-left group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm sm:text-base">🆘 {t('common.support')}</p>
                <p className="text-xs sm:text-sm text-gray-600">{t('merchant.technicalSupport')}</p>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-4 sm:p-6 text-white">
          <h3 className="text-base sm:text-lg font-semibold mb-2">Commissioni del Mese</h3>
          <p className="text-2xl sm:text-3xl font-bold mb-1">2.8%</p>
          <p className="text-indigo-100 text-xs sm:text-sm">Commissione media applicata</p>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-4 sm:p-6 text-white">
          <h3 className="text-base sm:text-lg font-semibold mb-2">Tasso di Successo</h3>
          <p className="text-2xl sm:text-3xl font-bold mb-1">99.2%</p>
          <p className="text-green-100 text-xs sm:text-sm">Transazioni completate con successo</p>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-xl p-4 sm:p-6 text-white">
          <h3 className="text-base sm:text-lg font-semibold mb-2">Tempo Medio</h3>
          <p className="text-2xl sm:text-3xl font-bold mb-1">1.4s</p>
          <p className="text-orange-100 text-xs sm:text-sm">Tempo medio di elaborazione</p>
        </div>
      </div>
    </div>
  );
};

export default MerchantOverview;