import React, { useState } from 'react';
import { Calendar, Download, TrendingUp, BarChart3, PieChart, Filter, Users, CreditCard, AlertTriangle, CheckCircle, Clock, DollarSign, Target, Globe, Smartphone } from 'lucide-react';
import DashboardAIWidget from '../ai/DashboardAIWidget';
import TransactionChart from '../charts/TransactionChart';
import RevenueChart from '../charts/RevenueChart';
import MerchantPerformanceChart from '../charts/MerchantPerformanceChart';
import PaymentMethodsChart from '../charts/PaymentMethodsChart';
import GeographicChart from '../charts/GeographicChart';
import FraudDetectionChart from '../charts/FraudDetectionChart';
import CommissionAnalysisChart from '../charts/CommissionAnalysisChart';
import RealTimePerformanceChart from '../charts/RealTimePerformanceChart';

const ReportsAnalytics: React.FC = () => {
  const [dateRange, setDateRange] = useState('last30days');
  const [reportType, setReportType] = useState('overview');

  const reportData = {
    totalRevenue: 847320,
    totalTransactions: 12847,
    averageTicket: 65.92,
    successRate: 98.7,
    fraudRate: 0.12,
    activeDevices: 156,
    newMerchants: 23,
    chargeback: 0.08,
    topMerchants: [
      { name: 'Damascus Electronics', revenue: 125340, growth: 15.2, transactions: 1247, avgTicket: 100.51 },
      { name: 'Aleppo Fashion Store', revenue: 98450, growth: 8.7, transactions: 892, avgTicket: 110.38 },
      { name: 'Homs Restaurant', revenue: 87230, growth: 12.3, transactions: 1456, avgTicket: 59.91 },
      { name: 'Latakia Pharmacy', revenue: 76890, growth: 5.4, transactions: 734, avgTicket: 104.76 }
    ],
    paymentMethods: [
      { method: 'Carta di Credito', percentage: 45.2, transactions: 5803, volume: 382450 },
      { method: 'Carta di Debito', percentage: 32.8, transactions: 4214, volume: 278120 },
      { method: 'Contactless', percentage: 18.5, transactions: 2377, volume: 156780 },
      { method: 'Mobile Payment', percentage: 3.5, transactions: 453, volume: 29970 }
    ],
    timeDistribution: [
      { hour: '08:00', transactions: 234, revenue: 15680 },
      { hour: '10:00', transactions: 456, revenue: 30240 },
      { hour: '12:00', transactions: 789, revenue: 52030 },
      { hour: '14:00', transactions: 823, revenue: 54320 },
      { hour: '16:00', transactions: 901, revenue: 59470 },
      { hour: '18:00', transactions: 1234, revenue: 81450 },
      { hour: '20:00', transactions: 987, revenue: 65120 },
      { hour: '22:00', transactions: 567, revenue: 37410 }
    ],
    geographicData: [
      { city: 'Damascus', transactions: 4521, revenue: 298450, merchants: 45 },
      { city: 'Aleppo', transactions: 3234, revenue: 213670, merchants: 32 },
      { city: 'Homs', transactions: 2156, revenue: 142340, merchants: 28 },
      { city: 'Latakia', transactions: 1876, revenue: 123890, merchants: 24 },
      { city: 'Tartus', transactions: 1060, revenue: 69970, merchants: 15 }
    ],
    fraudMetrics: [
      { type: 'Transazioni Sospette', count: 15, percentage: 0.12 },
      { type: 'Carte Bloccate', count: 8, percentage: 0.06 },
      { type: 'Tentativi Multipli', count: 23, percentage: 0.18 },
      { type: 'Importi Anomali', count: 5, percentage: 0.04 }
    ],
    deviceMetrics: [
      { type: 'POS Android', count: 89, status: 'active', uptime: 99.2 },
      { type: 'Terminali Fissi', count: 45, status: 'active', uptime: 98.8 },
      { type: 'Mobile App', count: 22, status: 'active', uptime: 99.7 },
      { type: 'Web Portal', count: 156, status: 'active', uptime: 99.9 }
    ],
    performanceMetrics: {
      avgResponseTime: 1.2,
      uptime: 99.97,
      errorRate: 0.03,
      peakTPS: 450,
      dailyVolume: 125000
    }
  };

  const auditReports = [
    {
      title: 'Report Mensile Transazioni',
      description: 'Dettaglio completo delle transazioni del mese corrente',
      type: 'Transazioni',
      period: 'Gennaio 2024',
      status: 'Pronto',
      size: '2.4 MB'
    },
    {
      title: 'Report Commissioni e Ricavi',
      description: 'Analisi delle commissioni generate per merchant',
      type: 'Commissioni',
      period: 'Q4 2023',
      status: 'Pronto',
      size: '1.8 MB'
    },
    {
      title: 'Report Conformità PCI-DSS',
      description: 'Documentazione per audit di sicurezza',
      type: 'Compliance',
      period: 'Anno 2023',
      status: 'In Preparazione',
      size: '-'
    },
    {
      title: 'Report Performance Merchant',
      description: 'Analisi performance e metriche per categoria',
      type: 'Performance',
      period: 'Ultimo trimestre',
      status: 'Pronto',
      size: '3.1 MB'
    },
    {
      title: 'Report Antifrode',
      description: 'Analisi pattern sospetti e prevenzione frodi',
      type: 'Sicurezza',
      period: 'Ultimo mese',
      status: 'Pronto',
      size: '1.2 MB'
    },
    {
      title: 'Report Dispositivi e Terminali',
      description: 'Stato e performance dei dispositivi POS',
      type: 'Hardware',
      period: 'Tempo reale',
      status: 'Pronto',
      size: '890 KB'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Report & Analytics Avanzati</h1>
          <p className="text-gray-500 mt-1">Dashboard completa con analisi approfondite e intelligence operativa</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-gray-400" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="last7days">Ultimi 7 giorni</option>
              <option value="last30days">Ultimi 30 giorni</option>
              <option value="last3months">Ultimi 3 mesi</option>
              <option value="lastyear">Ultimo anno</option>
            </select>
          </div>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center space-x-2">
            <Download className="w-5 h-5" />
            <span>Esporta Report</span>
          </button>
        </div>
      </div>

      {/* AI Widget */}
      <DashboardAIWidget />

      {/* Report Type Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            <button
              onClick={() => setReportType('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                reportType === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5" />
                <span>Panoramica</span>
              </div>
            </button>
            <button
              onClick={() => setReportType('detailed')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                reportType === 'detailed'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>Analisi Dettagliate</span>
              </div>
            </button>
            <button
              onClick={() => setReportType('geographic')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                reportType === 'geographic'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Globe className="w-5 h-5" />
                <span>Analisi Geografica</span>
              </div>
            </button>
            <button
              onClick={() => setReportType('security')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                reportType === 'security'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5" />
                <span>Sicurezza & Frodi</span>
              </div>
            </button>
            <button
              onClick={() => setReportType('audit')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                reportType === 'audit'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <PieChart className="w-5 h-5" />
                <span>Report Istituzionali</span>
              </div>
            </button>
          </nav>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {reportType === 'overview' && (
            <div className="space-y-6">
              {/* Enhanced Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold">Ricavi Totali</h3>
                    <DollarSign className="w-8 h-8 opacity-80" />
                  </div>
                  <p className="text-3xl font-bold mb-1">€{reportData.totalRevenue.toLocaleString()}</p>
                  <p className="text-green-100 text-sm">+12.5% vs periodo precedente</p>
                </div>
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold">Transazioni</h3>
                    <CreditCard className="w-8 h-8 opacity-80" />
                  </div>
                  <p className="text-3xl font-bold mb-1">{reportData.totalTransactions.toLocaleString()}</p>
                  <p className="text-blue-100 text-sm">+8.2% vs periodo precedente</p>
                </div>
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold">Ticket Medio</h3>
                    <Target className="w-8 h-8 opacity-80" />
                  </div>
                  <p className="text-3xl font-bold mb-1">€{reportData.averageTicket}</p>
                  <p className="text-indigo-100 text-sm">+3.7% vs periodo precedente</p>
                </div>
                <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold">Tasso Successo</h3>
                    <CheckCircle className="w-8 h-8 opacity-80" />
                  </div>
                  <p className="text-3xl font-bold mb-1">{reportData.successRate}%</p>
                  <p className="text-orange-100 text-sm">-0.3% vs periodo precedente</p>
                </div>
              </div>

              {/* Additional KPIs */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-500">Dispositivi Attivi</h3>
                    <Smartphone className="w-5 h-5 text-gray-400" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{reportData.activeDevices}</p>
                  <p className="text-sm text-green-600">+5 questo mese</p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-500">Nuovi Merchant</h3>
                    <Users className="w-5 h-5 text-gray-400" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{reportData.newMerchants}</p>
                  <p className="text-sm text-green-600">+18% vs mese scorso</p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-500">Tasso Frodi</h3>
                    <AlertTriangle className="w-5 h-5 text-gray-400" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{reportData.fraudRate}%</p>
                  <p className="text-sm text-green-600">-0.02% vs media</p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-500">Chargeback</h3>
                    <Clock className="w-5 h-5 text-gray-400" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{reportData.chargeback}%</p>
                  <p className="text-sm text-green-600">Sotto soglia</p>
                </div>
              </div>

              {/* Enhanced Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Andamento Transazioni</h3>
                  <TransactionChart />
                </div>
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Ricavi Mensili</h3>
                  <RevenueChart />
                </div>
              </div>

              {/* New Advanced Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Analisi Commissioni</h3>
                    <div className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      Nuovo
                    </div>
                  </div>
                  <CommissionAnalysisChart />
                  <div className="mt-4 p-3 bg-white/50 rounded-lg">
                    <p className="text-sm text-gray-600">Breakdown dettagliato delle commissioni per tipologia e trend mensile</p>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Performance Real-Time</h3>
                    <div className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                      Live
                    </div>
                  </div>
                  <RealTimePerformanceChart />
                  <div className="mt-4 p-3 bg-white/50 rounded-lg">
                    <p className="text-sm text-gray-600">Monitoraggio in tempo reale di transazioni, tempi di risposta e tasso di successo</p>
                  </div>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Metriche di Performance Sistema</h3>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-500 mb-1">Tempo Risposta Medio</p>
                    <p className="text-2xl font-bold text-blue-600">{reportData.performanceMetrics.avgResponseTime}s</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500 mb-1">Uptime Sistema</p>
                    <p className="text-2xl font-bold text-green-600">{reportData.performanceMetrics.uptime}%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500 mb-1">Tasso Errori</p>
                    <p className="text-2xl font-bold text-orange-600">{reportData.performanceMetrics.errorRate}%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500 mb-1">Picco TPS</p>
                    <p className="text-2xl font-bold text-purple-600">{reportData.performanceMetrics.peakTPS}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500 mb-1">Volume Giornaliero</p>
                    <p className="text-2xl font-bold text-indigo-600">€{reportData.performanceMetrics.dailyVolume.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* Top Merchants Enhanced */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Merchant per Performance</h3>
                <div className="space-y-4">
                  {reportData.topMerchants.map((merchant, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{merchant.name}</p>
                          <p className="text-sm text-gray-500">{merchant.transactions} transazioni • Ticket medio: €{merchant.avgTicket}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">€{merchant.revenue.toLocaleString()}</p>
                        <p className="text-sm text-green-600">+{merchant.growth}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Detailed Analysis Tab */}
          {reportType === 'detailed' && (
            <div className="space-y-6">
              {/* Payment Methods Chart */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribuzione Metodi di Pagamento</h3>
                <PaymentMethodsChart />
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {reportData.paymentMethods.map((method, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 text-center">
                      <p className="text-sm font-medium text-gray-900">{method.method}</p>
                      <p className="text-2xl font-bold text-blue-600">{method.percentage}%</p>
                      <p className="text-xs text-gray-500">{method.transactions} txn</p>
                      <p className="text-xs text-gray-500">€{method.volume.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Time Distribution Enhanced */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribuzione Oraria Transazioni e Ricavi</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {reportData.timeDistribution.map((time, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 text-center">
                      <p className="text-sm text-gray-500 mb-1">{time.hour}</p>
                      <p className="text-xl font-bold text-gray-900">{time.transactions}</p>
                      <p className="text-xs text-gray-400">transazioni</p>
                      <p className="text-sm font-semibold text-green-600 mt-1">€{time.revenue.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Merchant Performance Chart */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Merchant nel Tempo</h3>
                <MerchantPerformanceChart />
              </div>

              {/* Device Status */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Stato Dispositivi e Terminali</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {reportData.deviceMetrics.map((device, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{device.type}</h4>
                        <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                      </div>
                      <p className="text-2xl font-bold text-gray-900 mb-1">{device.count}</p>
                      <p className="text-sm text-gray-500">Uptime: {device.uptime}%</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Geographic Analysis Tab */}
          {reportType === 'geographic' && (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribuzione Geografica</h3>
                <GeographicChart />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance per Città</h3>
                  <div className="space-y-4">
                    {reportData.geographicData.map((city, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{city.city}</p>
                          <p className="text-sm text-gray-500">{city.merchants} merchant • {city.transactions} transazioni</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">€{city.revenue.toLocaleString()}</p>
                          <p className="text-sm text-gray-500">€{Math.round(city.revenue / city.transactions)} avg</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Crescita Regionale</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <h4 className="font-medium text-green-900">Regione in Crescita</h4>
                      <p className="text-sm text-green-700 mt-1">Damascus: +25% nuovi merchant questo mese</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <h4 className="font-medium text-blue-900">Opportunità di Espansione</h4>
                      <p className="text-sm text-blue-700 mt-1">Tartus: potenziale per 40+ nuovi merchant</p>
                    </div>
                    <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                      <h4 className="font-medium text-yellow-900">Area da Monitorare</h4>
                      <p className="text-sm text-yellow-700 mt-1">Homs: calo 5% volume ultimo mese</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security & Fraud Tab */}
          {reportType === 'security' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-green-700">Transazioni Sicure</h3>
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="text-2xl font-bold text-green-900">99.88%</p>
                  <p className="text-sm text-green-600">+0.02% vs mese scorso</p>
                </div>
                <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-red-700">Tentativi Frode</h3>
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                  </div>
                  <p className="text-2xl font-bold text-red-900">51</p>
                  <p className="text-sm text-red-600">-12 vs mese scorso</p>
                </div>
                <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-yellow-700">Transazioni Bloccate</h3>
                    <Clock className="w-5 h-5 text-yellow-600" />
                  </div>
                  <p className="text-2xl font-bold text-yellow-900">23</p>
                  <p className="text-sm text-yellow-600">Revisione manuale</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-blue-700">Score Sicurezza</h3>
                    <Target className="w-5 h-5 text-blue-600" />
                  </div>
                  <p className="text-2xl font-bold text-blue-900">9.7/10</p>
                  <p className="text-sm text-blue-600">Eccellente</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Analisi Pattern Frodi</h3>
                <FraudDetectionChart />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Tipologie di Frode Rilevate</h3>
                  <div className="space-y-3">
                    {reportData.fraudMetrics.map((fraud, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{fraud.type}</p>
                          <p className="text-sm text-gray-500">{fraud.percentage}% del totale</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-red-600">{fraud.count}</p>
                          <p className="text-xs text-gray-500">casi</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Azioni di Sicurezza</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <h4 className="font-medium text-green-900">Sistema Antifrode Attivo</h4>
                      <p className="text-sm text-green-700 mt-1">Machine learning per rilevamento pattern sospetti</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <h4 className="font-medium text-blue-900">Monitoraggio 24/7</h4>
                      <p className="text-sm text-blue-700 mt-1">Alert automatici per transazioni anomale</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                      <h4 className="font-medium text-purple-900">Blacklist Dinamica</h4>
                      <p className="text-sm text-purple-700 mt-1">Aggiornamento automatico carte compromesse</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Audit Reports Tab */}
          {reportType === 'audit' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Report per Auditing Istituzionale</h3>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200">
                  Genera Nuovo Report
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {auditReports.map((report, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">{report.title}</h4>
                        <p className="text-sm text-gray-600 mb-3">{report.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>Tipo: {report.type}</span>
                          <span>Periodo: {report.period}</span>
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        report.status === 'Pronto' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {report.status}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Dimensione: {report.size}</span>
                      {report.status === 'Pronto' && (
                        <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-1">
                          <Download className="w-4 h-4" />
                          <span>Scarica</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-blue-900 mb-3">Conformità e Certificazioni</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-blue-800">PCI-DSS Level 1 Compliant</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-blue-800">EMV Level 2 Certified</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-blue-800">ISO 27001 Compliant</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm text-blue-800">Audit Banca Centrale - In Corso</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportsAnalytics;