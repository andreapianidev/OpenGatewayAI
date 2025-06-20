import React from 'react';

const RealTimePerformanceChart: React.FC = () => {
  const data = [
    { time: '00:00', transactions: 45, responseTime: 1.2, successRate: 98.5, volume: 12500 },
    { time: '04:00', transactions: 23, responseTime: 0.9, successRate: 99.1, volume: 8900 },
    { time: '08:00', transactions: 156, responseTime: 1.8, successRate: 97.8, volume: 45600 },
    { time: '12:00', transactions: 234, responseTime: 2.1, successRate: 96.9, volume: 67800 },
    { time: '16:00', transactions: 189, responseTime: 1.6, successRate: 98.2, volume: 52300 },
    { time: '20:00', transactions: 98, responseTime: 1.3, successRate: 98.7, volume: 28900 }
  ];

  const width = 600;
  const height = 300;
  const padding = 60;

  // Chart dimensions
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  // Calculate scales for different metrics
  const maxTransactions = Math.max(...data.map(d => d.transactions));
  const maxResponseTime = Math.max(...data.map(d => d.responseTime));
  const minSuccessRate = Math.min(...data.map(d => d.successRate));
  const maxSuccessRate = Math.max(...data.map(d => d.successRate));

  // Grid lines
  const gridLines = [];
  for (let i = 0; i <= 5; i++) {
    const y = padding + (chartHeight / 5) * i;
    gridLines.push(
      <line key={i} x1={padding} y1={y} x2={width - padding} y2={y} stroke="#e5e7eb" strokeWidth="1" />
    );
  }

  // Generate path for transactions line
  const transactionPath = data.map((item, index) => {
    const x = padding + (chartWidth / (data.length - 1)) * index;
    const y = padding + chartHeight - ((item.transactions / maxTransactions) * chartHeight);
    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  // Generate path for response time line
  const responseTimePath = data.map((item, index) => {
    const x = padding + (chartWidth / (data.length - 1)) * index;
    const y = padding + chartHeight - ((item.responseTime / maxResponseTime) * chartHeight * 0.6);
    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  // Generate path for success rate line
  const successRatePath = data.map((item, index) => {
    const x = padding + (chartWidth / (data.length - 1)) * index;
    const normalizedRate = (item.successRate - minSuccessRate) / (maxSuccessRate - minSuccessRate);
    const y = padding + chartHeight - (normalizedRate * chartHeight * 0.8);
    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  return (
    <div className="w-full">
      <svg width={width} height={height} className="w-full h-auto">
        {/* Grid lines */}
        {gridLines}
        
        {/* Success Rate Area (background) */}
        <path
          d={`${successRatePath} L ${padding + chartWidth} ${padding + chartHeight} L ${padding} ${padding + chartHeight} Z`}
          fill="url(#successGradient)"
          opacity="0.3"
        />
        
        {/* Response Time Line */}
        <path
          d={responseTimePath}
          stroke="#f59e0b"
          strokeWidth="3"
          fill="none"
          className="drop-shadow-sm"
        />
        
        {/* Transactions Line */}
        <path
          d={transactionPath}
          stroke="#3b82f6"
          strokeWidth="3"
          fill="none"
          className="drop-shadow-sm"
        />
        
        {/* Success Rate Line */}
        <path
          d={successRatePath}
          stroke="#10b981"
          strokeWidth="3"
          fill="none"
          className="drop-shadow-sm"
        />
        
        {/* Data points */}
        {data.map((item, index) => {
          const x = padding + (chartWidth / (data.length - 1)) * index;
          const transactionY = padding + chartHeight - ((item.transactions / maxTransactions) * chartHeight);
          const responseY = padding + chartHeight - ((item.responseTime / maxResponseTime) * chartHeight * 0.6);
          const normalizedRate = (item.successRate - minSuccessRate) / (maxSuccessRate - minSuccessRate);
          const successY = padding + chartHeight - (normalizedRate * chartHeight * 0.8);
          
          return (
            <g key={index}>
              {/* Transaction points */}
              <circle
                cx={x}
                cy={transactionY}
                r="4"
                fill="#3b82f6"
                className="hover:r-6 transition-all duration-200"
              />
              {/* Response time points */}
              <circle
                cx={x}
                cy={responseY}
                r="4"
                fill="#f59e0b"
                className="hover:r-6 transition-all duration-200"
              />
              {/* Success rate points */}
              <circle
                cx={x}
                cy={successY}
                r="4"
                fill="#10b981"
                className="hover:r-6 transition-all duration-200"
              />
              
              {/* Hover info */}
              <g className="opacity-0 hover:opacity-100 transition-opacity duration-200">
                <rect
                  x={x - 40}
                  y={transactionY - 60}
                  width="80"
                  height="50"
                  fill="white"
                  stroke="#d1d5db"
                  rx="4"
                  className="drop-shadow-lg"
                />
                <text x={x} y={transactionY - 40} textAnchor="middle" className="text-xs fill-gray-700 font-medium">
                  {item.transactions} txn
                </text>
                <text x={x} y={transactionY - 25} textAnchor="middle" className="text-xs fill-gray-600">
                  {item.responseTime}s resp
                </text>
                <text x={x} y={transactionY - 10} textAnchor="middle" className="text-xs fill-gray-600">
                  {item.successRate}% ok
                </text>
              </g>
            </g>
          );
        })}
        
        {/* X-axis labels */}
        {data.map((item, index) => {
          const x = padding + (chartWidth / (data.length - 1)) * index;
          return (
            <text
              key={index}
              x={x}
              y={height - padding + 20}
              textAnchor="middle"
              className="text-sm fill-gray-600"
            >
              {item.time}
            </text>
          );
        })}
        
        {/* Y-axis labels */}
        <text x={padding - 40} y={padding} textAnchor="middle" className="text-xs fill-gray-500">
          Max
        </text>
        <text x={padding - 40} y={padding + chartHeight} textAnchor="middle" className="text-xs fill-gray-500">
          Min
        </text>
        
        {/* Chart title */}
        <text x={width / 2} y={25} textAnchor="middle" className="text-lg font-semibold fill-gray-900">
          Performance in Tempo Reale
        </text>
        
        {/* Gradients */}
        <defs>
          <linearGradient id="successGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.1" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Legend */}
      <div className="flex justify-center space-x-6 mt-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Transazioni/h</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Tempo Risposta (s)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Tasso Successo (%)</span>
        </div>
      </div>
      
      {/* Real-time indicators */}
      <div className="flex justify-center space-x-8 mt-6">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700">Sistema Attivo</span>
          </div>
          <p className="text-xs text-gray-500">Ultimo aggiornamento: ora</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-blue-600">{data[data.length - 1].transactions}</p>
          <p className="text-xs text-gray-500">Transazioni correnti</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-green-600">{data[data.length - 1].successRate}%</p>
          <p className="text-xs text-gray-500">Tasso successo</p>
        </div>
      </div>
    </div>
  );
};

export default RealTimePerformanceChart;