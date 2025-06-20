import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Clock, Zap } from 'lucide-react';

// Tipi per le metriche di performance
interface PerformanceMetric {
  timestamp: string;
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
  networkIn: number;
  networkOut: number;
  responseTime: number;
  errorRate: number;
}

interface CloudAlert {
  id: string;
  type: 'warning' | 'error' | 'info';
  message: string;
  service: string;
  timestamp: string;
  resolved: boolean;
}

interface ServiceHealth {
  service: string;
  status: 'healthy' | 'warning' | 'critical';
  uptime: number;
  lastCheck: string;
}

interface CloudPerformanceMonitoringProps {
  timeRange?: '1h' | '6h' | '24h' | '7d' | '30d';
  onAlertClick?: (alert: CloudAlert) => void;
}

const CloudPerformanceMonitoring: React.FC<CloudPerformanceMonitoringProps> = ({
  timeRange = '24h',
  onAlertClick
}) => {
  const [performanceData, setPerformanceData] = useState<PerformanceMetric[]>([]);
  const [alerts, setAlerts] = useState<CloudAlert[]>([]);
  const [serviceHealth, setServiceHealth] = useState<ServiceHealth[]>([]);
  const [selectedMetric, setSelectedMetric] = useState<string>('cpuUsage');
  const [loading, setLoading] = useState(true);

  // Simulazione dati di performance
  useEffect(() => {
    const generatePerformanceData = (): PerformanceMetric[] => {
      const now = new Date();
      const dataPoints = timeRange === '1h' ? 60 : timeRange === '6h' ? 72 : timeRange === '24h' ? 96 : timeRange === '7d' ? 168 : 720;
      const interval = timeRange === '1h' ? 60000 : timeRange === '6h' ? 300000 : timeRange === '24h' ? 900000 : timeRange === '7d' ? 3600000 : 3600000;
      
      return Array.from({ length: dataPoints }, (_, i) => {
        const timestamp = new Date(now.getTime() - (dataPoints - i) * interval);
        return {
          timestamp: timestamp.toISOString(),
          cpuUsage: Math.random() * 100,
          memoryUsage: Math.random() * 100,
          diskUsage: Math.random() * 100,
          networkIn: Math.random() * 1000,
          networkOut: Math.random() * 800,
          responseTime: Math.random() * 500 + 50,
          errorRate: Math.random() * 5
        };
      });
    };

    const generateAlerts = (): CloudAlert[] => {
      const alertTypes: Array<'warning' | 'error' | 'info'> = ['warning', 'error', 'info'];
      const services = ['AWS-EC2-1', 'Azure-SQL-1', 'GCP-Storage-1', 'DO-Droplet-1', 'AWS-RDS-1'];
      const messages = [
        'CPU usage above 90%',
        'Memory usage critical',
        'Disk space low',
        'High error rate detected',
        'Network latency increased',
        'Service restart required',
        'Security update available',
        'Backup completed successfully'
      ];
      
      return Array.from({ length: 8 }, (_, i) => ({
        id: `alert-${i + 1}`,
        type: alertTypes[Math.floor(Math.random() * alertTypes.length)],
        message: messages[i],
        service: services[Math.floor(Math.random() * services.length)],
        timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString(),
        resolved: Math.random() > 0.3
      }));
    };

    const generateServiceHealth = (): ServiceHealth[] => {
      const services = ['Payment Gateway', 'User Authentication', 'Database Cluster', 'File Storage', 'API Gateway', 'Load Balancer'];
      const statuses: Array<'healthy' | 'warning' | 'critical'> = ['healthy', 'warning', 'critical'];
      
      return services.map((service, i) => ({
        service,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        uptime: Math.random() * 100,
        lastCheck: new Date(Date.now() - Math.random() * 300000).toISOString()
      }));
    };

    setPerformanceData(generatePerformanceData());
    setAlerts(generateAlerts());
    setServiceHealth(generateServiceHealth());
    setLoading(false);
  }, [timeRange]);

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    if (timeRange === '1h' || timeRange === '6h') {
      return date.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });
    } else if (timeRange === '24h') {
      return date.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString('it-IT', { month: 'short', day: 'numeric' });
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'error': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'info': return <CheckCircle className="h-4 w-4 text-blue-500" />;
      default: return <AlertTriangle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getHealthColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const chartData = performanceData.map(data => ({
    ...data,
    time: formatTimestamp(data.timestamp)
  }));

  const pieData = [
    { name: 'Healthy', value: serviceHealth.filter(s => s.status === 'healthy').length, color: '#10B981' },
    { name: 'Warning', value: serviceHealth.filter(s => s.status === 'warning').length, color: '#F59E0B' },
    { name: 'Critical', value: serviceHealth.filter(s => s.status === 'critical').length, color: '#EF4444' }
  ];

  if (loading) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Zap className="h-8 w-8 text-purple-600" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Monitoraggio Performance Cloud</h2>
              <p className="text-gray-600">Analytics in tempo reale dell'infrastruttura</p>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            Sviluppato da Andrea Piani - andrea.piani@email.com
          </div>
        </div>

        {/* Selettore metriche */}
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-gray-700">Metrica:</label>
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="cpuUsage">CPU Usage (%)</option>
            <option value="memoryUsage">Memory Usage (%)</option>
            <option value="diskUsage">Disk Usage (%)</option>
            <option value="responseTime">Response Time (ms)</option>
            <option value="errorRate">Error Rate (%)</option>
          </select>
        </div>
      </div>

      {/* Grafici principali */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Grafico lineare principale */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {selectedMetric === 'cpuUsage' && 'Utilizzo CPU'}
            {selectedMetric === 'memoryUsage' && 'Utilizzo Memoria'}
            {selectedMetric === 'diskUsage' && 'Utilizzo Disco'}
            {selectedMetric === 'responseTime' && 'Tempo di Risposta'}
            {selectedMetric === 'errorRate' && 'Tasso di Errore'}
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey={selectedMetric}
                stroke="#8B5CF6"
                fill="#8B5CF6"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Stato servizi */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Stato Servizi</h3>
          <div className="flex items-center justify-center mb-4">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2">
            {serviceHealth.map((service, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm font-medium text-gray-900">{service.service}</span>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getHealthColor(service.status)}`}>
                    {service.status}
                  </span>
                  <span className="text-xs text-gray-500">{service.uptime.toFixed(1)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Network Traffic */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Traffico di Rete</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="networkIn" stroke="#10B981" name="Network In (MB/s)" />
            <Line type="monotone" dataKey="networkOut" stroke="#F59E0B" name="Network Out (MB/s)" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Alert recenti */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Alert Recenti</h3>
        <div className="space-y-3">
          {alerts.slice(0, 6).map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded-lg border-l-4 cursor-pointer hover:bg-gray-50 ${
                alert.type === 'error' ? 'border-red-500 bg-red-50' :
                alert.type === 'warning' ? 'border-yellow-500 bg-yellow-50' :
                'border-blue-500 bg-blue-50'
              }`}
              onClick={() => onAlertClick?.(alert)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getAlertIcon(alert.type)}
                  <div>
                    <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                    <p className="text-xs text-gray-500">{alert.service}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {alert.resolved && (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  )}
                  <span className="text-xs text-gray-500">
                    {new Date(alert.timestamp).toLocaleString('it-IT')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CloudPerformanceMonitoring;

// Sviluppato da Andrea Piani - andrea.piani@email.com