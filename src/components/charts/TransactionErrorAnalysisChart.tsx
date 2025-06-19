import React from 'react';

const TransactionErrorAnalysisChart: React.FC = () => {
  const errorData = [
    { code: 'INSUFFICIENT_FUNDS', description: 'Fondi Insufficienti', count: 45, percentage: 32.1, color: '#ef4444', trend: '+5%' },
    { code: 'CARD_DECLINED', description: 'Carta Rifiutata', count: 38, percentage: 27.1, color: '#f97316', trend: '-2%' },
    { code: 'EXPIRED_CARD', description: 'Carta Scaduta', count: 22, percentage: 15.7, color: '#eab308', trend: '+1%' },
    { code: 'INVALID_CVV', description: 'CVV Non Valido', count: 18, percentage: 12.9, color: '#8b5cf6', trend: '-3%' },
    { code: 'NETWORK_ERROR', description: 'Errore di Rete', count: 12, percentage: 8.6, color: '#06b6d4', trend: '+8%' },
    { code: 'OTHER', description: 'Altri Errori', count: 5, percentage: 3.6, color: '#64748b', trend: '0%' }
  ];

  const timeData = [
    { time: '00:00', errors: 2, success: 43 },
    { time: '04:00', errors: 1, success: 23 },
    { time: '08:00', errors: 8, success: 156 },
    { time: '12:00', errors: 15, success: 305 },
    { time: '16:00', errors: 12, success: 271 },
    { time: '20:00', errors: 7, success: 116 }
  ];

  const width = 500;
  const height = 320;
  const padding = 40;
  const chartWidth = width - padding * 2;
  const chartHeight = 140;

  // Calculate scales for time chart
  const maxErrors = Math.max(...timeData.map(d => d.errors));
  const maxSuccess = Math.max(...timeData.map(d => d.success));

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-3">
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-red-50 p-2 rounded">
            <p className="text-sm font-bold text-red-600">{errorData.reduce((sum, d) => sum + d.count, 0)}</p>
            <p className="text-xs text-red-700">Errori Totali</p>
          </div>
          <div className="bg-green-50 p-2 rounded">
            <p className="text-sm font-bold text-green-600">98.7%</p>
            <p className="text-xs text-green-700">Successo</p>
          </div>
          <div className="bg-blue-50 p-2 rounded">
            <p className="text-sm font-bold text-blue-600">1.3%</p>
            <p className="text-xs text-blue-700">Errore</p>
          </div>
        </div>
      </div>

      <svg width={width} height={height} className="w-full h-auto">
        {/* Error Distribution Bar Chart */}
        <text x={width / 2} y={25} textAnchor="middle" className="text-base font-semibold fill-gray-900">
          Distribuzione Tipologie di Errore
        </text>
        
        {/* Bar chart */}
        {errorData.map((item, index) => {
          const barHeight = (item.count / Math.max(...errorData.map(d => d.count))) * 120;
          const barWidth = (chartWidth / errorData.length) - 20;
          const x = padding + (chartWidth / errorData.length) * index + 10;
          const y = 180 - barHeight;
          
          return (
            <g key={index}>
              {/* Bar */}
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                fill={item.color}
                rx="4"
                className="hover:opacity-80 transition-opacity duration-200"
              />
              
              {/* Value on top of bar */}
              <text
                x={x + barWidth / 2}
                y={y - 5}
                textAnchor="middle"
                className="text-xs font-bold fill-gray-700"
              >
                {item.count}
              </text>
              
              {/* Percentage inside bar */}
              <text
                x={x + barWidth / 2}
                y={y + barHeight / 2 + 4}
                textAnchor="middle"
                className="text-xs font-bold fill-white"
              >
                {item.percentage}%
              </text>
              
              {/* Trend indicator */}
              <rect
                x={x + barWidth - 20}
                y={y + 5}
                width="18"
                height="14"
                fill={item.trend.includes('+') ? '#10b981' : item.trend.includes('-') ? '#ef4444' : '#6b7280'}
                rx="2"
                opacity="0.9"
              />
              <text
                x={x + barWidth - 11}
                y={y + 15}
                textAnchor="middle"
                className="text-xs font-bold fill-white"
              >
                {item.trend}
              </text>
              
              {/* Label */}
              <text
                x={x + barWidth / 2}
                y={200}
                textAnchor="middle"
                className="text-xs fill-gray-600"
                transform={`rotate(-45, ${x + barWidth / 2}, 200)`}
              >
                {item.code}
              </text>
            </g>
          );
        })}
        
        {/* Time-based error chart */}
        <text x={width / 2} y={260} textAnchor="middle" className="text-base font-semibold fill-gray-900">
          Andamento Errori nel Tempo
        </text>
        
        {/* Grid lines for time chart */}
        {[0, 1, 2, 3, 4, 5].map(i => {
          const y = 280 + (chartHeight / 5) * i;
          return (
            <line key={i} x1={padding} y1={y} x2={width - padding} y2={y} stroke="#e5e7eb" strokeWidth="1" />
          );
        })}
        
        {/* Error line */}
        <path
          d={timeData.map((item, index) => {
            const x = padding + (chartWidth / (timeData.length - 1)) * index;
            const y = 280 + chartHeight - ((item.errors / maxErrors) * chartHeight);
            return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
          }).join(' ')}
          stroke="#ef4444"
          strokeWidth="3"
          fill="none"
          className="drop-shadow-sm"
        />
        
        {/* Success rate area */}
        <path
          d={`${timeData.map((item, index) => {
            const x = padding + (chartWidth / (timeData.length - 1)) * index;
            const y = 280 + chartHeight - ((item.success / maxSuccess) * chartHeight * 0.8);
            return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
          }).join(' ')} L ${padding + chartWidth} ${280 + chartHeight} L ${padding} ${280 + chartHeight} Z`}
          fill="url(#successGradient)"
          opacity="0.3"
        />
        
        {/* Data points */}
        {timeData.map((item, index) => {
          const x = padding + (chartWidth / (timeData.length - 1)) * index;
          const errorY = 280 + chartHeight - ((item.errors / maxErrors) * chartHeight);
          const successY = 280 + chartHeight - ((item.success / maxSuccess) * chartHeight * 0.8);
          
          return (
            <g key={index}>
              {/* Error points */}
              <circle cx={x} cy={errorY} r="5" fill="#ef4444" className="hover:r-7 transition-all duration-200" />
              
              {/* Success points */}
              <circle cx={x} cy={successY} r="4" fill="#10b981" className="hover:r-6 transition-all duration-200" />
              
              {/* Time labels */}
              <text x={x} y={280 + chartHeight + 20} textAnchor="middle" className="text-xs fill-gray-600">
                {item.time}
              </text>
              
              {/* Hover tooltip */}
              <g className="opacity-0 hover:opacity-100 transition-opacity duration-200">
                <rect
                  x={x - 35}
                  y={errorY - 60}
                  width="70"
                  height="50"
                  fill="white"
                  stroke="#d1d5db"
                  rx="4"
                  className="drop-shadow-lg"
                />
                <text x={x} y={errorY - 40} textAnchor="middle" className="text-xs fill-red-600 font-bold">
                  {item.errors} errori
                </text>
                <text x={x} y={errorY - 25} textAnchor="middle" className="text-xs fill-green-600">
                  {item.success} successi
                </text>
                <text x={x} y={errorY - 10} textAnchor="middle" className="text-xs fill-gray-500">
                  {item.time}
                </text>
              </g>
            </g>
          );
        })}
        
        {/* Y-axis labels */}
        <text x={padding - 30} y={285} textAnchor="middle" className="text-xs fill-red-600 font-medium">
          Errori
        </text>
        <text x={width - padding + 30} y={285} textAnchor="middle" className="text-xs fill-green-600 font-medium">
          Successi
        </text>
        
        {/* Gradients */}
        <defs>
          <linearGradient id="successGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.1" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Legend */}
      <div className="flex justify-center space-x-8 mt-4">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-0.5 bg-red-500"></div>
          <span className="text-sm text-gray-600">Errori</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-0.5 bg-green-500 opacity-60"></div>
          <span className="text-sm text-gray-600">Transazioni Riuscite</span>
        </div>
      </div>
      

    </div>
  );
};

export default TransactionErrorAnalysisChart;