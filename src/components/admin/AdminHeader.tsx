import React from 'react';
import { Menu, Bell, Search, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import LanguageSelector from '../LanguageSelector';

interface AdminHeaderProps {
  onMenuClick: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ onMenuClick }) => {
  const { t } = useTranslation();
  const { user } = useAuth();

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
              {t('dashboard.adminPanel')} - {t('common.paymentGateway')}
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="hidden md:block relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder={t('common.searchPlaceholder')}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Notifications */}
          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full relative">
            <Bell className="w-6 h-6" />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
          </button>

          {/* Language Selector */}
          <LanguageSelector />

          {/* User Menu */}
          <div className="flex items-center space-x-3">
            <div className="hidden md:block text-right">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500">{t('auth.administrator')}</p>
            </div>
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;