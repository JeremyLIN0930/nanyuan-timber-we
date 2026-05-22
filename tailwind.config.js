/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'metal-brown': '#C5A880',
        'obsidian': '#050505',
        'titanium': '#0D0D0E',
        'off-white': '#F5F5F7',
        'wood-brown': '#8B5A2B',
        'earth-light': '#E8E1D9',
        'earth-dark': '#A69B8D',
        'dark-blue': '#1C2833',
        'dark-gray': '#333333',
        'text-main': '#FFFFFF',
        'text-muted': 'rgba(255,255,255,0.5)',
        'bg-color': '#050505',
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans TC', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
