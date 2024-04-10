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
        // Admin dashboard
        navbarText: "#eff7f9",
        dashboard: "rgba(20, 121, 255, 0.03)",
        dashboardBtn: "#2c6878",
        strongBlue: "#0056b3",
      },
      fontFamily: {
        montserrat: ["Montserrat"],
      },
      // Custom shadow for icons in the sidebar
      boxShadow: {
        "icon-shadow":
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};
