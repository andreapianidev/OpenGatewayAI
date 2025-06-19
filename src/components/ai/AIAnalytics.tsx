import React, { useState, useCallback } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, ComposedChart } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Users, CreditCard, AlertTriangle, Brain, Target, Zap, Activity, Download, Settings, Bell, Filter, RefreshCw, Calendar, BarChart3, PieChart as PieChartIcon, Share2, Bookmark } from 'lucide-react';

interface MetricCard {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ReactNode;
  color: string;
}

interface ChartData {
  name: string;
  value?: number;
  transactions?: number;
  revenue?: number;
  predictions?: number;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  timestamp: string;
  read: boolean;
}

interface FilterOptions {
  dateRange: string;
  metrics: string[];
  regions: string[];
  channels: string[];
}

interface DashboardWidget {
  id: string;
  title: string;
  type: 'chart' | 'metric' | 'table';
  size: 'small' | 'medium' | 'large';
  position: { x: number; y: number };
  visible: boolean;
}

const AIAnalytics: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');
  const [isLoading, setIsLoading] = useState(true);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    dateRange: '7d',
    metrics: ['all'],
    regions: ['all'],
    channels: ['all']
  });
  const [showFilters, setShowFilters] = useState(false);
  const [dashboardLayout, setDashboardLayout] = useState<DashboardWidget[]>([]);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(30000);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Auto-refresh functionality
  useEffect(() => {
    if (!autoRefresh) return;
    
    const interval = setInterval(() => {
      // Simulate data refresh
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 500);
      
      // Generate random notification
      if (Math.random() > 0.7) {
        const newNotification: Notification = {
          id: `notif-${Date.now()}`,
          title: 'Aggiornamento AI',
          message: 'Nuovi pattern rilevati nei dati di transazione',
          type: 'info',
          timestamp: new Date().toLocaleTimeString(),
          read: false
        };
        setNotifications(prev => [newNotification, ...prev.slice(0, 4)]);
      }
    }, refreshInterval);
    
    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval]);

  // Initialize dashboard layout
  useEffect(() => {
    const defaultLayout: DashboardWidget[] = [
      { id: 'metrics', title: 'Metriche Principali', type: 'metric', size: 'large', position: { x: 0, y: 0 }, visible: true },
      { id: 'trends', title: 'Trend Analytics', type: 'chart', size: 'medium', position: { x: 1, y: 0 }, visible: true },
      { id: 'predictions', title: 'Previsioni AI', type: 'chart', size: 'medium', position: { x: 0, y: 1 }, visible: true },
      { id: 'performance', title: 'Performance', type: 'table', size: 'small', position: { x: 1, y: 1 }, visible: true }
    ];
    setDashboardLayout(defaultLayout);
  }, []);

  const metrics: MetricCard[] = [
    {
      title: 'AI Accuracy Score',
      value: '94.7%',
      change: '+2.3%',
      trend: 'up',
      icon: <Brain className="w-6 h-6" />,
      color: 'bg-purple-500'
    },
    {
      title: 'Fraud Prevention',
      value: '€127,450',
      change: '+15.2%',
      trend: 'up',
      icon: <AlertTriangle className="w-6 h-6" />,
      color: 'bg-red-500'
    },
    {
      title: 'Prediction Accuracy',
      value: '89.3%',
      change: '+4.1%',
      trend: 'up',
      icon: <Target className="w-6 h-6" />,
      color: 'bg-blue-500'
    },
    {
      title: 'Processing Speed',
      value: '12ms',
      change: '-8.7%',
      trend: 'down',
      icon: <Zap className="w-6 h-6" />,
      color: 'bg-yellow-500'
    }
  ];

  const transactionData: ChartData[] = [
    { name: 'Lun', transactions: 1240, revenue: 45600, predictions: 1180 },
    { name: 'Mar', transactions: 1890, revenue: 67800, predictions: 1820 },
    { name: 'Mer', transactions: 2100, revenue: 78900, predictions: 2050 },
    { name: 'Gio', transactions: 1750, revenue: 62300, predictions: 1690 },
    { name: 'Ven', transactions: 2450, revenue: 89200, predictions: 2380 },
    { name: 'Sab', transactions: 2890, revenue: 102400, predictions: 2820 },
    { name: 'Dom', transactions: 2200, revenue: 81500, predictions: 2150 }
  ];

  const aiModelPerformance: ChartData[] = [
    { name: 'Fraud Detection', value: 96.2 },
    { name: 'Risk Assessment', value: 91.8 },
    { name: 'Pattern Recognition', value: 94.5 },
    { name: 'Anomaly Detection', value: 88.7 },
    { name: 'Predictive Modeling', value: 92.3 }
  ];

  const riskDistribution = [
    { name: 'Basso Rischio', value: 68, color: '#10B981' },
    { name: 'Medio Rischio', value: 24, color: '#F59E0B' },
    { name: 'Alto Rischio', value: 8, color: '#EF4444' }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  const aiInsights = [
    {
      type: 'Opportunità',
      message: 'Incremento del 23% nelle transazioni mobile previsto per la prossima settimana',
      confidence: 87,
      impact: 'Alto'
    },
    {
      type: 'Rischio',
      message: 'Pattern anomalo rilevato nelle transazioni serali (+15% rispetto alla norma)',
      confidence: 92,
      impact: 'Medio'
    },
    {
      type: 'Ottimizzazione',
      message: 'Suggerito aggiornamento algoritmo per ridurre falsi positivi del 12%',
      confidence: 78,
      impact: 'Alto'
    }
  ];

  // Utility functions
  const exportData = useCallback((format: 'csv' | 'json' | 'pdf') => {
    const data = {
      metrics,
      transactionData,
      aiInsights,
      timestamp: new Date().toISOString()
    };
    
    if (format === 'json') {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ai-analytics-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } else if (format === 'csv') {
      const csvContent = [
        'Metric,Value,Change,Trend',
        ...metrics.map(m => `${m.title},${m.value},${m.change},${m.trend}`)
      ].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ai-analytics-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    }
  }, [metrics, transactionData, aiInsights]);

  const markNotificationAsRead = useCallback((id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  }, []);

  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  const applyFilters = useCallback((newFilters: FilterOptions) => {
    setFilters(newFilters);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 800);
  }, []);

  const toggleWidget = useCallback((widgetId: string) => {
    setDashboardLayout(prev => prev.map(w => 
      w.id === widgetId ? { ...w, visible: !w.visible } : w
    ));
  }, []);

  const unreadNotifications = notifications.filter(n => !n.read).length;

  if (isLoading) {
    return (
      <div className="p-6 min-h-screen bg-gray-50">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-1/4 mb-6"></div>
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
    <div className="p-6 min-h-screen bg-gray-50">
      {/* Advanced Header with Toolbar */}
      <div className="bg-white rounded-lg shadow-sm border p-4 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Brain className="w-8 h-8 text-purple-600" />
            AI Analytics Dashboard
          </h1>
          <div className="flex items-center space-x-2">
            {/* Auto Refresh Toggle */}
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`p-2 rounded-lg transition-colors ${
                autoRefresh ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
              }`}
              title="Auto Refresh"
            >
              <RefreshCw className={`h-4 w-4 ${autoRefresh ? 'animate-spin' : ''}`} />
            </button>
            
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors relative"
              >
                <Bell className="h-4 w-4" />
                {unreadNotifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadNotifications}
                  </span>
                )}
              </button>
              
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border z-50">
                  <div className="p-3 border-b flex justify-between items-center">
                    <h3 className="font-semibold">Notifiche</h3>
                    <button
                      onClick={clearAllNotifications}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      Cancella tutto
                    </button>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <p className="p-4 text-gray-500 text-center">Nessuna notifica</p>
                    ) : (
                      notifications.map(notification => (
                        <div
                          key={notification.id}
                          className={`p-3 border-b hover:bg-gray-50 cursor-pointer ${
                            !notification.read ? 'bg-blue-50' : ''
                          }`}
                          onClick={() => markNotificationAsRead(notification.id)}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium text-sm">{notification.title}</h4>
                              <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                            </div>
                            <span className="text-xs text-gray-400">{notification.timestamp}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
            
            {/* Filters */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
              title="Filtri"
            >
              <Filter className="h-4 w-4" />
            </button>
            
            {/* Export */}
            <div className="relative group">
              <button className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                <Download className="h-4 w-4" />
              </button>
              <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <button
                  onClick={() => exportData('json')}
                  className="w-full text-left px-3 py-2 hover:bg-gray-50 text-sm"
                >
                  Export JSON
                </button>
                <button
                  onClick={() => exportData('csv')}
                  className="w-full text-left px-3 py-2 hover:bg-gray-50 text-sm"
                >
                  Export CSV
                </button>
              </div>
            </div>
            
            {/* Dashboard Customization */}
            <button
              onClick={() => setIsCustomizing(!isCustomizing)}
              className={`p-2 rounded-lg transition-colors ${
                isCustomizing ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
              }`}
              title="Personalizza Dashboard"
            >
              <Settings className="h-4 w-4" />
            </button>
            
            {/* Time Period Selector */}
            <div className="flex gap-2">
              {['24h', '7d', '30d', '90d'].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedTimeframe(period)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedTimeframe === period
                      ? 'bg-purple-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-gray-50 rounded-lg p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Periodo</label>
                <select 
                  value={filters.dateRange} 
                  onChange={(e) => applyFilters({...filters, dateRange: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="24h">Ultime 24 ore</option>
                  <option value="7d">Ultimi 7 giorni</option>
                  <option value="30d">Ultimi 30 giorni</option>
                  <option value="90d">Ultimi 90 giorni</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Metriche</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option value="all">Tutte le metriche</option>
                  <option value="revenue">Solo Revenue</option>
                  <option value="transactions">Solo Transazioni</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Regioni</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option value="all">Tutte le regioni</option>
                  <option value="eu">Europa</option>
                  <option value="na">Nord America</option>
                  <option value="asia">Asia</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Canali</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option value="all">Tutti i canali</option>
                  <option value="web">Web</option>
                  <option value="mobile">Mobile</option>
                  <option value="api">API</option>
                </select>
              </div>
            </div>
          </div>
        )}
        
        {/* Dashboard Customization Panel */}
        {isCustomizing && (
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold mb-3">Personalizza Widget Dashboard</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {dashboardLayout.map(widget => (
                <label key={widget.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={widget.visible}
                    onChange={() => toggleWidget(widget.id)}
                    className="rounded"
                  />
                  <span className="text-sm">{widget.title}</span>
                </label>
              ))}
            </div>
          </div>
        )}
        
        <p className="text-gray-600 mt-4">Analisi avanzate powered by AI per ottimizzare le performance del gateway</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${metric.color} text-white`}>
                {metric.icon}
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ${
                metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
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
        {/* Transaction Trends */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-600" />
              Trend Transazioni vs Predizioni AI
            </h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={transactionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }} 
              />
              <Area type="monotone" dataKey="transactions" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
              <Area type="monotone" dataKey="predictions" stackId="2" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* AI Model Performance */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <Target className="w-5 h-5 text-green-600" />
              Performance Modelli AI
            </h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={aiModelPerformance} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" domain={[0, 100]} stroke="#6b7280" />
              <YAxis dataKey="name" type="category" stroke="#6b7280" width={120} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value) => [`${value}%`, 'Accuratezza']}
              />
              <Bar dataKey="value" fill="#10b981" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Risk Distribution and AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Risk Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            Distribuzione Rischi
          </h2>
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

        {/* Enhanced AI Insights */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-600" />
              AI Insights & Raccomandazioni
            </h2>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-sm bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors">
                Genera Report
              </button>
              <button className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
                Applica Suggerimenti
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Insights */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900 mb-3">Analisi Automatiche</h4>
              {aiInsights.map((insight, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        insight.type === 'Opportunità' ? 'bg-green-100 text-green-800' :
                        insight.type === 'Rischio' ? 'bg-red-100 text-red-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {insight.type}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        insight.impact === 'Alto' ? 'bg-orange-100 text-orange-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        Impatto {insight.impact}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      Confidenza: {insight.confidence}%
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">{insight.message}</p>
                  <div className="mt-3 flex gap-2">
                    <button className="px-3 py-1 bg-purple-600 text-white text-xs rounded-lg hover:bg-purple-700 transition-colors">
                      Applica
                    </button>
                    <button className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg hover:bg-gray-200 transition-colors">
                      Dettagli
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Predictions & Recommendations */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900 mb-3">Predizioni & Raccomandazioni</h4>
              
              {/* Revenue Prediction */}
              <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <h5 className="font-medium text-green-900">Previsione Revenue</h5>
                </div>
                <p className="text-sm text-green-700 mb-2">
                  Crescita prevista del +12.5% nei prossimi 30 giorni
                </p>
                <div className="text-xs text-green-600">
                  Basato su trend attuali e stagionalità
                </div>
              </div>
              
              {/* Risk Alert */}
              <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <h5 className="font-medium text-yellow-900">Alert Rischio</h5>
                </div>
                <p className="text-sm text-yellow-700 mb-2">
                  Aumento anomalo transazioni fallite (3.2%)
                </p>
                <div className="text-xs text-yellow-600">
                  Raccomandazione: Verificare connessioni provider
                </div>
              </div>
              
              {/* Optimization Suggestion */}
              <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <Settings className="h-4 w-4 text-blue-600" />
                  <h5 className="font-medium text-blue-900">Ottimizzazione</h5>
                </div>
                <p className="text-sm text-blue-700 mb-2">
                  Routing intelligente può ridurre latenza del 15%
                </p>
                <div className="text-xs text-blue-600">
                  Implementazione automatica disponibile
                </div>
              </div>
              
              {/* Performance Insight */}
              <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="h-4 w-4 text-purple-600" />
                  <h5 className="font-medium text-purple-900">Performance Insight</h5>
                </div>
                <p className="text-sm text-purple-700 mb-2">
                  Picco di traffico previsto Venerdì 14:00-16:00
                </p>
                <div className="text-xs text-purple-600">
                  Suggerimento: Pre-scaling automatico
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Status */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <Activity className="w-5 h-5 text-green-600" />
          Stato Real-time Sistema AI
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <div className="w-8 h-8 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <h3 className="font-semibold text-gray-900">Sistema Operativo</h3>
            <p className="text-sm text-gray-600">Tutti i modelli AI funzionano correttamente</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Zap className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Latenza Media</h3>
            <p className="text-sm text-gray-600">12ms - Performance ottimale</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Brain className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Modelli Attivi</h3>
            <p className="text-sm text-gray-600">5/5 modelli in esecuzione</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAnalytics;