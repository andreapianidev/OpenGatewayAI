import React, { useState, memo } from 'react';
import { Save, Shield, Database, Bell, Globe, Key, Server, BarChart3, Zap, Monitor } from 'lucide-react';
import DashboardAIWidget from '../ai/DashboardAIWidget';
import { API_ENDPOINTS, WEBHOOKS } from '../../config/urls';

const SystemSettings: React.FC = memo(() => {
  const [activeTab, setActiveTab] = useState('security');
  const [systemHealth, setSystemHealth] = useState({
    cpu: 45,
    memory: 62,
    disk: 78,
    network: 95
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    sessionTimeout: 30,
    passwordPolicy: 'strong',
    ipWhitelist: true,
    auditLogging: true,
    encryptionLevel: 'AES-256'
  });

  const [systemSettings, setSystemSettings] = useState({
    maintenanceMode: false,
    backupFrequency: 'daily',
    logRetention: 30,
    maxConcurrentUsers: 1000,
    apiRateLimit: 1000,
    systemTimezone: 'Europe/Rome'
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailAlerts: true,
    smsAlerts: false,
    webhookNotifications: true,
    alertThresholds: {
      failedTransactions: 5,
      systemErrors: 3,
      highVolume: 1000
    }
  });

  const [integrationSettings, setIntegrationSettings] = useState({
    stripeEnabled: true,
    paypalEnabled: true,
    squareEnabled: false,
    adyenEnabled: false,
    apiEndpoint: API_ENDPOINTS.MAIN,
    merchantId: 'MERCHANT_123',
    apiKey: '****',
    timeout: 30,
    sdkVersion: '2.1.0'
  });

  const [analyticsSettings, setAnalyticsSettings] = useState({
    enableTracking: true,
    dataRetention: 365,
    anonymizeData: true,
    shareAnalytics: false,
    customEvents: true,
    reportFrequency: 'weekly'
  });

  const [performanceSettings, setPerformanceSettings] = useState({
    cacheEnabled: true,
    compressionEnabled: true,
    cdnEnabled: true,
    loadBalancing: true,
    autoScaling: false
  });

  const [maintenanceSettings, setMaintenanceSettings] = useState({
    scheduledMaintenance: false,
    maintenanceWindow: '02:00-04:00',
    autoBackup: true,
    backupFrequency: 'daily',
    monitoringEnabled: true
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Impostazioni Sistema</h1>
          <p className="text-gray-500 mt-1">Configurazione sicurezza e parametri sistema</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2">
          <Save className="w-5 h-5" />
          <span>Salva Modifiche</span>
        </button>
      </div>

      {/* AI Widget */}
      <DashboardAIWidget />

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('security')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'security'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>Sicurezza</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('system')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'system'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Server className="w-5 h-5" />
                <span>Sistema</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'notifications'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Bell className="w-5 h-5" />
                <span>Notifiche</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('integration')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'integration'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Globe className="w-5 h-5" />
                <span>Integrazioni</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'analytics'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5" />
                <span>Analytics</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('performance')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'performance'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5" />
                <span>Performance</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('maintenance')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'maintenance'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Monitor className="w-5 h-5" />
                <span>Manutenzione</span>
              </div>
            </button>
          </nav>
        </div>

        <div className="p-6">
          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Configurazione Sicurezza</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Autenticazione a Due Fattori</h4>
                      <p className="text-sm text-gray-500">Richiede 2FA per tutti gli admin</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={securitySettings.twoFactorAuth} 
                        onChange={(e) => setSecuritySettings({...securitySettings, twoFactorAuth: e.target.checked})}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Timeout Sessione</h4>
                    <select 
                      value={securitySettings.sessionTimeout}
                      onChange={(e) => setSecuritySettings({...securitySettings, sessionTimeout: parseInt(e.target.value)})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="15">15 minuti</option>
                      <option value="30">30 minuti</option>
                      <option value="60">1 ora</option>
                      <option value="120">2 ore</option>
                    </select>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Policy Password</h4>
                    <select 
                      value={securitySettings.passwordPolicy}
                      onChange={(e) => setSecuritySettings({...securitySettings, passwordPolicy: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="basic">Base (8 caratteri)</option>
                      <option value="strong">Forte (12 caratteri, simboli)</option>
                      <option value="enterprise">Enterprise (16 caratteri, complessa)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Whitelist IP</h4>
                      <p className="text-sm text-gray-500">Limita accesso a IP autorizzati</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={securitySettings.ipWhitelist} 
                        onChange={(e) => setSecuritySettings({...securitySettings, ipWhitelist: e.target.checked})}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Audit Logging</h4>
                      <p className="text-sm text-gray-500">Registra tutte le azioni admin</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={securitySettings.auditLogging} 
                        onChange={(e) => setSecuritySettings({...securitySettings, auditLogging: e.target.checked})}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Livello Crittografia</h4>
                    <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="AES-128">AES-128</option>
                      <option value="AES-256" selected>AES-256</option>
                      <option value="RSA-2048">RSA-2048</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-red-900 mb-2">Zona Critica</h4>
                <p className="text-sm text-red-700 mb-3">
                  Le modifiche alle impostazioni di sicurezza richiedono conferma dell'amministratore principale.
                </p>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm">
                  Richiedi Autorizzazione
                </button>
              </div>
            </div>
          )}

          {/* System Tab */}
          {activeTab === 'system' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Configurazione Sistema</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Modalità Manutenzione</h4>
                      <p className="text-sm text-gray-500">Disabilita accesso merchant</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={systemSettings.maintenanceMode} 
                        onChange={(e) => setSystemSettings({...systemSettings, maintenanceMode: e.target.checked})}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Frequenza Backup</h4>
                    <select 
                      value={systemSettings.backupFrequency}
                      onChange={(e) => setSystemSettings({...systemSettings, backupFrequency: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="hourly">Ogni ora</option>
                      <option value="daily">Giornaliero</option>
                      <option value="weekly">Settimanale</option>
                    </select>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Ritenzione Log (giorni)</h4>
                    <input
                      type="number"
                      value={systemSettings.logRetention}
                      onChange={(e) => setSystemSettings({...systemSettings, logRetention: parseInt(e.target.value)})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Utenti Concorrenti Max</h4>
                    <input
                      type="number"
                      value={systemSettings.maxConcurrentUsers}
                      onChange={(e) => setSystemSettings({...systemSettings, maxConcurrentUsers: parseInt(e.target.value)})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Rate Limit API (req/min)</h4>
                    <input
                      type="number"
                      value={systemSettings.apiRateLimit}
                      onChange={(e) => setSystemSettings({...systemSettings, apiRateLimit: parseInt(e.target.value)})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Fuso Orario Sistema</h4>
                    <select 
                        value={systemSettings.systemTimezone}
                        onChange={(e) => setSystemSettings({...systemSettings, systemTimezone: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                      <option value="Asia/Damascus">Asia/Damascus (GMT+3)</option>
                      <option value="UTC">UTC (GMT+0)</option>
                      <option value="Europe/Rome">Europe/Rome (GMT+1)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-blue-900 mb-2">Stato Sistema</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <p className="text-sm text-blue-700">CPU</p>
                    <p className="text-lg font-bold text-blue-900">23%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-blue-700">RAM</p>
                    <p className="text-lg font-bold text-blue-900">45%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-blue-700">Disco</p>
                    <p className="text-lg font-bold text-blue-900">67%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-blue-700">Uptime</p>
                    <p className="text-lg font-bold text-blue-900">99.9%</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Configurazione Notifiche</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Alert Email</h4>
                      <p className="text-sm text-gray-500">Notifiche via email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={notificationSettings.emailAlerts} 
                        onChange={(e) => setNotificationSettings({...notificationSettings, emailAlerts: e.target.checked})}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Alert SMS</h4>
                      <p className="text-sm text-gray-500">Notifiche via SMS</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={notificationSettings.smsAlerts} 
                        onChange={(e) => setNotificationSettings({...notificationSettings, smsAlerts: e.target.checked})}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Webhook</h4>
                      <p className="text-sm text-gray-500">Notifiche via webhook</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={notificationSettings.webhookNotifications} 
                        onChange={(e) => setNotificationSettings({...notificationSettings, webhookNotifications: e.target.checked})}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Soglia Transazioni Fallite</h4>
                    <input
                      type="number"
                      value={notificationSettings.alertThresholds.failedTransactions}
                      onChange={(e) => setNotificationSettings({
                        ...notificationSettings,
                        alertThresholds: {
                          ...notificationSettings.alertThresholds,
                          failedTransactions: parseInt(e.target.value)
                        }
                      })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">Numero di transazioni fallite consecutive</p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Soglia Errori Sistema</h4>
                    <input
                      type="number"
                      value={notificationSettings.alertThresholds.systemErrors}
                      onChange={(e) => setNotificationSettings({
                        ...notificationSettings,
                        alertThresholds: {
                          ...notificationSettings.alertThresholds,
                          systemErrors: parseInt(e.target.value)
                        }
                      })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">Numero di errori sistema per minuto</p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Soglia Alto Volume</h4>
                    <input
                      type="number"
                      value={notificationSettings.alertThresholds.highVolume}
                      onChange={(e) => setNotificationSettings({
                        ...notificationSettings,
                        alertThresholds: {
                          ...notificationSettings.alertThresholds,
                          highVolume: parseInt(e.target.value)
                        }
                      })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">Transazioni per minuto</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Integration Tab */}
          {activeTab === 'integration' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Configurazione Integrazioni</h3>
              
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">AI-Powered Payment Processor</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Endpoint API</label>
                      <input
                        type="url"
                        value={integrationSettings.apiEndpoint}
                        onChange={(e) => setIntegrationSettings({...integrationSettings, apiEndpoint: e.target.value})}
                        placeholder={API_ENDPOINTS.PROCESSOR}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Merchant ID</label>
                      <input
                        type="text"
                        value={integrationSettings.merchantId}
                        onChange={(e) => setIntegrationSettings({...integrationSettings, merchantId: e.target.value})}
                        placeholder="SYR_MERCHANT_001"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">API Key</label>
                      <input
                        type="password"
                        value={integrationSettings.apiKey}
                        onChange={(e) => setIntegrationSettings({...integrationSettings, apiKey: e.target.value})}
                        placeholder="••••••••••••••••"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Timeout (secondi)</label>
                      <input
                        type="number"
                        value={integrationSettings.timeout}
                        onChange={(e) => setIntegrationSettings({...integrationSettings, timeout: parseInt(e.target.value)})}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-700">Connessione attiva - Ultimo test: 2 min fa</span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Terminali POS Android</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">SDK Version</label>
                      <select 
                        value={integrationSettings.sdkVersion}
                        onChange={(e) => setIntegrationSettings({...integrationSettings, sdkVersion: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="PAX SDK v3.2.1">PAX SDK v3.2.1</option>
                        <option value="Sunmi SDK v2.8.0">Sunmi SDK v2.8.0</option>
                        <option value="Telpo SDK v1.9.5">Telpo SDK v1.9.5</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Certificato EMV</label>
                      <input
                        type="file"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-600">Dispositivi connessi: 23 terminali attivi</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Webhook Endpoints</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">Transaction Success</p>
                        <p className="text-sm text-gray-500">{WEBHOOKS.SUCCESS}</p>
                      </div>
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Attivo</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">Transaction Failed</p>
                        <p className="text-sm text-gray-500">{WEBHOOKS.FAILED}</p>
                      </div>
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Attivo</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">Refund Processed</p>
                        <p className="text-sm text-gray-500">{WEBHOOKS.REFUND}</p>
                      </div>
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">Test</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-center">
                  <BarChart3 className="w-5 h-5 text-blue-600 mr-2" />
                  <div>
                    <h4 className="text-sm font-medium text-blue-800">Analytics e Monitoraggio</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      Configura la raccolta e l'analisi dei dati del sistema.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Tracciamento Eventi</h4>
                    <p className="text-sm text-gray-500">Monitora tutte le transazioni e gli eventi del sistema</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={analyticsSettings.enableTracking} 
                      onChange={(e) => setAnalyticsSettings({...analyticsSettings, enableTracking: e.target.checked})}
                      className="sr-only peer" 
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Anonimizzazione Dati</h4>
                    <p className="text-sm text-gray-500">Proteggi la privacy degli utenti anonimizzando i dati sensibili</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={analyticsSettings.anonymizeData} 
                      onChange={(e) => setAnalyticsSettings({...analyticsSettings, anonymizeData: e.target.checked})}
                      className="sr-only peer" 
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Eventi Personalizzati</h4>
                    <p className="text-sm text-gray-500">Abilita il tracciamento di eventi business specifici</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={analyticsSettings.customEvents} 
                      onChange={(e) => setAnalyticsSettings({...analyticsSettings, customEvents: e.target.checked})}
                      className="sr-only peer" 
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Condivisione Analytics</h4>
                    <p className="text-sm text-gray-500">Condividi dati aggregati con partner terzi</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={analyticsSettings.shareAnalytics} 
                      onChange={(e) => setAnalyticsSettings({...analyticsSettings, shareAnalytics: e.target.checked})}
                      className="sr-only peer" 
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Configurazione Avanzata</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ritenzione Dati (giorni)
                    </label>
                    <input
                      type="number"
                      value={analyticsSettings.dataRetention}
                      onChange={(e) => setAnalyticsSettings({...analyticsSettings, dataRetention: parseInt(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Frequenza Report
                    </label>
                    <select 
                      value={analyticsSettings.reportFrequency}
                      onChange={(e) => setAnalyticsSettings({...analyticsSettings, reportFrequency: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="daily">Giornaliero</option>
                      <option value="weekly">Settimanale</option>
                      <option value="monthly">Mensile</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Metriche in Tempo Reale</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">1,247</div>
                    <div className="text-xs text-gray-500">Eventi/ora</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">98.5%</div>
                    <div className="text-xs text-gray-500">Uptime</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">156ms</div>
                    <div className="text-xs text-gray-500">Latenza Media</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">2.1GB</div>
                    <div className="text-xs text-gray-500">Dati/giorno</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Performance Tab */}
          {activeTab === 'performance' && (
            <div className="space-y-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <div className="flex items-center">
                  <Zap className="w-5 h-5 text-yellow-600 mr-2" />
                  <div>
                    <h4 className="text-sm font-medium text-yellow-800">Ottimizzazione Performance</h4>
                    <p className="text-sm text-yellow-700 mt-1">
                      Configura le impostazioni per massimizzare le prestazioni del sistema.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-gray-900">Stato Sistema</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">CPU</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{width: `${systemHealth.cpu}%`}}></div>
                        </div>
                        <span className="text-sm font-medium">{systemHealth.cpu}%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Memoria</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{width: `${systemHealth.memory}%`}}></div>
                        </div>
                        <span className="text-sm font-medium">{systemHealth.memory}%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Disco</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-orange-600 h-2 rounded-full" style={{width: `${systemHealth.disk}%`}}></div>
                        </div>
                        <span className="text-sm font-medium">{systemHealth.disk}%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Rete</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-purple-600 h-2 rounded-full" style={{width: `${systemHealth.network}%`}}></div>
                        </div>
                        <span className="text-sm font-medium">{systemHealth.network}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-gray-900">Ottimizzazioni</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                      <span className="text-sm text-gray-700">Cache Abilitata</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={performanceSettings.cacheEnabled} 
                          onChange={(e) => setPerformanceSettings({...performanceSettings, cacheEnabled: e.target.checked})}
                          className="sr-only peer" 
                        />
                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-yellow-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                      <span className="text-sm text-gray-700">Compressione</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={performanceSettings.compressionEnabled} 
                          onChange={(e) => setPerformanceSettings({...performanceSettings, compressionEnabled: e.target.checked})}
                          className="sr-only peer" 
                        />
                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-yellow-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                      <span className="text-sm text-gray-700">CDN</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={performanceSettings.cdnEnabled} 
                          onChange={(e) => setPerformanceSettings({...performanceSettings, cdnEnabled: e.target.checked})}
                          className="sr-only peer" 
                        />
                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-yellow-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                      <span className="text-sm text-gray-700">Load Balancing</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={performanceSettings.loadBalancing} 
                          onChange={(e) => setPerformanceSettings({...performanceSettings, loadBalancing: e.target.checked})}
                          className="sr-only peer" 
                        />
                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-yellow-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                      <span className="text-sm text-gray-700">Auto Scaling</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={performanceSettings.autoScaling} 
                          onChange={(e) => setPerformanceSettings({...performanceSettings, autoScaling: e.target.checked})}
                          className="sr-only peer" 
                        />
                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-yellow-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Metriche Performance</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">1.2s</div>
                    <div className="text-xs text-gray-500">Tempo Risposta</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">99.9%</div>
                    <div className="text-xs text-gray-500">Disponibilità</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">2.5k</div>
                    <div className="text-xs text-gray-500">Req/min</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">45ms</div>
                    <div className="text-xs text-gray-500">Latenza DB</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Maintenance Tab */}
          {activeTab === 'maintenance' && (
            <div className="space-y-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <div className="flex items-center">
                  <Monitor className="w-5 h-5 text-red-600 mr-2" />
                  <div>
                    <h4 className="text-sm font-medium text-red-800">Manutenzione Sistema</h4>
                    <p className="text-sm text-red-700 mt-1">
                      Gestisci backup, aggiornamenti e monitoraggio del sistema.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-gray-900">Backup e Ripristino</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                      <span className="text-sm text-gray-700">Backup Automatico</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={maintenanceSettings.autoBackup} 
                          onChange={(e) => setMaintenanceSettings({...maintenanceSettings, autoBackup: e.target.checked})}
                          className="sr-only peer" 
                        />
                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-red-600"></div>
                      </label>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Frequenza Backup
                      </label>
                      <select 
                        value={maintenanceSettings.backupFrequency}
                        onChange={(e) => setMaintenanceSettings({...maintenanceSettings, backupFrequency: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        <option value="hourly">Ogni ora</option>
                        <option value="daily">Giornaliero</option>
                        <option value="weekly">Settimanale</option>
                        <option value="monthly">Mensile</option>
                      </select>
                    </div>
                    <button className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
                      Esegui Backup Manuale
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-gray-900">Manutenzione Programmata</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                      <span className="text-sm text-gray-700">Manutenzione Attiva</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={maintenanceSettings.scheduledMaintenance} 
                          onChange={(e) => setMaintenanceSettings({...maintenanceSettings, scheduledMaintenance: e.target.checked})}
                          className="sr-only peer" 
                        />
                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-red-600"></div>
                      </label>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Finestra Manutenzione
                      </label>
                      <input
                        type="text"
                        value={maintenanceSettings.maintenanceWindow}
                        onChange={(e) => setMaintenanceSettings({...maintenanceSettings, maintenanceWindow: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="02:00-04:00"
                      />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                      <span className="text-sm text-gray-700">Monitoraggio</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={maintenanceSettings.monitoringEnabled} 
                          onChange={(e) => setMaintenanceSettings({...maintenanceSettings, monitoringEnabled: e.target.checked})}
                          className="sr-only peer" 
                        />
                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-red-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Stato Servizi</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">Database</span>
                    </div>
                    <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">Online</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">API Gateway</span>
                    </div>
                    <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">Online</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">Cache Redis</span>
                    </div>
                    <span className="text-xs text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full">Degraded</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">Load Balancer</span>
                    </div>
                    <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">Online</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Log Sistema</h4>
                <div className="bg-black text-green-400 p-3 rounded-md font-mono text-xs max-h-32 overflow-y-auto">
                  <div>[2024-01-15 14:30:25] INFO: Sistema avviato correttamente</div>
                  <div>[2024-01-15 14:30:26] INFO: Database connesso</div>
                  <div>[2024-01-15 14:30:27] INFO: Cache inizializzata</div>
                  <div>[2024-01-15 14:30:28] WARN: Utilizzo memoria al 78%</div>
                  <div>[2024-01-15 14:30:29] INFO: Backup completato</div>
                  <div>[2024-01-15 14:30:30] INFO: 1247 transazioni elaborate</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

SystemSettings.displayName = 'SystemSettings';

export default SystemSettings;