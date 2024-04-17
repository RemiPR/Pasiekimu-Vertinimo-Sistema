import { defineStore } from "pinia";
import TestView from "@/components/admin-dashboard-content/TestView/TestView.vue";
import LeaderboardView from "@/components/admin-dashboard-content/LeaderboardView.vue";
import StatsView from "@/components/admin-dashboard-content/StatsView.vue";
import TestDetails from "@/components/admin-dashboard-content/TestView/TestDetails.vue";

// stores/sidebar.js
export const useSidebarStore = defineStore("sidebar", {
  state: () => ({
    activeMenuItem: "Testai", // This should show 'TestView' initially
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
    selectTest(testId) {
      this.currentTest = testId;
      this.showTestDetails = true;
    },
    clearTest() {
      this.currentTest = null;
      this.showTestDetails = false;
    },
  },
  getters: {
    activeComponent: (state) => {
      const componentName = state.showTestDetails
        ? "TestDetails"
        : state.menuItemComponents[state.activeMenuItem];
      return componentName;
    },
  },
});
