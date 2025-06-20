import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Cloud, Settings, Bell, User, RefreshCw, Download, Key, Shield } from 'lucide-react';
import CloudDashboard from '../components/cloud/CloudDashboard';
import CloudInfrastructureDashboard from '../components/cloud/CloudInfrastructureDashboard';
import CloudPerformanceMonitoring from '../components/cloud/CloudPerformanceMonitoring';
import CloudCostManagement from '../components/cloud/CloudCostManagement';
import CloudSecurityCenter from '../components/cloud/CloudSecurityCenter';

interface CloudManagementProps {
  onBack?: () => void;
}

const CloudManagement: React.FC<CloudManagementProps> = ({ onBack }) => {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState<string>('dashboard');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showApiSettings, setShowApiSettings] = useState(false);
  const [apiTokens, setApiTokens] = useState<Record<string, { token: string; keywords: string; lastUpdated: string }>>({
    azure: {
      token: 'sk-azure-1234567890abcdef1234567890abcdef',
      keywords: 'cloud,azure,microsoft,compute,storage',
      lastUpdated: '2024-01-15'
    },
    aws: {
      token: 'AKIA1234567890ABCDEF',
      keywords: 'aws,amazon,ec2,s3,lambda,rds',
      lastUpdated: '2024-01-14'
    },
    googleCloud: {
      token: 'ya29.1234567890abcdef1234567890abcdef',
      keywords: 'gcp,google,cloud,compute,bigquery',
      lastUpdated: '2024-01-13'
    },
    stripe: {
      token: 'sk_live_1234567890abcdef1234567890abcdef',
      keywords: 'payment,stripe,gateway,processing',
      lastUpdated: '2024-01-12'
    },
    paypal: {
      token: 'A21AAFEjjjjjjjjjjjjjjjjjjjjjjjjjjjjj',
      keywords: 'paypal,payment,checkout,merchant',
      lastUpdated: '2024-01-11'
    },
    square: {
      token: 'sq0atp-1234567890abcdef1234567890ab',
      keywords: 'square,pos,payment,retail',
      lastUpdated: '2024-01-10'
    }
  });

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simula refresh dei dati
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsRefreshing(false);
  };

  const handleExportData = () => {
    // Simula export dei dati
    const data = {
      timestamp: new Date().toISOString(),
      section: activeSection,
      exportedBy: 'Andrea Piani - andrea.piani@email.com'
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cloud-data-${activeSection}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleNavigateToSection = (section: string) => {
    if (section === 'dashboard' || section === 'infrastructure' || section === 'performance' || section === 'costs' || section === 'security') {
      setActiveSection(section);
    }
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <CloudDashboard onNavigateToSection={handleNavigateToSection} />;
      case 'infrastructure':
        return <CloudInfrastructureDashboard />;
      case 'performance':
        return <CloudPerformanceMonitoring />;
      case 'costs':
        return <CloudCostManagement />;
      case 'security':
        return <CloudSecurityCenter />;
      default:
        return <CloudDashboard onNavigateToSection={handleNavigateToSection} />;
    }
  };

  const getSectionTitle = () => {
    switch (activeSection) {
      case 'dashboard': return t('ai.cloudManagementDashboard');
      case 'infrastructure': return 'Gestione Infrastruttura';
      case 'performance': return 'Monitoraggio Performance';
      case 'costs': return 'Gestione Costi';
      case 'security': return 'Centro Sicurezza';
      default: return t('ai.cloudManagementDashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              {onBack && (
                <button
                  onClick={onBack}
                  className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
              )}
              <div className="flex items-center space-x-3">
                <Cloud className="h-8 w-8 text-blue-600" />
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">{getSectionTitle()}</h1>
                  <p className="text-sm text-gray-500">Gestione Cloud Multi-Provider</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                {isRefreshing ? 'Aggiornamento...' : 'Aggiorna'}
              </button>
              
              <button
                onClick={handleExportData}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Download className="h-4 w-4 mr-2" />
                Esporta
              </button>
              
              <button 
                onClick={() => setShowApiSettings(!showApiSettings)}
                className={`inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  showApiSettings 
                    ? 'text-blue-700 bg-blue-50 border-blue-300' 
                    : 'text-gray-700 bg-white hover:bg-gray-50'
                }`}
              >
                <Settings className="h-4 w-4 mr-2" />
                Impostazioni API
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* API Settings Section */}
      {showApiSettings && (
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2 flex items-center space-x-2">
                <Key className="w-5 h-5" />
                <span>Configurazione Token API</span>
              </h2>
              <p className="text-gray-600">Gestisci i token API per i provider cloud e i gateway di pagamento</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {Object.entries(apiTokens).map(([provider, config]) => {
                const providerNames: Record<string, string> = {
                  azure: 'Microsoft Azure',
                  aws: 'Amazon Web Services',
                  googleCloud: 'Google Cloud Platform',
                  stripe: 'Stripe',
                  paypal: 'PayPal',
                  square: 'Square'
                };
                const providerIcons: Record<string, any> = {
                  azure: Cloud,
                  aws: Cloud,
                  googleCloud: Cloud,
                  stripe: Shield,
                  paypal: Shield,
                  square: Shield
                };
                const Icon = providerIcons[provider];
                return (
                  <div key={provider} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-4">
                      <Icon className="w-6 h-6 text-blue-600" />
                      <h3 className="font-semibold text-gray-900">{providerNames[provider]}</h3>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Token API
                        </label>
                        <div className="flex items-center space-x-2">
                          <input
                            type="password"
                            value={config.token}
                            onChange={(e) => setApiTokens(prev => ({
                              ...prev,
                              [provider]: { ...prev[provider], token: e.target.value }
                            }))}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Inserisci il token API"
                          />
                          <button className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                            Test
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Keywords di Targeting
                        </label>
                        <input
                          type="text"
                          value={config.keywords}
                          onChange={(e) => setApiTokens(prev => ({
                            ...prev,
                            [provider]: { ...prev[provider], keywords: e.target.value }
                          }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="payment,gateway,processing"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Separa le keywords con virgole per il targeting degli annunci
                        </p>
                      </div>
                      <div className="text-xs text-gray-500">
                        Ultimo aggiornamento: {config.lastUpdated}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  Salva Configurazione
                </button>
                <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                  Test Connessioni
                </button>
              </div>
              <div className="text-sm text-gray-500">
                Configurazione sincronizzata: {new Date().toLocaleDateString('it-IT')}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Breadcrumb */}
      {activeSection !== 'dashboard' && (
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-2 py-3 text-sm">
              <button
                onClick={() => setActiveSection('dashboard')}
                className="text-blue-600 hover:text-blue-800"
              >
                Dashboard
              </button>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900">{getSectionTitle()}</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderActiveSection()}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Cloud className="h-6 w-6 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">OpenGateway AI - Cloud Management</p>
                <p className="text-xs text-gray-500">Piattaforma di gestione cloud multi-provider</p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-sm text-gray-900">Sviluppato da Andrea Piani</p>
              <p className="text-xs text-gray-500">andrea.piani@email.com</p>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-lg font-semibold text-blue-600">AWS</p>
                <p className="text-xs text-gray-500">Amazon Web Services</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-blue-600">Azure</p>
                <p className="text-xs text-gray-500">Microsoft Azure</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-blue-600">GCP</p>
                <p className="text-xs text-gray-500">Google Cloud Platform</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-blue-600">DO</p>
                <p className="text-xs text-gray-500">Digital Ocean</p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-400">
              © 2024 OpenGateway AI. Tutti i diritti riservati. 
              Integrazione cloud simulata per scopi dimostrativi.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CloudManagement;

// Sviluppato da Andrea Piani - andrea.piani@email.com