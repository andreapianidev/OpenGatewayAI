import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Activity, AlertTriangle, CheckCircle, Clock, DollarSign, Globe, MapPin, Smartphone, TrendingUp, Users, Zap } from 'lucide-react';

interface Transaction {
  id: string;
  merchant: string;
  amount: number;
  status: 'success' | 'pending' | 'failed' | 'flagged';
  location: string;
  riskScore: number;
  timestamp: Date;
  paymentMethod: string;
  aiConfidence: number;
}

const RealTimeMonitoring: React.FC = () => {
  const { t } = useTranslation();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [stats, setStats] = useState({
    totalTransactions: 0,
    successRate: 0,
    avgAmount: 0,
    flaggedTransactions: 0
  });

  // Simulate real-time data
  useEffect(() => {
    const generateTransaction = (): Transaction => {
      const merchants = ['Damascus Electronics', 'Aleppo Fashion', 'Homs Restaurant', 'Latakia Pharmacy', 'Tartus Market'];
      const locations = ['Damascus', 'Aleppo', 'Homs', 'Latakia', 'Tartus'];
      const paymentMethods = ['Visa', 'Mastercard', 'Mobile Wallet', 'Bank Transfer'];
      const statuses: Transaction['status'][] = ['success', 'pending', 'failed', 'flagged'];
      
      const riskScore = Math.random() * 100;
      const status = riskScore > 85 ? 'flagged' : statuses[Math.floor(Math.random() * 3)];
      
      return {
        id: `TXN${Date.now()}${Math.floor(Math.random() * 1000)}`,
        merchant: merchants[Math.floor(Math.random() * merchants.length)],
        amount: Math.floor(Math.random() * 5000) + 100,
        status,
        location: locations[Math.floor(Math.random() * locations.length)],
        riskScore,
        timestamp: new Date(),
        paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
        aiConfidence: Math.floor(Math.random() * 20) + 80
      };
    };

    const interval = setInterval(() => {
      const newTransaction = generateTransaction();
      setTransactions(prev => [newTransaction, ...prev.slice(0, 19)]); // Keep last 20 transactions
      
      // Update stats
      setStats(prev => ({
        totalTransactions: prev.totalTransactions + 1,
        successRate: Math.floor(Math.random() * 5) + 95,
        avgAmount: Math.floor(Math.random() * 1000) + 1500,
        flaggedTransactions: prev.flaggedTransactions + (newTransaction.status === 'flagged' ? 1 : 0)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status: Transaction['status']) => {
    switch (status) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'failed': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'flagged': return <AlertTriangle className="w-4 h-4 text-orange-500" />;
    }
  };

  const getStatusColor = (status: Transaction['status']) => {
    switch (status) {
      case 'success': return 'bg-green-50 border-green-200 text-green-700';
      case 'pending': return 'bg-yellow-50 border-yellow-200 text-yellow-700';
      case 'failed': return 'bg-red-50 border-red-200 text-red-700';
      case 'flagged': return 'bg-orange-50 border-orange-200 text-orange-700';
    }
  };

  const getRiskColor = (riskScore: number) => {
    if (riskScore < 30) return 'text-green-600 bg-green-100';
    if (riskScore < 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="space-y-6">
      {/* Real-time Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">Live Transactions</h3>
          <p className="text-3xl font-bold text-gray-900">{stats.totalTransactions}</p>
          <p className="text-sm text-gray-600">Total processed today</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm font-semibold px-3 py-1 rounded-full bg-green-100 text-green-700">
              +2.1%
            </span>
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">Success Rate</h3>
          <p className="text-3xl font-bold text-gray-900">{stats.successRate}%</p>
          <p className="text-sm text-gray-600">AI-optimized processing</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm font-semibold px-3 py-1 rounded-full bg-purple-100 text-purple-700">
              Live
            </span>
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">Avg Amount</h3>
          <p className="text-3xl font-bold text-gray-900">€{stats.avgAmount}</p>
          <p className="text-sm text-gray-600">Per transaction</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm font-semibold px-3 py-1 rounded-full bg-orange-100 text-orange-700">
              AI Flagged
            </span>
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">Risk Alerts</h3>
          <p className="text-3xl font-bold text-gray-900">{stats.flaggedTransactions}</p>
          <p className="text-sm text-gray-600">Flagged for review</p>
        </div>
      </div>

      {/* Live Transaction Feed */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/30 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
          <h3 className="text-xl font-bold text-white flex items-center">
            <Zap className="w-6 h-6 mr-3" />
            Live Transaction Feed
            <div className="ml-3 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {transactions.map((transaction, index) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-all duration-200 border border-gray-100">
                <div className="flex items-center space-x-4 flex-1">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(transaction.status)}
                    <span className={`text-xs px-2 py-1 rounded-full font-semibold ${getStatusColor(transaction.status)}`}>
                      {transaction.status.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <p className="font-semibold text-gray-900">{transaction.merchant}</p>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {transaction.id}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {transaction.location}
                      </span>
                      <span className="flex items-center">
                        <Smartphone className="w-3 h-3 mr-1" />
                        {transaction.paymentMethod}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {transaction.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right space-y-1">
                  <p className="font-bold text-lg text-gray-900">€{transaction.amount.toLocaleString()}</p>
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs px-2 py-1 rounded-full font-semibold ${getRiskColor(transaction.riskScore)}`}>
                      Risk: {transaction.riskScore.toFixed(0)}%
                    </span>
                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                      AI: {transaction.aiConfidence}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
            
            {transactions.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Waiting for live transactions...</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Geographic Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/30 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
            <Globe className="w-5 h-5 mr-2 text-blue-600" />
            Geographic Distribution
          </h3>
          <div className="space-y-3">
            {['Damascus', 'Aleppo', 'Homs', 'Latakia', 'Tartus'].map((city, index) => {
              const percentage = Math.floor(Math.random() * 30) + 10;
              return (
                <div key={city} className="flex items-center justify-between">
                  <span className="text-gray-700">{city}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-500" 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold text-gray-600 w-8">{percentage}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/30 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
            <Users className="w-5 h-5 mr-2 text-green-600" />
            Payment Methods
          </h3>
          <div className="space-y-3">
            {[
              { method: 'Visa', percentage: 35, color: 'blue' },
              { method: 'Mastercard', percentage: 28, color: 'red' },
              { method: 'Mobile Wallet', percentage: 22, color: 'green' },
              { method: 'Bank Transfer', percentage: 15, color: 'purple' }
            ].map((item) => (
              <div key={item.method} className="flex items-center justify-between">
                <span className="text-gray-700">{item.method}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`bg-${item.color}-500 h-2 rounded-full transition-all duration-500`} 
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold text-gray-600 w-8">{item.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeMonitoring;