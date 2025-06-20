import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Settings, Shield, Bell, Globe, Database, Key, Users, Mail, Save, RefreshCw, Zap, Link, Smartphone, CreditCard, Webhook, Code, CheckCircle, AlertCircle, Clock, BarChart3 } from 'lucide-react';

interface SettingsSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
}

const AdminSettings: React.FC = () => {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState('general');
  const [settings, setSettings] = useState({
    general: {
      siteName: 'OpenGateway AI',
      siteUrl: 'https://opengatewayai.com',
      adminEmail: 'admin@opengatewayai.com',
      timezone: 'Europe/Rome',
      language: 'it',
      maintenanceMode: false
    },
    security: {
      twoFactorAuth: true,
      sessionTimeout: 30,
      maxLoginAttempts: 5,
      passwordExpiry: 90,
      ipWhitelist: '',
      sslRequired: true
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      fraudAlerts: true,
      systemAlerts: true,
      transactionAlerts: false
    },
    api: {
      rateLimit: 1000,
      apiVersion: 'v1',
      webhookUrl: '',
      apiKey: '••••••••••••••••',
      enableLogging: true,
      logLevel: 'info'
    },
    integrations: {
      stripe: {
        enabled: true,
        publicKey: 'pk_test_••••••••••••••••',
        secretKey: 'sk_test_••••••••••••••••',
        webhookSecret: 'whsec_••••••••••••••••',
        status: 'connected'
      },
      paypal: {
        enabled: false,
        clientId: '',
        clientSecret: '',
        sandbox: true,
        status: 'disconnected'
      },
      square: {
        enabled: true,
        applicationId: 'sq0idp-••••••••••••••••',
        accessToken: 'EAAAl••••••••••••••',
        locationId: 'L••••••••••••••',
        status: 'connected'
      },
      adyen: {
        enabled: false,
        merchantAccount: '',
        apiKey: '',
        clientKey: '',
        environment: 'test',
        status: 'disconnected'
      },
      sms: {
        provider: 'twilio',
        enabled: true,
        accountSid: 'AC••••••••••••••••',
        authToken: '••••••••••••••••',
        fromNumber: '+1234567890',
        status: 'connected'
      },
      email: {
        provider: 'sendgrid',
        enabled: true,
        apiKey: 'SG.••••••••••••••••',
        fromEmail: 'noreply@opengatewayai.com',
        fromName: 'OpenGateway AI',
        status: 'connected'
      },
      analytics: {
        googleAnalytics: {
          enabled: true,
          trackingId: 'GA-••••••••••',
          status: 'connected'
        },
        mixpanel: {
          enabled: false,
          projectToken: '',
          status: 'disconnected'
        }
      }
    },
    payment: {
      defaultCurrency: 'EUR',
      commissionRate: 2.5,
      minTransactionAmount: 1.00,
      maxTransactionAmount: 10000.00,
      autoSettlement: true,
      settlementDelay: 24
    }
  });

  const sections: SettingsSection[] = [
    {
      id: 'general',
      title: 'Impostazioni Generali',
      icon: <Settings className="w-5 h-5" />,
      description: 'Configurazioni base del sistema'
    },
    {
      id: 'security',
      title: 'Sicurezza',
      icon: <Shield className="w-5 h-5" />,
      description: 'Impostazioni di sicurezza e autenticazione'
    },
    {
      id: 'notifications',
      title: 'Notifiche',
      icon: <Bell className="w-5 h-5" />,
      description: 'Gestione notifiche e alert'
    },
    {
      id: 'api',
      title: 'API & Webhook',
      icon: <Database className="w-5 h-5" />,
      description: 'Configurazioni API e webhook'
    },
    {
      id: 'integrations',
      title: 'Integrazioni',
      icon: <Zap className="w-5 h-5" />,
      description: 'Gestione integrazioni di terze parti'
    },
    {
      id: 'payment',
      title: 'Pagamenti',
      icon: <Key className="w-5 h-5" />,
      description: 'Impostazioni gateway di pagamento'
    }
  ];

  const handleSave = () => {
    // Simulate save operation
    console.log('Settings saved:', settings);
    alert('Impostazioni salvate con successo!');
  };

  const handleReset = () => {
    if (confirm('Sei sicuro di voler ripristinare le impostazioni predefinite?')) {
      // Reset to default values
      console.log('Settings reset to defaults');
    }
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nome Sito</label>
          <input
            type="text"
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={settings.general.siteName}
            onChange={(e) => setSettings(prev => ({
              ...prev,
              general: { ...prev.general, siteName: e.target.value }
            }))}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">URL Sito</label>
          <input
            type="url"
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={settings.general.siteUrl}
            onChange={(e) => setSettings(prev => ({
              ...prev,
              general: { ...prev.general, siteUrl: e.target.value }
            }))}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Amministratore</label>
          <input
            type="email"
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={settings.general.adminEmail}
            onChange={(e) => setSettings(prev => ({
              ...prev,
              general: { ...prev.general, adminEmail: e.target.value }
            }))}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Fuso Orario</label>
          <select
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={settings.general.timezone}
            onChange={(e) => setSettings(prev => ({
              ...prev,
              general: { ...prev.general, timezone: e.target.value }
            }))}
          >
            <option value="Europe/Rome">Europa/Roma</option>
            <option value="Europe/London">Europa/Londra</option>
            <option value="America/New_York">America/New York</option>
            <option value="Asia/Tokyo">Asia/Tokyo</option>
          </select>
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          id="maintenance"
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          checked={settings.general.maintenanceMode}
          onChange={(e) => setSettings(prev => ({
            ...prev,
            general: { ...prev.general, maintenanceMode: e.target.checked }
          }))}
        />
        <label htmlFor="maintenance" className="text-sm font-medium text-gray-700">
          Modalità Manutenzione
        </label>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Timeout Sessione (minuti)</label>
          <input
            type="number"
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={settings.security.sessionTimeout}
            onChange={(e) => setSettings(prev => ({
              ...prev,
              security: { ...prev.security, sessionTimeout: parseInt(e.target.value) }
            }))}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Max Tentativi Login</label>
          <input
            type="number"
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={settings.security.maxLoginAttempts}
            onChange={(e) => setSettings(prev => ({
              ...prev,
              security: { ...prev.security, maxLoginAttempts: parseInt(e.target.value) }
            }))}
          />
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="2fa"
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            checked={settings.security.twoFactorAuth}
            onChange={(e) => setSettings(prev => ({
              ...prev,
              security: { ...prev.security, twoFactorAuth: e.target.checked }
            }))}
          />
          <label htmlFor="2fa" className="text-sm font-medium text-gray-700">
            Autenticazione a Due Fattori
          </label>
        </div>
        
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="ssl"
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            checked={settings.security.sslRequired}
            onChange={(e) => setSettings(prev => ({
              ...prev,
              security: { ...prev.security, sslRequired: e.target.checked }
            }))}
          />
          <label htmlFor="ssl" className="text-sm font-medium text-gray-700">
            Richiedi SSL
          </label>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-4">
      {Object.entries({
        emailNotifications: 'Notifiche Email',
        smsNotifications: 'Notifiche SMS',
        pushNotifications: 'Notifiche Push',
        fraudAlerts: 'Alert Frodi',
        systemAlerts: 'Alert Sistema',
        transactionAlerts: 'Alert Transazioni'
      }).map(([key, label]) => (
        <div key={key} className="flex items-center space-x-3">
          <input
            type="checkbox"
            id={key}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            checked={settings.notifications[key as keyof typeof settings.notifications] as boolean}
            onChange={(e) => setSettings(prev => ({
              ...prev,
              notifications: { ...prev.notifications, [key]: e.target.checked }
            }))}
          />
          <label htmlFor={key} className="text-sm font-medium text-gray-700">
            {label}
          </label>
        </div>
      ))}
    </div>
  );

  const renderApiSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Rate Limit (req/ora)</label>
          <input
            type="number"
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={settings.api.rateLimit}
            onChange={(e) => setSettings(prev => ({
              ...prev,
              api: { ...prev.api, rateLimit: parseInt(e.target.value) }
            }))}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Versione API</label>
          <select
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={settings.api.apiVersion}
            onChange={(e) => setSettings(prev => ({
              ...prev,
              api: { ...prev.api, apiVersion: e.target.value }
            }))}
          >
            <option value="v1">v1</option>
            <option value="v2">v2</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Webhook URL</label>
          <input
            type="url"
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={settings.api.webhookUrl}
            onChange={(e) => setSettings(prev => ({
              ...prev,
              api: { ...prev.api, webhookUrl: e.target.value }
            }))}
            placeholder="https://your-webhook-url.com/webhook"
          />
        </div>
      </div>
    </div>
  );

  const renderPaymentSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Valuta Predefinita</label>
          <select
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={settings.payment.defaultCurrency}
            onChange={(e) => setSettings(prev => ({
              ...prev,
              payment: { ...prev.payment, defaultCurrency: e.target.value }
            }))}
          >
            <option value="EUR">EUR - Euro</option>
            <option value="USD">USD - Dollaro</option>
            <option value="GBP">GBP - Sterlina</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tasso Commissione (%)</label>
          <input
            type="number"
            step="0.1"
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={settings.payment.commissionRate}
            onChange={(e) => setSettings(prev => ({
              ...prev,
              payment: { ...prev.payment, commissionRate: parseFloat(e.target.value) }
            }))}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Importo Min Transazione</label>
          <input
            type="number"
            step="0.01"
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={settings.payment.minTransactionAmount}
            onChange={(e) => setSettings(prev => ({
              ...prev,
              payment: { ...prev.payment, minTransactionAmount: parseFloat(e.target.value) }
            }))}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Importo Max Transazione</label>
          <input
            type="number"
            step="0.01"
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={settings.payment.maxTransactionAmount}
            onChange={(e) => setSettings(prev => ({
              ...prev,
              payment: { ...prev.payment, maxTransactionAmount: parseFloat(e.target.value) }
            }))}
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          id="autoSettlement"
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          checked={settings.payment.autoSettlement}
          onChange={(e) => setSettings(prev => ({
            ...prev,
            payment: { ...prev.payment, autoSettlement: e.target.checked }
          }))}
        />
        <label htmlFor="autoSettlement" className="text-sm font-medium text-gray-700">
          Liquidazione Automatica
        </label>
      </div>
    </div>
  );

  const renderIntegrationsSettings = () => {
    const getStatusIcon = (status: string) => {
      switch (status) {
        case 'connected': return <CheckCircle className="w-4 h-4 text-green-500" />;
        case 'disconnected': return <AlertCircle className="w-4 h-4 text-red-500" />;
        case 'pending': return <Clock className="w-4 h-4 text-yellow-500" />;
        default: return <AlertCircle className="w-4 h-4 text-gray-500" />;
      }
    };

    const getStatusText = (status: string) => {
      switch (status) {
        case 'connected': return 'Connesso';
        case 'disconnected': return 'Disconnesso';
        case 'pending': return 'In attesa';
        default: return 'Sconosciuto';
      }
    };

    return (
      <div className="space-y-8">
        {/* Payment Gateways */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <CreditCard className="w-5 h-5 mr-2" />
            Gateway di Pagamento
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Stripe */}
            <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Stripe</h4>
                    <div className="flex items-center text-sm">
                      {getStatusIcon(settings.integrations.stripe.status)}
                      <span className="ml-1 text-gray-600">{getStatusText(settings.integrations.stripe.status)}</span>
                    </div>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={settings.integrations.stripe.enabled}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      integrations: {
                        ...prev.integrations,
                        stripe: { ...prev.integrations.stripe, enabled: e.target.checked }
                      }
                    }))}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Public Key</label>
                  <input
                    type="text"
                    className="w-full text-xs border rounded px-2 py-1 bg-gray-50"
                    value={settings.integrations.stripe.publicKey}
                    readOnly
                  />
                </div>
                <button className="w-full bg-blue-600 text-white text-sm py-2 rounded hover:bg-blue-700 transition-colors">
                  Configura Stripe
                </button>
              </div>
            </div>

            {/* PayPal */}
            <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                    <CreditCard className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">PayPal</h4>
                    <div className="flex items-center text-sm">
                      {getStatusIcon(settings.integrations.paypal.status)}
                      <span className="ml-1 text-gray-600">{getStatusText(settings.integrations.paypal.status)}</span>
                    </div>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={settings.integrations.paypal.enabled}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      integrations: {
                        ...prev.integrations,
                        paypal: { ...prev.integrations.paypal, enabled: e.target.checked }
                      }
                    }))}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <button className="w-full bg-yellow-600 text-white text-sm py-2 rounded hover:bg-yellow-700 transition-colors">
                Connetti PayPal
              </button>
            </div>

            {/* Square */}
            <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <Smartphone className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Square</h4>
                    <div className="flex items-center text-sm">
                      {getStatusIcon(settings.integrations.square.status)}
                      <span className="ml-1 text-gray-600">{getStatusText(settings.integrations.square.status)}</span>
                    </div>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={settings.integrations.square.enabled}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      integrations: {
                        ...prev.integrations,
                        square: { ...prev.integrations.square, enabled: e.target.checked }
                      }
                    }))}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <button className="w-full bg-green-600 text-white text-sm py-2 rounded hover:bg-green-700 transition-colors">
                Gestisci Square
              </button>
            </div>

            {/* Adyen */}
            <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                    <CreditCard className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Adyen</h4>
                    <div className="flex items-center text-sm">
                      {getStatusIcon(settings.integrations.adyen.status)}
                      <span className="ml-1 text-gray-600">{getStatusText(settings.integrations.adyen.status)}</span>
                    </div>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={settings.integrations.adyen.enabled}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      integrations: {
                        ...prev.integrations,
                        adyen: { ...prev.integrations.adyen, enabled: e.target.checked }
                      }
                    }))}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <button className="w-full bg-purple-600 text-white text-sm py-2 rounded hover:bg-purple-700 transition-colors">
                Configura Adyen
              </button>
            </div>
          </div>
        </div>

        {/* Communication Services */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Mail className="w-5 h-5 mr-2" />
            Servizi di Comunicazione
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* SMS Service */}
            <div className="border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <Smartphone className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">SMS (Twilio)</h4>
                    <div className="flex items-center text-sm">
                      {getStatusIcon(settings.integrations.sms.status)}
                      <span className="ml-1 text-gray-600">{getStatusText(settings.integrations.sms.status)}</span>
                    </div>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={settings.integrations.sms.enabled}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      integrations: {
                        ...prev.integrations,
                        sms: { ...prev.integrations.sms, enabled: e.target.checked }
                      }
                    }))}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <div className="text-sm text-gray-600 mb-3">
                Numero: {settings.integrations.sms.fromNumber}
              </div>
              <button className="w-full bg-blue-600 text-white text-sm py-2 rounded hover:bg-blue-700 transition-colors">
                Configura SMS
              </button>
            </div>

            {/* Email Service */}
            <div className="border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <Mail className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Email (SendGrid)</h4>
                    <div className="flex items-center text-sm">
                      {getStatusIcon(settings.integrations.email.status)}
                      <span className="ml-1 text-gray-600">{getStatusText(settings.integrations.email.status)}</span>
                    </div>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={settings.integrations.email.enabled}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      integrations: {
                        ...prev.integrations,
                        email: { ...prev.integrations.email, enabled: e.target.checked }
                      }
                    }))}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <div className="text-sm text-gray-600 mb-3">
                Da: {settings.integrations.email.fromEmail}
              </div>
              <button className="w-full bg-green-600 text-white text-sm py-2 rounded hover:bg-green-700 transition-colors">
                Configura Email
              </button>
            </div>
          </div>
        </div>

        {/* Analytics */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2" />
            Analytics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Google Analytics */}
            <div className="border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                    <BarChart3 className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Google Analytics</h4>
                    <div className="flex items-center text-sm">
                      {getStatusIcon(settings.integrations.analytics.googleAnalytics.status)}
                      <span className="ml-1 text-gray-600">{getStatusText(settings.integrations.analytics.googleAnalytics.status)}</span>
                    </div>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={settings.integrations.analytics.googleAnalytics.enabled}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      integrations: {
                        ...prev.integrations,
                        analytics: {
                          ...prev.integrations.analytics,
                          googleAnalytics: { ...prev.integrations.analytics.googleAnalytics, enabled: e.target.checked }
                        }
                      }
                    }))}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <div className="text-sm text-gray-600 mb-3">
                ID: {settings.integrations.analytics.googleAnalytics.trackingId}
              </div>
              <button className="w-full bg-orange-600 text-white text-sm py-2 rounded hover:bg-orange-700 transition-colors">
                Configura GA
              </button>
            </div>

            {/* Mixpanel */}
            <div className="border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                    <BarChart3 className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Mixpanel</h4>
                    <div className="flex items-center text-sm">
                      {getStatusIcon(settings.integrations.analytics.mixpanel.status)}
                      <span className="ml-1 text-gray-600">{getStatusText(settings.integrations.analytics.mixpanel.status)}</span>
                    </div>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={settings.integrations.analytics.mixpanel.enabled}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      integrations: {
                        ...prev.integrations,
                        analytics: {
                          ...prev.integrations.analytics,
                          mixpanel: { ...prev.integrations.analytics.mixpanel, enabled: e.target.checked }
                        }
                      }
                    }))}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <button className="w-full bg-purple-600 text-white text-sm py-2 rounded hover:bg-purple-700 transition-colors">
                Connetti Mixpanel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'general': return renderGeneralSettings();
      case 'security': return renderSecuritySettings();
      case 'notifications': return renderNotificationSettings();
      case 'api': return renderApiSettings();
      case 'integrations': return renderIntegrationsSettings();
      case 'payment': return renderPaymentSettings();
      default: return renderGeneralSettings();
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Impostazioni Amministratore</h1>
        <p className="text-gray-600">Gestisci le configurazioni del sistema</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-1/4">
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <nav className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    activeSection === section.id
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {section.icon}
                    <div>
                      <div className="font-medium">{section.title}</div>
                      <div className="text-xs text-gray-500">{section.description}</div>
                    </div>
                  </div>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="lg:w-3/4">
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold text-gray-900">
                {sections.find(s => s.id === activeSection)?.title}
              </h2>
            </div>
            
            <div className="p-6">
              {renderContent()}
            </div>
            
            <div className="p-6 border-t bg-gray-50 flex justify-between">
              <button
                onClick={handleReset}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Ripristina</span>
              </button>
              
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Salva Modifiche</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;