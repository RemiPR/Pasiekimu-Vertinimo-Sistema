<template>
  <transition
    enter-active-class="ease-out duration-300"
    enter-from-class="opacity-0 scale-95"
    enter-to-class="opacity-100 scale-100"
    leave-active-class="ease-in duration-200"
    leave-from-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-95"
  >
    <div
      class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center px-4 py-20"
      v-if="showModal"
    >
      <div
        class="bg-white rounded-lg shadow-xl max-w-md mx-auto p-8 transform transition-all"
      >
        <h2 class="text-gray-900 font-bold text-2xl mb-12">
          Slaptažodžio atstatymas
        </h2>
        <p class="mb-4">Slaptažodžio atstatymo funkcija yra išjungta.</p>
        <p class="mb-6">
          Jei norite atstatyti slaptažodį, prašome susisiekti su sistemos
          administratoriumi:
        </p>
        <div class="flex items-center justify-start mb-6">
          <a
            href="mailto:rem.prialgauskis@kvkedu.lt"
            class="text-blue-600 hover:text-blue-800 transition-colors duration-300 flex items-center mb-6"
          >
            rem.prialgauskis@kvkedu.lt
          </a>
        </div>
        <button
          @click="close"
          class="w-full py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transition ease-in-out duration-300"
        >
          Supratau
        </button>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["close"]);

const showModal = ref(true);

function close() {
  showModal.value = false;
  emit("close");
}
</script>
