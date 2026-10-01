/**
 * Centralized Festival Imagery Configuration
 * Dandiya Jodi by Love Angle - Indore Navratri 2026
 * 
 * Provides local production assets with reliable fallbacks
 */

export const festivalImages = {
  hero: '/images/hero-garba-couple.jpg',
  couple: '/images/garba-couple-2.jpg',
  crowd: '/images/navratri-crowd.jpg',
  women: '/images/garba-women.jpg',
  men: '/images/garba-men.jpg',
  safety: '/images/safety-female.jpg',
  event: '/images/dandiya-event.jpg',
};

// Fallback gradients when images are loading or fail
export const imageFallbacks = {
  hero: 'linear-gradient(135deg, #2a0845 0%, #6441a5 50%, #fe8c00 100%)',
  couple: 'linear-gradient(135deg, #1f0533 0%, #db2777 50%, #facc15 100%)',
  crowd: 'linear-gradient(135deg, #0e021a 0%, #3b1263 50%, #e11d48 100%)',
  women: 'linear-gradient(135deg, #831843 0%, #db2777 50%, #fbbf24 100%)',
  men: 'linear-gradient(135deg, #1e1b4b 0%, #4338ca 50%, #f97316 100%)',
  safety: 'linear-gradient(135deg, #371b58 0%, #4c3575 50%, #7858a6 100%)',
};
