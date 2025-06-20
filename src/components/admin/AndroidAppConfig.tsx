import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Settings, 
  Shield, 
  Bell, 
  Palette, 
  Globe, 
  Smartphone,
  CheckCircle,
  AlertTriangle,
  Save,
  TabletSmartphone,
  Download, 
  Upload, 
  Key,
  RefreshCw,
  AlertCircle,
  Info
} from 'lucide-react';

const AndroidAppConfig: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const [config, setConfig] = useState({
    general: {
      appName: 'OpenGateway POS',
      version: '2.1.0',
      buildNumber: '210',
      packageName: 'com.opengateway.pos',
      minSdkVersion: '21',
      targetSdkVersion: '34'
    },
    security: {
      enableBiometric: true,
      enablePinLock: true,
      sessionTimeout: 30,
      enableEncryption: true,
      certificatePinning: true
    },
    notifications: {
      enablePushNotifications: true,
      enableTransactionAlerts: true,
      enableSystemAlerts: true,
      soundEnabled: true,
      vibrationEnabled: true
    },
    appearance: {
      theme: 'light',
      primaryColor: '#3B82F6',
      secondaryColor: '#6366F1',
      enableDarkMode: true,
      customLogo: ''
    },
    connectivity: {
      apiEndpoint: 'https://api.opengateway.ai',
      enableOfflineMode: true,
      syncInterval: 5,
      connectionTimeout: 30
    }
  });

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (error) {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const tabs = [
    { id: 'general', name: t('androidConfig.tabs.general'), icon: Settings },
    { id: 'security', name: t('androidConfig.tabs.security'), icon: Shield },
    { id: 'notifications', name: t('androidConfig.tabs.notifications'), icon: Bell },
    { id: 'appearance', name: t('androidConfig.tabs.appearance'), icon: Palette },
    { id: 'connectivity', name: t('androidConfig.tabs.connectivity'), icon: Globe }
  ];

  const renderGeneralTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('androidConfig.general.appName')}
          </label>
          <input
            type="text"
            value={config.general.appName}
            onChange={(e) => setConfig(prev => ({
              ...prev,
              general: { ...prev.general, appName: e.target.value }
            }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('androidConfig.general.version')}
          </label>
          <input
            type="text"
            value={config.general.version}
            onChange={(e) => setConfig(prev => ({
              ...prev,
              general: { ...prev.general, version: e.target.value }
            }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('androidConfig.general.buildNumber')}
          </label>
          <input
            type="text"
            value={config.general.buildNumber}
            onChange={(e) => setConfig(prev => ({
              ...prev,
              general: { ...prev.general, buildNumber: e.target.value }
            }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('androidConfig.general.packageName')}
          </label>
          <input
            type="text"
            value={config.general.packageName}
            onChange={(e) => setConfig(prev => ({
              ...prev,
              general: { ...prev.general, packageName: e.target.value }
            }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <Info className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h4 className="text-sm font-medium text-blue-800 mb-1">Informazioni Build</h4>
            <p className="text-sm text-blue-700">
              Le modifiche alla versione e al build number richiedono una nuova compilazione dell'applicazione.
              Assicurati di testare tutte le funzionalità prima del rilascio.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">
              {t('androidConfig.security.biometricAuth')}
            </label>
            <input
              type="checkbox"
              checked={config.security.enableBiometric}
              onChange={(e) => setConfig(prev => ({
                ...prev,
                security: { ...prev.security, enableBiometric: e.target.checked }
              }))}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">
              {t('androidConfig.security.pinLock')}
            </label>
            <input
              type="checkbox"
              checked={config.security.enablePinLock}
              onChange={(e) => setConfig(prev => ({
                ...prev,
                security: { ...prev.security, enablePinLock: e.target.checked }
              }))}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">
              {t('androidConfig.security.dataEncryption')}
            </label>
            <input
              type="checkbox"
              checked={config.security.enableEncryption}
              onChange={(e) => setConfig(prev => ({
                ...prev,
                security: { ...prev.security, enableEncryption: e.target.checked }
              }))}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('androidConfig.security.sessionTimeout')}
          </label>
          <input
            type="number"
            value={config.security.sessionTimeout}
            onChange={(e) => setConfig(prev => ({
              ...prev,
              security: { ...prev.security, sessionTimeout: parseInt(e.target.value) }
            }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="5"
            max="120"
          />
        </div>
      </div>
      
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-start">
          <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h4 className="text-sm font-medium text-red-800 mb-1">{t('androidConfig.security.criticalSecurity')}</h4>
            <p className="text-sm text-red-700">
              {t('androidConfig.security.securityWarning')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">
              {t('androidConfig.notifications.pushNotifications')}
            </label>
            <input
              type="checkbox"
              checked={config.notifications.enablePushNotifications}
              onChange={(e) => setConfig(prev => ({
                ...prev,
                notifications: { ...prev.notifications, enablePushNotifications: e.target.checked }
              }))}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">
              {t('androidConfig.notifications.transactionAlerts')}
            </label>
            <input
              type="checkbox"
              checked={config.notifications.enableTransactionAlerts}
              onChange={(e) => setConfig(prev => ({
                ...prev,
                notifications: { ...prev.notifications, enableTransactionAlerts: e.target.checked }
              }))}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">
              {t('androidConfig.notifications.sound')}
            </label>
            <input
              type="checkbox"
              checked={config.notifications.soundEnabled}
              onChange={(e) => setConfig(prev => ({
                ...prev,
                notifications: { ...prev.notifications, soundEnabled: e.target.checked }
              }))}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">
              {t('androidConfig.notifications.vibration')}
            </label>
            <input
              type="checkbox"
              checked={config.notifications.vibrationEnabled}
              onChange={(e) => setConfig(prev => ({
                ...prev,
                notifications: { ...prev.notifications, vibrationEnabled: e.target.checked }
              }))}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderAppearanceTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('androidConfig.appearance.theme')}
          </label>
          <select
            value={config.appearance.theme}
            onChange={(e) => setConfig(prev => ({
              ...prev,
              appearance: { ...prev.appearance, theme: e.target.value }
            }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="light">{t('androidConfig.appearance.light')}</option>
            <option value="dark">{t('androidConfig.appearance.dark')}</option>
            <option value="auto">{t('androidConfig.appearance.auto')}</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('androidConfig.appearance.primaryColor')}
          </label>
          <input
            type="color"
            value={config.appearance.primaryColor}
            onChange={(e) => setConfig(prev => ({
              ...prev,
              appearance: { ...prev.appearance, primaryColor: e.target.value }
            }))}
            className="w-full h-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );

  const renderConnectivityTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('androidConfig.connectivity.apiEndpoint')}
          </label>
          <input
            type="url"
            value={config.connectivity.apiEndpoint}
            onChange={(e) => setConfig(prev => ({
              ...prev,
              connectivity: { ...prev.connectivity, apiEndpoint: e.target.value }
            }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('androidConfig.connectivity.syncInterval')}
          </label>
          <input
            type="number"
            value={config.connectivity.syncInterval}
            onChange={(e) => setConfig(prev => ({
              ...prev,
              connectivity: { ...prev.connectivity, syncInterval: parseInt(e.target.value) }
            }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="1"
            max="60"
          />
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700">
          {t('androidConfig.connectivity.offlineMode')}
        </label>
        <input
          type="checkbox"
          checked={config.connectivity.enableOfflineMode}
          onChange={(e) => setConfig(prev => ({
            ...prev,
            connectivity: { ...prev.connectivity, enableOfflineMode: e.target.checked }
          }))}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general': return renderGeneralTab();
      case 'security': return renderSecurityTab();
      case 'notifications': return renderNotificationsTab();
      case 'appearance': return renderAppearanceTab();
      case 'connectivity': return renderConnectivityTab();
      default: return renderGeneralTab();
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Smartphone className="w-8 h-8 text-blue-600 mr-3" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{t('androidConfig.title')}</h1>
            <p className="text-gray-600">{t('androidConfig.description')}</p>
          </div>
        </div>
        
        {/* App Status Card */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
              <span className="text-sm font-medium text-gray-700">{t('androidConfig.appStatus')}: {t('androidConfig.active')}</span>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>{t('androidConfig.version')}: {config.general.version}</span>
              <span>{t('androidConfig.build')}: {config.general.buildNumber}</span>
              <span>{t('androidConfig.connectedDevices')}: 24</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {tab.name}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mb-8">
        {renderTabContent()}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-200">
        <div className="flex items-center space-x-4">
          <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <Download className="w-4 h-4 mr-2" />
            Esporta Configurazione
          </button>
          <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <Upload className="w-4 h-4 mr-2" />
            Importa Configurazione
          </button>
        </div>
        
        <div className="flex items-center space-x-3">
          {saveStatus === 'success' && (
            <div className="flex items-center text-green-600 text-sm">
              <CheckCircle className="w-4 h-4 mr-1" />
              Salvato con successo
            </div>
          )}
          {saveStatus === 'error' && (
            <div className="flex items-center text-red-600 text-sm">
              <AlertCircle className="w-4 h-4 mr-1" />
              Errore nel salvataggio
            </div>
          )}
          
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {isSaving ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            {isSaving ? t('androidConfig.actions.saving') : t('androidConfig.actions.saveConfig')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AndroidAppConfig;