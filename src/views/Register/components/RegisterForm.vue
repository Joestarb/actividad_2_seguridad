<template>
  <form @submit.prevent="handleSubmit" class="max-w-md mx-auto mt-5 p-6 bg-white rounded-lg">
    <div class="mb-4"></div>
    <div class="mb-4">
      <InputComponent
        label-tittle="Email"
        type="email"
        v-model="email" required
        :="emailAttrs"
      />
      <span class=" text-red-500" v-if="errors.email">{{ errors.email }}</span>
    </div>
    <div class="mb-4">
      <InputComponent
        label-tittle="contraseña"
        type="password"
        v-model="password"
        :="passwordAttrs"

      />
      <span class="text-red-500" v-if="errors.password">{{ errors.password }}</span>

    </div>
    <div class="mb-6">
      <InputComponent
        label-tittle="confirmar contraseña"
        type="password"
        v-model="confirmPassword"
      />
    </div>
    <div>
      <ButtonComponent own-style="" title="Registro" type="submit" />
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import InputComponent from '@/components/common/InputComponent.vue'
import ButtonComponent from '@/components/common/ButtonComponent.vue'
import { validateEmail } from '@/hooks/useRegrex.ts'
import { userApiSlice } from '@/stores/users/userApiSlice.ts'
import Swal from 'sweetalert2'
import { useRouter } from 'vue-router'
import { useForm } from 'vee-validate'
import * as yup from 'yup'

const router = useRouter();
const userApi = userApiSlice();

const confirmPassword = ref('')


const { values, errors, defineField } = useForm({
  validationSchema: yup.object({
    email: yup.string().email().required(),
    password: yup.string().required()
  }),
});
const [email, emailAttrs] = defineField('email');
const [password, passwordAttrs] = defineField('password');


const handleSubmit = async () => {
  //validacion de inputs con js
  if (email.value === '' || password.value === '' || confirmPassword.value === '') {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Todos los campos son obligatorios!',
    })
    return
  }

  //validacion de email con regex
  if (!validateEmail(email.value)) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Por favor, introduce un email válido!',
    })
    return
  }

  //validacion de password con js
  if (password.value !== confirmPassword.value) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Las contraseñas no coinciden!',
    })
    return
  }

  console.log('Email:', email.value)
  console.log('Password:', password.value)

  //llamada a la api
  const res = await userApi.registerUser(email.value, password.value)

  const responseStatus = {
    200:  {
      icon: 'success',
      title: 'Registro exitoso!',
      text: 'redirigiendo...  ',
    },
    400: {
      icon: 'error',
      title: 'Oops...',
      text: 'El email ya está en uso!',
    },
    default: {
      icon: 'error',
      title: 'Oops...',
      text: 'error interno del servidor!',
    },
  }
  Swal.fire(responseStatus[res.status] || responseStatus.default)
  if(res.status === 200){
    router.push('/')
  }

};
</script>
