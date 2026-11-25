/** @type {import('tailwindcss').Config} */
const withVar = (name) => `rgb(var(--${name}) / <alpha-value>)`;

module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}', './data/**/*.js'],
  theme: {
    extend: {
      colors: {
        bg: withVar('bg'),
        panel: withVar('panel'),
        line: withVar('line'),
        fg: withVar('fg'),
        muted: withVar('muted'),
        accent: withVar('accent'),
        // deeper red for filled backgrounds behind white text (WCAG AA 4.5:1)
        accentfill: withVar('accent-fill'),
        signal: withVar('signal'),
        warn: withVar('warn'),
      },
      fontFamily: {
        sans: ['Archivo', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Archivo', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"Space Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
        script: ['Caveat', 'cursive'],
      },
      maxWidth: {
        page: '72rem',
      },
      keyframes: {
        fiber: {
          to: { strokeDashoffset: '-56' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.25' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        glow: {
          '0%, 100%': { opacity: '0.55' },
          '50%': { opacity: '1' },
        },
        rise: {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fiber: 'fiber 2.4s linear infinite',
        blink: 'blink 1.6s ease-in-out infinite',
        scan: 'scan 4s linear infinite',
        glow: 'glow 3s ease-in-out infinite',
        rise: 'rise 0.7s cubic-bezier(0.2, 0.7, 0.2, 1) both',
      },
    },
  },
  plugins: [],
};
