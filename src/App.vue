<script setup>
import { RouterLink, RouterView } from 'vue-router';

import { useAppStore } from '@/stores/app';
import { useShowStore } from '@/stores/show';

import AsideView from './components/private/AsideView.vue';
import FooterView from './components/static/FooterView.vue';
import NavbarView from './components/static/NavbarView.vue';
import LoginView from './components/public/LoginView.vue';

const appStore = useAppStore();
const showStore = useShowStore();
</script>

<template>
  <div>
    <NavbarView />

    <main class="min-h-[80vh] wrapper dark:bg-slate-600 flex">
      <AsideView v-if="appStore.isInternal" />
      <div class="p-4 mb-6 flex-1">
        <RouterView />
      </div>
    </main>

    <LoginView v-if="showStore.loginModal" />

    <FooterView />
  </div>
</template>

<style scoped>
</style>
