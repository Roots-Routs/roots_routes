/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        green: {
          800: '#2D5016',
          700: '#3a6b1c',
          600: '#4a7c2a',
          500: '#5a8d38',
          400: '#6a9e46',
          300: '#7aaf54',
          200: '#8ac062',
          100: '#9ad170',
          50: '#aae27e'
        },
        amber: {
          400: '#D4AF37',
          300: '#dbb945',
          200: '#e2c353',
          100: '#e9cd61'
        },
        cream: {
          50: '#F5F5DC',
          100: '#f2f2d9',
          200: '#efefd6'
        }
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
};
