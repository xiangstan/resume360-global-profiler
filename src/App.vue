<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { computed } from 'vue';
import { useAppStore } from '@/stores/app';
import NavbarView from './components/static/NavbarView.vue';

const appStore = useAppStore();

const isDarkMode = computed(() => {
  return appStore.isDarkMode
})
</script>

<template>
  <div :class="{'dark': isDarkMode}">
    <NavbarView />
    <header>
      <div class="wrapper">
        <h1 class="text-3xl font-bold underline bg-red-200">Hello World!!</h1>
      </div>
    </header>

    <RouterView />
  </div>
</template>

<style scoped>
</style>
