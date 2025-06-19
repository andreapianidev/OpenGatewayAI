import React from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, Shield, BarChart3, Users, ArrowRight, CheckCircle } from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
      {/* Header */}
      <nav className="px-6 py-4 bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">OpenGatewayAI</span>
          </div>
          <Link 
            to="/login"
            className="px-6 py-2 bg-white text-blue-900 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200"
          >
            دخول / Login
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">
            Gateway Pagamenti
            <span className="block text-blue-300">with Integrated AI</span>
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Open Source Payment Gateway with AI-powered analytics and fraud detection. 
            Backend sicuro, dashboard avanzate, integrazione con processori bancari locali.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Link 
              to="/login"
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 flex items-center space-x-2 shadow-xl"
            >
              <span>Accedi alla Demo</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Backend Proprietario</h3>
            <p className="text-blue-100 mb-6">
              Revolutionary payment processing platform with integrated AI capabilities, ready for PCI-DSS certification and global POS integration.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center text-blue-100">
                <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                <span>Sicurezza TLS 1.2+ e crittografia avanzata</span>
              </li>
              <li className="flex items-center text-blue-100">
                <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                <span>Audit log completo per compliance</span>
              </li>
            </ul>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <div className="w-12 h-12 bg-indigo-500 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Gestione Merchant</h3>
            <p className="text-blue-100 mb-6">
              Controllo completo su onboarding esercenti, commissioni personalizzate e monitoraggio transazioni in tempo reale.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center text-blue-100">
                <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                <span>Dashboard amministrativa avanzata</span>
              </li>
              <li className="flex items-center text-blue-100">
                <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                <span>Fee engine dinamico</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Demo Credentials */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center">
          <h3 className="text-2xl font-bold text-white mb-6">Credenziali Demo</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-800/50 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-blue-200 mb-3">Dashboard Admin</h4>
              <p className="text-blue-100 text-sm mb-2">Email: admin@opengateway.ai</p>
              <p className="text-blue-100 text-sm">Password: admin123</p>
            </div>
            <div className="bg-indigo-800/50 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-indigo-200 mb-3">Dashboard Merchant</h4>
              <p className="text-indigo-100 text-sm mb-2">Email: merchant@example.com</p>
              <p className="text-indigo-100 text-sm">Password: merchant123</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black/20 border-t border-white/20 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-blue-200">
            OpenGatewayAI - Open Source Payment Gateway | Created by Andrea Piani | 
            <span className="text-blue-100"> Sviluppato da Immaginet Srl</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;