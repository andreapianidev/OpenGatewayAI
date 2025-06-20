import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, ComposedChart, Area, AreaChart } from 'recharts';
import { DollarSign, TrendingUp, TrendingDown, AlertCircle, Calculator, PieChart as PieChartIcon, Target } from 'lucide-react';

// Tipi per la gestione dei costi
interface CostData {
  date: string;
  aws: number;
  azure: number;
  googleCloud: number;
  digitalOcean: number;
  total: number;
  forecast?: number;
}

interface ServiceCost {
  service: string;
  provider: string;
  category: 'compute' | 'storage' | 'network' | 'database' | 'security';
  currentCost: number;
  previousCost: number;
  trend: 'up' | 'down' | 'stable';
  percentage: number;
}

interface CostAlert {
  id: string;
  type: 'budget_exceeded' | 'unusual_spike' | 'optimization_opportunity';
  message: string;
  amount: number;
  service: string;
  severity: 'low' | 'medium' | 'high';
}

interface Budget {
  id: string;
  name: string;
  limit: number;
  spent: number;
  period: 'monthly' | 'quarterly' | 'yearly';
  alerts: number[];
}

interface CloudCostManagementProps {
  timeRange?: '7d' | '30d' | '90d' | '1y';
  onCostAlertClick?: (alert: CostAlert) => void;
  onOptimizationSuggestion?: (suggestion: string) => void;
}

const CloudCostManagement: React.FC<CloudCostManagementProps> = ({
  timeRange = '30d',
  onCostAlertClick,
  onOptimizationSuggestion
}) => {
  const [costData, setCostData] = useState<CostData[]>([]);
  const [serviceCosts, setServiceCosts] = useState<ServiceCost[]>([]);
  const [costAlerts, setCostAlerts] = useState<CostAlert[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [selectedView, setSelectedView] = useState<'overview' | 'services' | 'forecast'>('overview');
  const [loading, setLoading] = useState(true);

  // Simulazione dati di costo
  useEffect(() => {
    const generateCostData = (): CostData[] => {
      const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : timeRange === '90d' ? 90 : 365;
      const now = new Date();
      
      return Array.from({ length: days }, (_, i) => {
        const date = new Date(now.getTime() - (days - i - 1) * 24 * 60 * 60 * 1000);
        const baseAws = 150 + Math.random() * 100;
        const baseAzure = 120 + Math.random() * 80;
        const baseGcp = 100 + Math.random() * 60;
        const baseDo = 50 + Math.random() * 30;
        
        return {
          date: date.toISOString().split('T')[0],
          aws: baseAws,
          azure: baseAzure,
          googleCloud: baseGcp,
          digitalOcean: baseDo,
          total: baseAws + baseAzure + baseGcp + baseDo,
          forecast: i > days - 7 ? (baseAws + baseAzure + baseGcp + baseDo) * (1 + Math.random() * 0.1) : undefined
        };
      });
    };

    const generateServiceCosts = (): ServiceCost[] => {
      const services = [
        { name: 'EC2 Instances', provider: 'AWS', category: 'compute' as const },
        { name: 'RDS Database', provider: 'AWS', category: 'database' as const },
        { name: 'S3 Storage', provider: 'AWS', category: 'storage' as const },
        { name: 'Virtual Machines', provider: 'Azure', category: 'compute' as const },
        { name: 'Azure SQL', provider: 'Azure', category: 'database' as const },
        { name: 'Blob Storage', provider: 'Azure', category: 'storage' as const },
        { name: 'Compute Engine', provider: 'Google Cloud', category: 'compute' as const },
        { name: 'Cloud Storage', provider: 'Google Cloud', category: 'storage' as const },
        { name: 'Droplets', provider: 'Digital Ocean', category: 'compute' as const },
        { name: 'Spaces', provider: 'Digital Ocean', category: 'storage' as const }
      ];
      
      return services.map(service => {
        const currentCost = Math.random() * 500 + 50;
        const previousCost = currentCost * (0.8 + Math.random() * 0.4);
        const change = (currentCost - previousCost) / previousCost;
        
        return {
          service: service.name,
          provider: service.provider,
          category: service.category,
          currentCost,
          previousCost,
          trend: change > 0.05 ? 'up' : change < -0.05 ? 'down' : 'stable',
          percentage: Math.abs(change) * 100
        };
      });
    };

    const generateCostAlerts = (): CostAlert[] => {
      const alertTypes: Array<'budget_exceeded' | 'unusual_spike' | 'optimization_opportunity'> = [
        'budget_exceeded', 'unusual_spike', 'optimization_opportunity'
      ];
      const severities: Array<'low' | 'medium' | 'high'> = ['low', 'medium', 'high'];
      const services = ['AWS EC2', 'Azure VM', 'GCP Storage', 'DO Droplets', 'AWS RDS'];
      
      return Array.from({ length: 6 }, (_, i) => ({
        id: `alert-${i + 1}`,
        type: alertTypes[Math.floor(Math.random() * alertTypes.length)],
        message: `Costo anomalo rilevato per ${services[i % services.length]}`,
        amount: Math.random() * 1000 + 100,
        service: services[i % services.length],
        severity: severities[Math.floor(Math.random() * severities.length)]
      }));
    };

    const generateBudgets = (): Budget[] => {
      return [
        {
          id: 'budget-1',
          name: 'Budget Mensile AWS',
          limit: 2000,
          spent: 1650,
          period: 'monthly',
          alerts: [80, 90, 100]
        },
        {
          id: 'budget-2',
          name: 'Budget Trimestrale Azure',
          limit: 5000,
          spent: 3200,
          period: 'quarterly',
          alerts: [75, 90, 100]
        },
        {
          id: 'budget-3',
          name: 'Budget Annuale Multi-Cloud',
          limit: 25000,
          spent: 18500,
          period: 'yearly',
          alerts: [80, 90, 95]
        }
      ];
    };

    setCostData(generateCostData());
    setServiceCosts(generateServiceCosts());
    setCostAlerts(generateCostAlerts());
    setBudgets(generateBudgets());
    setLoading(false);
  }, [timeRange]);

  const totalCost = costData.reduce((sum, data) => sum + data.total, 0);
  const avgDailyCost = totalCost / costData.length;
  const projectedMonthlyCost = avgDailyCost * 30;

  const providerData = [
    { name: 'AWS', value: costData.reduce((sum, data) => sum + data.aws, 0), color: '#FF9900' },
    { name: 'Azure', value: costData.reduce((sum, data) => sum + data.azure, 0), color: '#0078D4' },
    { name: 'Google Cloud', value: costData.reduce((sum, data) => sum + data.googleCloud, 0), color: '#4285F4' },
    { name: 'Digital Ocean', value: costData.reduce((sum, data) => sum + data.digitalOcean, 0), color: '#0080FF' }
  ];

  const categoryData = serviceCosts.reduce((acc, service) => {
    const existing = acc.find(item => item.category === service.category);
    if (existing) {
      existing.cost += service.currentCost;
    } else {
      acc.push({ category: service.category, cost: service.currentCost });
    }
    return acc;
  }, [] as { category: string; cost: number }[]);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-red-500" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-green-500" />;
      default: return <div className="h-4 w-4" />;
    }
  };

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'border-red-500 bg-red-50';
      case 'medium': return 'border-yellow-500 bg-yellow-50';
      case 'low': return 'border-blue-500 bg-blue-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  if (loading) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
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
            <DollarSign className="h-8 w-8 text-green-600" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Gestione Costi Cloud</h2>
              <p className="text-gray-600">Monitoraggio e ottimizzazione dei costi multi-cloud</p>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            Sviluppato da Andrea Piani - andrea.piani@email.com
          </div>
        </div>

        {/* Navigation */}
        <div className="flex space-x-4">
          <button
            onClick={() => setSelectedView('overview')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              selectedView === 'overview'
                ? 'bg-green-100 text-green-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Panoramica
          </button>
          <button
            onClick={() => setSelectedView('services')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              selectedView === 'services'
                ? 'bg-green-100 text-green-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Servizi
          </button>
          <button
            onClick={() => setSelectedView('forecast')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              selectedView === 'forecast'
                ? 'bg-green-100 text-green-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Previsioni
          </button>
        </div>
      </div>

      {/* Metriche principali */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Costo Totale</p>
              <p className="text-2xl font-bold">${totalCost.toFixed(2)}</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Media Giornaliera</p>
              <p className="text-2xl font-bold">${avgDailyCost.toFixed(2)}</p>
            </div>
            <Calculator className="h-8 w-8 text-blue-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 rounded-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Proiezione Mensile</p>
              <p className="text-2xl font-bold">${projectedMonthlyCost.toFixed(2)}</p>
            </div>
            <Target className="h-8 w-8 text-purple-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 rounded-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100">Alert Attivi</p>
              <p className="text-2xl font-bold">{costAlerts.length}</p>
            </div>
            <AlertCircle className="h-8 w-8 text-orange-200" />
          </div>
        </div>
      </div>

      {selectedView === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Grafico costi nel tempo */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Andamento Costi</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={costData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tickFormatter={(date) => new Date(date).toLocaleDateString('it-IT', { month: 'short', day: 'numeric' })} />
                <YAxis />
                <Tooltip formatter={(value) => [`$${Number(value).toFixed(2)}`, 'Costo']} />
                <Area type="monotone" dataKey="total" stroke="#10B981" fill="#10B981" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Distribuzione per provider */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribuzione per Provider</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={providerData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {providerData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`$${Number(value).toFixed(2)}`, 'Costo']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {selectedView === 'services' && (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Costi per Servizio</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Servizio</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provider</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoria</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Costo Attuale</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trend</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Variazione</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {serviceCosts.map((service, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {service.service}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {service.provider}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                      {service.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${service.currentCost.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getTrendIcon(service.trend)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {service.percentage.toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selectedView === 'forecast' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Previsioni costi */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Previsioni Costi</h3>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={costData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tickFormatter={(date) => new Date(date).toLocaleDateString('it-IT', { month: 'short', day: 'numeric' })} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" fill="#10B981" name="Costo Effettivo" />
                <Line type="monotone" dataKey="forecast" stroke="#F59E0B" strokeDasharray="5 5" name="Previsione" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Budget status */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Stato Budget</h3>
            <div className="space-y-4">
              {budgets.map((budget) => {
                const percentage = (budget.spent / budget.limit) * 100;
                return (
                  <div key={budget.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{budget.name}</h4>
                      <span className="text-sm text-gray-500">{budget.period}</span>
                    </div>
                    <div className="mb-2">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>${budget.spent.toFixed(2)} spesi</span>
                        <span>${budget.limit.toFixed(2)} limite</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div
                          className={`h-2 rounded-full ${
                            percentage > 90 ? 'bg-red-500' : percentage > 75 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${Math.min(percentage, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      {percentage.toFixed(1)}% del budget utilizzato
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Alert costi */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Alert Costi</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {costAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded-lg border-l-4 cursor-pointer hover:bg-gray-50 ${getAlertColor(alert.severity)}`}
              onClick={() => onCostAlertClick?.(alert)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                  <p className="text-xs text-gray-500">{alert.service} - ${alert.amount.toFixed(2)}</p>
                </div>
                <AlertCircle className={`h-5 w-5 ${
                  alert.severity === 'high' ? 'text-red-500' :
                  alert.severity === 'medium' ? 'text-yellow-500' : 'text-blue-500'
                }`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CloudCostManagement;

// Sviluppato da Andrea Piani - andrea.piani@email.com