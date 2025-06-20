import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ElectronProvider } from './components/electron/ElectronProvider';
import { MacOSTitleBar } from './components/electron/MacOSTitleBar';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import MerchantDashboard from './pages/MerchantDashboard';
import LandingPage from './pages/LandingPage';
import AndroidPreview from './pages/AndroidPreview';
import ProtectedRoute from './components/ProtectedRoute';
import './i18n';

function App() {
  return (
    <ElectronProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <MacOSTitleBar />
            <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/android-preview" element={<AndroidPreview />} />
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
    </ElectronProvider>
  );
}

export default App;