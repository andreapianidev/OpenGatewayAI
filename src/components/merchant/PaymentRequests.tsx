import React, { useState, useMemo } from 'react';
import { Search, Filter, Download, Plus, Eye, Copy, ExternalLink, Calendar, DollarSign, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { generatePaymentUrl } from '../../config/urls';

const PaymentRequests: React.FC = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newRequest, setNewRequest] = useState({
    amount: '',
    description: '',
    customerEmail: '',
    expiryDays: '7'
  });
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  // Funzione per mostrare notifiche simulate
  const showSimulatedNotification = (message: string) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const paymentRequests = [
    {
      id: 'PAY_REQ_001',
      amount: 450.00,
      description: 'Ordine #1234 - Prodotti elettronici',
      customerEmail: 'cliente@email.com',
      status: 'pending',
      createdAt: '2024-01-15 10:30:00',
      expiresAt: '2024-01-22 10:30:00',
      paymentLink: generatePaymentUrl('PAY_REQ_001')
    },
    {
      id: 'PAY_REQ_002',
      amount: 125.50,
      description: 'Servizio consulenza - Gennaio 2024',
      customerEmail: 'business@company.sy',
      status: 'paid',
      createdAt: '2024-01-14 15:45:00',
      paidAt: '2024-01-14 16:20:00',
      paymentLink: generatePaymentUrl('PAY_REQ_002')
    },
    {
      id: 'PAY_REQ_003',
      amount: 890.75,
      description: 'Fattura #INV-2024-001',
      customerEmail: 'accounting@client.sy',
      status: 'expired',
      createdAt: '2024-01-05 09:15:00',
      expiresAt: '2024-01-12 09:15:00',
      paymentLink: generatePaymentUrl('PAY_REQ_003')
    },
    {
      id: 'PAY_REQ_004',
      amount: 275.25,
      description: 'Abbonamento mensile - Febbraio 2024',
      customerEmail: 'user@subscriber.sy',
      status: 'pending',
      createdAt: '2024-01-13 12:00:00',
      expiresAt: '2024-01-20 12:00:00',
      paymentLink: generatePaymentUrl('PAY_REQ_004')
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid':
        return 'Pagata';
      case 'pending':
        return 'In Attesa';
      case 'expired':
        return 'Scaduta';
      default:
        return status;
    }
  };

  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const requestId = 'PAY_REQ_' + Math.random().toString(36).substr(2, 6).toUpperCase();
      showSimulatedNotification(`🎉 Richiesta di pagamento ${requestId} creata con successo! Email inviata a ${newRequest.customerEmail}`);
      setShowCreateForm(false);
      setNewRequest({ amount: '', description: '', customerEmail: '', expiryDays: '7' });
    }, 2000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    showSimulatedNotification('📋 Link copiato negli appunti!');
  };

  const handleSendReminder = (requestId: string, email: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      showSimulatedNotification(`📧 Promemoria inviato con successo a ${email} per la richiesta ${requestId}`);
    }, 1500);
  };

  const handleGenerateQR = (requestId: string) => {
    showSimulatedNotification(`📱 Codice QR generato per la richiesta ${requestId}`);
  };

  const totalPending = useMemo(() => paymentRequests.filter(req => req.status === 'pending').reduce((sum, req) => sum + req.amount, 0), [paymentRequests]);
  const totalPaid = useMemo(() => paymentRequests.filter(req => req.status === 'paid').reduce((sum, req) => sum + req.amount, 0), [paymentRequests]);

  return (
    <div className="p-6 space-y-6">
      {/* Notification Toast */}
      {showNotification && (
        <div className="fixed top-4 right-4 z-50 bg-white border-l-4 border-green-500 rounded-lg shadow-lg p-4 max-w-md animate-slide-in">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-sm">✓</span>
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{notificationMessage}</p>
            </div>
            <button 
              onClick={() => setShowNotification(false)}
              className="ml-4 text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
          <div className="bg-white rounded-lg p-6 flex items-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div>
            <span className="text-gray-700">Elaborazione in corso...</span>
          </div>
        </div>
      )}
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Richieste di Pagamento</h1>
          <p className="text-gray-500 mt-1">{t('merchant.createAndManagePaymentLinks')}</p>
        </div>
        <button 
          onClick={() => setShowCreateForm(true)}
          disabled={isLoading}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="w-5 h-5" />
          <span>{t('merchant.newRequest')}</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Richieste Attive</h3>
          <p className="text-2xl font-bold text-yellow-600">{useMemo(() => paymentRequests.filter(req => req.status === 'pending').length, [paymentRequests])}</p>
          <p className="text-sm text-gray-500 mt-1">€{totalPending.toFixed(2)} in attesa</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Pagamenti Ricevuti</h3>
          <p className="text-2xl font-bold text-green-600">€{totalPaid.toFixed(2)}</p>
          <p className="text-sm text-gray-500 mt-1">{useMemo(() => paymentRequests.filter(req => req.status === 'paid').length, [paymentRequests])} transazioni</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Tasso di Conversione</h3>
          <p className="text-2xl font-bold text-indigo-600">
            {useMemo(() => ((paymentRequests.filter(req => req.status === 'paid').length / paymentRequests.length) * 100).toFixed(1), [paymentRequests])}%
          </p>
          <p className="text-sm text-gray-500 mt-1">Richieste pagate</p>
        </div>
      </div>

      {/* Create Payment Request Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('merchant.newPaymentRequestForm')}</h3>
            <form onSubmit={handleCreateRequest} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Importo (€)</label>
                <input
                  type="number"
                  step="0.01"
                  value={newRequest.amount}
                  onChange={(e) => setNewRequest({...newRequest, amount: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Descrizione</label>
                <textarea
                  value={newRequest.description}
                  onChange={(e) => setNewRequest({...newRequest, description: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows={3}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Cliente (opzionale)</label>
                <input
                  type="email"
                  value={newRequest.customerEmail}
                  onChange={(e) => setNewRequest({...newRequest, customerEmail: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Scadenza (giorni)</label>
                <select
                  value={newRequest.expiryDays}
                  onChange={(e) => setNewRequest({...newRequest, expiryDays: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="1">1 giorno</option>
                  <option value="3">3 giorni</option>
                  <option value="7">7 giorni</option>
                  <option value="14">14 giorni</option>
                  <option value="30">30 giorni</option>
                </select>
              </div>
              <div className="flex items-center space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                >
                  {t('merchant.createRequest')}
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Annulla
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Payment Requests List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Tutte le Richieste</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {paymentRequests.map((request) => (
            <div key={request.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-lg font-semibold text-gray-900">€{request.amount.toFixed(2)}</h4>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(request.status)}`}>
                      {getStatusText(request.status)}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2">{request.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>ID: {request.id}</span>
                    {request.customerEmail && <span>Cliente: {request.customerEmail}</span>}
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>Creata: {new Date(request.createdAt).toLocaleDateString('it-IT')}</span>
                    </div>
                    {request.status === 'pending' && (
                      <span className="text-orange-600">
                        Scade: {new Date(request.expiresAt!).toLocaleDateString('it-IT')}
                      </span>
                    )}
                    {request.status === 'paid' && (
                      <span className="text-green-600">
                        Pagata: {new Date(request.paidAt!).toLocaleDateString('it-IT')}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => copyToClipboard(request.paymentLink)}
                    disabled={isLoading}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    title={t('merchant.copyLink')}
                  >
                    <Copy className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => handleGenerateQR(request.id)}
                    disabled={isLoading}
                    className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Genera QR Code"
                  >
                    <QrCode className="w-5 h-5" />
                  </button>
                  {request.customerEmail && (
                    <button 
                      onClick={() => handleSendReminder(request.id, request.customerEmail)}
                      disabled={isLoading}
                      className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Invia promemoria"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
              
              {request.status === 'pending' && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Link className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-900">{t('merchant.paymentLink')}:</span>
                  </div>
                  <div className="mt-1 flex items-center space-x-2">
                    <code className="text-xs bg-white px-2 py-1 rounded border text-blue-800 flex-1">
                      {request.paymentLink}
                    </code>
                    <button
                      onClick={() => copyToClipboard(request.paymentLink)}
                      className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 transition-colors duration-200"
                    >
                      {t('merchant.copy')}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaymentRequests;