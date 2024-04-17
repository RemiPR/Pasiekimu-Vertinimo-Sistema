<template>
  <div class="container mx-auto px-4 mb-2">
    <div
      class="flex justify-between items-center my-2 sticky top-0 z-10 bg-white py-9"
    >
      <h1 class="text-4xl ml-2 font-semibold text-gray-800">Testai</h1>
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
        <button
          @click="createNewTest"
          class="mx-3 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 flex items-center"
        >
          <PencilSquareIcon class="h-5 w-5 text-white mr-2" />
          Kurti naują testą
        </button>
        <button
          class="px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 flex items-center"
        >
          <LinkIcon class="h-5 w-5 text-white mr-2" />
          Generuoti URL
        </button>
      </div>
    </div>

    <div>
      <table class="min-w-full bg-white">
        <thead class="sticky top-28 z-10 bg-white py-4">
          <tr>
            <th
              class="py-2 px-4 text-gray-600 bg-gray-100 border-b border-gray-200 uppercase"
            >
              Nr.
            </th>

            <th
              @click="sortTable('name')"
              class="py-2 px-4 bg-gray-100 border-b border-gray-200 text-left text-md font-semibold text-gray-600 uppercase tracking-wider cursor-pointer whitespace-nowrap"
              style="min-width: 300px; user-select: none"
            >
              <div class="group flex items-center">
                <span
                  class="group-hover:text-black group-hover:font-semibold text-lg"
                  >Pavadinimas</span
                >
                <span class="ml-2">
                  <chevron-down-icon
                    v-if="sortColumn === 'name' && sortOrder === 'asc'"
                    class="h-5 w-5 text-black font-bold"
                  />
                  <chevron-up-icon
                    v-else-if="sortColumn === 'name' && sortOrder === 'desc'"
                    class="h-5 w-5 text-black font-bold"
                  />
                  <chevron-down-icon
                    v-else
                    class="h-5 w-5 text-gray-400 group-hover:text-black group-hover:font-semibold"
                  />
                </span>
              </div>
            </th>
            <th
              @click="sortTable('url')"
              class="py-2 px-4 bg-gray-100 border-b border-gray-200 text-left text-md font-semibold text-gray-600 uppercase tracking-wider cursor-pointer whitespace-nowrap"
              style="min-width: 150px; user-select: none"
            >
              <div class="group flex items-center">
                <span
                  class="group-hover:text-black group-hover:font-semibold text-lg"
                  >URL adresas</span
                >
                <span class="ml-2">
                  <chevron-down-icon
                    v-if="sortColumn === 'url' && sortOrder === 'asc'"
                    class="h-5 w-5 text-black font-bold"
                  />
                  <chevron-up-icon
                    v-else-if="sortColumn === 'url' && sortOrder === 'desc'"
                    class="h-5 w-5 text-black font-bold"
                  />
                  <chevron-down-icon
                    v-else
                    class="h-5 w-5 text-gray-400 group-hover:text-black group-hover:font-semibold"
                  />
                </span>
              </div>
            </th>

            <th
              @click="sortTable('questions')"
              class="py-2 px-4 bg-gray-100 border-b border-gray-200 text-left text-md font-semibold text-gray-600 uppercase tracking-wider cursor-pointer whitespace-nowrap"
              style="min-width: 50px; user-select: none"
            >
              <div
                class="group flex items-center hover:text-black hover:font-semibold"
              >
                <span
                  class="group-hover:text-black group-hover:font-semibold text-lg"
                  >Klausimai</span
                >
                <span class="ml-2">
                  <chevron-down-icon
                    v-if="sortColumn === 'questions' && sortOrder === 'asc'"
                    class="h-5 w-5 text-black font-bold"
                  />
                  <chevron-up-icon
                    v-else-if="
                      sortColumn === 'questions' && sortOrder === 'desc'
                    "
                    class="h-5 w-5 text-black font-bold"
                  />
                  <chevron-down-icon
                    v-else
                    class="h-5 w-5 text-gray-400 group-hover:text-black group-hover:font-semibold"
                  />
                </span>
              </div>
            </th>

            <th
              @click="sortTable('group')"
              class="py-2 px-4 bg-gray-100 border-b border-gray-200 text-left text-md font-semibold text-gray-600 uppercase tracking-wider cursor-pointer whitespace-nowrap"
              style="min-width: 50px; user-select: none"
            >
              <div
                class="group flex items-center hover:text-black hover:font-semibold"
              >
                <span
                  class="group-hover:text-black group-hover:font-semibold text-lg"
                  >Grupė</span
                >
                <span class="ml-2">
                  <chevron-down-icon
                    v-if="sortColumn === 'group' && sortOrder === 'asc'"
                    class="h-5 w-5 text-black font-bold"
                  />
                  <chevron-up-icon
                    v-else-if="sortColumn === 'group' && sortOrder === 'desc'"
                    class="h-5 w-5 text-black font-bold"
                  />
                  <chevron-down-icon
                    v-else
                    class="h-5 w-5 text-gray-400 group-hover:text-black group-hover:font-semibold"
                  />
                </span>
              </div>
            </th>

            <th
              @click="sortTable('timeLimit')"
              class="py-2 px-4 bg-gray-100 border-b border-gray-200 text-left text-md font-semibold text-gray-600 uppercase tracking-wider cursor-pointer whitespace-nowrap"
              style="min-width: 50px; user-select: none"
            >
              <div
                class="group flex items-center hover:text-black hover:font-semibold"
              >
                <span
                  class="group-hover:text-black group-hover:font-semibold text-lg"
                  >Laiko limitas</span
                >
                <span class="ml-2">
                  <chevron-down-icon
                    v-if="sortColumn === 'timeLimit' && sortOrder === 'asc'"
                    class="h-5 w-5 text-black font-bold"
                  />
                  <chevron-up-icon
                    v-else-if="
                      sortColumn === 'timeLimit' && sortOrder === 'desc'
                    "
                    class="h-5 w-5 text-black font-bold"
                  />
                  <chevron-down-icon
                    v-else
                    class="h-5 w-5 text-gray-400 group-hover:text-black group-hover:font-semibold"
                  />
                </span>
              </div>
            </th>

            <th
              @click="sortTable('date')"
              class="py-2 px-4 bg-gray-100 border-b border-gray-200 text-left text-md font-semibold text-gray-600 uppercase tracking-wider cursor-pointer whitespace-nowrap"
              style="min-width: 50px; user-select: none"
            >
              <div
                class="group flex items-center hover:text-black hover:font-semibold"
              >
                <span
                  class="group-hover:text-black group-hover:font-semibold text-lg"
                  >Keitimo data</span
                >
                <span class="ml-2">
                  <chevron-down-icon
                    v-if="sortColumn === 'date' && sortOrder === 'asc'"
                    class="h-5 w-5 text-black font-bold"
                  />
                  <chevron-up-icon
                    v-else-if="sortColumn === 'date' && sortOrder === 'desc'"
                    class="h-5 w-5 text-black font-bold"
                  />
                  <chevron-down-icon
                    v-else
                    class="h-5 w-5 text-gray-400 group-hover:text-black group-hover:font-semibold"
                  />
                </span>
              </div>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(item, index) in items"
            :key="item._id"
            class="group hover:bg-gray-50 hover:text-blue-500"
          >
            <td class="py-2 px-4 border-b border-gray-200">
              {{ index + 1 }}
            </td>

            <td
              class="py-6 px-4 border-b border-gray-200 group-hover:text-blue-500"
              @click="handleTestClick(item)"
            >
              <span class="flex items-center space-x-2 cursor-pointer">
                <DocumentIcon
                  class="h-5 w-5 text-gray-500 group-hover:text-blue-500"
                />
                <span>{{ item.name }}</span>
              </span>
            </td>

            <td class="py-2 px-4 border-b border-gray-200 relative">
              <div
                class="truncate max-w-48 hover:max-w-full hover:whitespace-normal"
                :title="item.url"
              >
                {{ item.url }}
              </div>
            </td>

            <td
              class="py-2 px-4 border-b border-gray-200 group-hover:text-blue-500"
            >
              {{ item.questionCount }}
            </td>
            <td
              class="py-2 px-4 border-b border-gray-200 group-hover:text-blue-500"
            >
              {{ item.group }}
            </td>
            <td
              class="py-2 px-4 border-b border-gray-200 group-hover:text-blue-500"
            >
              {{ item.timeLimit }}
            </td>
            <td
              class="py-2 px-4 border-b border-gray-200 group-hover:text-blue-500 relative"
            >
              <span class="absolute left-4">{{ formatDate(item.date) }}</span>
              <div class="flex justify-end">
                <button
                  @click="promptDeleteTest(item._id, item.name)"
                  class="text-red-500 hover:text-red-700 focus:outline-none"
                  :title="'Delete ' + item.name"
                >
                  <XMarkIcon class="h-5 w-5" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
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
import {
  ChevronDownIcon,
  ChevronUpIcon,
  DocumentIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  LinkIcon,
  XMarkIcon,
} from "@heroicons/vue/24/outline";
import { useSidebarStore } from "@/stores/sidebar";

export default {
  components: {
    ChevronDownIcon,
    ChevronUpIcon,
    DocumentIcon,
    MagnifyingGlassIcon,
    PencilSquareIcon,
    LinkIcon,
    XMarkIcon,
  },
  data() {
    return {
      searchQuery: "",
      expand: {},
      sortColumn: "date",
      sortOrder: "desc",
      items: [],
      expandedUrls: {},
      showDeleteConfirmation: false,
      currentTestId: null,
      currentTestName: "",
      isLoading: false,
      hasMoreItems: true,
      originalItems: [],
    };
  },

  created() {
    this.sortTable("date");
    this.items.forEach((item, index) => {
      if (this.expandedUrls[index] === undefined) {
        this.expandedUrls[index] = false;
      }
    });
  },
  async mounted() {
    await this.fetchItems();
    this.sortTable(this.sortColumn);
    document.addEventListener("keydown", this.handleEscapePress);
  },

  methods: {
    filterTests() {
      const searchLower = this.searchQuery.toLowerCase();

      if (!this.searchQuery.trim()) {
        this.fetchItems();
      } else {
        this.items = this.originalItems.filter((item) => {
          const formattedDate = this.formatDateForComparison(item.date);
          // Convert timeLimit to string and include it in the comparison
          const timeLimitStr = item.timeLimit.toString().toLowerCase();

          return (
            item.name.toLowerCase().includes(searchLower) ||
            item.group.toLowerCase().includes(searchLower) ||
            item.questions.toString().toLowerCase().includes(searchLower) ||
            formattedDate.includes(searchLower) ||
            timeLimitStr.includes(searchLower)
          );
        });
      }
    },
    handleTestClick(test) {
      const sidebarStore = useSidebarStore();
      sidebarStore.selectTest(test); // This will set the currentTest and showTestDetails in the store
    },
    formatDateForComparison(date) {
      const d = new Date(date);
      let month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    },

    toggleExpand(index) {
      this.$set(this.expand, index, !this.expand[index]);
    },
    sortTable(column) {
      if (this.sortColumn === column) {
        // If the current sort column is clicked again, toggle the sort order
        this.sortOrder = this.sortOrder === "asc" ? "desc" : "asc";
      } else {
        // If a different sort column is clicked, start with ascending sort
        this.sortColumn = column;
        this.sortOrder = "asc";
      }

      // Implement the actual sorting logic for your data here
      this.items.sort((a, b) => {
        let comparison = 0;

        let valA = a[this.sortColumn];
        let valB = b[this.sortColumn];

        // For date comparison, convert to timestamps
        if (this.sortColumn === "date") {
          valA = new Date(valA).getTime();
          valB = new Date(valB).getTime();
        }

        if (valA < valB) {
          comparison = -1;
        } else if (valA > valB) {
          comparison = 1;
        }

        return this.sortOrder === "asc" ? comparison : -comparison;
      });
    },

    toggleUrl(index) {
      if (this.expandedUrls[index] !== undefined) {
        this.expandedUrls[index] = !this.expandedUrls[index];
      } else {
        this.expandedUrls[index] = true;
      }
    },
    formatDate(date) {
      return this.formatDateForComparison(date);
    },

    expandUrl(index) {
      this.$set(this.expandedUrls, index, true);
    },
    collapseUrl(index) {
      this.$set(this.expandedUrls, index, false);
    },

    async fetchItems() {
      try {
        const response = await fetch(`http://localhost:3001/api/tests`);
        const data = await response.json();
        // Add a question count to each test item
        const itemsWithQuestionCount = data.map((test) => ({
          ...test,
          questionCount: test.questions ? test.questions.length : 0, // Counting questions if they exist
        }));
        this.originalItems = itemsWithQuestionCount;
        this.items = itemsWithQuestionCount;
      } catch (error) {
        console.error("Failed to fetch items:", error);
      }
    },
    async selectTest(testId) {
      try {
        const response = await fetch(
          `http://localhost:3001/api/tests/${testId}`
        );
        const detailedTest = await response.json();
        if (detailedTest) {
          this.currentTest = detailedTest; // Assuming `currentTest` is reactive
          this.showTestDetails = true; // Show TestDetails component
        }
      } catch (error) {
        console.error("Failed to fetch test details:", error);
      }
    },
    promptDeleteTest(testId, testName) {
      this.currentTestId = testId;
      this.currentTestName = testName;
      this.showDeleteConfirmation = true;
      document.body.classList.add("overflow-hidden");
    },

    async confirmDelete() {
      if (this.currentTestId) {
        try {
          await fetch(`http://localhost:3001/api/tests/${this.currentTestId}`, {
            method: "DELETE",
          });
          this.items = this.items.filter(
            (item) => item._id !== this.currentTestId
          );
          this.showDeleteConfirmation = false; // Hide the modal
          this.currentTestId = null; // Reset currentTestId
        } catch (error) {
          console.error("Failed to delete the test:", error);
          // Optionally, show an error notification
        }
      }
    },
    createNewTest() {
      const sidebarStore = useSidebarStore(); // Use the store
      const newTest = {
        name: "Naujas testas",
        url: "Nėra URL",
        questions: [],
      };

      fetch("http://localhost:3001/api/tests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTest),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          sidebarStore.selectTest(data._id); // Set the test ID in the store and switch view
        })
        .catch((error) => {
          console.error("Failed to create new test:", error);
        });
    },
    cancelDelete() {
      this.showDeleteConfirmation = false;
      this.currentTestId = null; // Reset currentTestId
    },
    async deleteTest(testId) {
      // Confirmation dialog
      if (confirm("Are you sure you want to delete this test?")) {
        try {
          // Call your API to delete the test
          await fetch(`http://localhost:3001/api/tests/${testId}`, {
            method: "DELETE",
          });
          // Remove the test from the items array
          this.items = this.items.filter((item) => item._id !== testId);
        } catch (error) {
          console.error("Failed to delete the test:", error);
        }
      }
    },
    handleEscapePress(event) {
      if (event.key === "Escape" && this.showDeleteConfirmation) {
        this.cancelDelete();
      }
    },
  },
};
</script>
