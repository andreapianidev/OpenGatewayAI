import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import MerchantDashboard from './pages/MerchantDashboard';
import LandingPage from './pages/LandingPage';
import ProtectedRoute from './components/ProtectedRoute';
import MerchantOverview from './components/MerchantOverview';
import TransactionHistory from './components/TransactionHistory';
import AccountSettings from './components/AccountSettings';
import SupportTickets from './components/SupportTickets';
import MerchantManagement from './components/MerchantManagement';
import TransactionManagement from './components/TransactionManagement';
import ReportsAnalytics from './components/ReportsAnalytics';
import SystemSettings from './components/SystemSettings';
import CommissionSettings from './components/CommissionSettings';
import './i18n';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route 
              path="/admin/*" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/merchant/*" 
              element={
                <ProtectedRoute requiredRole="merchant">
                  <MerchantDashboard />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;