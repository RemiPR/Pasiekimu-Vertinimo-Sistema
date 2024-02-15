// stores/sidebar.js
import { defineStore } from "pinia";
// In your store

export const useSidebarStore = defineStore("sidebar", {
  state: () => ({
    activeMenuItem: "Testai", // Default active menu item
  }),
  actions: {
    setActiveMenuItem(item) {
      this.activeMenuItem = item;
    },
  },
});
console.log("Store accessed");
