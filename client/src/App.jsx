import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';

// Public Pages
import Home from './pages/Home';
import Register from './pages/Register';
import HowItWorks from './pages/HowItWorks';
import Plans from './pages/Plans';
import Safety from './pages/Safety';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import RefundPolicy from './pages/RefundPolicy';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import RegistrationSuccess from './pages/RegistrationSuccess';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminRegistrations from './pages/admin/AdminRegistrations';
import AdminRegistrationDetail from './pages/admin/AdminRegistrationDetail';
import AdminMatches from './pages/admin/AdminMatches';
import AdminPayments from './pages/admin/AdminPayments';
import AdminUsers from './pages/admin/AdminUsers';
import AdminReports from './pages/admin/AdminReports';
import AdminSettings from './pages/admin/AdminSettings';

import { useAuthStore } from './store/authStore';

export default function App() {
  const { fetchUser } = useAuthStore();

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Routes>
      {/* Public Pages */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/safety" element={<Safety />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/registration-success" element={<RegistrationSuccess />} />
      </Route>

      {/* Admin Login (Stand-alone) */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Admin Suite */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="registrations" element={<AdminRegistrations />} />
        <Route path="registrations/:id" element={<AdminRegistrationDetail />} />
        <Route path="matches" element={<AdminMatches />} />
        <Route path="payments" element={<AdminPayments />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="reports" element={<AdminReports />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      {/* 404 Fallback */}
      <Route
        path="*"
        element={
          <div className="min-h-screen bg-[#0c0214] flex items-center justify-center p-4 text-center">
            <div className="glass-card p-10 rounded-3xl border border-purple-800 space-y-4 max-w-md">
              <span className="text-4xl">💃</span>
              <h2 className="font-heading font-bold text-2xl text-white">Page Not Found</h2>
              <p className="text-xs text-gray-400">
                The page you are looking for does not exist or has moved.
              </p>
              <a
                href="/"
                className="inline-block px-6 py-2.5 rounded-xl font-heading font-bold text-xs bg-brand-pink text-white hover:bg-pink-600 transition"
              >
                Back to Home
              </a>
            </div>
          </div>
        }
      />
    </Routes>
  );
}
