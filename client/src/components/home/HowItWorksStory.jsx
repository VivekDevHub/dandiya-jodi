import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, FileText, UserCheck, HeartHandshake, Music2 } from 'lucide-react';

export default function HowItWorksStory() {
  const steps = [
    {
      num: '01',
      title: 'Tell Us About You',
      desc: 'Your vibe. Your area. Your dance style.',
      details: 'Select your preferred Indore garba venues, music taste, and dancing experience level.',
      icon: <FileText className="w-5 h-5 text-festival-gold" />,
      accent: 'from-amber-400 to-amber-600',
    },
    {
      num: '02',
      title: 'Get Verified',
      desc: 'Our team manually checks every profile.',
      details: 'Human moderation verifies Instagram and genuine interest to keep the platform 100% safe.',
      icon: <UserCheck className="w-5 h-5 text-festival-pink" />,
      accent: 'from-pink-400 to-rose-600',
    },
    {
      num: '03',
      title: 'Find Your Match',
      desc: 'We identify compatible Dandiya partners.',
      details: 'Based on dancing compatibility, age preference, and shared festival night plans.',
      icon: <HeartHandshake className="w-5 h-5 text-purple-400" />,
      accent: 'from-purple-400 to-indigo-600',
    },
    {
      num: '04',
      title: 'Meet & Dance',
      desc: 'With mutual consent, we coordinate introductions.',
      details: 'No pressure, no publicly leaked phone numbers. Connect safely and hit the dance circle.',
      icon: <Music2 className="w-5 h-5 text-emerald-400" />,
      accent: 'from-emerald-400 to-teal-600',
    },
  ];

  return (
    <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-12 bg-festival-dark relative overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-festival-cardSoft border border-festival-border text-festival-gold text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Smooth & Safe Journey</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white">
            How It Works
          </h2>
          <p className="text-slate-300 text-base">
            A thoughtful, 4-step horizontal journey designed for comfort, authenticity, and celebration.
          </p>
        </div>

        {/* Horizontal Storytelling Track */}
        <div className="relative">
          
          {/* Connecting Line across steps on Desktop */}
          <div className="hidden lg:block absolute top-16 left-12 right-12 h-0.5 bg-gradient-to-r from-amber-500/40 via-festival-pink/40 to-emerald-500/40 -z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((item, index) => (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="group relative bg-festival-card/80 border border-festival-border/80 hover:border-festival-pink/60 rounded-2xl p-6 sm:p-7 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-card-elevated"
              >
                {/* Step Number & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl sm:text-4xl font-heading font-black bg-gradient-to-br from-white/90 to-white/30 bg-clip-text text-transparent group-hover:from-festival-gold group-hover:to-festival-pink transition-all">
                    {item.num}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-festival-plum/90 border border-festival-border flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                </div>

                {/* Step Title & Story */}
                <h3 className="text-lg font-heading font-bold text-white group-hover:text-amber-200 transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-sm font-medium text-festival-pink/90 mt-1">
                  {item.desc}
                </p>

                <p className="text-xs text-slate-400 mt-3 leading-relaxed border-t border-purple-900/40 pt-3">
                  {item.details}
                </p>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
