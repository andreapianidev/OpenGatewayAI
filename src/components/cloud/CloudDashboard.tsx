import React, { useState, useEffect } from 'react';
import { Cloud, Server, DollarSign, Shield, Activity, Settings, BarChart3, AlertTriangle, TrendingUp, Users } from 'lucide-react';
import CloudInfrastructureDashboard from './CloudInfrastructureDashboard';
import CloudPerformanceMonitoring from './CloudPerformanceMonitoring';
import CloudCostManagement from './CloudCostManagement';
import CloudSecurityCenter from './CloudSecurityCenter';

// Tipi per il dashboard cloud
interface CloudOverview {
  totalServices: number;
  activeServices: number;
  totalCost: number;
  monthlyCost: number;
  securityScore: number;
  complianceScore: number;
  criticalAlerts: number;
  performanceScore: number;
}

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  action: () => void;
  urgent?: boolean;
}

interface CloudProvider {
  name: string;
  status: 'healthy' | 'warning' | 'error';
  services: number;
  cost: number;
  uptime: number;
}

interface CloudDashboardProps {
  onNavigateToSection?: (section: string) => void;
}

const CloudDashboard: React.FC<CloudDashboardProps> = ({ onNavigateToSection }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'infrastructure' | 'performance' | 'costs' | 'security'>('overview');
  const [overview, setOverview] = useState<CloudOverview>({
    totalServices: 0,
    activeServices: 0,
    totalCost: 0,
    monthlyCost: 0,
    securityScore: 0,
    complianceScore: 0,
    criticalAlerts: 0,
    performanceScore: 0
  });
  const [providers, setProviders] = useState<CloudProvider[]>([]);
  const [quickActions, setQuickActions] = useState<QuickAction[]>([]);
  const [loading, setLoading] = useState(true);

  // Simulazione dati overview
  useEffect(() => {
    const generateOverview = (): CloudOverview => {
      return {
        totalServices: 47,
        activeServices: 42,
        totalCost: 8750.50,
        monthlyCost: 12500.00,
        securityScore: 87,
        complianceScore: 92,
        criticalAlerts: 3,
        performanceScore: 94
      };
    };

    const generateProviders = (): CloudProvider[] => {
      return [
        {
          name: 'Amazon Web Services',
          status: 'healthy',
          services: 18,
          cost: 4200.30,
          uptime: 99.9
        },
        {
          name: 'Microsoft Azure',
          status: 'warning',
          services: 15,
          cost: 2800.75,
          uptime: 99.7
        },
        {
          name: 'Google Cloud Platform',
          status: 'healthy',
          services: 10,
          cost: 1450.20,
          uptime: 99.8
        },
        {
          name: 'Digital Ocean',
          status: 'healthy',
          services: 4,
          cost: 299.25,
          uptime: 99.9
        }
      ];
    };

    const generateQuickActions = (): QuickAction[] => {
      return [
        {
          id: 'scale-services',
          title: 'Scala Servizi',
          description: 'Aumenta o diminuisci le risorse automaticamente',
          icon: <TrendingUp className="h-6 w-6" />,
          action: () => console.log('Scaling services'),
          urgent: false
        },
        {
          id: 'security-scan',
          title: 'Scansione Sicurezza',
          description: 'Avvia una scansione completa della sicurezza',
          icon: <Shield className="h-6 w-6" />,
          action: () => console.log('Starting security scan'),
          urgent: true
        },
        {
          id: 'cost-optimization',
          title: 'Ottimizza Costi',
          description: 'Analizza e ottimizza i costi cloud',
          icon: <DollarSign className="h-6 w-6" />,
          action: () => console.log('Optimizing costs'),
          urgent: false
        },
        {
          id: 'backup-data',
          title: 'Backup Dati',
          description: 'Avvia backup completo dei dati critici',
          icon: <Server className="h-6 w-6" />,
          action: () => console.log('Starting backup'),
          urgent: false
        }
      ];
    };

    setOverview(generateOverview());
    setProviders(generateProviders());
    setQuickActions(generateQuickActions());
    setLoading(false);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'error': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getProviderLogo = (name: string) => {
    switch (name) {
      case 'Amazon Web Services': return '🟠';
      case 'Microsoft Azure': return '🔵';
      case 'Google Cloud Platform': return '🔴';
      case 'Digital Ocean': return '🔷';
      default: return '☁️';
    }
  };

  if (loading) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Cloud className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Cloud Management Dashboard</h1>
              <p className="text-gray-600">Gestione unificata dell'infrastruttura multi-cloud</p>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            Sviluppato da Andrea Piani - andrea.piani@email.com
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'overview'
                ? 'bg-white text-blue-700 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Panoramica</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('infrastructure')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'infrastructure'
                ? 'bg-white text-blue-700 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Server className="h-4 w-4" />
              <span>Infrastruttura</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('performance')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'performance'
                ? 'bg-white text-blue-700 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Activity className="h-4 w-4" />
              <span>Performance</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('costs')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'costs'
                ? 'bg-white text-blue-700 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4" />
              <span>Costi</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'security'
                ? 'bg-white text-blue-700 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Sicurezza</span>
            </div>
          </button>
        </div>
      </div>

      {activeTab === 'overview' && (
        <>
          {/* Metriche principali */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-lg text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Servizi Totali</p>
                  <p className="text-3xl font-bold">{overview.totalServices}</p>
                  <p className="text-sm text-blue-200">{overview.activeServices} attivi</p>
                </div>
                <Server className="h-10 w-10 text-blue-200" />
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-lg text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Costo Mensile</p>
                  <p className="text-3xl font-bold">${overview.monthlyCost.toLocaleString()}</p>
                  <p className="text-sm text-green-200">Proiezione corrente</p>
                </div>
                <DollarSign className="h-10 w-10 text-green-200" />
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-lg text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Security Score</p>
                  <p className="text-3xl font-bold">{overview.securityScore}%</p>
                  <p className="text-sm text-purple-200">{overview.criticalAlerts} alert critici</p>
                </div>
                <Shield className="h-10 w-10 text-purple-200" />
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-lg text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">Performance</p>
                  <p className="text-3xl font-bold">{overview.performanceScore}%</p>
                  <p className="text-sm text-orange-200">Uptime medio</p>
                </div>
                <Activity className="h-10 w-10 text-orange-200" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Provider Status */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Stato Provider Cloud</h3>
              <div className="space-y-4">
                {providers.map((provider, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{getProviderLogo(provider.name)}</span>
                      <div>
                        <h4 className="font-medium text-gray-900">{provider.name}</h4>
                        <p className="text-sm text-gray-600">{provider.services} servizi attivi</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(provider.status)}`}>
                        {provider.status}
                      </span>
                      <p className="text-sm text-gray-600 mt-1">${provider.cost.toFixed(2)}/mese</p>
                      <p className="text-xs text-gray-500">{provider.uptime}% uptime</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Azioni Rapide</h3>
              <div className="grid grid-cols-2 gap-4">
                {quickActions.map((action) => (
                  <button
                    key={action.id}
                    onClick={action.action}
                    className={`p-4 rounded-lg border-2 border-dashed transition-colors hover:bg-gray-50 ${
                      action.urgent ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  >
                    <div className="flex flex-col items-center text-center space-y-2">
                      <div className={action.urgent ? 'text-red-600' : 'text-gray-600'}>
                        {action.icon}
                      </div>
                      <div>
                        <h4 className={`font-medium ${action.urgent ? 'text-red-900' : 'text-gray-900'}`}>
                          {action.title}
                        </h4>
                        <p className={`text-xs ${action.urgent ? 'text-red-600' : 'text-gray-600'}`}>
                          {action.description}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Attività Recenti</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <div className="flex-shrink-0">
                  <Server className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Nuovo servizio EC2 avviato</p>
                  <p className="text-xs text-gray-500">AWS - us-east-1 - 5 minuti fa</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                <div className="flex-shrink-0">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Alert di sicurezza risolto</p>
                  <p className="text-xs text-gray-500">Azure - Security Center - 15 minuti fa</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <div className="flex-shrink-0">
                  <DollarSign className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Ottimizzazione costi completata</p>
                  <p className="text-xs text-gray-500">Risparmio stimato: $450/mese - 30 minuti fa</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === 'infrastructure' && <CloudInfrastructureDashboard />}
      {activeTab === 'performance' && <CloudPerformanceMonitoring />}
      {activeTab === 'costs' && <CloudCostManagement />}
      {activeTab === 'security' && <CloudSecurityCenter />}
    </div>
  );
};

export default CloudDashboard;

// Sviluppato da Andrea Piani - andrea.piani@email.com