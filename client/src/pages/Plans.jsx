import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Sparkles, Shield, Heart, HelpCircle, ArrowRight } from 'lucide-react';

export default function Plans() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 space-y-16">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-pink">
          Transparent Festival Pricing
        </span>
        <h1 className="font-heading font-black text-3xl sm:text-5xl text-white">
          Navratri 2026 Matchmaking Plans
        </h1>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
          Affordable, one-time festival passes covering manual background verification, algorithmic compatibility matching, and personal team coordination in Indore.
        </p>
      </div>

      {/* Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Single Match */}
        <div className="glass-card rounded-3xl p-8 border border-purple-800/60 flex flex-col justify-between space-y-8 hover:border-purple-600 transition">
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold uppercase text-purple-300 tracking-wider">
                Basic Festival Pass
              </span>
              <h3 className="font-heading font-black text-2xl text-white mt-1">
                🕺 SINGLE MATCH
              </h3>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-black font-heading text-white">₹199</span>
              <span className="text-xs text-gray-400">/ one-time registration</span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              Ideal if you are looking for one verified Dandiya partner for a specific event night or club in Indore.
            </p>
            <div className="border-t border-purple-900/40 pt-4 space-y-3 text-sm text-gray-300">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>1 Dandiya partner match</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Profile & Instagram verification</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Compatibility matching engine</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Safe team coordination</span>
              </div>
            </div>
          </div>

          <Link
            to="/register?plan=SINGLE_MATCH"
            className="block text-center py-4 px-6 rounded-2xl font-heading font-bold text-sm bg-purple-900/60 hover:bg-purple-800 text-white border border-purple-600/50 shadow transition"
          >
            Choose Single Match
          </Link>
        </div>

        {/* Double Match */}
        <div className="glass-card rounded-3xl p-8 border-2 border-brand-pink relative flex flex-col justify-between space-y-8 shadow-2xl shadow-pink-900/30">
          <div className="absolute -top-3.5 right-6 px-3.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-gradient-to-r from-brand-pink to-brand-gold text-white shadow-md">
            Most Popular
          </div>
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold uppercase text-pink-300 tracking-wider">
                Recommended Festival Pass
              </span>
              <h3 className="font-heading font-black text-2xl text-white mt-1 flex items-center gap-2">
                <span>🕺 DOUBLE MATCH</span>
                <Sparkles className="w-5 h-5 text-brand-gold" />
              </h3>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-black font-heading text-white">₹299</span>
              <span className="text-xs text-gray-400">/ one-time registration</span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              Provides maximum flexibility across multiple festival dates, allowing our team to coordinate up to 2 matches.
            </p>
            <div className="border-t border-purple-900/40 pt-4 space-y-3 text-sm text-gray-300">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-white font-medium">Up to 2 Dandiya partner matches</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Multi-day schedule flexibility</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Profile & Instagram verification</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Priority matchmaking queue</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Safe team coordination</span>
              </div>
            </div>
          </div>

          <Link
            to="/register?plan=DOUBLE_MATCH"
            className="block text-center py-4 px-6 rounded-2xl font-heading font-bold text-sm bg-gradient-to-r from-brand-pink via-purple-600 to-amber-500 hover:opacity-95 text-white shadow-lg transition"
          >
            Choose Double Match
          </Link>
        </div>
      </div>

      {/* Trust & Refund FAQs */}
      <div className="glass-card rounded-3xl p-8 border border-purple-800/50 space-y-4">
        <h3 className="font-heading font-bold text-lg text-white">
          Payment & Match Guarantees
        </h3>
        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
          Please note that registration covers human verification and matchmaking coordination. Registration does not guarantee an identical mutual match as matching is strictly consent-driven and depends on mutual dancer availability.
        </p>
        <Link to="/refund-policy" className="inline-block text-xs font-semibold text-brand-gold hover:text-white underline">
          Read our transparent Refund Policy &rarr;
        </Link>
      </div>
    </div>
  );
}
