/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',

  theme: {
    extend: {
      // ── Color Palette ───────────────────────────────────────
      colors: {
        // Primary — Civic Blue (trust, authority, governance)
        primary: {
          50:  '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },

        // Brand — kept as alias to primary for backward compat
        brand: {
          50:  '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },

        // Decision — Emerald (positive resolution, action taken)
        decision: {
          50:  '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
        },

        // Evidence — Teal (data, telemetry, knowledge)
        evidence: {
          50:  '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
          950: '#042f2e',
        },

        // AI — Purple (ONLY where Gemini/AI processing is referenced)
        ai: {
          50:  '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87',
          950: '#3b0764',
        },

        // Accent — kept for backward compat
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

        // Surface — CSS-variable-driven for light/dark theming
        surface: {
          DEFAULT: 'var(--surface-page)',
          1: 'var(--surface-1)',
          2: 'var(--surface-2)',
          3: 'var(--surface-3)',
          4: 'var(--surface-4)',
          5: 'var(--surface-5)',
        },

        // Line — border tokens
        line: {
          DEFAULT: 'var(--line)',
          strong:  'var(--line-strong)',
        },

        // Text — semantic text tokens
        content: {
          primary:   'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          tertiary:  'var(--text-tertiary)',
          inverse:   'var(--text-inverse)',
        },
      },

      // ── Typography ──────────────────────────────────────────
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        mono:    ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },

      // ── Shadows ─────────────────────────────────────────────
      boxShadow: {
        'card':       '0 1px 3px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 4px 8px rgba(0, 0, 0, 0.12), 0 8px 32px rgba(0, 0, 0, 0.10)',
        'card-dark':       '0 1px 4px rgba(0, 0, 0, 0.4), 0 4px 24px rgba(0, 0, 0, 0.5)',
        'card-dark-hover': '0 4px 8px rgba(0, 0, 0, 0.5), 0 8px 40px rgba(0, 0, 0, 0.7)',
        'sm':         '0 1px 2px rgba(0, 0, 0, 0.06)',
        'focus':      '0 0 0 3px rgba(59, 130, 246, 0.35)',
        'focus-dark': '0 0 0 3px rgba(96, 165, 250, 0.45)',
      },

      // ── Keyframes ───────────────────────────────────────────
      keyframes: {
        'spin-cw': {
          from: { transform: 'rotate(0deg)' },
          to:   { transform: 'rotate(360deg)' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(6px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.97)' },
          to:   { opacity: '1', transform: 'scale(1)' },
        },
      },

      // ── Animations ──────────────────────────────────────────
      animation: {
        spinner:    'spin-cw 0.75s linear infinite',
        'fade-up':  'fade-up 0.25s ease-out both',
        'fade-in':  'fade-in 0.2s ease-out both',
        'scale-in': 'scale-in 0.2s ease-out both',
      },

      // ── Easing ──────────────────────────────────────────────
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },

      // ── Border radius ───────────────────────────────────────
      borderRadius: {
        '2.5xl': '20px',
      },
    },
  },

  plugins: [],
};
