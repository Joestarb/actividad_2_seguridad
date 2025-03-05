<template>
  <DefaultLayout>
    <div class="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl">
      <h1 class="text-3xl font-semibold text-gray-800 text-center mb-6">
        XSS Vulnerable View
      </h1>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <InputComponent
          required
          v-model="comments"
          class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          rows="5"
          placeholder="escribe tus comentarios"
        />
        <ButtonComponent
          title="Enviar"
          type="submit"
        />
      </form>

      <div v-if="comments" class="mt-6 p-4 border rounded-lg bg-gray-50 shadow-sm">
        <h2 class="text-lg font-semibold text-gray-700 mb-2">salida:</h2>
        <div v-html="comments" class="text-gray-800"></div>
      </div>

      <div v-if="xssResults.length" class="mt-6 p-4 border rounded-lg bg-gray-50 shadow-sm">
        <h2 class="text-lg font-semibold text-gray-700 mb-2">XSS Results:</h2>
        <div v-for="result in xssResults" :key="result.id" v-html="result.comment" class="text-gray-800"></div>
      </div>
    </div>
    <a href=""></a>
      </DefaultLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import DefaultLayout from '@/components/layout/DefaultLayout.vue'
import { attacksSlice } from '@/stores/attacks/attacksApiSlice'
import InputComponent from '@/components/common/InputComponent.vue'
import ButtonComponent from '@/components/common/ButtonComponent.vue'
import Swal from 'sweetalert2'
const comments = ref('')
const xssResults = ref([])

const attack = attacksSlice()
const userToken = localStorage.getItem('userToken')

const resetForm = () => {
  comments.value = ''
}

const handleSubmit = async () => {
  const res = await attack.xssAttack(userToken[6], comments.value)
  fetchXssResults()
  console.log('estatus', res.status)

  const responseStatus = {
    200: {
      icon: 'success',
      title: 'Bienvenido!',
      text: 'enviado!',
    },
    400: {
      icon: 'error',
      title: 'Oops...',
      text: 'se ha repetido el comentario',
    },
    default: {
      icon: 'error',
      title: 'Oops...',
      text: 'Ha ocurrido un error en el servidor!',
    },
  }

  Swal.fire(responseStatus[res.status] || responseStatus.default)





}

const fetchXssResults = async () => {
  const res = await attack.getXssResults()
  if (res.status === 200) {

    xssResults.value = res.data.results

    resetForm()
  }

}

onMounted(() => {
  fetchXssResults()
})
</script>


