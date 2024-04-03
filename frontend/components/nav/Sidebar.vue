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
  <aside class="w-64 h-full bg-navbar text-navbarText" aria-label="Sidebar">
    <div class="flex justify-center px-4 py-8">
      <img
        src="@/static/shared/kvk-white-logo.png"
        alt="Logo"
        class="h-14 w-auto cursor-pointer hover:scale-105"
      />
    </div>
    <nav class="mt-12">
      <ul class="space-y-3">
        <li v-for="item in menuItems" :key="item.text" class="group">
          <a
            href="#"
            @click.prevent="selectMenuItem(item)"
            class="flex items-center space-x-4 p-3 m-6 rounded-lg hover:bg-sidebarHoverBg"
            :class="{
              'bg-sidebarActiveBg': sidebarStore.activeMenuItem === item.text,
              'focus:outline-none': sidebarStore.activeMenuItem !== item.text,
              'focus:ring focus:ring-sidebarRing':
                sidebarStore.activeMenuItem === item.text,
            }"
          >
            <component :is="item.icon" class="h-6 w-6" />
            <span class="text-base font-medium">{{ item.text }}</span>
          </a>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<style scoped>
.bg-sidebarHoverBg {
  background-color: #34495e;
}

.bg-sidebarFocusBg {
  background-color: #2c3e50;
}

.bg-sidebarActiveBg {
  background-color: #1abc9c;
}

.focus\:ring-sidebarRing {
  box-shadow: 0 0 0 2px #1abc9c;
}
</style>
