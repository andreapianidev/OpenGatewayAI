import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom'],
          'chart-vendor': ['recharts'],
          'i18n-vendor': ['react-i18next', 'i18next'],
          'ui-vendor': ['lucide-react'],
          // Feature chunks
          'admin-features': [
            './src/components/admin/MerchantManagement.tsx',
            './src/components/admin/SystemSettings.tsx',
            './src/components/admin/TransactionManagement.tsx'
          ],
          'ai-features': [
            './src/components/ai/PredictiveAnalytics.tsx',
            './src/components/ai/FraudDetection.tsx',
            './src/components/ai/AIAnalytics.tsx'
          ],
          'charts': [
            './src/components/charts/RealTimePerformanceChart.tsx',
            './src/components/charts/TransactionVolumeChart.tsx',
            './src/components/charts/PaymentMethodBreakdownChart.tsx'
          ]
        }
      }
    },
    chunkSizeWarningLimit: 600
  }
});
