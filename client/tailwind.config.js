/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        festival: {
          dark: '#0c0214',
          midnight: '#130220',
          plum: '#1a052e',
          card: '#22083d',
          cardSoft: 'rgba(34, 8, 61, 0.75)',
          border: '#3d1266',
          purple: '#6b21a8',
          royal: '#4c1d95',
          pink: '#db2777',
          magenta: '#e11d48',
          gold: '#eab308',
          warmGold: '#facc15',
          amber: '#f59e0b',
          saffron: '#f97316',
          // Light sections
          ivory: '#fdfbf7',
          cream: '#fbf7ee',
          creamDark: '#f4ede0',
          creamText: '#261238',
          creamMuted: '#68547b',
          creamBorder: '#e7ddcf',
        },
        brand: {
          dark: '#0c0214',
          card: '#18052b',
          border: '#3b1263',
          purple: '#7e22ce',
          pink: '#db2777',
          rose: '#f43f5e',
          orange: '#f97316',
          gold: '#eab308',
          amber: '#f59e0b',
        },
      },
      fontFamily: {
        heading: ['Outfit', 'Poppins', 'sans-serif'],
        body: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow-gold': '0 0 25px rgba(250, 204, 21, 0.35)',
        'glow-pink': '0 0 25px rgba(219, 39, 119, 0.4)',
        'glow-purple': '0 0 30px rgba(107, 33, 168, 0.45)',
        'luxury': '0 20px 40px -15px rgba(12, 2, 20, 0.7)',
        'card-elevated': '0 10px 30px -5px rgba(0, 0, 0, 0.5), 0 0 1px 1px rgba(255, 255, 255, 0.1)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'float-reverse': 'floatRev 7s ease-in-out infinite',
        'glow-pulse': 'glow 3s ease-in-out infinite alternate',
        'marquee': 'marquee 28s linear infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(1.5deg)' },
        },
        floatRev: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(10px) rotate(-1.5deg)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 15px rgba(219, 39, 119, 0.3)' },
          '100%': { boxShadow: '0 0 35px rgba(234, 179, 8, 0.6)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};
