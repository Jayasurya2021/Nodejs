/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        bg: {
          DEFAULT: '#050a0f',
          2: '#0a1520',
          3: '#0f1e2e',
        },
        accent: {
          DEFAULT: '#00d4ff',
          2: '#0088cc',
          3: '#00ff99',
        },
        muted: '#6b8fa8',
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
        blink: 'blink 1.1s step-end infinite',
        fadeDown: 'fadeDown 0.8s ease both',
        fadeUp: 'fadeUp 0.9s ease both',
      },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        blink: { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0' } },
        fadeDown: { from: { opacity: '0', transform: 'translateY(-16px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        fadeUp: { from: { opacity: '0', transform: 'translateY(24px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
};

