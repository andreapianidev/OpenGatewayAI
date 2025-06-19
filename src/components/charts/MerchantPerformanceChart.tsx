import React, { useEffect, useRef } from 'react';

const MerchantPerformanceChart: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);

    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;

    // Sample data for multiple merchants
    const merchants = [
      { name: 'Damascus Electronics', data: [120, 150, 180, 220, 190, 250, 280, 320, 290, 350, 380, 420], color: '#3b82f6' },
      { name: 'Aleppo Fashion', data: [80, 95, 110, 140, 160, 180, 200, 190, 220, 240, 260, 280], color: '#10b981' },
      { name: 'Homs Restaurant', data: [60, 70, 85, 95, 110, 125, 140, 155, 170, 185, 200, 215], color: '#f59e0b' },
      { name: 'Latakia Pharmacy', data: [40, 45, 55, 65, 70, 80, 90, 95, 105, 115, 125, 135], color: '#8b5cf6' }
    ];

    const labels = ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'];

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Chart dimensions
    const padding = 50;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    // Find min and max values across all merchants
    const allValues = merchants.flatMap(m => m.data);
    const maxValue = Math.max(...allValues);
    const minValue = 0;

    // Draw grid lines
    ctx.strokeStyle = '#f3f4f6';
    ctx.lineWidth = 1;
    
    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const y = padding + (chartHeight / 5) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }

    // Vertical grid lines
    for (let i = 0; i <= labels.length - 1; i++) {
      const x = padding + (chartWidth / (labels.length - 1)) * i;
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, height - padding);
      ctx.stroke();
    }

    // Draw lines for each merchant
    merchants.forEach((merchant) => {
      // Draw line
      ctx.beginPath();
      ctx.strokeStyle = merchant.color;
      ctx.lineWidth = 3;
      
      merchant.data.forEach((value, index) => {
        const x = padding + (chartWidth / (merchant.data.length - 1)) * index;
        const y = padding + chartHeight - ((value - minValue) / (maxValue - minValue)) * chartHeight;
        
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      
      ctx.stroke();

      // Draw points
      merchant.data.forEach((value, index) => {
        const x = padding + (chartWidth / (merchant.data.length - 1)) * index;
        const y = padding + chartHeight - ((value - minValue) / (maxValue - minValue)) * chartHeight;
        
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = merchant.color;
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();
      });
    });

    // Draw labels
    ctx.font = '12px Inter, system-ui, sans-serif';
    ctx.fillStyle = '#6b7280';
    ctx.textAlign = 'center';
    
    labels.forEach((label, index) => {
      const x = padding + (chartWidth / (labels.length - 1)) * index;
      ctx.fillText(label, x, height - 10);
    });

    // Draw Y-axis labels
    ctx.textAlign = 'right';
    for (let i = 0; i <= 5; i++) {
      const value = (maxValue / 5) * (5 - i);
      const y = padding + (chartHeight / 5) * i + 5;
      ctx.fillText(Math.round(value).toString(), padding - 10, y);
    }

  }, []);

  return (
    <div className="w-full">
      <div className="w-full h-64 mb-4">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      
      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Damascus Electronics</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Aleppo Fashion</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Homs Restaurant</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Latakia Pharmacy</span>
        </div>
      </div>
    </div>
  );
};

export default MerchantPerformanceChart;