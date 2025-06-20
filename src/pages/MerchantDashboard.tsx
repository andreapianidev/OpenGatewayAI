import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MerchantSidebar from '../components/merchant/MerchantSidebar';
import MerchantHeader from '../components/merchant/MerchantHeader';
import MerchantOverview from '../components/merchant/MerchantOverview';
import TransactionHistory from '../components/merchant/TransactionHistory';
import PaymentRequests from '../components/merchant/PaymentRequests';
import AccountSettings from '../components/merchant/AccountSettings';
import SupportTickets from '../components/merchant/SupportTickets';
import AffiliateProgram from './AffiliateProgram';

const MerchantDashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <MerchantSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col lg:ml-64">
        <MerchantHeader onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<MerchantOverview />} />
            <Route path="/transactions" element={<TransactionHistory />} />
            <Route path="/payments" element={<PaymentRequests />} />
            <Route path="/affiliate-program" element={<AffiliateProgram />} />
            <Route path="/settings" element={<AccountSettings />} />
            <Route path="/support" element={<SupportTickets />} />
            <Route path="*" element={<Navigate to="/merchant" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default MerchantDashboard;