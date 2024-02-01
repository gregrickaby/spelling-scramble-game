/* eslint-env node */
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.vue'],
  theme: {
    extend: {}
  },
  plugins: [require('@tailwindcss/typography')]
}
