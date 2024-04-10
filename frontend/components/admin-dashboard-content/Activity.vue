<template>
  <div
    class="max-h-[500px] overflow-hidden bg-white rounded-lg border shadow p-4 sticky top-0 z-10"
  >
    <div class="flex justify-between items-center mb-4">
      <div class="p-5">
        <h2 class="font-bold text-xl mb-4">Naujienos</h2>
        <p>Jonas Jonaitis įveikė testą "Leetcode1" per 28 minutes!</p>
        <p>12</p>
        <p>123</p>
        <p>1234</p>
        <p>12345</p>
        <p>1234567</p>
        <p>12345678</p>
        <p>123456789</p>
        <p>Overflow content</p>
        <p>123</p>
        <p>Overflow</p>
      </div>
    </div>
    <div class="overflow-auto">
      <button
        @click="toggleExpand"
        class="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        {{ expanded ? "Show Less" : "Show More" }}
      </button>
    </div>
  </div>
</template>

<script>
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
  },
};
</script>
