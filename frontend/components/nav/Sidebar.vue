<script setup>
import { useSidebarStore } from "@/stores/sidebar";
import {
  DocumentIcon,
  QuestionMarkCircleIcon,
  TrophyIcon,
  ChartBarIcon,
} from "@heroicons/vue/24/outline";

const sidebarStore = useSidebarStore();
const menuItems = [
  {
    text: "Testai",
    icon: DocumentIcon,
  },
  {
    text: "Klausimai",
    icon: QuestionMarkCircleIcon,
  },
  {
    text: "Top studentai",
    icon: TrophyIcon,
  },
  {
    text: "Statistikos",
    icon: ChartBarIcon,
  },
];

function selectMenuItem(item) {
  sidebarStore.setActiveMenuItem(item.text);
}
</script>

<template>
  <aside class="w-64 h-full bg-white" aria-label="Sidebar">
    <div class="flex justify-center px-4 py-8">
      <img
        src="@/static/shared/kvk-logo.svg"
        alt="Logo"
        class="h-14 w-auto cursor-pointer"
      />
    </div>
    <nav class="mt-12">
      <ul class="grid flex-col justify-center items-center gap-14">
        <li
          v-for="item in menuItems"
          :key="item.text"
          class="flex items-center"
        >
          <a
            @click.prevent="selectMenuItem(item)"
            class="flex items-center space-x-5"
          >
            <div class="flex items-center">
              <component :is="item.icon" class="h-7 w-7" />
            </div>
            <span class="text-lg">{{ item.text }}</span>
          </a>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<style>
/* Here you can add global styles for your sidebar, if necessary */
</style>
