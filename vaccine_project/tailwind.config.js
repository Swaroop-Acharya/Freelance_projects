/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-navy': '#070F2B',
        'custom-blue': '#1B1A55',
        'custom-light-blue': '#535C91',
        'custom-purple': '#9290C3',
      },
    },
  },
  plugins: [],
}