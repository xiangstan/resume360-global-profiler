<template>
  <div>
    <BreadCrumbs :items="bc" />
  </div>
</template>

<script setup>
import { ref } from 'vue';

import BreadCrumbs from '@/components/private/BreadCrumbs.vue';

const bc = ref([]);
</script>