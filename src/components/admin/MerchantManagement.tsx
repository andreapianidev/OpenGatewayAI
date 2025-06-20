import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Filter, Plus, Eye, Edit, Trash2, MoreHorizontal, Building, Mail, Phone, MapPin, Calendar, DollarSign, User } from 'lucide-react';
import DashboardAIWidget from '../ai/DashboardAIWidget';

const MerchantManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const { t } = useTranslation();

  const merchants = [
    {
      id: 'MERCH001',
      name: 'Damascus Electronics',
      email: 'info@damascuselectronics.sy',
      location: 'Damascus, Syria',
      status: 'active',
      monthlyVolume: 45320,
      totalTransactions: 1247,
      commission: 2.5,
      joinDate: '2023-01-15',
      lastActivity: '2 ore fa'
    },
    {
      id: 'MERCH002',
      name: 'Aleppo Fashion Store',
      email: 'contact@aleppofashion.sy',
      location: 'Aleppo, Syria',
      status: 'active',
      monthlyVolume: 38940,
      totalTransactions: 892,
      commission: 2.8,
      joinDate: '2023-02-22',
      lastActivity: '5 min fa'
    },
    {
      id: 'MERCH003',
      name: 'Homs Restaurant',
      email: 'orders@homsrestaurant.sy',
      location: 'Homs, Syria',
      status: 'pending',
      monthlyVolume: 32150,
      totalTransactions: 1456,
      commission: 3.0,
      joinDate: '2023-03-10',
      lastActivity: '1 giorno fa'
    },
    {
      id: 'MERCH004',
      name: 'Latakia Pharmacy',
      email: 'info@latakiapharmacy.sy',
      location: 'Latakia, Syria',
      status: 'active',
      monthlyVolume: 28670,
      totalTransactions: 734,
      commission: 2.2,
      joinDate: '2022-11-08',
      lastActivity: '30 min fa'
    },
    {
      id: 'MERCH005',
      name: 'Tartus Market',
      email: 'sales@tartusmarket.sy',
      location: 'Tartus, Syria',
      status: 'suspended',
      monthlyVolume: 15420,
      totalTransactions: 423,
      commission: 3.2,
      joinDate: '2023-04-18',
      lastActivity: '3 giorni fa'
    }
  ];

  const filteredMerchants = merchants.filter(merchant => {
    const matchesSearch = merchant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         merchant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         merchant.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || merchant.status === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'suspended':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Attivo';
      case 'pending':
        return 'In Attesa';
      case 'suspended':
        return 'Sospeso';
      default:
        return status;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('merchant.merchantManagement')}</h1>
          <p className="text-gray-500 mt-1">Amministrazione e controllo esercenti</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>{t('merchant.newMerchant')}</span>
        </button>
      </div>

      {/* AI Widget */}
      <DashboardAIWidget />

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={t('merchant.searchMerchant')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">{t('merchant.allStates')}</option>
                <option value="active">Attivi</option>
                <option value="pending">In Attesa</option>
                <option value="suspended">Sospesi</option>
              </select>
            </div>
          </div>

          <div className="text-sm text-gray-500">
            {filteredMerchants.length} di {merchants.length} merchant
          </div>
        </div>
      </div>

      {/* Merchants Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Merchant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Volume Mensile
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transazioni
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Commissione
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ultima Attività
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Azioni
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMerchants.map((merchant) => (
                <tr key={merchant.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{merchant.name}</div>
                        <div className="text-sm text-gray-500">{merchant.id}</div>
                        <div className="text-xs text-gray-400 flex items-center mt-1">
                          <MapPin className="w-3 h-3 mr-1" />
                          {merchant.location}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(merchant.status)}`}>
                      {getStatusText(merchant.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    €{merchant.monthlyVolume.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {merchant.totalTransactions.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {merchant.commission}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {merchant.lastActivity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors duration-200">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">{t('merchant.activeMerchants')}</h3>
          <p className="text-3xl font-bold">{merchants.filter(m => m.status === 'active').length}</p>
        </div>
        <div className="bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">{t('merchant.pendingRequests')}</h3>
          <p className="text-3xl font-bold">{merchants.filter(m => m.status === 'pending').length}</p>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">{t('merchant.totalVolume')}</h3>
          <p className="text-3xl font-bold">€{merchants.reduce((sum, m) => sum + m.monthlyVolume, 0).toLocaleString()}</p>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">{t('merchant.averageCommission')}</h3>
          <p className="text-3xl font-bold">{(merchants.reduce((sum, m) => sum + m.commission, 0) / merchants.length).toFixed(1)}%</p>
        </div>
      </div>
    </div>
  );
};

export default MerchantManagement;