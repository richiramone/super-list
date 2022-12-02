/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#009dff',
        'item-is-duplicated': '#223889',
        'item-is-anna': '#ff0099',
        'item-has-question-mark': '#ff6a00 !important',
        'cancel-button-border': '#008ce3',
        modal: 'rgba(0,0,0,.5)',
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
};
