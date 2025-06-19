import React from 'react';

const TransactionVolumeChart: React.FC = () => {
  const data = [
    { hour: '00:00', volume: 12500, transactions: 45, avgTicket: 278 },
    { hour: '02:00', volume: 8900, transactions: 32, avgTicket: 278 },
    { hour: '04:00', volume: 6700, transactions: 24, avgTicket: 279 },
    { hour: '06:00', volume: 15600, transactions: 56, avgTicket: 279 },
    { hour: '08:00', volume: 45600, transactions: 164, avgTicket: 278 },
    { hour: '10:00', volume: 67800, transactions: 243, avgTicket: 279 },
    { hour: '12:00', volume: 89200, transactions: 320, avgTicket: 279 },
    { hour: '14:00', volume: 95400, transactions: 342, avgTicket: 279 },
    { hour: '16:00', volume: 78900, transactions: 283, avgTicket: 279 },
    { hour: '18:00', volume: 52300, transactions: 187, avgTicket: 280 },
    { hour: '20:00', volume: 34500, transactions: 123, avgTicket: 280 },
    { hour: '22:00', volume: 28900, transactions: 103, avgTicket: 281 }
  ];

  const width = 500;
  const height = 250;
  const padding = 40;

  // Chart dimensions
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  // Calculate scales
  const maxVolume = Math.max(...data.map(d => d.volume));
  const maxTransactions = Math.max(...data.map(d => d.transactions));
  const minVolume = 0;

  // Grid lines for volume
  const gridLines = [];
  for (let i = 0; i <= 5; i++) {
    const value = (maxVolume / 5) * i;
    const y = padding + (chartHeight / 5) * (5 - i);
    gridLines.push(
      <g key={i}>
        <line x1={padding} y1={y} x2={width - padding} y2={y} stroke="#e5e7eb" strokeWidth="1" />
        <text x={padding - 10} y={y + 4} textAnchor="end" className="text-xs fill-gray-500">
          €{(value / 1000).toFixed(0)}k
        </text>
      </g>
    );
  }

  // Generate volume area path
  const volumeAreaPath = data.map((item, index) => {
    const x = padding + (chartWidth / (data.length - 1)) * index;
    const y = padding + chartHeight - ((item.volume - minVolume) / (maxVolume - minVolume)) * chartHeight;
    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  // Generate transactions line path
  const transactionsPath = data.map((item, index) => {
    const x = padding + (chartWidth / (data.length - 1)) * index;
    const y = padding + chartHeight - ((item.transactions / maxTransactions) * chartHeight * 0.7);
    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  return (
    <div className="w-full">
      <svg width={width} height={height} className="w-full h-auto">
        {/* Grid lines */}
        {gridLines}
        
        {/* Volume Area */}
        <path
          d={`${volumeAreaPath} L ${padding + chartWidth} ${padding + chartHeight} L ${padding} ${padding + chartHeight} Z`}
          fill="url(#volumeGradient)"
          opacity="0.6"
        />
        
        {/* Volume Line */}
        <path
          d={volumeAreaPath}
          stroke="#3b82f6"
          strokeWidth="3"
          fill="none"
          className="drop-shadow-sm"
        />
        
        {/* Transactions Line */}
        <path
          d={transactionsPath}
          stroke="#10b981"
          strokeWidth="3"
          fill="none"
          className="drop-shadow-sm"
          strokeDasharray="5,5"
        />
        
        {/* Data points for volume */}
        {data.map((item, index) => {
          const x = padding + (chartWidth / (data.length - 1)) * index;
          const volumeY = padding + chartHeight - ((item.volume - minVolume) / (maxVolume - minVolume)) * chartHeight;
          const transactionsY = padding + chartHeight - ((item.transactions / maxTransactions) * chartHeight * 0.7);
          
          return (
            <g key={index}>
              {/* Volume points */}
              <circle
                cx={x}
                cy={volumeY}
                r="5"
                fill="#3b82f6"
                className="hover:r-7 transition-all duration-200"
              />
              {/* Transaction points */}
              <circle
                cx={x}
                cy={transactionsY}
                r="4"
                fill="#10b981"
                className="hover:r-6 transition-all duration-200"
              />
              
              {/* Hover tooltip */}
              <g className="opacity-0 hover:opacity-100 transition-opacity duration-200">
                <rect
                  x={x - 50}
                  y={volumeY - 80}
                  width="100"
                  height="70"
                  fill="white"
                  stroke="#d1d5db"
                  rx="6"
                  className="drop-shadow-lg"
                />
                <text x={x} y={volumeY - 55} textAnchor="middle" className="text-xs fill-gray-700 font-bold">
                  {item.hour}
                </text>
                <text x={x} y={volumeY - 40} textAnchor="middle" className="text-xs fill-blue-600 font-medium">
                  €{(item.volume / 1000).toFixed(1)}k
                </text>
                <text x={x} y={volumeY - 25} textAnchor="middle" className="text-xs fill-green-600">
                  {item.transactions} txn
                </text>
                <text x={x} y={volumeY - 10} textAnchor="middle" className="text-xs fill-gray-500">
                  €{item.avgTicket} avg
                </text>
              </g>
            </g>
          );
        })}
        
        {/* X-axis labels */}
        {data.map((item, index) => {
          if (index % 2 === 0) { // Show every other label to avoid crowding
            const x = padding + (chartWidth / (data.length - 1)) * index;
            return (
              <text
                key={index}
                x={x}
                y={height - padding + 20}
                textAnchor="middle"
                className="text-sm fill-gray-600"
              >
                {item.hour}
              </text>
            );
          }
          return null;
        })}
        
        {/* Right Y-axis for transactions */}
        <text x={width - padding + 40} y={padding} textAnchor="middle" className="text-xs fill-green-600 font-medium">
          Transazioni
        </text>
        <text x={width - padding + 40} y={padding + chartHeight} textAnchor="middle" className="text-xs fill-green-600">
          0
        </text>
        <text x={width - padding + 40} y={padding + chartHeight * 0.3} textAnchor="middle" className="text-xs fill-green-600">
          {Math.round(maxTransactions * 0.7)}
        </text>
        
        {/* Chart title */}
        <text x={width / 2} y={25} textAnchor="middle" className="text-lg font-semibold fill-gray-900">
          Volume Transazioni per Ora
        </text>
        
        {/* Gradients */}
        <defs>
          <linearGradient id="volumeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Legend */}
      <div className="flex justify-center space-x-4 mt-2">
        <div className="flex items-center space-x-1">
          <div className="w-3 h-0.5 bg-blue-500"></div>
          <span className="text-xs text-gray-600">Volume (€)</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-0.5 bg-green-500" style={{borderTop: '2px dashed #10b981'}}></div>
          <span className="text-xs text-gray-600">Numero Transazioni</span>
        </div>
      </div>
      
      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-2 mt-3">
        <div className="text-center p-2 bg-blue-50 rounded">
          <p className="text-sm font-bold text-blue-600">€{(data.reduce((sum, d) => sum + d.volume, 0) / 1000).toFixed(0)}k</p>
          <p className="text-xs text-blue-700">Volume Totale Oggi</p>
        </div>
        <div className="text-center p-2 bg-green-50 rounded">
          <p className="text-sm font-bold text-green-600">{data.reduce((sum, d) => sum + d.transactions, 0)}</p>
          <p className="text-xs text-green-700">Transazioni Totali</p>
        </div>
        <div className="text-center p-2 bg-purple-50 rounded">
          <p className="text-sm font-bold text-purple-600">€{Math.round(data.reduce((sum, d) => sum + d.avgTicket, 0) / data.length)}</p>
          <p className="text-xs text-purple-700">Ticket Medio</p>
        </div>
      </div>
    </div>
  );
};

export default TransactionVolumeChart;