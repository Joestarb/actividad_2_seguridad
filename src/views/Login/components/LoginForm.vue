
<template>
  <form @submit.prevent="handleSubmit" class="max-w-md mx-auto mt-2 p-6 bg-white rounded-lg ">
    <div class="mb-4">
      <InputComponent
        required
        label-tittle="Email"
        type="email"
        v-model="email"
        :="emailAttrs"
      />
      <span class=" text-red-500" v-if="errors.email">{{ errors.email }}</span>

    </div>
    <div class="mb-6">
      <InputComponent
        required
        label-tittle="Password"
        type="password"
        v-model="password"
        :="passwordAttrs"
      />
      <span class="text-red-500" v-if="errors.password">{{ errors.password }}</span>

    </div>
    <div>

<!--      <pre>values: {{ values }}</pre>-->
<!--      <pre>errors: {{ errors }}</pre>-->
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
import { useLocalStorage } from '@vueuse/core'
import { useRouter } from 'vue-router'
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import Swal from 'sweetalert2'


const { values, errors, defineField } = useForm({
  validationSchema: yup.object({
    email: yup.string().email().required(),
    password: yup.string().required()

  }),
});
const [email, emailAttrs] = defineField('email');
const [password, passwordAttrs] = defineField('password');



const router = useRouter();
const userApi = userApiSlice();


const userToken = useLocalStorage('userToken', '');

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

  if (res.status == 200) {
    userToken.value = res.data.token; // Almacena el token en el almacenamiento local
    router.push('/dashboard');
  }

  console.log(res.data)
};
</script>


