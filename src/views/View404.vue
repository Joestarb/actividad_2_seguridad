<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100 text-gray-800">
    <div class="max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow-md text-center">
      <h1 class="text-6xl font-bold mb-4">404</h1>
      <p class="text-xl mb-4">Oops! The page you are looking for does not exist.</p>
      <RouterLink to="/" class="inline-block px-4 py-2 text-white bg-teal-600 rounded hover:bg-teal-700">Go Back Home</RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
