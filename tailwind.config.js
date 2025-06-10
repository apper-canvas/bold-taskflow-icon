/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5B4CFF',
        secondary: '#FF6B6B',
        accent: '#4ECDC4',
        surface: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a'
        },
        success: '#51CF66',
        warning: '#FFD93D',
        error: '#FF6B6B',
        info: '#339AF0'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        heading: ['Plus Jakarta Sans', 'ui-sans-serif', 'system-ui']
      },
      animation: {
        'scale-in': 'scaleIn 0.2s ease-out',
        'check-draw': 'checkDraw 0.3s ease-out',
        'priority-glow': 'priorityGlow 2s ease-in-out infinite'
      },
      keyframes: {
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        checkDraw: {
          '0%': { strokeDasharray: '0 50', transform: 'scale(0.8)' },
          '50%': { strokeDasharray: '25 25', transform: 'scale(1.1)' },
          '100%': { strokeDasharray: '50 0', transform: 'scale(1)' }
        },
        priorityGlow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(255, 107, 107, 0.3)' },
          '50%': { boxShadow: '0 0 20px rgba(255, 107, 107, 0.6)' }
        }
      }
    },
  },
  plugins: [],
}