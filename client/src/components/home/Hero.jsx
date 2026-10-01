import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Shield, MapPin, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { festivalImages } from '../../config/images';
import ImageCard from '../common/ImageCard';

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-12 overflow-hidden bg-festival-dark">
      {/* Cinematic Ambient Glows */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-festival-purple/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-festival-pink/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-festival-gold/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Floating golden festival dust particles */}
      <div className="absolute inset-0 pointer-events-none opacity-40 overflow-hidden">
        <span className="absolute top-16 left-1/4 text-festival-gold animate-float-slow text-sm">✨</span>
        <span className="absolute top-40 right-1/4 text-festival-warmGold animate-float-reverse text-xs">✦</span>
        <span className="absolute bottom-28 left-16 text-festival-pink animate-float-slow text-base">★</span>
        <span className="absolute top-2/3 right-20 text-festival-gold animate-float-slow text-sm">✨</span>
      </div>

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* Left Column: Headline & Action */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left"
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-festival-cardSoft border border-festival-border/80 backdrop-blur-md shadow-inner text-xs sm:text-sm font-semibold tracking-wide">
            <span className="text-festival-gold">✨</span>
            <span className="bg-gradient-to-r from-amber-300 via-pink-400 to-festival-pink bg-clip-text text-transparent uppercase tracking-wider">
              Indore • Navratri 2026
            </span>
            <span className="text-festival-pink">✦</span>
          </div>

          {/* Main Headline */}
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight text-white leading-[1.1]">
              FIND YOUR <br />
              <span className="bg-gradient-to-r from-yellow-300 via-pink-500 to-rose-400 bg-clip-text text-transparent drop-shadow-sm">
                DANDIYA JODI
              </span>
            </h2>
          </div>

          {/* Subtext */}
          <p className="text-slate-300 text-base sm:text-lg md:text-xl font-normal max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Don't come alone this Navratri. Find someone who matches your rhythm, dance style, and festival energy in Indore. 💃🕺
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-rose-600 via-festival-pink to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-heading font-bold text-base sm:text-lg shadow-glow-pink hover:shadow-glow-gold hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-3 group"
            >
              <span>Find My Dandiya Jodi</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </Link>

            <a
              href="#how-it-works"
              className="w-full sm:w-auto px-7 py-4 rounded-full bg-festival-cardSoft/90 hover:bg-festival-border/50 border border-festival-border text-slate-200 hover:text-white font-heading font-semibold text-base backdrop-blur-sm transition-all duration-300 flex items-center justify-center gap-2 hover:-translate-y-0.5"
            >
              <span>See How It Works</span>
            </a>
          </div>

          {/* Trust Highlights */}
          <div className="pt-4 border-t border-purple-900/40 grid grid-cols-3 gap-3 text-center sm:text-left max-w-lg mx-auto lg:mx-0">
            <div className="space-y-1">
              <div className="flex items-center justify-center sm:justify-start gap-1.5 text-festival-gold text-xs font-semibold">
                <MapPin className="w-3.5 h-3.5" />
                <span>Indore Hubs</span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-400">Saket • Abhivyakti</p>
            </div>

            <div className="space-y-1 border-x border-purple-900/40 px-2">
              <div className="flex items-center justify-center sm:justify-start gap-1.5 text-festival-pink text-xs font-semibold">
                <Shield className="w-3.5 h-3.5" />
                <span>Verified Only</span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-400">100% Screened</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-center sm:justify-start gap-1.5 text-emerald-400 text-xs font-semibold">
                <Heart className="w-3.5 h-3.5 fill-emerald-400/20" />
                <span>Consent First</span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-400">Safe & Shielded</p>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Hero Image Composition */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="lg:col-span-5 relative"
        >
          {/* Ambient Glow behind frame */}
          <div className="absolute -inset-4 bg-gradient-to-r from-festival-pink/30 via-festival-gold/20 to-purple-600/30 rounded-3xl blur-2xl -z-10 animate-pulse-slow" />

          {/* Decorated Frame Container */}
          <div className="relative rounded-3xl p-2 bg-gradient-to-b from-festival-gold/40 via-festival-pink/30 to-festival-border/50 shadow-2xl backdrop-blur-sm group">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-festival-plum">
              {/* Scalable Couple Image */}
              <img
                src={festivalImages.hero}
                alt="Young couple dancing Dandiya in Indore during Navratri 2026"
                className="w-full h-full object-cover object-top transition-transform duration-1000 ease-out group-hover:scale-105"
              />

              {/* Gradient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-festival-dark via-festival-dark/20 to-transparent pointer-events-none" />

              {/* Floating Bottom Card Over Image */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-festival-dark/85 border border-festival-border/80 backdrop-blur-md shadow-lg flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                    <Sparkles className="w-3.5 h-3.5 text-festival-gold" />
                    <span>Dandiya Raas & Garba</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Find someone who loves dancing as much as you do.
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-festival-pink to-festival-gold flex items-center justify-center text-white text-lg shadow-md shrink-0">
                  💃
                </div>
              </div>
            </div>

            {/* Corner Decorative Accent */}
            <div className="absolute -top-3 -right-3 px-3 py-1 rounded-full bg-festival-gold text-festival-dark text-[11px] font-extrabold uppercase tracking-wider shadow-lg flex items-center gap-1">
              <span>★</span> Verified Couples & Groups
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
