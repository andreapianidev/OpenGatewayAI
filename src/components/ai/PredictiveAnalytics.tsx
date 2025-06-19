import React, { useState, useEffect, useCallback, memo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, ComposedChart, ScatterChart, Scatter, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { TrendingUp, Brain, Target, Calendar, DollarSign, Users, ShoppingCart, AlertCircle, CheckCircle, Clock, Zap, BarChart3, PieChart as PieChartIcon, Activity, Settings, Download, RefreshCw, Play, Pause, Layers, GitBranch, Sliders, TrendingDown, Eye, Filter, Share2 } from 'lucide-react';

interface PredictionModel {
  id: string;
  name: string;
  accuracy: number;
  status: 'active' | 'training' | 'inactive';
  lastUpdated: string;
  predictions: number;
  type: 'revenue' | 'fraud' | 'churn' | 'demand';
}

interface Forecast {
  period: string;
  actual?: number;
  predicted: number;
  confidence: number;
  trend: 'up' | 'down' | 'stable';
}

interface RiskFactor {
  factor: string;
  impact: 'high' | 'medium' | 'low';
  probability: number;
  description: string;
}

interface Insight {
  id: string;
  title: string;
  description: string;
  impact: 'positive' | 'negative' | 'neutral';
  confidence: number;
  category: 'revenue' | 'risk' | 'opportunity' | 'trend';
  actionable: boolean;
}

interface WhatIfScenario {
  id: string;
  name: string;
  description: string;
  parameters: {
    marketGrowth: number;
    competitionLevel: number;
    economicFactor: number;
    seasonality: number;
  };
  results: {
    revenueImpact: number;
    riskLevel: number;
    probability: number;
  };
}

interface EnsembleModel {
  id: string;
  name: string;
  models: string[];
  weights: number[];
  performance: {
    accuracy: number;
    precision: number;
    recall: number;
    f1Score: number;
  };
  status: 'active' | 'training' | 'evaluating';
}

interface SensitivityAnalysis {
  parameter: string;
  impact: number;
  confidence: number;
  direction: 'positive' | 'negative';
  elasticity: number;
}

interface ModelComparison {
  modelName: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  trainingTime: number;
  predictionSpeed: number;
}

const PredictiveAnalytics: React.FC = memo(() => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d');
  const [selectedModel, setSelectedModel] = useState('revenue');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('forecasts');
  const [showAdvancedControls, setShowAdvancedControls] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [isRunningSimulation, setIsRunningSimulation] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [selectedEnsemble, setSelectedEnsemble] = useState('ensemble-001');
  const [showModelComparison, setShowModelComparison] = useState(false);
  const [sensitivityData, setSensitivityData] = useState<SensitivityAnalysis[]>([]);
  const [modelComparisons, setModelComparisons] = useState<ModelComparison[]>([]);
  const [whatIfScenarios, setWhatIfScenarios] = useState<WhatIfScenario[]>([]);
  const [ensembleModels, setEnsembleModels] = useState<EnsembleModel[]>([]);

  // Simulate data loading
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [selectedTimeframe, selectedModel]);

  const predictionModels: PredictionModel[] = [
    {
      id: 'rev-001',
      name: 'Revenue Forecasting',
      accuracy: 94.2,
      status: 'active',
      lastUpdated: '2 ore fa',
      predictions: 1247,
      type: 'revenue'
    },
    {
      id: 'fraud-001',
      name: 'Fraud Detection ML',
      accuracy: 98.7,
      status: 'active',
      lastUpdated: '15 min fa',
      predictions: 3421,
      type: 'fraud'
    },
    {
      id: 'churn-001',
      name: 'Customer Churn',
      accuracy: 87.3,
      status: 'training',
      lastUpdated: '1 giorno fa',
      predictions: 892,
      type: 'churn'
    },
    {
      id: 'demand-001',
      name: 'Demand Prediction',
      accuracy: 91.8,
      status: 'active',
      lastUpdated: '30 min fa',
      predictions: 2156,
      type: 'demand'
    }
  ];

  const revenueForecasts: Forecast[] = [
    { period: 'Gen 2024', actual: 125000, predicted: 128000, confidence: 92, trend: 'up' },
    { period: 'Feb 2024', actual: 132000, predicted: 135000, confidence: 89, trend: 'up' },
    { period: 'Mar 2024', actual: 145000, predicted: 142000, confidence: 91, trend: 'up' },
    { period: 'Apr 2024', actual: 138000, predicted: 140000, confidence: 88, trend: 'stable' },
    { period: 'Mag 2024', predicted: 155000, confidence: 85, trend: 'up' },
    { period: 'Giu 2024', predicted: 162000, confidence: 82, trend: 'up' },
    { period: 'Lug 2024', predicted: 158000, confidence: 79, trend: 'down' },
    { period: 'Ago 2024', predicted: 165000, confidence: 76, trend: 'up' }
  ];

  const customerChurnData = [
    { segment: 'Premium', churnRate: 2.1, predicted: 2.8, risk: 'low' },
    { segment: 'Business', churnRate: 4.3, predicted: 5.1, risk: 'medium' },
    { segment: 'Standard', churnRate: 8.7, predicted: 9.2, risk: 'medium' },
    { segment: 'Basic', churnRate: 12.4, predicted: 14.1, risk: 'high' }
  ];

  const riskFactors: RiskFactor[] = [
    {
      factor: 'Volatilità del mercato',
      impact: 'high',
      probability: 68,
      description: 'Fluttuazioni economiche potrebbero influenzare i volumi'
    },
    {
      factor: 'Competizione crescente',
      impact: 'medium',
      probability: 45,
      description: 'Nuovi competitor nel settore fintech'
    },
    {
      factor: 'Cambiamenti normativi',
      impact: 'high',
      probability: 32,
      description: 'Possibili nuove regolamentazioni PCI DSS'
    },
    {
      factor: 'Stagionalità Q4',
      impact: 'medium',
      probability: 78,
      description: 'Aumento previsto delle transazioni nel periodo natalizio'
    }
  ];

  const aiInsights: Insight[] = [
    {
      id: 'ins-001',
      title: 'Crescita Revenue Q2',
      description: 'Il modello prevede una crescita del 23% nel Q2 2024 guidata dall\'e-commerce',
      impact: 'positive',
      confidence: 89,
      category: 'revenue',
      actionable: true
    },
    {
      id: 'ins-002',
      title: 'Rischio Churn Segmento Basic',
      description: 'Aumento del 15% del churn previsto per clienti Basic nei prossimi 3 mesi',
      impact: 'negative',
      confidence: 76,
      category: 'risk',
      actionable: true
    },
    {
      id: 'ins-003',
      title: 'Opportunità Cross-selling',
      description: 'Identificati 340 clienti con alta propensione all\'acquisto di servizi premium',
      impact: 'positive',
      confidence: 82,
      category: 'opportunity',
      actionable: true
    },
    {
      id: 'ins-004',
      title: 'Trend Pagamenti Mobile',
      description: 'Crescita del 45% nei pagamenti mobile, opportunità di ottimizzazione UX',
      impact: 'neutral',
      confidence: 94,
      category: 'trend',
      actionable: false
    }
  ];

    setWhatIfScenarios([
      {
        id: 'scenario-001',
        name: 'Crescita Ottimistica',
        description: 'Scenario con crescita del mercato del 15% e bassa competizione',
        parameters: {
          marketGrowth: 15,
          competitionLevel: 25,
          economicFactor: 85,
          seasonality: 110
        },
        results: {
          revenueImpact: 28.5,
          riskLevel: 15,
          probability: 72
        }
      },
      {
        id: 'scenario-002',
        name: 'Scenario Conservativo',
        description: 'Crescita moderata con fattori economici stabili',
        parameters: {
          marketGrowth: 5,
          competitionLevel: 50,
          economicFactor: 75,
          seasonality: 100
        },
        results: {
          revenueImpact: 8.2,
          riskLevel: 25,
          probability: 85
        }
      },
      {
        id: 'scenario-003',
        name: 'Scenario Pessimistico',
        description: 'Recessione economica con alta competizione',
        parameters: {
          marketGrowth: -5,
          competitionLevel: 80,
          economicFactor: 45,
          seasonality: 90
        },
        results: {
          revenueImpact: -12.8,
          riskLevel: 65,
          probability: 35
        }
      }
    ]);

    setEnsembleModels([
      {
        id: 'ensemble-001',
        name: 'Revenue Prediction Ensemble',
        models: ['LSTM', 'Random Forest', 'XGBoost', 'ARIMA'],
        weights: [0.35, 0.25, 0.25, 0.15],
        performance: {
          accuracy: 96.2,
          precision: 94.8,
          recall: 95.1,
          f1Score: 94.9
        },
        status: 'active'
      },
      {
        id: 'ensemble-002',
        name: 'Risk Assessment Ensemble',
        models: ['SVM', 'Neural Network', 'Gradient Boosting'],
        weights: [0.4, 0.35, 0.25],
        performance: {
          accuracy: 93.7,
          precision: 92.3,
          recall: 94.1,
          f1Score: 93.2
        },
        status: 'training'
      }
    ]);

  // Initialize data in useEffect
  useEffect(() => {
    setSensitivityData([
      { parameter: 'Tasso di Interesse', impact: 0.85, confidence: 92, direction: 'negative', elasticity: -1.2 },
      { parameter: 'Crescita PIL', impact: 0.72, confidence: 88, direction: 'positive', elasticity: 0.9 },
      { parameter: 'Inflazione', impact: 0.68, confidence: 85, direction: 'negative', elasticity: -0.7 },
      { parameter: 'Spesa Consumatori', impact: 0.91, confidence: 94, direction: 'positive', elasticity: 1.1 },
      { parameter: 'Volatilità Mercato', impact: 0.56, confidence: 78, direction: 'negative', elasticity: -0.5 }
    ]);

    setModelComparisons([
      {
        modelName: 'LSTM Neural Network',
        accuracy: 94.2,
        precision: 93.1,
        recall: 94.8,
        f1Score: 93.9,
        trainingTime: 45,
        predictionSpeed: 12
      },
      {
        modelName: 'Random Forest',
        accuracy: 91.8,
        precision: 90.5,
        recall: 92.1,
        f1Score: 91.3,
        trainingTime: 15,
        predictionSpeed: 8
      },
      {
        modelName: 'XGBoost',
        accuracy: 93.5,
        precision: 92.8,
        recall: 93.2,
        f1Score: 93.0,
        trainingTime: 22,
        predictionSpeed: 10
      },
      {
        modelName: 'ARIMA',
        accuracy: 87.3,
        precision: 86.1,
        recall: 88.5,
        f1Score: 87.3,
        trainingTime: 8,
        predictionSpeed: 5
      }
    ]);
  }, []);

  const demandPrediction = [
    { hour: '00:00', current: 45, predicted: 52, confidence: 88 },
    { hour: '04:00', current: 23, predicted: 28, confidence: 91 },
    { hour: '08:00', current: 156, predicted: 162, confidence: 94 },
    { hour: '12:00', current: 234, predicted: 241, confidence: 89 },
    { hour: '16:00', current: 189, predicted: 195, confidence: 92 },
    { hour: '20:00', current: 167, predicted: 172, confidence: 87 },
    { hour: '23:59', current: 78, predicted: 84, confidence: 85 }
  ];

  const getModelStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'training': return 'text-yellow-600 bg-yellow-100';
      case 'inactive': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'positive': return 'text-green-600 bg-green-100 border-green-200';
      case 'negative': return 'text-red-600 bg-red-100 border-red-200';
      case 'neutral': return 'text-blue-600 bg-blue-100 border-blue-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getRiskColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

  // Utility functions for advanced features
  const runScenarioSimulation = useCallback(async (scenarioId: string) => {
    setIsRunningSimulation(true);
    setSelectedScenario(scenarioId);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsRunningSimulation(false);
  }, []);

  const exportAdvancedReport = useCallback((format: 'pdf' | 'excel' | 'json') => {
    const data = {
      scenarios: whatIfScenarios,
      ensembleModels,
      sensitivityAnalysis: sensitivityData,
      modelComparisons,
      timestamp: new Date().toISOString()
    };
    
    if (format === 'json') {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `predictive-analytics-report-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }
    // For PDF and Excel, would integrate with appropriate libraries
  }, [whatIfScenarios, ensembleModels, sensitivityData, modelComparisons]);

  const getEnsembleStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'training': return 'text-yellow-600 bg-yellow-100';
      case 'evaluating': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getDirectionIcon = (direction: 'positive' | 'negative') => {
    return direction === 'positive' ? 
      <TrendingUp className="w-4 h-4 text-green-600" /> : 
      <TrendingDown className="w-4 h-4 text-red-600" />;
  };

  const getPerformanceColor = (value: number) => {
    if (value >= 95) return 'text-green-600';
    if (value >= 90) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      {/* Advanced Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Brain className="w-8 h-8 text-purple-600" />
            Analisi Predittive AI
            {isRunningSimulation && (
              <div className="flex items-center gap-2 ml-4">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
                <span className="text-sm text-purple-600">Simulazione in corso...</span>
              </div>
            )}
          </h1>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`px-3 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                autoRefresh ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
              }`}
            >
              {autoRefresh ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              Auto-refresh
            </button>
            
            <div className="flex items-center gap-2 bg-white rounded-lg border px-3 py-2">
              <Download className="w-4 h-4 text-gray-600" />
              <select 
                onChange={(e) => exportAdvancedReport(e.target.value as 'pdf' | 'excel' | 'json')}
                className="border-none bg-transparent text-sm focus:outline-none"
                defaultValue=""
              >
                <option value="" disabled>Esporta Report</option>
                <option value="json">JSON</option>
                <option value="excel">Excel</option>
                <option value="pdf">PDF</option>
              </select>
            </div>
            
            <button
              onClick={() => setShowAdvancedControls(!showAdvancedControls)}
              className={`px-3 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                showAdvancedControls ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'
              }`}
            >
              <Settings className="w-4 h-4" />
              Controlli Avanzati
            </button>
            
            <select 
              value={selectedTimeframe} 
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="7d">Ultimi 7 giorni</option>
              <option value="30d">Ultimi 30 giorni</option>
              <option value="90d">Ultimi 90 giorni</option>
              <option value="1y">Ultimo anno</option>
            </select>
            
            <button 
              onClick={() => setIsLoading(true)}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Aggiorna Modelli
            </button>
          </div>
        </div>
        
        {/* Advanced Controls Panel */}
        {showAdvancedControls && (
          <div className="bg-white rounded-lg border p-4 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Modello Ensemble</label>
                <select
                  value={selectedEnsemble}
                  onChange={(e) => setSelectedEnsemble(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                >
                  {ensembleModels.map(model => (
                    <option key={model.id} value={model.id}>{model.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Scenario What-If</label>
                <select
                  value={selectedScenario || ''}
                  onChange={(e) => e.target.value && runScenarioSimulation(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  disabled={isRunningSimulation}
                >
                  <option value="">Seleziona scenario</option>
                  {whatIfScenarios.map(scenario => (
                    <option key={scenario.id} value={scenario.id}>{scenario.name}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-end gap-2">
                <button
                  onClick={() => setShowModelComparison(!showModelComparison)}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                    showModelComparison ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  <BarChart3 className="w-4 h-4" />
                  Confronto Modelli
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Condividi
                </button>
              </div>
            </div>
          </div>
        )}
        
        <p className="text-gray-600">Previsioni e insights basati su machine learning avanzato con analisi what-if e modelli ensemble</p>
      </div>

      {/* Model Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {predictionModels.map((model) => (
          <div key={model.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg ${getModelStatusColor(model.status)}`}>
                {model.type === 'revenue' && <DollarSign className="w-5 h-5" />}
                {model.type === 'fraud' && <AlertCircle className="w-5 h-5" />}
                {model.type === 'churn' && <Users className="w-5 h-5" />}
                {model.type === 'demand' && <TrendingUp className="w-5 h-5" />}
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getModelStatusColor(model.status)}`}>
                {model.status}
              </span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">{model.name}</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Accuratezza:</span>
                <span className="font-medium text-gray-900">{model.accuracy}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Previsioni:</span>
                <span className="font-medium text-gray-900">{model.predictions.toLocaleString()}</span>
              </div>
              <div className="text-xs text-gray-500">Aggiornato {model.lastUpdated}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Navigation Tabs */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-6 overflow-x-auto">
            {[
              { id: 'forecasts', label: 'Previsioni Revenue', icon: <BarChart3 className="w-4 h-4" /> },
              { id: 'churn', label: 'Analisi Churn', icon: <Users className="w-4 h-4" /> },
              { id: 'demand', label: 'Previsione Domanda', icon: <Activity className="w-4 h-4" /> },
              { id: 'insights', label: 'AI Insights', icon: <Brain className="w-4 h-4" /> },
              { id: 'whatif', label: 'Scenari What-If', icon: <GitBranch className="w-4 h-4" /> },
              { id: 'ensemble', label: 'Modelli Ensemble', icon: <Layers className="w-4 h-4" /> },
              { id: 'sensitivity', label: 'Analisi Sensibilità', icon: <Sliders className="w-4 h-4" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'forecasts' && (
        <div className="space-y-6">
          {/* Revenue Forecast Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                Previsioni Revenue 2024
              </h2>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Effettivo</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Previsto</span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={400}>
              <ComposedChart data={revenueForecasts}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="period" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #e5e7eb', 
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                  formatter={(value, name) => [
                    `€${Number(value).toLocaleString()}`, 
                    name === 'actual' ? 'Effettivo' : name === 'predicted' ? 'Previsto' : 'Confidenza'
                  ]}
                />
                <Bar dataKey="actual" fill="#3b82f6" name="actual" />
                <Line type="monotone" dataKey="predicted" stroke="#10b981" strokeWidth={3} name="predicted" />
                <Line type="monotone" dataKey="confidence" stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 5" name="confidence" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Risk Factors */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-orange-600" />
              Fattori di Rischio
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {riskFactors.map((risk, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-gray-900">{risk.factor}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(risk.impact)}`}>
                      {risk.impact.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{risk.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Probabilità:</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-orange-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${risk.probability}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{risk.probability}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'churn' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <Users className="w-5 h-5 text-red-600" />
            Analisi Customer Churn per Segmento
          </h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={customerChurnData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="segment" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value, name) => [
                  `${value}%`, 
                  name === 'churnRate' ? 'Churn Attuale' : 'Churn Previsto'
                ]}
              />
              <Bar dataKey="churnRate" fill="#3b82f6" name="churnRate" />
              <Bar dataKey="predicted" fill="#ef4444" name="predicted" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {activeTab === 'demand' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-600" />
            Previsione Domanda Oraria
          </h2>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={demandPrediction}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="hour" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value, name) => [
                  value, 
                  name === 'current' ? 'Attuale' : name === 'predicted' ? 'Previsto' : 'Confidenza'
                ]}
              />
              <Area type="monotone" dataKey="current" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
              <Area type="monotone" dataKey="predicted" stackId="2" stroke="#10b981" fill="#10b981" fillOpacity={0.4} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}

      {activeTab === 'insights' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {aiInsights.map((insight) => (
            <div key={insight.id} className={`border rounded-xl p-6 ${getImpactColor(insight.impact)}`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    insight.category === 'revenue' ? 'bg-green-100 text-green-600' :
                    insight.category === 'risk' ? 'bg-red-100 text-red-600' :
                    insight.category === 'opportunity' ? 'bg-blue-100 text-blue-600' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {insight.category === 'revenue' && <DollarSign className="w-4 h-4" />}
                    {insight.category === 'risk' && <AlertCircle className="w-4 h-4" />}
                    {insight.category === 'opportunity' && <Target className="w-4 h-4" />}
                    {insight.category === 'trend' && <TrendingUp className="w-4 h-4" />}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{insight.title}</h3>
                    <span className="text-xs text-gray-600 uppercase tracking-wide">{insight.category}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{insight.confidence}%</div>
                  <div className="text-xs text-gray-600">Confidenza</div>
                </div>
              </div>
              <p className="text-gray-700 mb-4">{insight.description}</p>
              {insight.actionable && (
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-700 font-medium">Azione consigliata disponibile</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* What-If Scenarios Tab */}
      {activeTab === 'whatif' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <GitBranch className="w-5 h-5 text-blue-600" />
              Analisi Scenari What-If
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {whatIfScenarios.map((scenario) => (
                <div key={scenario.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">{scenario.name}</h3>
                    <button
                      onClick={() => runScenarioSimulation(scenario.id)}
                      disabled={isRunningSimulation}
                      className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 disabled:opacity-50"
                    >
                      {isRunningSimulation && selectedScenario === scenario.id ? 'Simulando...' : 'Simula'}
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{scenario.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-xs">
                      <span>Crescita Mercato:</span>
                      <span className="font-medium">{scenario.parameters.marketGrowth}%</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Competizione:</span>
                      <span className="font-medium">{scenario.parameters.competitionLevel}%</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Fattore Economico:</span>
                      <span className="font-medium">{scenario.parameters.economicFactor}%</span>
                    </div>
                  </div>
                  
                  <div className="border-t pt-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Impatto Revenue:</span>
                      <span className={`text-sm font-bold ${
                        scenario.results.revenueImpact > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {scenario.results.revenueImpact > 0 ? '+' : ''}{scenario.results.revenueImpact}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Livello Rischio:</span>
                      <span className={`text-sm font-bold ${
                        scenario.results.riskLevel < 30 ? 'text-green-600' :
                        scenario.results.riskLevel < 60 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {scenario.results.riskLevel}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Probabilità:</span>
                      <span className="text-sm font-bold text-blue-600">{scenario.results.probability}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {selectedScenario && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Risultati Simulazione Dettagliati</h3>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={[
                  { subject: 'Revenue Impact', A: Math.abs(whatIfScenarios.find(s => s.id === selectedScenario)?.results.revenueImpact || 0), fullMark: 30 },
                  { subject: 'Risk Level', A: whatIfScenarios.find(s => s.id === selectedScenario)?.results.riskLevel || 0, fullMark: 100 },
                  { subject: 'Probability', A: whatIfScenarios.find(s => s.id === selectedScenario)?.results.probability || 0, fullMark: 100 },
                  { subject: 'Market Growth', A: whatIfScenarios.find(s => s.id === selectedScenario)?.parameters.marketGrowth || 0, fullMark: 20 },
                  { subject: 'Competition', A: whatIfScenarios.find(s => s.id === selectedScenario)?.parameters.competitionLevel || 0, fullMark: 100 }
                ]}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar name="Scenario" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      )}

      {/* Ensemble Models Tab */}
      {activeTab === 'ensemble' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Layers className="w-5 h-5 text-purple-600" />
              Modelli Ensemble
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {ensembleModels.map((ensemble) => (
                <div key={ensemble.id} className="border rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">{ensemble.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEnsembleStatusColor(ensemble.status)}`}>
                      {ensemble.status.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Accuratezza:</span>
                      <span className={`text-sm font-medium ${getPerformanceColor(ensemble.performance.accuracy)}`}>
                        {ensemble.performance.accuracy}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Precisione:</span>
                      <span className={`text-sm font-medium ${getPerformanceColor(ensemble.performance.precision)}`}>
                        {ensemble.performance.precision}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Recall:</span>
                      <span className={`text-sm font-medium ${getPerformanceColor(ensemble.performance.recall)}`}>
                        {ensemble.performance.recall}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">F1-Score:</span>
                      <span className={`text-sm font-medium ${getPerformanceColor(ensemble.performance.f1Score)}`}>
                        {ensemble.performance.f1Score}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="border-t pt-3">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Modelli Componenti:</h4>
                    <div className="space-y-1">
                      {ensemble.models.map((model, idx) => (
                        <div key={idx} className="flex justify-between text-xs">
                          <span>{model}</span>
                          <span className="font-medium">{(ensemble.weights[idx] * 100).toFixed(1)}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {showModelComparison && (
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Confronto Performance Modelli</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Modello</th>
                        <th className="text-left py-3 px-4">Accuratezza</th>
                        <th className="text-left py-3 px-4">Precisione</th>
                        <th className="text-left py-3 px-4">Recall</th>
                        <th className="text-left py-3 px-4">F1-Score</th>
                        <th className="text-left py-3 px-4">Tempo Training (min)</th>
                        <th className="text-left py-3 px-4">Velocità (ms)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {modelComparisons.map((model, idx) => (
                        <tr key={idx} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium">{model.modelName}</td>
                          <td className={`py-3 px-4 ${getPerformanceColor(model.accuracy)}`}>{model.accuracy}%</td>
                          <td className={`py-3 px-4 ${getPerformanceColor(model.precision)}`}>{model.precision}%</td>
                          <td className={`py-3 px-4 ${getPerformanceColor(model.recall)}`}>{model.recall}%</td>
                          <td className={`py-3 px-4 ${getPerformanceColor(model.f1Score)}`}>{model.f1Score}%</td>
                          <td className="py-3 px-4">{model.trainingTime}</td>
                          <td className="py-3 px-4">{model.predictionSpeed}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Sensitivity Analysis Tab */}
      {activeTab === 'sensitivity' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Sliders className="w-5 h-5 text-orange-600" />
              Analisi di Sensibilità
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Impatto Parametri</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={sensitivityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="parameter" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip formatter={(value, name) => [value, 'Impatto']} />
                    <Bar dataKey="impact" fill="#f59e0b" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Elasticità</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <ScatterChart data={sensitivityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="impact" name="Impatto" />
                    <YAxis dataKey="elasticity" name="Elasticità" />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Scatter name="Parametri" dataKey="elasticity" fill="#8884d8" />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">Dettagli Parametri</h3>
              <div className="space-y-3">
                {sensitivityData.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {getDirectionIcon(item.direction)}
                      <div>
                        <div className="font-medium">{item.parameter}</div>
                        <div className="text-sm text-gray-600">Elasticità: {item.elasticity}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">Impatto: {(item.impact * 100).toFixed(1)}%</div>
                      <div className="text-xs text-gray-600">Confidenza: {item.confidence}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

PredictiveAnalytics.displayName = 'PredictiveAnalytics';

export default PredictiveAnalytics;