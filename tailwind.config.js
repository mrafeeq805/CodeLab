/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary : "rgba(84, 41, 255, 1)",
        light : "rgba(84, 41, 255, 0.1)",
        gray_main : "rgba(0, 0, 0, 0.7)"
      }
    },
  },
  plugins: [],
}