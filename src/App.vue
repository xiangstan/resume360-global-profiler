<script setup>
import { RouterLink, RouterView } from 'vue-router';

import { useShowStore } from '@/stores/show';

import FooterView from './components/static/FooterView.vue';
import NavbarView from './components/static/NavbarView.vue';
import LoginView from './components/public/LoginView.vue';

const showStore = useShowStore();
</script>

<template>
  <div>
    <NavbarView />

    <main class="h-[80vh] wrapper">
      <RouterView />
    </main>
    <LoginView v-if="showStore.loginModal" />
    <FooterView />
  </div>
</template>

<style scoped>
</style>
