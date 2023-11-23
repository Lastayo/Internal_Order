/** @type {import('tailwindcss').Config} */
export default {

  css: [
    '@fortawesome/fontawesome-free/css/all.css',
  ],

  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

