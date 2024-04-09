<template>
  <div class="container mx-auto px-4 mb-8">
    <div class="flex justify-between items-center my-8">
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
            class="w-72 pl-10 pr-3 py-2 rounded-lg border border-gray-300 shadow focus:outline-none focus:shadow-outline text-gray-600 font-medium"
          />
        </div>
        <button
          class="mx-3 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 flex items-center"
        >
          <PencilSquareIcon class="h-5 w-5 text-white mr-2" />
          Kurti naują testą
        </button>
        <button
          class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 flex items-center"
        >
          <LinkIcon class="h-5 w-5 text-white mr-2" />
          Generuoti URL
        </button>
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="min-w-full bg-white">
        <thead>
          <tr>
            <th
              @click="sortTable('name')"
              class="py-2 px-4 bg-gray-100 border-b border-gray-200 text-left text-md font-semibold text-gray-600 uppercase tracking-wider cursor-pointer whitespace-nowrap"
              style="min-width: 300px; user-select: none"
            >
              <div class="flex items-center">
                <span>Pavadinimas</span>
                <span class="ml-2">
                  <chevron-down-icon
                    v-if="sortColumn === 'name' && sortOrder === 'asc'"
                    class="h-5 w-5 text-black font-bold"
                  />
                  <chevron-up-icon
                    v-else-if="sortColumn === 'name' && sortOrder === 'desc'"
                    class="h-5 w-5 text-black font-bold"
                  />
                  <chevron-down-icon v-else class="h-5 w-5 text-gray-400" />
                </span>
              </div>
            </th>
            <th
              @click="sortTable('url')"
              class="py-2 px-4 bg-gray-100 border-b border-gray-200 text-left text-md font-semibold text-gray-600 uppercase tracking-wider cursor-pointer whitespace-nowrap"
              style="min-width: 250px; user-select: none"
            >
              <div class="flex items-center">
                <span>URL adresas</span>
                <span class="ml-2">
                  <chevron-down-icon
                    v-if="sortColumn === 'url' && sortOrder === 'asc'"
                    class="h-5 w-5 text-black font-bold"
                  />
                  <chevron-up-icon
                    v-else-if="sortColumn === 'url' && sortOrder === 'desc'"
                    class="h-5 w-5 text-black font-bold"
                  />
                  <chevron-down-icon v-else class="h-5 w-5 text-gray-400" />
                </span>
              </div>
            </th>

            <th
              @click="sortTable('questions')"
              class="py-2 px-4 bg-gray-100 border-b border-gray-200 text-left text-md font-semibold text-gray-600 uppercase tracking-wider cursor-pointer whitespace-nowrap"
              style="min-width: 50px; user-select: none"
            >
              <div class="flex items-center">
                <span>Klausimai</span>
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
                  <chevron-down-icon v-else class="h-5 w-5 text-gray-400" />
                </span>
              </div>
            </th>

            <th
              @click="sortTable('group')"
              class="py-2 px-4 bg-gray-100 border-b border-gray-200 text-left text-md font-semibold text-gray-600 uppercase tracking-wider cursor-pointer whitespace-nowrap"
              style="min-width: 50px; user-select: none"
            >
              <div class="flex items-center">
                <span>Grupė</span>
                <span class="ml-2">
                  <chevron-down-icon
                    v-if="sortColumn === 'group' && sortOrder === 'asc'"
                    class="h-5 w-5 text-black font-bold"
                  />
                  <chevron-up-icon
                    v-else-if="sortColumn === 'group' && sortOrder === 'desc'"
                    class="h-5 w-5 text-black font-bold"
                  />
                  <chevron-down-icon v-else class="h-5 w-5 text-gray-400" />
                </span>
              </div>
            </th>

            <th
              @click="sortTable('timeLimit')"
              class="py-2 px-4 bg-gray-100 border-b border-gray-200 text-left text-md font-semibold text-gray-600 uppercase tracking-wider cursor-pointer whitespace-nowrap"
              style="min-width: 50px; user-select: none"
            >
              <div class="flex items-center">
                <span>Laiko limitas</span>
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
                  <chevron-down-icon v-else class="h-5 w-5 text-gray-400" />
                </span>
              </div>
            </th>

            <th
              @click="sortTable('date')"
              class="py-2 px-4 bg-gray-100 border-b border-gray-200 text-left text-md font-semibold text-gray-600 uppercase tracking-wider cursor-pointer whitespace-nowrap"
              style="min-width: 50px; user-select: none"
            >
              <div class="flex items-center">
                <span>Paskutinį kartą keista</span>
                <span class="ml-2">
                  <chevron-down-icon
                    v-if="sortColumn === 'date' && sortOrder === 'asc'"
                    class="h-5 w-5 text-black font-bold"
                  />
                  <chevron-up-icon
                    v-else-if="sortColumn === 'date' && sortOrder === 'desc'"
                    class="h-5 w-5 text-black font-bold"
                  />
                  <chevron-down-icon v-else class="h-5 w-5 text-gray-400" />
                </span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="hover:bg-gray-50">
            <td class="py-6 px-4 border-b border-gray-200">
              <button
                @click="toggleExpand(0)"
                class="flex items-center space-x-2"
              >
                <DocumentIcon class="h-5 w-5 text-gray-500" />
                <span>Testas1</span>
              </button>
            </td>
            <td class="py-2 px-4 border-b border-gray-200">
              kvk.lt/3K$6123ZGQ^ZK
            </td>
            <td class="py-2 px-4 border-b border-gray-200">10</td>
            <td class="py-2 px-4 border-b border-gray-200">I19-2</td>
            <td class="py-2 px-4 border-b border-gray-200">30 min</td>
            <td class="py-2 px-4 border-b border-gray-200">2023-01-01 17:00</td>
          </tr>

          <tr class="hover:bg-gray-50">
            <td class="py-6 px-4 border-b border-gray-200">
              <button
                @click="toggleExpand(0)"
                class="flex items-center space-x-2"
              >
                <DocumentIcon class="h-5 w-5 text-gray-500" />
                <span>Java testas</span>
              </button>
            </td>
            <td class="py-2 px-4 border-b border-gray-200">
              kvk.lt/DAKGFLA2KL%H!
            </td>
            <td class="py-2 px-4 border-b border-gray-200">15</td>
            <td class="py-2 px-4 border-b border-gray-200">I20-1</td>
            <td class="py-2 px-4 border-b border-gray-200">60 min</td>
            <td class="py-2 px-4 border-b border-gray-200">2023-02-02 13:00</td>
          </tr>
        </tbody>
      </table>
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
} from "@heroicons/vue/24/outline";

export default {
  components: {
    ChevronDownIcon,
    ChevronUpIcon,
    DocumentIcon,
    MagnifyingGlassIcon,
    PencilSquareIcon,
    LinkIcon,
  },
  data() {
    return {
      searchQuery: "",
      expand: {},
      sortColumn: "date",
      sortOrder: "desc",
    };
  },
  methods: {
    filterTests() {
      // Your search filtering logic here
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
      // For example, you might sort an array of objects based on the sortColumn and sortOrder
    },
    created() {
      // When the component is created, we perform the initial sort by the 'date' column
      this.sortTable("date");
    },
  },
};
</script>
