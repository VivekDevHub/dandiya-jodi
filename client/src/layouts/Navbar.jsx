import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Heart, Shield, Sparkles, User, LogOut, LayoutDashboard, ArrowRight } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuthStore();

  const isAdmin = user && ['SUPER_ADMIN', 'ADMIN', 'VERIFICATION_TEAM', 'MATCHING_TEAM'].includes(user.role);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'How It Works', path: '/#how-it-works' },
    { name: 'Safety', path: '/#safety' },
    { name: 'Plans', path: '/#plans' },
    { name: 'FAQ', path: '/#faq' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      {/* Floating Pill Navbar Wrapper */}
      <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 lg:px-8 pt-3 sm:pt-4 transition-all duration-300">
        <div
          className={`max-w-6xl mx-auto rounded-full transition-all duration-300 px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between ${
            scrolled
              ? 'bg-festival-cardSoft/90 backdrop-blur-xl border border-festival-border/80 shadow-luxury'
              : 'bg-festival-dark/75 backdrop-blur-md border border-purple-900/40 shadow-md'
          }`}
        >
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-festival-pink via-purple-600 to-festival-gold flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <span className="text-lg sm:text-xl">💃</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-black text-base sm:text-lg tracking-tight text-white group-hover:text-festival-gold transition-colors">
                  DANDIYA JODI
                </span>
                <Heart className="w-3.5 h-3.5 text-festival-pink fill-festival-pink animate-pulse" />
              </div>
              <div className="hidden sm:flex items-center gap-1 text-[10px] text-purple-200/80 font-semibold tracking-wide">
                <span>by Love Angle</span>
                <span>•</span>
                <span className="text-amber-300">Indore 2026</span>
              </div>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                className="text-sm font-heading font-semibold text-slate-300 hover:text-white hover:text-festival-gold transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                {isAdmin && (
                  <Link
                    to="/admin/dashboard"
                    className="px-3 py-1.5 rounded-full text-xs font-semibold bg-purple-900/60 text-purple-200 border border-purple-500/40 hover:bg-purple-800 transition"
                  >
                    Admin
                  </Link>
                )}
                <Link
                  to="/dashboard"
                  className="px-4 py-1.5 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/15 text-white border border-white/10 transition"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/5 transition"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-xs font-heading font-semibold text-slate-300 hover:text-white transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2.5 rounded-full bg-gradient-to-r from-rose-600 via-festival-pink to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-heading font-bold text-xs sm:text-sm shadow-glow-pink hover:shadow-glow-gold transition-all duration-300 flex items-center gap-1.5"
                >
                  <Heart className="w-3.5 h-3.5 fill-white" />
                  <span>Find My Jodi</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              to="/register"
              className="px-3 py-1.5 rounded-full bg-gradient-to-r from-festival-pink to-amber-500 text-white font-heading font-bold text-xs flex items-center gap-1"
            >
              <Heart className="w-3 h-3 fill-white" />
              <span>Join</span>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/5 transition"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 mx-auto max-w-sm rounded-2xl bg-festival-card/95 border border-festival-border backdrop-blur-xl p-5 shadow-2xl space-y-4">
            <div className="space-y-2 text-center">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-sm font-heading font-bold text-slate-200 hover:text-amber-300"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-purple-900/50 flex flex-col gap-2">
              {isAuthenticated ? (
                <>
                  {isAdmin && (
                    <Link
                      to="/admin/dashboard"
                      className="w-full py-2.5 rounded-xl bg-purple-900/60 text-purple-200 text-xs font-bold text-center block"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <Link
                    to="/dashboard"
                    className="w-full py-2.5 rounded-xl bg-white/10 text-white text-xs font-bold text-center block"
                  >
                    My Participant Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full py-2 text-xs text-rose-400 font-semibold"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="w-full py-2.5 rounded-xl bg-festival-plum border border-festival-border text-slate-200 text-xs font-bold text-center block"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-600 via-festival-pink to-amber-500 text-white font-heading font-bold text-sm text-center block shadow-glow-pink"
                  >
                    Find My Jodi ❤️
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Mobile Sticky Bottom CTA Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 p-3 bg-festival-dark/95 border-t border-festival-border backdrop-blur-lg">
        <Link
          to="/register"
          className="w-full py-3.5 rounded-full bg-gradient-to-r from-rose-600 via-festival-pink to-amber-500 text-white font-heading font-black text-sm tracking-wide shadow-glow-pink flex items-center justify-center gap-2"
        >
          <Heart className="w-4 h-4 fill-white" />
          <span>FIND MY DANDIYA JODI →</span>
        </Link>
      </div>
    </>
  );
}
