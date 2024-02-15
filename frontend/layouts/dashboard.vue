<template>
  <div class="flex h-screen bg-gray-100">
    <Sidebar />
    <div class="flex flex-col flex-grow">
      <LanguageToggler />
      <main class="flex-grow overflow-auto">
        <NuxtPage />
      </main>
    </div>
  </div>
</template>

<script setup>
import Sidebar from "@/components/nav/Sidebar.vue";
import LanguageToggler from "@/components/nav/LanguageToggler.vue";
</script>

<style>
/* Global styles if necessary */
</style>
