import React from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, Shield, BarChart3, Users, ArrowRight, CheckCircle, Smartphone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../components/LanguageSelector';

const LandingPage: React.FC = () => {
  const { t } = useTranslation();
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
          <div className="flex items-center space-x-4">
            <LanguageSelector />
            <Link 
              to="/login"
              className="px-6 py-2 bg-white text-blue-900 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200"
            >
              دخول / Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">
            Payment Gateway Fintech
            <span className="block text-blue-300">per POS Android e Carte di Debito</span>
          </h1>
          <p className="text-xl text-blue-100 mb-4 max-w-3xl mx-auto">
            Piattaforma fintech completa per la gestione di pagamenti POS su dispositivi Android con sistema integrato di carte di debito e analytics AI avanzati.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <span className="px-4 py-2 bg-blue-500/30 text-blue-200 rounded-full text-sm font-medium border border-blue-400/30">
              🤖 Android POS
            </span>
            <span className="px-4 py-2 bg-green-500/30 text-green-200 rounded-full text-sm font-medium border border-green-400/30">
              💳 Carte di Debito
            </span>
            <span className="px-4 py-2 bg-purple-500/30 text-purple-200 rounded-full text-sm font-medium border border-purple-400/30">
              🏦 Fintech Solution
            </span>
            <span className="px-4 py-2 bg-orange-500/30 text-orange-200 rounded-full text-sm font-medium border border-orange-400/30">
              🧠 AI Analytics
            </span>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              to="/login"
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 flex items-center space-x-2 shadow-xl"
            >
              <span>{t('landing.accessDemo')}</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              to="/android-preview"
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-200 flex items-center space-x-2 shadow-xl"
            >
              <Smartphone className="w-5 h-5" />
              <span>{t('landing.androidPreview')}</span>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Backend Fintech Proprietario</h3>
            <p className="text-blue-100 mb-6">
              Piattaforma di elaborazione pagamenti rivoluzionaria con capacità AI integrate, pronta per certificazione PCI-DSS e integrazione POS globale su Android.
            </p>
            <div className="space-y-3">
              <div className="flex items-center text-green-300">
                <CheckCircle className="w-5 h-5 mr-3" />
                <span>Sicurezza TLS 1.2+ e crittografia avanzata</span>
              </div>
              <div className="flex items-center text-green-300">
                <CheckCircle className="w-5 h-5 mr-3" />
                <span>Audit completo per conformità PCI-DSS</span>
              </div>
              <div className="flex items-center text-green-300">
                <CheckCircle className="w-5 h-5 mr-3" />
                <span>SDK Android nativo per POS</span>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <div className="w-12 h-12 bg-indigo-500 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Gestione Carte di Debito</h3>
            <p className="text-blue-100 mb-6">
              Controllo completo sull'onboarding dei merchant, commissioni personalizzate e monitoraggio delle transazioni in tempo reale con analytics AI.
            </p>
            <div className="space-y-3">
              <div className="flex items-center text-green-300">
                <CheckCircle className="w-5 h-5 mr-3" />
                <span>Dashboard amministrativo avanzato</span>
              </div>
              <div className="flex items-center text-green-300">
                <CheckCircle className="w-5 h-5 mr-3" />
                <span>Motore commissioni dinamico</span>
              </div>
              <div className="flex items-center text-green-300">
                <CheckCircle className="w-5 h-5 mr-3" />
                <span>Emissione carte di debito integrate</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-white text-center mb-4">Dashboard Amministrativo Completo</h2>
          <p className="text-xl text-blue-100 text-center mb-12 max-w-3xl mx-auto">
            Interfaccia completa per la gestione del gateway di pagamento con AI integrata. Gestisci POS Android, carte di debito, transazioni e analytics in tempo reale.
          </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <div className="bg-white rounded-xl p-4 shadow-2xl">
              <img 
                src="https://opengatewayai.andreapiani.com/home1.png" 
                alt="Dashboard Admin Preview" 
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Demo Credentials and Android Preview */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center">
            <h3 className="text-2xl font-bold text-white mb-6">Credenziali Demo</h3>
            <div className="grid gap-6">
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
          
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center">
            <h3 className="text-2xl font-bold text-white mb-6">Anteprima POS Android</h3>
            <div className="bg-green-800/50 rounded-xl p-6 mb-4">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-green-200 mb-3">Interfaccia POS Mobile</h4>
              <p className="text-green-100 text-sm mb-4">
                Prova l'interfaccia del terminale di pagamento Android con simulazione completa delle transazioni.
              </p>
              <Link 
                to="/android-preview"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors duration-200"
              >
                <Smartphone className="w-4 h-4" />
                <span>Visualizza Demo</span>
              </Link>
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