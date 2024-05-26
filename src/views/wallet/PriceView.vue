<template>
  <div class="border-2 bg-slate-200 dark:bg-slate-500 px-5 py-3 mb-3 rounded-md">
    <strong class="uppercase">{{ token }}</strong>: ${{ price }}
  </div>
</template>

<script setup>
defineProps({
  token: {
    type: String,
    default: ''
  },
  price: {
    type: Number,
    default: 0
  }
})
</script>