/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  content: [
    "./index.html",
    "./src/client/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        buttonCalculator: ['Sriracha', ...defaultTheme.fontFamily.mono],
        comic: ['Luckiest Guy', ...defaultTheme.fontFamily.sans],
        digitalDisplay: ['"Chakra Petch"', ...defaultTheme.fontFamily.serif],
        elegant: ['Italianno', ...defaultTheme.fontFamily.serif],
        logCalculator: ['Oxanium', ...defaultTheme.fontFamily.sans],
        sketch: ['Rubik Doodle Shadow', ...defaultTheme.fontFamily.sans],
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

