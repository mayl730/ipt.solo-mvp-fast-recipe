/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero': "url('https://cdn.pixabay.com/photo/2017/10/04/09/56/laboratory-2815641_1280.jpg')",
      }
    },
    colors: {
      transparent: 'transparent',
      gray: {
        100: '#F5F5F5',
        200: '#D9D9D9',
      },
      black: {
        800: '#444444',
        900: '#000',
      },
      white: '#fff',
      orange: {
        100: '#FFA95B',
        200: '#FF871C',
      }, 
      lime: {
        500: '#84CC16',
      },
      rose: {
        500: '#F43F5E',
      },
      yellow: {
        100: '#FFE753',
      }
    },
    screens: {
      'tablet': '640px',
      // => @media (min-width: 640px) { ... }

      'desktop': '1024px',
      // => @media (min-width: 1280px) { ... }
    },
    fontFamily: {
      'montserrat': ['Montserrat', 'sans-serif'],
      'cabin': ['Cabin', 'sans-serif']
    }
  },
  plugins: [require('@tailwindcss/forms'),],
}
