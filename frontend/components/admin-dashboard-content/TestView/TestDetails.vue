<template>
  <div class="container mx-auto px-4 mb-2">
    <div
      class="flex justify-between items-center my-2 sticky top-0 z-10 bg-white py-9"
    >
      <button
        @click="backToTestList"
        class="testai-link flex items-center gap-2"
      >
        <span class="icon">🔙</span>
        <!-- Replace with an actual icon -->
        <span>Testai ></span>
        <span class="font-bold">{{ test.name }}</span>
      </button>

      <pre>{{ test }}</pre>

      <div class="flex items-center">
        <div class="relative mr-6">
          <div
            class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
          >
            <MagnifyingGlassIcon class="h-5 w-5 text-gray-500" />
          </div>
          <input
            v-model="searchQuery"
            @input="filterTests"
            type="search"
            placeholder="Ieškoti..."
            class="w-72 pl-10 pr-3 py-2 rounded-md border border-gray-300 shadow-sm text-gray-600 font-medium focus:ring-0 focus:border-black hover:border-blue-500 focus:outline-none transition-colors duration-200"
          />
        </div>
      </div>
    </div>

    <!-- Individual test content -->
    <div class="test-content">
      <div
        v-for="(question, index) in test.questions"
        :key="question._id"
        class="mb-4 p-4 border rounded shadow"
      >
        <h3 class="text-lg font-semibold">
          Question {{ index + 1 }}: {{ question.text }}
        </h3>
        <ul>
          <li
            v-for="(answer, aIndex) in question.answers"
            :key="aIndex"
            class="mt-2"
          >
            <label>
              <input
                type="checkbox"
                v-model="answer.correct"
                :disabled="true"
              />
              {{ answer.text }}
            </label>
          </li>
        </ul>
      </div>
    </div>
    <!-- Comfirm Delete test modal -->
    <div
      v-if="showDeleteConfirmation"
      class="fixed inset-0 z-50 bg-gray-900 bg-opacity-50 flex justify-center items-center"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
        <h2 class="text-xl font-semibold mb-4">Patvirtinti ištrynimą</h2>
        <p class="mb-6">
          Ar jūs tikrai norite ištrinti testą:
          <strong>{{ currentTestName }}</strong
          >?
        </p>
        <div class="flex justify-end space-x-4">
          <button
            @click="cancelDelete"
            class="px-5 py-2 text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300"
          >
            Atšaukti
          </button>
          <button
            @click="confirmDelete"
            class="px-5 py-2 text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600"
          >
            Ištrinti
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import { useSidebarStore } from "@/stores/sidebar";
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline"; // Ensure this import if you use it in the template

export default defineComponent({
  props: {
    test: {
      type: Object,
      required: true,
    },
  },
  components: {
    MagnifyingGlassIcon,
  },
  setup(props) {
    const sidebarStore = useSidebarStore();
    // const searchQuery = ref("");
    // const showDeleteConfirmation = ref(false);

    // Example of adding and removing questions, add methods accordingly
    const filteredQuestions = computed(() => {
      return props.test.questions.filter((q) =>
        q.text.includes(searchQuery.value)
      );
    });

    function backToTestList() {
      sidebarStore.clearTest();
    }

    function addQuestion() {
      // Implement adding a question
    }

    function removeQuestion(index) {
      // Implement removing a question
    }

    function addAnswer(questionIndex) {
      // Implement adding an answer to a specific question
    }

    function removeAnswer(questionIndex, answerIndex) {
      // Implement removing an answer
    }

    function confirmDelete() {
      // Implement deletion confirmation logic
    }

    function cancelDelete() {
      showDeleteConfirmation.value = false;
    }

    return {
      backToTestList,
      // searchQuery,
      // showDeleteConfirmation,
      // filteredQuestions,
      addQuestion,
      removeQuestion,
      addAnswer,
      removeAnswer,
      confirmDelete,
      cancelDelete,
    };
  },
});
</script>
