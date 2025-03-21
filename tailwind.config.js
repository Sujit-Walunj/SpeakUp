// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        scrollbar: {
          thumb: '#888',
          track: '#f1f1f1',
          thumbHover: '#555',
        },
      },
    },
  },
  plugins: [
    function({ addUtilities, e, theme }) {
      const scrollbarStyles = theme('colors.scrollbar', {});
      const newUtilities = Object.entries(scrollbarStyles).reduce((acc, [key, value]) => {
        acc[`.${e(`scrollbar-${key}`)}::-webkit-scrollbar`] = { width: '8px' };
        acc[`.${e(`scrollbar-${key}`)}::-webkit-scrollbar-track`] = { background: value.track || 'transparent' };
        acc[`.${e(`scrollbar-${key}`)}::-webkit-scrollbar-thumb`] = { background: value.thumb || 'transparent' };
        acc[`.${e(`scrollbar-${key}`)}::-webkit-scrollbar-thumb:hover`] = { background: value.thumbHover || 'transparent' };
        return acc;
      }, {});
      
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
};
