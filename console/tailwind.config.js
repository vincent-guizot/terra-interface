/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './features/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        nature: {
          bg: '#FAF9F5',
          cream: '#F5EFEB',
          botanical: '#EDF4EE',
          forest: {
            DEFAULT: '#1B4332',
            dark: '#0F291E',
            light: '#2D6A4F',
            subtle: '#D8F3DC',
          },
          emerald: {
            DEFAULT: '#10B981',
            dark: '#059669',
            light: '#34D399',
            subtle: '#D1FAE5',
          },
          amber: {
            DEFAULT: '#F59E0B',
            subtle: '#FEF3C7',
          },
          sky: {
            DEFAULT: '#0284C7',
            subtle: '#E0F2FE',
          },
          terra: {
            DEFAULT: '#C26747',
            subtle: '#FCECE6',
          },
        },
      },
      fontFamily: {
        sans: ['Manrope', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'nature': '1rem',
        'nature-lg': '1.5rem',
      },
    },
  },
  plugins: [],
};
