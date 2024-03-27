<script setup>
import { computed } from "vue";
import { useSidebarStore } from "@/stores/sidebar";
import ActivityCard from "@/components/ActivityCard.vue";
import TestView from "@/components/dashboard/TestaiView.vue";
import QuestionView from "@/components/dashboard/KlausimaiView.vue";
import LeaderboardView from "@/components/dashboard/TopStudentaiView.vue";
import StatsView from "@/components/dashboard/StatistikosView.vue";

const sidebarStore = useSidebarStore();

const activeComponent = computed(() => {
  switch (sidebarStore.activeMenuItem) {
    case "Testai":
      return TestView;
    case "Klausimai":
      return QuestionView;
    case "Top studentai":
      return LeaderboardView;
    case "Statistikos":
      return StatsView;
    default:
      return TestView;
  }
});
</script>
<template>
  <div class="flex h-screen bg-dashboardBg">
    <Sidebar />
    <div class="flex flex-col flex-grow">
      <LanguageToggler class="bg-dashboardBg" />
      <main class="flex-grow overflow-auto">
        <component :is="activeComponent" />
        <ActivityCard />
      </main>
    </div>
  </div>
</template>
