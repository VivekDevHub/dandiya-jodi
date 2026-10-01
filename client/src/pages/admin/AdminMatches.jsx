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
  ShieldCheck,
  Check,
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
          <p className="text-xs text-slate-400 mt-1">
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
                ? 'bg-festival-pink text-white shadow'
                : 'text-slate-400 hover:text-white'
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
                ? 'bg-festival-pink text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All Matches ({existingMatches.length})
          </button>
        </div>
      </div>

      {actionNotice && (
        <div className="p-4 rounded-xl bg-purple-950/90 border border-festival-pink text-xs text-white shadow-lg flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* TAB 1: SPLIT-SCREEN WORKBENCH */}
      {activeTab === 'workbench' && (
        <div className="space-y-6">
          {/* Target Candidate Picker */}
          <div className="p-5 rounded-2xl bg-festival-card border border-festival-border space-y-3">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
              Select Verified Candidate to Match
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <select
                value={targetId}
                onChange={(e) => setTargetId(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl bg-festival-plum/70 border border-purple-800 text-white text-xs"
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
                className="px-6 py-3 rounded-xl font-heading font-bold text-xs bg-gradient-to-r from-festival-pink to-amber-500 text-white shadow transition flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{loading ? 'Analyzing...' : 'Calculate Matches'}</span>
              </button>
            </div>
          </div>

          {/* SPLIT-SCREEN WORKSPACE */}
          {targetCandidate ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* LEFT COLUMN: YOUR PARTICIPANT (5 cols) */}
              <div className="lg:col-span-5 p-6 rounded-3xl bg-festival-card border border-festival-gold/50 shadow-luxury space-y-6 sticky top-24">
                <div className="flex items-center justify-between border-b border-purple-900/60 pb-3">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-festival-gold">
                    YOUR PARTICIPANT
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                    <ShieldCheck className="w-3 h-3" />
                    Verified
                  </span>
                </div>

                <div className="flex items-start gap-4">
                  <img
                    src={targetCandidate.photos?.[0]?.url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                    alt={targetCandidate.fullName}
                    className="w-20 h-20 rounded-2xl object-cover border-2 border-festival-gold shadow-md shrink-0"
                  />
                  <div>
                    <h2 className="font-heading font-extrabold text-xl text-white">
                      {targetCandidate.fullName}
                    </h2>
                    <p className="text-xs text-slate-300 mt-0.5">
                      {targetCandidate.age} yrs • {targetCandidate.gender}
                    </p>
                    <p className="text-xs text-amber-300 flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3 text-festival-pink" />
                      {targetCandidate.location?.area}
                    </p>
                  </div>
                </div>

                {/* Participant Details */}
                <div className="space-y-3 pt-2 text-xs border-t border-purple-900/60">
                  <div>
                    <span className="text-slate-400 block mb-1">Dance Style:</span>
                    <span className="font-semibold text-white">
                      {targetCandidate.danceTypes?.join(', ') || 'Dandiya Raas'}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 block mb-1">Experience Level:</span>
                    <span className="font-semibold text-amber-200">
                      {targetCandidate.danceExperience}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 block mb-1">Availability:</span>
                    <span className="font-semibold text-pink-300">
                      {targetCandidate.availability?.join(', ') || '10–12 Oct (Almost All Days)'}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 block mb-1">Preferred Partner:</span>
                    <span className="font-semibold text-emerald-300">
                      {targetCandidate.partnerPreference} (Ages {targetCandidate.preferredAgeRange?.min || 18}–{targetCandidate.preferredAgeRange?.max || 30})
                    </span>
                  </div>

                  <div className="pt-2">
                    <span className="text-slate-400 block mb-1">Pass Plan:</span>
                    <span className="font-heading font-bold text-sm text-white">
                      {targetCandidate.selectedPlan === 'DOUBLE_MATCH' ? 'Double Match (₹299)' : 'Single Match (₹199)'}
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    to={`/admin/registrations/${targetCandidate._id}`}
                    className="w-full py-2.5 rounded-xl bg-festival-plum hover:bg-festival-border border border-purple-800 text-xs font-semibold text-slate-200 text-center block transition"
                  >
                    View Full Profile Details &rarr;
                  </Link>
                </div>
              </div>

              {/* RIGHT COLUMN: POTENTIAL MATCHES (7 cols) */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-slate-300">
                    POTENTIAL MATCHES ({suggestions.length})
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Rhythm & Area Compatibility Indicators
                  </span>
                </div>

                {suggestions.length === 0 ? (
                  <div className="p-10 rounded-2xl bg-festival-card border border-festival-border text-center text-slate-400 text-xs">
                    ✨ We're still looking for the right rhythm. No other verified participants in the queue match this profile's exact mutual preferences.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {suggestions.map((item) => {
                      const cand = item.candidate;
                      const factors = item.factors;

                      return (
                        <div
                          key={cand._id}
                          className="p-5 rounded-2xl bg-festival-card border border-festival-border hover:border-festival-pink/60 transition-all space-y-4"
                        >
                          {/* Score Header */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-heading font-bold bg-amber-950 text-amber-300 border border-amber-500/30">
                              <Sparkles className="w-3.5 h-3.5 text-festival-gold" />
                              <span>{item.compatibilityScore}% Compatibility</span>
                            </div>
                            <span className="text-[11px] text-slate-400">
                              Indore Navratri 2026
                            </span>
                          </div>

                          {/* Candidate Identity */}
                          <div className="flex items-start gap-4">
                            <img
                              src={cand.photos?.[0]?.url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'}
                              alt={cand.fullName}
                              className="w-14 h-14 rounded-2xl object-cover border border-purple-700/50 shrink-0"
                            />
                            <div className="space-y-0.5">
                              <h4 className="font-heading font-bold text-base text-white">
                                {cand.fullName} • {cand.age} yrs
                              </h4>
                              <p className="text-xs text-slate-300">
                                📍 {cand.location?.area} • {cand.gender}
                              </p>
                              <p className="text-[11px] text-purple-300">
                                Style: {cand.danceTypes?.join(', ')} • {cand.danceExperience}
                              </p>
                            </div>
                          </div>

                          {/* Compatibility Indicators Matrix */}
                          <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-festival-plum/60 border border-purple-900/50 text-[10px] text-center">
                            <div>
                              <span className="text-slate-400 block">Age Score</span>
                              <span className="font-bold text-festival-pink">{factors.ageScore}%</span>
                            </div>
                            <div>
                              <span className="text-slate-400 block">Area Score</span>
                              <span className="font-bold text-festival-gold">{factors.locationScore}%</span>
                            </div>
                            <div>
                              <span className="text-slate-400 block">Dance Style</span>
                              <span className="font-bold text-emerald-400">{factors.danceStyleScore}%</span>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="pt-2 border-t border-purple-900/40 flex items-center justify-between">
                            <Link
                              to={`/admin/registrations/${cand._id}`}
                              className="text-xs text-purple-300 hover:text-white font-medium"
                            >
                              Inspect Candidate &rarr;
                            </Link>

                            {item.isAlreadyMatched ? (
                              <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                                <Check className="w-3.5 h-3.5" />
                                <span>Pairing Suggested ({item.existingMatchStatus})</span>
                              </span>
                            ) : (
                              <button
                                type="button"
                                onClick={() => handleCreateMatchSuggestion(cand._id)}
                                className="px-5 py-2 rounded-xl text-xs font-heading font-bold bg-gradient-to-r from-festival-pink to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white shadow-glow-pink transition flex items-center gap-1.5"
                              >
                                <Send className="w-3.5 h-3.5" />
                                <span>Suggest Match</span>
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

            </div>
          ) : (
            <div className="p-12 rounded-3xl bg-festival-card border border-festival-border text-center space-y-3">
              <span className="text-4xl">💃🕺</span>
              <h3 className="font-heading font-bold text-lg text-white">
                Select a participant above to start matchmaking
              </h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Choose any verified dancer in Indore to view their profile side-by-side with algorithmic partner recommendations.
              </p>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: ALL EXISTING MATCHES & CONSENT MANAGEMENT */}
      {activeTab === 'all' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-base text-white">
              All Active Match Pairs & Consent Status ({existingMatches.length})
            </h3>
            <button
              onClick={loadAllMatches}
              className="text-xs text-festival-gold flex items-center gap-1 hover:underline"
            >
              <RefreshCw className="w-3 h-3" /> Refresh
            </button>
          </div>

          {existingMatches.length === 0 ? (
            <div className="p-12 rounded-3xl bg-festival-card border border-festival-border text-center text-slate-400 text-xs">
              No match suggestions created yet. Use the Match Finder tab to initiate pairings.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {existingMatches.map((m) => {
                const regA = m.registrationAId;
                const regB = m.registrationBId;
                const isBothAccepted = m.consentA === 'ACCEPTED' && m.consentB === 'ACCEPTED';

                return (
                  <div
                    key={m._id}
                    className="p-6 rounded-3xl bg-festival-card border border-festival-border space-y-4"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-purple-900/40 pb-3">
                      <div className="flex items-center gap-1.5">
                        <Heart className="w-4 h-4 text-festival-pink fill-festival-pink" />
                        <span className="font-heading font-bold text-sm text-white">
                          Pair ID: {m._id.slice(-6)}
                        </span>
                      </div>
                      <span
                        className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border ${
                          isBothAccepted
                            ? 'bg-emerald-950 text-emerald-300 border-emerald-500/40'
                            : 'bg-amber-950 text-amber-300 border-amber-500/40'
                        }`}
                      >
                        {m.status}
                      </span>
                    </div>

                    {/* Both Candidates Side by Side */}
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="p-3 rounded-xl bg-festival-plum/60 border border-purple-900 space-y-1">
                        <div className="font-bold text-white truncate">{regA?.fullName}</div>
                        <div className="text-[11px] text-slate-400">{regA?.gender} • {regA?.age}y</div>
                        <div className="text-[10px] text-amber-300 truncate">📍 {regA?.location?.area}</div>
                        <div className="pt-1 text-[10px] font-semibold text-slate-300">
                          Consent: <span className={m.consentA === 'ACCEPTED' ? 'text-emerald-400' : 'text-amber-400'}>{m.consentA}</span>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-festival-plum/60 border border-purple-900 space-y-1">
                        <div className="font-bold text-white truncate">{regB?.fullName}</div>
                        <div className="text-[11px] text-slate-400">{regB?.gender} • {regB?.age}y</div>
                        <div className="text-[10px] text-amber-300 truncate">📍 {regB?.location?.area}</div>
                        <div className="pt-1 text-[10px] font-semibold text-slate-300">
                          Consent: <span className={m.consentB === 'ACCEPTED' ? 'text-emerald-400' : 'text-amber-400'}>{m.consentB}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action & Contact Sharing */}
                    <div className="pt-2 border-t border-purple-900/40 flex items-center justify-between text-xs">
                      <span className="text-slate-400 text-[11px]">
                        Compatibility: <strong className="text-festival-gold">{m.compatibilityScore}%</strong>
                      </span>

                      {isBothAccepted && !m.contactShared ? (
                        <button
                          type="button"
                          onClick={() => handleShareContact(m._id)}
                          className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 shadow"
                        >
                          <Phone className="w-3 h-3" />
                          <span>Release Contacts</span>
                        </button>
                      ) : m.contactShared ? (
                        <span className="text-emerald-400 font-semibold text-[11px] flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Contacts Shared
                        </span>
                      ) : (
                        <span className="text-slate-500 text-[11px]">
                          Awaiting Mutual Consent
                        </span>
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
  );
}
