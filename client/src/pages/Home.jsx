import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ShieldCheck,
  Heart,
  Users,
  CheckCircle2,
  Lock,
  ArrowRight,
  Music,
  MapPin,
  Clock,
  HelpCircle,
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const steps = [
    {
      step: '01',
      title: 'Register Profile',
      desc: 'Fill out your genuine details, dance style, Indore area, and upload your profile photos.',
      icon: '📝',
    },
    {
      step: '02',
      title: 'Human Verification',
      desc: 'Our Indore moderation team manually reviews your profile & Instagram to maintain safety and authenticity.',
      icon: '🛡️',
    },
    {
      step: '03',
      title: 'Smart Matching',
      desc: 'Our engine identifies compatible partners based on dance level, age, area, and festival dates.',
      icon: '💃🕺',
    },
    {
      step: '04',
      title: 'Consent & Introduction',
      desc: 'No personal contacts are exposed. Only when both dancers express mutual interest do we coordinate introductions safely.',
      icon: '🤝',
    },
  ];

  const indoreHubs = [
    'Saket Club Garba Mahotsav',
    'Abhivyakti Garba Grounds',
    'Anand Bazar & MG Road Circles',
    'Sayaji Navratri Utsav',
    'Bhawarkua & Vijay Nagar Arenas',
  ];

  const faqs = [
    {
      q: 'Is Dandiya Jodi a dating or matrimonial platform?',
      a: 'Absolutely not. Dandiya Jodi by Love Angle is exclusively designed for finding verified dance partners or groups for Navratri in Indore. Respect, consent, and safety come first.',
    },
    {
      q: 'Who can register on Dandiya Jodi?',
      a: 'Any Garba enthusiast aged 18 and older living in or visiting Indore for Navratri 2026 can register.',
    },
    {
      q: 'Will my WhatsApp number or phone be publicly visible?',
      a: 'No. Your phone number, WhatsApp, and private information are strictly shielded. Contact details are only shared after mutual consent and administrative coordination.',
    },
    {
      q: 'How does the Double Match plan work?',
      a: 'The Double Match plan (₹299) allows our team to suggest up to 2 verified partner matches during Navratri, giving you more flexibility across different festival dates.',
    },
  ];

  return (
    <div className="space-y-24 pb-20 overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative pt-12 sm:pt-20 lg:pt-28 px-4 sm:px-6 lg:px-8">
        {/* Glow backdrop circles */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-pink/20 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-brand-gold/15 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Indore & Event Badges */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 text-xs sm:text-sm"
          >
            <span className="px-3.5 py-1.5 rounded-full bg-purple-900/60 border border-purple-500/40 text-purple-200 font-semibold flex items-center gap-1.5 shadow-sm">
              <MapPin className="w-3.5 h-3.5 text-brand-pink" />
              Indore, Madhya Pradesh
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-pink-950/60 border border-pink-500/40 text-pink-200 font-semibold flex items-center gap-1.5">
              🎉 Navratri 2026
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-amber-950/60 border border-amber-500/40 text-amber-200 font-semibold flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-brand-pink fill-brand-pink" />
              Managed by Love Angle
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-4"
          >
            <h1 className="font-heading font-black text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[1.15]">
              💃 Find Your Perfect <br className="hidden sm:block" />
              <span className="festive-gradient-text">Dandiya Jodi</span> 🕺
            </h1>
            <p className="max-w-2xl mx-auto text-gray-300 text-base sm:text-xl font-normal leading-relaxed">
              Looking for a Dandiya partner or group this Navratri? Register with Dandiya Jodi by Love Angle and let our Indore team help you find a suitable match.
            </p>
          </motion.div>

          {/* Trust Highlights */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-300 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              100% Verified Profiles
            </span>
            <span className="flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-brand-gold" />
              Consent-Based Matching
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-pink-400" />
              Zero Tolerance for Harassment
            </span>
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-heading font-bold text-lg text-white shadow-xl shadow-pink-500/25 hover:shadow-pink-500/40 bg-gradient-to-r from-brand-pink via-purple-600 to-amber-500 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2.5"
            >
              <span>Find My Dandiya Jodi ❤️</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/how-it-works"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-heading font-semibold text-base text-gray-200 hover:text-white glass-card hover:bg-white/10 transition flex items-center justify-center gap-2"
            >
              <span>How It Works</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* SAFETY FIRST PROMISE CALLOUT */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-purple-950/70 via-[#18052a] to-pink-950/50 border border-purple-800/60 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 opacity-10 text-9xl select-none">
            🛡️
          </div>
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-pink-500/20 text-pink-300 border border-pink-500/30">
              Women's Privacy & Community Safety
            </div>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-white">
              Strictly for Dandiya & Garba. Respect & Consent First.
            </h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              We understand safety concerns during festival celebrations. We never expose your WhatsApp number or private contact details. Dancers only connect after explicit mutual consent verified by our team.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 text-xs font-medium text-amber-300">
              <span>✓ Contact sharing OFF by default</span>
              <span>✓ Verified Instagram Handles</span>
              <span>✓ 18+ ID Verification</span>
              <span>✓ Immediate Bans for Misconduct</span>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <span className="text-xs uppercase font-extrabold tracking-widest text-brand-gold">
            Step-by-Step Experience
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white">
            How Dandiya Jodi Works
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto">
            From registration to dancing together under the festive Indore lights in 4 safe steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="glass-card glass-card-hover p-6 rounded-2xl relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{item.icon}</span>
                  <span className="text-2xl font-black font-heading text-purple-700/60">
                    {item.step}
                  </span>
                </div>
                <h3 className="font-heading font-bold text-lg text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-purple-900/40 flex items-center gap-1.5 text-xs font-semibold text-brand-gold">
                <span>Step {item.step} Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING PLANS PREVIEW */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <span className="text-xs uppercase font-extrabold tracking-widest text-brand-pink">
            Simple & Transparent
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white">
            Choose Your Matchmaking Plan
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto">
            Affordable festival registration fees for profile verification, compatibility analysis, and personalized team coordination.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Plan 1: Single Match */}
          <div className="glass-card p-8 rounded-3xl border border-purple-800/60 flex flex-col justify-between relative hover:border-purple-600 transition">
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold text-purple-300 uppercase tracking-wider">
                  Basic Pass
                </span>
                <h3 className="font-heading font-black text-2xl text-white mt-1">
                  🕺 SINGLE MATCH
                </h3>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold font-heading text-white">₹199</span>
                <span className="text-xs text-gray-400">/ one-time fee</span>
              </div>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>1 Dandiya partner match</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Profile & Instagram verification</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Indore area & style compatibility</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Dedicated team coordination</span>
                </li>
              </ul>
            </div>
            <Link
              to="/register?plan=SINGLE_MATCH"
              className="mt-8 block text-center py-3.5 px-6 rounded-xl font-heading font-bold text-sm bg-purple-900/60 hover:bg-purple-800/80 text-white border border-purple-600/40 transition"
            >
              Choose Single Match
            </Link>
          </div>

          {/* Plan 2: Double Match (Highlighted) */}
          <div className="glass-card p-8 rounded-3xl border-2 border-brand-pink relative flex flex-col justify-between shadow-2xl shadow-pink-900/30">
            <div className="absolute -top-3.5 right-6 px-3.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-gradient-to-r from-brand-pink to-brand-gold text-white shadow-md">
              Most Popular
            </div>
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold text-pink-300 uppercase tracking-wider">
                  Recommended Festival Pass
                </span>
                <h3 className="font-heading font-black text-2xl text-white mt-1 flex items-center gap-2">
                  <span>🕺 DOUBLE MATCH</span>
                  <Sparkles className="w-5 h-5 text-brand-gold" />
                </h3>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold font-heading text-white">₹299</span>
                <span className="text-xs text-gray-400">/ one-time fee</span>
              </div>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-white font-medium">Up to 2 Dandiya partner matches</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Flexibility across different festival dates</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Profile & Instagram verification</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Priority matchmaking queue</span>
                </li>
              </ul>
            </div>
            <Link
              to="/register?plan=DOUBLE_MATCH"
              className="mt-8 block text-center py-3.5 px-6 rounded-xl font-heading font-bold text-sm bg-gradient-to-r from-brand-pink via-purple-600 to-amber-500 hover:opacity-90 text-white shadow-lg transition"
            >
              Choose Double Match
            </Link>
          </div>
        </div>
      </section>

      {/* INDORE HUBS & VENUES */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-purple-800/50">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-xl">
              <span className="text-xs uppercase font-extrabold text-amber-400 tracking-wider">
                Indore City Navratri 2026
              </span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
                Matching Dancers Across Indore's Premier Venues
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed">
                Whether you dance at Saket, celebrate at Abhivyakti, or join traditional circles in Palasia, we match you with people in your neighborhood who share your enthusiasm.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {indoreHubs.map((hub, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-gray-200 font-medium"
                  >
                    📍 {hub}
                  </span>
                ))}
              </div>
            </div>
            <div className="w-full lg:w-72 bg-gradient-to-tr from-brand-pink/20 to-purple-800/30 p-6 rounded-2xl border border-purple-600/30 text-center space-y-3">
              <span className="text-4xl">🪔</span>
              <div className="font-heading font-bold text-white text-lg">Indore Focused</div>
              <p className="text-xs text-purple-200/80 leading-relaxed">
                Only genuine Indore residents and visitors verified for authentic local participation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center space-y-4 mb-12">
          <span className="text-xs uppercase font-extrabold tracking-widest text-brand-gold">
            Got Questions?
          </span>
          <h2 className="font-heading font-extrabold text-3xl text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="glass-card p-6 rounded-2xl border border-purple-900/50 space-y-2"
            >
              <div className="font-heading font-bold text-base text-white flex items-start gap-2.5">
                <HelpCircle className="w-5 h-5 text-brand-pink shrink-0 mt-0.5" />
                <span>{faq.q}</span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed pl-7">
                {faq.a}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link to="/faq" className="text-sm font-semibold text-brand-gold hover:text-white underline">
            View All Frequently Asked Questions &rarr;
          </Link>
        </div>
      </section>

      {/* BOTTOM FESTIVE CTA BANNER */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-3xl p-8 sm:p-14 text-center overflow-hidden bg-gradient-to-r from-brand-pink via-purple-700 to-amber-600 shadow-2xl">
          <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
            <span className="text-4xl">💃🕺</span>
            <h2 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight">
              Ready to Dance This Navratri 2026?
            </h2>
            <p className="text-white/90 text-sm sm:text-base leading-relaxed">
              Don't miss the high-energy garba beats. Register your profile in minutes and find your Dandiya partner safely in Indore.
            </p>
            <div className="pt-2">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-heading font-bold text-lg bg-white text-purple-950 hover:bg-gray-100 shadow-xl transition transform hover:scale-105"
              >
                <span>Find My Dandiya Jodi ❤️</span>
                <ArrowRight className="w-5 h-5 text-brand-pink" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
