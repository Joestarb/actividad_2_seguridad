<script setup lang="ts">
import LoginForm from '@/views/Login/components/LoginForm.vue'
import imgForm from '@/assets/imgForm.png'
</script>
<template>
  <div class="grid grid-cols-[60%_40%] h-screen">
    <img :src="imgForm" alt="imgForm" class="w-full h-full object-cover  rounded-r-4xl" />
    <div class=" flex  w-full h-full items-center justify-center flex-col">
      <p class=" text-center  font-bold text-2xl">Iniciar sesion</p>
      <LoginForm />
    </div>
  </div>
</template>
