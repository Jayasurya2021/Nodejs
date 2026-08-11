/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        clin: {
          blue: '#1E3A8A',
          light: '#E0E7FF',
          gray: '#F3F4F6',
          dark: '#111827'
        }
      }
    },
  },
  plugins: [],
}
