<script setup lang="ts">
import RegisterForm from '@/views/Register/components/RegisterForm.vue'
import imgForm from '@/assets/imgForm.png'
</script>
<template>
  <div class="grid grid-cols-[40%_60%] h-screen">
    <div class=" flex  w-full h-full items-center justify-center flex-col">
    <p class=" text-center  font-bold text-2xl">Registarse</p>
      <RegisterForm/>
    </div>
    <img :src="imgForm" alt="imgForm" class="w-full h-full object-cover  rounded-r-4xl" />
  </div>

</template>
