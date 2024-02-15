<script setup>
import { useSidebarStore } from "@/stores/sidebar";
import TestaiComponent from "@/components/TestaiComponent.vue";
import KlausimaiComponent from "@/components/KlausimaiComponent.vue";
// ... import other components

const sidebarStore = useSidebarStore();

const componentsMap = {
  Testai: TestaiComponent,
  Klausimai: KlausimaiComponent,
  // ... other mappings
};

const ActiveComponent = computed(() => {
  return componentsMap[sidebarStore.activeMenuItem] || null;
});
</script>

<template>
  <div class="flex-grow">
    <component :is="ActiveComponent" />
  </div>
</template>
