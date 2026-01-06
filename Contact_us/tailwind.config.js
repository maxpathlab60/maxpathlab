/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  content: ["./*.html"],
  theme: {
    extend: {
      fontFamily: {
        ptsans: ['"PT Sans"', ...defaultTheme.fontFamily.sans]
      },
      backgroundColor:{
        'div-yellow':"rgb(254,204,78)",
        'red-bd':"rgb(255,0,0)",
      },
    },
  },
  plugins: [],
}

