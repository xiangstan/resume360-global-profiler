<template>
  <div>
    <BreadCrumbs :items="bc" />
    <IsLoading v-if="isLoading" />
    <p v-else-if="isNoResume" class="rounded-md shadow-none p-5 bg-amber-500 text-slate-50">
      You haven't start building your resume yet. Click <a class="font-bold underline cursor-pointer hover:uppercase" @click="startResume">here</a> to start.
    </p>
    <form v-else-if="initResume">
      <div class="rounded-md shadow-md p-5 bg-gray-50 dark:bg-gray-700 mb-6">
        <h2 class="text-xl font-bold mb-6">{{ $t('general.basic') + $t(' ') + $t('general.information') }}</h2>
        <div class="grid grid-cols-2 gap-8">
          <div class="relative z-0 w-full mb-5 group">
            <input type="name" name="floating_name" id="floating_name" class="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label for="floating_name" class="peer-focus:font-medium absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 capitalize">
              {{ $t('general.fullname') }}
            </label>
          </div>
          <div class="relative z-0 w-full mb-5 group">
            <input type="email" name="floating_email" id="floating_email" class="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " v-model="myStoredUser" required readonly="readonly" />
            <label for="floating_email" class="peer-focus:font-medium absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 capitalize">
              {{ $t('general.email') + $t(' ') + $t('general.address') }}
            </label>
          </div>
        </div>
      </div>
      <!-- Experience -->
      <div class="rounded-md shadow-md p-5 bg-gray-50 dark:bg-gray-700 mb-6">
        <h2 class="text-xl font-bold mb-6 capitalize">{{ $t('resume.experience') }}</h2>
      </div>
      <!-- Education -->
      <div class="rounded-md shadow-md p-5 bg-gray-50 dark:bg-gray-700">
        <h2 class="text-xl font-bold mb-6 capitalize">{{ $t('resume.education') }}</h2>
      </div>
    </form>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

import { useMyAccount } from '@/stores/account';

import { ajaxCall } from '@/utils/ajax';
import browserDetect from '@/utils/browser';

import BreadCrumbs from '@/components/private/BreadCrumbs.vue';
import IsLoading from '@/components/static/IsLoading.vue';

const accountStore = useMyAccount();
const myStoredUaid = accountStore.profile.uaid || 0;
const myStoredUser = accountStore.profile.email || '';
const myStoredName = accountStore.profile.name;
const localStoredUser = localStorage.getItem(import.meta.env.VITE_APP_SITE_SHORT + "User");
const browser = browserDetect();

const items = ref({});
const bc = ref([
  { name: 'Resume', url: '' }
]);
const isLoading = ref(true);
const isNoResume = ref(false);
const initResume = ref(false);

/***
 * methods
 */
const initFetch = async () => {
  if (myStoredUser === localStoredUser) {
    if (myStoredName) {
      const ajaxData = {
        uaid: myStoredUaid
      };
      const result = await ajaxCall({
        data: ajaxData,
        url: "resume/fetch"
      });
      items.value = result;
      initResume.value = true;
    }
    else {
      isNoResume.value = true;
    }
    isLoading.value = false
  }
  else {
    console.warn("Not logged in")
  }
}
/*** start building resume */
const startResume = () => {
  isNoResume.value = false;
  initResume.value = true;
}

onMounted(() => {
  initFetch();
})
</script>