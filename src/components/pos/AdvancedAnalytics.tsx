import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  PieChart, 
  Activity, 
  Brain, 
  Target, 
  Zap,
  DollarSign,
  Users,
  CreditCard,
  Shield
} from 'lucide-react';

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    fill?: boolean;
  }[];
}

interface AIInsight {
  id: string;
  type: 'optimization' | 'risk' | 'opportunity' | 'trend';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  confidence: number;
  actionable: boolean;
  estimatedValue?: number;
}

interface PerformanceMetric {
  name: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  target: number;
  unit: string;
}

const AdvancedAnalytics: React.FC = () => {
  const { t } = useTranslation();
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [selectedMetric, setSelectedMetric] = useState<string>('revenue');
  const [aiInsights, setAiInsights] = useState<AIInsight[]>([]);

  // Simulated real-time data
  const [realtimeData, setRealtimeData] = useState({
    transactionsPerSecond: 0,
    activeUsers: 0,
    systemLoad: 0,
    responseTime: 0
  });

  // Performance metrics
  const performanceMetrics: PerformanceMetric[] = [
    {
      name: 'Revenue',
      value: 2847500,
      change: 12.5,
      trend: 'up',
      target: 3000000,
      unit: '€'
    },
    {
      name: 'Transactions',
      value: 125847,
      change: 8.3,
      trend: 'up',
      target: 150000,
      unit: ''
    },
    {
      name: 'Success Rate',
      value: 99.2,
      change: 0.5,
      trend: 'up',
      target: 99.5,
      unit: '%'
    },
    {
      name: 'Avg Response Time',
      value: 1.8,
      change: -0.3,
      trend: 'up',
      target: 1.5,
      unit: 's'
    },
    {
      name: 'Active Cards',
      value: 26700,
      change: 15.2,
      trend: 'up',
      target: 30000,
      unit: ''
    },
    {
      name: 'Fraud Rate',
      value: 0.03,
      change: -0.01,
      trend: 'up',
      target: 0.02,
      unit: '%'
    }
  ];

  // Chart data
  const revenueChartData: ChartData = {
    labels: ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'],
    datasets: [
      {
        label: 'Revenue 2024',
        data: [2100000, 2250000, 2400000, 2300000, 2600000, 2750000, 2850000, 2950000, 3100000, 3200000, 3350000, 3500000],
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true
      },
      {
        label: 'Revenue 2023',
        data: [1800000, 1900000, 2000000, 1950000, 2100000, 2200000, 2300000, 2400000, 2500000, 2600000, 2700000, 2800000],
        borderColor: '#E5E7EB',
        backgroundColor: 'rgba(229, 231, 235, 0.1)',
        fill: false
      }
    ]
  };

  const transactionVolumeData: ChartData = {
    labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
    datasets: [
      {
        label: 'Transazioni Oggi',
        data: [1200, 800, 3500, 5200, 4800, 3200],
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true
      }
    ]
  };

  const categoryBreakdownData = {
    labels: ['Shopping', 'Food & Dining', 'Transport', 'Entertainment', 'Bills', 'Other'],
    data: [35, 25, 15, 12, 8, 5],
    colors: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#6B7280']
  };

  // AI Insights
  useEffect(() => {
    const insights: AIInsight[] = [
      {
        id: '1',
        type: 'optimization',
        title: 'Ottimizzazione Commissioni Provider',
        description: 'Switching to Visa Europe for high-volume transactions could reduce costs by 15%',
        impact: 'high',
        confidence: 92,
        actionable: true,
        estimatedValue: 42750
      },
      {
        id: '2',
        type: 'risk',
        title: 'Anomalia Transazioni Notturne',
        description: 'Detected 23% increase in failed transactions between 2-4 AM. Possible system overload.',
        impact: 'medium',
        confidence: 87,
        actionable: true
      },
      {
        id: '3',
        type: 'opportunity',
        title: 'Crescita Segmento Premium',
        description: 'Premium card usage up 34%. Consider expanding premium features and benefits.',
        impact: 'high',
        confidence: 95,
        actionable: true,
        estimatedValue: 125000
      },
      {
        id: '4',
        type: 'trend',
        title: 'Trend Pagamenti Contactless',
        description: 'Contactless payments now represent 78% of all transactions, up from 65% last quarter.',
        impact: 'medium',
        confidence: 99,
        actionable: false
      }
    ];
    setAiInsights(insights);
  }, []);

  // Real-time data simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setRealtimeData({
        transactionsPerSecond: Math.floor(Math.random() * 50) + 20,
        activeUsers: Math.floor(Math.random() * 1000) + 5000,
        systemLoad: Math.floor(Math.random() * 30) + 40,
        responseTime: Math.random() * 2 + 1
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'optimization': return <Target className="h-5 w-5" />;
      case 'risk': return <Shield className="h-5 w-5" />;
      case 'opportunity': return <TrendingUp className="h-5 w-5" />;
      case 'trend': return <Activity className="h-5 w-5" />;
      default: return <Brain className="h-5 w-5" />;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'optimization': return 'text-blue-600 bg-blue-100';
      case 'risk': return 'text-red-600 bg-red-100';
      case 'opportunity': return 'text-green-600 bg-green-100';
      case 'trend': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const SimpleLineChart: React.FC<{ data: ChartData; height?: number }> = ({ data, height = 200 }) => {
    const maxValue = Math.max(...data.datasets.flatMap(d => d.data));
    
    return (
      <div className="relative" style={{ height }}>
        <svg width="100%" height="100%" className="overflow-visible">
          {data.datasets.map((dataset, datasetIndex) => {
            const points = dataset.data.map((value, index) => {
              const x = (index / (data.labels.length - 1)) * 100;
              const y = 100 - (value / maxValue) * 80;
              return `${x},${y}`;
            }).join(' ');
            
            return (
              <g key={datasetIndex}>
                {dataset.fill && (
                  <polygon
                    points={`0,100 ${points} 100,100`}
                    fill={dataset.backgroundColor}
                    opacity="0.3"
                  />
                )}
                <polyline
                  points={points}
                  fill="none"
                  stroke={dataset.borderColor}
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                />
                {dataset.data.map((value, index) => {
                  const x = (index / (data.labels.length - 1)) * 100;
                  const y = 100 - (value / maxValue) * 80;
                  return (
                    <circle
                      key={index}
                      cx={`${x}%`}
                      cy={`${y}%`}
                      r="3"
                      fill={dataset.borderColor}
                    />
                  );
                })}
              </g>
            );
          })}
        </svg>
        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 mt-2">
          {data.labels.map((label, index) => (
            <span key={index}>{label}</span>
          ))}
        </div>
      </div>
    );
  };

  const SimplePieChart: React.FC<{ data: any }> = ({ data }) => {
    const total = data.data.reduce((sum: number, value: number) => sum + value, 0);
    let currentAngle = 0;
    
    return (
      <div className="flex items-center space-x-6">
        <div className="relative">
          <svg width="200" height="200" className="transform -rotate-90">
            {data.data.map((value: number, index: number) => {
              const percentage = value / total;
              const angle = percentage * 360;
              const startAngle = currentAngle;
              const endAngle = currentAngle + angle;
              
              const x1 = 100 + 80 * Math.cos((startAngle * Math.PI) / 180);
              const y1 = 100 + 80 * Math.sin((startAngle * Math.PI) / 180);
              const x2 = 100 + 80 * Math.cos((endAngle * Math.PI) / 180);
              const y2 = 100 + 80 * Math.sin((endAngle * Math.PI) / 180);
              
              const largeArcFlag = angle > 180 ? 1 : 0;
              
              const pathData = [
                `M 100 100`,
                `L ${x1} ${y1}`,
                `A 80 80 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                'Z'
              ].join(' ');
              
              currentAngle += angle;
              
              return (
                <path
                  key={index}
                  d={pathData}
                  fill={data.colors[index]}
                  className="hover:opacity-80 transition-opacity"
                />
              );
            })}
          </svg>
        </div>
        <div className="space-y-2">
          {data.labels.map((label: string, index: number) => (
            <div key={index} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: data.colors[index] }}
              ></div>
              <span className="text-sm text-gray-700">{label}</span>
              <span className="text-sm font-semibold">{data.data[index]}%</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Advanced Analytics</h2>
          <p className="text-gray-600">AI-powered insights e analytics avanzati per il tuo business</p>
        </div>
        <div className="flex space-x-2">
          {['7d', '30d', '90d', '1y'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range as any)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                timeRange === range
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Real-time Metrics */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
          <Activity className="h-5 w-5 text-blue-600" />
          <span>Metriche in Tempo Reale</span>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Transazioni/sec</p>
                <p className="text-2xl font-bold text-blue-600">{realtimeData.transactionsPerSecond}</p>
              </div>
              <Zap className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Utenti Attivi</p>
                <p className="text-2xl font-bold text-green-600">{realtimeData.activeUsers.toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Carico Sistema</p>
                <p className="text-2xl font-bold text-yellow-600">{realtimeData.systemLoad}%</p>
              </div>
              <BarChart3 className="h-8 w-8 text-yellow-600" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tempo Risposta</p>
                <p className="text-2xl font-bold text-purple-600">{realtimeData.responseTime.toFixed(1)}s</p>
              </div>
              <Activity className="h-8 w-8 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {performanceMetrics.map((metric, index) => {
          const progressPercentage = (metric.value / metric.target) * 100;
          return (
            <div key={index} className="bg-white p-6 rounded-lg shadow border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">{metric.name}</h3>
                <div className={`flex items-center space-x-1 ${
                  metric.trend === 'up' ? 'text-green-600' : 
                  metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {metric.trend === 'up' ? <TrendingUp className="h-4 w-4" /> : 
                   metric.trend === 'down' ? <TrendingDown className="h-4 w-4" /> : 
                   <Activity className="h-4 w-4" />}
                  <span className="text-sm font-medium">
                    {metric.change > 0 ? '+' : ''}{metric.change}%
                  </span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-bold text-gray-900">
                    {metric.unit === '€' ? '€' : ''}
                    {metric.value.toLocaleString()}
                    {metric.unit !== '€' ? metric.unit : ''}
                  </span>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Target: {metric.unit === '€' ? '€' : ''}{metric.target.toLocaleString()}{metric.unit !== '€' ? metric.unit : ''}</span>
                    <span>{progressPercentage.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        progressPercentage >= 100 ? 'bg-green-500' :
                        progressPercentage >= 75 ? 'bg-blue-500' :
                        progressPercentage >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Trend Revenue</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>2024</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                <span>2023</span>
              </div>
            </div>
          </div>
          <SimpleLineChart data={revenueChartData} height={250} />
        </div>

        {/* Transaction Volume */}
        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-semibold mb-4">Volume Transazioni Oggi</h3>
          <SimpleLineChart data={transactionVolumeData} height={250} />
        </div>
      </div>

      {/* Category Breakdown and AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Breakdown */}
        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-semibold mb-4">Breakdown per Categoria</h3>
          <SimplePieChart data={categoryBreakdownData} />
        </div>

        {/* AI Insights */}
        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
            <Brain className="h-5 w-5 text-purple-600" />
            <span>AI Insights</span>
          </h3>
          <div className="space-y-4">
            {aiInsights.slice(0, 3).map((insight) => (
              <div key={insight.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className={`p-1 rounded-full ${getInsightColor(insight.type)}`}>
                      {getInsightIcon(insight.type)}
                    </div>
                    <h4 className="font-medium text-gray-900">{insight.title}</h4>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getImpactColor(insight.impact)}`}>
                      {insight.impact}
                    </span>
                    <span className="text-xs text-gray-500">{insight.confidence}%</span>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-2">{insight.description}</p>
                {insight.estimatedValue && (
                  <p className="text-sm font-medium text-green-600">
                    Valore stimato: €{insight.estimatedValue.toLocaleString()}
                  </p>
                )}
                {insight.actionable && (
                  <button className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Prendi Azione →
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedAnalytics;