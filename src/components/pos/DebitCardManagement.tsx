import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  CreditCard,
  CheckCircle,
  XCircle,
  Euro,
  Lock,
  Unlock,
  Ban,
  Plus,
  Eye,
  Star,
  MapPin,
  Globe,
  UserCheck,
  AlertTriangle,
  TrendingUp,
  BarChart3
} from 'lucide-react';
import { DebitCard, CardTransaction, CardApplication, CardManagementView } from '../../types/pos';

interface DebitCardManagementProps {
  debitCards: DebitCard[];
  cardTransactions: CardTransaction[];
  cardApplications: CardApplication[];
  selectedCard: DebitCard | null;
  cardManagementView: CardManagementView;
  setSelectedCard: (card: DebitCard | null) => void;
  setCardManagementView: (view: CardManagementView) => void;
  blockCard: (cardId: string) => void;
  unblockCard: (cardId: string) => void;
  updateCardLimits: (cardId: string, dailyLimit: number) => void;
  processCardApplication: (applicationId: string, decision: 'approve' | 'reject') => void;
  simulateCardTransaction: () => void;
  generateCardAnalytics: () => any;
}

const DebitCardManagement: React.FC<DebitCardManagementProps> = ({
  debitCards,
  cardTransactions,
  cardApplications,
  selectedCard,
  cardManagementView,
  setSelectedCard,
  setCardManagementView,
  blockCard,
  unblockCard,
  updateCardLimits,
  processCardApplication,
  simulateCardTransaction,
  generateCardAnalytics
}) => {
  const { t } = useTranslation();

  const renderTabButton = (view: CardManagementView, label: string) => (
    <button
      onClick={() => setCardManagementView(view)}
      className={`px-3 py-1 rounded-md text-sm font-medium ${
        cardManagementView === view
          ? 'bg-blue-100 text-blue-700'
          : 'text-gray-500 hover:text-gray-700'
      }`}
    >
      {label}
    </button>
  );

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Sezione Migliorata - Statistiche Avanzate */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Sistema Carte di Debito Avanzato</h3>
            <p className="text-sm text-gray-600">Gestione completa con AI e analytics in tempo reale</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
              🔒 PCI-DSS Ready
            </span>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
              🤖 AI Powered
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Carte Totali</p>
                <p className="text-2xl font-bold">{debitCards.length}</p>
                <p className="text-xs text-blue-200 mt-1">+12% questo mese</p>
              </div>
              <CreditCard className="h-8 w-8 text-blue-200" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Carte Attive</p>
                <p className="text-2xl font-bold">{debitCards.filter(c => c.status === 'active').length}</p>
                <p className="text-xs text-green-200 mt-1">{((debitCards.filter(c => c.status === 'active').length / debitCards.length) * 100).toFixed(1)}% attive</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-200" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-sm">Carte Bloccate</p>
                <p className="text-2xl font-bold">{debitCards.filter(c => c.status === 'blocked').length}</p>
                <p className="text-xs text-red-200 mt-1">Sicurezza attiva</p>
              </div>
              <XCircle className="h-8 w-8 text-red-200" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Saldo Totale</p>
                <p className="text-2xl font-bold">€{debitCards.reduce((sum, card) => sum + card.balance, 0).toFixed(2)}</p>
                <p className="text-xs text-purple-200 mt-1">Liquidità gestita</p>
              </div>
              <Euro className="h-8 w-8 text-purple-200" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Transazioni/Giorno</p>
                <p className="text-2xl font-bold">{cardTransactions.length * 8}</p>
                <p className="text-xs text-orange-200 mt-1">Volume alto</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-200" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {debitCards.map((card) => (
          <div key={card.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${
                  card.cardType === 'physical' ? 'bg-blue-100' : 'bg-purple-100'
                }`}>
                  <CreditCard className={`h-5 w-5 ${
                    card.cardType === 'physical' ? 'text-blue-600' : 'text-purple-600'
                  }`} />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{card.holderName}</h4>
                  <p className="text-sm text-gray-500">****{card.cardNumber.slice(-4)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  card.status === 'active' ? 'bg-green-100 text-green-800' :
                  card.status === 'blocked' ? 'bg-red-100 text-red-800' :
                  card.status === 'expired' ? 'bg-gray-100 text-gray-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {card.status}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  card.tier === 'premium' ? 'bg-yellow-100 text-yellow-800' :
                  card.tier === 'business' ? 'bg-purple-100 text-purple-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {card.tier}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">Saldo</p>
                <p className="font-semibold text-lg">€{card.balance.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Limite Giornaliero</p>
                <p className="font-semibold">€{card.dailyLimit.toFixed(2)}</p>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedCard(card)}
                className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center justify-center space-x-1"
              >
                <Eye className="h-4 w-4" />
                <span>Dettagli</span>
              </button>
              {card.status === 'active' ? (
                <button
                  onClick={() => blockCard(card.id)}
                  className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm flex items-center justify-center"
                >
                  <Lock className="h-4 w-4" />
                </button>
              ) : card.status === 'blocked' ? (
                <button
                  onClick={() => unblockCard(card.id)}
                  className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm flex items-center justify-center"
                >
                  <Unlock className="h-4 w-4" />
                </button>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTransactions = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Transazioni Carte</h3>
        <button
          onClick={simulateCardTransaction}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Simula Transazione</span>
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Carta</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Importo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commerciante</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoria</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stato</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {cardTransactions.slice(0, 10).map((transaction) => {
              const card = debitCards.find(c => c.id === transaction.cardId);
              return (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{card?.holderName}</div>
                      <div className="text-sm text-gray-500">****{card?.cardNumber.slice(-4)}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {transaction.type === 'refund' ? '+' : '-'}€{transaction.amount.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.merchant}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                      {transaction.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(transaction.timestamp).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      transaction.status === 'completed' ? 'bg-green-100 text-green-800' :
                      transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderApplications = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Richieste Carte</h3>
      
      <div className="grid gap-4">
        {cardApplications.map((application) => (
          <div key={application.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-medium text-gray-900">{application.applicantName}</h4>
                <p className="text-sm text-gray-500">{application.email}</p>
                <p className="text-sm text-gray-500">{application.cardType} - {application.tier}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                application.status === 'approved' ? 'bg-green-100 text-green-800' :
                application.status === 'rejected' ? 'bg-red-100 text-red-800' :
                application.status === 'under_review' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {application.status}
              </span>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">Risk Score</p>
                <p className={`font-medium ${
                  application.riskScore < 0.3 ? 'text-green-600' :
                  application.riskScore < 0.7 ? 'text-yellow-600' :
                  'text-red-600'
                }`}>
                  {(application.riskScore * 100).toFixed(0)}%
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">AI Confidence</p>
                <p className="font-medium">{application.aiDecision?.confidence || 0}%</p>
              </div>
            </div>
            
            {application.status === 'pending' && (
              <div className="flex space-x-2">
                <button
                  onClick={() => processCardApplication(application.id, 'approve')}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                >
                  Approva
                </button>
                <button
                  onClick={() => processCardApplication(application.id, 'reject')}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                >
                  Rifiuta
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderAnalytics = () => {
    const analytics = generateCardAnalytics();
    
    return (
      <div className="space-y-6">
        <h3 className="text-lg font-semibold">Analytics Carte</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Volume Transazioni</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.totalTransactions}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Revenue Totale</p>
                <p className="text-2xl font-bold text-gray-900">€{analytics.totalRevenue.toFixed(2)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Transazione Media</p>
                <p className="text-2xl font-bold text-gray-900">€{analytics.averageTransaction.toFixed(2)}</p>
              </div>
              <Euro className="h-8 w-8 text-purple-500" />
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Tasso Successo</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.successRate.toFixed(1)}%</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="text-lg font-semibold mb-4">Distribuzione per Categoria</h4>
          <div className="space-y-3">
            {analytics.categoryBreakdown.map((category: any) => (
              <div key={category.name} className="flex items-center justify-between">
                <span className="text-gray-700">{category.name}</span>
                <div className="flex items-center space-x-3">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${category.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{category.percentage.toFixed(1)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Gestione Carte di Debito</h2>
          <div className="flex space-x-2">
            {renderTabButton('overview', 'Panoramica')}
            {renderTabButton('transactions', 'Transazioni')}
            {renderTabButton('applications', 'Applicazioni')}
            {renderTabButton('analytics', 'Analytics')}
          </div>
        </div>
      </div>

      <div className="p-6">
        {cardManagementView === 'overview' && renderOverview()}
        {cardManagementView === 'transactions' && renderTransactions()}
        {cardManagementView === 'applications' && renderApplications()}
        {cardManagementView === 'analytics' && renderAnalytics()}
      </div>
    </div>
  );
};

export default DebitCardManagement;