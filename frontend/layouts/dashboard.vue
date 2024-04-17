<template>
  <div class="flex h-screen">
    <Sidebar class="w-64 shadow-lg z-10" />
    <div class="flex-1 flex flex-col overflow-auto bg-dashboard min-h-screen">
      <LanguageToggler class="p-3 z-10" />
      <main class="flex-1 my-20 mx-12">
        <div class="flex space-x-6 items-start">
          <div class="flex-auto bg-white rounded-lg border shadow-lg p-4">
            <component
              :is="activeComponent"
              :test="store.currentTest"
              :key="activeComponent.name"
            />
          </div>
          <Activity />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import Sidebar from "@/components/nav/Sidebar.vue";
import LanguageToggler from "@/components/nav/LanguageToggler.vue";
import Activity from "@/components/admin-dashboard-content/Activity.vue";
import TestView from "@/components/admin-dashboard-content/TestView/TestView.vue";
import TestDetails from "@/components/admin-dashboard-content/TestView/TestDetails.vue";
import LeaderboardView from "@/components/admin-dashboard-content/LeaderboardView.vue";
import StatsView from "@/components/admin-dashboard-content/StatsView.vue";
import { useSidebarStore } from "@/stores/sidebar";

const store = useSidebarStore();
const componentsMap = {
  TestView,
  TestDetails,
  LeaderboardView,
  StatsView,
};
const activeComponent = computed(() => componentsMap[store.activeComponent]);
</script>
