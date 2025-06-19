import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminOverview from './AdminOverview';
import MerchantManagement from './MerchantManagement';
import TransactionManagement from './TransactionManagement';
import CommissionManagement from './CommissionManagement';
import ReportsAnalytics from './ReportsAnalytics';
import AdminSettings from './AdminSettings';
import AIAnalytics from '../ai/AIAnalytics';
import FraudDetection from '../ai/FraudDetection';
import RealTimeMonitoring from '../ai/RealTimeMonitoring';
import PredictiveAnalytics from '../ai/PredictiveAnalytics';
import MerchantLocationsPage from '../../pages/MerchantLocationsPage';

const AdminDashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Main Content */}
      <div className="flex-1 p-6">
        <Routes>
          <Route path="/" element={<AdminOverview />} />
          <Route path="/overview" element={<AdminOverview />} />
          <Route path="/merchants" element={<MerchantManagement />} />
          <Route path="/transactions" element={<TransactionManagement />} />
          <Route path="/commissions" element={<CommissionManagement />} />
          <Route path="/reports" element={<ReportsAnalytics />} />
          <Route path="/settings" element={<AdminSettings />} />
          
          {/* AI-Powered Features */}
          <Route path="/ai-analytics" element={<AIAnalytics />} />
          <Route path="/fraud-detection" element={<FraudDetection />} />
          <Route path="/real-time-monitoring" element={<RealTimeMonitoring />} />
          <Route path="/predictive-analytics" element={<PredictiveAnalytics />} />
          
          {/* Merchant Locations */}
          <Route path="/merchant-locations" element={<MerchantLocationsPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;