<template>
  <div
    class="max-h-[500px] overflow-hidden bg-white rounded-lg border shadow p-4 sticky top-0 z-10"
  >
    <div class="flex justify-between items-center mb-4">
      <div class="p-5 space-y-2">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold text-gray-900">Naujienos</h2>
          <a
            href="#"
            @click.prevent="logout"
            class="text-gray-600 font-semibold transition duration-150 ease-in-out hover:underline focus:outline-none hover:text-blue-500"
            role="button"
            aria-label="Atsijungti"
            >Atsijungti</a
          >
        </div>
        <p>Jonas Jonaitis įveikė testą "Leetcode1" per 28 minutes!</p>
        <p>Petras Petraitis įveikė testą "Leetcode15" per 59 minutes!</p>
        <p>Lukas Lukaitis įveikė testą "Leetcode1" per 243 minutes!</p>
        <p>Vardenis Pavardenis įveikė testą "Leetcode1" per 8 minutes!</p>
        <p>Linas Linaitis įveikė testą "Leetcode1" per 42 minutes!</p>
        <p>Romas Romaitis įveikė testą "Leetcode1" per 69 minutes!</p>
        <p>Marius Maraitis įveikė testą "Leetcode1" per 52 minutes!</p>
        <p>Jurgis Jurgaitis įveikė testą "Leetcode1" per 56 minutes!</p>
      </div>
    </div>
    <div class="flex justify-center items-center overflow-auto">
      <button
        @click="toggleExpand"
        class="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        {{ expanded ? "Rodyti mažiau" : "Rodyti daugiau" }}
      </button>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "~/stores/auth";

export default {
  data() {
    return {
      expanded: false,
    };
  },
  methods: {
    toggleExpand() {
      this.expanded = !this.expanded;
    },
    async logout() {
      try {
        // Call your backend to logout
        await fetch("http://localhost:3001/api/auth/logout", {
          method: "POST",
          credentials: "include",
        });

        // Clear localStorage
        localStorage.removeItem("token");

        // Use the store
        const authStore = useAuthStore();
        authStore.authenticate(false);

        // Redirect to the homepage
        this.$router.push("/");
      } catch (error) {
        console.error("Logout failed:", error);
      }
    },
  },
};
</script>
