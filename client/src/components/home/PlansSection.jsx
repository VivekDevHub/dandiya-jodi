import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Check, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export default function PlansSection() {
  return (
    <section id="plans" className="py-24 px-4 sm:px-6 lg:px-12 bg-festival-dark relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-festival-purple/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-festival-pink/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-16 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-festival-cardSoft border border-festival-border text-festival-gold text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Festival Passes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white">
            Choose Your Dandiya Plan
          </h2>
          <p className="text-slate-300 text-base">
            Affordable, transparent, and dedicated to finding you verified dance companions for Indore Navratri 2026.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-4xl mx-auto">
          
          {/* Plan 1: Single Match */}
          <div className="relative bg-festival-card/90 border border-festival-border/80 rounded-3xl p-8 backdrop-blur-md flex flex-col justify-between hover:border-festival-pink/60 transition-all duration-300 hover:shadow-card-elevated">
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-extrabold tracking-wider uppercase text-slate-400">
                  Standard Pass
                </span>
                <h3 className="text-2xl font-heading font-extrabold text-white">
                  SINGLE MATCH
                </h3>
                <p className="text-sm text-slate-300">
                  Find 1 suitable Dandiya partner for your favorite festival nights.
                </p>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2 pt-2 border-t border-purple-900/40">
                <span className="text-4xl sm:text-5xl font-heading font-black text-white">
                  ₹199
                </span>
                <span className="text-xs text-slate-400 font-medium">/ Navratri 2026</span>
              </div>

              {/* Features List */}
              <ul className="space-y-3.5 text-sm text-slate-200">
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Manual profile & safety verification</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Dedicated matching assistance</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>1 potential partner match coordination</span>
                </li>
                <li className="flex items-center gap-3 text-slate-400">
                  <div className="w-5 h-5 rounded-full bg-purple-950/40 border border-purple-800 text-slate-500 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Access to verified community group</span>
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <Link
                to="/register?plan=single"
                className="w-full py-4 rounded-xl bg-festival-plum hover:bg-festival-border border border-festival-border hover:border-festival-pink text-white font-heading font-bold text-center block transition-all duration-300"
              >
                Choose Single
              </Link>
            </div>
          </div>

          {/* Plan 2: Double Match (Featured with Luxury treatment) */}
          <div className="relative bg-gradient-to-b from-festival-card via-festival-plum to-festival-card border-2 border-festival-gold/80 rounded-3xl p-8 backdrop-blur-md flex flex-col justify-between shadow-glow-gold hover:shadow-glow-pink transition-all duration-300">
            {/* Top Ribbon Badge */}
            <div className="absolute -top-3.5 right-6 px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-400 to-festival-gold text-festival-dark text-xs font-black uppercase tracking-wider shadow-lg flex items-center gap-1.5">
              <Zap className="w-3 h-3 fill-festival-dark" />
              <span>MORE OPTIONS</span>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-extrabold tracking-wider uppercase text-festival-gold">
                  Most Flexible
                </span>
                <h3 className="text-2xl font-heading font-extrabold text-white flex items-center gap-2">
                  <span>DOUBLE MATCH</span>
                  <span className="text-sm">✨</span>
                </h3>
                <p className="text-sm text-slate-300">
                  More flexibility across multiple venues or festival dates.
                </p>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2 pt-2 border-t border-purple-900/40">
                <span className="text-4xl sm:text-5xl font-heading font-black bg-gradient-to-r from-yellow-300 via-amber-200 to-white bg-clip-text text-transparent">
                  ₹299
                </span>
                <span className="text-xs text-slate-400 font-medium">/ Navratri 2026</span>
              </div>

              {/* Features List */}
              <ul className="space-y-3.5 text-sm text-slate-100">
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-festival-gold/20 border border-festival-gold text-festival-gold flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span><strong>Priority</strong> human verification</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-festival-gold/20 border border-festival-gold text-festival-gold flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Dedicated matching assistance</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-festival-gold/20 border border-festival-gold text-festival-gold flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span><strong>Up to 2 potential matches</strong> for different nights</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-festival-gold/20 border border-festival-gold text-festival-gold flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Venue flexibility (Saket / Abhivyakti / Sayaji)</span>
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <Link
                to="/register?plan=double"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-festival-pink via-rose-600 to-amber-500 hover:from-festival-pink hover:to-amber-400 text-white font-heading font-bold text-center block shadow-glow-pink transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                <span>Choose Double</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
