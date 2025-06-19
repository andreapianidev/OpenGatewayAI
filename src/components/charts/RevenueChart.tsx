import React, { useEffect, useRef } from 'react';

const RevenueChart: React.FC = () => {
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

    // Sample data for bar chart
    const data = [45000, 52000, 48000, 61000, 55000, 67000, 72000, 69000, 78000, 83000, 76000, 89000];
    const labels = ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'];

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Chart dimensions
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    // Find min and max values
    const maxValue = Math.max(...data);
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

    // Draw bars
    const barWidth = chartWidth / data.length * 0.6;
    const barSpacing = chartWidth / data.length;

    data.forEach((value, index) => {
      const barHeight = ((value - minValue) / (maxValue - minValue)) * chartHeight;
      const x = padding + index * barSpacing + (barSpacing - barWidth) / 2;
      const y = padding + chartHeight - barHeight;

      // Create gradient for each bar
      const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight);
      gradient.addColorStop(0, '#10b981');
      gradient.addColorStop(1, '#059669');

      ctx.fillStyle = gradient;
      ctx.fillRect(x, y, barWidth, barHeight);

      // Add rounded corners effect
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.roundRect(x, y, barWidth, barHeight, [4, 4, 0, 0]);
      ctx.fill();
    });

    // Draw labels
    ctx.font = '12px Inter, system-ui, sans-serif';
    ctx.fillStyle = '#6b7280';
    ctx.textAlign = 'center';
    
    labels.forEach((label, index) => {
      const x = padding + index * barSpacing + barSpacing / 2;
      ctx.fillText(label, x, height - 10);
    });

    // Draw values on top of bars
    ctx.fillStyle = '#374151';
    ctx.font = '11px Inter, system-ui, sans-serif';
    
    data.forEach((value, index) => {
      const barHeight = ((value - minValue) / (maxValue - minValue)) * chartHeight;
      const x = padding + index * barSpacing + barSpacing / 2;
      const y = padding + chartHeight - barHeight - 5;
      
      ctx.fillText(`€${(value / 1000).toFixed(0)}k`, x, y);
    });

  }, []);

  return (
    <div className="w-full h-64">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default RevenueChart;