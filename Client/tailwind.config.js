/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors:{
        primary : "rgba(84, 41, 255, 1)",
        light : "rgba(84, 41, 255, 0.1)",
        gray_main : "rgba(0, 0, 0, 0.7)",
        login : "rgba(52, 64, 84, 1)",
        login_light : "rgba(102, 112, 133, 1)"
      }
    },
  },
  
}