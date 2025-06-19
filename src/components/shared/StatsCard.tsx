import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: React.ComponentType<{ className?: string }>;
  color: 'green' | 'blue' | 'indigo' | 'orange' | 'red' | 'purple';
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, change, trend, icon: Icon, color }) => {
  const colorClasses = {
    green: 'bg-gradient-to-br from-green-400 via-green-500 to-emerald-600',
    blue: 'bg-gradient-to-br from-blue-400 via-blue-500 to-cyan-600',
    indigo: 'bg-gradient-to-br from-indigo-400 via-indigo-500 to-purple-600',
    orange: 'bg-gradient-to-br from-orange-400 via-orange-500 to-red-600',
    red: 'bg-gradient-to-br from-red-400 via-red-500 to-pink-600',
    purple: 'bg-gradient-to-br from-purple-400 via-purple-500 to-pink-600'
  };

  const backgroundClasses = {
    green: 'bg-gradient-to-br from-emerald-50 to-green-100 border-emerald-200',
    blue: 'bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200',
    indigo: 'bg-gradient-to-br from-indigo-50 to-purple-100 border-indigo-200',
    orange: 'bg-gradient-to-br from-orange-50 to-red-100 border-orange-200',
    red: 'bg-gradient-to-br from-red-50 to-pink-100 border-red-200'
  };

  const trendIcons = {
    up: TrendingUp,
    down: TrendingDown,
    neutral: Minus
  };

  const trendColors = {
    up: 'text-emerald-600 bg-emerald-50',
    down: 'text-red-600 bg-red-50',
    neutral: 'text-gray-600 bg-gray-50'
  };

  const TrendIcon = trendIcons[trend];

  return (
    <div className={`${backgroundClasses[color]} rounded-2xl border-2 p-4 sm:p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 group relative overflow-hidden`}>
      {/* Decorative background pattern */}
      <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 opacity-10">
        <div className={`w-full h-full ${colorClasses[color]} rounded-full transform translate-x-12 sm:translate-x-16 -translate-y-12 sm:-translate-y-16`}></div>
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className={`w-12 h-12 sm:w-14 sm:h-14 ${colorClasses[color]} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
            <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
          </div>
          <div className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full ${trendColors[trend]}`}>
            <TrendIcon className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-xs sm:text-sm font-semibold">{change}</span>
          </div>
        </div>
        
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2 group-hover:text-gray-800 transition-colors duration-300">{value}</h3>
          <p className="text-gray-600 text-xs sm:text-sm font-medium">{title}</p>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;