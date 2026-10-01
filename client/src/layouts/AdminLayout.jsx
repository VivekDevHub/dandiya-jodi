import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  GitMerge,
  CreditCard,
  AlertTriangle,
  UserCheck,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Shield,
  Heart,
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuthStore();

  const allowedRoles = ['SUPER_ADMIN', 'ADMIN', 'VERIFICATION_TEAM', 'MATCHING_TEAM'];
  const isAuthorized = isAuthenticated && user && allowedRoles.includes(user.role);

  const navItems = [
    { name: 'Dashboard Overview', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Registrations', path: '/admin/registrations', icon: Users },
    { name: 'Matching Workbench', path: '/admin/matches', icon: GitMerge },
    { name: 'Payments & Receipts', path: '/admin/payments', icon: CreditCard },
    { name: 'Safety Reports', path: '/admin/reports', icon: AlertTriangle },
    { name: 'User Management', path: '/admin/users', icon: UserCheck, superOnly: true },
    { name: 'Platform Settings', path: '/admin/settings', icon: Settings },
  ];

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-[#0c0214] flex items-center justify-center p-4">
        <div className="max-w-md w-full glass-card p-8 rounded-2xl text-center border border-purple-800">
          <div className="w-16 h-16 bg-red-500/20 text-red-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-heading font-bold text-white mb-2">Restricted Access</h2>
          <p className="text-gray-400 text-sm mb-6">
            You must be logged in as an authorized administrator or moderator to view this area.
          </p>
          <div className="space-y-3">
            <Link
              to="/admin/login"
              className="block w-full py-3 px-4 rounded-xl font-bold bg-brand-pink text-white hover:bg-pink-600 transition"
            >
              Go to Admin Login
            </Link>
            <Link to="/" className="block text-sm text-gray-400 hover:text-white transition">
              Back to Public Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#0a0112] text-slate-100 flex">
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 bottom-0 left-0 z-50 w-64 bg-[#120320] border-r border-purple-900/50 flex flex-col transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand */}
        <div className="h-20 px-6 flex items-center justify-between border-b border-purple-900/40">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-brand-pink to-brand-gold flex items-center justify-center text-lg">
              💃
            </div>
            <div>
              <div className="flex items-center gap-1 font-heading font-extrabold text-white text-base">
                <span>Dandiya Jodi</span>
                <Heart className="w-3.5 h-3.5 text-brand-pink fill-brand-pink" />
              </div>
              <span className="text-[10px] text-amber-400 font-semibold tracking-wider uppercase">
                Admin Console
              </span>
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1 rounded-lg text-gray-400 hover:text-white lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Card */}
        <div className="p-4 border-b border-purple-900/30 bg-purple-950/20">
          <div className="text-xs text-gray-400">Signed in as:</div>
          <div className="font-semibold text-sm text-white truncate">{user?.name}</div>
          <div className="mt-1 flex items-center gap-1.5">
            <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-brand-pink/20 text-pink-300 border border-brand-pink/30">
              {user?.role?.replace('_', ' ')}
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-3 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${
                  isActive
                    ? 'bg-gradient-to-r from-brand-pink/20 to-purple-800/30 text-white border border-brand-pink/40 font-semibold shadow-sm'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-brand-gold' : 'text-gray-400'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-purple-900/40 space-y-2">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-gray-400 hover:text-white hover:bg-white/5 transition"
          >
            <span>View Public Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10 transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar for mobile and quick search */}
        <header className="h-16 lg:h-20 bg-[#0f0219]/90 backdrop-blur-md border-b border-purple-900/40 px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg text-gray-300 hover:text-white lg:hidden"
            >
              <Menu className="w-6 h-6" />
            </button>
            <span className="text-xs sm:text-sm text-gray-400 font-medium">
              Indore Navratri 2026 Admin Operations
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block text-xs text-amber-300 font-medium bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full">
              📍 Indore Operation Center
            </span>
            <button
              onClick={handleLogout}
              className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
