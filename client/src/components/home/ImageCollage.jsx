import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { festivalImages } from '../../config/images';

export default function ImageCollage() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-12 bg-festival-plum/40 border-t border-purple-900/30 relative">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-festival-cardSoft border border-festival-border text-festival-gold text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Festival Atmosphere</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white">
            Feel the Energy of <span className="bg-gradient-to-r from-amber-300 via-pink-400 to-festival-pink bg-clip-text text-transparent">Indore Garba Nights</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            From vibrant Chaniya Cholis and rhythmic Dandiya clacks to thousands dancing together under festive lights.
          </p>
        </div>

        {/* Asymmetric Collage Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-6">
          
          {/* Top Left: Large Couple (7 cols) */}
          <div className="md:col-span-7 group relative overflow-hidden rounded-3xl lg:rounded-[36px] shadow-card-elevated border border-purple-500/20 aspect-[4/3] sm:aspect-[16/11]">
            <img
              src={festivalImages.hero}
              alt="Dandiya Raas Couple in Indore"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-festival-dark/90 via-festival-dark/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-5 left-6 right-6">
              <span className="text-[11px] font-extrabold tracking-wider uppercase text-amber-300 bg-amber-950/80 px-2.5 py-1 rounded-full border border-amber-500/30">
                Partner Chemistry
              </span>
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-white mt-1.5">
                Dandiya Jodi Connections
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 line-clamp-1">
                Share steps, spins, and smiles on the dance floor.
              </p>
            </div>
          </div>

          {/* Top Right: Women in Chaniya Choli (5 cols) */}
          <div className="md:col-span-5 group relative overflow-hidden rounded-2xl lg:rounded-[30px] rounded-tr-[50px] shadow-card-elevated border border-pink-500/20 aspect-square sm:aspect-auto">
            <img
              src={festivalImages.women}
              alt="Women in traditional Chaniya Choli"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-festival-dark/90 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-5 left-5 right-5">
              <span className="text-[11px] font-bold text-pink-300 bg-pink-950/80 px-2.5 py-1 rounded-full border border-pink-500/30">
                Traditional Glamour
              </span>
              <h3 className="text-lg sm:text-xl font-heading font-bold text-white mt-1.5">
                Chaniya Choli & Mirror Work
              </h3>
            </div>
          </div>

          {/* Bottom Left: Men playing Dandiya (5 cols) */}
          <div className="md:col-span-5 group relative overflow-hidden rounded-2xl lg:rounded-[30px] rounded-bl-[50px] shadow-card-elevated border border-amber-500/20 aspect-square sm:aspect-auto">
            <img
              src={festivalImages.men}
              alt="Men playing Dandiya in traditional Kedia jacket"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-festival-dark/90 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-5 left-5 right-5">
              <span className="text-[11px] font-bold text-amber-300 bg-amber-950/80 px-2.5 py-1 rounded-full border border-amber-500/30">
                High Energy Beats
              </span>
              <h3 className="text-lg sm:text-xl font-heading font-bold text-white mt-1.5">
                Dandiya Raas Rhythm
              </h3>
            </div>
          </div>

          {/* Bottom Right: Navratri Crowd Wide (7 cols) */}
          <div className="md:col-span-7 group relative overflow-hidden rounded-3xl lg:rounded-[36px] shadow-card-elevated border border-purple-500/20 aspect-[4/3] sm:aspect-[16/10]">
            <img
              src={festivalImages.crowd}
              alt="Grand Navratri crowd celebration in Indore arena"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-festival-dark/90 via-festival-dark/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-5 left-6 right-6">
              <span className="text-[11px] font-extrabold tracking-wider uppercase text-festival-warmGold bg-yellow-950/80 px-2.5 py-1 rounded-full border border-yellow-500/30">
                Indore Celebrates
              </span>
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-white mt-1.5">
                10,000+ Dancers in Indore Arenas
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 line-clamp-1">
                Experience the magic with someone who keeps the rhythm.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
