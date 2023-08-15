/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        myBlueFaded: '#00FDDE',
        myBlue: '#6387FF',
        myBlueDark: '#015092',
        myGray1: '#F0F3F6',
        myGray2: '#EDF0F5',
        myGray3: '#D0D3E3',
        myPink: '#FE5E76',
        hoverBg: '#F7F8FA',
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
}
