<template>
  <div class="container mx-auto px-4 mb-2">
    <div
      class="flex justify-between items-center my-2 sticky top-0 z-10 bg-gray-50 py-9 px-4"
    >
      <div class="flex items-center gap-2 flex-1">
        <button @click="backToTestList" class="group flex items-center gap-2">
          <ArrowLeftIcon
            class="h-8 w-8 text-gray-500 group-hover:text-black my-auto"
          />
          <h1
            class="text-4xl font-semibold text-gray-400 shrink-0 mx-2 group-hover:text-black"
          >
            Testai
          </h1>
          <span class="text-4xl font-semibold text-gray-400 shrink-0 mx-2"
            >></span
          >
        </button>
        <h2
          class="flex-grow text-4xl font-bold min-w-0 whitespace-nowrap overflow-hidden text-ellipsis"
        >
          {{ test.name }}
        </h2>
      </div>

      <div class="flex items-center flex-1 justify-end">
        <div class="relative w-full max-w-xs">
          <div
            class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
          >
            <MagnifyingGlassIcon class="h-5 w-5 text-gray-500" />
          </div>
          <input
            v-model="searchQuery"
            type="search"
            placeholder="Ieškoti..."
            class="w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 shadow-sm text-gray-600 font-medium focus:ring-0 focus:border-black hover:border-blue-500 focus:outline-none transition-colors duration-200"
          />
        </div>
      </div>
    </div>

    <!-- Individual test content -->
    <div class="test-content py-4">
      <draggable
        class="dragArea space-y-12"
        v-model="state.testDetails.questions"
        item-key="_id"
      >
        <div
          v-for="(question, qIndex) in state.testDetails.questions"
          :key="question._id"
          class="bg-white rounded-lg shadow-lg p-6 w-full border"
        >
          <!-- Question Number and Drag Handle Row -->
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center">
              <span class="cursor-move text-gray-500 mr-2">:::</span>
              <h3 class="font-bold text-lg">Klausimas {{ qIndex + 1 }}:</h3>
            </div>
            <XMarkIcon
              @click="
                confirmDelete(
                  question._id,
                  'question',
                  `Question ${qIndex + 1}`
                )
              "
              class="h-6 w-6 text-red-500 hover:text-red-700 cursor-pointer"
            />
          </div>
          <!-- Question Text Input Row -->
          <textarea
            v-model="question.text"
            :ref="setTextareaRef"
            @blur="saveQuestion(question)"
            class="resize-none overflow-hidden w-full p-3 border h-12 rounded-md text-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          ></textarea>

          <!-- Draggable for answers -->
          <draggable
            class="answersArea mt-4"
            v-model="question.answers"
            item-key="_id"
          >
            <div
              v-for="(answer, aIndex) in question.answers"
              :key="answer._id"
              class="flex items-center justify-between my-6 p-3 border rounded-lg"
              :class="{
                'bg-red-100': !answer.correct,
                'bg-green-100': answer.correct,
              }"
            >
              <div class="flex items-center flex-grow">
                <span class="cursor-move text-gray-500 mx-2">:::</span>
                <span class="font-bold mx-4 text-lg"
                  >{{ getLetter(aIndex) }}.</span
                >
                <textarea
                  v-model="answer.text"
                  :ref="setTextareaRef"
                  @blur="saveAnswer(question, answer)"
                  class="resize-none overflow-hidden flex-grow p-2 rounded-l text-sm h-8 w-full"
                ></textarea>
              </div>
              <div class="flex items-center">
                <input
                  type="checkbox"
                  class="form-checkbox h-5 w-5 text-green-600 rounded mx-4"
                  :class="{
                    'text-red-500': !answer.correct,
                    'text-green-500': answer.correct,
                  }"
                  :checked="answer.correct"
                  @change="toggleCorrectAnswer(question._id, answer)"
                />
                <XMarkIcon
                  @click="
                    confirmDelete(
                      answer._id,
                      'answer',
                      `Answer ${getLetter(aIndex)}`,
                      question._id
                    )
                  "
                  class="h-6 w-6 text-red-500 hover:text-red-700 cursor-pointer"
                />
              </div>
            </div>
          </draggable>
          <div class="flex justify-center w-full">
            <button
              @click="addAnswer(question)"
              class="w-64 text-lg text-blue-500 hover:text-blue-700 text-center py-2 mt-4 rounded-md font-bold"
            >
              Pridėti naują atsakymą +
            </button>
          </div>
        </div>
        <!-- Sticky Add Question Button -->
        <div class="w-64 sticky bottom-0 bg-blue-500 shadow-inner">
          <button
            @click="addQuestion"
            class="mx-auto w-full text-white text-md font-bold py-3 rounded-md transition duration-200 ease-in-out hover:bg-blue-600 hover:shadow-lg"
          >
            Pridėta naują klausimą +
          </button>
        </div>
      </draggable>
    </div>

    <!-- Confirm Delete test modal -->
    <div
      v-if="state.showDeleteConfirmation"
      class="fixed inset-0 z-50 bg-gray-900 bg-opacity-50 flex justify-center items-center"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
        <h2 class="text-xl font-semibold mb-4">Confirm Deletion</h2>
        <p class="mb-6">
          Are you sure you want to delete {{ state.deleteType }}:
          <strong>{{ state.currentItemName }}</strong
          >?
        </p>
        <div class="flex justify-end space-x-4">
          <button
            @click="cancelDelete"
            class="px-5 py-2 text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            @click="performDelete"
            class="px-5 py-2 text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VueDraggableNext } from "vue-draggable-next";
import {
  defineComponent,
  reactive,
  toRefs,
  onMounted,
  watch,
  computed,
} from "vue";
import { useRouter } from "vue-router";
import { useSidebarStore } from "@/stores/sidebar";
import {
  MagnifyingGlassIcon,
  ArrowLeftIcon,
  XMarkIcon,
} from "@heroicons/vue/24/outline";
import autosize from "autosize";

export default defineComponent({
  components: {
    MagnifyingGlassIcon,
    ArrowLeftIcon,
    XMarkIcon,
    draggable: VueDraggableNext,
  },
  props: {
    test: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { test } = toRefs(props);
    const router = useRouter();
    const sidebarStore = useSidebarStore();
    const state = reactive({
      searchQuery: "",
      testDetails: reactive({ ...test.value }),
      showDeleteConfirmation: false,
      currentDeleteId: null,
      deleteType: null,
      currentItemName: "",
      currentQuestionId: null,
    });

    const filteredQuestions = computed(() => {
      return (
        state.testDetails.questions?.filter((q) =>
          q.text.toLowerCase().includes(state.searchQuery.toLowerCase())
        ) || []
      );
    });

    const getLetter = (index) => String.fromCharCode(65 + index);
    const backToTestList = () => sidebarStore.clearTest();
    const setTextareaRef = (el) => {
      if (el) {
        autosize(el);
      }
    };

    onMounted(() => {
      console.log("Initial questions data:", state.testDetails.questions);
    });

    const saveQuestion = async (question) => {
      try {
        await $fetch(
          `http://localhost:3001/api/tests/${props.test._id}/questions/${question._id}`,
          {
            method: "PUT",
            body: question,
          }
        );
      } catch (error) {
        console.error("Failed to save question:", error);
      }
    };
    const addQuestion = async () => {
      const newQuestion = {
        text: "Naujas klausimas", // Initialize with empty text so the user can input their question
        answers: [], // Start with an empty array of answers
      };

      try {
        // Assuming '/api/tests/:testId/questions' is the endpoint for adding a new question
        const response = await fetch(
          `http://localhost:3001/api/tests/${state.testDetails._id}/questions`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newQuestion),
          }
        );

        // Once the new question is successfully created, add it to the local state
        const data = await response.json();
        if (response.ok && data && data._id) {
          state.testDetails.questions.push(data);
        } else {
          console.error(
            "No data returned from the server after adding question",
            data
          );
        }
      } catch (error) {
        console.error("Failed to add question:", error);
      }
    };

    const addAnswer = async (question) => {
      const newAnswer = {
        text: "123", // Default answer text
        correct: false, // Default to incorrect
      };

      try {
        const response = await fetch(
          `http://localhost:3001/api/tests/${state.testDetails._id}/questions/${question._id}/answers`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newAnswer),
          }
        );

        const data = await response.json();
        if (!response.ok)
          throw new Error("Failed to create answer: " + JSON.stringify(data));

        if (data && data._id) {
          question.answers.push(data); // Ensures the frontend state is updated with the new answer
        } else {
          console.error("No data returned from the server after adding answer");
        }
      } catch (error) {
        console.error("Failed to add answer:", error);
      }
    };

    const saveAnswer = async (question, answer) => {
      try {
        await $fetch(
          `http://localhost:3001/api/tests/${props.test._id}/questions/${question._id}/answers/${answer._id}`,
          {
            method: "PUT",
            body: answer,
          }
        );
      } catch (error) {
        console.error("Failed to save answer:", error);
      }
    };
    const performDelete = async () => {
      if (state.deleteType === "question") {
        await deleteQuestion();
      } else if (state.deleteType === "answer") {
        await deleteAnswer();
      }
      // After performing the delete operation, reset the state to close the modal
      state.showDeleteConfirmation = false;
      state.currentDeleteId = null;
      state.deleteType = null;
      state.currentItemName = "";
      state.currentQuestionId = null;
    };

    const confirmDelete = (itemId, itemType, itemName, questionId = null) => {
      if (!state.showDeleteConfirmation) {
        state.showDeleteConfirmation = true;
        state.currentDeleteId = itemId;
        state.deleteType = itemType;
        state.currentItemName = itemName;
        state.currentQuestionId = questionId;
      }
    };

    const cancelDelete = () => {
      state.showDeleteConfirmation = false;
    };

    const deleteQuestion = async () => {
      if (!state.currentDeleteId) {
        console.log("No question ID specified for deletion");
        return;
      }
      console.log(
        `Attempting to delete question with ID: ${state.currentDeleteId}`
      );
      try {
        const response = await fetch(
          `http://localhost:3001/api/tests/${test.value._id}/questions/${state.currentDeleteId}`,
          {
            method: "DELETE",
          }
        );
        const data = await response.json();
        if (response.ok) {
          console.log("Deletion successful, updating state", data);
          state.testDetails.questions = state.testDetails.questions.filter(
            (q) => q._id !== state.currentDeleteId
          );
        } else {
          throw new Error(`Failed to delete the question: ${data.error}`);
        }
      } catch (error) {
        console.error("Failed to delete question:", error);
      }
    };

    const deleteAnswer = async () => {
      if (!state.currentDeleteId || !state.currentQuestionId) {
        console.log("Missing IDs for deleting an answer");
        return;
      }
      console.log(
        `Attempting to delete answer with ID: ${state.currentDeleteId} from question ID: ${state.currentQuestionId}`
      );
      try {
        const response = await fetch(
          `http://localhost:3001/api/tests/${test.value._id}/questions/${state.currentQuestionId}/answers/${state.currentDeleteId}`,
          {
            method: "DELETE",
          }
        );
        const data = await response.json();
        if (response.ok) {
          console.log("Deletion successful, updating state", data);
          const question = state.testDetails.questions.find(
            (q) => q._id === state.currentQuestionId
          );
          if (question) {
            question.answers = question.answers.filter(
              (a) => a._id !== state.currentDeleteId
            );
          }
        } else {
          throw new Error(`Failed to delete the answer: ${data.error}`);
        }
      } catch (error) {
        console.error("Failed to delete answer:", error);
      }
    };
    const toggleCorrectAnswer = async (questionId, answer) => {
      const newCorrectValue = !answer.correct; // Declare newCorrectValue

      try {
        // Make sure to use `newCorrectValue` instead of trying to toggle `answer.correct` directly
        const response = await fetch(
          `http://localhost:3001/api/tests/${test.value._id}/questions/${questionId}/answers/${answer._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              text: answer.text,
              correct: newCorrectValue, // Use newCorrectValue here
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }

        // If the update was successful, set the newCorrectValue
        answer.correct = newCorrectValue;
      } catch (error) {
        console.error("Error updating answer", error);
        // Revert the correct value if the update fails
        answer.correct = !newCorrectValue;
      }
    };
    watch(state.testDetails.questions, (newQuestions) => {
      console.log("Updated questions data:", newQuestions);
    });

    return {
      state,
      getLetter,
      filteredQuestions,
      backToTestList,
      setTextareaRef,
      saveQuestion,
      saveAnswer,
      confirmDelete,
      deleteQuestion,
      deleteAnswer,
      cancelDelete,
      performDelete,
      toggleCorrectAnswer,
      addAnswer,
      addQuestion,
    };
  },
});
</script>
