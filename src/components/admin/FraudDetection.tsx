import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Shield, AlertTriangle, CheckCircle, Eye, Brain, Zap, Clock, MapPin, CreditCard, User, TrendingUp, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

interface FraudAlert {
  id: string;
  timestamp: Date;
  merchant: string;
  amount: number;
  riskScore: number;
  riskFactors: string[];
  status: 'pending' | 'investigating' | 'confirmed' | 'false_positive';
  location: string;
  paymentMethod: string;
  customerProfile: {
    isNewCustomer: boolean;
    previousTransactions: number;
    riskHistory: 'low' | 'medium' | 'high';
  };
  aiConfidence: number;
}

interface FraudPattern {
  pattern: string;
  frequency: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  trend: 'increasing' | 'decreasing' | 'stable';
  description: string;
}

const FraudDetection: React.FC = () => {
  const { t } = useTranslation();
  const [alerts, setAlerts] = useState<FraudAlert[]>([]);
  const [selectedAlert, setSelectedAlert] = useState<FraudAlert | null>(null);
  const [activeTab, setActiveTab] = useState<'alerts' | 'patterns' | 'analytics' | 'settings'>('alerts');

  // Fraud detection statistics
  const fraudStats = {
    totalAlerts: 47,
    confirmedFraud: 12,
    falsePositives: 8,
    underInvestigation: 27,
    accuracyRate: 94.2,
    amountSaved: 125000
  };

  // Fraud patterns data
  const fraudPatterns: FraudPattern[] = [
    {
      pattern: 'Velocity Fraud',
      frequency: 23,
      severity: 'high',
      trend: 'increasing',
      description: 'Multiple transactions in short time periods'
    },
    {
      pattern: 'Geographic Anomaly',
      frequency: 18,
      severity: 'medium',
      trend: 'stable',
      description: 'Transactions from unusual locations'
    },
    {
      pattern: 'Amount Pattern',
      frequency: 15,
      severity: 'medium',
      trend: 'decreasing',
      description: 'Unusual transaction amounts'
    },
    {
      pattern: 'Device Fingerprinting',
      frequency: 12,
      severity: 'critical',
      trend: 'increasing',
      description: 'Suspicious device characteristics'
    },
    {
      pattern: 'Behavioral Anomaly',
      frequency: 8,
      severity: 'high',
      trend: 'stable',
      description: 'Unusual customer behavior patterns'
    }
  ];

  // Generate sample fraud alerts
  useEffect(() => {
    const generateAlert = (): FraudAlert => {
      const merchants = ['Damascus Electronics', 'Aleppo Fashion', 'Homs Restaurant', 'Latakia Pharmacy', 'Tartus Market'];
      const locations = ['Damascus', 'Aleppo', 'Homs', 'Latakia', 'Tartus', 'Unknown', 'VPN Detected'];
      const paymentMethods = ['Visa ****1234', 'Mastercard ****5678', 'Mobile Wallet', 'Bank Transfer'];
      const riskFactors = [
        'High velocity transactions',
        'Geographic anomaly',
        'New payment method',
        'Unusual amount pattern',
        'Device fingerprint mismatch',
        'Behavioral anomaly',
        'IP reputation risk',
        'Time-based anomaly'
      ];
      
      const riskScore = Math.floor(Math.random() * 40) + 60; // 60-100 for fraud alerts
      const selectedFactors = riskFactors.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 4) + 2);
      
      return {
        id: `FA${Date.now()}${Math.floor(Math.random() * 1000)}`,
        timestamp: new Date(Date.now() - Math.random() * 86400000), // Last 24 hours
        merchant: merchants[Math.floor(Math.random() * merchants.length)],
        amount: Math.floor(Math.random() * 10000) + 500,
        riskScore,
        riskFactors: selectedFactors,
        status: ['pending', 'investigating', 'confirmed', 'false_positive'][Math.floor(Math.random() * 4)] as any,
        location: locations[Math.floor(Math.random() * locations.length)],
        paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
        customerProfile: {
          isNewCustomer: Math.random() > 0.7,
          previousTransactions: Math.floor(Math.random() * 50),
          riskHistory: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as any
        },
        aiConfidence: Math.floor(Math.random() * 20) + 80
      };
    };

    // Generate initial alerts
    const initialAlerts = Array.from({ length: 15 }, generateAlert);
    setAlerts(initialAlerts.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()));

    // Simulate real-time alerts
    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance of new alert
        const newAlert = generateAlert();
        setAlerts(prev => [newAlert, ...prev.slice(0, 19)]); // Keep last 20 alerts
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: FraudAlert['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'investigating': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'confirmed': return 'bg-red-100 text-red-800 border-red-200';
      case 'false_positive': return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  const getStatusIcon = (status: FraudAlert['status']) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'investigating': return <Eye className="w-4 h-4" />;
      case 'confirmed': return <AlertTriangle className="w-4 h-4" />;
      case 'false_positive': return <CheckCircle className="w-4 h-4" />;
    }
  };

  const getRiskColor = (score: number) => {
    if (score >= 90) return 'text-red-600 bg-red-100';
    if (score >= 75) return 'text-orange-600 bg-orange-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-green-600 bg-green-100';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  // Chart data
  const fraudTrendData = [
    { day: 'Mon', detected: 12, confirmed: 3, falsePositive: 2 },
    { day: 'Tue', detected: 8, confirmed: 2, falsePositive: 1 },
    { day: 'Wed', detected: 15, confirmed: 5, falsePositive: 3 },
    { day: 'Thu', detected: 10, confirmed: 2, falsePositive: 2 },
    { day: 'Fri', detected: 18, confirmed: 6, falsePositive: 4 },
    { day: 'Sat', detected: 14, confirmed: 4, falsePositive: 2 },
    { day: 'Sun', detected: 9, confirmed: 1, falsePositive: 1 }
  ];

  const COLORS = ['#EF4444', '#F59E0B', '#10B981', '#3B82F6'];

  return (
    <div className="space-y-6">
      {/* Header with Real-time Stats */}
      <div className="bg-gradient-to-r from-red-500 to-orange-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2 flex items-center">
              <Shield className="w-8 h-8 mr-3" />
              AI Fraud Detection System
              <div className="ml-3 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </h2>
            <p className="text-red-100">Advanced machine learning algorithms protecting your transactions 24/7</p>
          </div>
          <div className="text-right">
            <div className="bg-white/20 rounded-xl p-4">
              <p className="text-sm text-red-100">Amount Saved</p>
              <p className="text-3xl font-bold">€{fraudStats.amountSaved.toLocaleString()}</p>
              <p className="text-xs text-red-200">This month</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm font-semibold px-3 py-1 rounded-full bg-red-100 text-red-700">
              Active
            </span>
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">Total Alerts</h3>
          <p className="text-3xl font-bold text-gray-900">{fraudStats.totalAlerts}</p>
          <p className="text-sm text-gray-600">Last 24 hours</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm font-semibold px-3 py-1 rounded-full bg-orange-100 text-orange-700">
              Confirmed
            </span>
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">Fraud Blocked</h3>
          <p className="text-3xl font-bold text-gray-900">{fraudStats.confirmedFraud}</p>
          <p className="text-sm text-gray-600">Prevented losses</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm font-semibold px-3 py-1 rounded-full bg-green-100 text-green-700">
              AI Powered
            </span>
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">Accuracy Rate</h3>
          <p className="text-3xl font-bold text-gray-900">{fraudStats.accuracyRate}%</p>
          <p className="text-sm text-gray-600">Model performance</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm font-semibold px-3 py-1 rounded-full bg-blue-100 text-blue-700">
              Under Review
            </span>
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">Investigating</h3>
          <p className="text-3xl font-bold text-gray-900">{fraudStats.underInvestigation}</p>
          <p className="text-sm text-gray-600">Pending review</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl p-1 shadow-lg border border-gray-200">
        <div className="flex space-x-1">
          {[
            { key: 'alerts', label: 'Active Alerts', icon: AlertTriangle },
            { key: 'patterns', label: 'Fraud Patterns', icon: Brain },
            { key: 'analytics', label: 'Analytics', icon: Activity },
            { key: 'settings', label: 'AI Settings', icon: Zap }
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as any)}
              className={`flex items-center px-4 py-3 rounded-lg font-semibold transition-all ${
                activeTab === key
                  ? 'bg-red-500 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-4 h-4 mr-2" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'alerts' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-red-500 to-orange-600 p-4">
                <h3 className="text-lg font-bold text-white flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Active Fraud Alerts
                  <span className="ml-2 bg-white/20 px-2 py-1 rounded-full text-sm">
                    {alerts.filter(a => a.status === 'pending' || a.status === 'investigating').length}
                  </span>
                </h3>
              </div>
              <div className="p-4">
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {alerts.map((alert) => (
                    <div 
                      key={alert.id} 
                      className={`p-4 rounded-xl border cursor-pointer transition-all hover:shadow-md ${
                        selectedAlert?.id === alert.id ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedAlert(alert)}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(alert.status)}`}>
                            {getStatusIcon(alert.status)}
                            <span className="ml-1">{alert.status.replace('_', ' ').toUpperCase()}</span>
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getRiskColor(alert.riskScore)}`}>
                            Risk: {alert.riskScore}%
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">
                          {alert.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-gray-900">{alert.merchant}</p>
                          <p className="text-sm text-gray-600 flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {alert.location}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg text-gray-900">€{alert.amount.toLocaleString()}</p>
                          <p className="text-xs text-gray-500">{alert.paymentMethod}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            {selectedAlert && (
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
                <h4 className="font-bold text-gray-800 mb-4 flex items-center">
                  <Eye className="w-5 h-5 mr-2 text-blue-600" />
                  Alert Details
                </h4>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Transaction ID</p>
                    <p className="font-mono text-sm bg-gray-100 p-2 rounded">{selectedAlert.id}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Risk Factors</p>
                    <div className="space-y-1">
                      {selectedAlert.riskFactors.map((factor, index) => (
                        <span key={index} className="inline-block bg-red-100 text-red-700 text-xs px-2 py-1 rounded mr-1 mb-1">
                          {factor}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Customer Profile</p>
                    <div className="bg-gray-50 p-3 rounded-lg space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">New Customer</span>
                        <span className={`text-sm font-semibold ${
                          selectedAlert.customerProfile.isNewCustomer ? 'text-red-600' : 'text-green-600'
                        }`}>
                          {selectedAlert.customerProfile.isNewCustomer ? 'Yes' : 'No'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Previous Transactions</span>
                        <span className="text-sm font-semibold">{selectedAlert.customerProfile.previousTransactions}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Risk History</span>
                        <span className={`text-sm font-semibold capitalize ${
                          selectedAlert.customerProfile.riskHistory === 'high' ? 'text-red-600' :
                          selectedAlert.customerProfile.riskHistory === 'medium' ? 'text-yellow-600' : 'text-green-600'
                        }`}>
                          {selectedAlert.customerProfile.riskHistory}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-600 transition-colors">
                      Block Transaction
                    </button>
                    <button className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-600 transition-colors">
                      Approve
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
              <h4 className="font-bold text-gray-800 mb-4">AI Confidence</h4>
              <div className="text-center">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" stroke="#E5E7EB" strokeWidth="8" fill="none" />
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="40" 
                      stroke="#EF4444" 
                      strokeWidth="8" 
                      fill="none"
                      strokeDasharray={`${(selectedAlert?.aiConfidence || 0) * 2.51} 251`}
                      className="transition-all duration-500"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl font-bold text-gray-800">{selectedAlert?.aiConfidence || 0}%</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">Model Confidence Level</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'patterns' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {fraudPatterns.map((pattern, index) => (
              <div key={pattern.pattern} className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-gray-800">{pattern.pattern}</h4>
                  <div className={`w-3 h-3 rounded-full ${getSeverityColor(pattern.severity)}`}></div>
                </div>
                
                <p className="text-sm text-gray-600 mb-4">{pattern.description}</p>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Frequency</span>
                    <span className="font-bold">{pattern.frequency} cases</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Severity</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      pattern.severity === 'critical' ? 'bg-red-100 text-red-700' :
                      pattern.severity === 'high' ? 'bg-orange-100 text-orange-700' :
                      pattern.severity === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {pattern.severity.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Trend</span>
                    <span className={`font-semibold ${
                      pattern.trend === 'increasing' ? 'text-red-600' :
                      pattern.trend === 'decreasing' ? 'text-green-600' : 'text-gray-600'
                    }`}>
                      {pattern.trend}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Fraud Detection Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={fraudTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="detected" fill="#F59E0B" name="Detected" />
                <Bar dataKey="confirmed" fill="#EF4444" name="Confirmed" />
                <Bar dataKey="falsePositive" fill="#10B981" name="False Positive" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Alert Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'Confirmed Fraud', value: fraudStats.confirmedFraud, color: '#EF4444' },
                    { name: 'False Positives', value: fraudStats.falsePositives, color: '#10B981' },
                    { name: 'Under Investigation', value: fraudStats.underInvestigation, color: '#3B82F6' }
                  ]}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {[
                    { name: 'Confirmed Fraud', value: fraudStats.confirmedFraud, color: '#EF4444' },
                    { name: 'False Positives', value: fraudStats.falsePositives, color: '#10B981' },
                    { name: 'Under Investigation', value: fraudStats.underInvestigation, color: '#3B82F6' }
                  ].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <Brain className="w-5 h-5 mr-2 text-purple-600" />
              AI Model Configuration
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Risk Threshold</label>
                <input type="range" min="50" max="95" defaultValue="75" className="w-full" />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Low Sensitivity</span>
                  <span>High Sensitivity</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Auto-block Threshold</label>
                <input type="range" min="80" max="100" defaultValue="90" className="w-full" />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Manual Review</span>
                  <span>Auto Block</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" defaultChecked className="mr-2" />
                  <span className="text-sm">Real-time monitoring</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" defaultChecked className="mr-2" />
                  <span className="text-sm">Behavioral analysis</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" defaultChecked className="mr-2" />
                  <span className="text-sm">Geographic anomaly detection</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm">Device fingerprinting</span>
                </label>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Model Performance</h3>
            
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Accuracy Rate</span>
                  <span className="font-bold text-green-600">94.2%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '94.2%' }}></div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Precision</span>
                  <span className="font-bold text-blue-600">91.8%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '91.8%' }}></div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Recall</span>
                  <span className="font-bold text-purple-600">96.5%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '96.5%' }}></div>
                </div>
              </div>
              
              <button className="w-full bg-purple-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-purple-600 transition-colors">
                Retrain Model
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FraudDetection;