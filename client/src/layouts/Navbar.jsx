import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Heart, Shield, Sparkles, User, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuthStore();

  const isAdmin = user && ['SUPER_ADMIN', 'ADMIN', 'VERIFICATION_TEAM', 'MATCHING_TEAM'].includes(user.role);

  const navLinks = [
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'Plans', path: '/plans' },
    { name: 'Safety & Privacy', path: '/safety' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#0c0214]/85 border-b border-purple-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-brand-pink via-purple-600 to-brand-gold flex items-center justify-center shadow-lg shadow-pink-500/25 group-hover:scale-105 transition-transform duration-300">
              <span className="text-2xl select-none">💃</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-extrabold text-xl sm:text-2xl tracking-tight text-white group-hover:text-brand-gold transition-colors">
                  Dandiya Jodi
                </span>
                <Heart className="w-4 h-4 text-brand-pink fill-brand-pink animate-pulse" />
              </div>
              <div className="flex items-center gap-1.5 text-xs text-purple-300/80 font-medium">
                <span>by Love Angle</span>
                <span className="inline-block w-1 h-1 rounded-full bg-brand-gold"></span>
                <span className="text-amber-400 font-semibold">Indore 2026</span>
              </div>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-brand-gold border-b-2 border-brand-gold pb-1'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3.5">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                {isAdmin && (
                  <Link
                    to="/admin/dashboard"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-purple-900/60 text-purple-200 border border-purple-600/40 hover:bg-purple-800/80 transition"
                  >
                    <Shield className="w-3.5 h-3.5 text-brand-gold" />
                    Admin Portal
                  </Link>
                )}
                
                <Link
                  to="/dashboard"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold bg-white/10 hover:bg-white/15 text-white border border-white/10 transition"
                >
                  <LayoutDashboard className="w-4 h-4 text-brand-pink" />
                  My Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  title="Logout"
                  className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-semibold text-gray-200 hover:text-white transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="relative group overflow-hidden px-5 py-2.5 rounded-xl font-heading font-bold text-sm text-white shadow-lg shadow-pink-500/20 hover:shadow-pink-500/40 transition duration-300"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-brand-pink via-purple-600 to-amber-500 group-hover:opacity-90 transition-opacity"></span>
                  <span className="relative flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-200" />
                    Find My Dandiya Jodi
                  </span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#120320] border-b border-purple-900/60 px-4 pt-3 pb-6 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-lg text-base font-medium ${
                location.pathname === link.path
                  ? 'text-brand-gold bg-purple-950/60'
                  : 'text-gray-200 hover:bg-white/5'
              }`}
            >
              {link.name}
            </Link>
          ))}

          <div className="pt-4 border-t border-purple-900/40 space-y-2">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-base font-semibold bg-white/10 text-white"
                >
                  <LayoutDashboard className="w-5 h-5 text-brand-pink" />
                  My Dashboard
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-base font-semibold bg-purple-900/60 text-purple-200"
                  >
                    <Shield className="w-5 h-5 text-brand-gold" />
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-2 px-3 py-2 rounded-lg text-base text-gray-400 hover:text-white"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center px-4 py-2.5 rounded-xl text-base font-semibold bg-white/5 text-gray-200 hover:bg-white/10"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center px-5 py-3 rounded-xl font-heading font-bold text-white bg-gradient-to-r from-brand-pink via-purple-600 to-amber-500 shadow-md"
                >
                  Find My Dandiya Jodi ❤️
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
