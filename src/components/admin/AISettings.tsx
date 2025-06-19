import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const AISettings: React.FC = () => {
  const { t } = useTranslation();
  const [apiKey, setApiKey] = useState('');
  const [endpoint, setEndpoint] = useState('https://api.deepseek.com/v1');
  const [model, setModel] = useState('deepseek-chat');
  const [isEnabled, setIsEnabled] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [lastTest, setLastTest] = useState<Date | null>(null);
  const [testResult, setTestResult] = useState<'success' | 'error' | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTestConnection = async () => {
    setIsLoading(true);
    
    // Simulazione test connessione
    setTimeout(() => {
      const success = Math.random() > 0.3; // 70% di successo simulato
      setTestResult(success ? 'success' : 'error');
      setIsConnected(success);
      setLastTest(new Date());
      setIsLoading(false);
    }, 2000);
  };

  const handleSave = () => {
    // Simulazione salvataggio configurazione
    alert('Configurazione AI salvata con successo!');
  };

  const handleReset = () => {
    setApiKey('');
    setEndpoint('https://api.deepseek.com/v1');
    setModel('deepseek-chat');
    setIsEnabled(false);
    setIsConnected(false);
    setTestResult(null);
    setLastTest(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Configurazione AI DeepSeek</h1>
        <p className="text-gray-600">
          Configura l'integrazione con DeepSeek AI per abilitare funzionalità avanzate di analisi e raccomandazioni.
        </p>
      </div>

      {/* Status Card */}
      <div className="bg-white rounded-lg shadow-sm border mb-6">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Stato AI</h2>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              isConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {isConnected ? '🟢 Connesso' : '🔴 Disconnesso'}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🤖</span>
                <div>
                  <p className="text-sm font-medium text-blue-900">AI Assistant</p>
                  <p className="text-xs text-blue-700">{isEnabled ? 'Attivo' : 'Inattivo'}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">📊</span>
                <div>
                  <p className="text-sm font-medium text-purple-900">Analytics AI</p>
                  <p className="text-xs text-purple-700">{isConnected ? 'Operativo' : 'Non disponibile'}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🛡️</span>
                <div>
                  <p className="text-sm font-medium text-green-900">Fraud Detection</p>
                  <p className="text-xs text-green-700">{isConnected ? 'Attivo' : 'Disabilitato'}</p>
                </div>
              </div>
            </div>
          </div>
          
          {lastTest && (
            <div className="mt-4 text-sm text-gray-600">
              Ultimo test: {lastTest.toLocaleString('it-IT')} - 
              <span className={testResult === 'success' ? 'text-green-600' : 'text-red-600'}>
                {testResult === 'success' ? 'Successo' : 'Errore'}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Configuration Form */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Configurazione API</h2>
          
          <div className="space-y-6">
            {/* Enable AI Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-900">Abilita AI</label>
                <p className="text-sm text-gray-600">Attiva le funzionalità AI per il gateway</p>
              </div>
              <button
                onClick={() => setIsEnabled(!isEnabled)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isEnabled ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* API Key */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                API Key DeepSeek *
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={!isEnabled}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <span className="text-2xl">🔑</span>
                </div>
              </div>
              <p className="mt-1 text-sm text-gray-600">
                Ottieni la tua API key da <a href="https://platform.deepseek.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">platform.deepseek.com</a>
              </p>
            </div>

            {/* Endpoint */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Endpoint API
              </label>
              <input
                type="url"
                value={endpoint}
                onChange={(e) => setEndpoint(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={!isEnabled}
              />
            </div>

            {/* Model Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Modello AI
              </label>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={!isEnabled}
              >
                <option value="deepseek-chat">DeepSeek Chat</option>
                <option value="deepseek-coder">DeepSeek Coder</option>
                <option value="deepseek-math">DeepSeek Math</option>
              </select>
            </div>

            {/* Advanced Settings */}
            <div className="border-t pt-6">
              <h3 className="text-md font-medium text-gray-900 mb-4">Impostazioni Avanzate</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Timeout (secondi)
                  </label>
                  <input
                    type="number"
                    defaultValue={30}
                    min={5}
                    max={120}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={!isEnabled}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Max Tokens
                  </label>
                  <input
                    type="number"
                    defaultValue={4000}
                    min={100}
                    max={8000}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={!isEnabled}
                  />
                </div>
              </div>
            </div>

            {/* Test Connection */}
            <div className="border-t pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-md font-medium text-gray-900">Test Connessione</h3>
                  <p className="text-sm text-gray-600">Verifica che la configurazione sia corretta</p>
                </div>
                <button
                  onClick={handleTestConnection}
                  disabled={!isEnabled || !apiKey || isLoading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Testing...</span>
                    </>
                  ) : (
                    <>
                      <span>🔍</span>
                      <span>Testa</span>
                    </>
                  )}
                </button>
              </div>
              
              {testResult && (
                <div className={`mt-3 p-3 rounded-md ${
                  testResult === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                }`}>
                  {testResult === 'success' ? (
                    <div className="flex items-center space-x-2">
                      <span>✅</span>
                      <span>Connessione riuscita! AI pronto per l'uso.</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <span>❌</span>
                      <span>Errore di connessione. Verifica API key e endpoint.</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-6 border-t">
              <button
                onClick={handleReset}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Reset
              </button>
              <button
                onClick={handleSave}
                disabled={!isEnabled || !apiKey}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Salva Configurazione
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Info */}
      <div className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">🚀 Funzionalità AI Disponibili</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <span className="text-lg">🧠</span>
              <div>
                <p className="font-medium text-gray-900">Analisi Intelligente</p>
                <p className="text-sm text-gray-600">Insights automatici su performance e trend</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-lg">🛡️</span>
              <div>
                <p className="font-medium text-gray-900">Rilevamento Frodi</p>
                <p className="text-sm text-gray-600">Protezione avanzata con ML</p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <span className="text-lg">📈</span>
              <div>
                <p className="font-medium text-gray-900">Ottimizzazione Automatica</p>
                <p className="text-sm text-gray-600">Suggerimenti per migliorare conversion</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-lg">🎯</span>
              <div>
                <p className="font-medium text-gray-900">Routing Intelligente</p>
                <p className="text-sm text-gray-600">Instradamento ottimale delle transazioni</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AISettings;