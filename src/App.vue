<script setup>
import { RouterLink, RouterView } from 'vue-router'
import FooterView from './components/static/FooterView.vue';
import NavbarView from './components/static/NavbarView.vue';
</script>

<template>
  <div>
    <NavbarView />
    <div class="wrapper">
      <h1 class="text-3xl font-bold underline bg-red-200">Hello World!!</h1>
    </div>

    <main class="h-[80vh]">
      <RouterView />
    </main>
    <FooterView />
  </div>
</template>

<style scoped>
</style>
