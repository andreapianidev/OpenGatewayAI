import React, { useState } from 'react';
import { Save, User, Building, CreditCard, Bell, Shield, Key, Code, Zap, BarChart3, Palette, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import DashboardAIWidget from '../ai/DashboardAIWidget';
import { DEFAULT_MERCHANT_URLS, WEBHOOKS } from '../../config/urls';

const AccountSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [demoMode, setDemoMode] = useState(true);
  const { t } = useTranslation();

  const merchantData = {
    businessName: 'Damascus Store',
    contactName: 'Ahmad Al-Rashid',
    email: 'merchant@example.com',
    phone: '+963 11 123 4567',
    address: 'Via Umayyad, 123',
    city: 'Damascus',
    postalCode: '12345',
    taxId: 'SY123456789',
    businessType: 'retail',
    website: DEFAULT_MERCHANT_URLS.WEBSITE
  };

  const bankingInfo = {
    bankName: 'Commercial Bank of Syria',
    accountNumber: '****1234',
    iban: 'SY21 0001 0000 0000 0000 1234',
    swiftCode: 'CBSYSYDA',
    accountHolder: 'Damascus Store LLC'
  };

  const notificationSettings = {
    emailTransactions: true,
    emailReports: true,
    smsAlerts: false,
    webhookNotifications: true
  };

  const apiSettings = {
    apiKey: 'sk_live_51H7...',
    webhookUrl: DEFAULT_MERCHANT_URLS.WEBHOOK,
    webhookSecret: 'whsec_1234...',
    rateLimitPerHour: 1000,
    enableSandbox: true
  };

  const automationSettings = {
    autoRefunds: false,
    smartRouting: true,
    fraudDetection: true,
    autoReports: true,
    inventorySync: false
  };

  const customizationSettings = {
    brandColor: '#6366f1',
    logoUrl: '/logo.png',
    customDomain: 'pay.damascusstore.sy',
    emailTemplate: 'modern',
    language: 'it'
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Impostazioni Account</h1>
          <p className="text-gray-500 mt-1">{t('merchant.manageAccount')}</p>
        </div>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center space-x-2">
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
              onClick={() => setActiveTab('profile')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'profile'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>Profilo Business</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('banking')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'banking'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <CreditCard className="w-5 h-5" />
                <span>Informazioni Bancarie</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'notifications'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Bell className="w-5 h-5" />
                <span>Notifiche</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'security'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>Sicurezza</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('api')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'api'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Code className="w-5 h-5" />
                <span>API & Webhook</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('automation')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'automation'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5" />
                <span>Automazioni</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('customization')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'customization'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Palette className="w-5 h-5" />
                <span>Personalizzazione</span>
              </div>
            </button>
          </nav>
        </div>

        <div className="p-6">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Informazioni Business</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nome Business</label>
                  <input
                    type="text"
                    value={merchantData.businessName}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nome Contatto</label>
                  <input
                    type="text"
                    value={merchantData.contactName}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={merchantData.email}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Telefono</label>
                  <input
                    type="tel"
                    value={merchantData.phone}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Indirizzo</label>
                  <input
                    type="text"
                    value={merchantData.address}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Città</label>
                  <input
                    type="text"
                    value={merchantData.city}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">CAP</label>
                  <input
                    type="text"
                    value={merchantData.postalCode}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Partita IVA</label>
                  <input
                    type="text"
                    value={merchantData.taxId}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tipo Business</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option value="retail">Retail</option>
                    <option value="restaurant">Ristorante</option>
                    <option value="services">Servizi</option>
                    <option value="ecommerce">E-commerce</option>
                    <option value="other">Altro</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sito Web</label>
                  <input
                    type="url"
                    value={merchantData.website}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Banking Tab */}
          {activeTab === 'banking' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Informazioni Bancarie</h3>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h4 className="text-sm font-medium text-blue-900 mb-2">Informazioni Importanti</h4>
                <p className="text-sm text-blue-700">
                  Le informazioni bancarie sono utilizzate per l'accredito dei pagamenti. 
                  Assicurati che i dati siano corretti per evitare ritardi nei pagamenti.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nome Banca</label>
                  <input
                    type="text"
                    value={bankingInfo.bankName}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Numero Conto</label>
                  <input
                    type="text"
                    value={bankingInfo.accountNumber}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">IBAN</label>
                  <input
                    type="text"
                    value={bankingInfo.iban}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Codice SWIFT</label>
                  <input
                    type="text"
                    value={bankingInfo.swiftCode}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Intestatario Conto</label>
                  <input
                    type="text"
                    value={bankingInfo.accountHolder}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-green-900">Conto Verificato</span>
                </div>
                <p className="text-sm text-green-700 mt-1">
                  Le tue informazioni bancarie sono state verificate e approvate.
                </p>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Preferenze Notifiche</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Notifiche Transazioni via Email</h4>
                    <p className="text-sm text-gray-500">Ricevi email per ogni transazione completata</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={notificationSettings.emailTransactions} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Report Settimanali via Email</h4>
                    <p className="text-sm text-gray-500">Ricevi un riepilogo settimanale delle attività</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={notificationSettings.emailReports} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Alert SMS</h4>
                    <p className="text-sm text-gray-500">Ricevi SMS per transazioni ad alto valore</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={notificationSettings.smsAlerts} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Webhook Notifications</h4>
                    <p className="text-sm text-gray-500">Invia notifiche al tuo sistema via webhook</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={notificationSettings.webhookNotifications} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Webhook URL</h4>
                <input
                  type="url"
                  placeholder={WEBHOOKS.BASE}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  URL dove ricevere le notifiche webhook per le transazioni
                </p>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Impostazioni Sicurezza</h3>
              
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-medium text-gray-900 mb-4 flex items-center">
                    <Key className="w-5 h-5 mr-2" />
                    Cambia Password
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Password Attuale</label>
                      <input
                        type="password"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div></div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{t('merchant.newPassword')}</label>
                      <input
                        type="password"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{t('merchant.confirmNewPassword')}</label>
                      <input
                        type="password"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                  <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200">
                    Aggiorna Password
                  </button>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-medium text-gray-900 mb-4">Autenticazione a Due Fattori</h4>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Aggiungi un livello extra di sicurezza al tuo account</p>
                      <p className="text-xs text-gray-500 mt-1">Stato: Non configurato</p>
                    </div>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200">
                      Configura 2FA
                    </button>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-medium text-gray-900 mb-4">Sessioni Attive</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">Sessione Corrente</p>
                        <p className="text-sm text-gray-500">Chrome su Windows • Damascus, Syria</p>
                        <p className="text-xs text-gray-400">Ultimo accesso: Ora</p>
                      </div>
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        Attiva
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">Mobile App</p>
                        <p className="text-sm text-gray-500">Android • Damascus, Syria</p>
                        <p className="text-xs text-gray-400">Ultimo accesso: 2 ore fa</p>
                      </div>
                      <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                        Termina
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* API & Webhook Tab */}
          {activeTab === 'api' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">API & Webhook</h3>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h4 className="text-sm font-medium text-blue-900 mb-2">Modalità Demo Attiva</h4>
                <p className="text-sm text-blue-700">
                  Stai visualizzando dati demo. Le modifiche non saranno salvate.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Chiave API Live
                  </label>
                  <div className="flex">
                    <input
                      type="password"
                      value={apiSettings.apiKey}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      readOnly
                    />
                    <button className="px-4 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-lg hover:bg-gray-200">
                      Mostra
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rate Limit (per ora)
                  </label>
                  <input
                    type="number"
                    value={apiSettings.rateLimitPerHour}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL Webhook
                  </label>
                  <input
                    type="url"
                    value={apiSettings.webhookUrl}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder={WEBHOOKS.BASE}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Webhook Secret
                  </label>
                  <div className="flex">
                    <input
                      type="password"
                      value={apiSettings.webhookSecret}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      readOnly
                    />
                    <button className="px-4 py-2 bg-indigo-600 text-white border border-indigo-600 rounded-r-lg hover:bg-indigo-700">
                      Rigenera
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ambiente Sandbox
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={apiSettings.enableSandbox}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-600">Abilita modalità test</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Eventi Webhook</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {['payment.succeeded', 'payment.failed', 'refund.created', 'dispute.created', 'subscription.updated', 'invoice.paid'].map((event) => (
                    <label key={event} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        defaultChecked={['payment.succeeded', 'payment.failed', 'refund.created'].includes(event)}
                      />
                      <span className="text-xs text-gray-600">{event}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Automation Tab */}
          {activeTab === 'automation' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Automazioni</h3>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <h4 className="text-sm font-medium text-green-900 mb-2">Automazioni Intelligenti</h4>
                <p className="text-sm text-green-700">
                  Configura regole automatiche per ottimizzare i tuoi pagamenti.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Rimborsi Automatici</h4>
                    <p className="text-sm text-gray-500">Elabora automaticamente rimborsi per transazioni fallite</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={automationSettings.autoRefunds} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Routing Intelligente</h4>
                    <p className="text-sm text-gray-500">Instrada automaticamente i pagamenti al processore ottimale</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={automationSettings.smartRouting} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Rilevamento Frodi</h4>
                    <p className="text-sm text-gray-500">Blocca automaticamente transazioni sospette</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={automationSettings.fraudDetection} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Report Automatici</h4>
                    <p className="text-sm text-gray-500">Genera e invia report settimanali via email</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={automationSettings.autoReports} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Sincronizzazione Inventario</h4>
                    <p className="text-sm text-gray-500">Aggiorna automaticamente l'inventario dopo ogni vendita</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={automationSettings.inventorySync} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Regole Avanzate</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Limite giornaliero per transazione</span>
                    <input
                      type="number"
                      defaultValue="5000"
                      className="w-24 px-2 py-1 text-sm border border-gray-300 rounded"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{t('merchant.fraudRiskThreshold')}</span>
                    <input
                      type="number"
                      defaultValue="75"
                      className="w-24 px-2 py-1 text-sm border border-gray-300 rounded"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Timeout webhook (secondi)</span>
                    <input
                      type="number"
                      defaultValue="30"
                      className="w-24 px-2 py-1 text-sm border border-gray-300 rounded"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Customization Tab */}
          {activeTab === 'customization' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Personalizzazione</h3>
              
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
                <h4 className="text-sm font-medium text-purple-900 mb-2">Personalizza la tua Esperienza</h4>
                <p className="text-sm text-purple-700">
                  Configura l'aspetto e il comportamento della tua interfaccia di pagamento.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Colore Brand
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={customizationSettings.brandColor}
                      className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={customizationSettings.brandColor}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Template Email
                  </label>
                  <select
                    value={customizationSettings.emailTemplate}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="modern">Moderno</option>
                    <option value="classic">Classico</option>
                    <option value="minimal">Minimale</option>
                    <option value="corporate">Corporate</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Logo URL
                  </label>
                  <input
                    type="url"
                    value={customizationSettings.logoUrl}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder={DEFAULT_MERCHANT_URLS.LOGO}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lingua Interfaccia
                  </label>
                  <select
                    value={customizationSettings.language}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="it">Italiano</option>
                    <option value="en">English</option>
                    <option value="fr">Français</option>
                    <option value="de">Deutsch</option>
                    <option value="es">Español</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dominio Personalizzato
                  </label>
                  <input
                    type="text"
                    value={customizationSettings.customDomain}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="pay.tuosito.com"
                  />
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Anteprima Checkout</h4>
                <div className="bg-white border border-gray-200 rounded-lg p-4 max-w-md mx-auto">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">DS</span>
                    </div>
                    <span className="font-medium text-gray-900">Damascus Store</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Prodotto Demo</span>
                      <span className="text-sm font-medium">€29.99</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Tasse</span>
                      <span className="text-sm font-medium">€6.60</span>
                    </div>
                    <hr />
                    <div className="flex justify-between font-medium">
                      <span>Totale</span>
                      <span>€36.59</span>
                    </div>
                    <button 
                      className="w-full py-2 rounded-lg text-white font-medium"
                      style={{ backgroundColor: customizationSettings.brandColor }}
                    >
                      Paga Ora
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;