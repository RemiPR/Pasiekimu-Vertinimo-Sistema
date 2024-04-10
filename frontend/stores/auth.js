// store/auth.js
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthenticated: false,
  }),
  actions: {
    authenticate(payload) {
      this.isAuthenticated = payload;
    },
  },
});
