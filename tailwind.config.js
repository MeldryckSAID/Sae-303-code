module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      "colors": {
        'bg': '#E7F8F1 '
      },
      "fontFamily": {
        'Roboto': ['Roboto', 'sans-serif']
      },
      fontSize: {
        'test': 'calc(32.57143px + 1.07143vw)'
      },
      "screens": {
        "big": '1700px'
      },
    },

  },
  plugins: [],
}
