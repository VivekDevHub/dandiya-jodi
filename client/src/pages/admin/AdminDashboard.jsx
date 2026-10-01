import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  CheckCircle2,
  Clock,
  CreditCard,
  GitMerge,
  Heart,
  TrendingUp,
  MapPin,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { adminService } from '../../services/api';

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        setLoading(true);
        const res = await adminService.getDashboard();
        if (res.data?.success) {
          setData(res.data.data);
        }
      } catch (err) {
        console.error('Failed to load admin stats:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchOverview();
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center">
        <div className="w-10 h-10 border-4 border-brand-pink border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-gray-400 text-xs">Loading operational metrics...</p>
      </div>
    );
  }

  const stats = data?.stats || {};
  const charts = data?.charts || {};
  const recent = data?.recentRegistrations || [];

  const cards = [
    { title: 'Total Registrations', value: stats.totalRegistrations || 0, icon: Users, color: 'text-white', border: 'border-purple-800' },
    { title: 'Pending Review', value: stats.pendingVerification || 0, icon: Clock, color: 'text-amber-400', border: 'border-amber-600/40' },
    { title: 'Verified Profiles', value: stats.verifiedProfiles || 0, icon: CheckCircle2, color: 'text-emerald-400', border: 'border-emerald-600/40' },
    { title: 'Payments Verified', value: stats.paymentsVerified || 0, icon: CreditCard, color: 'text-emerald-400', border: 'border-emerald-600/40' },
    { title: 'Payment Pending', value: stats.paymentPending || 0, icon: Clock, color: 'text-amber-400', border: 'border-amber-600/40' },
    { title: 'Active Matches', value: stats.totalMatches || 0, icon: GitMerge, color: 'text-brand-pink', border: 'border-pink-600/40' },
    { title: 'Female Participants', value: stats.femaleCount || 0, icon: Heart, color: 'text-pink-300', border: 'border-purple-800' },
    { title: 'Male Participants', value: stats.maleCount || 0, icon: Users, color: 'text-blue-300', border: 'border-purple-800' },
  ];

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-white">
            Operational Dashboard
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Real-time Navratri 2026 registration, payment verification, and matching statistics in Indore.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/admin/matches"
            className="px-4 py-2 rounded-xl font-heading font-bold text-xs bg-gradient-to-r from-brand-pink to-brand-gold text-white shadow transition flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
            Matching Workbench
          </Link>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className={`glass-card p-5 rounded-2xl border ${card.border} space-y-2`}
            >
              <div className="flex items-center justify-between text-gray-400">
                <span className="text-[11px] font-semibold uppercase tracking-wider">{card.title}</span>
                <Icon className={`w-4 h-4 ${card.color}`} />
              </div>
              <div className={`font-heading font-black text-2xl sm:text-3xl ${card.color}`}>
                {card.value}
              </div>
            </div>
          );
        })}
      </div>

      {/* Distribution Charts / Breakdowns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Area Distribution */}
        <div className="glass-card p-6 rounded-3xl border border-purple-800/60 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-base text-white flex items-center gap-2">
              <MapPin className="w-4 h-4 text-brand-pink" />
              <span>Registrations by Indore Area</span>
            </h3>
            <span className="text-xs text-gray-400">{charts.areaDistribution?.length || 0} Areas</span>
          </div>

          <div className="space-y-3 pt-2">
            {charts.areaDistribution?.map((item) => (
              <div key={item._id} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-300 font-medium">{item._id || 'Other'}</span>
                  <span className="text-brand-gold font-bold">{item.count}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-purple-950 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-brand-pink to-brand-gold rounded-full"
                    style={{
                      width: `${Math.min(100, (item.count / (stats.totalRegistrations || 1)) * 100)}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Plan Distribution & Funnel */}
        <div className="glass-card p-6 rounded-3xl border border-purple-800/60 space-y-6">
          <div>
            <h3 className="font-heading font-bold text-base text-white mb-3">
              Plan Selection
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {charts.planDistribution?.map((plan) => (
                <div key={plan._id} className="p-4 rounded-2xl bg-purple-950/40 border border-purple-800/50">
                  <span className="text-xs text-gray-400 uppercase tracking-wider block">
                    {plan._id === 'DOUBLE_MATCH' ? 'Double Match (₹299)' : 'Single Match (₹199)'}
                  </span>
                  <div className="font-heading font-black text-2xl text-white mt-1">
                    {plan.count}
                  </div>
                  <span className="text-[11px] text-brand-gold font-medium">
                    {Math.round((plan.count / (stats.totalRegistrations || 1)) * 100)}% of registrations
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-purple-900/40 pt-4 space-y-2">
            <h4 className="font-heading font-semibold text-xs text-purple-200 uppercase tracking-wider">
              Verification & Moderation Status
            </h4>
            <div className="flex items-center justify-between text-xs text-gray-300 p-3 rounded-xl bg-purple-950/30">
              <span>Verified Rate:</span>
              <span className="font-bold text-emerald-400">
                {Math.round(((stats.verifiedProfiles || 0) / (stats.totalRegistrations || 1)) * 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Registrations Table */}
      <div className="glass-card rounded-3xl border border-purple-800/60 overflow-hidden">
        <div className="p-5 border-b border-purple-900/40 flex items-center justify-between">
          <h3 className="font-heading font-bold text-base text-white">
            Recent Registrations
          </h3>
          <Link
            to="/admin/registrations"
            className="text-xs text-brand-gold hover:text-white font-semibold flex items-center gap-1"
          >
            <span>View All ({stats.totalRegistrations})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-purple-950/50 text-gray-400 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">ID</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Gender</th>
                <th className="py-3 px-4">Indore Area</th>
                <th className="py-3 px-4">Profile</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-900/30 text-gray-300">
              {recent.map((reg) => (
                <tr key={reg._id} className="hover:bg-white/5 transition">
                  <td className="py-3 px-4 font-mono font-bold text-brand-gold">
                    {reg.registrationId}
                  </td>
                  <td className="py-3 px-4 font-semibold text-white">
                    {reg.fullName}
                  </td>
                  <td className="py-3 px-4">{reg.gender}</td>
                  <td className="py-3 px-4 text-gray-300">{reg.location?.area}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        reg.profileStatus === 'VERIFIED'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-amber-500/20 text-amber-300'
                      }`}
                    >
                      {reg.profileStatus}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        reg.paymentStatus === 'VERIFIED'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-amber-500/20 text-amber-300'
                      }`}
                    >
                      {reg.paymentStatus}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Link
                      to={`/admin/registrations/${reg._id}`}
                      className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-white font-medium transition"
                    >
                      Review &rarr;
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
