/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['"Space Grotesk"', 'system-ui', 'sans-serif'], display: ['Syne', 'sans-serif'] },
      colors: { bg: '#0b0d17', cy: '#00e5ff', vi: '#a855f7', mut: '#8b90b3' },
    },
  },
  plugins: [],
}
