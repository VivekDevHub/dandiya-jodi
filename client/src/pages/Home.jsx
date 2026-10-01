import React from 'react';
import Hero from '../components/home/Hero';
import FestivalMarquee from '../components/home/FestivalMarquee';
import WhyDandiya from '../components/home/WhyDandiya';
import ImageCollage from '../components/home/ImageCollage';
import HowItWorksStory from '../components/home/HowItWorksStory';
import MatchingVisualization from '../components/home/MatchingVisualization';
import RhythmMatchDark from '../components/home/RhythmMatchDark';
import SafetySection from '../components/home/SafetySection';
import PlansSection from '../components/home/PlansSection';
import FAQAccordion from '../components/home/FAQAccordion';
import FinalCTA from '../components/home/FinalCTA';

export default function Home() {
  return (
    <div className="min-h-screen bg-festival-dark text-slate-100 overflow-x-hidden">
      {/* 01: Hero Section */}
      <Hero />

      {/* 02: Festive Marquee */}
      <FestivalMarquee />

      {/* 03: Why Dandiya Jodi (Light Premium Cream Section) */}
      <WhyDandiya />

      {/* 04: Asymmetric Image Collage Section */}
      <ImageCollage />

      {/* 05: How It Works (Horizontal Storytelling) */}
      <HowItWorksStory />

      {/* 06: Matching Visualization Engine Mockup */}
      <MatchingVisualization />

      {/* 07: Your Rhythm, Your Match (Dark Glowing Dual Floating Cards) */}
      <RhythmMatchDark />

      {/* 08: Safety & "For Her" Safeguard (Subtle Cream Section) */}
      <SafetySection />

      {/* 09: Plans Section (Festival Passes) */}
      <PlansSection />

      {/* 10: FAQ Accordion */}
      <FAQAccordion />

      {/* 11: Final Cinematic CTA */}
      <FinalCTA />
    </div>
  );
}
