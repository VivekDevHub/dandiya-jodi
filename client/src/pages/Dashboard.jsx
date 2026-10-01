import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Heart,
  AlertTriangle,
  Lock,
  User,
  Phone,
  Instagram,
  MapPin,
  Calendar,
  X,
  MessageCircle,
} from 'lucide-react';
import { registrationService, matchService, reportService } from '../services/api';
import { useAuthStore } from '../store/authStore';

export default function Dashboard() {
  const { user, registration, refreshRegistration } = useAuthStore();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionMessage, setActionMessage] = useState('');
  const [consentToggleLoading, setConsentToggleLoading] = useState(false);

  // Safety Report Modal State
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportReason, setReportReason] = useState('Harassment or inappropriate behavior');
  const [reportDescription, setReportDescription] = useState('');
  const [submittingReport, setSubmittingReport] = useState(false);
  const [reportSuccess, setReportSuccess] = useState(false);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      await refreshRegistration();
      const matchRes = await matchService.getMyMatches();
      if (matchRes.data?.success) {
        setMatches(matchRes.data.data);
      }
    } catch (err) {
      console.error('Failed to load dashboard:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleConsentResponse = async (matchId, action) => {
    try {
      setActionMessage('');
      const res = await matchService.respondConsent(matchId, action);
      if (res.data?.success) {
        setActionMessage(res.data.message);
        await fetchDashboardData();
      }
    } catch (err) {
      setActionMessage(err.message || 'Failed to update response.');
    }
  };

  const handleToggleContactSharing = async () => {
    if (!registration) return;
    try {
      setConsentToggleLoading(true);
      const newStatus = !registration.contactSharingConsent;
      await registrationService.updateConsent(newStatus);
      await refreshRegistration();
    } catch (err) {
      console.error(err.message);
    } finally {
      setConsentToggleLoading(false);
    }
  };

  const handleReportSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmittingReport(true);
      await reportService.create({
        reason: reportReason,
        description: reportDescription,
      });
      setReportSuccess(true);
      setTimeout(() => {
        setReportModalOpen(false);
        setReportSuccess(false);
        setReportDescription('');
      }, 2000);
    } catch (err) {
      alert(err.message || 'Failed to submit report');
    } finally {
      setSubmittingReport(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20 text-center">
        <div className="w-12 h-12 border-4 border-brand-pink border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-400 text-sm">Loading your Dandiya Jodi dashboard...</p>
      </div>
    );
  }

  if (!registration) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="glass-card p-10 rounded-3xl border border-purple-800 space-y-5">
          <span className="text-4xl">💃</span>
          <h2 className="font-heading font-bold text-2xl text-white">No Active Registration Found</h2>
          <p className="text-gray-300 text-sm">
            You haven't completed your Dandiya Jodi profile for Navratri 2026 in Indore yet.
          </p>
          <Link
            to="/register"
            className="inline-block px-6 py-3 rounded-xl font-heading font-bold text-white bg-gradient-to-r from-brand-pink to-brand-gold shadow-lg"
          >
            Register Now
          </Link>
        </div>
      </div>
    );
  }

  const isProfileVerified = registration.profileStatus === 'VERIFIED';
  const isPaymentVerified = registration.paymentStatus === 'VERIFIED';

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-10">
      {/* Top Welcome & Meta Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-900/40 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading font-black text-2xl sm:text-3xl text-white">
              Hi, {registration.fullName}! 💃
            </h1>
            <Heart className="w-5 h-5 text-brand-pink fill-brand-pink" />
          </div>
          <p className="text-xs text-purple-300 font-medium mt-1">
            Navratri 2026 • Indore • Managed by Love Angle
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Registration ID</span>
            <span className="font-mono font-bold text-brand-gold text-sm sm:text-base">
              {registration.registrationId}
            </span>
          </div>
          <button
            onClick={() => setReportModalOpen(true)}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-red-300 bg-red-950/40 border border-red-800/40 hover:bg-red-900/50 transition flex items-center gap-1.5"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            Report Issue
          </button>
        </div>
      </div>

      {/* Action Notification Alert */}
      {actionMessage && (
        <div className="p-4 rounded-xl bg-purple-950 border border-brand-pink text-white text-sm flex items-center justify-between shadow-lg">
          <span>{actionMessage}</span>
          <button onClick={() => setActionMessage('')} className="text-gray-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Real-time Status Tracker Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {/* Profile Status */}
        <div className="glass-card p-5 rounded-2xl border border-purple-800/50 space-y-2">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Profile Status
          </span>
          <div className="flex items-center gap-2 text-base font-heading font-bold text-white">
            {isProfileVerified ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="text-emerald-300">Verified Profile</span>
              </>
            ) : (
              <>
                <Clock className="w-5 h-5 text-amber-400" />
                <span className="text-amber-300">Under Review</span>
              </>
            )}
          </div>
          <p className="text-[11px] text-gray-400">
            {isProfileVerified
              ? 'Your identity & dance profile have been approved.'
              : 'Our moderation team is reviewing your profile photos & Instagram.'}
          </p>
        </div>

        {/* Payment Status */}
        <div className="glass-card p-5 rounded-2xl border border-purple-800/50 space-y-2">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Payment Status
          </span>
          <div className="flex items-center gap-2 text-base font-heading font-bold text-white">
            {isPaymentVerified ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="text-emerald-300">Payment Verified</span>
              </>
            ) : (
              <>
                <Clock className="w-5 h-5 text-amber-400" />
                <span className="text-amber-300">Verification Pending</span>
              </>
            )}
          </div>
          <p className="text-[11px] text-gray-400">
            Plan:{' '}
            <strong className="text-brand-gold">
              {registration.selectedPlan === 'DOUBLE_MATCH' ? 'Double Match (₹299)' : 'Single Match (₹199)'}
            </strong>
          </p>
        </div>

        {/* Matchmaking Queue */}
        <div className="glass-card p-5 rounded-2xl border border-purple-800/50 space-y-2">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Match Status
          </span>
          <div className="flex items-center gap-2 text-base font-heading font-bold text-white">
            <Sparkles className="w-5 h-5 text-brand-pink" />
            <span className="text-pink-300">
              {registration.matchStatus === 'MATCH_FOUND'
                ? 'Potential Match Suggested!'
                : registration.matchStatus === 'CONTACT_PENDING'
                ? 'Mutual Match Confirmed!'
                : 'Matching in Progress'}
            </span>
          </div>
          <p className="text-[11px] text-gray-400">
            Matching in: {registration.location.area}
          </p>
        </div>
      </div>

      {/* PRIVACY & CONTACT SHARING CONSENT TOGGLE */}
      <div className="glass-card p-6 rounded-2xl border border-purple-800/60 bg-gradient-to-r from-purple-950/40 via-pink-950/30 to-purple-950/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1 max-w-xl">
          <div className="flex items-center gap-2 font-heading font-bold text-white text-sm">
            <Lock className="w-4 h-4 text-brand-gold" />
            <span>Contact Sharing Preference (Women's Privacy First)</span>
          </div>
          <p className="text-xs text-gray-300 leading-relaxed">
            By default, contact sharing is strictly <strong>OFF</strong>. Only when both you and your match consent to an introduction can the Love Angle team coordinate your contacts.
          </p>
        </div>

        <button
          type="button"
          disabled={consentToggleLoading}
          onClick={handleToggleContactSharing}
          className={`px-5 py-2.5 rounded-xl font-heading font-bold text-xs transition flex items-center gap-2 shrink-0 ${
            registration.contactSharingConsent
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
              : 'bg-white/10 text-gray-300 border border-white/20 hover:bg-white/20'
          }`}
        >
          <span>{registration.contactSharingConsent ? 'Consent Active (ON) ✓' : 'Contact Sharing OFF'}</span>
        </button>
      </div>

      {/* POTENTIAL MATCHES SECTION */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-heading font-extrabold text-xl text-white">
              Your Dandiya Match Suggestions
            </h2>
            <p className="text-xs text-gray-400">
              Review candidates identified by our team. Accept or decline to coordinate introductions.
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-900/60 text-purple-200 border border-purple-700/50">
            {matches.length} Match {matches.length === 1 ? 'Found' : 'Found'}
          </span>
        </div>

        {matches.length === 0 ? (
          <div className="glass-card p-10 rounded-2xl text-center space-y-3 border border-purple-900/40">
            <span className="text-4xl">🔍</span>
            <h3 className="font-heading font-bold text-lg text-white">
              Matching In Progress
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm max-w-md mx-auto">
              Our team is analyzing dancers in {registration.location.area} with matching styles ({registration.danceTypes.join(', ')}). You will receive an instant notification when a candidate is suggested.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {matches.map((match) => {
              const partner = match.partner;
              const hasConsented = match.myConsent === true;
              const hasDeclined = match.myConsent === false;
              const isMutual = match.status === 'CONSENTED' || match.status === 'CONTACT_SHARED';

              return (
                <div
                  key={match._id}
                  className="glass-card p-6 rounded-3xl border border-purple-800/70 space-y-5 relative overflow-hidden"
                >
                  {/* Top Status Pill */}
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-900/60 text-amber-300 border border-amber-500/30">
                      {isMutual ? '🎉 Mutual Match Confirmed' : 'Suggested Partner'}
                    </span>
                    <span className="text-xs text-gray-400">Indore Navratri 2026</span>
                  </div>

                  {/* Partner Safe Profile View */}
                  <div className="flex items-start gap-4">
                    {partner.photos?.[0] ? (
                      <img
                        src={partner.photos[0].url}
                        alt="Partner portrait"
                        className="w-20 h-20 rounded-2xl object-cover border border-purple-600/50 shadow"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-2xl bg-purple-900/50 flex items-center justify-center text-3xl">
                        💃
                      </div>
                    )}

                    <div className="space-y-1">
                      <h3 className="font-heading font-bold text-lg text-white">
                        {partner.firstName}, {partner.age}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-purple-200">
                        <MapPin className="w-3.5 h-3.5 text-brand-pink" />
                        <span>{partner.location}</span>
                      </div>
                      <div className="text-xs text-amber-300 font-medium">
                        Dance Level: {partner.danceExperience}
                      </div>
                    </div>
                  </div>

                  {/* Bio & Styles */}
                  <div className="space-y-2 text-xs">
                    {partner.about && (
                      <p className="text-gray-300 italic bg-purple-950/30 p-2.5 rounded-xl border border-purple-900/30">
                        "{partner.about}"
                      </p>
                    )}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {partner.danceTypes?.map((style, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[11px] text-gray-300"
                        >
                          {style}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Safe Shared Contact Box if Mutual & Shared */}
                  {match.contactDetails ? (
                    <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 space-y-2">
                      <div className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Contact Coordinated by Love Angle</span>
                      </div>
                      <div className="text-xs space-y-1 text-gray-200">
                        <div>
                          Full Name: <strong>{match.contactDetails.fullName}</strong>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-3.5 h-3.5 text-emerald-400" />
                          <span>WhatsApp: <strong>+91 {match.contactDetails.whatsappNumber}</strong></span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Instagram className="w-3.5 h-3.5 text-pink-400" />
                          <span>Instagram: <strong>{match.contactDetails.instagramId}</strong></span>
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {/* Consent Action Buttons */}
                  {!isMutual && (
                    <div className="pt-2 border-t border-purple-900/40">
                      {match.myConsent === null ? (
                        <div className="space-y-2">
                          <p className="text-xs text-gray-300 text-center">
                            Would you like to proceed with this introduction?
                          </p>
                          <div className="grid grid-cols-2 gap-3">
                            <button
                              type="button"
                              onClick={() => handleConsentResponse(match._id, 'ACCEPT')}
                              className="py-2.5 px-4 rounded-xl font-heading font-bold text-xs bg-gradient-to-r from-brand-pink to-brand-gold text-white hover:opacity-95 shadow transition"
                            >
                              ❤️ Yes, I'm Interested
                            </button>
                            <button
                              type="button"
                              onClick={() => handleConsentResponse(match._id, 'DECLINE')}
                              className="py-2.5 px-4 rounded-xl font-heading font-semibold text-xs bg-white/5 hover:bg-white/10 text-gray-300 transition"
                            >
                              ❌ No, Thanks
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-2 text-xs font-semibold text-purple-200">
                          {hasConsented && '✓ You accepted this match. Awaiting team coordination.'}
                          {hasDeclined && 'You declined this match.'}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Safety Report Modal */}
      {reportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="glass-card max-w-md w-full p-6 rounded-3xl border border-red-700/60 shadow-2xl relative">
            <button
              onClick={() => setReportModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-red-400 mb-4">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="font-heading font-bold text-lg text-white">Report Misconduct</h3>
            </div>

            {reportSuccess ? (
              <div className="text-center py-6 space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <div className="font-bold text-white">Report Submitted</div>
                <p className="text-xs text-gray-300">
                  Our moderation team is investigating immediately.
                </p>
              </div>
            ) : (
              <form onSubmit={handleReportSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Reason for report
                  </label>
                  <select
                    value={reportReason}
                    onChange={(e) => setReportReason(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-purple-950/60 border border-purple-800 text-white text-xs"
                  >
                    <option value="Harassment or inappropriate behavior">Harassment or inappropriate behavior</option>
                    <option value="Sharing contact without consent">Sharing contact without consent</option>
                    <option value="Fake profile or inaccurate information">Fake profile or inaccurate information</option>
                    <option value="Commercial solicitation / Spam">Commercial solicitation / Spam</option>
                    <option value="Safety violation">Safety violation</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Description
                  </label>
                  <textarea
                    required
                    rows="3"
                    value={reportDescription}
                    onChange={(e) => setReportDescription(e.target.value)}
                    placeholder="Describe what occurred..."
                    className="w-full px-3 py-2 rounded-xl bg-purple-950/60 border border-purple-800 text-white text-xs"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submittingReport}
                  className="w-full py-2.5 rounded-xl font-heading font-bold text-xs bg-red-600 hover:bg-red-500 text-white transition"
                >
                  {submittingReport ? 'Submitting...' : 'Submit Report for Moderation'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
