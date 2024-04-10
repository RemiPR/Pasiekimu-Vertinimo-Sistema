// Example using Pinia for Vuex store in Nuxt 3
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthenticated: false,
  }),
  actions: {
    authenticate(isAuth) {
      this.isAuthenticated = isAuth;
    },
  },
});
