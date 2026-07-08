/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        primary: '#111111',
        secondary: '#666666',
        accent: '#0f172a',
        border: '#ececec',
        background: '#ffffff',
        'dark-bg': '#090909',
        'button-hover': '#000000',
        text: '#111111',
      },
      letterSpacing: {
        premium: '0.1em',
        widest: '0.25em',
      },
    },
  },
  plugins: [],
}
