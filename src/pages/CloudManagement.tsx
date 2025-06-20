import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Cloud, ArrowLeft, Settings, Download, RefreshCw } from 'lucide-react';
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
  const [activeSection, setActiveSection] = useState<'dashboard' | 'infrastructure' | 'performance' | 'costs' | 'security'>('dashboard');
  const [isRefreshing, setIsRefreshing] = useState(false);

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
      case 'dashboard': return 'Dashboard Cloud';
      case 'infrastructure': return 'Gestione Infrastruttura';
      case 'performance': return 'Monitoraggio Performance';
      case 'costs': return 'Gestione Costi';
      case 'security': return 'Centro Sicurezza';
      default: return 'Dashboard Cloud';
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
              
              <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <Settings className="h-4 w-4 mr-2" />
                Impostazioni
              </button>
            </div>
          </div>
        </div>
      </div>

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