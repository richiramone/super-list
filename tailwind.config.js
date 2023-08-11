/** @type {import('tailwindcss').Config} */

const withMT = require('@material-tailwind/react/utils/withMT');

module.exports = withMT({
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#00bcd4',
        old_primary: '#009dff',
        'item-is-duplicated': '#223889',
        'item-is-anna': '#ff0099',
        'item-has-question-mark': '#ff6a00 !important',
        'cancel-button-border': '#008ce3',
        modal: 'rgba(0,0,0,.5)',
        checkbox: '#2196f3',
      },
    },
  },
  plugins: [],
  fontFamily: {
    sans: [
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Oxygen',
      'Ubuntu',
      'Cantarell',
      'Fira Sans',
      'Droid Sans',
      'Helvetica Neue',
      'sans-serif',
    ],
  },
});
