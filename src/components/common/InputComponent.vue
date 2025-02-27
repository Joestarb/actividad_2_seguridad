<template>
  <label class="block text-sm font-medium text-gray-700 ">
    <span>{{ labelTittle }}</span>
  </label>

  <input
    :required="required"
    :type="type"
    :placeholder="placeholder"
    :value="modelValue"
    :class="classes"
    class="w-full px-4 py-2 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
    @input="$emit('update:modelValue', $event.target.value)"
    @blur="$emit('blur', $event)"
    @change="$emit('change', $event)"
  />

</template>

<script setup lang="ts">
defineProps({
  labelTittle: {
    type: String,
    default: '',
  },
  modelValue: {
    type: [String, Number],
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  classes: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  required: {
    type: Boolean,
    default: false,
  },
})
defineEmits(['update:modelValue', 'blur', 'change'])
</script>
