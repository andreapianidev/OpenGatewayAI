import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  CreditCard, 
  Globe, 
  Shield, 
  Zap, 
  TrendingUp, 
  TrendingDown, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Settings, 
  Plus, 
  Eye, 
  BarChart3, 
  PieChart, 
  Activity, 
  DollarSign, 
  Users, 
  Clock, 
  MapPin, 
  Smartphone, 
  Wifi, 
  Lock,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  Filter,
  Download
} from 'lucide-react';

interface PaymentProvider {
  id: string;
  name: string;
  logo: string;
  type: 'card' | 'digital' | 'bank' | 'crypto';
  status: 'active' | 'inactive' | 'pending' | 'maintenance';
  region: string[];
  fees: {
    transaction: number;
    monthly: number;
    setup: number;
  };
  limits: {
    daily: number;
    monthly: number;
    perTransaction: number;
  };
  features: string[];
  integrationStatus: 'connected' | 'disconnected' | 'error';
  apiVersion: string;
  lastSync: string;
  performance: {
    uptime: number;
    avgResponseTime: number;
    successRate: number;
    volume24h: number;
    revenue24h: number;
  };
  compliance: {
    pci: boolean;
    gdpr: boolean;
    psd2: boolean;
    kyc: boolean;
  };
  rating: number;
  reviews: number;
}

interface ProviderMetrics {
  totalVolume: number;
  totalRevenue: number;
  totalTransactions: number;
  avgTransactionValue: number;
  topProvider: string;
  growthRate: number;
  errorRate: number;
  avgResponseTime: number;
}

interface TransactionFlow {
  providerId: string;
  timestamp: string;
  amount: number;
  status: 'success' | 'failed' | 'pending';
  responseTime: number;
  country: string;
  paymentMethod: string;
}

const PaymentProviderHub: React.FC = () => {
  const { t } = useTranslation();
  const [selectedProvider, setSelectedProvider] = useState<PaymentProvider | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterType, setFilterType] = useState<'all' | 'card' | 'digital' | 'bank' | 'crypto'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'performance' | 'volume' | 'fees'>('performance');
  const [showMetrics, setShowMetrics] = useState(true);

  const paymentProviders: PaymentProvider[] = [
    {
      id: 'visa',
      name: 'Visa',
      logo: '💳',
      type: 'card',
      status: 'active',
      region: ['EU', 'US', 'APAC'],
      fees: { transaction: 0.025, monthly: 50, setup: 0 },
      limits: { daily: 1000000, monthly: 30000000, perTransaction: 50000 },
      features: ['3D Secure', 'Tokenization', 'Fraud Detection', 'Real-time Authorization'],
      integrationStatus: 'connected',
      apiVersion: 'v2.1',
      lastSync: '2024-01-20T14:30:00Z',
      performance: {
        uptime: 99.9,
        avgResponseTime: 120,
        successRate: 98.5,
        volume24h: 2450000,
        revenue24h: 61250
      },
      compliance: { pci: true, gdpr: true, psd2: true, kyc: true },
      rating: 4.8,
      reviews: 1250
    },
    {
      id: 'mastercard',
      name: 'Mastercard',
      logo: '💳',
      type: 'card',
      status: 'active',
      region: ['EU', 'US', 'LATAM'],
      fees: { transaction: 0.028, monthly: 45, setup: 0 },
      limits: { daily: 800000, monthly: 25000000, perTransaction: 45000 },
      features: ['Mastercard ID Check', 'Digital Secure Remote Payments', 'Decision Intelligence'],
      integrationStatus: 'connected',
      apiVersion: 'v3.0',
      lastSync: '2024-01-20T14:25:00Z',
      performance: {
        uptime: 99.7,
        avgResponseTime: 135,
        successRate: 97.8,
        volume24h: 1890000,
        revenue24h: 52920
      },
      compliance: { pci: true, gdpr: true, psd2: true, kyc: true },
      rating: 4.6,
      reviews: 980
    },
    {
      id: 'paypal',
      name: 'PayPal',
      logo: '🅿️',
      type: 'digital',
      status: 'active',
      region: ['Global'],
      fees: { transaction: 0.034, monthly: 0, setup: 0 },
      limits: { daily: 500000, monthly: 15000000, perTransaction: 25000 },
      features: ['PayPal Checkout', 'Express Checkout', 'Buyer Protection', 'Recurring Payments'],
      integrationStatus: 'connected',
      apiVersion: 'v2.0',
      lastSync: '2024-01-20T14:20:00Z',
      performance: {
        uptime: 99.5,
        avgResponseTime: 180,
        successRate: 96.2,
        volume24h: 1250000,
        revenue24h: 42500
      },
      compliance: { pci: true, gdpr: true, psd2: false, kyc: true },
      rating: 4.4,
      reviews: 2100
    },
    {
      id: 'stripe',
      name: 'Stripe',
      logo: '💙',
      type: 'digital',
      status: 'active',
      region: ['Global'],
      fees: { transaction: 0.029, monthly: 0, setup: 0 },
      limits: { daily: 2000000, monthly: 60000000, perTransaction: 100000 },
      features: ['Radar Fraud Detection', 'Connect Platform', 'Billing', 'Terminal'],
      integrationStatus: 'connected',
      apiVersion: 'v1.0',
      lastSync: '2024-01-20T14:35:00Z',
      performance: {
        uptime: 99.95,
        avgResponseTime: 95,
        successRate: 99.1,
        volume24h: 3200000,
        revenue24h: 92800
      },
      compliance: { pci: true, gdpr: true, psd2: true, kyc: true },
      rating: 4.9,
      reviews: 3500
    },
    {
      id: 'sepa',
      name: 'SEPA Instant',
      logo: '🏦',
      type: 'bank',
      status: 'active',
      region: ['EU'],
      fees: { transaction: 0.002, monthly: 25, setup: 100 },
      limits: { daily: 5000000, monthly: 150000000, perTransaction: 100000 },
      features: ['Instant Transfers', 'Request to Pay', 'IBAN Verification'],
      integrationStatus: 'connected',
      apiVersion: 'v1.3',
      lastSync: '2024-01-20T14:15:00Z',
      performance: {
        uptime: 99.8,
        avgResponseTime: 2500,
        successRate: 99.5,
        volume24h: 4500000,
        revenue24h: 9000
      },
      compliance: { pci: false, gdpr: true, psd2: true, kyc: true },
      rating: 4.7,
      reviews: 450
    },
    {
      id: 'bitcoin',
      name: 'Bitcoin Lightning',
      logo: '₿',
      type: 'crypto',
      status: 'pending',
      region: ['Global'],
      fees: { transaction: 0.001, monthly: 0, setup: 0 },
      limits: { daily: 100000, monthly: 3000000, perTransaction: 5000 },
      features: ['Lightning Network', 'Instant Settlement', 'Low Fees'],
      integrationStatus: 'disconnected',
      apiVersion: 'v0.9',
      lastSync: '2024-01-19T10:00:00Z',
      performance: {
        uptime: 95.2,
        avgResponseTime: 3000,
        successRate: 92.1,
        volume24h: 45000,
        revenue24h: 45
      },
      compliance: { pci: false, gdpr: false, psd2: false, kyc: false },
      rating: 3.8,
      reviews: 120
    }
  ];

  const calculateMetrics = (): ProviderMetrics => {
    const activeProviders = paymentProviders.filter(p => p.status === 'active');
    const totalVolume = activeProviders.reduce((sum, p) => sum + p.performance.volume24h, 0);
    const totalRevenue = activeProviders.reduce((sum, p) => sum + p.performance.revenue24h, 0);
    const totalTransactions = Math.floor(totalVolume / 45); // Assuming avg transaction of 45 EUR
    const topProvider = activeProviders.reduce((top, current) => 
      current.performance.volume24h > top.performance.volume24h ? current : top
    ).name;
    
    return {
      totalVolume,
      totalRevenue,
      totalTransactions,
      avgTransactionValue: totalVolume / totalTransactions,
      topProvider,
      growthRate: 12.5,
      errorRate: 1.2,
      avgResponseTime: 156
    };
  };

  const metrics = calculateMetrics();

  const filteredProviders = paymentProviders.filter(provider => 
    filterType === 'all' || provider.type === filterType
  );

  const sortedProviders = [...filteredProviders].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'performance':
        return b.performance.successRate - a.performance.successRate;
      case 'volume':
        return b.performance.volume24h - a.performance.volume24h;
      case 'fees':
        return a.fees.transaction - b.fees.transaction;
      default:
        return 0;
    }
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'inactive': return 'text-gray-600 bg-gray-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'maintenance': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getIntegrationStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'disconnected': return <XCircle className="h-4 w-4 text-red-600" />;
      case 'error': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      default: return <XCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const formatTime = (ms: number) => {
    return `${ms}ms`;
  };

  // Real-time transaction simulation
  const [realtimeTransactions, setRealtimeTransactions] = useState<TransactionFlow[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newTransaction: TransactionFlow = {
        providerId: paymentProviders[Math.floor(Math.random() * paymentProviders.length)].id,
        timestamp: new Date().toISOString(),
        amount: Math.random() * 1000 + 10,
        status: Math.random() > 0.05 ? 'success' : 'failed',
        responseTime: Math.random() * 500 + 50,
        country: ['IT', 'DE', 'FR', 'ES', 'NL'][Math.floor(Math.random() * 5)],
        paymentMethod: ['card', 'digital_wallet', 'bank_transfer'][Math.floor(Math.random() * 3)]
      };
      
      setRealtimeTransactions(prev => [newTransaction, ...prev.slice(0, 9)]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Hub Provider di Pagamento</h2>
          <p className="text-gray-600">Gestisci e monitora tutti i tuoi provider di pagamento</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            <Plus className="h-4 w-4" />
            <span>Aggiungi Provider</span>
          </button>
          <button className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200">
            <Download className="h-4 w-4" />
            <span>Esporta Report</span>
          </button>
        </div>
      </div>

      {/* Metrics Overview */}
      {showMetrics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow border">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                <DollarSign className="h-6 w-6" />
              </div>
              <div className="flex items-center space-x-1 text-green-600">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm font-medium">+{metrics.growthRate}%</span>
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600">Volume Totale 24h</h3>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(metrics.totalVolume)}</p>
            <p className="text-xs text-gray-500">vs ieri</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div className="flex items-center space-x-1 text-green-600">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm font-medium">+8.2%</span>
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600">Ricavi 24h</h3>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(metrics.totalRevenue)}</p>
            <p className="text-xs text-gray-500">vs ieri</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                <Activity className="h-6 w-6" />
              </div>
              <div className="flex items-center space-x-1 text-red-600">
                <TrendingDown className="h-4 w-4" />
                <span className="text-sm font-medium">{formatPercentage(metrics.errorRate)}</span>
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600">Transazioni 24h</h3>
            <p className="text-2xl font-bold text-gray-900">{metrics.totalTransactions.toLocaleString()}</p>
            <p className="text-xs text-gray-500">Tasso errore: {formatPercentage(metrics.errorRate)}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-yellow-100 text-yellow-600 rounded-lg">
                <Clock className="h-6 w-6" />
              </div>
              <div className="flex items-center space-x-1 text-green-600">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm font-medium">-12ms</span>
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600">Tempo Risposta Medio</h3>
            <p className="text-2xl font-bold text-gray-900">{formatTime(metrics.avgResponseTime)}</p>
            <p className="text-xs text-gray-500">vs ieri</p>
          </div>
        </div>
      )}

      {/* Filters and Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="flex space-x-2">
            {['all', 'card', 'digital', 'bank', 'crypto'].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type as any)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  filterType === type
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type === 'all' ? 'Tutti' :
                 type === 'card' ? 'Carte' :
                 type === 'digital' ? 'Digitali' :
                 type === 'bank' ? 'Bancari' : 'Crypto'}
              </button>
            ))}
          </div>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="border border-gray-300 rounded-lg px-3 py-1 text-sm"
          >
            <option value="performance">Ordina per Performance</option>
            <option value="volume">Ordina per Volume</option>
            <option value="fees">Ordina per Commissioni</option>
            <option value="name">Ordina per Nome</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg ${
              viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            <BarChart3 className="h-4 w-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg ${
              viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            <Activity className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Provider Grid/List */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
        {sortedProviders.map((provider) => (
          <div 
            key={provider.id} 
            className={`bg-white rounded-lg shadow border hover:shadow-lg transition-all cursor-pointer ${
              viewMode === 'list' ? 'p-4' : 'p-6'
            }`}
            onClick={() => setSelectedProvider(provider)}
          >
            {viewMode === 'grid' ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{provider.logo}</span>
                    <div>
                      <h3 className="font-semibold text-gray-900">{provider.name}</h3>
                      <p className="text-sm text-gray-600 capitalize">{provider.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getIntegrationStatusIcon(provider.integrationStatus)}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(provider.status)}`}>
                      {provider.status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Uptime</p>
                    <p className="font-semibold">{formatPercentage(provider.performance.uptime)}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Success Rate</p>
                    <p className="font-semibold">{formatPercentage(provider.performance.successRate)}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Volume 24h</p>
                    <p className="font-semibold">{formatCurrency(provider.performance.volume24h)}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Commissione</p>
                    <p className="font-semibold">{formatPercentage(provider.fees.transaction * 100)}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${
                          i < Math.floor(provider.rating) 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-300'
                        }`} 
                      />
                    ))}
                    <span className="text-sm text-gray-600">({provider.reviews})</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {provider.compliance.pci && <Shield className="h-4 w-4 text-green-600" />}
                    {provider.compliance.gdpr && <Lock className="h-4 w-4 text-blue-600" />}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-xl">{provider.logo}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">{provider.name}</h3>
                    <p className="text-sm text-gray-600">{provider.type} • {provider.region.join(', ')}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6 text-sm">
                  <div className="text-center">
                    <p className="text-gray-600">Volume 24h</p>
                    <p className="font-semibold">{formatCurrency(provider.performance.volume24h)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-600">Success Rate</p>
                    <p className="font-semibold">{formatPercentage(provider.performance.successRate)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-600">Commissione</p>
                    <p className="font-semibold">{formatPercentage(provider.fees.transaction * 100)}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getIntegrationStatusIcon(provider.integrationStatus)}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(provider.status)}`}>
                      {provider.status}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Real-time Transaction Feed */}
      <div className="bg-white rounded-lg shadow border">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Transazioni in Tempo Reale</h3>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600">Live</span>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
          {realtimeTransactions.map((transaction, index) => {
            const provider = paymentProviders.find(p => p.id === transaction.providerId);
            return (
              <div key={index} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{provider?.logo}</span>
                    <div>
                      <p className="font-medium text-gray-900">{provider?.name}</p>
                      <p className="text-sm text-gray-600">
                        {transaction.country} • {transaction.paymentMethod}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        {formatCurrency(transaction.amount)}
                      </p>
                      <p className="text-sm text-gray-600">
                        {formatTime(transaction.responseTime)}
                      </p>
                    </div>
                    
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      transaction.status === 'success' ? 'bg-green-100 text-green-600' :
                      transaction.status === 'failed' ? 'bg-red-100 text-red-600' :
                      'bg-yellow-100 text-yellow-600'
                    }`}>
                      {transaction.status}
                    </div>
                    
                    <p className="text-xs text-gray-500">
                      {new Date(transaction.timestamp).toLocaleTimeString('it-IT')}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PaymentProviderHub;