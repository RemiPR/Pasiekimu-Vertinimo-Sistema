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
        <span>Testai ></span>
        <span class="font-bold">{{ test.name }}</span>
      </button>

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
      <draggable
        v-model="state.testDetails.questions"
        @end="onEndDragQuestion"
        tag="ul"
      >
        <template v-slot:item="{ element, index }">
          <li :key="element._id" class="question">
            <h3 class="text-lg font-semibold">
              Question {{ index + 1 }}: {{ element.text }}
            </h3>
            <ul>
              <li
                v-for="(answer, aIndex) in element.answers"
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
          </li>
        </template>
      </draggable>
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
import draggable from "vuedraggable";
import { defineComponent, ref, computed, reactive } from "vue";
import { useSidebarStore } from "@/stores/sidebar";
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";

export default defineComponent({
  props: {
    test: {
      type: Object,
      required: true,
    },
  },
  components: {
    MagnifyingGlassIcon,
    draggable,
  },
  setup(props) {
    const sidebarStore = useSidebarStore();
    const state = reactive({
      searchQuery: "",
      showDeleteConfirmation: false,
      // The following line is necessary to make a deep reactive copy of the test prop
      testDetails: JSON.parse(JSON.stringify(props.test)),
    });

    const filteredQuestions = computed(() => {
      return state.testDetails.questions.filter((q) =>
        q.text.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    });

    const backToTestList = () => {
      sidebarStore.clearTest();
    };

    const addQuestion = async () => {
      const newQuestionData = {
        text: "Your new question text",
        answers: [{ text: "Answer 1", correct: true }],
      };

      try {
        const response = await fetch(
          `http://localhost:3001/api/tests/${state.testDetails._id}/questions`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newQuestionData),
          }
        );

        const addedQuestion = await response.json();

        if (!response.ok) throw new Error(addedQuestion.message);

        state.testDetails.questions.push(addedQuestion);
      } catch (error) {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      }
    };

    const removeQuestion = async (questionId) => {
      if (!confirm("Are you sure you want to delete this question?")) return;

      try {
        const response = await fetch(
          `http://localhost:3001/api/tests/${state.testDetails._id}/questions/${questionId}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) throw new Error("Network response was not ok.");

        // Assuming the backend sends back the ID of the deleted question
        const { deletedQuestionId } = await response.json();
        state.testDetails.questions = state.testDetails.questions.filter(
          (q) => q._id !== deletedQuestionId
        );
      } catch (error) {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      }
    };

    const addAnswer = async (questionId) => {
      const newAnswerData = {
        text: "New answer text",
        correct: false,
      };

      try {
        const response = await fetch(
          `http://localhost:3001/api/tests/${state.testDetails._id}/questions/${questionId}/answers`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newAnswerData),
          }
        );

        if (!response.ok) throw new Error("Network response was not ok.");

        const { updatedQuestion } = await response.json();
        const questionIndex = state.testDetails.questions.findIndex(
          (q) => q._id === questionId
        );
        if (questionIndex !== -1) {
          state.testDetails.questions[questionIndex] = updatedQuestion;
        }
      } catch (error) {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      }
    };

    const removeAnswer = async (questionId, answerId) => {
      if (!confirm("Are you sure you want to delete this answer?")) return;

      try {
        const response = await fetch(
          `http://localhost:3001/api/tests/${state.testDetails._id}/questions/${questionId}/answers/${answerId}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) throw new Error("Network response was not ok.");

        // Assuming the backend sends back the ID of the deleted answer
        const { deletedAnswerId } = await response.json();
        const questionIndex = state.testDetails.questions.findIndex(
          (q) => q._id === questionId
        );
        if (questionIndex !== -1) {
          state.testDetails.questions[questionIndex].answers =
            state.testDetails.questions[questionIndex].answers.filter(
              (a) => a._id !== deletedAnswerId
            );
        }
      } catch (error) {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      }
    };

    const onEndDragQuestion = async () => {
      // Get the order of question IDs after drag-and-drop
      const orderedQuestionIds = state.testDetails.questions.map((q) => q._id);

      try {
        const response = await fetch(
          `http://localhost:3001/api/tests/${state.testDetails._id}/questions/order`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ orderedQuestionIds }),
          }
        );

        if (!response.ok) throw new Error("Network response was not ok.");

        console.log("Questions reordered successfully on the server.");
      } catch (error) {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      }
    };

    return {
      state,
      backToTestList,
      filteredQuestions,
      addQuestion,
      removeQuestion,
      addAnswer,
      removeAnswer,
      onEndDragQuestion,
    };
  },
});
</script>
