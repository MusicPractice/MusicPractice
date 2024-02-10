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
    },
  },
  plugins: [],
}

