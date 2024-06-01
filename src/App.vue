<script setup>
import { RouterView } from 'vue-router';

import { useAppStore } from '@/stores/app';
import { useShowStore } from '@/stores/show';

import AsideView from './components/private/AsideView.vue';
import FooterView from './components/static/FooterView.vue';
import NavbarView from './components/static/NavbarView.vue';
import LoginView from './components/public/LoginView.vue';

import ContactView from './components/static/ContactView.vue';

const appStore = useAppStore();
const showStore = useShowStore();
</script>

<template>
  <div id="app">
    <NavbarView />

    <main class="min-h-[80vh] wrapper dark:bg-slate-600 flex">
      <AsideView v-if="appStore.isInternal" />
      <div class="flex-1" :class="{'p-4 mb-6': appStore.isInternal}">
        <RouterView />
      </div>
    </main>
    
    <LoginView v-if="showStore.loginModal" />
    <section id="contact-us">
      <ContactView />
    </section>
    <FooterView />
  </div>
</template>

<style scoped>
</style>
