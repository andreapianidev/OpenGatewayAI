import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Filter, Download, Eye, Calendar, CreditCard, CheckCircle, Clock, XCircle, TrendingUp, DollarSign } from 'lucide-react';
import DashboardAIWidget from '../ai/DashboardAIWidget';

const TransactionHistory: React.FC = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('last30days');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Funzione per mostrare notifiche simulate
  const showSimulatedNotification = (message: string) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  // Funzioni simulate
  const handleExportTransactions = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      showSimulatedNotification('📊 ' + t('transactions.exportSuccess'));
      // Simula il download
      const csvData = filteredTransactions.map(t => 
        `${t.id},${t.amount},${t.customer},${t.status},${t.timestamp}`
      ).join('\n');
      const link = document.createElement('a');
      link.href = 'data:text/csv;charset=utf-8,ID,Amount,Customer,Status,Date\n' + csvData;
      link.download = 'transactions_' + new Date().toISOString().split('T')[0] + '.csv';
      link.click();
    }, 2000);
  };

  const handleViewTransaction = (transactionId: string) => {
    showSimulatedNotification(`👁️ ${t('transactions.openingDetails')} ${transactionId}...`);
    setTimeout(() => {
      showSimulatedNotification(`📋 ${t('transactions.detailsLoaded')} ${transactionId}!`);
    }, 1000);
  };

  const handleRefreshTransactions = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      showSimulatedNotification('🔄 ' + t('transactions.refreshSuccess'));
    }, 1500);
  };

  const transactions = [
    {
      id: 'TXN_M001',
      amount: 245.50,
      fee: 6.88,
      net: 238.62,
      customer: 'Cliente #4521',
      paymentMethod: t('paymentMethods.creditCard'),
      status: 'completed',
      timestamp: '2024-01-15 14:23:12',
      reference: 'REF001'
    },
    {
      id: 'TXN_M002',
      amount: 89.90,
      fee: 2.52,
      net: 87.38,
      customer: 'Cliente #4522',
      paymentMethod: t('paymentMethods.debitCard'),
      status: 'completed',
      timestamp: '2024-01-15 12:45:33',
      reference: 'REF002'
    },
    {
      id: 'TXN_M003',
      amount: 156.75,
      fee: 4.39,
      net: 152.36,
      customer: 'Cliente #4523',
      paymentMethod: t('paymentMethods.contactless'),
      status: 'pending',
      timestamp: '2024-01-15 11:20:15',
      reference: 'REF003'
    },
    {
      id: 'TXN_M004',
      amount: 320.00,
      fee: 8.96,
      net: 311.04,
      customer: 'Cliente #4524',
      paymentMethod: t('paymentMethods.creditCard'),
      status: 'completed',
      timestamp: '2024-01-15 09:15:42',
      reference: 'REF004'
    },
    {
      id: 'TXN_M005',
      amount: 67.25,
      fee: 1.88,
      net: 65.37,
      customer: 'Cliente #4525',
      paymentMethod: t('paymentMethods.digitalWallet'),
      status: 'completed',
      timestamp: '2024-01-14 18:30:21',
      reference: 'REF005'
    },
    {
      id: 'TXN_M006',
      amount: 425.80,
      fee: 11.92,
      net: 413.88,
      customer: 'Cliente #4526',
      paymentMethod: t('paymentMethods.creditCard'),
      status: 'failed',
      timestamp: '2024-01-14 16:45:18',
      reference: 'REF006'
    }
  ];

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.reference.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedFilter === 'all' || transaction.status === selectedFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return t('common.completed');
      case 'pending':
        return t('common.pending');
      case 'failed':
        return t('common.failed');
      default:
        return status;
    }
  };

  const totalAmount = filteredTransactions.reduce((sum, t) => sum + t.amount, 0);
  const totalFees = filteredTransactions.reduce((sum, t) => sum + t.fee, 0);
  const totalNet = filteredTransactions.reduce((sum, t) => sum + t.net, 0);

  return (
    <div className="p-6 space-y-6">
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
            <span className="text-gray-700">{t('common.loading')}</span>
          </div>
        </div>
      )}
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('navigation.transactionHistory')}</h1>
          <p className="text-gray-500 mt-1">{t('merchant.transactionHistoryDesc')}</p>
        </div>
        <button 
          onClick={handleExportTransactions}
          disabled={isLoading}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download className="w-5 h-5" />
          <span>{isLoading ? t('transactions.exporting') : t('common.exportCSV')}</span>
        </button>
      </div>

      {/* AI Widget */}
      <DashboardAIWidget />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">{t('dashboard.totalVolume')}</h3>
          <p className="text-2xl font-bold text-gray-900">€{totalAmount.toFixed(2)}</p>
          <p className="text-sm text-gray-500 mt-1">{filteredTransactions.length} {t('common.transactions')}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">{t('dashboard.feesPaid')}</h3>
          <p className="text-2xl font-bold text-orange-600">€{totalFees.toFixed(2)}</p>
          <p className="text-sm text-gray-500 mt-1">{((totalFees / totalAmount) * 100).toFixed(1)}% {t('dashboard.ofVolume')}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">{t('dashboard.netAmount')}</h3>
          <p className="text-2xl font-bold text-green-600">€{totalNet.toFixed(2)}</p>
          <p className="text-sm text-gray-500 mt-1">{t('dashboard.afterFees')}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={t('common.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent w-64"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="all">{t('common.all')}</option>
                <option value="completed">{t('status.completed')}</option>
                <option value="pending">{t('status.pending')}</option>
                <option value="failed">{t('status.failed')}</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-gray-400" />
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="today">{t('periods.today')}</option>
                <option value="last7days">{t('common.last7Days')}</option>
                <option value="last30days">{t('common.last30Days')}</option>
                <option value="last3months">{t('common.last3Months')}</option>
              </select>
            </div>
          </div>

          <div className="text-sm text-gray-500">
            {filteredTransactions.length} {t('transactions.transactionsFound')}
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('transactions.transaction')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('transactions.customer')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('common.amount')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('transactions.fee')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('dashboard.netAmount')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('transactions.paymentMethod')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('common.status')}
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('common.actions')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{transaction.id}</div>
                      <div className="text-sm text-gray-500">{transaction.reference}</div>
                      <div className="text-xs text-gray-400">{transaction.timestamp}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{transaction.customer}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">€{transaction.amount.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-orange-600">€{transaction.fee.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-green-600">€{transaction.net.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-500">
                      <CreditCard className="w-4 h-4 mr-2" />
                      {transaction.paymentMethod}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(transaction.status)}`}>
                      {getStatusText(transaction.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => handleViewTransaction(transaction.id)}
                      disabled={isLoading}
                      className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      title={t('common.viewDetails')}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            {t('common.showing')} 1-{filteredTransactions.length} {t('common.of')} {filteredTransactions.length} {t('common.results')}
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors duration-200">
              {t('common.previous')}
            </button>
            <button className="px-3 py-1 bg-indigo-600 text-white rounded text-sm hover:bg-indigo-700 transition-colors duration-200">
              1
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors duration-200">
              {t('common.next')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;