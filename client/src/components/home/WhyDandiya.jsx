import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, MapPin, Sparkles, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { festivalImages } from '../../config/images';

export default function WhyDandiya() {
  const highlights = [
    {
      title: 'Handpicked by Real People',
      desc: 'No random automated spam. Our Indore-based team manually reviews profiles for vibe & authenticity.',
    },
    {
      title: 'Privacy Guaranteed',
      desc: 'No phone numbers or WhatsApp details are ever shown publicly. Contact is coordinated with consent.',
    },
    {
      title: 'Indore Event Compatibility',
      desc: 'Match with people going to your favorite venues: Saket Club, Abhivyakti, Anand Bazar, and more.',
    },
  ];

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-12 bg-festival-ivory text-festival-creamText relative overflow-hidden">
      {/* Decorative Warm Shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-100/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-100/60 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Editorial Typography */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-100/80 border border-pink-200 text-festival-magenta text-xs font-bold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>The Dandiya Jodi Mission</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-festival-creamText leading-tight">
              Sometimes all you need is the <span className="text-festival-magenta underline decoration-festival-gold/60 decoration-wavy decoration-2">right partner</span> to start dancing. ❤️
            </h2>

            <p className="text-festival-creamMuted text-base sm:text-lg leading-relaxed font-normal">
              Dandiya Jodi helps you find a suitable Garba or Dandiya partner or group in Indore through a verified, respectful, and consent-based process. Navratri is about celebration, rhythm, and belonging—not sitting on the sidelines alone.
            </p>

            {/* Value checklist */}
            <div className="space-y-4 pt-2">
              {highlights.map((item, index) => (
                <div key={index} className="flex items-start gap-3.5">
                  <div className="w-7 h-7 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-base text-festival-creamText">
                      {item.title}
                    </h4>
                    <p className="text-sm text-festival-creamMuted mt-0.5 leading-normal">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Garba Couple Image + Floating Pill Card */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-amber-50">
              <img
                src={festivalImages.couple}
                alt="Joyful Garba couple celebrating Navratri together in Indore"
                className="w-full h-[460px] sm:h-[520px] object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

              {/* Overlaid Pill Badge */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-200/80 shadow-md text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Verified Indore Match</span>
              </div>
            </div>

            {/* Floating Decorative Highlights Card */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="absolute -bottom-8 -left-4 sm:-left-8 bg-white/95 backdrop-blur-md p-5 rounded-2xl border border-amber-200/80 shadow-xl max-w-[260px] space-y-2.5 z-20"
            >
              <div className="flex items-center gap-2 text-xs font-bold text-festival-magenta pb-1.5 border-b border-slate-100">
                <Sparkles className="w-4 h-4 text-festival-gold" />
                <span>Indore Navratri 2026</span>
              </div>
              <ul className="text-xs space-y-2 text-slate-700 font-medium">
                <li className="flex items-center gap-2">
                  <span className="text-base">📍</span> <span>Indore Top Grounds</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-base">🎉</span> <span>Saket, Abhivyakti, Sayaji</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-base">🤝</span> <span>Verified Matching</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-base">🔐</span> <span>Privacy & Consent First</span>
                </li>
              </ul>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
