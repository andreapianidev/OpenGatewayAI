import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminHeader from '../components/admin/AdminHeader';
import AdminOverview from '../components/admin/AdminOverview';
import MerchantManagement from '../components/admin/MerchantManagement';
import TransactionManagement from '../components/admin/TransactionManagement';
import CommissionSettings from '../components/admin/CommissionSettings';
import ReportsAnalytics from '../components/admin/ReportsAnalytics';
import SystemSettings from '../components/admin/SystemSettings';
import AISettings from '../components/admin/AISettings';
import AIAnalytics from '../components/ai/AIAnalytics';
import FraudDetection from '../components/ai/FraudDetection';
import RealTimeMonitoring from '../components/ai/RealTimeMonitoring';

import MerchantLocationsPage from './MerchantLocationsPage';
import POSManagement from './POSManagement';

const AdminDashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col lg:ml-64">
        <AdminHeader onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<AdminOverview />} />
            <Route path="/merchants" element={<MerchantManagement />} />
            <Route path="/transactions" element={<TransactionManagement />} />
            <Route path="/commissions" element={<CommissionSettings />} />
            <Route path="/reports" element={<ReportsAnalytics />} />
            <Route path="/settings" element={<SystemSettings />} />
            <Route path="/ai-settings" element={<AISettings />} />
            <Route path="/ai-analytics" element={<AIAnalytics />} />
            <Route path="/fraud-detection" element={<FraudDetection />} />
            <Route path="/real-time-monitoring" element={<RealTimeMonitoring />} />

            <Route path="/merchant-locations" element={<MerchantLocationsPage />} />
            <Route path="/pos-management" element={<POSManagement />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;