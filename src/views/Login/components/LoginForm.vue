
<template>
  <form @submit.prevent="handleSubmit" class="max-w-md mx-auto mt-2 p-6 bg-white rounded-lg ">
    <div class="mb-4">
      <InputComponent
        required
        label-tittle="Email"
        type="email"
        v-model="email"

      />
    </div>
    <div class="mb-6">
      <InputComponent
        required
        label-tittle="Password"
        type="password"
        v-model="password"
      />
    </div>
    <div>

      <ButtonComponent title="Login" ownStyle="" />
    </div>
    <p> No tienes una cuenta? <RouterLink to="/register" class=" text-blue-700 ">Registrate aqui</RouterLink></p>
  </form>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import InputComponent from '@/components/common/InputComponent.vue'
import ButtonComponent from '@/components/common/ButtonComponent.vue'
import { validateEmail } from '@/hooks/useRegrex.ts'
import { userApiSlice } from '@/stores/users/userApiSlice.ts'
import { RouterLink } from 'vue-router';
import Swal from 'sweetalert2'

const userApi = userApiSlice();

const email = ref('');
const password = ref('');

const handleSubmit = async () => {
  if (email.value === '' || password.value === '') {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Todos los campos son obligatorios!',
  })
    return;
  }
  if (!validateEmail(email.value)) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Por favor, introduce un email válido!',
    })
    return
  }
  const res = await userApi.loginUser(email.value, password.value);

  const responseStatus = {
    200: {
        icon: 'success',
        title: 'Bienvenido!',
        text: 'Has iniciado sesión correctamente!',
    },
    400: {
        icon: 'error',
        title: 'Oops...',
        text: 'Email o contraseña incorrectos!',
    },
    default: {
        icon: 'error',
        title: 'Oops...',
        text: 'Ha ocurrido un error en el servidor!',
    },
  }

  Swal.fire(responseStatus[res.status] || responseStatus.default)



  console.log('Email:', email.value);
  console.log('Password:', password.value);
};
</script>


