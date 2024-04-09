// stores/sidebar.js
import { defineStore } from "pinia";

export const useSidebarStore = defineStore("sidebar", {
  state: () => ({
    activeMenuItem: "Testai", // Default active menu item
    // Add a mapping of menu items to component names
    menuItemComponents: {
      Testai: "TestView",
      "Top studentai": "LeaderboardView",
      Statistikos: "StatsView",
    },
  }),
  actions: {
    setActiveMenuItem(item) {
      this.activeMenuItem = item;
    },
  },
  getters: {
    activeComponent: (state) => {
      // This will map the active menu item to a component name
      return state.menuItemComponents[state.activeMenuItem];
    },
  },
});
