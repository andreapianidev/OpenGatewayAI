import React, { useEffect, useRef } from 'react';

const GeographicChart: React.FC = () => {
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

    // Sample geographic data
    const cities = [
      { name: 'Damascus', x: 0.6, y: 0.7, size: 4521, revenue: 298450 },
      { name: 'Aleppo', x: 0.5, y: 0.3, size: 3234, revenue: 213670 },
      { name: 'Homs', x: 0.4, y: 0.5, size: 2156, revenue: 142340 },
      { name: 'Latakia', x: 0.2, y: 0.4, size: 1876, revenue: 123890 },
      { name: 'Tartus', x: 0.15, y: 0.45, size: 1060, revenue: 69970 }
    ];

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw simplified Syria map outline
    ctx.strokeStyle = '#d1d5db';
    ctx.lineWidth = 2;
    ctx.fillStyle = '#f9fafb';
    
    ctx.beginPath();
    ctx.moveTo(width * 0.1, height * 0.2);
    ctx.lineTo(width * 0.8, height * 0.15);
    ctx.lineTo(width * 0.85, height * 0.4);
    ctx.lineTo(width * 0.9, height * 0.8);
    ctx.lineTo(width * 0.7, height * 0.9);
    ctx.lineTo(width * 0.3, height * 0.85);
    ctx.lineTo(width * 0.1, height * 0.6);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Find max size for scaling
    const maxSize = Math.max(...cities.map(c => c.size));

    // Draw cities
    cities.forEach((city) => {
      const x = width * city.x;
      const y = height * city.y;
      const radius = 8 + (city.size / maxSize) * 20;
      
      // Create gradient for circle
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, '#3b82f6');
      gradient.addColorStop(1, '#1d4ed8');
      
      // Draw circle
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Draw city name
      ctx.fillStyle = '#374151';
      ctx.font = 'bold 12px Inter, system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(city.name, x, y - radius - 8);
      
      // Draw transaction count
      ctx.font = '10px Inter, system-ui, sans-serif';
      ctx.fillStyle = '#6b7280';
      ctx.fillText(`${city.size} txn`, x, y - radius - 20);
    });

    // Draw connections between major cities
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    
    // Damascus to Aleppo
    ctx.beginPath();
    ctx.moveTo(width * 0.6, height * 0.7);
    ctx.lineTo(width * 0.5, height * 0.3);
    ctx.stroke();
    
    // Damascus to Homs
    ctx.beginPath();
    ctx.moveTo(width * 0.6, height * 0.7);
    ctx.lineTo(width * 0.4, height * 0.5);
    ctx.stroke();
    
    ctx.setLineDash([]);

  }, []);

  return (
    <div className="w-full">
      <div className="w-full h-80 mb-4">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      
      {/* Legend */}
      <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
          <span>Volume Transazioni</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-6 h-1 bg-gray-300"></div>
          <span>Connessioni Rete</span>
        </div>
      </div>
    </div>
  );
};

export default GeographicChart;