import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  CreditCard, 
  PieChart, 
  BarChart3, 
  Calendar, 
  Download, 
  Filter,
  Eye,
  EyeOff,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  Target,
  Zap
} from 'lucide-react';

interface FinancialMetric {
  id: string;
  name: string;
  value: number;
  change: number;
  changeType: 'increase' | 'decrease';
  period: string;
  target?: number;
  currency: string;
  icon: React.ReactNode;
  color: string;
}

interface SpendingCategory {
  name: string;
  amount: number;
  percentage: number;
  change: number;
  color: string;
  icon: string;
}

interface Transaction {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  type: 'income' | 'expense';
  merchant?: string;
  location?: string;
}

const FinancialDashboard: React.FC = () => {
  const { t } = useTranslation();
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'quarter' | 'year'>('month');
  const [showBalance, setShowBalance] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const financialMetrics: FinancialMetric[] = [
    {
      id: 'total-balance',
      name: 'Saldo Totale',
      value: 2847500.75,
      change: 12.5,
      changeType: 'increase',
      period: 'vs mese scorso',
      currency: 'EUR',
      icon: <Wallet className="h-6 w-6" />,
      color: 'blue'
    },
    {
      id: 'monthly-revenue',
      name: 'Ricavi Mensili',
      value: 485200.30,
      change: 8.7,
      changeType: 'increase',
      period: 'vs mese scorso',
      target: 500000,
      currency: 'EUR',
      icon: <TrendingUp className="h-6 w-6" />,
      color: 'green'
    },
    {
      id: 'monthly-expenses',
      name: 'Spese Mensili',
      value: 125800.45,
      change: 3.2,
      changeType: 'increase',
      period: 'vs mese scorso',
      target: 120000,
      currency: 'EUR',
      icon: <ArrowDownRight className="h-6 w-6" />,
      color: 'red'
    },
    {
      id: 'profit-margin',
      name: 'Margine di Profitto',
      value: 74.1,
      change: 2.3,
      changeType: 'increase',
      period: 'vs mese scorso',
      target: 75,
      currency: '%',
      icon: <Target className="h-6 w-6" />,
      color: 'purple'
    }
  ];

  const spendingCategories: SpendingCategory[] = [
    {
      name: 'Commissioni Provider',
      amount: 45200,
      percentage: 35.9,
      change: -2.1,
      color: '#3B82F6',
      icon: '💳'
    },
    {
      name: 'Infrastruttura IT',
      amount: 28500,
      percentage: 22.7,
      change: 1.5,
      color: '#10B981',
      icon: '🖥️'
    },
    {
      name: 'Personale',
      amount: 32100,
      percentage: 25.5,
      change: 0.8,
      color: '#F59E0B',
      icon: '👥'
    },
    {
      name: 'Marketing',
      amount: 12000,
      percentage: 9.5,
      change: 15.2,
      color: '#EF4444',
      icon: '📢'
    },
    {
      name: 'Altro',
      amount: 8000,
      percentage: 6.4,
      change: -5.3,
      color: '#8B5CF6',
      icon: '📦'
    }
  ];

  const recentTransactions: Transaction[] = [
    {
      id: '1',
      description: 'Commissioni Visa Europe',
      amount: -2450.00,
      category: 'Commissioni Provider',
      date: '2024-01-20T14:30:00Z',
      type: 'expense',
      merchant: 'Visa Europe',
      location: 'Online'
    },
    {
      id: '2',
      description: 'Ricavi Transazioni POS',
      amount: 15750.25,
      category: 'Ricavi',
      date: '2024-01-20T12:15:00Z',
      type: 'income',
      merchant: 'Sistema POS',
      location: 'Milano'
    },
    {
      id: '3',
      description: 'Servizi Cloud AWS',
      amount: -890.50,
      category: 'Infrastruttura IT',
      date: '2024-01-20T09:45:00Z',
      type: 'expense',
      merchant: 'Amazon Web Services',
      location: 'Online'
    },
    {
      id: '4',
      description: 'Commissioni Mastercard',
      amount: -1850.75,
      category: 'Commissioni Provider',
      date: '2024-01-19T16:20:00Z',
      type: 'expense',
      merchant: 'Mastercard',
      location: 'Online'
    },
    {
      id: '5',
      description: 'Ricavi Carte Premium',
      amount: 8920.00,
      category: 'Ricavi',
      date: '2024-01-19T11:30:00Z',
      type: 'income',
      merchant: 'Sistema Carte',
      location: 'Roma'
    }
  ];

  const getMetricColor = (color: string) => {
    const colors = {
      blue: 'text-blue-600 bg-blue-100',
      green: 'text-green-600 bg-green-100',
      red: 'text-red-600 bg-red-100',
      purple: 'text-purple-600 bg-purple-100',
      yellow: 'text-yellow-600 bg-yellow-100'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const formatCurrency = (amount: number, currency: string = 'EUR') => {
    if (currency === '%') {
      return `${amount.toFixed(1)}%`;
    }
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Simulated chart data
  const generateChartData = () => {
    const days = 30;
    const data = [];
    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - (days - i));
      data.push({
        date: date.toISOString().split('T')[0],
        revenue: Math.random() * 20000 + 10000,
        expenses: Math.random() * 8000 + 3000,
        profit: 0
      });
    }
    data.forEach(item => {
      item.profit = item.revenue - item.expenses;
    });
    return data;
  };

  const chartData = generateChartData();
  const maxValue = Math.max(...chartData.map(d => Math.max(d.revenue, d.expenses)));

  const SimpleAreaChart: React.FC<{ data: any[]; height?: number }> = ({ data, height = 200 }) => {
    return (
      <div className="relative" style={{ height }}>
        <svg width="100%" height="100%" className="overflow-visible">
          {/* Revenue Area */}
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#EF4444" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#EF4444" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          
          {/* Revenue area */}
          <path
            d={`M 0,${height} ${data.map((d, i) => {
              const x = (i / (data.length - 1)) * 100;
              const y = height - (d.revenue / maxValue) * (height - 20);
              return `L ${x},${y}`;
            }).join(' ')} L 100,${height} Z`}
            fill="url(#revenueGradient)"
          />
          
          {/* Expense area */}
          <path
            d={`M 0,${height} ${data.map((d, i) => {
              const x = (i / (data.length - 1)) * 100;
              const y = height - (d.expenses / maxValue) * (height - 20);
              return `L ${x},${y}`;
            }).join(' ')} L 100,${height} Z`}
            fill="url(#expenseGradient)"
          />
          
          {/* Revenue line */}
          <path
            d={`M ${data.map((d, i) => {
              const x = (i / (data.length - 1)) * 100;
              const y = height - (d.revenue / maxValue) * (height - 20);
              return `${x},${y}`;
            }).join(' L ')}`}
            fill="none"
            stroke="#10B981"
            strokeWidth="2"
          />
          
          {/* Expense line */}
          <path
            d={`M ${data.map((d, i) => {
              const x = (i / (data.length - 1)) * 100;
              const y = height - (d.expenses / maxValue) * (height - 20);
              return `${x},${y}`;
            }).join(' L ')}`}
            fill="none"
            stroke="#EF4444"
            strokeWidth="2"
          />
        </svg>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Dashboard Finanziaria</h2>
          <p className="text-gray-600">Panoramica completa delle tue finanze aziendali</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex space-x-2">
            {['week', 'month', 'quarter', 'year'].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period as any)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  selectedPeriod === period
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {period === 'week' ? 'Settimana' :
                 period === 'month' ? 'Mese' :
                 period === 'quarter' ? 'Trimestre' : 'Anno'}
              </button>
            ))}
          </div>
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            <Download className="h-4 w-4" />
            <span>Esporta</span>
          </button>
        </div>
      </div>

      {/* Financial Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {financialMetrics.map((metric) => {
          const progressPercentage = metric.target ? (metric.value / metric.target) * 100 : 0;
          return (
            <div key={metric.id} className="bg-white p-6 rounded-lg shadow border hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg ${getMetricColor(metric.color)}`}>
                  {metric.icon}
                </div>
                <div className={`flex items-center space-x-1 ${
                  metric.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.changeType === 'increase' ? 
                    <TrendingUp className="h-4 w-4" /> : 
                    <TrendingDown className="h-4 w-4" />
                  }
                  <span className="text-sm font-medium">
                    {metric.changeType === 'increase' ? '+' : '-'}{Math.abs(metric.change)}%
                  </span>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-600">{metric.name}</h3>
                <div className="flex items-center space-x-2">
                  {metric.id === 'total-balance' && (
                    <button
                      onClick={() => setShowBalance(!showBalance)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      {showBalance ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    </button>
                  )}
                  <p className="text-2xl font-bold text-gray-900">
                    {metric.id === 'total-balance' && !showBalance 
                      ? '••••••' 
                      : formatCurrency(metric.value, metric.currency)
                    }
                  </p>
                </div>
                <p className="text-xs text-gray-500">{metric.period}</p>
                
                {metric.target && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>Target: {formatCurrency(metric.target, metric.currency)}</span>
                      <span>{progressPercentage.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          progressPercentage >= 100 ? 'bg-green-500' :
                          progressPercentage >= 75 ? 'bg-blue-500' :
                          progressPercentage >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue vs Expenses Chart */}
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Ricavi vs Spese</h3>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Ricavi</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>Spese</span>
              </div>
            </div>
          </div>
          <SimpleAreaChart data={chartData} height={250} />
        </div>

        {/* Spending Categories */}
        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-semibold mb-4">Categorie di Spesa</h3>
          <div className="space-y-4">
            {spendingCategories.map((category, index) => (
              <div 
                key={index} 
                className={`p-3 rounded-lg border cursor-pointer transition-all ${
                  selectedCategory === category.name 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedCategory(
                  selectedCategory === category.name ? null : category.name
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{category.icon}</span>
                    <div>
                      <h4 className="font-medium text-gray-900">{category.name}</h4>
                      <p className="text-sm text-gray-600">{category.percentage}% del totale</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      {formatCurrency(category.amount)}
                    </p>
                    <div className={`flex items-center space-x-1 text-sm ${
                      category.change >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {category.change >= 0 ? 
                        <TrendingUp className="h-3 w-3" /> : 
                        <TrendingDown className="h-3 w-3" />
                      }
                      <span>{Math.abs(category.change)}%</span>
                    </div>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full transition-all duration-300" 
                    style={{ 
                      width: `${category.percentage}%`,
                      backgroundColor: category.color
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg shadow border">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Transazioni Recenti</h3>
            <div className="flex items-center space-x-2">
              <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800">
                <Filter className="h-4 w-4" />
                <span className="text-sm">Filtra</span>
              </button>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                Vedi tutte
              </button>
            </div>
          </div>
        </div>
        
        <div className="divide-y divide-gray-200">
          {recentTransactions.map((transaction) => (
            <div key={transaction.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-full ${
                    transaction.type === 'income' 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-red-100 text-red-600'
                  }`}>
                    {transaction.type === 'income' ? 
                      <ArrowUpRight className="h-4 w-4" /> : 
                      <ArrowDownRight className="h-4 w-4" />
                    }
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{transaction.description}</h4>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span>{transaction.merchant}</span>
                      <span>•</span>
                      <span>{transaction.location}</span>
                      <span>•</span>
                      <span>{formatDate(transaction.date)}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${
                    transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'income' ? '+' : ''}{formatCurrency(transaction.amount)}
                  </p>
                  <p className="text-sm text-gray-600">{transaction.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FinancialDashboard;