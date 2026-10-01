/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0c0214',
          card: '#160526',
          border: '#381359',
          purple: '#6b21a8',
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
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glow 3s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(2deg)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 15px rgba(219, 39, 119, 0.3)' },
          '100%': { boxShadow: '0 0 30px rgba(234, 179, 8, 0.6)' },
        },
      },
    },
  },
  plugins: [],
};
