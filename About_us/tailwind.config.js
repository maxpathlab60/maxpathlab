 {import('tailwindcss').Config} 
const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  content: ["*.html"],
  theme: {
    extend: {
      
      fontFamily: {
        ptsans: ['"PT Sans"', ...defaultTheme.fontFamily.sans]
      },
      backgroundImage: {
        'banner-mbl': "url('https://uat-cdn.drlallab.com/2021-07/about-banner-mbl.jpg')",
        'banner-desk': "url('https://uat-cdn.drlallab.com/2022-12/about-banner-desk.png')",
        'values-bg-img':"url(	https://uat-cdn.drlallab.com/images/bg-img2-light.jpg)",
      },
      backgroundColor:{
        'div-yellow':"rgb(254,204,78)",
        'red-bd':"rgb(255,0,0)",
      },
      color:{
        'red-bd':"rgb(255,0,0)"
      },
      height: {
        '128': '32rem',
      },
      borderColor: theme=>({
        ...theme('colors'),
        'yellow-bd':"rgb(254,204,78)",
        'red-bd':"rgb(255,0,0)",
      }),
      

    },
  },
  plugins: [],
}

