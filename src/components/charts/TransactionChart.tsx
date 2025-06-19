import React, { useEffect, useRef } from 'react';

const TransactionChart: React.FC = () => {
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
    const data = [120, 190, 300, 500, 200, 300, 450, 380, 420, 290, 350, 480];
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

    // Vertical grid lines
    for (let i = 0; i <= data.length - 1; i++) {
      const x = padding + (chartWidth / (data.length - 1)) * i;
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, height - padding);
      ctx.stroke();
    }

    // Create gradient
    const gradient = ctx.createLinearGradient(0, padding, 0, height - padding);
    gradient.addColorStop(0, 'rgba(59, 130, 246, 0.3)');
    gradient.addColorStop(1, 'rgba(59, 130, 246, 0.05)');

    // Draw area
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    
    data.forEach((value, index) => {
      const x = padding + (chartWidth / (data.length - 1)) * index;
      const y = padding + chartHeight - ((value - minValue) / (maxValue - minValue)) * chartHeight;
      
      if (index === 0) {
        ctx.lineTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    
    ctx.lineTo(width - padding, height - padding);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw line
    ctx.beginPath();
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 3;
    
    data.forEach((value, index) => {
      const x = padding + (chartWidth / (data.length - 1)) * index;
      const y = padding + chartHeight - ((value - minValue) / (maxValue - minValue)) * chartHeight;
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    
    ctx.stroke();

    // Draw points
    data.forEach((value, index) => {
      const x = padding + (chartWidth / (data.length - 1)) * index;
      const y = padding + chartHeight - ((value - minValue) / (maxValue - minValue)) * chartHeight;
      
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#3b82f6';
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();
    });

    // Draw labels
    ctx.font = '12px Inter, system-ui, sans-serif';
    ctx.fillStyle = '#6b7280';
    ctx.textAlign = 'center';
    
    labels.forEach((label, index) => {
      const x = padding + (chartWidth / (data.length - 1)) * index;
      ctx.fillText(label, x, height - 10);
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

export default TransactionChart;