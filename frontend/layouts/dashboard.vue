<script setup>
import { computed } from "vue";
import Sidebar from "@/components/nav/Sidebar.vue";
import LanguageToggler from "@/components/nav/LanguageToggler.vue";
import { useSidebarStore } from "@/stores/sidebar";

// Import view components
import TestView from "@/components/admin-dashboard-content/TestView/TestView.vue";
import LeaderboardView from "@/components/admin-dashboard-content/LeaderboardView.vue";
import StatsView from "@/components/admin-dashboard-content/StatsView.vue";
import Activity from "@/components/admin-dashboard-content/Activity.vue";
import Welcome from "@/components/admin-dashboard-content/TestView/Welcome.vue";

const store = useSidebarStore();
const activeComponent = computed(() => {
  const components = {
    Testai: TestView,
    "Top studentai": LeaderboardView,
    Statistikos: StatsView,
  };
  return components[store.activeMenuItem];
});
</script>

<template>
  <div class="flex h-screen">
    <Sidebar class="w-64 shadow-lg z-10" />
    <div class="flex-1 flex flex-col overflow-auto bg-dashboard min-h-screen">
      <LanguageToggler class="p-3 z-10" />
      <main class="flex-1 my-20 mx-12">
        <div class="flex space-x-6 items-start">
          <div class="flex-auto bg-white rounded-lg border shadow-lg p-4">
            <component :is="activeComponent" />
          </div>
          <Activity />
          <Welcome />
        </div>
      </main>
    </div>
  </div>
</template>
