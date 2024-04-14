<template>
  <div>
    <div v-if="error">
      <p>Error fetching test details: {{ error.message }}</p>
    </div>
    <div v-else-if="!test">
      <p>Loading...</p>
    </div>
    <div v-else>
      <h1>{{ test.name }}</h1>
      <!-- Display other details of the test here -->
      <p>123</p>
    </div>
  </div>
</template>

<script>
import { useFetch } from "nuxt/app";

export default {
  setup(props, { params }) {
    // Destructure 'data', 'pending', and 'error' from the `useFetch` return object
    console.log(params.id); // Add this line to check the ID

    const {
      data: test,
      pending,
      error,
    } = useFetch(`http://localhost:3001/api/tests/${params.id}`);

    return { test, error };
  },
};
</script>
