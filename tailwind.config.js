module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      '2xl': { max: '1535px' },
      xl: { max: '1366px' },
      lg: { max: '1024px' },
      md: { max: '768px' },
      sm: { max: '640px' },
      xs: { max: '450px' },
      xxs: { max: '320px' },
    },
    extend: {
      fontSize: {
        xxs: '0.65rem',
      },
      colors: {
        darkGreen: '#006D38',
        lightGreen: '#8DC63F',
        mainGreen1: '#0BA360',
        mainGreen2: '#3CBA92',
        purple: '#11074E'
      },
      boxShadow: {
        main: '3px 3px 10px -2px rgba(0, 0, 0, 0.2)',
      }
    },
  },
  plugins: [],
}
