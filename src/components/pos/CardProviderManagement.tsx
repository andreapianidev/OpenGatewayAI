import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CreditCard, TrendingUp, Shield, Zap, Globe, Users, DollarSign, BarChart3 } from 'lucide-react';

interface CardProvider {
  id: string;
  name: string;
  logo: string;
  type: 'visa' | 'mastercard' | 'amex' | 'discover';
  fees: {
    monthly: number;
    transaction: number;
    international: number;
  };
  features: string[];
  limits: {
    daily: number;
    monthly: number;
  };
  processingTime: string;
  coverage: string[];
  rating: number;
  activeCards: number;
  monthlyVolume: number;
  status: 'active' | 'pending' | 'inactive';
}

interface ProviderAnalytics {
  totalTransactions: number;
  successRate: number;
  averageProcessingTime: number;
  fraudRate: number;
  customerSatisfaction: number;
  monthlyGrowth: number;
}

const CardProviderManagement: React.FC = () => {
  const { t } = useTranslation();
  
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'analytics' | 'integration'>('overview');

  const providers: CardProvider[] = [
    {
      id: 'visa-europe',
      name: 'Visa Europe',
      logo: '💳',
      type: 'visa',
      fees: {
        monthly: 15.99,
        transaction: 0.025,
        international: 0.035
      },
      features: [
        'Real-time fraud detection',
        'Global acceptance',
        '24/7 support',
        'Mobile wallet integration',
        'Contactless payments'
      ],
      limits: {
        daily: 5000,
        monthly: 50000
      },
      processingTime: '1-2 business days',
      coverage: ['Europe', 'North America', 'Asia Pacific'],
      rating: 4.8,
      activeCards: 12500,
      monthlyVolume: 2850000,
      status: 'active'
    },
    {
      id: 'mastercard-worldwide',
      name: 'Mastercard Worldwide',
      logo: '🔴',
      type: 'mastercard',
      fees: {
        monthly: 18.50,
        transaction: 0.028,
        international: 0.032
      },
      features: [
        'AI-powered security',
        'Instant notifications',
        'Crypto integration',
        'Travel benefits',
        'Cashback rewards'
      ],
      limits: {
        daily: 6000,
        monthly: 60000
      },
      processingTime: '1-3 business days',
      coverage: ['Worldwide', '210+ countries'],
      rating: 4.7,
      activeCards: 8900,
      monthlyVolume: 1950000,
      status: 'active'
    },
    {
      id: 'amex-business',
      name: 'American Express Business',
      logo: '🟦',
      type: 'amex',
      fees: {
        monthly: 25.00,
        transaction: 0.035,
        international: 0.040
      },
      features: [
        'Premium business tools',
        'Expense management',
        'Concierge service',
        'Airport lounge access',
        'Extended warranty'
      ],
      limits: {
        daily: 10000,
        monthly: 100000
      },
      processingTime: '2-5 business days',
      coverage: ['Premium markets', 'Business focused'],
      rating: 4.6,
      activeCards: 3200,
      monthlyVolume: 1200000,
      status: 'active'
    },
    {
      id: 'discover-network',
      name: 'Discover Network',
      logo: '🟠',
      type: 'discover',
      fees: {
        monthly: 12.99,
        transaction: 0.022,
        international: 0.038
      },
      features: [
        'No foreign transaction fees',
        'Cashback matching',
        'Free credit score',
        'Freeze card feature',
        'Customer service awards'
      ],
      limits: {
        daily: 4000,
        monthly: 40000
      },
      processingTime: '1-2 business days',
      coverage: ['US focused', 'Growing international'],
      rating: 4.5,
      activeCards: 2100,
      monthlyVolume: 650000,
      status: 'pending'
    }
  ];

  const analytics: ProviderAnalytics = {
    totalTransactions: 125000,
    successRate: 99.2,
    averageProcessingTime: 1.8,
    fraudRate: 0.03,
    customerSatisfaction: 4.7,
    monthlyGrowth: 12.5
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'inactive': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'visa': return 'text-blue-600 bg-blue-100';
      case 'mastercard': return 'text-red-600 bg-red-100';
      case 'amex': return 'text-green-600 bg-green-100';
      case 'discover': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Provider Management</h2>
          <p className="text-gray-600">Gestisci i provider di carte di debito e le loro integrazioni</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Aggiungi Provider
        </button>
      </div>

      {/* Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Transazioni Totali</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalTransactions.toLocaleString()}</p>
            </div>
            <BarChart3 className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tasso di Successo</p>
              <p className="text-2xl font-bold text-green-600">{analytics.successRate}%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tempo Medio</p>
              <p className="text-2xl font-bold text-blue-600">{analytics.averageProcessingTime}s</p>
            </div>
            <Zap className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tasso Frodi</p>
              <p className="text-2xl font-bold text-red-600">{analytics.fraudRate}%</p>
            </div>
            <Shield className="h-8 w-8 text-red-600" />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Soddisfazione</p>
              <p className="text-2xl font-bold text-yellow-600">{analytics.customerSatisfaction}/5</p>
            </div>
            <Users className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Crescita Mensile</p>
              <p className="text-2xl font-bold text-green-600">+{analytics.monthlyGrowth}%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'overview', label: 'Panoramica', icon: Globe },
            { id: 'analytics', label: 'Analytics', icon: BarChart3 },
            { id: 'integration', label: 'Integrazione', icon: Zap }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {providers.map((provider) => (
            <div
              key={provider.id}
              className={`bg-white rounded-lg shadow border p-6 cursor-pointer transition-all hover:shadow-lg ${
                selectedProvider === provider.id ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setSelectedProvider(provider.id)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">{provider.logo}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">{provider.name}</h3>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(provider.type)}`}>
                      {provider.type.toUpperCase()}
                    </span>
                  </div>
                </div>
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(provider.status)}`}>
                  {provider.status}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Carte Attive</span>
                  <span className="font-semibold">{provider.activeCards.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Volume Mensile</span>
                  <span className="font-semibold">€{(provider.monthlyVolume / 1000000).toFixed(1)}M</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Rating</span>
                  <div className="flex items-center space-x-1">
                    <span className="font-semibold">{provider.rating}</span>
                    <span className="text-yellow-400">★</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Commissione</span>
                  <span className="font-semibold">{(provider.fees.transaction * 100).toFixed(2)}%</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-2">Caratteristiche principali:</p>
                <div className="flex flex-wrap gap-1">
                  {provider.features.slice(0, 3).map((feature, index) => (
                    <span key={index} className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                      {feature}
                    </span>
                  ))}
                  {provider.features.length > 3 && (
                    <span className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                      +{provider.features.length - 3} altro
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="space-y-6">
          {/* Performance Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow border">
              <h3 className="text-lg font-semibold mb-4">Volume Transazioni per Provider</h3>
              <div className="space-y-3">
                {providers.map((provider) => {
                  const percentage = (provider.monthlyVolume / providers.reduce((sum, p) => sum + p.monthlyVolume, 0)) * 100;
                  return (
                    <div key={provider.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span>{provider.logo}</span>
                        <span className="text-sm font-medium">{provider.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 w-12">{percentage.toFixed(1)}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border">
              <h3 className="text-lg font-semibold mb-4">Confronto Commissioni</h3>
              <div className="space-y-4">
                {providers.map((provider) => (
                  <div key={provider.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span>{provider.logo}</span>
                        <span className="font-medium">{provider.name}</span>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(provider.status)}`}>
                        {provider.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Mensile</p>
                        <p className="font-semibold">€{provider.fees.monthly}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Transazione</p>
                        <p className="font-semibold">{(provider.fees.transaction * 100).toFixed(2)}%</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Internazionale</p>
                        <p className="font-semibold">{(provider.fees.international * 100).toFixed(2)}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Insights */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
              <span className="text-purple-600">🤖</span>
              <span>AI Insights & Raccomandazioni</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-medium text-green-600 mb-2">✅ Ottimizzazione Costi</h4>
                <p className="text-sm text-gray-700">
                  Visa Europe offre il miglior rapporto qualità-prezzo per volumi elevati. 
                  Risparmio stimato: €2,400/mese.
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-medium text-blue-600 mb-2">📊 Trend di Mercato</h4>
                <p className="text-sm text-gray-700">
                  I pagamenti contactless sono cresciuti del 45% questo trimestre. 
                  Considera l'integrazione NFC avanzata.
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-medium text-orange-600 mb-2">⚠️ Rischio Frodi</h4>
                <p className="text-sm text-gray-700">
                  Rilevato aumento del 12% nelle transazioni sospette. 
                  Raccomandato upgrade sistema anti-frode.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'integration' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow border">
            <h3 className="text-lg font-semibold mb-4">Stato Integrazioni API</h3>
            <div className="space-y-4">
              {providers.map((provider) => (
                <div key={provider.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl">{provider.logo}</span>
                    <div>
                      <h4 className="font-medium">{provider.name}</h4>
                      <p className="text-sm text-gray-600">API v2.1 • Ultima sincronizzazione: 2 min fa</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${
                        provider.status === 'active' ? 'bg-green-500' : 
                        provider.status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}></div>
                      <span className="text-sm capitalize">{provider.status}</span>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      Configura
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border">
            <h3 className="text-lg font-semibold mb-4">Webhook Configuration</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Endpoint URL
                  </label>
                  <input 
                    type="url" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://api.yourapp.com/webhooks/cards"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Secret Key
                  </label>
                  <input 
                    type="password" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="••••••••••••••••"
                  />
                </div>
              </div>
              <div className="flex space-x-4">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  Test Webhook
                </button>
                <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50">
                  Salva Configurazione
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardProviderManagement;