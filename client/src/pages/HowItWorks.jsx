import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Heart, Sparkles, CheckCircle2, ArrowRight, Lock, MapPin, Users } from 'lucide-react';

export default function HowItWorks() {
  const detailedSteps = [
    {
      num: '01',
      title: 'Register Genuine Details',
      subtitle: 'Accurate profile setup and verification baseline',
      desc: 'Fill out our 7-step wizard with your genuine name, verified 18+ age, WhatsApp number, Instagram handle, and Indore neighborhood. Upload 1 to 5 clear photos.',
      highlights: ['Strict 18+ verification', 'Indian phone verification', 'Active Instagram check'],
    },
    {
      num: '02',
      title: 'Human Review & Verification',
      subtitle: 'Manual safety screening before any matchmaking',
      desc: 'No profile enters our matchmaking pool automatically. Our Indore safety and moderation team reviews your photos, verifies Instagram authenticity, and checks payment confirmation.',
      highlights: ['Manual photo approval', 'Zero tolerance for fake accounts', 'Safety moderation'],
    },
    {
      num: '03',
      title: 'Weighted Compatibility Matching',
      subtitle: 'Algorithm powered by dance style and local proximity',
      desc: 'Our system identifies compatible Dandiya partners based on: Age compatibility (25%), Location proximity (20%), Partner preference (20%), Dance experience (15%), Dance styles (10%), and Festival availability (10%).',
      highlights: ['25% Age alignment', '20% Indore area proximity', '15% Dance experience match'],
    },
    {
      num: '04',
      title: 'Consent-First Safe Introduction',
      subtitle: 'No contact details are ever exposed without mutual interest',
      desc: 'When our team suggests a match, both participants see limited safe profiles first (first name, age, dance style, area). If and only if BOTH users select "Yes, I\'m Interested", does our team coordinate contact sharing.',
      highlights: ['Dual consent required', 'Phone numbers shielded', 'Team coordinated intro'],
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 space-y-16">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-gold">
          Navratri 2026 Process
        </span>
        <h1 className="font-heading font-black text-3xl sm:text-5xl text-white">
          How Dandiya Jodi Works
        </h1>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
          Designed specifically for Indore Navratri 2026. A structured, safe, and respectful process to help you find the right dance partner or group.
        </p>
      </div>

      {/* 4 Detailed Step Cards */}
      <div className="space-y-8">
        {detailedSteps.map((s, idx) => (
          <div
            key={idx}
            className="glass-card rounded-3xl p-6 sm:p-10 border border-purple-800/60 relative flex flex-col md:flex-row gap-6 md:gap-10 items-start hover:border-brand-pink/50 transition"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-pink to-brand-gold flex items-center justify-center font-heading font-black text-2xl text-white shrink-0 shadow-lg shadow-pink-500/25">
              {s.num}
            </div>

            <div className="space-y-3 flex-1">
              <span className="text-xs font-semibold text-purple-300 uppercase tracking-wider">
                {s.subtitle}
              </span>
              <h3 className="font-heading font-extrabold text-2xl text-white">
                {s.title}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {s.desc}
              </p>

              <div className="pt-2 flex flex-wrap gap-2.5">
                {s.highlights.map((h, hIdx) => (
                  <span
                    key={hIdx}
                    className="px-3 py-1 rounded-lg bg-purple-950/60 border border-purple-700/40 text-xs font-medium text-amber-200"
                  >
                    ✓ {h}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Matching Criteria Breakdown Box */}
      <div className="glass-card rounded-3xl p-8 sm:p-10 border border-purple-800/50 space-y-6">
        <div className="text-center space-y-2">
          <h3 className="font-heading font-bold text-xl text-white">
            Matching Compatibility Factors
          </h3>
          <p className="text-xs text-gray-400">
            Weighted internal calculations ensuring optimal harmony on the dance floor.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/40 text-center">
            <span className="font-heading font-extrabold text-2xl text-brand-pink">25%</span>
            <div className="text-xs font-semibold text-white mt-1">Age Compatibility</div>
            <div className="text-[11px] text-gray-400">Within preferred mutual range</div>
          </div>
          <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/40 text-center">
            <span className="font-heading font-extrabold text-2xl text-brand-gold">20%</span>
            <div className="text-xs font-semibold text-white mt-1">Location Proximity</div>
            <div className="text-[11px] text-gray-400">Same or adjacent Indore area</div>
          </div>
          <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/40 text-center">
            <span className="font-heading font-extrabold text-2xl text-brand-pink">20%</span>
            <div className="text-xs font-semibold text-white mt-1">Partner Preference</div>
            <div className="text-[11px] text-gray-400">Mutual gender/group alignment</div>
          </div>
          <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/40 text-center">
            <span className="font-heading font-extrabold text-2xl text-amber-400">15%</span>
            <div className="text-xs font-semibold text-white mt-1">Dance Experience</div>
            <div className="text-[11px] text-gray-400">Similar or complementary level</div>
          </div>
          <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/40 text-center">
            <span className="font-heading font-extrabold text-2xl text-purple-300">10%</span>
            <div className="text-xs font-semibold text-white mt-1">Dance Style</div>
            <div className="text-[11px] text-gray-400">Garba, Raas, or Bollywood</div>
          </div>
          <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/40 text-center">
            <span className="font-heading font-extrabold text-2xl text-purple-300">10%</span>
            <div className="text-xs font-semibold text-white mt-1">Availability Dates</div>
            <div className="text-[11px] text-gray-400">Festival nights overlap</div>
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="text-center pt-4">
        <Link
          to="/register"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-heading font-bold text-base text-white bg-gradient-to-r from-brand-pink via-purple-600 to-amber-500 shadow-xl shadow-pink-500/20 hover:scale-105 transition"
        >
          <span>Register My Profile Now</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}
