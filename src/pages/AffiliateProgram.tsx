import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UserPlus, DollarSign, Users, TrendingUp, Copy, Check, Gift, Star, Award, Calendar, Download, ExternalLink } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const AffiliateProgram: React.FC = () => {
  const { t } = useTranslation();
  const [linkCopied, setLinkCopied] = useState(false);


  // Dati simulati per i grafici
  const earningsData = [
    { month: 'Gen', earnings: 1200, referrals: 8 },
    { month: 'Feb', earnings: 1800, referrals: 12 },
    { month: 'Mar', earnings: 2400, referrals: 16 },
    { month: 'Apr', earnings: 3200, referrals: 21 },
    { month: 'Mag', earnings: 2800, referrals: 18 },
    { month: 'Giu', earnings: 4100, referrals: 27 },
  ];

  const conversionData = [
    { name: 'Convertiti', value: 68, color: '#10B981' },
    { name: 'In Attesa', value: 22, color: '#F59E0B' },
    { name: 'Non Convertiti', value: 10, color: '#EF4444' },
  ];

  const recentReferrals = [
    { id: 1, name: 'Marco Rossi', email: 'marco.r@email.com', date: '2024-01-15', status: 'Attivo', earnings: '€245' },
    { id: 2, name: 'Laura Bianchi', email: 'laura.b@email.com', date: '2024-01-14', status: 'Attivo', earnings: '€189' },
    { id: 3, name: 'Giuseppe Verde', email: 'giuseppe.v@email.com', date: '2024-01-13', status: 'In Attesa', earnings: '€0' },
    { id: 4, name: 'Anna Neri', email: 'anna.n@email.com', date: '2024-01-12', status: 'Attivo', earnings: '€312' },
    { id: 5, name: 'Francesco Blu', email: 'francesco.b@email.com', date: '2024-01-11', status: 'Attivo', earnings: '€156' },
  ];

  const payoutHistory = [
    { id: 1, date: '2024-01-01', amount: '€2,450', status: 'Pagato', method: 'Bonifico' },
    { id: 2, date: '2023-12-01', amount: '€1,890', status: 'Pagato', method: 'PayPal' },
    { id: 3, date: '2023-11-01', amount: '€3,120', status: 'Pagato', method: 'Bonifico' },
    { id: 4, date: '2023-10-01', amount: '€2,780', status: 'Pagato', method: 'PayPal' },
  ];

  const affiliateLevels = [
    {
      level: 'bronze',
      name: t('affiliate.bronze'),
      icon: Award,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      requirements: '0-10 referral attivi',
      commission: '2%',
      benefits: ['Supporto email', 'Materiali marketing base']
    },
    {
      level: 'silver',
      name: t('affiliate.silver'),
      icon: Award,
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200',
      requirements: '11-25 referral attivi',
      commission: '3%',
      benefits: ['Supporto prioritario', 'Materiali marketing avanzati', 'Webinar esclusivi']
    },
    {
      level: 'gold',
      name: t('affiliate.gold'),
      icon: Award,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      requirements: '26-50 referral attivi',
      commission: '4%',
      benefits: ['Account manager dedicato', 'Materiali personalizzati', 'Eventi VIP']
    },
    {
      level: 'platinum',
      name: t('affiliate.platinum'),
      icon: Star,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      requirements: '50+ referral attivi',
      commission: '5%',
      benefits: ['Supporto 24/7', 'Co-marketing', 'Revenue sharing speciale']
    }
  ];

  const referralLink = 'https://opengateway.ai/ref/AGT2024';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('affiliate.dashboard')}</h1>
        <p className="text-gray-600">
          {t('affiliate.description')}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{t('affiliate.totalReferrals')}</p>
              <p className="text-3xl font-bold text-gray-900">127</p>
              <p className="text-sm text-green-600 mt-1">+12 {t('affiliate.thisMonth')}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{t('affiliate.activeReferrals')}</p>
              <p className="text-3xl font-bold text-gray-900">89</p>
              <p className="text-sm text-green-600 mt-1">70% {t('affiliate.activationRate')}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <UserPlus className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{t('affiliate.totalEarnings')}</p>
              <p className="text-3xl font-bold text-gray-900">€15,420</p>
              <p className="text-sm text-green-600 mt-1">+€2,340 {t('affiliate.thisMonth')}</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{t('affiliate.conversionRate')}</p>
              <p className="text-3xl font-bold text-gray-900">68%</p>
              <p className="text-sm text-green-600 mt-1">+5% {t('affiliate.vsLastMonth')}</p>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Referral Link Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('affiliate.shareLink')}</h2>
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <div className="flex items-center bg-gray-50 rounded-lg p-3 border">
              <input
                type="text"
                value={referralLink}
                readOnly
                className="flex-1 bg-transparent border-none outline-none text-gray-700"
              />
              <button
                onClick={copyToClipboard}
                className="ml-2 p-2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                {linkCopied ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <ExternalLink className="w-4 h-4" />
            <span>{t('affiliate.share')}</span>
          </button>
        </div>
        {linkCopied && (
          <p className="text-sm text-green-600 mt-2">{t('affiliate.linkCopied')}</p>
        )}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Earnings Chart */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('affiliate.earningsChart')}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={earningsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value, name) => [name === 'earnings' ? `€${value}` : value, name === 'earnings' ? 'Guadagni' : 'Referral']} />
              <Line type="monotone" dataKey="earnings" stroke="#8B5CF6" strokeWidth={2} />
              <Line type="monotone" dataKey="referrals" stroke="#10B981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Conversion Rate Chart */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('affiliate.conversionRateChart')}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={conversionData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {conversionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, t('affiliate.percentage')]} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {conversionData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm text-gray-600">{item.name}</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Affiliate Levels */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">{t('affiliate.affiliateLevels')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {affiliateLevels.map((level, index) => {
            const Icon = level.icon;
            const isCurrentLevel = index === 1; // Silver level as current
            return (
              <div
                key={level.level}
                className={`p-4 rounded-lg border-2 ${level.borderColor} ${level.bgColor} ${
                  isCurrentLevel ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <Icon className={`w-6 h-6 ${level.color}`} />
                  {isCurrentLevel && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
                      {t('affiliate.currentLevel')}
                    </span>
                  )}
                </div>
                <h4 className={`font-semibold ${level.color} mb-2`}>{level.name}</h4>
                <p className="text-sm text-gray-600 mb-2">{level.requirements}</p>
                <p className="text-lg font-bold text-gray-900 mb-3">Commissione: {level.commission}</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  {level.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center space-x-1">
                      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Referrals */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">{t('affiliate.recentReferralsTable')}</h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Vedi tutti
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 text-gray-600 font-medium">{t('affiliate.name')}</th>
                  <th className="text-left py-2 text-gray-600 font-medium">{t('affiliate.date')}</th>
                  <th className="text-left py-2 text-gray-600 font-medium">{t('affiliate.status')}</th>
                  <th className="text-left py-2 text-gray-600 font-medium">{t('affiliate.earnings')}</th>
                </tr>
              </thead>
              <tbody>
                {recentReferrals.map((referral) => (
                  <tr key={referral.id} className="border-b border-gray-100">
                    <td className="py-3">
                      <div>
                        <p className="font-medium text-gray-900">{referral.name}</p>
                        <p className="text-gray-500 text-xs">{referral.email}</p>
                      </div>
                    </td>
                    <td className="py-3 text-gray-600">{referral.date}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        referral.status === 'Attivo'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {referral.status === 'Attivo' ? t('affiliate.active') : referral.status}
                      </span>
                    </td>
                    <td className="py-3 font-medium text-gray-900">{referral.earnings}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Payout History */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">{t('affiliate.payoutHistoryTable')}</h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1">
              <Download className="w-4 h-4" />
              <span>Esporta</span>
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 text-gray-600 font-medium">{t('affiliate.date')}</th>
                  <th className="text-left py-2 text-gray-600 font-medium">{t('affiliate.amount')}</th>
                  <th className="text-left py-2 text-gray-600 font-medium">{t('affiliate.method')}</th>
                  <th className="text-left py-2 text-gray-600 font-medium">{t('affiliate.status')}</th>
                </tr>
              </thead>
              <tbody>
                {payoutHistory.map((payout) => (
                  <tr key={payout.id} className="border-b border-gray-100">
                    <td className="py-3 text-gray-600">{payout.date}</td>
                    <td className="py-3 font-medium text-gray-900">{payout.amount}</td>
                    <td className="py-3 text-gray-600">{payout.method}</td>
                    <td className="py-3">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                        {payout.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-900">{t('affiliate.nextPayoutInfo')}</p>
                <p className="text-xs text-blue-700">€2,340 {t('affiliate.availableAmount')}</p>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                {t('affiliate.requestPayout')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('affiliate.howItWorks')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="font-bold">1</span>
            </div>
            <h4 className="font-medium text-gray-900 mb-2">{t('affiliate.shareStep')}</h4>
            <p className="text-sm text-gray-600">{t('affiliate.step1')}</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="font-bold">2</span>
            </div>
            <h4 className="font-medium text-gray-900 mb-2">{t('affiliate.registerStep')}</h4>
            <p className="text-sm text-gray-600">{t('affiliate.step2')}</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="font-bold">3</span>
            </div>
            <h4 className="font-medium text-gray-900 mb-2">{t('affiliate.earnStep')}</h4>
            <p className="text-sm text-gray-600">{t('affiliate.step3')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AffiliateProgram;