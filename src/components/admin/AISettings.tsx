import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Brain, Server, Cloud, Key, Settings, TestTube, Save, RotateCcw, CheckCircle, XCircle, Loader } from 'lucide-react';

type AIProvider = 'deepseek' | 'openai' | 'mistral' | 'ollama' | 'anthropic';

interface ProviderConfig {
  name: string;
  icon: string;
  endpoint: string;
  models: string[];
  requiresApiKey: boolean;
  description: string;
}

const AISettings: React.FC = () => {
  const { t } = useTranslation();
  const [provider, setProvider] = useState<AIProvider>('deepseek');
  const [apiKey, setApiKey] = useState('');
  const [endpoint, setEndpoint] = useState('');
  const [model, setModel] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [lastTest, setLastTest] = useState<Date | null>(null);
  const [testResult, setTestResult] = useState<'success' | 'error' | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [ollamaHost, setOllamaHost] = useState('http://localhost:11434');
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(4000);
  const [timeoutValue, setTimeoutValue] = useState(30);

  const providers: Record<AIProvider, ProviderConfig> = {
    deepseek: {
      name: 'DeepSeek AI',
      icon: '🧠',
      endpoint: 'https://api.deepseek.com/v1',
      models: ['deepseek-chat', 'deepseek-coder', 'deepseek-math'],
      requiresApiKey: true,
      description: 'Modelli AI avanzati per analisi e coding'
    },
    openai: {
      name: 'OpenAI ChatGPT',
      icon: '🤖',
      endpoint: 'https://api.openai.com/v1',
      models: ['gpt-4', 'gpt-4-turbo', 'gpt-3.5-turbo', 'gpt-4o'],
      requiresApiKey: true,
      description: 'Modelli GPT di OpenAI per conversazioni e analisi'
    },
    mistral: {
      name: 'Mistral AI',
      icon: '🌪️',
      endpoint: 'https://api.mistral.ai/v1',
      models: ['mistral-large', 'mistral-medium', 'mistral-small', 'mistral-tiny'],
      requiresApiKey: true,
      description: 'Modelli AI europei ad alte prestazioni'
    },
    anthropic: {
      name: 'Anthropic Claude',
      icon: '🎭',
      endpoint: 'https://api.anthropic.com/v1',
      models: ['claude-3-opus', 'claude-3-sonnet', 'claude-3-haiku'],
      requiresApiKey: true,
      description: 'Modelli Claude per conversazioni sicure e utili'
    },
    ollama: {
      name: 'Ollama (Local)',
      icon: '🏠',
      endpoint: 'http://localhost:11434',
      models: ['llama2', 'codellama', 'mistral', 'neural-chat', 'starcode', 'vicuna'],
      requiresApiKey: false,
      description: 'Modelli AI locali tramite Ollama'
    }
  };

  // Update endpoint and model when provider changes
  React.useEffect(() => {
    const providerConfig = providers[provider];
    setEndpoint(provider === 'ollama' ? ollamaHost : providerConfig.endpoint);
    setModel(providerConfig.models[0]);
    setApiKey('');
    setIsConnected(false);
    setTestResult(null);
  }, [provider, ollamaHost]);

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
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">OpenPay AI Settings</h1>
            <p className="text-gray-600">
              Configura provider AI per analytics avanzate, fraud detection e insights intelligenti
            </p>
          </div>
        </div>
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

      {/* Provider Selection */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
            <Cloud className="w-5 h-5 text-blue-500" />
            <span>Selezione Provider AI</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {Object.entries(providers).map(([key, config]) => (
              <div
                key={key}
                onClick={() => setProvider(key as AIProvider)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
                  provider === key
                    ? 'border-blue-500 bg-blue-50 shadow-md'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-2xl">{config.icon}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">{config.name}</h3>
                    {key === 'ollama' && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        Local
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-600">{config.description}</p>
                {provider === key && (
                  <div className="mt-2 flex items-center space-x-1 text-blue-600">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">Selezionato</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Configuration Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
            <Settings className="w-5 h-5 text-gray-600" />
            <span>Configurazione {providers[provider].name}</span>
          </h2>
          
          <div className="space-y-6">
            {/* Enable AI Toggle */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  isEnabled ? 'bg-green-100' : 'bg-gray-100'
                }`}>
                  <Brain className={`w-5 h-5 ${
                    isEnabled ? 'text-green-600' : 'text-gray-400'
                  }`} />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-900">Abilita OpenPay AI</label>
                  <p className="text-sm text-gray-600">Attiva le funzionalità AI per il gateway</p>
                </div>
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

            {/* Ollama Host (only for Ollama) */}
            {provider === 'ollama' && (
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2 flex items-center space-x-2">
                  <Server className="w-4 h-4" />
                  <span>Ollama Host</span>
                </label>
                <input
                  type="url"
                  value={ollamaHost}
                  onChange={(e) => setOllamaHost(e.target.value)}
                  placeholder="http://localhost:11434"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={!isEnabled}
                />
                <p className="mt-1 text-sm text-gray-600">
                  Assicurati che Ollama sia in esecuzione localmente. <a href="https://ollama.ai" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Scarica Ollama</a>
                </p>
              </div>
            )}

            {/* API Key (not for Ollama) */}
            {providers[provider].requiresApiKey && (
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2 flex items-center space-x-2">
                  <Key className="w-4 h-4" />
                  <span>API Key {providers[provider].name} *</span>
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder={`${provider === 'openai' ? 'sk-' : provider === 'mistral' ? 'mistral-' : 'sk-'}xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={!isEnabled}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <Key className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
                <p className="mt-1 text-sm text-gray-600">
                  {provider === 'openai' && (
                    <>Ottieni la tua API key da <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">OpenAI Platform</a></>
                  )}
                  {provider === 'mistral' && (
                    <>Ottieni la tua API key da <a href="https://console.mistral.ai" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Mistral Console</a></>
                  )}
                  {provider === 'anthropic' && (
                    <>Ottieni la tua API key da <a href="https://console.anthropic.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Anthropic Console</a></>
                  )}
                  {provider === 'deepseek' && (
                    <>Ottieni la tua API key da <a href="https://platform.deepseek.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">DeepSeek Platform</a></>
                  )}
                </p>
              </div>
            )}

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
              <label className="block text-sm font-medium text-gray-900 mb-2 flex items-center space-x-2">
                <Brain className="w-4 h-4" />
                <span>Modello AI</span>
              </label>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={!isEnabled}
              >
                {providers[provider].models.map((modelName) => (
                  <option key={modelName} value={modelName}>
                    {modelName}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-sm text-gray-600">
                {provider === 'ollama' && 'Assicurati che il modello sia scaricato localmente con `ollama pull ' + model + '`'}
                {provider !== 'ollama' && 'Seleziona il modello più adatto alle tue esigenze'}
              </p>
            </div>

            {/* Advanced Settings */}
            <div className="border-t pt-6">
              <h3 className="text-md font-medium text-gray-900 mb-4 flex items-center space-x-2">
                <Settings className="w-4 h-4" />
                <span>Impostazioni Avanzate</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Temperature
                  </label>
                  <input
                    type="number"
                    value={temperature}
                    onChange={(e) => setTemperature(parseFloat(e.target.value))}
                    min={0}
                    max={2}
                    step={0.1}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={!isEnabled}
                  />
                  <p className="text-xs text-gray-500 mt-1">0 = deterministico, 2 = creativo</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Max Tokens
                  </label>
                  <input
                    type="number"
                    value={maxTokens}
                    onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                    min={100}
                    max={8000}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={!isEnabled}
                  />
                  <p className="text-xs text-gray-500 mt-1">Lunghezza massima risposta</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Timeout (secondi)
                  </label>
                  <input
                    type="number"
                    value={timeoutValue}
                     onChange={(e) => setTimeoutValue(parseInt(e.target.value))}
                    min={5}
                    max={120}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={!isEnabled}
                  />
                  <p className="text-xs text-gray-500 mt-1">Timeout richieste API</p>
                </div>
              </div>
            </div>

            {/* Test Connection */}
            <div className="border-t pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                    <TestTube className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-md font-medium text-gray-900">Test Connessione</h3>
                    <p className="text-sm text-gray-600">Verifica che la configurazione sia corretta</p>
                  </div>
                </div>
                <button
                  onClick={handleTestConnection}
                  disabled={!isEnabled || (providers[provider].requiresApiKey && !apiKey) || isLoading}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center space-x-2 transition-colors"
                >
                  {isLoading ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin" />
                      <span>Testing...</span>
                    </>
                  ) : (
                    <>
                      <TestTube className="w-4 h-4" />
                      <span>Testa Connessione</span>
                    </>
                  )}
                </button>
              </div>
              
              {testResult && (
                <div className={`mt-4 p-4 rounded-lg border ${
                  testResult === 'success' 
                    ? 'bg-green-50 border-green-200 text-green-800' 
                    : 'bg-red-50 border-red-200 text-red-800'
                }`}>
                  {testResult === 'success' ? (
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium">Connessione riuscita!</p>
                        <p className="text-sm">OpenPay AI è pronto per l'uso con {providers[provider].name}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-3">
                      <XCircle className="w-5 h-5 text-red-600" />
                      <div>
                        <p className="font-medium">Errore di connessione</p>
                        <p className="text-sm">
                          {provider === 'ollama' 
                            ? 'Verifica che Ollama sia in esecuzione e il modello sia disponibile'
                            : 'Verifica API key, endpoint e connessione internet'
                          }
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-6 border-t">
              <button
                onClick={handleReset}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center space-x-2 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset</span>
              </button>
              <button
                onClick={handleSave}
                disabled={!isEnabled || (providers[provider].requiresApiKey && !apiKey)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center space-x-2 transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>Salva Configurazione</span>
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