import React, { useEffect, useRef } from 'react';

const PaymentMethodsChart: React.FC = () => {
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

    // Sample data
    const data = [
      { label: 'Carta di Credito', value: 45.2, color: '#3b82f6' },
      { label: 'Carta di Debito', value: 32.8, color: '#10b981' },
      { label: 'Contactless', value: 18.5, color: '#f59e0b' },
      { label: 'Mobile Payment', value: 3.5, color: '#8b5cf6' }
    ];

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Chart dimensions
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 40;

    let currentAngle = -Math.PI / 2; // Start from top

    // Draw pie slices
    data.forEach((item) => {
      const sliceAngle = (item.value / 100) * 2 * Math.PI;
      
      // Draw slice
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
      ctx.closePath();
      ctx.fillStyle = item.color;
      ctx.fill();
      
      // Draw border
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw percentage label
      const labelAngle = currentAngle + sliceAngle / 2;
      const labelX = centerX + Math.cos(labelAngle) * (radius * 0.7);
      const labelY = centerY + Math.sin(labelAngle) * (radius * 0.7);
      
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 14px Inter, system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${item.value}%`, labelX, labelY);

      currentAngle += sliceAngle;
    });

    // Draw center circle for donut effect
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.4, 0, 2 * Math.PI);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw center text
    ctx.fillStyle = '#374151';
    ctx.font = 'bold 16px Inter, system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Metodi', centerX, centerY - 8);
    ctx.font = '12px Inter, system-ui, sans-serif';
    ctx.fillText('Pagamento', centerX, centerY + 8);

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
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Carta di Credito (45.2%)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Carta di Debito (32.8%)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Contactless (18.5%)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Mobile Payment (3.5%)</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodsChart;