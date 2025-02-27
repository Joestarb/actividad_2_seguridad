<template>
  <DefaultLayout>
    <div class="max-w-md mx-auto mt-5 p-6 rounded-lg">
      <h1 class="text-2xl font-bold mb-4">XSS Vulnerable View</h1>
      <textarea
        v-model="userInput"
        class="w-full p-2 border rounded mb-4"
        rows="5"
        placeholder="Enter some HTML"
      ></textarea>
      <div class="p-4 border rounded bg-gray-100" v-html="userInput"></div>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DefaultLayout from '@/components/layout/DefaultLayout.vue'

const userInput = ref('')
</script>

<style scoped>
/* Add any additional styling here */
</style>
