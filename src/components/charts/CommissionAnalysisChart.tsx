import React from 'react';

const CommissionAnalysisChart: React.FC = () => {
  const data = [
    { month: 'Gen', totalCommissions: 12450, merchantFees: 8900, processingFees: 2100, networkFees: 1450 },
    { month: 'Feb', totalCommissions: 15230, merchantFees: 10800, processingFees: 2630, networkFees: 1800 },
    { month: 'Mar', totalCommissions: 18900, merchantFees: 13200, processingFees: 3400, networkFees: 2300 },
    { month: 'Apr', totalCommissions: 22100, merchantFees: 15400, processingFees: 3900, networkFees: 2800 },
    { month: 'Mag', totalCommissions: 25600, merchantFees: 17800, processingFees: 4500, networkFees: 3300 },
    { month: 'Giu', totalCommissions: 28900, merchantFees: 20100, processingFees: 5200, networkFees: 3600 }
  ];

  const width = 600;
  const height = 300;
  const padding = 60;

  // Chart dimensions
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  // Calculate scales
  const maxValue = Math.max(...data.map(d => d.totalCommissions));
  const minValue = 0;

  // Grid lines
  const gridLines = [];
  for (let i = 0; i <= 5; i++) {
    const value = (maxValue / 5) * i;
    const y = padding + (chartHeight / 5) * (5 - i);
    gridLines.push(
      <g key={i}>
        <line x1={padding} y1={y} x2={width - padding} y2={y} stroke="#e5e7eb" strokeWidth="1" />
        <text x={padding - 10} y={y + 4} textAnchor="end" className="text-xs fill-gray-500">
          €{Math.round(value).toLocaleString()}
        </text>
      </g>
    );
  }

  // Bar width and spacing
  const barWidth = chartWidth / data.length * 0.7;
  const barSpacing = chartWidth / data.length;

  return (
    <div className="w-full">
      <svg width={width} height={height} className="w-full h-auto">
        {/* Grid lines */}
        {gridLines}
        
        {/* Bars - Stacked */}
        {data.map((item, index) => {
          const x = padding + barSpacing * index + (barSpacing - barWidth) / 2;
          
          // Calculate heights for stacked bars
          const merchantHeight = ((item.merchantFees - minValue) / (maxValue - minValue)) * chartHeight;
          const processingHeight = ((item.processingFees) / (maxValue - minValue)) * chartHeight;
          const networkHeight = ((item.networkFees) / (maxValue - minValue)) * chartHeight;
          
          const merchantY = padding + chartHeight - merchantHeight;
          const processingY = merchantY - processingHeight;
          const networkY = processingY - networkHeight;
          
          return (
            <g key={index}>
              {/* Merchant Fees */}
              <rect
                x={x}
                y={merchantY}
                width={barWidth}
                height={merchantHeight}
                fill="#3b82f6"
                className="hover:opacity-80 transition-opacity duration-200"
              />
              {/* Processing Fees */}
              <rect
                x={x}
                y={processingY}
                width={barWidth}
                height={processingHeight}
                fill="#10b981"
                className="hover:opacity-80 transition-opacity duration-200"
              />
              {/* Network Fees */}
              <rect
                x={x}
                y={networkY}
                width={barWidth}
                height={networkHeight}
                fill="#f59e0b"
                className="hover:opacity-80 transition-opacity duration-200"
              />
              
              {/* Total value label */}
              <text
                x={x + barWidth / 2}
                y={networkY - 5}
                textAnchor="middle"
                className="text-xs fill-gray-700 font-medium"
              >
                €{item.totalCommissions.toLocaleString()}
              </text>
            </g>
          );
        })}
        
        {/* X-axis labels */}
        {data.map((item, index) => {
          const x = padding + barSpacing * index + barSpacing / 2;
          return (
            <text
              key={index}
              x={x}
              y={height - padding + 20}
              textAnchor="middle"
              className="text-sm fill-gray-600"
            >
              {item.month}
            </text>
          );
        })}
        
        {/* Chart title */}
        <text x={width / 2} y={25} textAnchor="middle" className="text-lg font-semibold fill-gray-900">
          Analisi Commissioni per Tipologia
        </text>
      </svg>
      
      {/* Legend */}
      <div className="flex justify-center space-x-6 mt-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded"></div>
          <span className="text-sm text-gray-600">Commissioni Merchant</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded"></div>
          <span className="text-sm text-gray-600">Commissioni Processing</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-yellow-500 rounded"></div>
          <span className="text-sm text-gray-600">Commissioni Network</span>
        </div>
      </div>
    </div>
  );
};

export default CommissionAnalysisChart;