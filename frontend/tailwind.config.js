/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        navbar: "#286575",
        navbarText: "#eff7f9",
        dashboardBg: "#e0eef1",
        dashboardBtn: "#2c6878",
      },
    },
  },
  plugins: [],
};
