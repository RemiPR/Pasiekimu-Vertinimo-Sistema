<template>
  <div
    class="flex flex-col bg-white rounded-lg border shadow p-4 sticky top-0 z-10"
  >
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-bold text-gray-900">Sveiki!</h2>
      <a
        href="#"
        @click.prevent="logout"
        class="text-gray-600 font-semibold transition duration-150 ease-in-out hover:underline focus:outline-none hover:text-blue-500"
        role="button"
        aria-label="Atsijungti"
        >Atsijungti</a
      >
    </div>
    <img
      src="@/static/dashboard/welcome.gif"
      alt="Welcome"
      class="mx-auto mb-6 h-44 w-44"
    />
    <p class="text-gray-700 text-xl">
      Jūs esate sukūrę <span class="font-semibold">6</span> testus.
    </p>
  </div>
</template>

<script>
import { useAuthStore } from "~/stores/auth";

export default {
  methods: {
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
