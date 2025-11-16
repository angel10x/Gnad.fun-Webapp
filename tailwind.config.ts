
/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true, // optional but useful if overwriting old CSS
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
