import React from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, Shield, BarChart3, Users, ArrowRight, CheckCircle, Smartphone, Cloud, UserPlus } from 'lucide-react';
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
            {t('landing.mainTitle')}
            <span className="block text-blue-300">{t('landing.heroSubtitle')}</span>
          </h1>
          <p className="text-xl text-blue-100 mb-4 max-w-3xl mx-auto">
            {t('landing.heroDescription')}
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <span className="px-4 py-2 bg-blue-500/30 text-blue-200 rounded-full text-sm font-medium border border-blue-400/30">
              {t('landing.features.androidPOS')}
            </span>
            <span className="px-4 py-2 bg-green-500/30 text-green-200 rounded-full text-sm font-medium border border-green-400/30">
              {t('landing.features.debitCards')}
            </span>
            <span className="px-4 py-2 bg-purple-500/30 text-purple-200 rounded-full text-sm font-medium border border-purple-400/30">
              {t('landing.features.fintechSolution')}
            </span>
            <span className="px-4 py-2 bg-orange-500/30 text-orange-200 rounded-full text-sm font-medium border border-orange-400/30">
              {t('landing.features.aiAnalytics')}
            </span>
            <span className="px-4 py-2 bg-red-500/30 text-red-200 rounded-full text-sm font-medium border border-red-400/30">
              {t('landing.features.windowsNative')}
            </span>
            <span className="px-4 py-2 bg-gray-500/30 text-gray-200 rounded-full text-sm font-medium border border-gray-400/30">
              {t('landing.features.macOSUniversal')}
            </span>
            <span className="px-4 py-2 bg-cyan-500/30 text-cyan-200 rounded-full text-sm font-medium border border-cyan-400/30">
              {t('landing.features.cloudManagement')}
            </span>
            <span className="px-4 py-2 bg-pink-500/30 text-pink-200 rounded-full text-sm font-medium border border-pink-400/30">
              {t('landing.features.affiliateProgram')}
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
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">{t('landing.featuresGrid.proprietaryBackend')}</h3>
            <p className="text-blue-100 mb-6">
              {t('landing.featuresGrid.proprietaryBackendDesc')}
            </p>
            <div className="space-y-3">
              <div className="flex items-center text-green-300">
                <CheckCircle className="w-5 h-5 mr-3" />
                <span>{t('landing.featuresGrid.advancedSecurity')}</span>
              </div>
              <div className="flex items-center text-green-300">
                <CheckCircle className="w-5 h-5 mr-3" />
                <span>{t('landing.featuresGrid.completeAudit')}</span>
              </div>
              <div className="flex items-center text-green-300">
                <CheckCircle className="w-5 h-5 mr-3" />
                <span>{t('landing.featuresGrid.nativeAndroidSDK')}</span>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <div className="w-12 h-12 bg-indigo-500 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">{t('landing.featuresGrid.debitCardManagement')}</h3>
            <p className="text-blue-100 mb-6">
              {t('landing.featuresGrid.debitCardManagementDesc')}
            </p>
            <div className="space-y-3">
              <div className="flex items-center text-green-300">
                <CheckCircle className="w-5 h-5 mr-3" />
                <span>{t('landing.featuresGrid.advancedDashboard')}</span>
              </div>
              <div className="flex items-center text-green-300">
                <CheckCircle className="w-5 h-5 mr-3" />
                <span>{t('landing.featuresGrid.dynamicCommissionEngine')}</span>
              </div>
              <div className="flex items-center text-green-300">
                <CheckCircle className="w-5 h-5 mr-3" />
                <span>Emissione carte di debito integrate</span>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <div className="w-12 h-12 bg-cyan-500 rounded-lg flex items-center justify-center mb-4">
              <Cloud className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">{t('landing.featuresGrid.cloudManagement')}</h3>
            <p className="text-blue-100 mb-6">
              {t('landing.featuresGrid.cloudManagementDesc')}
            </p>
            <div className="space-y-3">
              <div className="flex items-center text-green-300">
                <CheckCircle className="w-5 h-5 mr-3" />
                <span>{t('landing.featuresGrid.multiProviderSupport')}</span>
              </div>
              <div className="flex items-center text-green-300">
                <CheckCircle className="w-5 h-5 mr-3" />
                <span>{t('landing.featuresGrid.realTimeCostMonitoring')}</span>
              </div>
              <div className="flex items-center text-green-300">
                <CheckCircle className="w-5 h-5 mr-3" />
                <span>{t('landing.featuresGrid.centralizedAPIConfig')}</span>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <div className="w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center mb-4">
              <UserPlus className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">{t('landing.featuresGrid.affiliateProgram')}</h3>
            <p className="text-blue-100 mb-6">
              {t('landing.featuresGrid.affiliateProgramDesc')}
            </p>
            <div className="space-y-3">
              <div className="flex items-center text-green-300">
                <CheckCircle className="w-5 h-5 mr-3" />
                <span>{t('landing.featuresGrid.advancedReferralTracking')}</span>
              </div>
              <div className="flex items-center text-green-300">
                <CheckCircle className="w-5 h-5 mr-3" />
                <span>{t('landing.featuresGrid.multiLevelCommissions')}</span>
              </div>
              <div className="flex items-center text-green-300">
                <CheckCircle className="w-5 h-5 mr-3" />
                <span>{t('landing.featuresGrid.dedicatedAffiliateDashboard')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-white text-center mb-4">{t('landing.dashboardPreview.title')}</h2>
          <p className="text-xl text-blue-100 text-center mb-12 max-w-3xl mx-auto">
            {t('landing.dashboardPreview.description')}
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

        {/* New Features Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">{t('landing.newFeatures.title')}</h2>
            <p className="text-xl text-blue-100 max-w-4xl mx-auto">
              {t('landing.newFeatures.description')}
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Cloud Management */}
            <div className="bg-gradient-to-br from-cyan-900/50 to-blue-900/50 backdrop-blur-md rounded-2xl p-8 border border-cyan-400/30">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center mr-4">
                  <Cloud className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{t('landing.newFeatures.cloudManagement.title')}</h3>
                <p className="text-cyan-200">{t('landing.newFeatures.cloudManagement.subtitle')}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-cyan-800/30 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-cyan-300 mb-1">47</div>
                  <div className="text-cyan-200 text-sm">{t('landing.newFeatures.cloudManagement.totalServers')}</div>
                </div>
                <div className="bg-green-800/30 rounded-xl p-4 text-center">
                   <div className="text-2xl font-bold text-green-300 mb-1">€300</div>
                   <div className="text-green-200 text-sm">{t('landing.newFeatures.cloudManagement.monthlyCosts')}</div>
                 </div>
                <div className="bg-purple-800/30 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-purple-300 mb-1">97%</div>
                  <div className="text-purple-200 text-sm">{t('landing.newFeatures.cloudManagement.securityScore')}</div>
                </div>
                <div className="bg-orange-800/30 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-orange-300 mb-1">94%</div>
                  <div className="text-orange-200 text-sm">{t('landing.newFeatures.cloudManagement.performance')}</div>
                </div>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-center text-cyan-200">
                  <CheckCircle className="w-4 h-4 mr-3 text-green-400" />
                  <span>{t('landing.newFeatures.cloudManagement.awsAzureGoogleIntegrated')}</span>
                </div>
                <div className="flex items-center text-cyan-200">
                  <CheckCircle className="w-4 h-4 mr-3 text-green-400" />
                  <span>{t('landing.newFeatures.cloudManagement.realTimeCostMonitoring')}</span>
                </div>
                <div className="flex items-center text-cyan-200">
                  <CheckCircle className="w-4 h-4 mr-3 text-green-400" />
                  <span>{t('landing.newFeatures.cloudManagement.centralizedAPIConfig')}</span>
                </div>
              </div>
            </div>
            
            {/* Affiliate Program */}
            <div className="bg-gradient-to-br from-pink-900/50 to-purple-900/50 backdrop-blur-md rounded-2xl p-8 border border-pink-400/30">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center mr-4">
                  <UserPlus className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{t('landing.newFeatures.affiliateProgram.title')}</h3>
                  <p className="text-pink-200">{t('landing.newFeatures.affiliateProgram.subtitle')}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-pink-800/30 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-pink-300 mb-1">1,247</div>
                  <div className="text-pink-200 text-sm">{t('landing.newFeatures.affiliateProgram.totalReferrals')}</div>
                </div>
                <div className="bg-green-800/30 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-green-300 mb-1">€15,420</div>
                  <div className="text-green-200 text-sm">{t('landing.newFeatures.affiliateProgram.totalEarnings')}</div>
                </div>
                <div className="bg-blue-800/30 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-blue-300 mb-1">70%</div>
                  <div className="text-blue-200 text-sm">{t('landing.newFeatures.affiliateProgram.activationRate')}</div>
                </div>
                <div className="bg-purple-800/30 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-purple-300 mb-1">+12</div>
                  <div className="text-purple-200 text-sm">{t('landing.newFeatures.affiliateProgram.thisMonth')}</div>
                </div>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-center text-pink-200">
                  <CheckCircle className="w-4 h-4 mr-3 text-green-400" />
                  <span>{t('landing.newFeatures.affiliateProgram.multiLevelReferralTracking')}</span>
                </div>
                <div className="flex items-center text-pink-200">
                  <CheckCircle className="w-4 h-4 mr-3 text-green-400" />
                  <span>{t('landing.newFeatures.affiliateProgram.customizableCommissions')}</span>
                </div>
                <div className="flex items-center text-pink-200">
                  <CheckCircle className="w-4 h-4 mr-3 text-green-400" />
                  <span>{t('landing.newFeatures.affiliateProgram.dedicatedAffiliateDashboard')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Demo Credentials and Android Preview */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center">
            <h3 className="text-2xl font-bold text-white mb-6">{t('landing.demoCredentials.title')}</h3>
            <div className="grid gap-4">
              <div className="bg-blue-800/50 rounded-xl p-4">
                <h4 className="text-lg font-semibold text-blue-200 mb-2">{t('landing.demoCredentials.adminDashboard')}</h4>
                <p className="text-blue-100 text-xs mb-1">{t('landing.demoCredentials.email')}: andreapiani.dev@gmail.com</p>
                  <p className="text-blue-100 text-xs">{t('landing.demoCredentials.password')}: admin123</p>
              </div>
              <div className="bg-indigo-800/50 rounded-xl p-4">
                <h4 className="text-lg font-semibold text-indigo-200 mb-2">{t('landing.demoCredentials.merchantDashboard')}</h4>
                <p className="text-indigo-100 text-xs mb-1">{t('landing.demoCredentials.email')}: merchant@example.com</p>
                  <p className="text-indigo-100 text-xs">{t('landing.demoCredentials.password')}: merchant123</p>
              </div>
              <div className="bg-cyan-800/50 rounded-xl p-4">
                <h4 className="text-lg font-semibold text-cyan-200 mb-2">{t('landing.demoCredentials.cloudManagement')}</h4>
                <p className="text-cyan-100 text-xs mb-1">{t('landing.demoCredentials.email')}: andreapiani.dev@gmail.com</p>
                  <p className="text-cyan-100 text-xs">{t('landing.demoCredentials.password')}: cloud123</p>
              </div>
              <div className="bg-pink-800/50 rounded-xl p-4">
                <h4 className="text-lg font-semibold text-pink-200 mb-2">{t('landing.demoCredentials.affiliateProgram')}</h4>
                <p className="text-pink-100 text-xs mb-1">{t('landing.demoCredentials.email')}: andreapiani.dev@gmail.com</p>
                  <p className="text-pink-100 text-xs">{t('landing.demoCredentials.password')}: affiliate123</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center">
            <h3 className="text-2xl font-bold text-white mb-6">{t('landing.androidPOSPreview.title')}</h3>
            <div className="bg-green-800/50 rounded-xl p-6 mb-4">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-green-200 mb-3">{t('landing.androidPOSPreview.subtitle')}</h4>
              <p className="text-green-100 text-sm mb-4">
                {t('landing.androidPOSPreview.description')}
              </p>
              <Link 
                to="/android-preview"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors duration-200"
              >
                <Smartphone className="w-4 h-4" />
                <span>{t('landing.androidPOSPreview.viewDemo')}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Native Apps & GitHub Section */}
        <div className="mt-16 mb-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">{t('landing.nativeApps.title')}</h2>
            <p className="text-xl text-blue-100 max-w-4xl mx-auto">
              {t('landing.nativeApps.description')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center">
              <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🍎</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{t('landing.nativeApps.macOSUniversal.title')}</h3>
              <p className="text-blue-100 text-sm mb-4">
                {t('landing.nativeApps.macOSUniversal.description')}
              </p>
              <div className="space-y-2 text-xs text-green-300">
                <div>✓ {t('landing.nativeApps.macOSUniversal.appleSilicon')}</div>
                <div>✓ {t('landing.nativeApps.macOSUniversal.intelX64')}</div>
                <div>✓ {t('landing.nativeApps.macOSUniversal.nativeMacOSUI')}</div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🪟</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{t('landing.nativeApps.windowsNative.title')}</h3>
              <p className="text-blue-100 text-sm mb-4">
                {t('landing.nativeApps.windowsNative.description')}
              </p>
              <div className="space-y-2 text-xs text-green-300">
                <div>✓ {t('landing.nativeApps.windowsNative.windowsX64')}</div>
                <div>✓ {t('landing.nativeApps.windowsNative.windowsX86')}</div>
                <div>✓ {t('landing.nativeApps.windowsNative.nsisInstaller')}</div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌐</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{t('landing.nativeApps.webApplication.title')}</h3>
              <p className="text-blue-100 text-sm mb-4">
                {t('landing.nativeApps.webApplication.description')}
              </p>
              <div className="space-y-2 text-xs text-green-300">
                <div>✓ {t('landing.nativeApps.webApplication.progressiveWebApp')}</div>
                <div>✓ {t('landing.nativeApps.webApplication.responsiveDesign')}</div>
                <div>✓ {t('landing.nativeApps.webApplication.crossBrowser')}</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 backdrop-blur-md rounded-2xl p-8 border border-purple-400/30 text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mr-4">
                <span className="text-2xl">🐙</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">{t('landing.nativeApps.openSource.title')}</h3>
                <p className="text-purple-200">{t('landing.nativeApps.openSource.subtitle')}</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-purple-800/30 rounded-xl p-4">
                <h4 className="text-lg font-semibold text-purple-200 mb-2">🚀 {t('landing.openSource.automatedBuilds.title')}</h4>
                <p className="text-purple-100 text-sm">
                  {t('landing.openSource.automatedBuilds.description')}
                </p>
              </div>
              <div className="bg-purple-800/30 rounded-xl p-4">
                <h4 className="text-lg font-semibold text-purple-200 mb-2">📚 {t('landing.openSource.completeDocumentation.title')}</h4>
                <p className="text-purple-100 text-sm">
                  {t('landing.openSource.completeDocumentation.description')}
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <a 
                href="https://github.com/andreapianidev/OpenGatewayAI"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2 shadow-xl"
              >
                <span>🐙</span>
                <span>{t('landing.openSource.viewOnGitHub')}</span>
                <ArrowRight className="w-5 h-5" />
              </a>
              <div className="px-6 py-3 bg-gray-800/50 text-gray-300 rounded-xl font-mono text-sm">
                {t('landing.openSource.gitClone')}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black/20 border-t border-white/20 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-4">
            <p className="text-blue-200 mb-2">
              OpenGatewayAI - Open Source Payment Gateway | 
              <a href="https://github.com/andreapianidev/OpenGatewayAI" target="_blank" rel="noopener noreferrer" className="text-purple-300 hover:text-purple-200 transition-colors">
                Disponibile su GitHub
              </a>
            </p>
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-lg p-4 border border-blue-400/30 inline-block">
              <p className="text-blue-100 font-medium">
                🚀 Created by <span className="text-white font-bold">Andrea Piani</span> | 
                📧 <a href="mailto:andreapiani.dev@gmail.com" className="text-blue-300 hover:text-blue-200 transition-colors">andreapiani.dev@gmail.com</a> | 
                🌐 <a href="https://www.andreapiani.com" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-200 transition-colors">www.andreapiani.com</a> | 
                <span className="text-blue-200">Sviluppato da Immaginet Srl</span>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;