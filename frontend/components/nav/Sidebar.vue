<script setup>
import { useSidebarStore } from "@/stores/sidebar";
import {
  DocumentIcon,
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
  <aside class="w-64 min-h-screen sticky top-0" aria-label="Sidebar">
    <div class="flex justify-center px-4 py-8">
      <img
        src="@/static/shared/kvk-logo.svg"
        alt="Logo"
        class="h-16 w-auto cursor-pointer hover:scale-105 duration-300"
      />
    </div>
    <nav class="mt-12">
      <ul class="space-y-3">
        <li v-for="item in menuItems" :key="item.text" class="group">
          <a
            href="#"
            @click.prevent="selectMenuItem(item)"
            :tabindex="0"
            class="flex items-center space-x-4 p-3 m-4 rounded-lg"
            :class="{
              'text-strongBlue': sidebarStore.activeMenuItem === item.text,
            }"
          >
            <div
              class="p-1 rounded-full transition-transform duration-300"
              :class="{
                'bg-blue-100 shadow-lg':
                  sidebarStore.activeMenuItem === item.text,
                'scale-125': sidebarStore.activeMenuItem === item.text,
              }"
            >
              <component
                :is="item.icon"
                class="h-6 w-6"
                :class="{
                  'text-sidebarActiveBg group-hover:text-blue-500':
                    sidebarStore.activeMenuItem !== item.text,
                  'text-strongBlue': sidebarStore.activeMenuItem === item.text,
                }"
              />
            </div>
            <span
              class="text-base font-medium"
              :class="{
                'group-hover:text-blue-500 text-lg':
                  sidebarStore.activeMenuItem !== item.text,
                'text-strongBlue font-bold text-xl':
                  sidebarStore.activeMenuItem === item.text,
              }"
              >{{ item.text }}</span
            >
          </a>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<style scoped></style>
