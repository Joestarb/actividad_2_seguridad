<template>
  <form @submit.prevent="handleSubmit" class="max-w-md mx-auto mt-2 p-6 bg-white rounded-lg ">
    <div class="mb-4">
      <Field name="email" v-slot="{ field, errors }">
        <InputComponent
          required
          label-tittle="Email"
          type="email"
          v-bind="field"
        />
        <span class="text-red-500">{{ errors[0] }}</span>
      </Field>
    </div>
    <div class="mb-6">
      <Field name="password" v-slot="{ field, errors }">
        <InputComponent
          required
          label-tittle="Password"
          type="password"
          v-bind="field"
        />
        <span class="text-red-500">{{ errors[0] }}</span>
      </Field>
    </div>
    <div>
      <ButtonComponent title="Login" ownStyle="" />
    </div>
    <p> No tienes una cuenta? <RouterLink to="/register" class=" text-blue-700 ">Registrate aqui</RouterLink></p>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';
import InputComponent from '@/components/common/InputComponent.vue';
import ButtonComponent from '@/components/common/ButtonComponent.vue';
import { userApiSlice } from '@/stores/users/userApiSlice.ts';
import { RouterLink, useRouter } from 'vue-router';
import { useLocalStorage } from '@vueuse/core';
import Swal from 'sweetalert2';

const router = useRouter();
const userApi = userApiSlice();

const schema = yup.object({
  email: yup.string().email('Por favor, introduce un email válido!').required('Email es obligatorio!'),
  password: yup.string().required('Password es obligatorio!'),
});

const { handleSubmit } = useForm({
  validationSchema: schema,
});

const onSubmit = handleSubmit(async (values) => {
  const res = await userApi.loginUser(values.email, values.password);

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
  };

  Swal.fire(responseStatus[res.status] || responseStatus.default);

  if (res.status == 200) {
    const userToken = useLocalStorage('userToken', '');
    userToken.value = res.data.token; // Almacena el token en el almacenamiento local
    router.push('/dashboard');
  }
});
</script>
