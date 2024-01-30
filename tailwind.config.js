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
        logCalculator: ['Oxanium', ...defaultTheme.fontFamily.sans],
        digitalDisplay: ['"Chakra Petch"', ...defaultTheme.fontFamily.serif],
        buttonCalculator: ['Sriracha', ...defaultTheme.fontFamily.mono],
        comic: ['Luckiest Guy', ...defaultTheme.fontFamily.sans],
        elegant: ['Italianno', ...defaultTheme.fontFamily.serif]
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

