import React, { useState, useCallback, useEffect } from 'react';
import { MapPin, Store, TrendingUp, Users, Search, Filter, Eye, BarChart3, Activity, DollarSign, Clock, Navigation, Zap, Download, RefreshCw, AlertTriangle, CheckCircle, XCircle, Settings, Plus, Edit, Trash2, Phone, Mail, Calendar, Target, TrendingDown, Grid, ArrowUpDown, MoreVertical, CreditCard, Shield, AlertCircle, Info, Brain, X } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

interface POILocation {
  id: string;
  name: string;
  address: string;
  city: string;
  region: string;
  lat: number;
  lng: number;
  transactions: number;
  revenue: number;
  status: 'active' | 'inactive' | 'maintenance';
  category: string;
  lastActivity: string;
  averageTransaction: number;
  monthlyGrowth: number;
  riskLevel: 'low' | 'medium' | 'high';
  manager: string;
  phone: string;
}

const MerchantLocationsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'active' | 'inactive' | 'maintenance'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRisk, setSelectedRisk] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'revenue' | 'transactions' | 'growth'>('revenue');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedLocation, setSelectedLocation] = useState<POILocation | null>(null);
  const [viewMode, setViewMode] = useState<'map' | 'list' | 'analytics'>('map');
  const [showExportModal, setShowExportModal] = useState(false);
  const [notifications, setNotifications] = useState<Array<{id: string, type: 'success' | 'warning' | 'error', message: string}>>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [locations, setLocations] = useState<POILocation[]>([
    {
      id: '1',
      name: 'TechStore Milano Centro',
      address: 'Via Dante 15',
      city: 'Milano',
      region: 'Lombardia',
      lat: 45.4642,
      lng: 9.1900,
      transactions: 1250,
      revenue: 87200,
      status: 'active',
      category: 'Electronics',
      lastActivity: '2 minutes ago',
      averageTransaction: 69.76,
      monthlyGrowth: 12.5,
      riskLevel: 'low',
      manager: 'Marco Rossi',
      phone: '+39 02 1234567'
    },
    {
      id: '2',
      name: 'Fashion Boutique Roma',
      address: 'Via del Corso 123',
      city: 'Roma',
      region: 'Lazio',
      lat: 41.9028,
      lng: 12.4964,
      transactions: 890,
      revenue: 65400,
      status: 'active',
      category: 'Fashion',
      lastActivity: '5 minutes ago',
      averageTransaction: 73.48,
      monthlyGrowth: 8.3,
      riskLevel: 'low',
      manager: 'Giulia Bianchi',
      phone: '+39 06 7654321'
    },
    {
      id: '3',
      name: 'Caffè Centrale Napoli',
      address: 'Piazza del Plebiscito 1',
      city: 'Napoli',
      region: 'Campania',
      lat: 40.8518,
      lng: 14.2681,
      transactions: 2100,
      revenue: 45600,
      status: 'active',
      category: 'Food & Beverage',
      lastActivity: '1 minute ago',
      averageTransaction: 21.71,
      monthlyGrowth: 15.2,
      riskLevel: 'medium',
      manager: 'Antonio Verde',
      phone: '+39 081 9876543'
    },
    {
      id: '4',
      name: 'Libreria Firenze',
      address: 'Via dei Calzaiuoli 45',
      city: 'Firenze',
      region: 'Toscana',
      lat: 43.7696,
      lng: 11.2558,
      transactions: 420,
      revenue: 28900,
      status: 'maintenance',
      category: 'Books & Media',
      lastActivity: '2 hours ago',
      averageTransaction: 68.81,
      monthlyGrowth: -2.1,
      riskLevel: 'low',
      manager: 'Elena Neri',
      phone: '+39 055 1122334'
    },
    {
      id: '5',
      name: 'Farmacia Torino',
      address: 'Corso Francia 89',
      city: 'Torino',
      region: 'Piemonte',
      lat: 45.0703,
      lng: 7.6869,
      transactions: 1680,
      revenue: 125300,
      status: 'active',
      category: 'Healthcare',
      lastActivity: '30 seconds ago',
      averageTransaction: 74.58,
      monthlyGrowth: 6.7,
      riskLevel: 'low',
      manager: 'Dott. Luigi Gialli',
      phone: '+39 011 5566778'
    },
    {
      id: '6',
      name: 'Supermercato Bologna',
      address: 'Via Indipendenza 67',
      city: 'Bologna',
      region: 'Emilia-Romagna',
      lat: 44.4949,
      lng: 11.3426,
      transactions: 3200,
      revenue: 156800,
      status: 'active',
      category: 'Retail',
      lastActivity: '45 seconds ago',
      averageTransaction: 49.00,
      monthlyGrowth: 9.8,
      riskLevel: 'low',
      manager: 'Francesca Blu',
      phone: '+39 051 9988776'
    },
    {
      id: '7',
      name: 'Gioielleria Venezia',
      address: 'Piazza San Marco 78',
      city: 'Venezia',
      region: 'Veneto',
      lat: 45.4341,
      lng: 12.3387,
      transactions: 180,
      revenue: 89400,
      status: 'inactive',
      category: 'Jewelry',
      lastActivity: '3 days ago',
      averageTransaction: 496.67,
      monthlyGrowth: -5.2,
      riskLevel: 'high',
      manager: 'Alessandro Oro',
      phone: '+39 041 2233445'
    }
  ]);

  const [regionStats] = useState([
    { region: 'Lombardia', stores: 15, revenue: 245000, growth: 12.5 },
    { region: 'Lazio', stores: 12, revenue: 198000, growth: 8.3 },
    { region: 'Campania', stores: 8, revenue: 156000, growth: 15.2 },
    { region: 'Toscana', stores: 6, revenue: 134000, growth: 6.1 },
    { region: 'Piemonte', stores: 7, revenue: 167000, growth: 9.4 },
    { region: 'Emilia-Romagna', stores: 5, revenue: 123000, growth: 11.2 },
    { region: 'Veneto', stores: 4, revenue: 98000, growth: 4.8 }
  ]);

  const [performanceData] = useState([
    { month: 'Gen', revenue: 420000, transactions: 8500, stores: 52 },
    { month: 'Feb', revenue: 445000, transactions: 9200, stores: 54 },
    { month: 'Mar', revenue: 478000, transactions: 9800, stores: 56 },
    { month: 'Apr', revenue: 512000, transactions: 10500, stores: 57 },
    { month: 'Mag', revenue: 548000, transactions: 11200, stores: 57 },
    { month: 'Giu', revenue: 587000, transactions: 12100, stores: 57 }
  ]);

  const filteredLocations = locations
    .filter(location => {
      const matchesSearch = location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           location.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           location.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           location.manager.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = selectedFilter === 'all' || location.status === selectedFilter;
      const matchesCategory = selectedCategory === 'all' || location.category === selectedCategory;
      const matchesRisk = selectedRisk === 'all' || location.riskLevel === selectedRisk;
      return matchesSearch && matchesFilter && matchesCategory && matchesRisk;
    })
    .sort((a, b) => {
      let aValue, bValue;
      switch (sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'revenue':
          aValue = a.revenue;
          bValue = b.revenue;
          break;
        case 'transactions':
          aValue = a.transactions;
          bValue = b.transactions;
          break;
        case 'growth':
          aValue = a.monthlyGrowth;
          bValue = b.monthlyGrowth;
          break;
        default:
          return 0;
      }
      
      if (typeof aValue === 'string') {
        return sortOrder === 'asc' ? aValue.localeCompare(bValue as string) : (bValue as string).localeCompare(aValue);
      } else {
        return sortOrder === 'asc' ? (aValue as number) - (bValue as number) : (bValue as number) - (aValue as number);
      }
    });

  const activeLocations = locations.filter(loc => loc.status === 'active');
  const totalRevenue = locations.reduce((sum, loc) => sum + loc.revenue, 0);
  const totalTransactions = locations.reduce((sum, loc) => sum + loc.transactions, 0);
  const averageGrowth = locations.reduce((sum, loc) => sum + loc.monthlyGrowth, 0) / locations.length;
  const categories = Array.from(new Set(locations.map(l => l.category)));
  const riskLevels = ['low', 'medium', 'high'];

  // Utility functions
  const addNotification = (type: 'success' | 'warning' | 'error', message: string) => {
    const id = Date.now().toString();
    setNotifications(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  const refreshData = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    addNotification('success', 'Data refreshed successfully');
    setIsRefreshing(false);
  };

  const exportData = useCallback((format: 'csv' | 'excel' | 'pdf') => {
    // Simulate export functionality
    addNotification('success', `Data exported as ${format.toUpperCase()}`);
    setShowExportModal(false);
  }, []);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setLocations(prev => prev.map(loc => ({
        ...loc,
        transactions: loc.status === 'active' ? loc.transactions + Math.floor(Math.random() * 3) : loc.transactions,
        revenue: loc.status === 'active' ? loc.revenue + Math.floor(Math.random() * 500) : loc.revenue
      })));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'inactive': return 'bg-red-500';
      case 'maintenance': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'high': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map(notification => (
          <div key={notification.id} className={`p-4 rounded-lg shadow-lg border-l-4 bg-white ${
            notification.type === 'success' ? 'border-green-500' :
            notification.type === 'warning' ? 'border-yellow-500' :
            'border-red-500'
          } animate-slide-in`}>
            <div className="flex items-center space-x-2">
              {notification.type === 'success' && <CheckCircle className="w-5 h-5 text-green-500" />}
              {notification.type === 'warning' && <AlertTriangle className="w-5 h-5 text-yellow-500" />}
              {notification.type === 'error' && <XCircle className="w-5 h-5 text-red-500" />}
              <span className="text-sm font-medium text-gray-900">{notification.message}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Merchant Locations</h1>
            <p className="text-gray-600 mt-1">Gestione completa delle sedi dei merchant con analytics avanzate</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-600 font-medium">Live Updates</span>
            </div>
            <button
              onClick={refreshData}
              disabled={isRefreshing}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
            </button>
            <button
              onClick={() => setShowExportModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Locations</p>
                <p className="text-2xl font-bold text-gray-900">{locations.length}</p>
                <p className="text-xs text-green-600 mt-1">+{activeLocations.length} active</p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <Store className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">€{totalRevenue.toLocaleString()}</p>
                <p className="text-xs text-green-600 mt-1">+{averageGrowth.toFixed(1)}% growth</p>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Transactions</p>
                <p className="text-2xl font-bold text-gray-900">{totalTransactions.toLocaleString()}</p>
                <p className="text-xs text-blue-600 mt-1">Real-time</p>
              </div>
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Transaction</p>
                <p className="text-2xl font-bold text-gray-900">€{(totalRevenue / totalTransactions).toFixed(2)}</p>
                <p className="text-xs text-yellow-600 mt-1">Per transaction</p>
              </div>
              <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Controls */}
        <div className="space-y-4 mb-6">
          {/* Search and Primary Filters */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search locations, cities, managers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-80"
                />
              </div>
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
            
            {/* Sort Controls */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value="revenue">Revenue</option>
                <option value="transactions">Transactions</option>
                <option value="growth">Growth</option>
                <option value="name">Name</option>
              </select>
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {sortOrder === 'asc' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              </button>
            </div>
          </div>
          
          {/* Advanced Filters */}
          <div className="flex flex-wrap items-center gap-4 p-4 bg-white rounded-lg border border-gray-200">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Advanced Filters:</span>
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            <select
              value={selectedRisk}
              onChange={(e) => setSelectedRisk(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="all">All Risk Levels</option>
              {riskLevels.map(risk => (
                <option key={risk} value={risk}>{risk.charAt(0).toUpperCase() + risk.slice(1)} Risk</option>
              ))}
            </select>
            
            {/* Clear Filters */}
            {(selectedCategory !== 'all' || selectedRisk !== 'all' || searchTerm) && (
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedRisk('all');
                  setSearchTerm('');
                }}
                className="px-3 py-1 text-sm text-red-600 hover:text-red-800 transition-colors"
              >
                Clear Filters
              </button>
            )}
            
            <div className="ml-auto text-sm text-gray-600">
              Showing {filteredLocations.length} of {locations.length} locations
            </div>
          </div>
         </div>
         
         {/* View Mode Selector */}
         <div className="mb-6">
           <div className="flex items-center justify-between">
             <div className="flex items-center space-x-2">
               <button
                 onClick={() => setViewMode('map')}
                 className={`px-4 py-2 rounded-lg transition-colors ${viewMode === 'map' ? 'bg-blue-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
               >
                 <MapPin className="w-4 h-4 inline mr-2" />
                 Map View
               </button>
               <button
                 onClick={() => setViewMode('list')}
                 className={`px-4 py-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
               >
                 <Eye className="w-4 h-4 inline mr-2" />
                 List View
               </button>
               <button
                 onClick={() => setViewMode('analytics')}
                 className={`px-4 py-2 rounded-lg transition-colors ${viewMode === 'analytics' ? 'bg-blue-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
               >
                 <BarChart3 className="w-4 h-4 inline mr-2" />
                 Analytics
               </button>
             </div>
             
             {/* Quick Actions */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('map')}
                  className="px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Target className="w-4 h-4 inline mr-1" />
                  Focus
                </button>
                <button
                  onClick={refreshData}
                  disabled={isRefreshing}
                  className="px-3 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors disabled:opacity-50"
                >
                  <RefreshCw className={`w-4 h-4 inline mr-1 ${isRefreshing ? 'animate-spin' : ''}`} />
                  Refresh
                </button>
              </div>
            </div>
          </div>
      </div>

      {/* Content based on view mode */}
      {viewMode === 'map' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Enhanced Map View */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Interactive Map</h3>
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
                    <Activity className="w-4 h-4 inline mr-1" />
                    Live Data
                  </button>
                </div>
              </div>
              <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg h-96 overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                
                {/* Map Markers */}
                {filteredLocations.map((location, index) => (
                  <div
                    key={location.id}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group`}
                    style={{
                      left: `${15 + (index * 12) % 70}%`,
                      top: `${20 + (index * 15) % 60}%`
                    }}
                    onClick={() => setSelectedLocation(location)}
                  >
                    <div className={`w-6 h-6 rounded-full border-3 border-white shadow-lg transition-all duration-200 group-hover:scale-125 ${getStatusColor(location.status)}`}>
                      <div className="w-full h-full rounded-full animate-pulse opacity-50"></div>
                    </div>
                    
                    {/* Enhanced Tooltip */}
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-xl p-4 min-w-64 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 border">
                      <div className="flex items-center space-x-2 mb-3">
                        <Store className="w-5 h-5 text-blue-500" />
                        <p className="font-semibold text-gray-900">{location.name}</p>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${getRiskColor(location.riskLevel)}`}>
                          {location.riskLevel.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{location.address}, {location.city}</p>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Revenue:</span>
                          <span className="font-semibold text-green-600">€{location.revenue.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Transactions:</span>
                          <span className="font-semibold text-blue-600">{location.transactions}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Growth:</span>
                          <span className={`font-semibold ${location.monthlyGrowth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {location.monthlyGrowth > 0 ? '+' : ''}{location.monthlyGrowth}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Avg Transaction:</span>
                          <span className="font-semibold text-purple-600">€{location.averageTransaction.toFixed(2)}</span>
                        </div>
                      </div>
                      <div className="mt-2 pt-2 border-t border-gray-100">
                        <p className="text-xs text-gray-500">Manager: {location.manager}</p>
                        <p className="text-xs text-gray-500">Last Activity: {location.lastActivity}</p>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Map Controls */}
                <div className="absolute top-4 right-4 flex flex-col space-y-2">
                  <button className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors">
                    <span className="text-lg font-bold text-gray-600">+</span>
                  </button>
                  <button className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors">
                    <span className="text-lg font-bold text-gray-600">-</span>
                  </button>
                  <button className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors">
                    <Navigation className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-md p-3">
                  <div className="flex items-center space-x-4 text-xs">
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-gray-600">Active</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-gray-600">Maintenance</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-gray-600">Inactive</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Location Details Sidebar */}
          <div className="space-y-6">
            {selectedLocation ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Location Details</h3>
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${getRiskColor(selectedLocation.riskLevel)}`}>
                    {selectedLocation.riskLevel.toUpperCase()} RISK
                  </span>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 text-lg">{selectedLocation.name}</h4>
                    <p className="text-gray-600">{selectedLocation.address}</p>
                    <p className="text-gray-600">{selectedLocation.city}, {selectedLocation.region}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-50 rounded-lg p-3">
                      <p className="text-sm text-gray-600">Revenue</p>
                      <p className="text-xl font-bold text-green-600">€{selectedLocation.revenue.toLocaleString()}</p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3">
                      <p className="text-sm text-gray-600">Transactions</p>
                      <p className="text-xl font-bold text-blue-600">{selectedLocation.transactions}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Category:</span>
                      <span className="font-medium">{selectedLocation.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className={`font-medium capitalize ${
                        selectedLocation.status === 'active' ? 'text-green-600' :
                        selectedLocation.status === 'maintenance' ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {selectedLocation.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monthly Growth:</span>
                      <span className={`font-medium ${
                        selectedLocation.monthlyGrowth > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {selectedLocation.monthlyGrowth > 0 ? '+' : ''}{selectedLocation.monthlyGrowth}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Avg Transaction:</span>
                      <span className="font-medium">€{selectedLocation.averageTransaction.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Manager:</span>
                      <span className="font-medium">{selectedLocation.manager}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Phone:</span>
                      <span className="font-medium">{selectedLocation.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Last Activity:</span>
                      <span className="font-medium text-green-600">{selectedLocation.lastActivity}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="text-center py-8">
                  <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Click on a location marker to view details</p>
                </div>
              </div>
            )}

            {/* Regional Performance */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Regional Performance</h3>
              <div className="space-y-3">
                {regionStats.slice(0, 5).map((region, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{region.region}</p>
                      <p className="text-sm text-gray-600">{region.stores} stores</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">€{region.revenue.toLocaleString()}</p>
                      <p className={`text-sm ${region.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {region.growth > 0 ? '+' : ''}{region.growth}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {viewMode === 'list' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          {/* Enhanced List Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Locations List</h3>
                <p className="text-gray-600 mt-1">Showing {filteredLocations.length} of {locations.length} locations</p>
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  <Grid className="w-4 h-4 inline mr-1" />
                  Columns
                </button>
                <button className="px-3 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
                  <Download className="w-4 h-4 inline mr-1" />
                  Export
                </button>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button className="flex items-center space-x-1 hover:text-gray-700 transition-colors">
                      <span>Location</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button className="flex items-center space-x-1 hover:text-gray-700 transition-colors">
                      <span>Revenue</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button className="flex items-center space-x-1 hover:text-gray-700 transition-colors">
                      <span>Transactions</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button className="flex items-center space-x-1 hover:text-gray-700 transition-colors">
                      <span>Growth</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Activity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLocations.map((location) => (
                  <tr key={location.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                            location.status === 'active' ? 'bg-green-100' :
                            location.status === 'inactive' ? 'bg-red-100' :
                            'bg-yellow-100'
                          }`}>
                            <MapPin className={`h-5 w-5 ${
                              location.status === 'active' ? 'text-green-600' :
                              location.status === 'inactive' ? 'text-red-600' :
                              'text-yellow-600'
                            }`} />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{location.name}</div>
                          <div className="text-sm text-gray-500">{location.city}, {location.region}</div>
                          <div className="text-xs text-gray-400">{location.category}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          location.status === 'active' ? 'bg-green-100 text-green-800' :
                          location.status === 'maintenance' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {location.status}
                        </span>
                        {location.status === 'active' && (
                          <div className="ml-2 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        €{location.revenue.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500">
                        vs target: {((location.revenue / 50000) * 100).toFixed(0)}%
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {location.transactions.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500">
                        avg: €{(location.revenue / location.transactions).toFixed(2)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className={`text-sm font-medium ${
                          location.monthlyGrowth > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {location.monthlyGrowth > 0 ? '+' : ''}{location.monthlyGrowth}%
                        </span>
                        {location.monthlyGrowth > 0 ? (
                          <TrendingUp className="ml-1 w-4 h-4 text-green-500" />
                        ) : (
                          <TrendingDown className="ml-1 w-4 h-4 text-red-500" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRiskColor(location.riskLevel)}`}>
                          {location.riskLevel}
                        </span>
                        {location.riskLevel === 'high' && (
                          <AlertTriangle className="ml-1 w-4 h-4 text-red-500" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              location.monthlyGrowth >= 10 ? 'bg-green-500' :
                              location.monthlyGrowth >= 0 ? 'bg-yellow-500' :
                              'bg-red-500'
                            }`}
                            style={{ width: `${Math.min(Math.max((location.monthlyGrowth + 20) * 2.5, 0), 100)}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500">
                          {location.monthlyGrowth >= 10 ? 'Excellent' :
                           location.monthlyGrowth >= 0 ? 'Good' : 'Poor'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>{location.lastActivity}</div>
                      <div className="text-xs text-gray-400">
                        {Math.floor(Math.random() * 24)}h ago
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setSelectedLocation(location)}
                          className="text-blue-600 hover:text-blue-900 transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          className="text-gray-400 hover:text-gray-600 transition-colors"
                          title="More Actions"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Enhanced Pagination */}
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredLocations.length}</span> of{' '}
                <span className="font-medium">{locations.length}</span> results
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  Previous
                </button>
                <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg">
                  1
                </button>
                <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {viewMode === 'analytics' && (
        <div className="space-y-6">
          {/* Analytics Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Advanced Analytics Dashboard</h2>
                <p className="text-blue-100">Real-time insights and performance metrics</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">98.5%</div>
                  <div className="text-sm text-blue-100">Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">€2.1M</div>
                  <div className="text-sm text-blue-100">Total Volume</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">15.2%</div>
                  <div className="text-sm text-blue-100">Growth</div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Performance Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Locations</p>
                  <p className="text-2xl font-bold text-gray-900">{locations.filter(l => l.status === 'active').length}</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +12% vs last month
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <MapPin className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg Transaction Value</p>
                  <p className="text-2xl font-bold text-gray-900">€{(() => {
                    const totalTransactions = locations.reduce((sum, l) => sum + l.transactions, 0);
                    const totalRevenue = locations.reduce((sum, l) => sum + l.revenue, 0);
                    return totalTransactions > 0 ? (totalRevenue / totalTransactions).toFixed(2) : '0.00';
                  })()}</p>
                  <p className="text-xs text-blue-600 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +8.5% vs last month
                  </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <CreditCard className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">High Risk Locations</p>
                  <p className="text-2xl font-bold text-gray-900">{locations.filter(l => l.riskLevel === 'high').length}</p>
                  <p className="text-xs text-red-600 flex items-center mt-1">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    Requires attention
                  </p>
                </div>
                <div className="p-3 bg-red-100 rounded-full">
                  <Shield className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Network Health</p>
                  <p className="text-2xl font-bold text-gray-900">94%</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <Activity className="w-3 h-3 mr-1" />
                    Excellent
                  </p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <BarChart3 className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Performance Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Network Performance Trends</h3>
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">7D</button>
                  <button className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">30D</button>
                  <button className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">90D</button>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value: number, name: string) => [
                    name === 'revenue' ? `€${value.toLocaleString()}` : value.toLocaleString(),
                    name === 'revenue' ? 'Revenue' : name === 'transactions' ? 'Transactions' : 'Stores'
                  ]} />
                  <Area type="monotone" dataKey="revenue" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.1} />
                  <Area type="monotone" dataKey="transactions" stackId="2" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.1} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Regional Distribution</h3>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  View Details
                </button>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={regionStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="region" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip formatter={(value: number, name: string) => [
                    name === 'revenue' ? `€${value.toLocaleString()}` : value,
                    name === 'revenue' ? 'Revenue' : 'Stores'
                  ]} />
                  <Bar dataKey="revenue" fill="#10B981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="stores" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Category Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Category Performance Analysis</h3>
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors">
                    <Filter className="w-3 h-3 inline mr-1" />
                    Filter
                  </button>
                  <button className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors">
                    <Download className="w-3 h-3 inline mr-1" />
                    Export
                  </button>
                </div>
              </div>
              <div className="space-y-4">
                {Array.from(new Set(locations.map(l => l.category))).map(category => {
                  const categoryLocations = locations.filter(l => l.category === category);
                  const categoryRevenue = categoryLocations.reduce((sum, l) => sum + l.revenue, 0);
                  const categoryTransactions = categoryLocations.reduce((sum, l) => sum + l.transactions, 0);
                  const categoryGrowth = categoryLocations.reduce((sum, l) => sum + l.monthlyGrowth, 0) / categoryLocations.length;
                  const avgTransactionValue = categoryRevenue / categoryTransactions;
                  
                  return (
                    <div key={category} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${
                            categoryGrowth > 10 ? 'bg-green-500' :
                            categoryGrowth > 0 ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}></div>
                          <h4 className="font-semibold text-gray-900">{category}</h4>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`text-sm font-medium ${
                            categoryGrowth > 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {categoryGrowth > 0 ? '+' : ''}{categoryGrowth.toFixed(1)}% growth
                          </span>
                          {categoryGrowth > 0 ? (
                            <TrendingUp className="w-4 h-4 text-green-500" />
                          ) : (
                            <TrendingDown className="w-4 h-4 text-red-500" />
                          )}
                        </div>
                      </div>
                      <div className="grid grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Locations</p>
                          <p className="font-semibold text-lg">{categoryLocations.length}</p>
                          <p className="text-xs text-gray-500">{((categoryLocations.length / locations.length) * 100).toFixed(1)}% of total</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Revenue</p>
                          <p className="font-semibold text-lg text-green-600">€{categoryRevenue.toLocaleString()}</p>
                          <p className="text-xs text-gray-500">€{(categoryRevenue / categoryLocations.length).toLocaleString()} avg</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Transactions</p>
                          <p className="font-semibold text-lg text-blue-600">{categoryTransactions.toLocaleString()}</p>
                          <p className="text-xs text-gray-500">{(categoryTransactions / categoryLocations.length).toLocaleString()} avg</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Avg Value</p>
                          <p className="font-semibold text-lg text-purple-600">€{avgTransactionValue.toFixed(2)}</p>
                          <p className="text-xs text-gray-500">per transaction</p>
                        </div>
                      </div>
                      
                      {/* Performance Bar */}
                      <div className="mt-3">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>Performance Score</span>
                          <span>{Math.min(Math.max(categoryGrowth + 50, 0), 100).toFixed(0)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-500 ${
                              categoryGrowth > 10 ? 'bg-green-500' :
                              categoryGrowth > 0 ? 'bg-yellow-500' :
                              'bg-red-500'
                            }`}
                            style={{ width: `${Math.min(Math.max(categoryGrowth + 50, 0), 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Assessment & Alerts</h3>
              <div className="space-y-4">
                {['low', 'medium', 'high'].map(risk => {
                  const riskLocations = locations.filter(l => l.riskLevel === risk);
                  const percentage = (riskLocations.length / locations.length) * 100;
                  
                  return (
                    <div key={risk} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-gray-900 capitalize">{risk} Risk</span>
                          {risk === 'high' && (
                            <AlertTriangle className="w-4 h-4 text-red-500" />
                          )}
                        </div>
                        <span className="text-sm text-gray-600">{riskLocations.length} locations</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full transition-all duration-500 ${
                            risk === 'low' ? 'bg-green-500' :
                            risk === 'medium' ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">{percentage.toFixed(1)}% of total locations</span>
                        {risk === 'high' && riskLocations.length > 0 && (
                          <button className="text-red-600 hover:text-red-800 font-medium">
                            Review →
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
                
                {/* Recent Alerts */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Recent Alerts</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 p-2 bg-red-50 rounded-lg">
                      <AlertTriangle className="w-4 h-4 text-red-500" />
                      <div className="flex-1">
                        <p className="text-xs font-medium text-red-800">High risk detected</p>
                        <p className="text-xs text-red-600">Milano Centro - 2h ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 p-2 bg-yellow-50 rounded-lg">
                      <AlertCircle className="w-4 h-4 text-yellow-500" />
                      <div className="flex-1">
                        <p className="text-xs font-medium text-yellow-800">Performance drop</p>
                        <p className="text-xs text-yellow-600">Roma Est - 4h ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 p-2 bg-blue-50 rounded-lg">
                      <Info className="w-4 h-4 text-blue-500" />
                      <div className="flex-1">
                        <p className="text-xs font-medium text-blue-800">New location online</p>
                        <p className="text-xs text-blue-600">Napoli Sud - 6h ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Predictive Analytics */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Predictive Analytics & Forecasting</h3>
                <p className="text-sm text-gray-600">AI-powered insights for the next 30 days</p>
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-2 text-sm bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors">
                  <Brain className="w-4 h-4 inline mr-1" />
                  AI Insights
                </button>
                <button className="px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  <Settings className="w-4 h-4 inline mr-1" />
                  Configure
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-green-800">Revenue Forecast</h4>
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-green-900">€2.8M</div>
                  <div className="text-sm text-green-700">Projected next month (+18%)</div>
                  <div className="w-full bg-green-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                  <div className="text-xs text-green-600">78% confidence</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-blue-800">Transaction Volume</h4>
                  <Activity className="w-5 h-5 text-blue-600" />
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-blue-900">12.5K</div>
                  <div className="text-sm text-blue-700">Expected daily avg (+12%)</div>
                  <div className="w-full bg-blue-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <div className="text-xs text-blue-600">85% confidence</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-purple-800">Risk Prediction</h4>
                  <Shield className="w-5 h-5 text-purple-600" />
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-purple-900">Low</div>
                  <div className="text-sm text-purple-700">Overall network risk</div>
                  <div className="w-full bg-purple-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                  <div className="text-xs text-purple-600">92% confidence</div>
                </div>
              </div>
            </div>
            
            {/* AI Recommendations */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <Brain className="w-4 h-4 mr-2 text-purple-600" />
                AI Recommendations
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Expand in Lombardia</p>
                    <p className="text-xs text-gray-600">High growth potential detected in Milano suburbs</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Monitor Roma Centro</p>
                    <p className="text-xs text-gray-600">Transaction volume declining, investigate causes</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Optimize Restaurant category</p>
                    <p className="text-xs text-gray-600">Implement targeted promotions for 15% growth boost</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Update risk models</p>
                    <p className="text-xs text-gray-600">New fraud patterns detected, model refresh recommended</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
       )}
       
       {/* Export Modal */}
       {showExportModal && (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
           <div className="bg-white rounded-lg p-6 w-96 max-w-90vw">
             <div className="flex items-center justify-between mb-4">
               <h3 className="text-lg font-semibold">Export Data</h3>
               <button
                 onClick={() => setShowExportModal(false)}
                 className="text-gray-400 hover:text-gray-600"
               >
                 <X className="w-5 h-5" />
               </button>
             </div>
             
             <div className="space-y-4">
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-2">
                   Export Format
                 </label>
                 <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                   <option value="csv">CSV</option>
                   <option value="excel">Excel</option>
                   <option value="pdf">PDF Report</option>
                 </select>
               </div>
               
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-2">
                   Data to Include
                 </label>
                 <div className="space-y-2">
                   <label className="flex items-center">
                     <input type="checkbox" defaultChecked className="mr-2" />
                     Location Details
                   </label>
                   <label className="flex items-center">
                     <input type="checkbox" defaultChecked className="mr-2" />
                     Financial Data
                   </label>
                   <label className="flex items-center">
                     <input type="checkbox" defaultChecked className="mr-2" />
                     Performance Metrics
                   </label>
                   <label className="flex items-center">
                     <input type="checkbox" className="mr-2" />
                     Risk Assessment
                   </label>
                 </div>
               </div>
               
               <div className="flex space-x-3 pt-4">
                 <button
                   onClick={() => {
                     exportData('csv');
                     setShowExportModal(false);
                   }}
                   className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                 >
                   <Download className="w-4 h-4 inline mr-2" />
                   Export
                 </button>
                 <button
                   onClick={() => setShowExportModal(false)}
                   className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                 >
                   Cancel
                 </button>
               </div>
             </div>
           </div>
         </div>
       )}
     </div>
   );
 };

export default MerchantLocationsPage;