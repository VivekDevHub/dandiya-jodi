import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle2, MapPin, Heart, Flame, ShieldCheck } from 'lucide-react';

export default function MatchingVisualization() {
  const [activeTab, setActiveTab] = useState(0);

  const demoMatches = [
    {
      name: 'Aanya S.',
      age: 23,
      area: 'Vijay Nagar, Indore',
      danceStyle: 'Dandiya Raas & Garba',
      experience: 'Some Experience',
      availability: '10–12 Oct (Sayaji / Saket)',
      score: '94%',
      tag: 'Top Dance Match',
      gender: 'Female',
    },
    {
      name: 'Kabir M.',
      age: 25,
      area: 'Palasia, Indore',
      danceStyle: 'Garba & Duo Steps',
      experience: 'Good Dancer',
      availability: 'All 9 Nights (Abhivyakti)',
      score: '89%',
      tag: 'Timing Match',
      gender: 'Male',
    },
    {
      name: 'Tanvi R.',
      age: 24,
      area: 'Nipania, Indore',
      danceStyle: 'Dandiya Raas',
      experience: 'Beginner / Casual',
      availability: 'Weekend Nights',
      score: '84%',
      tag: 'Area Match',
      gender: 'Female',
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-12 bg-festival-midnight relative overflow-hidden border-t border-purple-900/30">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-festival-cardSoft border border-festival-border text-festival-gold text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Match Engine Mockup</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white">
            How Compatibility Feels
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            We look at rhythm preferences, favored Indore Garba arenas, and schedule to recommend suitable partners.
          </p>
        </div>

        {/* Visual Mockup Container */}
        <div className="max-w-4xl mx-auto bg-festival-card/90 border border-festival-border rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md space-y-10 relative">
          
          {/* Top Node: You */}
          <div className="flex flex-col items-center">
            <div className="px-5 py-2.5 rounded-full bg-gradient-to-r from-rose-500 to-amber-500 text-white font-heading font-bold text-sm shadow-glow-pink flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
              <span>YOU (Your Profile)</span>
            </div>

            {/* Connecting Flow Indicator */}
            <div className="w-0.5 h-10 bg-gradient-to-b from-festival-pink to-festival-gold my-2" />
            <div className="text-[11px] font-semibold text-slate-400 bg-festival-plum px-3 py-1 rounded-full border border-purple-800">
              Matching Engine Analyzes Dance Style & Area
            </div>
            <div className="w-0.5 h-8 bg-gradient-to-b from-festival-gold to-festival-purple my-2" />
          </div>

          {/* Cards Grid: Potential Verified Matches */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {demoMatches.map((match, i) => (
              <motion.div
                key={match.name}
                whileHover={{ y: -6 }}
                className={`relative rounded-2xl p-5 border transition-all duration-300 ${
                  activeTab === i
                    ? 'bg-festival-plum/90 border-festival-gold shadow-glow-gold'
                    : 'bg-festival-dark/70 border-festival-border/80 hover:border-festival-pink/60'
                }`}
                onClick={() => setActiveTab(i)}
              >
                {/* Score Pill */}
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                    <ShieldCheck className="w-3 h-3" />
                    Verified
                  </span>

                  <span className="text-xs font-bold font-heading text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded-md border border-amber-500/30">
                    {match.score} Rhythm
                  </span>
                </div>

                {/* Profile Identity */}
                <h4 className="text-lg font-heading font-bold text-white flex items-center gap-2">
                  <span>{match.name}</span>
                  <span className="text-xs font-normal text-slate-400">• {match.age} yrs</span>
                </h4>

                <div className="flex items-center gap-1.5 text-xs text-slate-300 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-festival-pink shrink-0" />
                  <span className="truncate">{match.area}</span>
                </div>

                <div className="mt-4 pt-3 border-t border-purple-900/50 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-400">Dance Style:</span>
                    <span className="font-semibold text-white">{match.danceStyle}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-400">Experience:</span>
                    <span className="font-semibold text-amber-200">{match.experience}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-400">Plan:</span>
                    <span className="font-semibold text-pink-300 truncate max-w-[120px]">{match.availability}</span>
                  </div>
                </div>

                {/* Status indicator */}
                <div className="mt-4 pt-2">
                  <div className="w-full py-1.5 rounded-lg bg-festival-border/50 text-[11px] font-semibold text-center text-slate-200">
                    ✨ Potential Dance Partner
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Microcopy disclaimer */}
          <p className="text-center text-xs text-slate-400">
            *Compatibility indicators are based on preferences submitted during registration (dance level, preferred grounds & dates). No personal contact details are shown.
          </p>

        </div>

      </div>
    </section>
  );
}
