import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { CreditCard, Eye, EyeOff, AlertCircle } from 'lucide-react';
import LanguageSelector from '../components/LanguageSelector';

const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const success = await login(email, password, rememberMe);
      if (success) {
        // Redirect based on role
        if (email === 'admin@opengateway.ai') {
          navigate('/admin');
        } else {
          navigate('/merchant');
        }
      } else {
        setError(t('auth.loginError'));
      }
    } catch (err) {
      setError(t('errors.authenticationFailed'));
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = (role: 'admin' | 'merchant') => {
    if (role === 'admin') {
      setEmail('admin@opengateway.ai');
      setPassword('admin123');
    } else {
      setEmail('merchant@example.com');
      setPassword('merchant123');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        {/* Language Selector */}
        <div className="flex justify-end mb-4">
          <LanguageSelector />
        </div>
        
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center">
              <CreditCard className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">OpenGatewayAI</span>
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">{t('auth.welcomeBack')}</h1>
          <p className="text-blue-200">{t('auth.signInToContinue')}</p>
        </div>

        {/* Login Form */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-blue-100 mb-2">
                {t('auth.email')}
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder={t('auth.email')}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-blue-100 mb-2">
                {t('auth.password')}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 pr-12"
                  placeholder={t('auth.password')}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-blue-300 hover:text-white transition-colors duration-200"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500 focus:ring-2"
              />
              <label htmlFor="rememberMe" className="ml-2 text-sm text-blue-100">
                {t('auth.rememberMe')}
              </label>
            </div>

            {error && (
              <div className="flex items-center space-x-2 text-red-300 bg-red-900/30 p-3 rounded-lg border border-red-500/30">
                <AlertCircle className="w-5 h-5" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl"
            >
              {loading ? t('common.loading') : t('auth.loginButton')}
            </button>
          </form>

          {/* Demo Buttons */}
          <div className="mt-8 pt-6 border-t border-white/20">
            <p className="text-blue-200 text-sm text-center mb-4">{t('auth.demoCredentials')}:</p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => fillDemo('admin')}
                className="px-4 py-2 bg-blue-600/50 text-blue-100 rounded-lg text-sm hover:bg-blue-600/70 transition-colors duration-200 border border-blue-500/30"
              >
                {t('auth.adminDemo')}
              </button>
              <button
                onClick={() => fillDemo('merchant')}
                className="px-4 py-2 bg-indigo-600/50 text-indigo-100 rounded-lg text-sm hover:bg-indigo-600/70 transition-colors duration-200 border border-indigo-500/30"
              >
                {t('auth.merchantDemo')}
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link to="/" className="text-blue-300 hover:text-white transition-colors duration-200">
            ← {t('common.back')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;