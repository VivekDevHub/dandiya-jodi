import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Sparkles, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import { festivalImages } from '../../config/images';

export default function RhythmMatchDark() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-12 bg-festival-dark relative overflow-hidden">
      {/* Deep purple and pink glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-900/35 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-festival-pink/20 rounded-full blur-[140px] pointer-events-none" />

      {/* Floating Sparkles */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <span className="absolute top-20 left-1/3 text-festival-gold text-lg animate-float-slow">✨</span>
        <span className="absolute bottom-20 right-1/3 text-festival-warmGold text-sm animate-float-reverse">✦</span>
        <span className="absolute top-1/2 left-10 text-festival-pink text-xs animate-float-slow">★</span>
      </div>

      <div className="max-w-5xl mx-auto space-y-12 relative z-10 text-center">
        
        {/* Headline */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-festival-cardSoft border border-festival-border text-festival-gold text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Connection & Rhythm</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-white">
            Your rhythm deserves the <span className="bg-gradient-to-r from-amber-300 via-pink-400 to-festival-pink bg-clip-text text-transparent">right Jodi</span>.
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Pair up with dancers who match your tempo, energy, and love for Navratri traditions in Indore.
          </p>
        </div>

        {/* Floating Cards with Pulsing Heart in Center */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 pt-4">
          
          {/* Card 1: Floating Left */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-full max-w-[280px] bg-festival-card/90 border border-purple-500/40 rounded-2xl p-4 text-left shadow-2xl backdrop-blur-md space-y-3"
          >
            <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-festival-plum">
              <img
                src={festivalImages.women}
                alt="Navratri Dancer"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute top-2 left-2 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-2.5 h-2.5" /> Verified
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <h4 className="font-heading font-bold text-white text-base">Meera • 23</h4>
                <span className="text-xs text-amber-300 font-semibold">95% Match</span>
              </div>
              <p className="text-xs text-slate-300 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-festival-pink" /> Vijay Nagar
              </p>
              <div className="mt-2 flex flex-wrap gap-1">
                <span className="text-[10px] px-2 py-0.5 rounded bg-festival-plum text-pink-200">Garba Raas</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-festival-plum text-amber-200">Intermediate</span>
              </div>
            </div>
          </motion.div>

          {/* Central Pulsing Heart Node */}
          <div className="relative flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.25, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="w-16 h-16 rounded-full bg-gradient-to-tr from-rose-600 via-festival-pink to-amber-400 flex items-center justify-center text-white shadow-glow-pink z-10"
            >
              <Heart className="w-8 h-8 fill-white" />
            </motion.div>
            <div className="absolute w-24 h-24 rounded-full bg-festival-pink/30 blur-xl animate-pulse" />
          </div>

          {/* Card 2: Floating Right */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-full max-w-[280px] bg-festival-card/90 border border-amber-500/40 rounded-2xl p-4 text-left shadow-2xl backdrop-blur-md space-y-3"
          >
            <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-festival-plum">
              <img
                src={festivalImages.men}
                alt="Navratri Dancer"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute top-2 left-2 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-2.5 h-2.5" /> Verified
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <h4 className="font-heading font-bold text-white text-base">Rohan • 25</h4>
                <span className="text-xs text-amber-300 font-semibold">92% Match</span>
              </div>
              <p className="text-xs text-slate-300 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-festival-pink" /> Palasia
              </p>
              <div className="mt-2 flex flex-wrap gap-1">
                <span className="text-[10px] px-2 py-0.5 rounded bg-festival-plum text-pink-200">Dandiya Duo</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-festival-plum text-amber-200">Advanced</span>
              </div>
            </div>
          </motion.div>

        </div>

        {/* CTA */}
        <div className="pt-6">
          <Link
            to="/register"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-festival-pink via-rose-600 to-amber-500 text-white font-heading font-bold text-base shadow-glow-pink hover:shadow-glow-gold hover:-translate-y-0.5 transition-all duration-300 group"
          >
            <span>Start Matching</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}
