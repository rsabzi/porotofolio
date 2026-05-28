/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        main: ['Space Grotesk', 'sans-serif'],
        display: ['Sora', 'sans-serif'],
      },
      colors: {
        'cyber-black': '#050508',
        'cyber-graphite': '#0d0d14',
        'cyber-surface': '#111118',
        'cyber-border': '#1e1e2e',
        'cyber-cyan': '#06b6d4',
        'cyber-electric': '#0ea5e9',
        'cyber-neon': '#22d3ee',
      },
      animation: {
        'scan': 'scan 10s linear infinite',
        'float': 'float 5s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'rotate-slow': 'rotateSlow 20s linear infinite',
      },
    },
  },
  plugins: [],
};
