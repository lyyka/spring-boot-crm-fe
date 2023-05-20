const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.vue"],
  theme: {
    fontSize: {
      sm: '0.8rem',
      base: '1rem',
      xl: '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
    },
    extend: {
      colors: {
        primary: colors.slate['900'],
        secondary: colors.violet['800'],
      },

      fontSize: {
        h1: '3.052rem',
        h2: '2.441rem',
        h3: '1.953rem',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

