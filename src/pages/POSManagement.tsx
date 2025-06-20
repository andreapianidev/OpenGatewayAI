import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  CreditCard,
  Smartphone,
  Wifi,
  WifiOff,
  Battery,
  Settings,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Monitor,
  Printer,
  Scanner,
  DollarSign,
  TrendingUp,
  Users,
  Clock,
  Download,
  Upload,
  Play,
  Pause,
  Square
} from 'lucide-react';

interface POSDevice {
  id: string;
  name: string;
  type: 'mobile' | 'desktop' | 'tablet';
  status: 'online' | 'offline' | 'maintenance';
  location: string;
  batteryLevel?: number;
  lastTransaction: string;
  todayTransactions: number;
  todayRevenue: number;
  version: string;
  ipAddress: string;
}

interface POSTransaction {
  id: string;
  posId: string;
  amount: number;
  type: 'sale' | 'refund' | 'void';
  paymentMethod: 'card' | 'cash' | 'contactless' | 'mobile';
  timestamp: string;
  status: 'completed' | 'pending' | 'failed';
  customerRef?: string;
}

const POSManagement: React.FC = () => {
  const { t } = useTranslation();
  const [posDevices, setPosDevices] = useState<POSDevice[]>([
    {
      id: 'pos-001',
      name: 'POS Cassa 1',
      type: 'desktop',
      status: 'online',
      location: 'Piano Terra - Ingresso',
      lastTransaction: '2 min fa',
      todayTransactions: 47,
      todayRevenue: 1250.50,
      version: '2.1.4',
      ipAddress: '192.168.1.101'
    },
    {
      id: 'pos-002',
      name: 'POS Mobile 1',
      type: 'mobile',
      status: 'online',
      location: 'Primo Piano - Cameriere',
      batteryLevel: 78,
      lastTransaction: '5 min fa',
      todayTransactions: 23,
      todayRevenue: 680.25,
      version: '2.1.4',
      ipAddress: '192.168.1.102'
    },
    {
      id: 'pos-003',
      name: 'POS Tablet 1',
      type: 'tablet',
      status: 'maintenance',
      location: 'Secondo Piano - Self Service',
      batteryLevel: 45,
      lastTransaction: '1 ora fa',
      todayTransactions: 12,
      todayRevenue: 340.75,
      version: '2.1.3',
      ipAddress: '192.168.1.103'
    }
  ]);

  const [selectedPOS, setSelectedPOS] = useState<POSDevice | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationLog, setSimulationLog] = useState<string[]>([]);
  const [recentTransactions, setRecentTransactions] = useState<POSTransaction[]>([
    {
      id: 'txn-001',
      posId: 'pos-001',
      amount: 25.50,
      type: 'sale',
      paymentMethod: 'card',
      timestamp: '2024-01-15 14:30:25',
      status: 'completed',
      customerRef: 'CUST-4521'
    },
    {
      id: 'txn-002',
      posId: 'pos-002',
      amount: 18.75,
      type: 'sale',
      paymentMethod: 'contactless',
      timestamp: '2024-01-15 14:25:10',
      status: 'completed'
    },
    {
      id: 'txn-003',
      posId: 'pos-001',
      amount: 45.00,
      type: 'sale',
      paymentMethod: 'mobile',
      timestamp: '2024-01-15 14:20:45',
      status: 'pending'
    }
  ]);

  // Simulazione API POS
  const simulateTransaction = async (posId: string, amount: number) => {
    setIsSimulating(true);
    addToLog(`Iniziando transazione su ${posId} per €${amount}`);
    
    // Simula chiamata API
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newTransaction: POSTransaction = {
      id: `txn-${Date.now()}`,
      posId,
      amount,
      type: 'sale',
      paymentMethod: 'card',
      timestamp: new Date().toISOString(),
      status: Math.random() > 0.1 ? 'completed' : 'failed'
    };
    
    setRecentTransactions(prev => [newTransaction, ...prev.slice(0, 9)]);
    addToLog(`Transazione ${newTransaction.status === 'completed' ? 'completata' : 'fallita'}: ${newTransaction.id}`);
    
    // Aggiorna statistiche POS
    if (newTransaction.status === 'completed') {
      setPosDevices(prev => prev.map(pos => 
        pos.id === posId 
          ? { 
              ...pos, 
              todayTransactions: pos.todayTransactions + 1,
              todayRevenue: pos.todayRevenue + amount,
              lastTransaction: 'Ora'
            }
          : pos
      ));
    }
    
    setIsSimulating(false);
  };

  const addToLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setSimulationLog(prev => [`[${timestamp}] ${message}`, ...prev.slice(0, 19)]);
  };

  const updatePOSStatus = (posId: string, status: 'online' | 'offline' | 'maintenance') => {
    setPosDevices(prev => prev.map(pos => 
      pos.id === posId ? { ...pos, status } : pos
    ));
    addToLog(`POS ${posId} stato cambiato a: ${status}`);
  };

  const restartPOS = async (posId: string) => {
    addToLog(`Riavvio POS ${posId}...`);
    updatePOSStatus(posId, 'offline');
    await new Promise(resolve => setTimeout(resolve, 3000));
    updatePOSStatus(posId, 'online');
    addToLog(`POS ${posId} riavviato con successo`);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'offline': return <XCircle className="w-5 h-5 text-red-500" />;
      case 'maintenance': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      default: return <XCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'mobile': return <Smartphone className="w-6 h-6" />;
      case 'tablet': return <Monitor className="w-6 h-6" />;
      case 'desktop': return <CreditCard className="w-6 h-6" />;
      default: return <CreditCard className="w-6 h-6" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t('pos.management')}</h1>
          <p className="text-gray-600 mt-1">{t('pos.managementDescription')}</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t('pos.totalDevices')}</p>
                <p className="text-2xl font-bold text-gray-900">{posDevices.length}</p>
              </div>
              <Monitor className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t('pos.onlineDevices')}</p>
                <p className="text-2xl font-bold text-green-600">
                  {posDevices.filter(pos => pos.status === 'online').length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t('pos.todayTransactions')}</p>
                <p className="text-2xl font-bold text-indigo-600">
                  {posDevices.reduce((sum, pos) => sum + pos.todayTransactions, 0)}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-indigo-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t('pos.todayRevenue')}</p>
                <p className="text-2xl font-bold text-purple-600">
                  €{posDevices.reduce((sum, pos) => sum + pos.todayRevenue, 0).toFixed(2)}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* POS Devices List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">{t('pos.devicesList')}</h2>
              </div>
              
              <div className="p-6 space-y-4">
                {posDevices.map((pos) => (
                  <div 
                    key={pos.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedPOS?.id === pos.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedPOS(pos)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {getTypeIcon(pos.type)}
                        <div>
                          <h3 className="font-semibold text-gray-900">{pos.name}</h3>
                          <p className="text-sm text-gray-500">{pos.location}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        {pos.batteryLevel && (
                          <div className="flex items-center space-x-1">
                            <Battery className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{pos.batteryLevel}%</span>
                          </div>
                        )}
                        
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(pos.status)}
                          <span className={`text-sm font-medium ${
                            pos.status === 'online' ? 'text-green-600' :
                            pos.status === 'offline' ? 'text-red-600' :
                            'text-yellow-600'
                          }`}>
                            {t(`pos.status.${pos.status}`)}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-3 grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">{t('pos.lastTransaction')}: </span>
                        <span className="font-medium">{pos.lastTransaction}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">{t('pos.todayTransactions')}: </span>
                        <span className="font-medium">{pos.todayTransactions}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">{t('pos.todayRevenue')}: </span>
                        <span className="font-medium">€{pos.todayRevenue.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* POS Control Panel */}
          <div className="space-y-6">
            {/* Selected POS Details */}
            {selectedPOS && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('pos.deviceControl')}</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900">{selectedPOS.name}</h4>
                    <p className="text-sm text-gray-500">{selectedPOS.location}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">{t('pos.version')}: </span>
                      <span className="font-medium">{selectedPOS.version}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">{t('pos.ipAddress')}: </span>
                      <span className="font-medium">{selectedPOS.ipAddress}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <button
                      onClick={() => restartPOS(selectedPOS.id)}
                      className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span>{t('pos.restart')}</span>
                    </button>
                    
                    <button
                      onClick={() => updatePOSStatus(selectedPOS.id, 'maintenance')}
                      className="w-full px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <Settings className="w-4 h-4" />
                      <span>{t('pos.maintenance')}</span>
                    </button>
                    
                    <button
                      onClick={() => simulateTransaction(selectedPOS.id, Math.floor(Math.random() * 100) + 10)}
                      disabled={isSimulating || selectedPOS.status !== 'online'}
                      className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>{isSimulating ? t('pos.processing') : t('pos.simulateTransaction')}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Simulation Log */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('pos.simulationLog')}</h3>
              
              <div className="bg-gray-900 rounded-lg p-4 h-64 overflow-y-auto">
                <div className="space-y-1 text-sm font-mono">
                  {simulationLog.length === 0 ? (
                    <p className="text-gray-400">{t('pos.noLogEntries')}</p>
                  ) : (
                    simulationLog.map((log, index) => (
                      <div key={index} className="text-green-400">
                        {log}
                      </div>
                    ))
                  )}
                </div>
              </div>
              
              <button
                onClick={() => setSimulationLog([])}
                className="mt-4 w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                {t('pos.clearLog')}
              </button>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">{t('pos.recentTransactions')}</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('transactions.transactionId')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('pos.device')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('common.amount')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('transactions.paymentMethod')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('common.status')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('transactions.timestamp')}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentTransactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {transaction.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {posDevices.find(pos => pos.id === transaction.posId)?.name || transaction.posId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      €{transaction.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {t(`transactions.${transaction.paymentMethod}`)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        transaction.status === 'completed' ? 'bg-green-100 text-green-800' :
                        transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {t(`common.${transaction.status}`)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(transaction.timestamp).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default POSManagement;