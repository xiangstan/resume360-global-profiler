<template>
  <header>
    <nav class="bg-white border-gray-200 text-gray-700 dark:bg-gray-900 dark:text-slate-100" :class="hasNavBorder">
      <div :class="isInternal ? 'px-2' : 'max-w-screen-lg mx-auto max-lg:px-2'">
        <div class="flex items-center justify-between">
          <!-- logo -->
          <div class="flex items-center justify-start gap-10">
            <div v-if="isInternal" id="hamburger-icon" class="hamburger px-3 py-4 cursor-pointer" :class="isAsideShow ? 'is-active' : ''" @click="toggleHamburger">
              <span class="line bg-gray-700 dark:bg-slate-100"></span>
              <span class="line bg-gray-700 dark:bg-slate-100"></span>
              <span class="line bg-gray-700 dark:bg-slate-100"></span>
            </div>
            <a href="#" class="flex items-center py-5 px-2 text-gray-700">
              <img src="https://d1ex66uhwrtho1.cloudfront.net/img/outraverse-logo.png" class="w-6 h-6 mr-1 text-blue-400" alt="Outraverse Logo" />
              <span class="font-bold">Outraverse</span>
            </a>
          </div>
          <!-- secondary nav -->
          <div class="hidden md:flex items-center space-x-1">
            <a class="cursor-pointer px-3" @click="toggleDarkMode">
              <svg v-if="isDarkMode" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <title>Toggle Light Mode</title>
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <title>Toggle Dark Mode</title>
                <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
              </svg>
            </a>

            <div class="dropdown inline-block px-5 relative">
              <a>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <title>Language Selector</title>
                  <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" />
                </svg>
              </a>
              <ul class="dropdown-menu absolute hidden text-gray-700 pt-3">
                <li class="">
                  <p class="block cursor-pointer rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 whitespace-no-wrap select-none" @click="setLocale('en_US')">
                    English
                  </p>
                </li>
                <li class="">
                  <p class="block cursor-pointer rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 whitespace-no-wrap select-none" @click="setLocale('zh_CN')">
                    中文
                  </p>
                </li>
              </ul>
            </div>

            <a v-if="!appStore.isInternal" @click="showLoginModal" class="capitalize cursor-pointer py-2 px-3 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 hover:text-yellow-800 rounded transition duration-300">
              {{ $t('general.signin') }}
            </a>
            <a v-else to="/login" class="cursor-pointer px-3" @click="logOff">
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
import { useRouter } from 'vue-router';

import { useI18n } from 'vue-i18n';
const { locale } = useI18n({ useScope: "global" })

const appStore = useAppStore();
const showStore = useShowStore();

const router = useRouter()

const isDarkMode = computed(() => {
  return appStore.isDarkMode
})
const isInternal = computed(() => {
  return appStore.isInternal
})
const isAsideShow = computed(() => {
  return showStore.isAside;
})
const hasNavBorder = computed(() => {
  return (appStore.isInternal) ? "border-b-2 border-slate-200" : ""
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
  localStorage.removeItem(import.meta.env.VITE_APP_SITE_SHORT + "User")
  sessionStorage.removeItem(import.meta.env.VITE_APP_SITE_SHORT + "Token")
  appStore.updateInternalStatus(false)
  router.push("/")
}
/*** choose the display language from language dropdown menu */
const setLocale = (lang) => {
  locale.value = lang
  localStorage.setItem("langLocale", lang)
}

const toggleHamburger = () => {
  showStore.updateShow({
    key: "isAside",
    value: !showStore.isAside
  })
}
</script>

<style scoped>
.dropdown:hover .dropdown-menu {
  display: block;
}
.hamburger .line{
  width: 20px;
  height: 4px;
  display: block;
  margin: 2px auto;
  -webkit-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}
.hamburger.is-active .line:nth-child(2){
  opacity: 0;
}

.hamburger.is-active .line:nth-child(1){
  -webkit-transform: translateY(6px) rotate(45deg);
  -ms-transform: translateY(6px) rotate(45deg);
  -o-transform: translateY(6px) rotate(45deg);
  transform: translateY(6px) rotate(45deg);
}
.hamburger.is-active .line:nth-child(3){
  -webkit-transform: translateY(-6px) rotate(-45deg);
  -ms-transform: translateY(-6px) rotate(-45deg);
  -o-transform: translateY(-6px) rotate(-45deg);
  transform: translateY(-6px) rotate(-45deg);
}
</style>