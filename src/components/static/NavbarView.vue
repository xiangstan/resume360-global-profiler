<template>
  <header>
    <nav class="bg-white border-gray-200 text-gray-700 dark:bg-gray-900 dark:text-slate-100">
      <div class="max-w-screen-lg mx-auto max-lg:px-2">
        <div class="flex items-center justify-between">
          <!-- logo -->
          <div>
            <a href="#" class="flex items-center py-5 px-2 text-gray-700">
              <img src="https://d1ex66uhwrtho1.cloudfront.net/img/outraverse-logo.png" class="w-6 h-6 mr-1 text-blue-400" alt="Outraverse Logo" />
              <span class="font-bold">Outraverse</span>
            </a>
          </div>
          <!-- secondary nav -->
          <div class="hidden md:flex items-center space-x-1">
            <a class="cursor-pointer" @click="toggleDarkMode">
              <svg v-if="isDarkMode" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
              </svg>
            </a>
            <a v-if="!appStore.isInternal" @click="showLoginModal" class="capitalize cursor-pointer py-2 px-3 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 hover:text-yellow-800 rounded transition duration-300">
              {{ $t('general.signin') }}
            </a>
            <a v-else to="/login" class="cursor-pointer" @click="logOff">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <title>Log Off</title>
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
              </svg>
            </a>
          </div>

        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { computed } from 'vue';
import { useAppStore } from '@/stores/app';
import { useShowStore } from '@/stores/show';

const appStore = useAppStore();
const showStore = useShowStore();

const isDarkMode = computed(() => {
  return appStore.isDarkMode
})

/*** set dark/light mode */
const toggleDarkMode = () => {
  const newMode = !isDarkMode.value
  localStorage.setItem(import.meta.env.VITE_APP_SITE_SHORT + "DarkMode", newMode.toString());
  appStore.setDarkMode(newMode);
  document.documentElement.classList.toggle("dark", newMode);
}

/*** open login modal */
const showLoginModal = () => {
  showStore.updateShow({
    key: "loginModal",
    value: !showStore.loginModal
  })
}

/*** log off */
const logOff = () => {
  console.log("Log off")
}
</script>
