import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle, Lock, CheckCircle2, Heart, HelpCircle } from 'lucide-react';
import { reportService } from '../services/api';
import { useAuthStore } from '../store/authStore';

export default function Safety() {
  const { isAuthenticated } = useAuthStore();
  const [reason, setReason] = useState('Harassment or inappropriate behavior');
  const [description, setDescription] = useState('');
  const [evidence, setEvidence] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmitReport = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setErrorMessage('Please log in to submit a safety report.');
      return;
    }

    try {
      setSubmitting(true);
      setErrorMessage('');
      await reportService.create({
        reason,
        description,
        evidence,
      });
      setSubmitted(true);
    } catch (err) {
      setErrorMessage(err.message || 'Failed to submit safety report.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 space-y-16">
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="w-16 h-16 rounded-2xl bg-brand-pink/20 text-brand-pink flex items-center justify-center mx-auto mb-2 border border-brand-pink/30">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <span className="text-xs font-bold uppercase tracking-widest text-brand-gold">
          Zero Tolerance • Respect First
        </span>
        <h1 className="font-heading font-black text-3xl sm:text-5xl text-white">
          Community Safety Guidelines
        </h1>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
          Dandiya Jodi by Love Angle ❤️ is exclusively created for finding a Dandiya and Garba dance partner or group. Respect, consent, and safety are non-negotiable.
        </p>
      </div>

      {/* Safety Policy Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6 rounded-2xl border border-purple-800/60 space-y-3">
          <h3 className="font-heading font-bold text-lg text-white flex items-center gap-2">
            <span>💃 Strictly for Dancing</span>
          </h3>
          <p className="text-xs text-gray-300 leading-relaxed">
            This platform is strictly for matching dance partners for Navratri in Indore. It is <strong>NOT</strong> a dating app, hookup site, or social networking forum. Unsolicited flirting, romantic badgering, or inappropriate comments are grounds for an immediate, permanent ban.
          </p>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-purple-800/60 space-y-3">
          <h3 className="font-heading font-bold text-lg text-white flex items-center gap-2">
            <span>🔐 Women's Privacy Safeguards</span>
          </h3>
          <p className="text-xs text-gray-300 leading-relaxed">
            No participant's WhatsApp number, phone, or private contact details are ever exposed publicly. For female participants, contact sharing is strictly <strong>OFF</strong> by default and can only be unlocked with explicit, verified mutual consent.
          </p>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-purple-800/60 space-y-3">
          <h3 className="font-heading font-bold text-lg text-white flex items-center gap-2">
            <span>🛡️ Human Moderation & Verification</span>
          </h3>
          <p className="text-xs text-gray-300 leading-relaxed">
            Every profile photo, full name, and Instagram handle is manually checked by our local Indore team. Accounts with downloaded stock pictures, fake ages, or suspicious credentials are instantly rejected.
          </p>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-purple-800/60 space-y-3">
          <h3 className="font-heading font-bold text-lg text-white flex items-center gap-2">
            <span>🚫 Zero Tolerance for Misconduct</span>
          </h3>
          <p className="text-xs text-gray-300 leading-relaxed">
            Any reported harassment, unconsented contact dissemination, misrepresentation, or intimidation will result in account termination, blacklisting across Love Angle events, and escalation to local authorities where warranted.
          </p>
        </div>
      </div>

      {/* Report Section */}
      <div id="report" className="glass-card rounded-3xl p-8 sm:p-10 border border-red-900/60 space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-red-400">
            <AlertTriangle className="w-5 h-5" />
            <h2 className="font-heading font-bold text-xl text-white">
              Report Misconduct or Safety Violation
            </h2>
          </div>
          <p className="text-xs text-gray-400">
            If any participant behaved inappropriately or violated community safety guidelines, let our team know immediately. All reports are treated with strict confidentiality.
          </p>
        </div>

        {submitted ? (
          <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
            <h4 className="font-heading font-bold text-white text-base">Report Submitted</h4>
            <p className="text-xs text-gray-300">
              Our safety and moderation team has received your report and is investigating the matter with priority.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmitReport} className="space-y-4">
            {errorMessage && (
              <div className="p-3 rounded-xl bg-red-950/80 border border-red-700 text-xs text-red-200">
                {errorMessage}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Reason for Report
              </label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-purple-950/50 border border-purple-800 text-white text-xs"
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
                Description of what occurred
              </label>
              <textarea
                required
                rows="4"
                maxLength="1000"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Provide as much context as possible (dates, venue, messages, names)..."
                className="w-full px-4 py-3 rounded-xl bg-purple-950/50 border border-purple-800 text-white text-xs placeholder-gray-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Evidence Link (Optional)
              </label>
              <input
                type="text"
                value={evidence}
                onChange={(e) => setEvidence(e.target.value)}
                placeholder="Drive link or screenshot URL if applicable"
                className="w-full px-4 py-2.5 rounded-xl bg-purple-950/50 border border-purple-800 text-white text-xs placeholder-gray-500"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="py-3 px-6 rounded-xl font-heading font-bold text-xs bg-red-600 hover:bg-red-500 text-white transition shadow-lg"
            >
              {submitting ? 'Submitting Report...' : 'Submit Incident Report'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
