import React from 'react';

export default function FestivalMarquee() {
  const items = [
    '✦ NAVRATRI 2026',
    '✦ FIND YOUR RHYTHM',
    '✦ MEET • DANCE • CELEBRATE',
    '✦ INDORE',
    '✦ DANDIYA JODI',
    '✦ VERIFIED MATCHING',
    '✦ SAKET & ABHIVYAKTI',
    '✦ RESPECT & CONSENT',
  ];

  return (
    <div className="relative py-4 bg-gradient-to-r from-purple-950 via-festival-card to-pink-950 border-y border-festival-gold/30 overflow-hidden shadow-inner select-none">
      {/* Side Fade Masks */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-festival-dark to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-festival-dark to-transparent z-10 pointer-events-none" />

      {/* Marquee Track */}
      <div className="flex w-max animate-marquee space-x-8">
        {[...items, ...items, ...items].map((text, idx) => (
          <div
            key={idx}
            className="flex items-center space-x-3 text-xs sm:text-sm font-heading font-bold tracking-widest uppercase text-amber-200/90 whitespace-nowrap"
          >
            <span className={idx % 2 === 0 ? 'text-festival-gold' : 'text-festival-pink'}>
              {text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
