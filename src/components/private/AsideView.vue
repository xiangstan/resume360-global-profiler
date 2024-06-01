<template>
  <aside class="border-r-2 border-slate-200 p-4 duration-150 ease-in-out flex flex-col justify-between" :class="asideWidth">
    <div class="flex flex-col item-start space-y-4">
      <router-link to="/user/dashboard" class="text-lg hover:underline hover:text-blue-700 dark:hover:text-amber-300 decoration-4 flex justify-start items-center gap-1" :title="showLabel($t('general.my') + $t(' ') + $t('general.dashboard'))">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
        <span v-if="isAsideShow" class="capitalize">{{ $t('general.dashboard') }}</span>
      </router-link>
      <router-link to="/user/resume" class="text-lg hover:underline hover:text-blue-700 dark:hover:text-amber-300 decoration-4 flex justify-start items-center gap-1" :title="showLabel($t('general.my') + $t(' ') + $t('general.resume'))">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
        <span v-if="isAsideShow" class="capitalize">{{ $t('general.resume') }}</span>
      </router-link>
      <router-link to="/user/wallet" class="text-lg hover:underline hover:text-blue-700 dark:hover:text-amber-300 decoration-4 flex justify-start items-center gap-1" :title="showLabel($t('general.my') + $t(' ') + $t('general.wallet'))">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" />
        </svg>
        <span v-if="isAsideShow" class="capitalize">{{ $t('general.wallet') }}</span>
      </router-link>
      <router-link to="/resume/market" class="text-lg hover:underline hover:text-blue-700 dark:hover:text-amber-300 decoration-4 flex justify-start items-center gap-1" :title="showLabel($t('general.resume_market'))">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
        </svg>
        <span v-if="isAsideShow" class="capitalize">{{ $t('general.resume_market') }}</span>
      </router-link>
    </div>
    <div class="flex flex-col item-end space-y-4">
      <a class="text-lg hover:underline cursor-pointer hover:text-blue-700 dark:hover:text-amber-300 decoration-4 flex justify-start items-center gap-1" @click="logOff" :title="showLabel($t('general.signout'))">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <title>{{ $t('general.signout') }}</title>
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
        </svg>
        <span v-if="isAsideShow" class="capitalize">{{ $t('general.signout') }}</span>
      </a>
    </div>
  </aside>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useAppStore } from '@/stores/app';
import { useShowStore } from '@/stores/show';
import { useWeb3Store } from '@/stores/web3';
import { useRouter } from 'vue-router';

import { cap1stLetter } from '@/utils/strings';

const appStore = useAppStore();
const showStore = useShowStore();
const web3Store = useWeb3Store();
const router = useRouter();

const isAsideShow = computed(() => {
  return showStore.isAside;
})

const asideWidth = computed(() => {
  return isAsideShow.value ? 'w-48' : 'w-16'
})
/***
 * mounted
 */
onMounted(async () => {
  if (typeof window.ethereum !== "undefined") {
    await web3Store.connectToMetaMask();
    // hasMetaMask.value = true;
  }
})
/***
 * methods
 */
/*** log off */
const logOff = () => {
  localStorage.removeItem(import.meta.env.VITE_APP_SITE_SHORT + "User")
  sessionStorage.removeItem(import.meta.env.VITE_APP_SITE_SHORT + "Token")
  appStore.updateInternalStatus(false)
  router.push("/")
}
const showLabel = (text) => {
  return cap1stLetter(text, ' ');
}
</script>