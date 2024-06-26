// middleware/auth.js
import { useAuthStore } from "~/stores/auth"; // Adjust the path if necessary

export default defineNuxtRouteMiddleware((to, from) => {
  // Directly accessing localStorage won't work with SSR as it's not available server-side
  if (process.client) {
    const token = localStorage.getItem("token");
    if (to.path.startsWith("/admin") && !token) {
      return navigateTo("/");
    }
  }
});
