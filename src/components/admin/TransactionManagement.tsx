import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import TransactionVolumeChart from '../charts/TransactionVolumeChart';
import PaymentMethodBreakdownChart from '../charts/PaymentMethodBreakdownChart';
import TransactionErrorAnalysisChart from '../charts/TransactionErrorAnalysisChart';
import AIInsightsSummary from '../ai/AIInsightsSummary';
import { Search, Filter, Download, Eye, MoreHorizontal, RefreshCw, AlertTriangle, CheckCircle, Clock, XCircle, AlertCircle } from 'lucide-react';
import DashboardAIWidget from '../ai/DashboardAIWidget';

const TransactionManagement: React.FC = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('today');

  const transactions = [
    {
      id: 'TXN001',
      merchantName: 'Damascus Electronics',
      merchantId: 'MERCH001',
      amount: 2850.00,
      fee: 71.25,
      status: 'completed',
      paymentMethod: 'Carta di Credito',
      timestamp: '2024-01-15 14:23:12',
      customerRef: '#4521',
      processingTime: '1.2s'
    },
    {
      id: 'TXN002',
      merchantName: 'Aleppo Fashion Store',
      merchantId: 'MERCH002',
      amount: 1420.50,
      fee: 39.77,
      status: 'completed',
      paymentMethod: 'Carta di Debito',
      timestamp: '2024-01-15 14:18:45',
      customerRef: '#4522',
      processingTime: '0.9s'
    },
    {
      id: 'TXN003',
      merchantName: 'Homs Restaurant',
      merchantId: 'MERCH003',
      amount: 890.25,
      fee: 26.71,
      status: 'pending',
      paymentMethod: 'Carta di Credito',
      timestamp: '2024-01-15 14:15:33',
      customerRef: '#4523',
      processingTime: '-'
    },
    {
      id: 'TXN004',
      merchantName: 'Latakia Pharmacy',
      merchantId: 'MERCH004',
      amount: 340.75,
      fee: 7.50,
      status: 'completed',
      paymentMethod: 'Contactless',
      timestamp: '2024-01-15 14:08:21',
      customerRef: '#4524',
      processingTime: '0.7s'
    },
    {
      id: 'TXN005',
      merchantName: 'Tartus Market',
      merchantId: 'MERCH005',
      amount: 1650.00,
      fee: 52.80,
      status: 'failed',
      paymentMethod: 'Carta di Credito',
      timestamp: '2024-01-15 13:55:17',
      customerRef: '#4525',
      processingTime: '2.1s'
    },
    {
      id: 'TXN006',
      merchantName: 'Damascus Electronics',
      merchantId: 'MERCH001',
      amount: 4250.50,
      fee: 106.26,
      status: 'completed',
      paymentMethod: 'Carta di Credito',
      timestamp: '2024-01-15 13:42:09',
      customerRef: '#4526',
      processingTime: '1.4s'
    }
  ];

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.merchantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.customerRef.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return CheckCircle;
      case 'pending':
        return Clock;
      case 'failed':
        return AlertCircle;
      default:
        return Clock;
    }
  };

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

  const totalVolume = filteredTransactions.reduce((sum, t) => sum + t.amount, 0);
  const totalFees = filteredTransactions.reduce((sum, t) => sum + t.fee, 0);
  const successRate = (filteredTransactions.filter(t => t.status === 'completed').length / filteredTransactions.length * 100).toFixed(1);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('navigation.transactions')}</h1>
          <p className="text-gray-500 mt-1">{t('admin.transactionManagementDesc')}</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center space-x-2">
            <Download className="w-5 h-5" />
            <span>{t('common.export')}</span>
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2">
            <RefreshCw className="w-5 h-5" />
            <span>Aggiorna</span>
          </button>
        </div>
      </div>

      {/* AI Widget */}
      <DashboardAIWidget />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Volume Totale</h3>
          <p className="text-2xl font-bold text-gray-900">€{totalVolume.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Commissioni</h3>
          <p className="text-2xl font-bold text-green-600">€{totalFees.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Tasso di Successo</h3>
          <p className="text-2xl font-bold text-blue-600">{successRate}%</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Transazioni</h3>
          <p className="text-2xl font-bold text-indigo-600">{filteredTransactions.length}</p>
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
                placeholder="Cerca transazioni..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Tutti gli stati</option>
                <option value="completed">Completate</option>
                <option value="pending">In Corso</option>
                <option value="failed">Fallite</option>
              </select>
            </div>

            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="today">Oggi</option>
              <option value="week">Questa settimana</option>
              <option value="month">Questo mese</option>
              <option value="quarter">Ultimo trimestre</option>
            </select>
          </div>

          <div className="text-sm text-gray-500">
            {filteredTransactions.length} transazioni trovate
          </div>
        </div>
      </div>

      {/* Analytics Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <TransactionVolumeChart />
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <PaymentMethodBreakdownChart />
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <TransactionErrorAnalysisChart />
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transazione
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Merchant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Importo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Commissione
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Metodo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tempo
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Azioni
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => {
                const StatusIcon = getStatusIcon(transaction.status);
                return (
                  <tr key={transaction.id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{transaction.id}</div>
                        <div className="text-sm text-gray-500">{transaction.customerRef}</div>
                        <div className="text-xs text-gray-400">{transaction.timestamp}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{transaction.merchantName}</div>
                        <div className="text-sm text-gray-500">{transaction.merchantId}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">€{transaction.amount.toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-green-600">€{transaction.fee.toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <StatusIcon className="w-4 h-4 mr-2 text-gray-400" />
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(transaction.status)}`}>
                          {getStatusText(transaction.status)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {transaction.paymentMethod}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {transaction.processingTime}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Insights Summary */}
      <div className="mt-8">
        <AIInsightsSummary />
      </div>
    </div>
  );
};

export default TransactionManagement;