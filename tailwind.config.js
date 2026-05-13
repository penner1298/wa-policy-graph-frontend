/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        evergreen: '#004D40',
        mist: '#F8FAF9',
        snow: '#FFFFFF',
        deficit: '#C62828',
        oracle: '#0288D1',
        surplus: '#2E7D32',
        liability: '#FBC02D',
        slate: {
          50: '#F8FAFC',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          800: '#1E293B',
          900: '#0F172A',
        },
        void: '#12141C'
      },
      fontFamily: {
        sans: ['Geist', 'Inter', 'ui-sans-serif', 'system-ui'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular'],
      },
      boxShadow: {
        'luxe': '0 20px 50px rgba(0, 77, 64, 0.05)',
        'oracle': '0 20px 50px rgba(2, 136, 209, 0.15)',
      }
    },
  },
  plugins: [],
};
