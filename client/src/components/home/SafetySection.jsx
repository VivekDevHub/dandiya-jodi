import React from 'react';
import { Shield, Lock, UserCheck, HeartHandshake, AlertOctagon, Sparkles } from 'lucide-react';
import { festivalImages } from '../../config/images';

export default function SafetySection() {
  const safetyCards = [
    {
      title: 'Private Information',
      desc: 'Your phone number, WhatsApp, and private social handles stay confidential. No numbers are listed publicly.',
      icon: <Lock className="w-5 h-5 text-purple-700" />,
      bg: 'bg-purple-50 border-purple-200/80',
    },
    {
      title: 'Manual Verification',
      desc: 'Every single profile is human-reviewed by our Indore team before being considered for matchmaking.',
      icon: <UserCheck className="w-5 h-5 text-pink-700" />,
      bg: 'bg-pink-50 border-pink-200/80',
    },
    {
      title: 'Consent First',
      desc: 'Introductions only occur after mutual interest is confirmed by both dancers. You are in complete control.',
      icon: <HeartHandshake className="w-5 h-5 text-amber-700" />,
      bg: 'bg-amber-50 border-amber-200/80',
    },
    {
      title: 'Zero Tolerance',
      desc: 'Harassment, impersonation, or disrespectful behavior leads to an immediate permanent ban and reporting.',
      icon: <Shield className="w-5 h-5 text-emerald-700" />,
      bg: 'bg-emerald-50 border-emerald-200/80',
    },
  ];

  return (
    <section id="safety" className="py-24 px-4 sm:px-6 lg:px-12 bg-festival-ivory text-festival-creamText relative overflow-hidden">
      {/* Decorative Warm Accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-pink-100/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Main Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-100/80 border border-pink-200 text-festival-magenta text-xs font-bold tracking-wide uppercase">
            <Shield className="w-3.5 h-3.5" />
            <span>Trust & Verification</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-festival-creamText">
            Dance Freely. Feel Safe. 🔐
          </h2>
          <p className="text-festival-creamMuted text-base sm:text-lg">
            Safety isn't an afterthought or fine print—it's the foundation of how Dandiya Jodi was built.
          </p>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {safetyCards.map((card, i) => (
            <div
              key={card.title}
              className={`p-6 rounded-2xl border ${card.bg} shadow-sm hover:shadow-md transition-shadow duration-300 space-y-3`}
            >
              <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center">
                {card.icon}
              </div>
              <h3 className="font-heading font-bold text-lg text-festival-creamText">
                {card.title}
              </h3>
              <p className="text-sm text-festival-creamMuted leading-relaxed">
                {card.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Dedicated "For Her" Feature Card */}
        <div className="bg-white rounded-3xl border border-amber-200/80 shadow-xl overflow-hidden p-6 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Image of female garba dancer */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-square shadow-lg border-2 border-amber-100 bg-amber-50">
                <img
                  src={festivalImages.safety}
                  alt="Dignified female Garba participant at Navratri festival in Indore"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                
                {/* Floating lock badge */}
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-200 shadow-md text-xs font-bold text-slate-800 flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-festival-magenta" />
                  <span>Shielded Profile</span>
                </div>
              </div>
            </div>

            {/* Right Column: Clear explanation */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Our Clear Policy</span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-festival-creamText leading-tight">
                Her Safety Comes First. Always.
              </h3>

              <p className="text-festival-creamMuted text-base leading-relaxed">
                No woman's contact details, WhatsApp number, or personal coordinates are shared with anyone without her explicit and verified consent.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                    ✓
                  </div>
                  <p className="text-sm text-slate-700">
                    <strong>Zero Contact Exposure:</strong> You review potential partner suggestions on the platform first.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                    ✓
                  </div>
                  <p className="text-sm text-slate-700">
                    <strong>Moderator-Assisted Introductions:</strong> Our team coordinates genuine introductions so you always feel secure.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                    ✓
                  </div>
                  <p className="text-sm text-slate-700">
                    <strong>Public Grounds Focus:</strong> We encourage meeting only at official, ticketed Navratri event grounds in Indore.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
