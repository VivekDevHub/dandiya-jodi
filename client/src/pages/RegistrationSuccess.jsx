import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle, Sparkles, ArrowRight, ShieldCheck, Heart, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAuthStore } from '../store/authStore';

export default function RegistrationSuccess() {
  const [searchParams] = useSearchParams();
  const registrationId = searchParams.get('id') || 'DJ-2026-ACTIVE';
  const statusParam = searchParams.get('status') || 'review';
  const { registration } = useAuthStore();

  useEffect(() => {
    // Launch festive confetti celebration
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#db2777', '#eab308', '#a855f7', '#f97316'],
      });
    } catch (e) {
      // Ignore in non-browser env
    }
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 sm:py-24 text-center">
      <div className="glass-card rounded-3xl p-8 sm:p-12 border border-purple-800/60 shadow-2xl relative space-y-6">
        {/* Celebration Icon */}
        <div className="w-20 h-20 bg-gradient-to-tr from-brand-pink via-purple-600 to-amber-500 rounded-full flex items-center justify-center mx-auto text-4xl shadow-xl shadow-pink-500/25 animate-bounce">
          🎉
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
            Navratri 2026 • Indore
          </span>
          <h1 className="font-heading font-black text-3xl sm:text-4xl text-white">
            You're In!
          </h1>
          <p className="text-gray-300 text-sm sm:text-base">
            Thank you for registering with <strong className="text-white">Dandiya Jodi by Love Angle ❤️</strong>
          </p>
        </div>

        {/* Registration Card */}
        <div className="p-6 rounded-2xl bg-purple-950/40 border border-purple-800/60 text-left space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-purple-900/40 pb-3">
            <div>
              <span className="text-[11px] font-semibold text-gray-400 uppercase">Registration ID</span>
              <div className="font-mono font-bold text-xl text-brand-gold">
                {registration?.registrationId || registrationId}
              </div>
            </div>
            <div>
              <span className="text-[11px] font-semibold text-gray-400 uppercase">Selected Plan</span>
              <div className="font-heading font-bold text-sm text-white">
                {registration?.selectedPlan === 'DOUBLE_MATCH' ? 'Double Match (₹299)' : 'Single Match (₹199)'}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-gray-400 block mb-0.5">Profile Status</span>
              <span className="inline-flex items-center gap-1 text-amber-300 font-semibold">
                <Clock className="w-3.5 h-3.5" />
                Under Verification
              </span>
            </div>
            <div>
              <span className="text-gray-400 block mb-0.5">Payment Status</span>
              <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
                <CheckCircle className="w-3.5 h-3.5" />
                {statusParam === 'paid' ? 'Payment Verified' : 'Verification In Progress'}
              </span>
            </div>
          </div>
        </div>

        {/* Next Steps explanation */}
        <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-900/40 text-xs text-purple-200/90 leading-relaxed text-left flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
          <div>
            <strong>What happens next?</strong> Our Indore verification team will review your profile photos and Instagram details. Once verified, our matching engine will identify compatible Dandiya partners and notify you on your dashboard.
          </div>
        </div>

        {/* Dashboard CTA */}
        <div className="pt-2">
          <Link
            to="/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl font-heading font-bold text-sm text-white bg-gradient-to-r from-brand-pink via-purple-600 to-amber-500 shadow-xl shadow-pink-500/20 hover:opacity-95 transition"
          >
            <span>Go to My Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
