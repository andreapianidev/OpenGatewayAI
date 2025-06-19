import React, { useState, useEffect, useCallback, memo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, ComposedChart } from 'recharts';
import { Shield, AlertTriangle, Eye, Clock, MapPin, CreditCard, User, TrendingUp, CheckCircle, XCircle, AlertCircle, Filter, Search, Download, Brain, Settings, Bell, RefreshCw, Zap, Target, Activity, Globe, Users, DollarSign } from 'lucide-react';

interface FraudAlert {
  id: string;
  timestamp: string;
  type: 'high' | 'medium' | 'low';
  description: string;
  amount: number;
  merchant: string;
  location: string;
  riskScore: number;
  status: 'pending' | 'resolved' | 'false_positive';
}

interface FraudMetric {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ReactNode;
  color: string;
}

interface MLModel {
  id: string;
  name: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  lastTrained: string;
  status: 'active' | 'training' | 'inactive';
  predictions: number;
}

interface BehaviorPattern {
  id: string;
  pattern: string;
  riskLevel: 'low' | 'medium' | 'high';
  frequency: number;
  description: string;
  examples: string[];
}

interface GeographicRisk {
  country: string;
  riskScore: number;
  transactions: number;
  fraudRate: number;
  trend: 'increasing' | 'decreasing' | 'stable';
}

interface RealTimeAlert {
  id: string;
  timestamp: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  type: string;
  message: string;
  actionRequired: boolean;
  autoBlocked: boolean;
}

const FraudDetection: React.FC = memo(() => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [realTimeAlerts, setRealTimeAlerts] = useState<RealTimeAlert[]>([]);
  const [fraudMetrics, setFraudMetrics] = useState<FraudMetric[]>([]);
  const [fraudAlerts, setFraudAlerts] = useState<FraudAlert[]>([]);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [showMLInsights, setShowMLInsights] = useState(false);
  const [selectedModel, setSelectedModel] = useState('ensemble');
  const [alertThreshold, setAlertThreshold] = useState(75);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    
    // Initialize fraud metrics
    setFraudMetrics([
      {
        title: 'Frodi Bloccate',
        value: '47',
        change: '+12%',
        trend: 'up',
        icon: <Shield className="w-6 h-6" />,
        color: 'bg-green-500'
      },
      {
        title: 'Risparmi Totali',
        value: '€127,450',
        change: '+23%',
        trend: 'up',
        icon: <TrendingUp className="w-6 h-6" />,
        color: 'bg-blue-500'
      },
      {
        title: 'Falsi Positivi',
        value: '3.2%',
        change: '-8%',
        trend: 'down',
        icon: <AlertCircle className="w-6 h-6" />,
        color: 'bg-yellow-500'
      },
      {
        title: 'Tempo Risposta',
        value: '0.8s',
        change: '-15%',
        trend: 'down',
        icon: <Clock className="w-6 h-6" />,
        color: 'bg-purple-500'
      }
    ]);
     
    // Initialize fraud alerts
    setFraudAlerts([
      {
        id: 'FR001',
        timestamp: '2024-01-15 14:32:15',
        type: 'high',
        description: 'Transazione sospetta: importo anomalo per il merchant',
        amount: 15000,
        merchant: 'TechStore Milano',
        location: 'Milano, IT',
        riskScore: 94,
        status: 'pending'
      },
      {
        id: 'FR002',
        timestamp: '2024-01-15 14:28:42',
        type: 'medium',
        description: 'Pattern di velocità transazioni anomalo',
        amount: 2500,
        merchant: 'Fashion Boutique',
        location: 'Roma, IT',
        riskScore: 76,
        status: 'pending'
      },
      {
        id: 'FR003',
        timestamp: '2024-01-15 14:15:33',
        type: 'high',
        description: 'Geolocalizzazione impossibile: transazioni simultanee',
        amount: 8900,
        merchant: 'Online Electronics',
        location: 'Napoli, IT',
        riskScore: 89,
        status: 'resolved'
      },
      {
        id: 'FR004',
        timestamp: '2024-01-15 13:45:12',
        type: 'low',
        description: 'Comportamento utente leggermente anomalo',
        amount: 450,
        merchant: 'Caffè Central',
        location: 'Firenze, IT',
        riskScore: 45,
        status: 'false_positive'
      }
    ]);
     
    return () => clearTimeout(timer);
  }, []);

  // Real-time alerts simulation
  useEffect(() => {
    if (!autoRefresh) return;
    
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        const severities: RealTimeAlert['severity'][] = ['critical', 'high', 'medium', 'low'];
        const types = ['Velocity Check', 'Geolocation', 'Device Fingerprint', 'Behavioral Analysis'];
        
        const newAlert: RealTimeAlert = {
          id: `alert-${Date.now()}`,
          timestamp: new Date().toLocaleTimeString(),
          severity: severities[Math.floor(Math.random() * severities.length)],
          type: types[Math.floor(Math.random() * types.length)],
          message: 'Transazione sospetta rilevata',
          actionRequired: Math.random() > 0.6,
          autoBlocked: Math.random() > 0.7
        };
        
        setRealTimeAlerts(prev => [newAlert, ...prev.slice(0, 9)]);
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [autoRefresh]);



  const fraudTrendData = [
    { time: '00:00', detected: 12, blocked: 8, falsePositives: 2 },
    { time: '04:00', detected: 8, blocked: 6, falsePositives: 1 },
    { time: '08:00', detected: 25, blocked: 18, falsePositives: 4 },
    { time: '12:00', detected: 35, blocked: 28, falsePositives: 3 },
    { time: '16:00', detected: 42, blocked: 35, falsePositives: 5 },
    { time: '20:00', detected: 38, blocked: 31, falsePositives: 4 },
    { time: '23:59', detected: 28, blocked: 22, falsePositives: 3 }
  ];

  const riskDistribution = [
    { name: 'Basso Rischio', value: 65, color: '#10B981' },
    { name: 'Medio Rischio', value: 25, color: '#F59E0B' },
    { name: 'Alto Rischio', value: 10, color: '#EF4444' }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  // ML Models data
  const mlModels: MLModel[] = [
    {
      id: 'ensemble',
      name: 'Ensemble Model',
      accuracy: 94.7,
      precision: 92.3,
      recall: 89.1,
      f1Score: 90.6,
      lastTrained: '2024-01-15',
      status: 'active',
      predictions: 15420
    },
    {
      id: 'neural_network',
      name: 'Deep Neural Network',
      accuracy: 91.2,
      precision: 88.7,
      recall: 93.4,
      f1Score: 91.0,
      lastTrained: '2024-01-14',
      status: 'active',
      predictions: 12890
    },
    {
      id: 'random_forest',
      name: 'Random Forest',
      accuracy: 89.5,
      precision: 91.2,
      recall: 85.8,
      f1Score: 88.4,
      lastTrained: '2024-01-13',
      status: 'training',
      predictions: 8760
    }
  ];

  // Behavior patterns
  const behaviorPatterns: BehaviorPattern[] = [
    {
      id: 'velocity',
      pattern: 'Velocity Anomaly',
      riskLevel: 'high',
      frequency: 23,
      description: 'Transazioni multiple in breve tempo',
      examples: ['5+ transazioni in 10 minuti', 'Importi crescenti rapidamente']
    },
    {
      id: 'geolocation',
      pattern: 'Geolocation Jump',
      riskLevel: 'medium',
      frequency: 18,
      description: 'Cambi di posizione geografica impossibili',
      examples: ['Milano → Tokyo in 2 ore', 'VPN/Proxy detection']
    },
    {
      id: 'device',
      pattern: 'Device Fingerprint',
      riskLevel: 'medium',
      frequency: 31,
      description: 'Dispositivi sospetti o compromessi',
      examples: ['Browser modificato', 'Emulatori mobili']
    },
    {
      id: 'behavioral',
      pattern: 'Behavioral Shift',
      riskLevel: 'low',
      frequency: 12,
      description: 'Cambiamenti nel comportamento utente',
      examples: ['Orari inusuali', 'Pattern di spesa anomali']
    }
  ];

  // Geographic risk data
  const geographicRisks: GeographicRisk[] = [
    { country: 'Nigeria', riskScore: 8.7, transactions: 234, fraudRate: 12.3, trend: 'increasing' },
    { country: 'Romania', riskScore: 6.2, transactions: 567, fraudRate: 8.9, trend: 'stable' },
    { country: 'Brazil', riskScore: 5.8, transactions: 1234, fraudRate: 7.2, trend: 'decreasing' },
    { country: 'India', riskScore: 4.3, transactions: 2890, fraudRate: 5.1, trend: 'stable' },
    { country: 'Russia', riskScore: 7.1, transactions: 445, fraudRate: 9.8, trend: 'increasing' }
  ];

  // Utility functions
  const exportMLReport = useCallback(() => {
    const report = {
      models: mlModels,
      patterns: behaviorPatterns,
      geographicRisks,
      alerts: realTimeAlerts,
      timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fraud-detection-report-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [mlModels, behaviorPatterns, geographicRisks, realTimeAlerts]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getModelStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'training': return 'text-yellow-600 bg-yellow-100';
      case 'inactive': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const fraudPatterns = [
    { pattern: 'Transazioni Multiple Rapide', occurrences: 23, riskLevel: 'Alto' },
    { pattern: 'Importi Anomali', occurrences: 18, riskLevel: 'Alto' },
    { pattern: 'Geolocalizzazione Sospetta', occurrences: 15, riskLevel: 'Medio' },
    { pattern: 'Orari Inusuali', occurrences: 12, riskLevel: 'Medio' },
    { pattern: 'Dispositivi Non Riconosciuti', occurrences: 8, riskLevel: 'Basso' }
  ];

  const filteredAlerts = fraudAlerts.filter(alert => {
    const matchesStatus = filterStatus === 'all' || alert.status === filterStatus;
    const matchesSearch = alert.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.merchant.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-orange-100 text-orange-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'false_positive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (type: string) => {
    switch (type) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 min-h-screen bg-gray-50">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-300 rounded-lg"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-80 bg-gray-300 rounded-lg"></div>
            <div className="h-80 bg-gray-300 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Advanced Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Shield className="text-red-600" />
            Sistema Anti-Frode ML
          </h1>
          <div className="flex items-center space-x-2">
            {/* Auto Refresh */}
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`p-2 rounded-lg transition-colors ${
                autoRefresh ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
              }`}
              title="Auto Refresh"
            >
              <RefreshCw className={`h-4 w-4 ${autoRefresh ? 'animate-spin' : ''}`} />
            </button>
            
            {/* ML Insights Toggle */}
            <button
              onClick={() => setShowMLInsights(!showMLInsights)}
              className={`p-2 rounded-lg transition-colors ${
                showMLInsights ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-600'
              }`}
              title="ML Insights"
            >
              <Brain className="h-4 w-4" />
            </button>
            
            {/* Export */}
            <button
              onClick={exportMLReport}
              className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
              title="Export Report"
            >
              <Download className="h-4 w-4" />
            </button>
            
            {/* Settings */}
            <button className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
              <Settings className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-6">
          {[
            { id: 'overview', label: 'Overview', icon: Eye },
            { id: 'models', label: 'ML Models', icon: Brain },
            { id: 'patterns', label: 'Behavior Patterns', icon: Target },
            { id: 'geographic', label: 'Geographic Risk', icon: Globe },
            { id: 'realtime', label: 'Real-time Alerts', icon: Bell }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
        
        {/* Controls */}
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Cerca transazioni..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
            />
          </div>
          
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
          >
            <option value="all">Tutti gli stati</option>
            <option value="pending">In attesa</option>
            <option value="resolved">Risolti</option>
            <option value="false_positive">Falsi positivi</option>
          </select>
          
          <select 
            value={selectedTimeframe} 
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
          >
            <option value="24h">Ultime 24 ore</option>
            <option value="7d">Ultimi 7 giorni</option>
            <option value="30d">Ultimi 30 giorni</option>
            <option value="90d">Ultimi 90 giorni</option>
          </select>
          
          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-600">Soglia Alert:</label>
            <input
              type="range"
              min="50"
              max="95"
              value={alertThreshold}
              onChange={(e) => setAlertThreshold(Number(e.target.value))}
              className="w-20"
            />
            <span className="text-sm font-medium text-gray-900">{alertThreshold}%</span>
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {fraudMetrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${metric.color} text-white`}>
                {metric.icon}
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ${
                metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingUp className="w-4 h-4 rotate-180" />}
                {metric.change}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</h3>
              <p className="text-gray-600 text-sm">{metric.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Fraud Detection Trends */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <Eye className="w-5 h-5 text-blue-600" />
              Trend Rilevamento Frodi (24h)
            </h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={fraudTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="time" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }} 
              />
              <Area type="monotone" dataKey="detected" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} />
              <Area type="monotone" dataKey="blocked" stackId="2" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
              <Area type="monotone" dataKey="falsePositives" stackId="3" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Risk Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              Distribuzione Livelli di Rischio
            </h2>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={riskDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {riskDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, 'Percentuale']} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {riskDistribution.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm text-gray-600">{item.name}</span>
                </div>
                <span className="text-sm font-medium">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fraud Patterns Analysis */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <Filter className="w-5 h-5 text-purple-600" />
          Pattern di Frode Rilevati
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {fraudPatterns.map((pattern, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-900">{pattern.pattern}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  pattern.riskLevel === 'Alto' ? 'bg-red-100 text-red-800' :
                  pattern.riskLevel === 'Medio' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {pattern.riskLevel}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Occorrenze:</span>
                <span className="text-lg font-bold text-gray-900">{pattern.occurrences}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ML Models Tab */}
      {activeTab === 'models' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-600" />
              Modelli Machine Learning
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mlModels.map(model => (
                <div key={model.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-gray-900">{model.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getModelStatusColor(model.status)}`}>
                      {model.status}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Accuracy:</span>
                      <span className="font-medium">{model.accuracy}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Precision:</span>
                      <span className="font-medium">{model.precision}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Recall:</span>
                      <span className="font-medium">{model.recall}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">F1-Score:</span>
                      <span className="font-medium">{model.f1Score}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Predictions:</span>
                      <span className="font-medium">{model.predictions.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Last Trained:</span>
                      <span className="font-medium">{model.lastTrained}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button className="px-3 py-1 bg-purple-600 text-white text-xs rounded hover:bg-purple-700">
                      Retrain
                    </button>
                    <button className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded hover:bg-gray-200">
                      Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Model Performance Chart */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold mb-4">Performance Comparison</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mlModels}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="accuracy" fill="#8884d8" name="Accuracy" />
                <Bar dataKey="precision" fill="#82ca9d" name="Precision" />
                <Bar dataKey="recall" fill="#ffc658" name="Recall" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
      
      {/* Behavior Patterns Tab */}
      {activeTab === 'patterns' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Target className="h-5 w-5 text-orange-600" />
              Pattern Comportamentali
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {behaviorPatterns.map(pattern => (
                <div key={pattern.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-gray-900">{pattern.pattern}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      pattern.riskLevel === 'high' ? 'bg-red-100 text-red-800' :
                      pattern.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {pattern.riskLevel} risk
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{pattern.description}</p>
                  <div className="text-sm">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Frequency:</span>
                      <span className="font-medium">{pattern.frequency} detections</span>
                    </div>
                    <div>
                      <span className="text-gray-600 block mb-1">Examples:</span>
                      <ul className="text-xs text-gray-500 space-y-1">
                        {pattern.examples.map((example, idx) => (
                          <li key={idx}>• {example}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Geographic Risk Tab */}
      {activeTab === 'geographic' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Globe className="h-5 w-5 text-blue-600" />
              Rischio Geografico
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Paese</th>
                    <th className="text-left py-3 px-4">Risk Score</th>
                    <th className="text-left py-3 px-4">Transazioni</th>
                    <th className="text-left py-3 px-4">Fraud Rate</th>
                    <th className="text-left py-3 px-4">Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {geographicRisks.map((risk, idx) => (
                    <tr key={idx} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{risk.country}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${
                            risk.riskScore > 7 ? 'bg-red-500' :
                            risk.riskScore > 5 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}></div>
                          {risk.riskScore}/10
                        </div>
                      </td>
                      <td className="py-3 px-4">{risk.transactions.toLocaleString()}</td>
                      <td className="py-3 px-4">{risk.fraudRate}%</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          risk.trend === 'increasing' ? 'bg-red-100 text-red-800' :
                          risk.trend === 'decreasing' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {risk.trend}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      
      {/* Real-time Alerts Tab */}
      {activeTab === 'realtime' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Bell className="h-5 w-5 text-red-600" />
              Alert Real-time
            </h2>
            <div className="space-y-3">
              {realTimeAlerts.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Nessun alert attivo</p>
              ) : (
                realTimeAlerts.map(alert => (
                  <div key={alert.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className={`w-3 h-3 rounded-full mt-1 ${getSeverityColor(alert.severity)}`}></div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-gray-900">{alert.type}</span>
                            <span className="text-xs text-gray-500">{alert.timestamp}</span>
                          </div>
                          <p className="text-sm text-gray-600">{alert.message}</p>
                          <div className="flex items-center gap-4 mt-2">
                            {alert.actionRequired && (
                              <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">
                                Azione richiesta
                              </span>
                            )}
                            {alert.autoBlocked && (
                              <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                                Auto-bloccato
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700">
                          Investigate
                        </button>
                        <button className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded hover:bg-gray-200">
                          Dismiss
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Overview Tab (existing content) */}
      {activeTab === 'overview' && (
        <>
          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Risk Distribution */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                  Distribuzione Livelli di Rischio
                </h2>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={riskDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {riskDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Percentuale']} />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {riskDistribution.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: item.color }}></div>
                      <span className="text-sm text-gray-600">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Fraud Patterns Analysis */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Filter className="w-5 h-5 text-purple-600" />
              Pattern di Frode Rilevati
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {fraudPatterns.map((pattern, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{pattern.pattern}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      pattern.riskLevel === 'Alto' ? 'bg-red-100 text-red-800' :
                      pattern.riskLevel === 'Medio' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {pattern.riskLevel}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Occorrenze:</span>
                    <span className="text-lg font-bold text-gray-900">{pattern.occurrences}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Fraud Alerts */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            Alert Frodi in Tempo Reale
          </h2>
          <div className="flex gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Cerca alert..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="all">Tutti gli stati</option>
              <option value="pending">In attesa</option>
              <option value="resolved">Risolti</option>
              <option value="false_positive">Falsi positivi</option>
            </select>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" />
              Esporta
            </button>
          </div>
        </div>
        
        <div className="space-y-4">
          {filteredAlerts.map((alert) => (
            <div key={alert.id} className={`border rounded-lg p-4 hover:bg-gray-50 transition-colors ${getRiskColor(alert.type)}`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-medium">{alert.id}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(alert.status)}`}>
                      {alert.status === 'pending' ? 'In attesa' :
                       alert.status === 'resolved' ? 'Risolto' : 'Falso positivo'}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">{alert.timestamp}</div>
                  <div className="text-lg font-bold text-gray-900">€{alert.amount.toLocaleString()}</div>
                </div>
              </div>
              
              <p className="text-gray-700 mb-3">{alert.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{alert.merchant}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{alert.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">Risk Score: {alert.riskScore}%</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                {alert.status === 'pending' && (
                  <>
                    <button className="px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      Conferma Frode
                    </button>
                    <button className="px-3 py-1 bg-gray-600 text-white text-sm rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-1">
                      <XCircle className="w-4 h-4" />
                      Falso Positivo
                    </button>
                  </>
                )}
                <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                  Dettagli
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {filteredAlerts.length === 0 && (
          <div className="text-center py-8">
            <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Nessun alert trovato con i filtri selezionati</p>
          </div>
        )}
      </div>
    </div>
  );
});

FraudDetection.displayName = 'FraudDetection';

export default FraudDetection;