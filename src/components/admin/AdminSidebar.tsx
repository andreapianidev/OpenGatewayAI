import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { X, Home, Users, CreditCard, Settings, BarChart3, Percent, LogOut, Monitor, Wifi, AlertTriangle, Brain, Shield, TrendingUp, Activity, MapPin, Smartphone, Globe, DollarSign, Building2, FileText, Cloud } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, onClose }) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const { logout } = useAuth();
  const isArabic = i18n.language === 'ar';

  const navigation = [
    { name: t('navigation.dashboard'), href: '', icon: Home },
    { name: t('merchants.merchantManagement'), href: 'merchants', icon: Users },
    { name: t('navigation.transactions'), href: 'transactions', icon: CreditCard },
    { name: t('navigation.commissions'), href: 'commissions', icon: Percent },
    { name: t('navigation.reportsAnalytics'), href: 'reports', icon: BarChart3 },
    { name: t('navigation.settings'), href: 'settings', icon: Settings },
    { name: t('navigation.aiSettings'), href: 'ai-settings', icon: Brain },
  ];

  const isActive = (href: string) => {
    // For the dashboard link, we want an exact match
    if (href === '') {
      return location.pathname === '/admin' || location.pathname === '/admin/';
    }
    return location.pathname.startsWith(`/admin/${href}`);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={onClose} />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between h-16 px-6 bg-gradient-to-r from-blue-600 to-indigo-700">
          <h1 className="text-xl font-bold text-white">{t('dashboard.adminPanel')}</h1>
          <button onClick={onClose} className="text-white lg:hidden">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* POS Network Status Section */}
        <div className="mt-6 mx-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
          <div className="flex items-center mb-3">
            <Monitor className="w-5 h-5 text-blue-600 mr-2" />
            <h3 className="text-sm font-semibold text-blue-800">{t('pos.posNetwork')}</h3>
          </div>
          
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">{t('pos.totalDevices')}:</span>
              <span className="text-gray-800 font-medium">24</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-600">{t('common.online')}:</span>
              <div className="flex items-center">
                <Wifi className="w-3 h-3 text-green-500 mr-1" />
                <span className="text-green-600 font-medium">22</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-600">{t('common.offline')}:</span>
              <div className="flex items-center">
                <AlertTriangle className="w-3 h-3 text-orange-500 mr-1" />
                <span className="text-orange-600 font-medium">2</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-600">{t('pos.lastUpdate')}:</span>
              <span className="text-gray-800">30 sec fa</span>
            </div>
          </div>
        </div>

        <nav className="mt-6">
          <div className="px-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  onClick={() => onClose()}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
            
            {/* AI-Powered Features */}
            <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {t('ai.features')}
            </div>
            
            <Link
              to="ai-analytics"
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                isActive('ai-analytics')
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
              onClick={() => onClose()}
            >
              <Brain className="w-5 h-5 mr-3" />
              {t('ai.analytics')}
            </Link>
            
            <Link
              to="fraud-detection"
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                isActive('fraud-detection')
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
              onClick={() => onClose()}
            >
              <Shield className="w-5 h-5 mr-3" />
              {t('ai.fraudDetection')}
            </Link>
            
            <Link
              to="real-time-monitoring"
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                isActive('real-time-monitoring')
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
              onClick={() => onClose()}
            >
              <Activity className="w-5 h-5 mr-3" />
              {t('ai.realTimeMonitoring')}
            </Link>
            

            
            <Link
              to="merchant-locations"
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                isActive('merchant-locations')
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
              onClick={() => onClose()}
            >
              <MapPin className="w-5 h-5 mr-3" />
              Merchant Locations
            </Link>
            
            <Link
              to="pos-management"
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                isActive('pos-management')
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
              onClick={() => onClose()}
            >
              <Smartphone className="w-5 h-5 mr-3" />
              {t('pos.management')}
            </Link>
            
            <Link
              to="cloud-management"
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                isActive('cloud-management')
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
              onClick={() => onClose()}
            >
              <Cloud className="w-5 h-5 mr-3" />
              {t('ai.cloudManagement')}
            </Link>
            
            {/* Syrian Market Settings - Only visible when Arabic is selected */}
            {isArabic && (
              <>
                <div className="px-3 py-2 mt-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  إعدادات السوق السوري
                </div>
                
                <div className="mx-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200 mb-4">
                  <div className="flex items-center mb-3">
                    <Globe className="w-5 h-5 text-green-600 mr-2" />
                    <h3 className="text-sm font-semibold text-green-800">حالة السوق السوري</h3>
                  </div>
                  
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">معدل الصرف (SYP/USD):</span>
                      <span className="text-gray-800 font-medium">2,512</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">البنوك النشطة:</span>
                      <div className="flex items-center">
                        <Building2 className="w-3 h-3 text-green-500 mr-1" />
                        <span className="text-green-600 font-medium">8</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">حجم المعاملات اليومي:</span>
                      <span className="text-gray-800 font-medium">₺2.4M</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">آخر تحديث:</span>
                      <span className="text-gray-800">منذ 5 دقائق</span>
                    </div>
                  </div>
                </div>
                
                <Link
                  to="syrian-regulations"
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    isActive('syrian-regulations')
                      ? 'bg-green-50 text-green-700 border-r-2 border-green-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  onClick={() => onClose()}
                >
                  <FileText className="w-5 h-5 mr-3" />
                  اللوائح والقوانين
                </Link>
                
                <Link
                  to="syrian-banking"
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    isActive('syrian-banking')
                      ? 'bg-green-50 text-green-700 border-r-2 border-green-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  onClick={() => onClose()}
                >
                  <Building2 className="w-5 h-5 mr-3" />
                  النظام المصرفي
                </Link>
                
                <Link
                  to="syrian-exchange"
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    isActive('syrian-exchange')
                      ? 'bg-green-50 text-green-700 border-r-2 border-green-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  onClick={() => onClose()}
                >
                  <DollarSign className="w-5 h-5 mr-3" />
                  أسعار الصرف
                </Link>
              </>
            )}
          </div>
        </nav>

        <div className="absolute bottom-0 w-full p-4">
          <button
            onClick={logout}
            className="flex items-center w-full px-4 py-3 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors duration-200"
          >
            <LogOut className="w-5 h-5 mr-3" />
            {t('auth.logout')}
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;