import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  Shield,
  Instagram,
  Phone,
  MapPin,
  Calendar,
  AlertTriangle,
  Lock,
  Save,
} from 'lucide-react';
import { adminService } from '../../services/api';

export default function AdminRegistrationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adminNotes, setAdminNotes] = useState('');
  const [profileStatus, setProfileStatus] = useState('');
  const [savingNotes, setSavingNotes] = useState(false);
  const [actionNotice, setActionNotice] = useState('');

  const fetchDetails = async () => {
    try {
      setLoading(true);
      const res = await adminService.getRegistrationDetails(id);
      if (res.data?.success) {
        setData(res.data.data);
        setAdminNotes(res.data.data.registration.adminNotes || '');
        setProfileStatus(res.data.data.registration.profileStatus);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [id]);

  const handleStatusChange = async (newStatus) => {
    try {
      setActionNotice('');
      const res = await adminService.updateRegistrationStatus(id, {
        profileStatus: newStatus,
        adminNotes,
      });
      if (res.data?.success) {
        setProfileStatus(newStatus);
        setActionNotice(`Profile status updated to ${newStatus}`);
        fetchDetails();
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSaveNotes = async () => {
    try {
      setSavingNotes(true);
      await adminService.updateRegistrationStatus(id, { adminNotes });
      setActionNotice('Internal admin notes saved.');
      fetchDetails();
    } catch (err) {
      alert(err.message);
    } finally {
      setSavingNotes(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center">
        <div className="w-10 h-10 border-4 border-brand-pink border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-gray-400 text-xs">Loading profile review data...</p>
      </div>
    );
  }

  const reg = data?.registration;
  if (!reg) {
    return (
      <div className="py-20 text-center text-gray-400">
        Registration record not found.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Top Breadcrumb & Action bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-900/40 pb-5">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/registrations"
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 transition"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-heading font-black text-2xl text-white">
                {reg.fullName}
              </h1>
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-purple-950 text-brand-gold border border-purple-800">
                {reg.registrationId}
              </span>
            </div>
            <p className="text-xs text-gray-400">
              {reg.age} years • {reg.gender} • Registered {new Date(reg.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Quick Action buttons */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => handleStatusChange('VERIFIED')}
            disabled={profileStatus === 'VERIFIED'}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white shadow transition flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            Approve Profile
          </button>
          <button
            type="button"
            onClick={() => handleStatusChange('REJECTED')}
            disabled={profileStatus === 'REJECTED'}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-red-600/80 hover:bg-red-600 disabled:opacity-50 text-white transition flex items-center gap-1.5"
          >
            <XCircle className="w-3.5 h-3.5" />
            Reject Profile
          </button>
          <Link
            to={`/admin/matches?target=${reg._id}`}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-brand-pink to-brand-gold text-white shadow transition flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Find Matches
          </Link>
        </div>
      </div>

      {actionNotice && (
        <div className="p-3.5 rounded-xl bg-purple-950/80 border border-brand-pink text-xs text-white">
          {actionNotice}
        </div>
      )}

      {/* Main Grid: Left photos & profile, Right metadata & notes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Columns: Photos, Dance Style, Bio */}
        <div className="lg:col-span-2 space-y-6">
          {/* Photos Box */}
          <div className="glass-card p-6 rounded-3xl border border-purple-800/60 space-y-4">
            <h3 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
              Profile Photos ({reg.photos?.length || 0})
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {reg.photos?.map((photo, pIdx) => (
                <a
                  key={pIdx}
                  href={photo.url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl overflow-hidden aspect-square border border-purple-700/50 block group relative bg-black"
                >
                  <img
                    src={photo.url}
                    alt={`Registration photo ${pIdx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-xs text-white font-medium transition">
                    View Fullscreen
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Dance & Matching Criteria */}
          <div className="glass-card p-6 rounded-3xl border border-purple-800/60 space-y-4">
            <h3 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
              Dance & Partner Criteria
            </h3>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-gray-400 block mb-0.5">Experience Level</span>
                <span className="font-semibold text-white">{reg.danceExperience}</span>
              </div>
              <div>
                <span className="text-gray-400 block mb-0.5">Partner Looking For</span>
                <span className="font-semibold text-brand-gold">{reg.partnerPreference}</span>
              </div>
              <div>
                <span className="text-gray-400 block mb-0.5">Preferred Age Range</span>
                <span className="font-semibold text-white">
                  {reg.preferredAgeRange?.min} – {reg.preferredAgeRange?.max} years
                </span>
              </div>
              <div>
                <span className="text-gray-400 block mb-0.5">Indore Area</span>
                <span className="font-semibold text-white">
                  {reg.location?.area === 'Other' ? reg.location?.customArea : reg.location?.area}
                </span>
              </div>
            </div>

            <div className="border-t border-purple-900/40 pt-3 space-y-2">
              <span className="text-xs text-gray-400 block">Dance Styles:</span>
              <div className="flex flex-wrap gap-1.5">
                {reg.danceTypes?.map((style, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-purple-950/60 border border-purple-700/50 text-[11px] text-purple-200"
                  >
                    {style}
                  </span>
                ))}
              </div>
            </div>

            <div className="border-t border-purple-900/40 pt-3 space-y-2">
              <span className="text-xs text-gray-400 block">Navratri Availability:</span>
              <div className="flex flex-wrap gap-1.5">
                {reg.availability?.map((d, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-pink-950/40 border border-pink-700/40 text-[11px] text-pink-200"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>

            {reg.about && (
              <div className="border-t border-purple-900/40 pt-3 space-y-1">
                <span className="text-xs text-gray-400 block">About Me:</span>
                <p className="text-xs text-gray-200 italic leading-relaxed bg-purple-950/30 p-3 rounded-xl border border-purple-900/30">
                  "{reg.about}"
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Verification & Contact Details */}
        <div className="space-y-6">
          {/* Identity & Verification verification box */}
          <div className="glass-card p-6 rounded-3xl border border-purple-800/60 space-y-4">
            <h3 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
              Verification & Safety Check
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-purple-950/50 border border-purple-800/40 space-y-1">
                <span className="text-gray-400">Instagram Handle (Verify active account):</span>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-pink-300 font-mono text-sm">
                    {reg.instagramId}
                  </span>
                  <a
                    href={`https://instagram.com/${reg.instagramId?.replace('@', '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] text-brand-gold hover:underline font-semibold"
                  >
                    Open Instagram &rarr;
                  </a>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-purple-950/50 border border-purple-800/40 space-y-1">
                <span className="text-gray-400">WhatsApp / Phone:</span>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-300 font-mono text-sm">
                    +91 {reg.whatsappNumber}
                  </span>
                  <a
                    href={`https://wa.me/91${reg.whatsappNumber}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] text-emerald-400 hover:underline font-semibold"
                  >
                    Open Chat &rarr;
                  </a>
                </div>
              </div>

              <div className="flex justify-between items-center py-1">
                <span className="text-gray-400">Contact Consent:</span>
                <span className={`font-semibold ${reg.contactSharingConsent ? 'text-emerald-400' : 'text-gray-400'}`}>
                  {reg.contactSharingConsent ? 'Granted (ON)' : 'Restricted (OFF)'}
                </span>
              </div>

              <div className="flex justify-between items-center py-1">
                <span className="text-gray-400">Selected Plan:</span>
                <span className="font-bold text-brand-gold">
                  {reg.selectedPlan}
                </span>
              </div>
            </div>
          </div>

          {/* Internal Notes Box */}
          <div className="glass-card p-6 rounded-3xl border border-purple-800/60 space-y-3">
            <h3 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
              Internal Admin Notes
            </h3>
            <textarea
              rows="4"
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              placeholder="Add verification notes, Instagram review status, or matching guidance..."
              className="w-full p-3 rounded-xl bg-purple-950/50 border border-purple-800 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-brand-pink"
            />
            <button
              type="button"
              onClick={handleSaveNotes}
              disabled={savingNotes}
              className="w-full py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white transition flex items-center justify-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              {savingNotes ? 'Saving Notes...' : 'Save Internal Notes'}
            </button>
          </div>

          {/* Audit trail summary */}
          {data?.auditTrail?.length > 0 && (
            <div className="glass-card p-5 rounded-2xl border border-purple-900/40 space-y-2">
              <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                Audit Trail
              </h4>
              <div className="space-y-1.5 text-[11px] text-gray-300">
                {data.auditTrail.map((log) => (
                  <div key={log._id} className="border-b border-purple-900/30 pb-1">
                    <span className="text-gray-400">{new Date(log.createdAt).toLocaleTimeString()}:</span>{' '}
                    <span>{log.action}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
