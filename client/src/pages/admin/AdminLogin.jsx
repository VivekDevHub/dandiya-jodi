import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Lock, Mail, ArrowRight, AlertCircle, KeyRound, Sparkles } from 'lucide-react';
import { authService } from '../../services/api';
import { useAuthStore } from '../../store/authStore';

export default function AdminLogin() {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  const [email, setEmail] = useState('admin@loveangle.in');
  const [password, setPassword] = useState('Admin@123456');
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
        const allowedRoles = ['SUPER_ADMIN', 'ADMIN', 'VERIFICATION_TEAM', 'MATCHING_TEAM'];
        if (!allowedRoles.includes(user.role)) {
          setError('Access denied. This account does not possess administrative privileges.');
          return;
        }
        setAuth(user, token);
        navigate('/admin/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Invalid administrator credentials');
    } finally {
      setLoading(false);
    }
  };

  const setRoleCredentials = (roleEmail) => {
    setEmail(roleEmail);
    setPassword('Admin@123456');
  };

  return (
    <div className="min-h-screen bg-[#08010e] flex items-center justify-center p-4">
      <div className="max-w-md w-full glass-card rounded-3xl p-8 border border-purple-800/60 shadow-2xl space-y-6">
        {/* Brand */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-pink via-purple-700 to-brand-gold flex items-center justify-center mx-auto text-2xl shadow-xl shadow-purple-900/30">
            <Shield className="w-7 h-7 text-white" />
          </div>
          <h1 className="font-heading font-black text-2xl text-white">
            Admin & Staff Console
          </h1>
          <p className="text-xs text-purple-300">
            Dandiya Jodi by Love Angle ❤️ • Indore Navratri 2026
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
              Staff Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@loveangle.in"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-purple-950/50 border border-purple-800 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-brand-gold"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider">
              Secret Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-purple-950/50 border border-purple-800 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-brand-gold"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-heading font-bold text-xs bg-gradient-to-r from-purple-700 via-brand-pink to-brand-gold hover:opacity-95 text-white shadow-xl transition flex items-center justify-center gap-2"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Access Management Console</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Demo Fast Login Buttons */}
        <div className="border-t border-purple-900/40 pt-4 space-y-2">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-brand-gold uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Select Staff Role:</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <button
              type="button"
              onClick={() => setRoleCredentials('admin@loveangle.in')}
              className="py-1.5 px-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] text-gray-300 font-semibold truncate"
            >
              Super Admin
            </button>
            <button
              type="button"
              onClick={() => setRoleCredentials('verifier@loveangle.in')}
              className="py-1.5 px-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] text-gray-300 font-semibold truncate"
            >
              Verification
            </button>
            <button
              type="button"
              onClick={() => setRoleCredentials('matcher@loveangle.in')}
              className="py-1.5 px-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] text-gray-300 font-semibold truncate"
            >
              Matchmaker
            </button>
          </div>
        </div>

        <div className="text-center">
          <Link to="/" className="text-xs text-gray-400 hover:text-white transition">
            &larr; Back to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
