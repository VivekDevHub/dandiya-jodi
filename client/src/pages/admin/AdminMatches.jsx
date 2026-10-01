import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Sparkles,
  GitMerge,
  CheckCircle2,
  XCircle,
  Clock,
  Heart,
  User,
  Phone,
  Instagram,
  MapPin,
  Send,
  Eye,
  RefreshCw,
} from 'lucide-react';
import { adminService } from '../../services/api';

export default function AdminMatches() {
  const [searchParams] = useSearchParams();
  const targetFromUrl = searchParams.get('target');

  const [activeTab, setActiveTab] = useState(targetFromUrl ? 'workbench' : 'all');
  const [targetId, setTargetId] = useState(targetFromUrl || '');
  const [registrations, setRegistrations] = useState([]);
  const [targetCandidate, setTargetCandidate] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [existingMatches, setExistingMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionNotice, setActionNotice] = useState('');

  // Fetch verified registrations for selection
  useEffect(() => {
    const loadVerified = async () => {
      try {
        const res = await adminService.getRegistrations({ profileStatus: 'VERIFIED', limit: 50 });
        if (res.data?.success) {
          setRegistrations(res.data.data.registrations);
        }
      } catch (err) {
        console.error(err);
      }
    };
    loadVerified();
    loadAllMatches();
  }, []);

  const loadAllMatches = async () => {
    try {
      setLoading(true);
      const res = await adminService.getAllMatches({ limit: 50 });
      if (res.data?.success) {
        setExistingMatches(res.data.data.matches);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Find suggestions for selected candidate
  const runMatchingWorkbench = async (idToMatch) => {
    if (!idToMatch) return;
    try {
      setLoading(true);
      setActionNotice('');
      const [candRes, matchRes] = await Promise.all([
        adminService.getRegistrationDetails(idToMatch),
        adminService.findMatchesForRegistration(idToMatch),
      ]);

      if (candRes.data?.success) {
        setTargetCandidate(candRes.data.data.registration);
      }
      if (matchRes.data?.success) {
        setSuggestions(matchRes.data.data);
      }
    } catch (err) {
      setActionNotice(err.message || 'Error running matching algorithm');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (targetId) {
      runMatchingWorkbench(targetId);
    }
  }, [targetId]);

  const handleCreateMatchSuggestion = async (candidateBId) => {
    try {
      setActionNotice('');
      const res = await adminService.createMatch({
        registrationAId: targetCandidate._id,
        registrationBId: candidateBId,
        adminNotes: 'Suggested via Matching Workbench.',
      });

      if (res.data?.success) {
        setActionNotice('Match suggestion created! Consent requests sent to both dancers.');
        runMatchingWorkbench(targetCandidate._id);
        loadAllMatches();
      }
    } catch (err) {
      setActionNotice(err.message);
    }
  };

  const handleShareContact = async (matchId) => {
    try {
      const res = await adminService.updateMatch(matchId, {
        contactShared: true,
        status: 'CONTACT_SHARED',
      });
      if (res.data?.success) {
        setActionNotice('Contact details successfully shared with both participants!');
        loadAllMatches();
      }
    } catch (err) {
      setActionNotice(err.message);
    }
  };

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-white">
            Matching Workbench
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Algorithmic scoring, mutual consent coordination, and contact management for Navratri 2026.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-2 p-1 rounded-xl bg-purple-950/60 border border-purple-800">
          <button
            type="button"
            onClick={() => setActiveTab('workbench')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
              activeTab === 'workbench'
                ? 'bg-brand-pink text-white shadow'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Match Finder
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('all');
              loadAllMatches();
            }}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
              activeTab === 'all'
                ? 'bg-brand-pink text-white shadow'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            All Matches ({existingMatches.length})
          </button>
        </div>
      </div>

      {actionNotice && (
        <div className="p-4 rounded-xl bg-purple-950/90 border border-brand-pink text-xs text-white shadow-lg">
          {actionNotice}
        </div>
      )}

      {/* TAB 1: MATCH FINDER WORKBENCH */}
      {activeTab === 'workbench' && (
        <div className="space-y-6">
          {/* Target Candidate Picker */}
          <div className="glass-card p-6 rounded-3xl border border-purple-800/60 space-y-4">
            <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider">
              Select Verified Candidate to Match
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <select
                value={targetId}
                onChange={(e) => setTargetId(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl bg-purple-950/60 border border-purple-800 text-white text-xs"
              >
                <option value="">-- Choose a verified dancer in Indore --</option>
                {registrations.map((r) => (
                  <option key={r._id} value={r._id}>
                    {r.fullName} ({r.gender}, {r.age}y, {r.location?.area}) - Looking for: {r.partnerPreference}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={() => runMatchingWorkbench(targetId)}
                disabled={!targetId || loading}
                className="px-6 py-3 rounded-xl font-heading font-bold text-xs bg-gradient-to-r from-brand-pink to-brand-gold text-white shadow transition flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                {loading ? 'Analyzing...' : 'Calculate Matches'}
              </button>
            </div>
          </div>

          {/* Active Target Profile Header Card */}
          {targetCandidate && (
            <div className="glass-card p-6 rounded-3xl border border-brand-gold/40 bg-gradient-to-r from-purple-950/50 to-pink-950/40 flex flex-col sm:flex-row items-center justify-between gap-5">
              <div className="flex items-center gap-4">
                <img
                  src={targetCandidate.photos?.[0]?.url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                  alt={targetCandidate.fullName}
                  className="w-16 h-16 rounded-2xl object-cover border border-brand-gold/50 shadow"
                />
                <div>
                  <h2 className="font-heading font-bold text-xl text-white">
                    {targetCandidate.fullName} ({targetCandidate.age} yrs, {targetCandidate.gender})
                  </h2>
                  <div className="text-xs text-gray-300">
                    📍 {targetCandidate.location?.area} • Looking for:{' '}
                    <strong className="text-brand-gold">{targetCandidate.partnerPreference}</strong>
                  </div>
                  <div className="text-[11px] text-purple-300">
                    Styles: {targetCandidate.danceTypes?.join(', ')} • Level: {targetCandidate.danceExperience}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[11px] font-semibold text-gray-400 uppercase">Selected Plan</span>
                <div className="font-heading font-bold text-sm text-white">
                  {targetCandidate.selectedPlan === 'DOUBLE_MATCH' ? 'Double Match (₹299)' : 'Single Match (₹199)'}
                </div>
              </div>
            </div>
          )}

          {/* Scored Candidate Cards Grid */}
          {targetCandidate && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-heading font-bold text-base text-white">
                  Algorithm Suggestions ({suggestions.length} Compatible Dancers)
                </h3>
                <span className="text-xs text-gray-400">
                  Weighted: Age 25% • Area 20% • Pref 20% • Exp 15% • Style 10% • Avail 10%
                </span>
              </div>

              {suggestions.length === 0 ? (
                <div className="glass-card p-10 rounded-2xl text-center text-gray-400 text-xs">
                  No other verified candidates in the queue match this profile's mutual preferences.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {suggestions.map((item) => {
                    const cand = item.candidate;
                    const factors = item.factors;

                    return (
                      <div
                        key={cand._id}
                        className="glass-card p-6 rounded-3xl border border-purple-800/60 space-y-4 hover:border-purple-600 transition"
                      >
                        {/* Top Score Badge */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-heading font-bold bg-amber-500/20 text-brand-gold border border-amber-500/30">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>{item.compatibilityScore}% Compatibility</span>
                          </div>
                          <span className="text-xs text-gray-400">Indore 2026</span>
                        </div>

                        {/* Candidate info */}
                        <div className="flex items-start gap-4">
                          <img
                            src={cand.photos?.[0]?.url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'}
                            alt={cand.fullName}
                            className="w-14 h-14 rounded-2xl object-cover border border-purple-700/50"
                          />
                          <div className="space-y-0.5">
                            <h4 className="font-heading font-bold text-base text-white">
                              {cand.fullName} ({cand.age} yrs)
                            </h4>
                            <div className="text-xs text-gray-300">
                              📍 {cand.location?.area} • {cand.gender}
                            </div>
                            <div className="text-[11px] text-purple-300">
                              Level: {cand.danceExperience}
                            </div>
                          </div>
                        </div>

                        {/* Factors breakdown */}
                        <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-900/40 grid grid-cols-3 gap-2 text-[10px] text-center">
                          <div>
                            <span className="text-gray-400 block">Age Score</span>
                            <span className="font-bold text-brand-pink">{factors.ageScore}%</span>
                          </div>
                          <div>
                            <span className="text-gray-400 block">Area Score</span>
                            <span className="font-bold text-brand-gold">{factors.locationScore}%</span>
                          </div>
                          <div>
                            <span className="text-gray-400 block">Style Score</span>
                            <span className="font-bold text-emerald-400">{factors.danceStyleScore}%</span>
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div className="pt-2 border-t border-purple-900/40 flex items-center justify-between">
                          <Link
                            to={`/admin/registrations/${cand._id}`}
                            className="text-xs text-purple-300 hover:text-white font-medium"
                          >
                            Inspect Candidate &rarr;
                          </Link>

                          {item.isAlreadyMatched ? (
                            <span className="text-xs text-emerald-400 font-semibold">
                              Pairing Exists ({item.existingMatchStatus})
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleCreateMatchSuggestion(cand._id)}
                              className="px-4 py-2 rounded-xl text-xs font-heading font-bold bg-brand-pink hover:bg-pink-600 text-white shadow transition flex items-center gap-1.5"
                            >
                              <Send className="w-3.5 h-3.5" />
                              Suggest Match
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: ALL EXISTING MATCHES & CONSENT MANAGEMENT */}
      {activeTab === 'all' && (
        <div className="space-y-6">
          <div className="glass-card rounded-3xl border border-purple-800/60 overflow-hidden shadow-2xl">
            <div className="p-5 border-b border-purple-900/40 flex items-center justify-between">
              <h3 className="font-heading font-bold text-base text-white">
                All Matches & Consent Statuses
              </h3>
              <button
                type="button"
                onClick={loadAllMatches}
                className="text-xs text-gray-400 hover:text-white flex items-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Refresh
              </button>
            </div>

            <div className="divide-y divide-purple-900/30">
              {existingMatches.length === 0 ? (
                <div className="py-12 text-center text-gray-400 text-xs">
                  No active matches created yet. Use the Match Finder tab to initiate pairings.
                </div>
              ) : (
                existingMatches.map((m) => {
                  const regA = m.registrationA;
                  const regB = m.registrationB;
                  const isBothConsented = m.consentA === true && m.consentB === true;

                  return (
                    <div key={m._id} className="p-6 hover:bg-white/5 transition space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-brand-gold px-2.5 py-1 rounded bg-purple-950 border border-purple-800">
                            {m.compatibilityScore}% Compatibility
                          </span>
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              m.status === 'CONTACT_SHARED'
                                ? 'bg-emerald-500/20 text-emerald-300'
                                : m.status === 'CONSENTED'
                                ? 'bg-brand-pink/20 text-pink-300'
                                : m.status === 'DECLINED'
                                ? 'bg-red-500/20 text-red-300'
                                : 'bg-amber-500/20 text-amber-300'
                            }`}
                          >
                            {m.status}
                          </span>
                        </div>

                        <span className="text-xs text-gray-400">
                          Created {new Date(m.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      {/* Pair Details */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        {/* Candidate A */}
                        <div className="p-3.5 rounded-2xl bg-purple-950/40 border border-purple-800/40 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-white text-sm">
                              {regA?.fullName || 'User A'}
                            </span>
                            <span className="text-gray-400">{regA?.gender} • {regA?.location?.area}</span>
                          </div>
                          <div className="flex items-center justify-between text-[11px]">
                            <span>Consent Status:</span>
                            <span className="font-semibold text-white">
                              {m.consentA === true && '✓ Accepted (Interested)'}
                              {m.consentA === false && '❌ Declined'}
                              {m.consentA === null && '⏳ Awaiting Response'}
                            </span>
                          </div>
                        </div>

                        {/* Candidate B */}
                        <div className="p-3.5 rounded-2xl bg-purple-950/40 border border-purple-800/40 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-white text-sm">
                              {regB?.fullName || 'User B'}
                            </span>
                            <span className="text-gray-400">{regB?.gender} • {regB?.location?.area}</span>
                          </div>
                          <div className="flex items-center justify-between text-[11px]">
                            <span>Consent Status:</span>
                            <span className="font-semibold text-white">
                              {m.consentB === true && '✓ Accepted (Interested)'}
                              {m.consentB === false && '❌ Declined'}
                              {m.consentB === null && '⏳ Awaiting Response'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Contact Coordination action */}
                      <div className="flex items-center justify-between pt-2 border-t border-purple-900/30">
                        <div className="text-xs text-gray-400">
                          {m.contactShared
                            ? '✓ Contact details shared with both dancers'
                            : isBothConsented
                            ? '🎉 Both users consented! Admin can now coordinate contact introduction.'
                            : 'Waiting for dual consent before contact exposure.'}
                        </div>

                        {!m.contactShared && isBothConsented && (
                          <button
                            type="button"
                            onClick={() => handleShareContact(m._id)}
                            className="px-4 py-2 rounded-xl text-xs font-heading font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow transition flex items-center gap-1.5"
                          >
                            <Phone className="w-3.5 h-3.5" />
                            Share Contacts Safely
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
