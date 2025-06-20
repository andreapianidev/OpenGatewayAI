import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import FinancialDashboard from '../components/pos/FinancialDashboard';
import POSDeviceManagement from '../components/pos/POSDeviceManagement';
import DebitCardManagement from '../components/pos/DebitCardManagement';
import CardProviderManagement from '../components/pos/CardProviderManagement';
import AdvancedAnalytics from '../components/pos/AdvancedAnalytics';
import PaymentProviderHub from '../components/pos/PaymentProviderHub';
import {
  POSDevice,
  POSTransaction,
  AIInsight,
  PerformanceMetric,
  DebitCard,
  CardTransaction,
  CardApplication,
  CardManagementView
} from '../types/pos';

const POSManagement: React.FC = () => {
  const { t } = useTranslation();

  // Types are now imported from types/pos.ts

  const [posDevices, setPosDevices] = useState<POSDevice[]>([
    {
      id: 'pos-001',
      name: 'Terminal Principale',
      type: 'desktop',
      status: 'online',
      location: 'Cassa 1 - Piano Terra',
      lastTransaction: '2 min fa',
      todayTransactions: 127,
      todayRevenue: 3450.75,
      batteryLevel: undefined,
      version: '2.1.0',
      ipAddress: '192.168.1.100'
    },
    {
      id: 'pos-002',
      name: 'Terminal Mobile 1',
      type: 'mobile',
      status: 'online',
      location: 'Cameriere - Sala A',
      lastTransaction: '5 min fa',
      todayTransactions: 89,
      todayRevenue: 2180.30,
      batteryLevel: 78,
      version: '2.1.3',
      ipAddress: '192.168.1.101'
    },
    {
      id: 'pos-003',
      name: 'Terminal Tablet',
      type: 'tablet',
      status: 'maintenance',
      location: 'Cassa 2 - Piano Terra',
      lastTransaction: '1 ora fa',
      todayTransactions: 45,
      todayRevenue: 890.50,
      batteryLevel: 45,
      version: '2.0.8',
      ipAddress: '192.168.1.102'
    }
  ]);

  const [selectedPOS, setSelectedPOS] = useState<POSDevice | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationLog, setSimulationLog] = useState<string[]>([]);
  const [aiInsights, setAiInsights] = useState<AIInsight[]>([]);
  const [performanceData, setPerformanceData] = useState<PerformanceMetric[]>([]);
  const [aiMonitoring, setAiMonitoring] = useState({
    fraudDetection: true,
    predictiveAnalytics: true,
    performanceOptimization: false,
    customerBehaviorAnalysis: true
  });
  const [autoSimulation, setAutoSimulation] = useState(false);
  const [simulationInterval, setSimulationInterval] = useState<number | null>(null);

  const [debitCards, setDebitCards] = useState<DebitCard[]>([
    {
      id: 'card-001',
      cardNumber: '**** **** **** 1234',
      holderName: 'Mario Rossi',
      expiryDate: '12/26',
      status: 'active',
      balance: 2500.75,
      dailyLimit: 1000,
      monthlySpent: 1250.30,
      tier: 'standard',
      issueDate: '2023-01-15',
      lastUsed: '2024-01-20T10:30:00Z',
      cardType: 'physical',
      pin: '****',
      cvv: '***',
      customerId: 'cust-001',
      features: {
        contactless: true,
        onlinePayments: true,
        internationalTransactions: false,
        atmWithdrawals: true
      },
      spending: {
        today: 45.50,
        thisWeek: 230.75,
        thisMonth: 1250.30
      }
    },
    {
      id: 'card-002',
      cardNumber: '**** **** **** 5678',
      holderName: 'Anna Bianchi',
      expiryDate: '08/25',
      status: 'blocked',
      balance: 750.20,
      dailyLimit: 500,
      monthlySpent: 450.80,
      tier: 'premium',
       issueDate: '2022-06-10',
       lastUsed: '2024-01-19T15:45:00Z',
       cardType: 'physical',
       pin: '****',
       cvv: '***',
       customerId: 'cust-002',
       features: {
         contactless: true,
         onlinePayments: true,
         internationalTransactions: true,
         atmWithdrawals: true
       },
       spending: {
         today: 125.00,
         thisWeek: 450.80,
         thisMonth: 1850.60
       }
     },
     {
       id: 'card-003',
       cardNumber: '**** **** **** 9012',
       holderName: 'Giuseppe Verdi',
       expiryDate: '03/27',
       status: 'active',
       balance: 5200.00,
       dailyLimit: 2000,
       monthlySpent: 3200.50,
       tier: 'business',
      issueDate: '2023-03-20',
      lastUsed: '2024-01-20T09:15:00Z',
      cardType: 'physical',
      pin: '****',
      cvv: '***',
      customerId: 'cust-003',
      features: {
        contactless: true,
        onlinePayments: true,
        internationalTransactions: true,
        atmWithdrawals: true
      },
      spending: {
        today: 520.00,
        thisWeek: 3200.50,
        thisMonth: 8750.25
      }
    }
  ]);

  const [cardTransactions, setCardTransactions] = useState<CardTransaction[]>([
    {
      id: 'ctx-001',
      cardId: 'card-001',
      amount: 45.50,
      merchant: 'Supermercato Central',
      category: 'food',
      timestamp: '2024-01-20T10:30:00Z',
      status: 'completed',
      location: 'Milano, IT',
      currency: 'EUR',
      type: 'purchase',
      description: 'Acquisto alimentari',
      mcc: '5411'
    },
    {
      id: 'ctx-002',
      cardId: 'card-002',
      amount: 120.00,
      merchant: 'Ristorante Bella Vista',
      category: 'food',
      timestamp: '2024-01-19T20:15:00Z',
      status: 'completed',
      location: 'Roma, IT',
      currency: 'EUR',
      type: 'purchase',
      description: 'Cena ristorante',
      mcc: '5812'
    },
    {
      id: 'ctx-003',
      cardId: 'card-003',
      amount: 850.00,
      merchant: 'Fornitore Ufficio',
      category: 'other',
      timestamp: '2024-01-20T09:15:00Z',
      status: 'completed',
      location: 'Torino, IT',
      currency: 'EUR',
      type: 'purchase',
      description: 'Materiale ufficio',
      mcc: '5943'
    }
  ]);

  const [cardApplications, setCardApplications] = useState<CardApplication[]>([
    {
      id: 'app-001',
      applicantName: 'Luca Ferrari',
      email: 'luca.ferrari@email.com',
      cardType: 'physical',
      tier: 'standard',
      status: 'pending',
      submittedAt: '2024-01-18T14:30:00Z',
      riskScore: 0.25,
      aiDecision: {
        recommendation: 'approve',
        confidence: 0.85,
        reasons: ['Good credit history', 'Stable income']
      }
    },
    {
      id: 'app-002',
      applicantName: 'Sofia Romano',
      email: 'sofia.romano@email.com',
      cardType: 'virtual',
      tier: 'premium',
      status: 'approved',
      submittedAt: '2024-01-17T09:45:00Z',
      riskScore: 0.15,
      aiDecision: {
        recommendation: 'approve',
        confidence: 0.95,
        reasons: ['Low risk profile', 'Verified documents']
      }
    }
  ]);

  const [selectedCard, setSelectedCard] = useState<DebitCard | null>(null);
  const [cardManagementView, setCardManagementView] = useState<CardManagementView>('overview');
  const [selectedDevice, setSelectedDevice] = useState<POSDevice | null>(null);
  const [activeTab, setActiveTab] = useState<'devices' | 'cards' | 'providers' | 'analytics' | 'dashboard' | 'hub'>('dashboard');

  const [recentTransactions, setRecentTransactions] = useState<POSTransaction[]>([
    {
      id: 'tx-001',
      posId: 'pos-001',
      amount: 45.50,
      paymentMethod: 'card',
      status: 'completed',
      timestamp: '2024-01-20T10:30:00Z',
      riskScore: 0.15,
      type: 'sale',
      aiAnalysis: {
        fraudProbability: 0.1,
        customerBehavior: 'normal',
        recommendations: ['Offer loyalty program']
      }
    },
    {
      id: 'tx-002',
      posId: 'pos-002',
      amount: 120.00,
      paymentMethod: 'cash',
      status: 'completed',
      timestamp: '2024-01-20T10:25:00Z',
      riskScore: 0.05,
      type: 'sale',
      aiAnalysis: {
        fraudProbability: 0.05,
        customerBehavior: 'high-value',
        recommendations: ['Suggest premium services']
      }
    },
    {
      id: 'tx-003',
      posId: 'pos-001',
      amount: 850.00,
      paymentMethod: 'card',
      status: 'pending',
      timestamp: '2024-01-20T10:20:00Z',
      riskScore: 0.75,
      type: 'sale',
      aiAnalysis: {
        fraudProbability: 0.7,
        customerBehavior: 'suspicious',
        recommendations: ['Verify identity', 'Check card validity']
      }
    }
  ]);

  useEffect(() => {
    // Generate initial performance data
    const initialData: PerformanceMetric[] = [];
    for (let i = 0; i < 24; i++) {
      initialData.push({
        timestamp: new Date(Date.now() - (23 - i) * 60 * 60 * 1000).toISOString(),
        transactionVolume: Math.floor(Math.random() * 50) + 10,
        revenue: Math.random() * 1500 + 500,
        averageTransactionTime: Math.random() * 3 + 1,
        errorRate: Math.random() * 0.05,
        customerSatisfaction: Math.random() * 0.3 + 0.7
      });
    }
    setPerformanceData(initialData);
  }, []);

  const generateAIInsight = () => {
    const insights = [
      {
        id: `insight-${Date.now()}`,
        type: 'prediction' as const,
        title: 'Picco di Transazioni Previsto',
        description: 'Si prevede un aumento del 25% delle transazioni nelle prossime 2 ore basato sui pattern storici.',
        impact: 'medium' as const,
        confidence: 78,
        timestamp: new Date().toISOString(),
        actionable: true
      },
      {
        id: `insight-${Date.now() + 1}`,
        type: 'anomaly' as const,
        title: 'Comportamento Anomalo Rilevato',
        description: 'Terminal POS-003 mostra tempi di risposta superiori alla media del 40%.',
        impact: 'high' as const,
        confidence: 92,
        timestamp: new Date().toISOString(),
        actionable: true
      },
      {
        id: `insight-${Date.now() + 2}`,
        type: 'optimization' as const,
        title: 'Opportunità di Ottimizzazione',
        description: 'Riorganizzando i terminali, si può ridurre il tempo medio di attesa del 15%.',
        impact: 'medium' as const,
        confidence: 85,
        timestamp: new Date().toISOString(),
        actionable: true
      }
    ];

    const randomInsight = insights[Math.floor(Math.random() * insights.length)];
    setAiInsights(prev => [randomInsight, ...prev.slice(0, 4)]);
  };

  const addToLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setSimulationLog(prev => [`[${timestamp}] ${message}`, ...prev.slice(0, 9)]);
  };

  const blockCard = (cardId: string) => {
    setDebitCards(prev => prev.map(card => 
      card.id === cardId ? { ...card, status: 'blocked' } : card
    ));
    addToLog(`Carta ${cardId} bloccata`);
  };

  const unblockCard = (cardId: string) => {
    setDebitCards(prev => prev.map(card => 
      card.id === cardId ? { ...card, status: 'active' } : card
    ));
    addToLog(`Carta ${cardId} sbloccata`);
  };

  const updateCardLimits = (cardId: string, dailyLimit: number) => {
    const monthlyLimit = dailyLimit * 30; // Default monthly limit
    setDebitCards(prev => prev.map(card => 
      card.id === cardId ? { ...card, dailyLimit, monthlyLimit } : card
    ));
    addToLog(`Limiti aggiornati per carta ${cardId}`);
  };

  const processCardApplication = (applicationId: string, decision: 'approve' | 'reject') => {
    setCardApplications(prev => prev.map(app => 
      app.id === applicationId ? { ...app, status: decision === 'approve' ? 'approved' : 'rejected' } : app
    ));
    addToLog(`Richiesta ${applicationId} ${decision === 'approve' ? 'approvata' : 'rifiutata'}`);
  };

  // POS Device Management Functions
  const addDevice = () => {
    const device: Omit<POSDevice, 'id'> = {
      name: `POS Device ${posDevices.length + 1}`,
      type: 'mobile',
      status: 'online',
      location: 'New Location',
      batteryLevel: 100,
      lastTransaction: new Date().toISOString(),
      todayTransactions: 0,
      todayRevenue: 0,
      version: '1.0.0',
      ipAddress: '192.168.1.' + (100 + posDevices.length)
    };
    const newDevice: POSDevice = {
      ...device,
      id: `pos-${Date.now()}`
    };
    setPosDevices(prev => [...prev, newDevice]);
    addToLog(`${t('pos.newDeviceAdded')}: ${newDevice.name}`);
  };

  const updateDevice = (deviceId: string, updates: Partial<POSDevice>) => {
    setPosDevices(prev => prev.map(device => 
      device.id === deviceId ? { ...device, ...updates } : device
    ));
    addToLog(`${t('pos.deviceUpdated')}: ${deviceId}`);
  };

  const removeDevice = (deviceId: string) => {
    setPosDevices(prev => prev.filter(device => device.id !== deviceId));
    addToLog(`${t('pos.deviceRemoved')}: ${deviceId}`);
  };

  const restartDevice = (deviceId: string) => {
    updateDevice(deviceId, { status: 'maintenance' });
    setTimeout(() => {
      updateDevice(deviceId, { status: 'online' });
    }, 3000);
    addToLog(`${t('pos.deviceRestarted')}: ${deviceId}`);
  };

  const simulateCardTransaction = () => {
    const activeCards = debitCards.filter(card => card.status === 'active');
    if (activeCards.length === 0) return;
    
    const randomCard = activeCards[Math.floor(Math.random() * activeCards.length)];
    const amount = Math.random() * 200 + 10;
    
    const newTransaction: CardTransaction = {
      id: `ctx-${Date.now()}`,
      cardId: randomCard.id,
      amount: Math.round(amount * 100) / 100,
      currency: 'EUR',
      merchant: 'Simulazione Merchant',
      category: 'other',
      type: 'purchase',
      description: 'Transazione simulata',
      timestamp: new Date().toISOString(),
      status: 'completed',
      location: 'Simulazione, IT',
      mcc: '5999'
    };
    
    setCardTransactions(prev => [newTransaction, ...prev]);
    addToLog(`Transazione simulata: €${newTransaction.amount} su carta ${randomCard.cardNumber}`);
  };

  const generateCardAnalytics = () => {
    const totalTransactions = cardTransactions.length;
    const totalRevenue = cardTransactions.reduce((sum, tx) => sum + tx.amount, 0);
    const avgTransaction = totalRevenue / totalTransactions || 0;
    const successRate = (cardTransactions.filter(tx => tx.status === 'completed').length / totalTransactions) * 100 || 0;
    
    const categoryBreakdown = cardTransactions.reduce((acc, tx) => {
      acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalTransactions,
      totalRevenue,
      avgTransaction,
      successRate,
      categoryBreakdown
    };
  };

  const simulateTransaction = (posId: string) => {
    const pos = posDevices.find(p => p.id === posId);
    if (!pos) return;

    const amount = Math.random() * 200 + 10;
    const riskScore = Math.random();
    
    const newTransaction: POSTransaction = {
      id: `tx-${Date.now()}`,
      posId,
      amount: Math.round(amount * 100) / 100,
      type: Math.random() > 0.95 ? 'refund' : Math.random() > 0.98 ? 'void' : 'sale',
      paymentMethod: Math.random() > 0.7 ? 'cash' : 'card',
      status: Math.random() > 0.95 ? 'failed' : 'completed',
      timestamp: new Date().toISOString(),
      riskScore,
      aiAnalysis: {
        fraudProbability: riskScore,
        customerBehavior: riskScore > 0.7 ? 'suspicious' : riskScore > 0.3 ? 'high-value' : 'normal',
        recommendations: riskScore > 0.7 ? ['Verify identity'] : ['Standard processing']
      }
    };

    setRecentTransactions(prev => [newTransaction, ...prev.slice(0, 9)]);
    
    // Update POS stats
    setPosDevices(prev => prev.map(device => 
      device.id === posId 
        ? { 
            ...device, 
            todayTransactions: device.todayTransactions + 1,
            todayRevenue: device.todayRevenue + newTransaction.amount,
            lastTransaction: 'ora'
          }
        : device
    ));

    // Generate AI insights based on transaction
    if (riskScore > 0.8) {
      const alertInsight: AIInsight = {
        id: `insight-${Date.now()}`,
        type: 'alert',
        title: t('pos.highRiskTransaction'),
        description: `${t('pos.transactionWith')} €${newTransaction.amount.toFixed(2)} ${t('pos.withRiskScore')} ${(riskScore * 100).toFixed(0)}%`,
        impact: 'high',
        confidence: 90,
        timestamp: new Date().toISOString(),
        actionable: true
      };
      setAiInsights(prev => [alertInsight, ...prev.slice(0, 4)]);
    }

    addToLog(`${t('pos.simulatedTransaction')} ${t('pos.simulatedOn')} ${pos.name}: €${newTransaction.amount.toFixed(2)}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t('pos.management')}</h1>
          <p className="text-gray-600 mt-1">{t('pos.managementDescription')}</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'dashboard'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
{t('pos.financialDashboard')}
              </button>
              <button
                onClick={() => setActiveTab('devices')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'devices'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('pos.posManagement')}
              </button>
              <button
                onClick={() => setActiveTab('cards')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'cards'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('pos.cardManagement')}
              </button>
              <button
                onClick={() => setActiveTab('providers')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'providers'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('pos.cardProviders')}
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'analytics'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('pos.aiAnalytics')}
              </button>
              <button
                onClick={() => setActiveTab('hub')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'hub'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('pos.paymentHub')}
              </button>
            </nav>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'dashboard' && (
          <FinancialDashboard />
        )}

        {activeTab === 'devices' && (
          <POSDeviceManagement
            devices={posDevices}
            selectedDevice={selectedDevice}
            setSelectedDevice={setSelectedDevice}
            addDevice={addDevice}
            updateDevice={updateDevice}
            removeDevice={removeDevice}
            restartDevice={restartDevice}
          />
        )}

        {activeTab === 'cards' && (
          <DebitCardManagement
            debitCards={debitCards}
            cardTransactions={cardTransactions}
            cardApplications={cardApplications}
            selectedCard={selectedCard}
            cardManagementView={cardManagementView}
            setSelectedCard={setSelectedCard}
            setCardManagementView={setCardManagementView}
            blockCard={blockCard}
            unblockCard={unblockCard}
            updateCardLimits={updateCardLimits}
            processCardApplication={processCardApplication}
            simulateCardTransaction={simulateCardTransaction}
            generateCardAnalytics={generateCardAnalytics}
          />
        )}

        {activeTab === 'providers' && (
          <CardProviderManagement />
        )}

        {activeTab === 'analytics' && (
          <AdvancedAnalytics />
        )}
        
        {activeTab === 'hub' && (
          <PaymentProviderHub />
        )}
      </div>
      
      {/* Sezione Crediti */}
      <div className="mt-8 border-t border-gray-200 pt-6">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">AP</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{t('pos.developedBy')}</h3>
                <p className="text-sm text-gray-600">{t('pos.fintechDeveloper')}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 mb-2">{t('pos.needCustomBackend')}</p>
              <a 
                href="mailto:andreapiai.dev@gmail.com?subject=Richiesta Backend Personalizzato - POS Management" 
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {t('pos.contactMe')}
              </a>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center text-gray-600">
              <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {t('pos.apiIntegration')}
            </div>
            <div className="flex items-center text-gray-600">
              <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {t('pos.databaseDesign')}
            </div>
            <div className="flex items-center text-gray-600">
              <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {t('pos.securityImplementation')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default POSManagement;