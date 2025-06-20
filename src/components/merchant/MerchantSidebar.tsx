import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { X, Home, CreditCard, Receipt, Settings, MessageSquare, LogOut, Wifi, WifiOff, Monitor, UserPlus } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface MerchantSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const MerchantSidebar: React.FC<MerchantSidebarProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const { logout } = useAuth();

  const navigation = [
    { name: t('navigation.dashboard'), href: '/merchant', icon: Home },
    { name: t('navigation.transactionHistory'), href: '/merchant/transactions', icon: CreditCard },
    { name: t('transactions.transactions'), href: '/merchant/payments', icon: Receipt },
    { name: t('affiliate.affiliateProgram'), href: '/merchant/affiliate-program', icon: UserPlus },
    { name: t('navigation.accountSettings'), href: '/merchant/settings', icon: Settings },
    { name: t('navigation.support'), href: '/merchant/support', icon: MessageSquare },
  ];

  const isActive = (href: string) => {
    if (href === '/merchant') {
      return location.pathname === '/merchant';
    }
    return location.pathname.startsWith(href);
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
        <div className="flex items-center justify-between h-16 px-6 bg-gradient-to-r from-indigo-600 to-purple-700">
          <h1 className="text-xl font-bold text-white">{t('dashboard.merchantOverview')}</h1>
          <button onClick={onClose} className="text-white lg:hidden">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* POS Information Section */}
        <div className="mt-6 mx-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
          <div className="flex items-center mb-3">
            <Monitor className="w-5 h-5 text-green-600 mr-2" />
            <h3 className="text-sm font-semibold text-green-800">{t('pos.posConnected')}</h3>
          </div>
          
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">{t('common.status')}:</span>
              <div className="flex items-center">
                <Wifi className="w-3 h-3 text-green-500 mr-1" />
                <span className="text-green-600 font-medium">{t('common.online')}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-600">{t('pos.deviceModel')}:</span>
              <span className="text-gray-800 font-medium">PAX A920 Pro</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-600">{t('pos.serialNumber')}:</span>
              <span className="text-gray-800 font-mono text-xs">PX920-2024-001</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-600">{t('pos.lastSync')}:</span>
              <span className="text-gray-800">2 min fa</span>
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
                      ? 'bg-indigo-50 text-indigo-700 border-r-2 border-indigo-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  onClick={() => onClose()}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
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

export default MerchantSidebar;