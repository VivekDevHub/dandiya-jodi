import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Filter,
  Eye,
  CheckCircle2,
  XCircle,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  MapPin,
  RefreshCw,
} from 'lucide-react';
import { adminService } from '../../services/api';

const INDORE_AREAS = [
  'Vijay Nagar',
  'Palasia / Old Palasia',
  'Saket / Tilak Nagar',
  'Bhawarkua / Rajendra Nagar',
  'Nipania / Mahalaxmi Nagar',
  'Rau / AB Road / Bypass',
  'Annapurna / Sudama Nagar',
  'Central Indore / MG Road',
  'Other',
];

export default function AdminRegistrations() {
  const [registrations, setRegistrations] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);

  // Filters & Search
  const [search, setSearch] = useState('');
  const [gender, setGender] = useState('');
  const [area, setArea] = useState('');
  const [profileStatus, setProfileStatus] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('');

  const fetchRegistrations = async () => {
    try {
      setLoading(true);
      const params = {
        page,
        limit: 10,
        search: search.trim() || undefined,
        gender: gender || undefined,
        area: area || undefined,
        profileStatus: profileStatus || undefined,
        paymentStatus: paymentStatus || undefined,
        selectedPlan: selectedPlan || undefined,
      };

      const res = await adminService.getRegistrations(params);
      if (res.data?.success) {
        setRegistrations(res.data.data.registrations);
        setTotal(res.data.data.total);
        setPages(res.data.data.pages);
      }
    } catch (err) {
      console.error('Failed to load registrations:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, [page, gender, area, profileStatus, paymentStatus, selectedPlan]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchRegistrations();
  };

  const handleQuickStatusUpdate = async (id, newStatus) => {
    try {
      await adminService.updateRegistrationStatus(id, { profileStatus: newStatus });
      await fetchRegistrations();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-white">
            Registrations Management
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Browse, filter, verify, and launch matching for Indore participants. Total: {total}
          </p>
        </div>
        <button
          onClick={fetchRegistrations}
          className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 transition flex items-center gap-1.5 self-start"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Refresh Data
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-card p-5 rounded-2xl border border-purple-800/60 space-y-4">
        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by Name, Registration ID, Instagram, or WhatsApp..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-24 py-2.5 rounded-xl bg-purple-950/40 border border-purple-800 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-brand-pink"
          />
          <button
            type="submit"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 px-4 py-1.5 rounded-lg text-xs font-bold bg-brand-pink text-white hover:bg-pink-600 transition"
          >
            Search
          </button>
        </form>

        {/* Filter Dropdowns */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <select
            value={gender}
            onChange={(e) => {
              setGender(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 rounded-xl bg-purple-950/60 border border-purple-800 text-gray-200 text-xs"
          >
            <option value="">All Genders</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="Other">Other</option>
          </select>

          <select
            value={area}
            onChange={(e) => {
              setArea(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 rounded-xl bg-purple-950/60 border border-purple-800 text-gray-200 text-xs"
          >
            <option value="">All Areas</option>
            {INDORE_AREAS.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>

          <select
            value={profileStatus}
            onChange={(e) => {
              setProfileStatus(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 rounded-xl bg-purple-950/60 border border-purple-800 text-gray-200 text-xs"
          >
            <option value="">Profile Status</option>
            <option value="PROFILE_REVIEW">Review Pending</option>
            <option value="VERIFIED">Verified</option>
            <option value="REJECTED">Rejected</option>
          </select>

          <select
            value={paymentStatus}
            onChange={(e) => {
              setPaymentStatus(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 rounded-xl bg-purple-950/60 border border-purple-800 text-gray-200 text-xs"
          >
            <option value="">Payment Status</option>
            <option value="PAYMENT_PENDING">Pending</option>
            <option value="PAYMENT_VERIFICATION_PENDING">Screenshot Uploaded</option>
            <option value="VERIFIED">Verified</option>
          </select>

          <select
            value={selectedPlan}
            onChange={(e) => {
              setSelectedPlan(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 rounded-xl bg-purple-950/60 border border-purple-800 text-gray-200 text-xs"
          >
            <option value="">All Plans</option>
            <option value="SINGLE_MATCH">Single Match (₹199)</option>
            <option value="DOUBLE_MATCH">Double Match (₹299)</option>
          </select>
        </div>
      </div>

      {/* Registrations Table */}
      <div className="glass-card rounded-3xl border border-purple-800/60 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-purple-950/60 text-gray-400 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Reg ID</th>
                <th className="py-3.5 px-4">Participant</th>
                <th className="py-3.5 px-4">Age/Gender</th>
                <th className="py-3.5 px-4">Indore Area</th>
                <th className="py-3.5 px-4">Preference</th>
                <th className="py-3.5 px-4">Plan</th>
                <th className="py-3.5 px-4">Profile</th>
                <th className="py-3.5 px-4">Payment</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-900/30 text-gray-300">
              {loading ? (
                <tr>
                  <td colSpan="9" className="py-12 text-center text-gray-400">
                    Loading registrations...
                  </td>
                </tr>
              ) : registrations.length === 0 ? (
                <tr>
                  <td colSpan="9" className="py-12 text-center text-gray-400">
                    No registrations found matching the criteria.
                  </td>
                </tr>
              ) : (
                registrations.map((reg) => (
                  <tr key={reg._id} className="hover:bg-white/5 transition">
                    <td className="py-3.5 px-4 font-mono font-bold text-brand-gold whitespace-nowrap">
                      {reg.registrationId}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-white">{reg.fullName}</div>
                      <div className="text-[11px] text-gray-400">{reg.instagramId}</div>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {reg.age} yrs • {reg.gender}
                    </td>
                    <td className="py-3.5 px-4">{reg.location?.area}</td>
                    <td className="py-3.5 px-4 text-xs font-medium text-purple-200">
                      {reg.partnerPreference}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="font-semibold text-white">
                        {reg.selectedPlan === 'DOUBLE_MATCH' ? 'Double' : 'Single'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          reg.profileStatus === 'VERIFIED'
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : reg.profileStatus === 'REJECTED'
                            ? 'bg-red-500/20 text-red-300'
                            : 'bg-amber-500/20 text-amber-300'
                        }`}
                      >
                        {reg.profileStatus}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          reg.paymentStatus === 'VERIFIED'
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : reg.paymentStatus === 'PAYMENT_VERIFICATION_PENDING'
                            ? 'bg-purple-500/20 text-purple-300'
                            : 'bg-amber-500/20 text-amber-300'
                        }`}
                      >
                        {reg.paymentStatus === 'PAYMENT_VERIFICATION_PENDING' ? 'RECEIPT UPLOADED' : reg.paymentStatus}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap space-x-1.5">
                      <Link
                        to={`/admin/registrations/${reg._id}`}
                        title="View Full Profile"
                        className="inline-block p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-gray-300 transition"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Link>

                      {reg.profileStatus !== 'VERIFIED' && (
                        <button
                          type="button"
                          onClick={() => handleQuickStatusUpdate(reg._id, 'VERIFIED')}
                          title="Quick Approve"
                          className="p-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 transition"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </button>
                      )}

                      <Link
                        to={`/admin/matches?target=${reg._id}`}
                        title="Find Matches"
                        className="inline-block p-1.5 rounded-lg bg-gradient-to-r from-brand-pink to-brand-gold text-white shadow transition"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="p-4 border-t border-purple-900/40 flex items-center justify-between text-xs text-gray-400">
          <div>
            Showing Page <strong>{page}</strong> of <strong>{pages || 1}</strong> ({total} total registrations)
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page <= 1}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed text-white"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPage((p) => Math.min(p + 1, pages))}
              disabled={page >= pages}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed text-white"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
