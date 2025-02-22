<script setup lang="ts">
import { ref } from 'vue';
import InputComponent from '@/components/common/InputComponent.vue'
import ButtonComponent from '@/components/common/ButtonComponent.vue'

const username = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

const handleSubmit = () => {
  if (password.value !== confirmPassword.value) {
    console.error('Passwords do not match');
    return;
  }
  console.log('Username:', username.value);
  console.log('Email:', email.value);
  console.log('Password:', password.value);
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
    <div class="mb-4">
      <InputComponent
        label-tittle="Username"
        type="text"
        id="username"
        v-model="username"
        required
      />
    </div>
    <div class="mb-4">
      <InputComponent
        label-tittle="Email"
        type="email"
        id="email"
        v-model="email"
        required
      />
    </div>
    <div class="mb-4">
      <InputComponent
        label-tittle="Password"
        type="password"
        id="password"
        v-model="password"
        required
      />
    </div>
    <div class="mb-6">
      <InputComponent
        label-tittle="Confirm Password"
        type="password"
        id="confirmPassword"
        v-model="confirmPassword"
        required
      />
    </div>
    <div>
      <ButtonComponent
        type="submit"
        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Register
      </ButtonComponent>
    </div>
  </form>
</template>

<style scoped>
/* You can add additional styles here if needed */
</style>
