/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],

  theme: {
    extend: {
      // ── Color Palette ───────────────────────────────────────
      colors: {
        // Brand — Indigo (primary AI/product color)
        brand: {
          50:  '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },

        // Accent — Cyan (secondary / AI spark color)
        accent: {
          50:  '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
          950: '#083344',
        },

        // Surface — deep navy-black hierarchy (dark-first design)
        surface: {
          DEFAULT: '#080817', // page canvas
          1: '#0f0f24',       // section bg
          2: '#141430',       // card bg
          3: '#1a1a3a',       // elevated card / input bg
          4: '#222244',       // overlay / hover
          5: '#2c2c54',       // selected / active
        },

        // Line — border tokens
        line: {
          DEFAULT: '#1e2040', // subtle borders
          strong:  '#2e3060', // emphasized borders
        },
      },

      // ── Typography ──────────────────────────────────────────
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },

      // ── Shadows with glow ───────────────────────────────────
      boxShadow: {
        'glow-xs':    '0 0  8px 0 rgba(99, 102, 241, 0.25)',
        'glow-sm':    '0 0 16px 0 rgba(99, 102, 241, 0.35)',
        'glow':       '0 0 28px 0 rgba(99, 102, 241, 0.50)',
        'glow-lg':    '0 0 48px 0 rgba(99, 102, 241, 0.60)',
        'glow-accent':'0 0 28px 0 rgba(34, 211, 238, 0.40)',
        'card':       '0 4px 24px rgba(0, 0, 0, 0.50)',
        'card-hover': '0 8px 40px rgba(0, 0, 0, 0.70)',
        'glass':      'inset 0 1px 0 rgba(255,255,255,0.06), 0 4px 24px rgba(0,0,0,0.40)',
      },

      // ── Keyframes ───────────────────────────────────────────
      keyframes: {
        'spin-cw': {
          from: { transform: 'rotate(0deg)' },
          to:   { transform: 'rotate(360deg)' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to:   { opacity: '1', transform: 'scale(1)' },
        },
      },

      // ── Animations ──────────────────────────────────────────
      animation: {
        spinner:   'spin-cw 0.75s linear infinite',
        'fade-up': 'fade-up 0.3s ease-out both',
        'fade-in': 'fade-in 0.2s ease-out both',
        'scale-in':'scale-in 0.2s ease-out both',
      },

      // ── Easing ──────────────────────────────────────────────
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
        spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },

      // ── Border radius ───────────────────────────────────────
      borderRadius: {
        '2.5xl': '20px',
      },
    },
  },

  plugins: [],
};
