/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#c6f462',
        'background-light': '#f7f8f6',
        'background-dark': '#1c2210',
        'agency-dark': '#093A29',
        'brand': {
          'dark-green': '#093A29',
          'lime': '#c6f462',
          'gray-light': '#EAEAEA'
        }
      },
      fontFamily: {
        'display': ['Manrope', 'sans-serif'],
        'sans': ['Manrope', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
