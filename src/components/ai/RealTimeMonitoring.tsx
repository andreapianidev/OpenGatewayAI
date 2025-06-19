import React, { useState, useEffect, useCallback } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, ComposedChart } from 'recharts';
import { Activity, Zap, Server, Globe, AlertTriangle, CheckCircle, Clock, TrendingUp, TrendingDown, Wifi, Database, Cpu, HardDrive, Users, CreditCard, Settings, Bell, RefreshCw, Download, Filter, Eye, EyeOff, Maximize2, Minimize2, Play, Pause, BarChart3, PieChart, Calendar, Share2 } from 'lucide-react';

interface SystemMetric {
  title: string;
  value: string;
  status: 'healthy' | 'warning' | 'critical';
  change: string;
  icon: React.ReactNode;
}

interface LiveTransaction {
  id: string;
  timestamp: string;
  amount: number;
  merchant: string;
  status: 'success' | 'pending' | 'failed';
  location: string;
  processingTime: number;
}

interface SystemAlert {
  id: string;
  timestamp: string;
  type: 'info' | 'warning' | 'error';
  message: string;
  component: string;
}

interface PerformanceMetric {
  timestamp: string;
  cpu: number;
  memory: number;
  disk: number;
  network: number;
  activeConnections: number;
  queueSize: number;
}

interface GeographicData {
  country: string;
  transactions: number;
  responseTime: number;
  errorRate: number;
  coordinates: [number, number];
}

interface DashboardWidget {
  id: string;
  title: string;
  type: 'chart' | 'metric' | 'table' | 'map';
  visible: boolean;
  position: { x: number; y: number; w: number; h: number };
}

interface AlertRule {
  id: string;
  name: string;
  metric: string;
  condition: 'greater' | 'less' | 'equal';
  threshold: number;
  enabled: boolean;
  severity: 'low' | 'medium' | 'high';
}

const RealTimeMonitoring: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isConnected, setIsConnected] = useState(true);
  const [liveData, setLiveData] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<LiveTransaction[]>([]);
  const [alerts, setAlerts] = useState<SystemAlert[]>([]);
  const [performanceHistory, setPerformanceHistory] = useState<PerformanceMetric[]>([]);
  const [geographicData, setGeographicData] = useState<GeographicData[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'performance' | 'geographic' | 'alerts' | 'settings'>('overview');
  const [isRealTimeActive, setIsRealTimeActive] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(2000);
  const [showSettings, setShowSettings] = useState(false);
  const [alertRules, setAlertRules] = useState<AlertRule[]>([]);
  const [dashboardWidgets, setDashboardWidgets] = useState<DashboardWidget[]>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState<'1h' | '6h' | '24h' | '7d'>('1h');
  const [systemMetrics, setSystemMetrics] = useState<SystemMetric[]>([]);
  const [serverMetrics, setServerMetrics] = useState<any[]>([]);

  // Initialize data
  useEffect(() => {
    // Initialize geographic data
    setGeographicData([
      { country: 'Italia', transactions: 1247, responseTime: 45, errorRate: 0.12, coordinates: [41.9028, 12.4964] },
      { country: 'Germania', transactions: 892, responseTime: 52, errorRate: 0.08, coordinates: [51.1657, 10.4515] },
      { country: 'Francia', transactions: 634, responseTime: 48, errorRate: 0.15, coordinates: [46.6034, 1.8883] },
      { country: 'Spagna', transactions: 456, responseTime: 55, errorRate: 0.18, coordinates: [40.4637, -3.7492] },
      { country: 'Regno Unito', transactions: 723, responseTime: 41, errorRate: 0.09, coordinates: [55.3781, -3.4360] }
    ]);

    // Initialize alert rules
    setAlertRules([
      { id: '1', name: 'CPU High Usage', metric: 'cpu', condition: 'greater', threshold: 80, enabled: true, severity: 'high' },
      { id: '2', name: 'Memory Warning', metric: 'memory', condition: 'greater', threshold: 85, enabled: true, severity: 'medium' },
      { id: '3', name: 'Response Time Alert', metric: 'responseTime', condition: 'greater', threshold: 100, enabled: true, severity: 'high' },
      { id: '4', name: 'Error Rate Warning', metric: 'errorRate', condition: 'greater', threshold: 1, enabled: true, severity: 'medium' }
    ]);

    // Initialize dashboard widgets
    setDashboardWidgets([
      { id: 'transactions', title: 'Flusso Transazioni', type: 'chart', visible: true, position: { x: 0, y: 0, w: 6, h: 4 } },
      { id: 'performance', title: 'Performance Sistema', type: 'chart', visible: true, position: { x: 6, y: 0, w: 6, h: 4 } },
      { id: 'geographic', title: 'Distribuzione Geografica', type: 'map', visible: true, position: { x: 0, y: 4, w: 12, h: 4 } },
      { id: 'alerts', title: 'Alert Attivi', type: 'table', visible: true, position: { x: 0, y: 8, w: 6, h: 4 } }
    ]);

    // Initialize system metrics
    setSystemMetrics([
      {
        title: 'Uptime Sistema',
        value: '99.98%',
        status: 'healthy',
        change: '+0.02%',
        icon: <CheckCircle className="w-6 h-6" />
      },
      {
        title: 'Transazioni/sec',
        value: '1,247',
        status: 'healthy',
        change: '+12%',
        icon: <Activity className="w-6 h-6" />
      },
      {
        title: 'Latenza Media',
        value: '45ms',
        status: 'warning',
        change: '+8ms',
        icon: <Clock className="w-6 h-6" />
      },
      {
        title: 'Tasso Errori',
        value: '0.12%',
        status: 'healthy',
        change: '-0.05%',
        icon: <AlertTriangle className="w-6 h-6" />
      }
    ]);

    // Initialize server metrics
    setServerMetrics([
      { name: 'CPU', value: 68, status: 'healthy', icon: <Cpu className="w-5 h-5" /> },
      { name: 'RAM', value: 74, status: 'warning', icon: <Server className="w-5 h-5" /> },
      { name: 'Disk', value: 45, status: 'healthy', icon: <HardDrive className="w-5 h-5" /> },
      { name: 'Network', value: 82, status: 'healthy', icon: <Wifi className="w-5 h-5" /> }
    ]);
  }, []);

  // Simulate real-time updates
  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const dataInterval = setInterval(() => {
      if (!isRealTimeActive) return;
      
      // Simulate live data updates
      const newDataPoint = {
        time: new Date().toLocaleTimeString(),
        transactions: Math.floor(Math.random() * 100) + 50,
        responseTime: Math.floor(Math.random() * 50) + 10,
        errorRate: Math.random() * 5,
        throughput: Math.floor(Math.random() * 1000) + 500
      };
      
      setLiveData(prev => {
        const updated = [...prev, newDataPoint];
        return updated.slice(-20); // Keep last 20 points
      });
      
      // Update performance history
      const newPerformancePoint: PerformanceMetric = {
        timestamp: new Date().toISOString(),
        cpu: Math.floor(Math.random() * 40) + 40,
        memory: Math.floor(Math.random() * 30) + 50,
        disk: Math.floor(Math.random() * 20) + 30,
        network: Math.floor(Math.random() * 50) + 30,
        activeConnections: Math.floor(Math.random() * 500) + 200,
        queueSize: Math.floor(Math.random() * 50)
      };
      
      setPerformanceHistory(prev => {
        const updated = [...prev, newPerformancePoint];
        return updated.slice(-50); // Keep last 50 points
      });

      // Simulate new transactions
      if (Math.random() > 0.7) {
        const newTransaction: LiveTransaction = {
          id: `TX${Date.now()}`,
          timestamp: new Date().toLocaleTimeString(),
          amount: Math.floor(Math.random() * 5000) + 100,
          merchant: ['TechStore', 'Fashion Boutique', 'Caffè Central', 'Online Shop'][Math.floor(Math.random() * 4)],
          status: ['success', 'pending', 'failed'][Math.floor(Math.random() * 3)] as any,
          location: ['Milano', 'Roma', 'Napoli', 'Firenze'][Math.floor(Math.random() * 4)],
          processingTime: Math.floor(Math.random() * 1000) + 100
        };
        
        setTransactions(prev => [newTransaction, ...prev.slice(0, 9)]);
      }

      // Simulate alerts
      if (Math.random() > 0.9) {
        const alertTypes = ['info', 'warning', 'error'] as const;
        const messages = [
          'Sistema operativo normale',
          'Latenza elevata rilevata',
          'Errore di connessione database',
          'Picco di traffico rilevato',
          'Aggiornamento sistema completato'
        ];
        
        const newAlert: SystemAlert = {
          id: `AL${Date.now()}`,
          timestamp: new Date().toLocaleTimeString(),
          type: alertTypes[Math.floor(Math.random() * alertTypes.length)],
          message: messages[Math.floor(Math.random() * messages.length)],
          component: ['Gateway', 'Database', 'AI Engine', 'Load Balancer'][Math.floor(Math.random() * 4)]
        };
        
        setAlerts(prev => [newAlert, ...prev.slice(0, 4)]);
      }
    }, 2000);

    return () => {
      clearInterval(timeInterval);
      clearInterval(dataInterval);
    };
  }, [isRealTimeActive, refreshInterval]);

  // Utility functions
  const exportData = useCallback((format: 'csv' | 'json') => {
    const data = {
      timestamp: new Date().toISOString(),
      systemMetrics: systemMetrics,
      performanceHistory: performanceHistory,
      transactions: transactions,
      alerts: alerts,
      geographicData: geographicData
    };
    
    if (format === 'json') {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `monitoring-data-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
    } else {
      // CSV export implementation
      const csvData = [
        ['Timestamp', 'CPU Usage', 'Memory Usage', 'Network I/O', 'Disk I/O', 'Active Transactions', 'Response Time'],
        ...performanceHistory.map(item => [
          new Date(item.timestamp).toISOString(),
          item.cpu.toString(),
          item.memory.toString(),
          item.network.toString(),
          item.disk.toString(),
          item.transactions.toString(),
          item.responseTime.toString()
        ])
      ];
      
      const csvContent = csvData.map(row => row.join(',')).join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `monitoring-data-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    }
  }, [systemMetrics, performanceHistory, transactions, alerts, geographicData]);

  const toggleWidget = useCallback((widgetId: string) => {
    setDashboardWidgets(prev => 
      prev.map(widget => 
        widget.id === widgetId 
          ? { ...widget, visible: !widget.visible }
          : widget
      )
    );
  }, []);

  const toggleAlertRule = useCallback((ruleId: string) => {
    setAlertRules(prev => 
      prev.map(rule => 
        rule.id === ruleId 
          ? { ...rule, enabled: !rule.enabled }
          : rule
      )
    );
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };



  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTransactionStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'failed': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'info': return 'text-blue-600 bg-blue-100 border-blue-200';
      case 'warning': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'error': return 'text-red-600 bg-red-100 border-red-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  return (
    <div className={`min-h-screen bg-gray-50 ${isFullscreen ? 'fixed inset-0 z-50' : 'p-6'}`}>
      {/* Advanced Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Activity className="w-8 h-8 text-blue-600" />
            Monitoraggio Real-Time
          </h1>
          <div className="flex items-center gap-4">
            {/* Real-time Controls */}
            <button
              onClick={() => setIsRealTimeActive(!isRealTimeActive)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                isRealTimeActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
              }`}
            >
              {isRealTimeActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isRealTimeActive ? 'Pausa' : 'Avvia'}
            </button>
            
            {/* Export Data */}
            <div className="relative">
              <button
                onClick={() => exportData('json')}
                className="flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
            
            {/* Fullscreen Toggle */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            
            {/* Settings */}
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Settings className="w-4 h-4" />
            </button>
            
            {/* Connection Status */}
            <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
              isConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'
              }`}></div>
              {isConnected ? 'Connesso' : 'Disconnesso'}
            </div>
            
            <div className="text-sm text-gray-600">
              {currentTime.toLocaleString('it-IT')}
            </div>
          </div>
        </div>
        
        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-4">
          {[
            { id: 'overview', label: 'Overview', icon: <BarChart3 className="w-4 h-4" /> },
            { id: 'performance', label: 'Performance', icon: <Activity className="w-4 h-4" /> },
            { id: 'geographic', label: 'Geografico', icon: <Globe className="w-4 h-4" /> },
            { id: 'alerts', label: 'Alert', icon: <Bell className="w-4 h-4" /> },
            { id: 'settings', label: 'Impostazioni', icon: <Settings className="w-4 h-4" /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
        
        <p className="text-gray-600">Dashboard di monitoraggio sistema in tempo reale</p>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <>
          {/* System Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {systemMetrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${getStatusColor(metric.status)}`}>
                {metric.icon}
              </div>
              <div className={`text-sm font-medium ${
                metric.change.startsWith('+') && metric.title !== 'Tasso Errori' ? 'text-green-600' : 
                metric.change.startsWith('-') && metric.title === 'Tasso Errori' ? 'text-green-600' :
                'text-red-600'
              }`}>
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

      {/* Live Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Real-time Transaction Flow */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Flusso Transazioni Live
            </h2>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">Live</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={liveData}>
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
              <Area type="monotone" dataKey="transactions" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Response Time */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-600" />
              Tempo di Risposta
            </h2>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">Live</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={liveData}>
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
                formatter={(value) => [`${value}ms`, 'Latenza']}
              />
              <Line type="monotone" dataKey="responseTime" stroke="#f59e0b" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Server Resources */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <Server className="w-5 h-5 text-purple-600" />
          Risorse Server
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {serverMetrics.map((metric, index) => (
            <div key={index} className="text-center">
              <div className="flex items-center justify-center mb-3">
                <div className={`p-3 rounded-lg ${getStatusColor(metric.status)}`}>
                  {metric.icon}
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{metric.name}</h3>
              <div className="relative">
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      metric.status === 'healthy' ? 'bg-green-500' :
                      metric.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${metric.value}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-700">{metric.value}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live Transactions and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Live Transactions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-blue-600" />
              Transazioni Live
            </h2>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">Aggiornamento automatico</span>
            </div>
          </div>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    transaction.status === 'success' ? 'bg-green-500' :
                    transaction.status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                  <div>
                    <div className="font-medium text-gray-900">{transaction.merchant}</div>
                    <div className="text-sm text-gray-600">{transaction.location} • {transaction.timestamp}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-900">€{transaction.amount.toLocaleString()}</div>
                  <div className={`text-xs px-2 py-1 rounded-full ${getTransactionStatusColor(transaction.status)}`}>
                    {transaction.status}
                  </div>
                </div>
              </div>
            ))}
            {transactions.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <CreditCard className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>In attesa di nuove transazioni...</p>
              </div>
            )}
          </div>
        </div>

        {/* System Alerts */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              Alert di Sistema
            </h2>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">Monitoraggio attivo</span>
            </div>
          </div>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {alerts.map((alert) => (
              <div key={alert.id} className={`p-3 border rounded-lg ${getAlertColor(alert.type)}`}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{alert.component}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      alert.type === 'info' ? 'bg-blue-100 text-blue-800' :
                      alert.type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {alert.type.toUpperCase()}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">{alert.timestamp}</span>
                </div>
                <p className="text-sm">{alert.message}</p>
              </div>
            ))}
            {alerts.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <CheckCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>Nessun alert attivo</p>
              </div>
            )}
          </div>
        </div>
      </div>
        </>
      )}
      
      {/* Performance Tab */}
      {activeTab === 'performance' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-600" />
              Performance Storica Sistema
            </h2>
            <ResponsiveContainer width="100%" height={400}>
              <ComposedChart data={performanceHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" tickFormatter={(value) => new Date(value).toLocaleTimeString()} />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip labelFormatter={(value) => new Date(value).toLocaleString()} />
                <Area yAxisId="left" type="monotone" dataKey="cpu" stackId="1" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                <Area yAxisId="left" type="monotone" dataKey="memory" stackId="1" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                <Line yAxisId="right" type="monotone" dataKey="activeConnections" stroke="#ff7300" strokeWidth={2} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold mb-4">Utilizzo Risorse</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={performanceHistory.slice(-10)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="timestamp" tickFormatter={(value) => new Date(value).toLocaleTimeString()} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="cpu" fill="#8884d8" name="CPU %" />
                  <Bar dataKey="memory" fill="#82ca9d" name="Memory %" />
                  <Bar dataKey="disk" fill="#ffc658" name="Disk %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold mb-4">Connessioni e Code</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={performanceHistory.slice(-20)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="timestamp" tickFormatter={(value) => new Date(value).toLocaleTimeString()} />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="activeConnections" stroke="#8884d8" name="Connessioni Attive" />
                  <Line type="monotone" dataKey="queueSize" stroke="#82ca9d" name="Dimensione Coda" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
      
      {/* Geographic Tab */}
      {activeTab === 'geographic' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Globe className="h-5 w-5 text-green-600" />
              Distribuzione Geografica Traffico
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Paese</th>
                    <th className="text-left py-3 px-4">Transazioni</th>
                    <th className="text-left py-3 px-4">Tempo Risposta</th>
                    <th className="text-left py-3 px-4">Tasso Errori</th>
                    <th className="text-left py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {geographicData.map((data, idx) => (
                    <tr key={idx} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{data.country}</td>
                      <td className="py-3 px-4">{data.transactions.toLocaleString()}</td>
                      <td className="py-3 px-4">{data.responseTime}ms</td>
                      <td className="py-3 px-4">{data.errorRate}%</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          data.errorRate < 0.1 ? 'bg-green-100 text-green-800' :
                          data.errorRate < 0.2 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {data.errorRate < 0.1 ? 'Ottimo' : data.errorRate < 0.2 ? 'Buono' : 'Attenzione'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold mb-4">Transazioni per Paese</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={geographicData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="country" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="transactions" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold mb-4">Performance per Paese</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={geographicData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="country" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="responseTime" stroke="#8884d8" name="Tempo Risposta (ms)" />
                  <Line type="monotone" dataKey="errorRate" stroke="#82ca9d" name="Tasso Errori (%)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
      
      {/* Alerts Tab */}
      {activeTab === 'alerts' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Bell className="h-5 w-5 text-red-600" />
              Gestione Alert e Regole
            </h2>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Regole Alert Attive</h3>
              <div className="space-y-3">
                {alertRules.map(rule => (
                  <div key={rule.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${getSeverityColor(rule.severity)}`}></div>
                      <div>
                        <div className="font-medium">{rule.name}</div>
                        <div className="text-sm text-gray-600">
                          {rule.metric} {rule.condition} {rule.threshold}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        rule.enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {rule.enabled ? 'Attiva' : 'Disattiva'}
                      </span>
                      <button
                        onClick={() => toggleAlertRule(rule.id)}
                        className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                      >
                        {rule.enabled ? 'Disattiva' : 'Attiva'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Alert Recenti</h3>
              <div className="space-y-3">
                {alerts.map(alert => (
                  <div key={alert.id} className={`p-3 border rounded-lg ${getAlertColor(alert.type)}`}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{alert.component}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          alert.type === 'info' ? 'bg-blue-100 text-blue-800' :
                          alert.type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {alert.type.toUpperCase()}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">{alert.timestamp}</span>
                    </div>
                    <p className="text-sm">{alert.message}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Settings className="h-5 w-5 text-gray-600" />
              Impostazioni Dashboard
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Controlli Real-time</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Aggiornamento automatico</label>
                    <button
                      onClick={() => setIsRealTimeActive(!isRealTimeActive)}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        isRealTimeActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {isRealTimeActive ? 'Attivo' : 'Disattivo'}
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Intervallo aggiornamento (ms)</label>
                    <select
                      value={refreshInterval}
                      onChange={(e) => setRefreshInterval(Number(e.target.value))}
                      className="px-3 py-1 border rounded text-sm"
                    >
                      <option value={1000}>1 secondo</option>
                      <option value={2000}>2 secondi</option>
                      <option value={5000}>5 secondi</option>
                      <option value={10000}>10 secondi</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3">Widget Dashboard</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {dashboardWidgets.map(widget => (
                    <div key={widget.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="text-sm font-medium">{widget.title}</span>
                      <button
                        onClick={() => toggleWidget(widget.id)}
                        className={`flex items-center gap-1 px-2 py-1 rounded text-xs ${
                          widget.visible ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {widget.visible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        {widget.visible ? 'Visibile' : 'Nascosto'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3">Esportazione Dati</h3>
                <div className="flex gap-3">
                  <button
                    onClick={() => exportData('json')}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Esporta JSON
                  </button>
                  <button
                    onClick={() => exportData('csv')}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Esporta CSV
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RealTimeMonitoring;