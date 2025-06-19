import React, { useEffect, useRef } from 'react';

const FraudDetectionChart: React.FC = () => {
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

    // Sample fraud detection data over time
    const fraudData = [2, 1, 3, 0, 1, 4, 2, 1, 0, 2, 1, 3, 2, 0, 1, 2, 3, 1, 0, 2, 1, 4, 2, 1];
    const normalData = [145, 167, 189, 156, 178, 134, 167, 189, 201, 178, 156, 145, 167, 189, 178, 156, 134, 167, 189, 178, 156, 145, 167, 189];
    const labels = Array.from({length: 24}, (_, i) => `${i}:00`);

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Chart dimensions
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    // Find max values
    const maxNormal = Math.max(...normalData);
    const maxFraud = Math.max(...fraudData);

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

    // Draw normal transactions area
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    
    normalData.forEach((value, index) => {
      const x = padding + (chartWidth / (normalData.length - 1)) * index;
      const y = padding + chartHeight - ((value / maxNormal) * chartHeight * 0.8);
      
      if (index === 0) {
        ctx.lineTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    
    ctx.lineTo(width - padding, height - padding);
    ctx.closePath();
    
    const gradient = ctx.createLinearGradient(0, padding, 0, height - padding);
    gradient.addColorStop(0, 'rgba(34, 197, 94, 0.3)');
    gradient.addColorStop(1, 'rgba(34, 197, 94, 0.05)');
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw normal transactions line
    ctx.beginPath();
    ctx.strokeStyle = '#22c55e';
    ctx.lineWidth = 2;
    
    normalData.forEach((value, index) => {
      const x = padding + (chartWidth / (normalData.length - 1)) * index;
      const y = padding + chartHeight - ((value / maxNormal) * chartHeight * 0.8);
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    
    ctx.stroke();

    // Draw fraud detection points
    fraudData.forEach((value, index) => {
      if (value > 0) {
        const x = padding + (chartWidth / (fraudData.length - 1)) * index;
        const y = padding + chartHeight - ((value / maxFraud) * chartHeight * 0.2) - chartHeight * 0.8;
        
        // Draw alert circle
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fillStyle = '#ef4444';
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw alert triangle
        ctx.beginPath();
        ctx.moveTo(x, y - 15);
        ctx.lineTo(x - 5, y - 25);
        ctx.lineTo(x + 5, y - 25);
        ctx.closePath();
        ctx.fillStyle = '#fbbf24';
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    });

    // Draw time labels (every 4 hours)
    ctx.font = '10px Inter, system-ui, sans-serif';
    ctx.fillStyle = '#6b7280';
    ctx.textAlign = 'center';
    
    for (let i = 0; i < labels.length; i += 4) {
      const x = padding + (chartWidth / (labels.length - 1)) * i;
      ctx.fillText(labels[i], x, height - 10);
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
      <div className="flex items-center justify-center space-x-6">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Transazioni Normali</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Tentativi Frode Rilevati</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-0 h-0 border-l-2 border-r-2 border-b-4 border-l-transparent border-r-transparent border-b-yellow-500"></div>
          <span className="text-sm text-gray-600">Alert Sicurezza</span>
        </div>
      </div>
    </div>
  );
};

export default FraudDetectionChart;