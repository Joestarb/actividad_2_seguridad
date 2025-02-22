<template>
  <div>
    <button :class="[ownStyle ,'text-white', 'p-2','rounded-lg']">
      {{ title }}
    </button>
    <slot />
  </div>
</template>

<script setup lang="ts">

defineProps<{
  title: string
  ownStyle: string | string[]
}>()
</script>
