import React from 'react';

const PaymentMethodBreakdownChart: React.FC = () => {
  const data = [
    { method: 'Carta di Credito', volume: 245600, transactions: 892, percentage: 45.2, color: '#3b82f6', icon: '💳' },
    { method: 'Carta di Debito', volume: 189300, transactions: 678, percentage: 34.8, color: '#10b981', icon: '💰' },
    { method: 'PayPal', volume: 67800, transactions: 234, percentage: 12.5, color: '#f59e0b', icon: '🅿️' },
    { method: 'Bonifico', volume: 28900, transactions: 89, percentage: 5.3, color: '#8b5cf6', icon: '🏦' },
    { method: 'Apple Pay', volume: 12400, transactions: 45, percentage: 2.2, color: '#ef4444', icon: '📱' }
  ];

  const width = 500;
  const height = 300;
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = 90;
  const innerRadius = 45;

  let currentAngle = -Math.PI / 2; // Start from top

  const segments = data.map((item, index) => {
    const angle = (item.percentage / 100) * 2 * Math.PI;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    
    // Calculate arc path
    const x1 = centerX + Math.cos(startAngle) * radius;
    const y1 = centerY + Math.sin(startAngle) * radius;
    const x2 = centerX + Math.cos(endAngle) * radius;
    const y2 = centerY + Math.sin(endAngle) * radius;
    
    const x1Inner = centerX + Math.cos(startAngle) * innerRadius;
    const y1Inner = centerY + Math.sin(startAngle) * innerRadius;
    const x2Inner = centerX + Math.cos(endAngle) * innerRadius;
    const y2Inner = centerY + Math.sin(endAngle) * innerRadius;
    
    const largeArcFlag = angle > Math.PI ? 1 : 0;
    
    const pathData = [
      `M ${x1Inner} ${y1Inner}`,
      `L ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      `L ${x2Inner} ${y2Inner}`,
      `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x1Inner} ${y1Inner}`,
      'Z'
    ].join(' ');
    
    // Calculate label position
    const labelAngle = startAngle + angle / 2;
    const labelRadius = radius + 30;
    const labelX = centerX + Math.cos(labelAngle) * labelRadius;
    const labelY = centerY + Math.sin(labelAngle) * labelRadius;
    
    currentAngle = endAngle;
    
    return {
      ...item,
      pathData,
      labelX,
      labelY,
      startAngle,
      endAngle,
      angle
    };
  });

  return (
    <div className="w-full">
      <svg width={width} height={height} className="w-full h-auto">
        {/* Chart title */}
        <text x={width / 2} y={25} textAnchor="middle" className="text-lg font-semibold fill-gray-900">
          Distribuzione Metodi di Pagamento
        </text>
        
        {/* Donut segments */}
        {segments.map((segment, index) => (
          <g key={index}>
            <path
              d={segment.pathData}
              fill={segment.color}
              className="hover:opacity-80 transition-opacity duration-200 cursor-pointer"
              style={{
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
              }}
            />
            
            {/* Percentage labels on segments */}
            <text
              x={centerX + Math.cos(segment.startAngle + segment.angle / 2) * ((radius + innerRadius) / 2)}
              y={centerY + Math.sin(segment.startAngle + segment.angle / 2) * ((radius + innerRadius) / 2) + 4}
              textAnchor="middle"
              className="text-sm font-bold fill-white"
              style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
            >
              {segment.percentage}%
            </text>
          </g>
        ))}
        
        {/* Center circle with total */}
        <circle cx={centerX} cy={centerY} r={innerRadius} fill="white" stroke="#e5e7eb" strokeWidth="2" />
        <text x={centerX} y={centerY - 10} textAnchor="middle" className="text-lg font-bold fill-gray-900">
          €{(data.reduce((sum, d) => sum + d.volume, 0) / 1000).toFixed(0)}k
        </text>
        <text x={centerX} y={centerY + 8} textAnchor="middle" className="text-sm fill-gray-600">
          Volume Totale
        </text>
        <text x={centerX} y={centerY + 25} textAnchor="middle" className="text-xs fill-gray-500">
          {data.reduce((sum, d) => sum + d.transactions, 0)} transazioni
        </text>
        
        {/* External labels with lines */}
        {segments.map((segment, index) => {
          const midAngle = segment.startAngle + segment.angle / 2;
          const lineStartX = centerX + Math.cos(midAngle) * (radius + 5);
          const lineStartY = centerY + Math.sin(midAngle) * (radius + 5);
          const lineEndX = centerX + Math.cos(midAngle) * (radius + 25);
          const lineEndY = centerY + Math.sin(midAngle) * (radius + 25);
          
          return (
            <g key={`label-${index}`}>
              {/* Connection line */}
              <line
                x1={lineStartX}
                y1={lineStartY}
                x2={lineEndX}
                y2={lineEndY}
                stroke={segment.color}
                strokeWidth="2"
              />
              
              {/* Label background */}
              <rect
                x={segment.labelX - 45}
                y={segment.labelY - 25}
                width="90"
                height="50"
                fill="white"
                stroke={segment.color}
                strokeWidth="1"
                rx="6"
                className="drop-shadow-md"
              />
              
              {/* Icon */}
              <text
                x={segment.labelX}
                y={segment.labelY - 10}
                textAnchor="middle"
                className="text-lg"
              >
                {segment.icon}
              </text>
              
              {/* Method name */}
              <text
                x={segment.labelX}
                y={segment.labelY + 5}
                textAnchor="middle"
                className="text-xs font-medium"
                fill={segment.color}
              >
                {segment.method}
              </text>
              
              {/* Volume */}
              <text
                x={segment.labelX}
                y={segment.labelY + 18}
                textAnchor="middle"
                className="text-xs fill-gray-600"
              >
                €{(segment.volume / 1000).toFixed(0)}k
              </text>
            </g>
          );
        })}
      </svg>
      
      {/* Legend table */}
      <div className="mt-3 bg-gray-50 rounded p-3">
        <div className="grid grid-cols-2 gap-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-white rounded border">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm">{item.icon}</span>
                <div>
                  <p className="text-xs font-medium text-gray-900">{item.method}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-gray-900">{item.percentage}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      

    </div>
  );
};

export default PaymentMethodBreakdownChart;