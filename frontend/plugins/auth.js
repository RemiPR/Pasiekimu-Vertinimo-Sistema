// plugins/auth.js
import { useAuthStore } from "~/stores/auth"; // Adjust the path if necessary

export default defineNuxtPlugin((nuxtApp) => {
  if (process.client) {
    const authStore = useAuthStore();
    const token = localStorage.getItem("token");
    authStore.authenticate(!!token);
  }
});
