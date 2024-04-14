<template>
  <NuxtLayout></NuxtLayout>
</template>

<script setup>
import { onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { definePageMeta } from "#imports";

definePageMeta({
  layout: "dashboard",
  middleware: ["auth"],
});

const router = useRouter();

onBeforeMount(() => {
  const token = localStorage.getItem("token"); // Or use cookies if you need SSR compatibility
  if (!token) {
    router.push("/"); // Redirect to login if no token is found
  }
  // Further token validation logic can be added here if needed
});
</script>
