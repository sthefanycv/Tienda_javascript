/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {

      fontFamily: {
        sans: ['Mollen Personal Use-Regular','sans-serif' ],
        
      },

      colors: {
        'brand-color': '#272727', // Define tu color personalizado
        'brand-color-2': '#F4F4F4',
        },

    },
  },
  plugins: [],
}