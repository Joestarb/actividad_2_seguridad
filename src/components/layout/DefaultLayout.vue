<template>
    <div class="flex min-h-screen bg-[#F9F9F9F]  ">
    <!-- Sidebar -->

    <div class="flex-1 flex flex-col">
      <!-- Header -->
      <header class="bg-[#578E7E] shadow-sm p-4 flex items-center justify-between">
        <div>
          <RouterLink to="/" class="text-xl font-bold text-[#F5F5F5]">My App Header</RouterLink>
        </div>
        <div class=" flex gap-5">
          <RouterLink to="/xss" class=" text-white font-semibold">XSS</RouterLink>
          <RouterLink to="/" class=" text-white font-semibold">DDOS</RouterLink>
          <RouterLink to="/" class=" text-white font-semibold">SQL Inyection</RouterLink>
          <RouterLink to="/" class=" text-white font-semibold">Clickjacking</RouterLink>
          <ButtonComponent @click="logout" title="Cerrar sesion" own-style="" />


        </div>
      </header>

      <main class="flex-1 bg-[#F9F9F9F]">
        <div class="rounded-lg p-6">
          <slot />
        </div>
      </main>

      <footer class="bg-[#578E7E] text-white py-4 text-center">
        <p class="text-sm">&copy; 2025 My App. All rights reserved.</p>
      </footer>
    </div>
  </div>
</template>
<script setup lang="ts">
import ButtonComponent from '@/components/common/ButtonComponent.vue'
import { userApiSlice } from '@/stores/users/userApiSlice.ts'
import { userStore } from '@/stores/users/userStore.ts'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

const router = useRouter()
const userApi = userApiSlice()
const userStorage = userStore()
const token = localStorage.getItem('userToken') || ''

const logout = async () => {
  const exitApi = await userApi.logout(token)

  const responseStatus = {
    200:  {
      icon: 'success',
      title: 'saliendo de la aplicacion',
      text: 'redirigiendo...  ',
    },
    default:{

      icon: 'error',
      title: 'oops',
      text: 'ah ocurrido un error  ',
    }
  }
  Swal.fire(responseStatus[exitApi.status] || responseStatus.default)
  if(exitApi.status == 200){
    router.push('/')
    const exit = await userStorage.logoutLocalStorage()

  }

}

</script>
