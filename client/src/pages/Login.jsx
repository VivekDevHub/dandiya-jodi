import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Lock, Mail, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';
import { authService } from '../services/api';
import { useAuthStore } from '../store/authStore';

export default function Login() {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');

      const res = await authService.login({ email, password });
      if (res.data?.success) {
        const { user, token } = res.data;
        setAuth(user, token);
        if (['SUPER_ADMIN', 'ADMIN', 'VERIFICATION_TEAM', 'MATCHING_TEAM'].includes(user.role)) {
          navigate('/admin/dashboard');
        } else {
          navigate('/dashboard');
        }
      }
    } catch (err) {
      setError(err.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemoLogin = async (demoEmail) => {
    setEmail(demoEmail);
    setPassword('User@123456');
    try {
      setLoading(true);
      setError('');
      const res = await authService.login({ email: demoEmail, password: 'User@123456' });
      if (res.data?.success) {
        setAuth(res.data.user, res.data.token);
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 sm:py-24">
      <div className="glass-card rounded-3xl p-8 border border-purple-800/60 shadow-2xl space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-brand-pink to-brand-gold flex items-center justify-center mx-auto text-2xl shadow-lg shadow-pink-500/20">
            💃
          </div>
          <h1 className="font-heading font-black text-2xl text-white">
            Welcome Back
          </h1>
          <p className="text-xs text-gray-400">
            Log in to track your Dandiya Jodi matches in Indore.
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-red-950/80 border border-red-700/60 text-xs text-red-200 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="e.g. aanya.mehta@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-purple-950/50 border border-purple-800 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-brand-pink"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-purple-950/50 border border-purple-800 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-brand-pink"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-heading font-bold text-xs bg-gradient-to-r from-brand-pink via-purple-600 to-amber-500 hover:opacity-95 text-white shadow-lg transition flex items-center justify-center gap-2"
          >
            {loading ? (
              <span>Logging in...</span>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Demo Fast Login Buttons for testing */}
        <div className="border-t border-purple-900/40 pt-4 space-y-2">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-amber-300 uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>1-Click Demo Accounts (Indore Dancers):</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('aanya.mehta@gmail.com')}
              className="py-1.5 px-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] text-gray-300 font-medium truncate"
            >
              👩 Aanya (Vijay Nagar)
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('aryan.patidar@gmail.com')}
              className="py-1.5 px-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] text-gray-300 font-medium truncate"
            >
              👨 Aryan (Vijay Nagar)
            </button>
          </div>
        </div>

        <div className="text-center text-xs text-gray-400">
          Don't have a profile yet?{' '}
          <Link to="/register" className="text-brand-pink hover:underline font-semibold">
            Register for Navratri 2026
          </Link>
        </div>
      </div>
    </div>
  );
}
