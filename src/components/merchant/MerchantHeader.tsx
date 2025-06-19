import React from 'react';
import { Menu, Bell, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../LanguageSelector';

interface MerchantHeaderProps {
  onMenuClick: () => void;
}

const MerchantHeader: React.FC<MerchantHeaderProps> = ({ onMenuClick }) => {
  const { user } = useAuth();
  const { t } = useTranslation();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 lg:hidden"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <div className="ml-4 lg:ml-0">
            <h1 className="text-xl font-semibold text-gray-900">
              {t('merchant.panel')} - {user?.name}
            </h1>
            <p className="text-sm text-gray-500">ID: {user?.merchantId}</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full relative">
            <Bell className="w-6 h-6" />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-green-400 ring-2 ring-white" />
          </button>

          {/* User Menu */}
          <div className="flex items-center space-x-3">
            <div className="hidden md:block text-right">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500">{t('common.merchants')}</p>
            </div>
            <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MerchantHeader;