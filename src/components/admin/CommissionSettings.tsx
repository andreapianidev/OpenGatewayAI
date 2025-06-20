import React, { useState } from 'react';
import { Save, Plus, Edit, Trash2, Percent, Users, Building, X } from 'lucide-react';
import DashboardAIWidget from '../ai/DashboardAIWidget';

interface MerchantCommission {
  id: string;
  name: string;
  category: string;
  currentRate: number;
  minAmount: number;
  maxAmount: number;
  monthlyVolume: number;
}

interface CategoryRule {
  category: string;
  baseRate: number;
  volumeThreshold: number;
  discountRate: number;
  description: string;
}

const CommissionSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('merchant');
  const [showAddMerchantModal, setShowAddMerchantModal] = useState(false);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [newMerchant, setNewMerchant] = useState({
    name: '',
    category: '',
    currentRate: 2.5,
    minAmount: 0,
    maxAmount: 10000,
    monthlyVolume: 0
  });
  const [newCategory, setNewCategory] = useState({
    category: '',
    baseRate: 2.5,
    volumeThreshold: 50000,
    discountRate: 2.2,
    description: ''
  });

  const [merchantCommissions, setMerchantCommissions] = useState<MerchantCommission[]>([
    {
      id: 'MERCH001',
      name: 'Damascus Electronics',
      category: 'Elettronica',
      currentRate: 2.5,
      minAmount: 0,
      maxAmount: 10000,
      monthlyVolume: 45320
    },
    {
      id: 'MERCH002',
      name: 'Aleppo Fashion Store',
      category: 'Abbigliamento',
      currentRate: 2.8,
      minAmount: 0,
      maxAmount: 5000,
      monthlyVolume: 38940
    },
    {
      id: 'MERCH003',
      name: 'Homs Restaurant',
      category: 'Ristorazione',
      currentRate: 3.0,
      minAmount: 0,
      maxAmount: 2000,
      monthlyVolume: 32150
    },
    {
      id: 'MERCH004',
      name: 'Latakia Pharmacy',
      category: 'Farmacia',
      currentRate: 2.2,
      minAmount: 0,
      maxAmount: 3000,
      monthlyVolume: 28670
    }
  ]);

  const [categoryRules, setCategoryRules] = useState<CategoryRule[]>([
    {
      category: 'Elettronica',
      baseRate: 2.5,
      volumeThreshold: 50000,
      discountRate: 2.2,
      description: 'Tariffa standard per prodotti elettronici'
    },
    {
      category: 'Abbigliamento',
      baseRate: 2.8,
      volumeThreshold: 40000,
      discountRate: 2.5,
      description: 'Tariffa per negozi di abbigliamento e moda'
    },
    {
      category: 'Ristorazione',
      baseRate: 3.0,
      volumeThreshold: 30000,
      discountRate: 2.7,
      description: 'Tariffa per ristoranti e servizi alimentari'
    },
    {
      category: 'Farmacia',
      baseRate: 2.2,
      volumeThreshold: 25000,
      discountRate: 2.0,
      description: 'Tariffa ridotta per farmacie e servizi sanitari'
    },
    {
      category: 'Supermercato',
      baseRate: 1.8,
      volumeThreshold: 100000,
      discountRate: 1.5,
      description: 'Tariffa preferenziale per grande distribuzione'
    }
  ]);

  // Funzioni per gestire l'aggiunta di nuove regole
  const handleAddMerchant = () => {
    if (newMerchant.name && newMerchant.category) {
      const newId = 'MERCH' + String(merchantCommissions.length + 1).padStart(3, '0');
      setMerchantCommissions([...merchantCommissions, {
        id: newId,
        name: newMerchant.name,
        category: newMerchant.category,
        currentRate: newMerchant.currentRate,
        minAmount: newMerchant.minAmount,
        maxAmount: newMerchant.maxAmount,
        monthlyVolume: newMerchant.monthlyVolume
      }]);
      setNewMerchant({
        name: '',
        category: '',
        currentRate: 2.5,
        minAmount: 0,
        maxAmount: 10000,
        monthlyVolume: 0
      });
      setShowAddMerchantModal(false);
    }
  };

  const handleAddCategory = () => {
    if (newCategory.category && newCategory.description) {
      setCategoryRules([...categoryRules, {
        category: newCategory.category,
        baseRate: newCategory.baseRate,
        volumeThreshold: newCategory.volumeThreshold,
        discountRate: newCategory.discountRate,
        description: newCategory.description
      }]);
      setNewCategory({
        category: '',
        baseRate: 2.5,
        volumeThreshold: 50000,
        discountRate: 2.2,
        description: ''
      });
      setShowAddCategoryModal(false);
    }
  };

  const globalSettings = {
    defaultRate: 2.5,
    minimumFee: 0.50,
    maximumFee: 100.00,
    processingFee: 0.30,
    refundFee: 1.00,
    chargebackFee: 15.00
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestione Commissioni</h1>
          <p className="text-gray-500 mt-1">Configurazione tariffe e fee engine</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2">
          <Save className="w-5 h-5" />
          <span>Salva Modifiche</span>
        </button>
      </div>

      {/* AI Widget */}
      <DashboardAIWidget />

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('merchant')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'merchant'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Commissioni Merchant</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('category')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'category'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Building className="w-5 h-5" />
                <span>Regole per Categoria</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('global')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'global'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Percent className="w-5 h-5" />
                <span>Impostazioni Globali</span>
              </div>
            </button>
          </nav>
        </div>

        <div className="p-6">
          {/* Merchant Commissions Tab */}
          {activeTab === 'merchant' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Commissioni per Merchant</h3>
                <button 
                  onClick={() => setShowAddMerchantModal(true)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center space-x-2"
                >
                  <Plus className="w-5 h-5" />
                  <span>Aggiungi Regola</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Merchant
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Categoria
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Commissione
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Limiti
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Volume Mensile
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Azioni
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {merchantCommissions.map((merchant) => (
                      <tr key={merchant.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{merchant.name}</div>
                          <div className="text-sm text-gray-500">{merchant.id}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                            {merchant.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{merchant.currentRate}%</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            €{merchant.minAmount} - €{merchant.maxAmount.toLocaleString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">€{merchant.monthlyVolume.toLocaleString()}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end space-x-2">
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
          )}

          {/* Category Rules Tab */}
          {activeTab === 'category' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Regole per Categoria</h3>
                <button 
                  onClick={() => setShowAddCategoryModal(true)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center space-x-2"
                >
                  <Plus className="w-5 h-5" />
                  <span>Nuova Categoria</span>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {categoryRules.map((rule, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold text-gray-900">{rule.category}</h4>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-white rounded-lg transition-colors duration-200">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-white rounded-lg transition-colors duration-200">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4">{rule.description}</p>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Tariffa Base</span>
                        <span className="text-sm font-medium">{rule.baseRate}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Soglia Volume</span>
                        <span className="text-sm font-medium">€{rule.volumeThreshold.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Tariffa Scontata</span>
                        <span className="text-sm font-medium text-green-600">{rule.discountRate}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Global Settings Tab */}
          {activeTab === 'global' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Impostazioni Globali</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Commissione Predefinita (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={globalSettings.defaultRate}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Commissione Minima (€)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={globalSettings.minimumFee}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Commissione Massima (€)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={globalSettings.maximumFee}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Costo Elaborazione (€)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={globalSettings.processingFee}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Costo Rimborso (€)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={globalSettings.refundFee}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Costo Chargeback (€)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={globalSettings.chargebackFee}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-blue-900 mb-2">Nota Importante</h4>
                <p className="text-sm text-blue-700">
                  Le modifiche alle commissioni globali influenzeranno tutti i nuovi merchant che non hanno 
                  regole specifiche configurate. I merchant esistenti manterranno le loro tariffe attuali.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal Aggiungi Merchant */}
      {showAddMerchantModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Aggiungi Nuova Regola Merchant</h3>
              <button 
                onClick={() => setShowAddMerchantModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nome Merchant</label>
                <input
                  type="text"
                  value={newMerchant.name}
                  onChange={(e) => setNewMerchant({...newMerchant, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Es. Damascus Electronics"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Categoria</label>
                <select
                  value={newMerchant.category}
                  onChange={(e) => setNewMerchant({...newMerchant, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Seleziona categoria</option>
                  <option value="Elettronica">Elettronica</option>
                  <option value="Abbigliamento">Abbigliamento</option>
                  <option value="Ristorazione">Ristorazione</option>
                  <option value="Farmacia">Farmacia</option>
                  <option value="Supermercato">Supermercato</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Commissione (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={newMerchant.currentRate}
                  onChange={(e) => setNewMerchant({...newMerchant, currentRate: parseFloat(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Importo Min (€)</label>
                  <input
                    type="number"
                    value={newMerchant.minAmount}
                    onChange={(e) => setNewMerchant({...newMerchant, minAmount: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Importo Max (€)</label>
                  <input
                    type="number"
                    value={newMerchant.maxAmount}
                    onChange={(e) => setNewMerchant({...newMerchant, maxAmount: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Volume Mensile (€)</label>
                <input
                  type="number"
                  value={newMerchant.monthlyVolume}
                  onChange={(e) => setNewMerchant({...newMerchant, monthlyVolume: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="flex items-center justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddMerchantModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Annulla
              </button>
              <button
                onClick={handleAddMerchant}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Aggiungi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Aggiungi Categoria */}
      {showAddCategoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Aggiungi Nuova Categoria</h3>
              <button 
                onClick={() => setShowAddCategoryModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nome Categoria</label>
                <input
                  type="text"
                  value={newCategory.category}
                  onChange={(e) => setNewCategory({...newCategory, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Es. Servizi Finanziari"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Descrizione</label>
                <textarea
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Descrizione della categoria e delle sue caratteristiche"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tariffa Base (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={newCategory.baseRate}
                  onChange={(e) => setNewCategory({...newCategory, baseRate: parseFloat(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Soglia Volume (€)</label>
                <input
                  type="number"
                  value={newCategory.volumeThreshold}
                  onChange={(e) => setNewCategory({...newCategory, volumeThreshold: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tariffa Scontata (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={newCategory.discountRate}
                  onChange={(e) => setNewCategory({...newCategory, discountRate: parseFloat(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="flex items-center justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddCategoryModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Annulla
              </button>
              <button
                onClick={handleAddCategory}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Aggiungi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommissionSettings;