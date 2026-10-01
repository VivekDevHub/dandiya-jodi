import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Heart } from 'lucide-react';
import { festivalImages } from '../../config/images';

export default function FinalCTA() {
  return (
    <section className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-12 overflow-hidden">
      {/* Background Image with Dark Vignette */}
      <div className="absolute inset-0 -z-10">
        <img
          src={festivalImages.crowd}
          alt="Indore Navratri Garba arena night crowd"
          className="w-full h-full object-cover object-center filter brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-festival-dark via-festival-dark/85 to-festival-dark/70" />
      </div>

      {/* Decorative Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-festival-pink/30 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
        
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-festival-cardSoft/90 border border-festival-border backdrop-blur-md text-festival-gold text-xs font-bold uppercase tracking-widest shadow-lg">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Indore Navratri 2026</span>
          <Sparkles className="w-3.5 h-3.5" />
        </div>

        {/* Big Bold Headline */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-heading font-black text-white tracking-tight leading-[1.15]">
          Ready to find your <br />
          <span className="bg-gradient-to-r from-amber-300 via-pink-400 to-festival-pink bg-clip-text text-transparent">
            Dandiya Jodi?
          </span>
        </h2>

        {/* Subtext */}
        <p className="text-slate-200 text-base sm:text-xl font-normal max-w-2xl mx-auto leading-relaxed">
          This Navratri, don't just watch the Garba. Be part of it. 💃🕺 <br />
          Find someone who matches your rhythm before registrations close.
        </p>

        {/* Massive Glowing CTA */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/register"
            className="px-10 py-5 rounded-full bg-gradient-to-r from-rose-600 via-festival-pink to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-heading font-black text-lg sm:text-xl shadow-glow-pink hover:shadow-glow-gold hover:-translate-y-1 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-3 group"
          >
            <span>FIND MY JODI</span>
            <Heart className="w-6 h-6 fill-white text-white group-hover:scale-125 transition-transform" />
          </Link>
        </div>

        {/* Reassurance */}
        <p className="text-xs sm:text-sm text-slate-400">
          Takes under 2 minutes • Verified Indore Profiles • 100% Consent-Based
        </p>

      </div>
    </section>
  );
}
