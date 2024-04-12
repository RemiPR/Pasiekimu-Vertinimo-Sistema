// stores/sidebar.js
import { defineStore } from "pinia";
import TestView from "@/components/admin-dashboard-content/TestView/TestView.vue";
import LeaderboardView from "@/components/admin-dashboard-content/LeaderboardView.vue";
import StatsView from "@/components/admin-dashboard-content/StatsView.vue";
import TestDetails from "@/components/admin-dashboard-content/TestView/TestDetails.vue"; // Import your TestDetails component

export const useSidebarStore = defineStore("sidebar", {
  state: () => ({
    activeMenuItem: "Testai", // Default active menu item
    currentTest: null,
    showTestDetails: false,
    menuItemComponents: {
      Testai: "TestView",
      "Top studentai": "LeaderboardView",
      Statistikos: "StatsView",
    },
  }),
  actions: {
    setActiveMenuItem(item) {
      this.activeMenuItem = item;
      this.currentTest = null;
      this.showTestDetails = false;
    },
    selectTest(test) {
      this.currentTest = test;
      this.showTestDetails = true;
    },
    clearTest() {
      this.currentTest = null;
      this.showTestDetails = false;
    },
  },
  getters: {
    activeComponent: (state) => {
      // Return the component objects instead of strings
      const componentMap = {
        Testai: TestView,
        "Top studentai": LeaderboardView,
        Statistikos: StatsView,
        TestDetails: TestDetails, // Make sure to map this correctly
      };
      if (state.showTestDetails) {
        return TestDetails; // Directly return the imported component object
      } else {
        return componentMap[state.activeMenuItem];
      }
    },
  },
});
