/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {

    },
    colors: {
      'wood-white': '#fff0d3',
      'wood-light': '#efaf79',
      'wood': '#e9905a',
      'wood-deep': '#9d442c',
      'wood-dark': '#38191f',
      'allogenes-light': '#f4efe7',
      'allogenes': '#ebe4d8',
      'allogenes-dark': '#d4bc8d',
      'allogenes-deep': '#7f6040',
      'red': '#a82e2e',
      'yellow': '#a8a22e',
      'green': '#48a82e',
      'red-light': '#e59292',
      'yellow-light': '#e7e398',
      'green-light': '#abe89b',
      'gray': '#858585',
      'black': '#101010',
      'white': '#f6f6f6'
    },
  },
  plugins: [],
}

