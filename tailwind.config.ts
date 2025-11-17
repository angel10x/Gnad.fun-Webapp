
/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  darkMode: ['class', 'class'],
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'light-bg': '#ffffff',
        'light-surface': '#f5f5f5',
        'light-text': '#1a1a1a',
      },
    },
  },
  plugins: [],
}
