import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle2, Sparkles, ArrowRight, ShieldCheck, Heart, Clock, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAuthStore } from '../store/authStore';

export default function RegistrationSuccess() {
  const [searchParams] = useSearchParams();
  const registrationId = searchParams.get('id') || 'DJ-2026-00124';
  const statusParam = searchParams.get('status') || 'review';
  const { registration } = useAuthStore();

  useEffect(() => {
    // Festive celebration confetti
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.55 },
        colors: ['#db2777', '#facc15', '#a855f7', '#f97316', '#e11d48'],
      });
      // Second burst
      setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
        });
        confetti({
          particleCount: 60,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
        });
      }, 400);
    } catch (e) {
      // Ignore in non-browser env
    }
  }, []);

  const timelineSteps = [
    { label: 'Registration', status: 'done' },
    { label: 'Payment', status: statusParam === 'paid' ? 'done' : 'current' },
    { label: 'Verification', status: statusParam === 'paid' ? 'current' : 'pending' },
    { label: 'Matching', status: 'pending' },
    { label: 'Introduction', status: 'pending' },
  ];

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-16 sm:py-24 bg-festival-dark text-slate-100">
      <div className="max-w-xl w-full mx-auto bg-festival-card/90 border border-festival-border rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md text-center space-y-7 relative overflow-hidden">
        
        {/* Glow backdrop */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-festival-pink/20 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Celebration Header */}
        <div className="space-y-3">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-festival-pink via-purple-600 to-festival-gold flex items-center justify-center text-4xl shadow-glow-pink animate-bounce">
            🎉
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-festival-plum border border-festival-border text-festival-gold text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Indore Navratri 2026</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-heading font-black text-white">
            YOU'RE IN!
          </h1>

          <p className="text-slate-300 text-base">
            Your Dandiya journey starts here. ❤️
          </p>
        </div>

        {/* Registration ID Badge */}
        <div className="p-5 rounded-2xl bg-festival-plum/80 border border-purple-800/60 text-center space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            Registration ID
          </span>
          <div className="font-mono font-black text-2xl sm:text-3xl bg-gradient-to-r from-amber-300 via-yellow-200 to-white bg-clip-text text-transparent tracking-wider">
            {registration?.registrationId || registrationId}
          </div>
          <p className="text-xs text-slate-400">
            Keep this ID safe for tracking your matching status.
          </p>
        </div>

        {/* Status Timeline */}
        <div className="py-2 space-y-3 text-left">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider text-center">
            Journey Status Timeline
          </h4>

          <div className="grid grid-cols-5 gap-2 text-center text-[10px] sm:text-xs">
            {timelineSteps.map((step, idx) => {
              const isDone = step.status === 'done';
              const isCurrent = step.status === 'current';
              return (
                <div key={step.label} className="space-y-1.5">
                  <div
                    className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center font-bold transition-all ${
                      isDone
                        ? 'bg-emerald-500 text-white shadow-sm'
                        : isCurrent
                        ? 'bg-festival-gold text-festival-dark animate-pulse shadow-glow-gold'
                        : 'bg-festival-plum/80 text-slate-500 border border-purple-900'
                    }`}
                  >
                    {isDone ? <Check className="w-4 h-4 stroke-[3]" /> : isCurrent ? '●' : '○'}
                  </div>
                  <span
                    className={`block leading-tight font-medium ${
                      isDone
                        ? 'text-emerald-400'
                        : isCurrent
                        ? 'text-amber-300 font-bold'
                        : 'text-slate-500'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Reassurance Notice */}
        <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/40 text-xs text-purple-200 text-left flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-festival-gold shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Next step:</strong> Our Indore team will verify your photos and Instagram handle. Once confirmed, you will see your recommended dance partner matches on your dashboard.
          </p>
        </div>

        {/* Action Button */}
        <div>
          <Link
            to="/dashboard"
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-600 via-festival-pink to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-heading font-black text-base shadow-glow-pink hover:shadow-glow-gold transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            <span>View My Registration</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </div>
  );
}
