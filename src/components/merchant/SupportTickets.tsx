import React, { useState } from 'react';
import { Plus, Search, Filter, MessageSquare, Clock, CheckCircle, AlertCircle, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const SupportTickets: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const { t } = useTranslation();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newTicket, setNewTicket] = useState({
    subject: '',
    category: 'technical',
    priority: 'medium',
    description: ''
  });

  const tickets = [
    {
      id: 'TICK-001',
      subject: 'Problema con transazione bloccata',
      category: 'Tecnico',
      priority: 'high',
      status: 'open',
      createdAt: '2024-01-15 10:30:00',
      lastUpdate: '2024-01-15 14:20:00',
      assignedTo: 'Marco Rossi',
      messages: 3
    },
    {
      id: 'TICK-002',
      subject: t('merchant.transactionLimitIncrease'),
      category: 'Account',
      priority: 'medium',
      status: 'in_progress',
      createdAt: '2024-01-14 16:45:00',
      lastUpdate: '2024-01-15 09:15:00',
      assignedTo: 'Sara Bianchi',
      messages: 5
    },
    {
      id: 'TICK-003',
      subject: 'Documentazione API webhook',
      category: 'Documentazione',
      priority: 'low',
      status: 'resolved',
      createdAt: '2024-01-12 11:20:00',
      lastUpdate: '2024-01-13 15:30:00',
      assignedTo: 'Luca Verdi',
      messages: 2
    },
    {
      id: 'TICK-004',
      subject: 'Commissioni non corrispondenti',
      category: 'Fatturazione',
      priority: 'high',
      status: 'open',
      createdAt: '2024-01-11 09:15:00',
      lastUpdate: '2024-01-11 12:45:00',
      assignedTo: 'Anna Neri',
      messages: 1
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-red-100 text-red-800';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'open':
        return 'Aperto';
      case 'in_progress':
        return 'In Lavorazione';
      case 'resolved':
        return 'Risolto';
      default:
        return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open':
        return AlertCircle;
      case 'in_progress':
        return Clock;
      case 'resolved':
        return CheckCircle;
      default:
        return MessageSquare;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    // Here would be the API call to create the ticket
    // TODO: Implement proper logging service
    setShowCreateForm(false);
    setNewTicket({ subject: '', category: 'technical', priority: 'medium', description: '' });
    // Show success notification
    alert('Ticket creato con successo!');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('merchant.supportCenter')}</h1>
          <p className="text-gray-500 mt-1">{t('support.supportTickets')}</p>
        </div>
        <button 
          onClick={() => setShowCreateForm(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Nuovo Ticket</span>
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Ticket Aperti</h3>
          <p className="text-2xl font-bold text-red-600">{tickets.filter(t => t.status === 'open').length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">In Lavorazione</h3>
          <p className="text-2xl font-bold text-yellow-600">{tickets.filter(t => t.status === 'in_progress').length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Risolti</h3>
          <p className="text-2xl font-bold text-green-600">{tickets.filter(t => t.status === 'resolved').length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Tempo Medio Risposta</h3>
          <p className="text-2xl font-bold text-indigo-600">2.4h</p>
        </div>
      </div>

      {/* Create Ticket Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Nuovo Ticket di Supporto</h3>
            <form onSubmit={handleCreateTicket} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Oggetto</label>
                <input
                  type="text"
                  value={newTicket.subject}
                  onChange={(e) => setNewTicket({...newTicket, subject: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Categoria</label>
                  <select
                    value={newTicket.category}
                    onChange={(e) => setNewTicket({...newTicket, category: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="technical">Tecnico</option>
                    <option value="account">Account</option>
                    <option value="billing">Fatturazione</option>
                    <option value="documentation">Documentazione</option>
                    <option value="other">Altro</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priorità</label>
                  <select
                    value={newTicket.priority}
                    onChange={(e) => setNewTicket({...newTicket, priority: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="low">Bassa</option>
                    <option value="medium">Media</option>
                    <option value="high">Alta</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Descrizione</label>
                <textarea
                  value={newTicket.description}
                  onChange={(e) => setNewTicket({...newTicket, description: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows={4}
                  required
                />
              </div>
              <div className="flex items-center space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                >
                  Crea Ticket
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

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Cerca ticket..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent w-64"
              />
            </div>
            
            <select className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
              <option value="all">{t('merchant.allStates')}</option>
              <option value="open">Aperti</option>
              <option value="in_progress">In Lavorazione</option>
              <option value="resolved">Risolti</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tickets List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">I Tuoi Ticket</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {tickets.map((ticket) => {
            const StatusIcon = getStatusIcon(ticket.status);
            return (
              <div key={ticket.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <StatusIcon className="w-5 h-5 text-gray-400" />
                      <h4 className="text-lg font-semibold text-gray-900">{ticket.subject}</h4>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(ticket.status)}`}>
                        {getStatusText(ticket.status)}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                      <span>ID: {ticket.id}</span>
                      <span>Categoria: {ticket.category}</span>
                      <span className={`font-medium ${getPriorityColor(ticket.priority)}`}>
                        Priorità: {ticket.priority === 'high' ? 'Alta' : ticket.priority === 'medium' ? 'Media' : 'Bassa'}
                      </span>
                      <span>Assegnato a: {ticket.assignedTo}</span>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>Creato: {new Date(ticket.createdAt).toLocaleDateString('it-IT')}</span>
                      <span>Ultimo aggiornamento: {new Date(ticket.lastUpdate).toLocaleDateString('it-IT')}</span>
                      <div className="flex items-center space-x-1">
                        <MessageSquare className="w-4 h-4" />
                        <span>{ticket.messages} messaggi</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <button className="px-3 py-1 bg-indigo-600 text-white rounded text-sm hover:bg-indigo-700 transition-colors duration-200">
                      Visualizza
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Help Resources */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Risorse Utili</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Documentazione API</h4>
            <p className="text-sm text-blue-700 mb-3">Guide complete per l'integrazione</p>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Vai alla documentazione →
            </button>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-medium text-green-900 mb-2">FAQ</h4>
            <p className="text-sm text-green-700 mb-3">Risposte alle domande più frequenti</p>
            <button className="text-green-600 hover:text-green-700 text-sm font-medium">
              Consulta le FAQ →
            </button>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <h4 className="font-medium text-purple-900 mb-2">Video Tutorial</h4>
            <p className="text-sm text-purple-700 mb-3">Guide video passo-passo</p>
            <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
              Guarda i video →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportTickets;